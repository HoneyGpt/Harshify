
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\New\\SmartTone\\Harshify\\src\\components\\MusicApp.tsx', 'utf8');

function checkBalance(text) {
    let openBraces = 0;
    let closeBraces = 0;
    let openTags = [];
    
    // Simple bracket check
    for (let char of text) {
        if (char === '{') openBraces++;
        if (char === '}') closeBraces++;
    }
    
    console.log(`Braces: { = ${openBraces}, } = ${closeBraces}`);
    
    // Simple tag check (ignoring self-closing)
    const tagRegex = /<([a-zA-Z0-9.]+)|<\/([a-zA-Z0-9.]+)/g;
    let match;
    while ((match = tagRegex.exec(text)) !== null) {
        if (match[1]) {
            // Opening tag (could be self-closing but we'll try to guess)
            // This is a naive check
        } else if (match[2]) {
            // Closing tag
        }
    }
}

checkBalance(content);
