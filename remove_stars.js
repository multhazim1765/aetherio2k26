const fs = require('fs');
const path = 'lib/data/events.ts';
let content = fs.readFileSync(path, 'utf8');

// Replace all occurrences of ** with empty string
content = content.replace(/\*\*/g, '');

fs.writeFileSync(path, content, 'utf8');
console.log('Removed all ** from events.ts');
