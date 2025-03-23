// scripts/fix-showcase-imports.js
/**
 * This script ensures all showcase HTML files correctly import the compiled JS
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

async function fixShowcaseFile(filePath) {
    try {
        let content = await fs.readFile(filePath, 'utf8');

        // Check if file already has the correct import
        if (content.includes("import '../../dist/libs/core/index.js'")) {
            console.log(`✅ ${filePath} already has correct import`);
            return;
        }

        // Fix script imports
        if (content.includes('<script type="module" src="../../dist/libs/core/index.js">')) {
            // Replace src attribute with import statement
            content = content.replace(
                /<script type="module" src="\.\.\/\.\.\/dist\/libs\/core\/index\.js"><\/script>/,
                `<script type="module">
  import '../../dist/libs/core/index.js';
  
  // Add any initialization code if needed
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Components loaded');
  });
</script>`
            );
        } else if (!content.includes('<script type="module">')) {
            // Add import if no module script exists at all
            content = content.replace(
                '</head>',
                `  <!-- Import the compiled component -->
  <script type="module">
    import '../../dist/libs/core/index.js';
    
    // Add any initialization code if needed
    document.addEventListener('DOMContentLoaded', () => {
      console.log('Components loaded');
    });
  </script>
</head>`
            );
        } else {
            // For other cases, add import inside existing script if needed
            content = content.replace(
                /<script type="module">([\s\S]*?)<\/script>/,
                (match, scriptContent) => {
                    if (!scriptContent.includes("import '../../dist/libs/core/index.js'")) {
                        return `<script type="module">
  import '../../dist/libs/core/index.js';
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