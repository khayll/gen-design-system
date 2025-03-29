const fs = require('fs');
const path = require('path');

// Read base styles from styling guidelines
const stylingGuidelinesPath = path.join(process.cwd(), 'prompts', 'system', 'styling.md');
const stylingContent = fs.readFileSync(stylingGuidelinesPath, 'utf8');

// Extract base styles from the markdown file with improved regex
const baseStylesMatch = stylingContent.match(/```css\n:host\s*\{([\s\S]*?)\}\n```/);
const baseStyles = baseStylesMatch 
    ? baseStylesMatch[1]
        .trim()
        .replace(/^\s+/gm, '')  // Remove leading spaces from each line
        .replace(/\n/g, ' ')    // Replace newlines with spaces
    : '';

// Verify we have styles before proceeding
if (!baseStyles) {
    console.error('No base styles found in styling.md');
    process.exit(1);
}

// Add these lines after extracting the styles
console.log('Extracted styles:', baseStyles);

// Create the style tag with the extracted styles
const styleTag = `
<style>
    body {${baseStyles}}
</style>`;

// Add these lines after generating the style tag
console.log('Generated style tag:', styleTag);

function addBaseStylesToShowcase(filePath) {
    try {
        // Read the showcase file
        let content = fs.readFileSync(filePath, 'utf8');

        // Insert base styles after the opening <head> tag
        // Make sure there's no extra whitespace that might break the HTML
        content = content.replace(/<head>/, `<head>${styleTag.trim()}`);

        // Write the modified content back to the file
        fs.writeFileSync(filePath, content);
        console.log(`Added base styles to ${filePath}`);
        
        // Verify the insertion
        if (!fs.readFileSync(filePath, 'utf8').includes(styleTag.trim())) {
            console.warn(`Style tag may not have been properly inserted in ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

// Get the showcase directory path
const showcaseDir = path.join(process.cwd(), 'screenshots', 'showcases');

// Process all HTML files in the showcase directory
fs.readdirSync(showcaseDir)
    .filter(file => file.endsWith('.showcase.html'))
    .forEach(file => {
        const filePath = path.join(showcaseDir, file);
        addBaseStylesToShowcase(filePath);
    }); 