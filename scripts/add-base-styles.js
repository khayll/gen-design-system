const fs = require('fs');
const path = require('path');

// Read base styles from styling guidelines
const stylingGuidelinesPath = path.join(process.cwd(), 'prompts', 'system', 'styling.md');
const stylingContent = fs.readFileSync(stylingGuidelinesPath, 'utf8');

// Extract base styles from the markdown file
const baseStylesMatch = stylingContent.match(/```css\n:host \{([\s\S]*?)\}\n```/);
const baseStyles = baseStylesMatch ? baseStylesMatch[1] : '';

// Create the style tag with the extracted styles
const styleTag = `
<style>
    body {
        ${baseStyles}
    }
</style>
`;

function addBaseStylesToShowcase(filePath) {
    try {
        // Read the showcase file
        let content = fs.readFileSync(filePath, 'utf8');

        // Check if base styles are already present
        if (content.includes(':host {') && content.includes('--gds-color-primary:')) {
            console.log(`Base styles already present in ${filePath}`);
            return;
        }

        // Insert base styles after the opening <head> tag
        content = content.replace(/<head>/, `<head>${styleTag}`);

        // Write the modified content back to the file
        fs.writeFileSync(filePath, content);
        console.log(`Added base styles to ${filePath}`);
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