const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Colors
content = content.replace(/#181513/g, '#000000');
content = content.replace(/#F3EFEA/g, '#FFFFFF');
content = content.replace(/bg-\[#e8e3dc\]/g, 'bg-[#E5E5E5]');

// Texts
content = content.replace(/Evolve Private Wealth/g, 'Stewardship Advisory Limited');
content = content.replace(/Evolve Expands/g, 'Stewardship Expands');
content = content.replace(/Evolve/g, 'Stewardship');

fs.writeFileSync('src/App.tsx', content);
console.log('Brand updated successfully.');
