const fs = require('fs');
const path = require('path');

// Function to process a single file
function processFile(filePath) {
  console.log(`Processing file: ${filePath}`);
  
  // Read the file content
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace :host with body in style tags
  content = content.replace(/:host/g, 'body');
  
  // Write the modified content back to the file
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
}

// Main function to process all showcase files
function main() {
  const showcasesDir = path.join(process.cwd(), 'screenshots', 'showcases');
  
  // Ensure the directory exists
  if (!fs.existsSync(showcasesDir)) {
    console.error('Showcases directory not found');
    process.exit(1);
  }
  
  // Get all HTML files in the showcases directory
  const files = fs.readdirSync(showcasesDir)
    .filter(file => file.endsWith('.showcase.html'));
  
  // Process each file
  files.forEach(file => {
    const filePath = path.join(showcasesDir, file);
    processFile(filePath);
  });
  
  console.log('Finished processing all showcase files');
}

// Run the script
main(); 