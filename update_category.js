const fs = require('fs');
const path = 'lib/data/events.ts';
let content = fs.readFileSync(path, 'utf8');

// Update type
content = content.replace(
  `category: 'technical' | 'non-technical';`,
  `category: 'technical' | 'non-technical' | 'e-sports';`
);

// Update Free Fire
content = content.replace(
  `id: 'e-sports',\n    slug: 'e-sports',\n    title: 'FREE FIRE TOURNAMENT',\n    category: 'non-technical',`,
  `id: 'e-sports',\n    slug: 'e-sports',\n    title: 'FREE FIRE TOURNAMENT',\n    category: 'e-sports',`
);

// Update E-Football
content = content.replace(
  `id: 'e-football',\n    slug: 'e-football',\n    title: 'E-FOOTBALL ESPORTS',\n    category: 'non-technical',`,
  `id: 'e-football',\n    slug: 'e-football',\n    title: 'E-FOOTBALL',\n    category: 'e-sports',`
);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated categories in events.ts');
