// scripts/generate-components.js
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

// Constants
const SYSTEM_PROMPTS_DIR = path.join(__dirname, '../prompts/system');
const COMPONENTS_PROMPTS_DIR = path.join(__dirname, '../prompts/components');
const OUTPUT_DIR = path.join(__dirname, '../libs');
const CORE_LIB_INDEX = path.join(__dirname, '../libs/core/src/lib/index.ts');

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// Utility function to read all files in a directory
async function readDir(dirPath) {
    try {
        const entries = await fs.readdir(dirPath, { withFileTypes: true });
        return entries;
    } catch (error) {
        console.error(`Error reading directory ${dirPath}:`, error);
        return [];
    }
}

// Utility function to read file content
async function readFile(filePath) {
    try {
        return await fs.readFile(filePath, 'utf8');
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return '';
    }
}

// Utility function to read image file and convert to base64
async function readImageAsBase64(filePath) {
    try {
        const data = await fs.readFile(filePath);
        return data.toString('base64');
    } catch (error) {
        console.error(`Error reading image file ${filePath}:`, error);
        return null;
    }
}

// Function to read all system prompts
async function getSystemPrompts() {
    const entries = await readDir(SYSTEM_PROMPTS_DIR);
    let systemPrompt = '';

    for (const entry of entries) {
        if (entry.isFile() && entry.name.endsWith('.md')) {
            const filePath = path.join(SYSTEM_PROMPTS_DIR, entry.name);
            const content = await readFile(filePath);
            systemPrompt += content + '\n\n';
        }
    }

    return systemPrompt;
}

// Function to read component prompts for a specific component
async function getComponentPrompts(componentDir) {
    const entries = await readDir(path.join(COMPONENTS_PROMPTS_DIR, componentDir));
    let componentPrompt = '';
    const images = [];

    for (const entry of entries) {
        const filePath = path.join(COMPONENTS_PROMPTS_DIR, componentDir, entry.name);

        if (entry.isFile()) {
            if (entry.name.endsWith('.md')) {
                const content = await readFile(filePath);
                componentPrompt += content + '\n\n';
            } else if (entry.name.endsWith('.png') || entry.name.endsWith('.jpg') || entry.name.endsWith('.jpeg')) {
                const base64 = await readImageAsBase64(filePath);
                if (base64) {
                    const mediaType = entry.name.endsWith('.png') ? 'image/png' : 'image/jpeg';
                    images.push({
                        type: 'image',
                        source: {
                            type: 'base64',
                            media_type: mediaType,
                            data: base64
                        }
                    });
                }
            }
        }
    }

    return { componentPrompt, images };
}

// Function to generate component using Anthropic API
async function generateComponent(systemPrompt, componentPrompt, images) {
    try {
        const messages = [
            {
                role: 'user',
                content: [
                    { type: 'text', text: systemPrompt + '\n\n' + componentPrompt }
                ]
            }
        ];

        // Add images to the first user message if available
        if (images.length > 0) {
            messages[0].content.push(...images);
        }

        const response = await anthropic.messages.create({
            model: 'claude-3-7-sonnet-latest',
            messages,
            max_tokens: 16000,
            temperature: 0.2,
        });

        return response.content[0].text;
    } catch (error) {
        console.error('Error generating component:', error);
        return null;
    }
}

// Function to parse generated response and extract component and story files
function parseGeneratedResponse(response) {
    // Extract Svelte component
    const componentMatch = response.match(/```svelte\n([\s\S]*?)\n```/);
    const componentCode = componentMatch ? componentMatch[1] : null;

    // Extract Storybook story
    const storyMatch = response.match(/```typescript\n([\s\S]*?)\n```/) || response.match(/```ts\n([\s\S]*?)\n```/);
    const storyCode = storyMatch ? storyMatch[1] : null;

    return { componentCode, storyCode };
}

// Function to create a new NX library for the component
async function createComponentLibrary(componentName) {
    try {
        // Convert to kebab case for library name
        const libName = componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        const fullLibPath = path.join(OUTPUT_DIR, libName);

        // Check if library already exists
        try {
            await fs.access(fullLibPath);
            console.log(`Library ${libName} already exists. Skipping creation.`);
        } catch {
            // Library doesn't exist, create it
            console.log(`Creating library for ${componentName}...`);
            execSync(`npx nx g @nx/js:lib ${libName} --directory=libs/${libName} --bundler=vite --unitTestRunner=vitest --no-interactive`, { stdio: 'inherit' });

            // Update vite.config.ts to support Svelte
            const viteConfigPath = path.join(fullLibPath, 'vite.config.ts');
            const viteConfig = `
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { join } from 'path';
import * as path from 'path';

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'GDS${componentName}',
      fileName: 'index',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['svelte'],
      output: {
        globals: {
          svelte: 'Svelte',
        },
      },
    },
  },
});
      `;
            await fs.writeFile(viteConfigPath, viteConfig);
        }

        return fullLibPath;
    } catch (error) {
        console.error(`Error creating component library for ${componentName}:`, error);
        return null;
    }
}

