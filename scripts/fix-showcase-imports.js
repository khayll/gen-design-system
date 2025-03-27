// scripts/fix-showcase-imports.js
/**
 * This script ensures all showcase HTML files correctly import their specific components
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

function fixImports(showcaseDir) {
    const files = glob.sync(path.join(showcaseDir, '**/*.html'));

    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');

        // Find any script tag that imports .svelte files
        const svelteImportRegex = /<script.*?import.*?\.svelte.*?<\/script>/gs;
        
        // Extract the component name from the file path
        const componentNameMatch = file.match(/components\/([^\/]+)/);
        if (!componentNameMatch) return;
        
        const componentName = componentNameMatch[1];
        const umdScript = `<script src="/umd/${componentName}.js"></script>`;

        // Remove only the Svelte imports while keeping other script content
        content = content.replace(/(import [^;]+\.svelte[^;]*;)/g, '');

        // Add UMD script before the first script tag or at the start of <head>
        if (content.includes('<script')) {
            content = content.replace('<script', `${umdScript}\n<script`);
        } else if (content.includes('<head>')) {
            content = content.replace('<head>', `<head>\n  ${umdScript}`);
        } else {
            content = content.replace('<html>', `<html>\n<head>\n  ${umdScript}\n</head>`);
        }

        fs.writeFileSync(file, content);
    });
}

// Usage
fixImports('./showcase');