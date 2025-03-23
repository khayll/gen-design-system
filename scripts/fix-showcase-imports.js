// scripts/fix-showcase-imports.js
/**
 * This script ensures all showcase HTML files correctly import their specific components
 */
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function findShowcaseFiles() {
    try {
        const { stdout } = await execPromise('find libs -name "*.showcase.html"');
        return stdout.trim().split('\n').filter(Boolean);
    } catch (error) {
        console.error('Error finding showcase files:', error);
        return [];
    }
}

function getComponentImportPath(filePath) {
    // Extract the component name from the file path
    const match = filePath.match(/libs\/([^/]+)\/src\/lib\/([^.]+)\.showcase\.html/);
    if (!match) {
        console.error(`Could not extract component name from ${filePath}`);
        return null;
    }

    const [, libName, componentName] = match;
    // Update path to point to the built file in dist
    return `../../../dist/libs/${libName}/index.js`;
}

async function fixShowcaseFile(filePath) {
    try {
        let content = await fs.readFile(filePath, 'utf8');
        const importPath = getComponentImportPath(filePath);
        
        if (!importPath) {
            console.error(`❌ Could not determine import path for ${filePath}`);
            return;
        }

        // Check if file already has the correct import
        if (content.includes(`import '${importPath}'`)) {
            console.log(`✅ ${filePath} already has correct import: ${importPath}`);
            return;
        }

        // Fix script imports
        if (content.includes(`<script type="module" src="${importPath}">`)) {
            // Replace src attribute with import statement
            content = content.replace(
                new RegExp(`<script type="module" src="${importPath}"><\/script>`),
                `<script type="module">
  import '${importPath}';
  
  // Add any initialization code if needed
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Component loaded');
  });
</script>`
            );
            console.log(`🔄 ${filePath}: Replaced src import with: ${importPath}`);
        } else if (!content.includes('<script type="module">')) {
            // Add import if no module script exists at all
            content = content.replace(
                '</head>',
                `  <!-- Import the compiled component -->
  <script type="module">
    import '${importPath}';
    
    // Add any initialization code if needed
    document.addEventListener('DOMContentLoaded', () => {
      console.log('Component loaded');
    });
  </script>
</head>`
            );
            console.log(`➕ ${filePath}: Added new import: ${importPath}`);
        } else {
            // For other cases, add import inside existing script if needed
            content = content.replace(
                /<script type="module">([\s\S]*?)<\/script>/,
                (match, scriptContent) => {
                    if (!scriptContent.includes(`import '${importPath}'`)) {
                        console.log(`📝 ${filePath}: Added import to existing script: ${importPath}`);
                        return `<script type="module">
  import '${importPath}';
  ${scriptContent}
</script>`;
                    }
                    return match;
                }
            );
        }

        await fs.writeFile(filePath, content);
        console.log(`✅ Fixed imports in ${filePath}`);
    } catch (error) {
        console.error(`❌ Error fixing ${filePath}:`, error);
    }
}

async function main() {
    const showcaseFiles = await findShowcaseFiles();

    if (showcaseFiles.length === 0) {
        console.log('No showcase files found.');
        return;
    }

    console.log(`Found ${showcaseFiles.length} showcase files. Fixing imports...`);

    for (const file of showcaseFiles) {
        await fixShowcaseFile(file);
    }

    console.log('Done fixing showcase files.');
}

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});