// Function to save generated component files
async function saveGeneratedFiles(libPath, componentName, componentCode, storyCode) {
    try {
        // Ensure lib/src directory exists
        const srcDir = path.join(libPath, 'src', 'lib');
        await fs.mkdir(srcDir, { recursive: true });

        // Save component file
        const componentPath = path.join(srcDir, `${componentName}.svelte`);
        await fs.writeFile(componentPath, componentCode);
        console.log(`Component saved to ${componentPath}`);

        // Save story file
        const storyPath = path.join(srcDir, `${componentName}.stories.ts`);
        await fs.writeFile(storyPath, storyCode);
        console.log(`Story saved to ${storyPath}`);

        // Update component's index.ts to export the component
        const indexPath = path.join(libPath, 'src', 'index.ts');
        await fs.writeFile(indexPath, `export * from './lib/${componentName}';\n`);

        return { componentPath, storyPath };
    } catch (error) {
        console.error(`Error saving generated files for ${componentName}:`, error);
        return null;
    }
}

// Function to update core library index to export the component
async function updateCoreLibraryIndex(componentName, libName) {
    try {
        const indexContent = await readFile(CORE_LIB_INDEX);

        // Check if component is already exported
        if (indexContent.includes(`export * from '@gds/${libName}';`)) {
            console.log(`Component ${componentName} already exported from core. Skipping.`);
            return;
        }

        // Add export statement
        const newContent = `${indexContent}\nexport * from '@gds/${libName}';\n`;
        await fs.writeFile(CORE_LIB_INDEX, newContent);

        console.log(`Updated core library index to export ${componentName}`);
    } catch (error) {
        console.error(`Error updating core library index for ${componentName}:`, error);
    }
}

// Main function to generate all components
async function generateAllComponents() {
    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
        console.error('Error: ANTHROPIC_API_KEY environment variable is not set.');
        process.exit(1);
    }

    try {
        // Get system prompts
        console.log('Reading system prompts...');
        const systemPrompt = await getSystemPrompts();

        // Get component directories
        const componentDirs = await readDir(COMPONENTS_PROMPTS_DIR);

        for (const dir of componentDirs) {
            if (dir.isDirectory()) {
                const componentName = dir.name;
                console.log(`\nProcessing component: ${componentName}`);

                // Get component prompts and images
                const { componentPrompt, images } = await getComponentPrompts(componentName);

                if (!componentPrompt) {
                    console.log(`No prompt found for ${componentName}. Skipping.`);
                    continue;
                }

                // Generate component using Anthropic API
                console.log(`Generating component ${componentName} with Claude...`);
                const generatedResponse = await generateComponent(systemPrompt, componentPrompt, images);

                if (!generatedResponse) {
                    console.log(`Failed to generate component ${componentName}. Skipping.`);
                    continue;
                }

                // Parse generated response
                const { componentCode, storyCode } = parseGeneratedResponse(generatedResponse);

                if (!componentCode || !storyCode) {
                    console.log(`Failed to parse generated response for ${componentName}. Skipping.`);
                    continue;
                }

                // Create component library
                const pascalCaseName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
                const libPath = await createComponentLibrary(pascalCaseName);

                if (!libPath) {
                    console.log(`Failed to create library for ${componentName}. Skipping.`);
                    continue;
                }

                // Save generated files
                const savedFiles = await saveGeneratedFiles(libPath, pascalCaseName, componentCode, storyCode);

                if (!savedFiles) {
                    console.log(`Failed to save generated files for ${componentName}. Skipping.`);
                    continue;
                }

                // Update core library index
                const libName = pascalCaseName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
                await updateCoreLibraryIndex(pascalCaseName, libName);

                console.log(`Successfully generated component ${componentName}!`);
            }
        }

        console.log('\nAll components generated successfully!');
    } catch (error) {
        console.error('Error generating components:', error);
        process.exit(1);
    }
}

// Execute main function
generateAllComponents();