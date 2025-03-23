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
    // Convert component name to kebab case
    return `../../dist/libs/${libName}/index.umd.cjs`;
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
        if (content.includes(`<script src="${importPath}">`)) {
            console.log(`✅ ${filePath} already has correct import: ${importPath}`);
            return;
        }

        // Replace any existing module script with the new UMD script
        content = content.replace(
            /<script type="module"[^>]*>[\s\S]*?<\/script>/g,
            `<script src="${importPath}"></script>`
        );

        // If no script tag was replaced, add the new one before closing head
        if (!content.includes(`<script src="${importPath}">`)) {
            content = content.replace(
                '</head>',
                `  <script src="${importPath}"></script>
</head>`
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