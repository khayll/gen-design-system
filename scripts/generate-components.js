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
            model: process.env.ANTHROPIC_MODEL || 'claude-3-7-sonnet-latest',
            messages,
            max_tokens: 20000,
            temperature: parseFloat(process.env.ANTHROPIC_TEMPERATURE || '0.05'),
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

    // Extract Playwright showcase HTML
    const showcaseMatch = response.match(/```html\n([\s\S]*?)\n```/);
    const showcaseCode = showcaseMatch ? showcaseMatch[1] : null;

    return { componentCode, storyCode, showcaseCode };
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
    outDir: '../../dist/libs/${libName}',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: 'src/index.ts',
      name: 'GDS${componentName}',
      fileName: 'index',
      formats: ['umd'],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        format: 'umd',
        globals: {
          svelte: 'Svelte',
        },
      },
    },
    target: 'es2015',
    minify: 'terser',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@gen-design-system/${libName}': path.resolve(__dirname, './src/index.ts'),
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
async function saveGeneratedFiles(libPath, componentName, componentCode, storyCode, showcaseCode) {
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

        // Save showcase file
        const showcasePath = path.join(srcDir, `${componentName}.showcase.html`);
        await fs.writeFile(showcasePath, showcaseCode || generateDefaultShowcase(componentName));
        console.log(`Showcase saved to ${showcasePath}`);

        // Update src/index.ts to export the component directly from the Svelte file
        const srcIndexPath = path.join(libPath, 'src', 'index.ts');
        await fs.writeFile(srcIndexPath, `export * from './lib/${componentName}.svelte';\n`);

        // Create root index.ts that exports the Svelte file directly
        const rootIndexPath = path.join(libPath, 'index.ts');
        await fs.writeFile(rootIndexPath, `export { default } from './src/lib/${componentName}.svelte';\nexport * from './src/lib/${componentName}.svelte';\n`);
        console.log(`Root index.ts created at ${rootIndexPath}`);

        return { componentPath, storyPath, showcasePath };
    } catch (error) {
        console.error(`Error saving generated files for ${componentName}:`, error);
        return null;
    }
}

// Function to generate a default showcase if none was provided
function generateDefaultShowcase(componentName) {
    const kebabName = componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    const tagName = `gds-${kebabName}`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${componentName} Component Showcase</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f8f9fa;
    }
    .showcase {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 800px;
      margin: 0 auto;
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .variation {
      padding: 16px;
      border: 1px solid #e9ecef;
      border-radius: 4px;
    }
    .title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #212529;
    }
    /* Base CSS Variables */
    :root {
      --gds-color-primary: #4263eb;
      --gds-color-primary-hover: #364fc7;
      --gds-color-secondary: #868e96;
      --gds-color-secondary-hover: #495057;
      --gds-color-success: #40c057;
      --gds-color-warning: #fcc419;
      --gds-color-danger: #fa5252;
      --gds-color-info: #15aabf;
      --gds-color-light: #f8f9fa;
      --gds-color-dark: #212529;
      --gds-font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
  </style>
  <!-- Import the compiled component -->
  <script src="../../dist/libs/${kebabName}/index.umd.cjs"></script>
  <script type="module">    
    // Add any initialization code if needed
    document.addEventListener('DOMContentLoaded', () => {
      console.log('Components loaded from @gen-design-system/core');
    });
  </script>
</head>
<body>
  <div class="showcase">
    <h1>${componentName} Component</h1>
    
    <div class="variation">
      <div class="title">Default ${componentName}</div>
      <${tagName}></${tagName}>
    </div>
  </div>
</body>
</html>`;
}

// Function to update core library index to export the component
async function updateCoreLibraryIndex(componentName, libName) {
    try {
        const indexContent = await readFile(CORE_LIB_INDEX);

        // Check if component is already exported
        if (indexContent.includes(`export * from '@gen-design-system/${libName}';`)) {
            console.log(`Component ${componentName} already exported from core. Skipping.`);
            return;
        }

        // Add export statement
        const newContent = `${indexContent}\nexport * from '@gen-design-system/${libName}';\n`;
        await fs.writeFile(CORE_LIB_INDEX, newContent);

        console.log(`Updated core library index to export ${componentName}`);
    } catch (error) {
        console.error(`Error updating core library index for ${componentName}:`, error);
    }
}

// Main function to generate components
async function generateComponents(specificComponents = []) {
    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
        console.error('Error: ANTHROPIC_API_KEY environment variable is not set.');
        console.error('Please set it in your environment or create a .env file with ANTHROPIC_API_KEY=your_key_here');
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

                // Skip if specific components were provided and this one is not included
                if (specificComponents.length > 0 && !specificComponents.includes(componentName)) {
                    console.log(`Skipping component: ${componentName} (not in specified list)`);
                    continue;
                }

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
                const { componentCode, storyCode, showcaseCode } = parseGeneratedResponse(generatedResponse);

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
                const savedFiles = await saveGeneratedFiles(libPath, pascalCaseName, componentCode, storyCode, showcaseCode);

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

        const message = specificComponents.length > 0
            ? `\nSelected components generated successfully!`
            : `\nAll components generated successfully!`;
        console.log(message);
    } catch (error) {
        console.error('Error generating components:', error);
        process.exit(1);
    }
}

// Execute main function
const specificComponents = process.argv.slice(2);
if (specificComponents.length > 0) {
    console.log(`Generating specific components: ${specificComponents.join(', ')}`);
    generateComponents(specificComponents);
} else {
    console.log('Generating all components...');
    generateComponents();
}