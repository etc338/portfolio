const fs = require('fs');
const content = fs.readFileSync('temp.txt', 'utf8');
fs.writeFileSync('src/app/page.tsx', '"use client";\n' + content);
console.log('page.tsx written successfully');
