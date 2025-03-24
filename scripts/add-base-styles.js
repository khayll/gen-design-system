const fs = require('fs');
const path = require('path');

// Base styling CSS from the styling guidelines
const baseStyles = `
<style>
    body {
        /* Colors */
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

        /* Typography */
        --gds-font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        --gds-font-size-xs: 0.75rem;
        --gds-font-size-sm: 0.875rem;
        --gds-font-size-md: 1rem;
        --gds-font-size-lg: 1.125rem;
        --gds-font-size-xl: 1.25rem;
        --gds-font-weight-normal: 400;
        --gds-font-weight-medium: 500;
        --gds-font-weight-bold: 700;

        /* Spacing */
        --gds-spacing-xs: 0.25rem;
        --gds-spacing-sm: 0.5rem;
        --gds-spacing-md: 1rem;
        --gds-spacing-lg: 1.5rem;
        --gds-spacing-xl: 2rem;

        /* Borders */
        --gds-border-radius-sm: 0.25rem;
        --gds-border-radius-md: 0.375rem;
        --gds-border-radius-lg: 0.5rem;
        --gds-border-radius-full: 9999px;
        --gds-border-width: 1px;

        /* Shadows */
        --gds-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        --gds-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --gds-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

        /* Transitions */
        --gds-transition-fast: 150ms;
        --gds-transition-normal: 250ms;
        --gds-transition-slow: 350ms;
    }
</style>
`;

function addBaseStylesToShowcase(filePath) {
    try {
        // Read the showcase file
        let content = fs.readFileSync(filePath, 'utf8');

        // Check if base styles are already present
        if (content.includes('--gds-color-primary')) {
            console.log(`Base styles already present in ${filePath}`);
            return;
        }

        // Insert base styles after the opening <head> tag
        content = content.replace(/<head>/, `<head>${baseStyles}`);

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