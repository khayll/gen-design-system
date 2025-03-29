// scripts/fix-showcase-imports.js
/**
 * This script inlines UMD component code directly into showcase HTML files
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

function getUmdFilePath(filePath) {
    const match = filePath.match(/libs\/([^/]+)\/src\/lib\/([^.]+)\.showcase\.html/);
    if (!match) {
        console.error(`Could not extract component name from ${filePath}`);
        return null;
    }

    const [, libName] = match;
    return path.join(process.cwd(), 'dist', 'libs', libName, 'index.umd.cjs');
}

async function fixShowcaseFile(filePath) {
    try {
        const umdPath = getUmdFilePath(filePath);
        if (!umdPath) {
            console.error(`❌ Could not determine UMD path for ${filePath}`);
            return;
        }

        // Read the UMD file and showcase file
        const [umdContent, showcaseContent] = await Promise.all([
            fs.readFile(umdPath, 'utf8'),
            fs.readFile(filePath, 'utf8')
        ]);

        let newContent = showcaseContent;

        // Remove import statements from any existing script tags
        newContent = newContent.replace(
            /(<script[^>]*>)([\s\S]*?)(<\/script>)/g,
            (match, openTag, content, closeTag) => {
                // Remove import statements but keep the script tag and other contents
                const cleanedContent = content.replace(/import .+ from .+;?\n?/g, '');
                return `${openTag}${cleanedContent}${closeTag}`;
            }
        );

        // Check if we already have our UMD script tag
        const umdScriptTag = `<script data-showcase-umd>\n${umdContent}\n</script>`;
        
        if (newContent.includes('data-showcase-umd')) {
            // Replace existing UMD script tag
            newContent = newContent.replace(
                /<script data-showcase-umd>[\s\S]*?<\/script>/,
                umdScriptTag
            );
        } else {
            // Add UMD script tag before closing head
            newContent = newContent.replace(
                '</head>',
                `  ${umdScriptTag}\n</head>`
            );
        }

        await fs.writeFile(filePath, newContent);
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

    console.log(`Found ${showcaseFiles.length} showcase files. Inlining UMD code...`);

    for (const file of showcaseFiles) {
        await fixShowcaseFile(file);
    }

    console.log('Done fixing showcase files.');
}

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});