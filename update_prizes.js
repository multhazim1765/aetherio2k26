const fs = require('fs');

let content = fs.readFileSync('lib/data/events.ts', 'utf8');

// Update all prize blocks
content = content.replace(/prizes: \{[\s\S]*?\},/g, 
  `prizes: {
      first: '₹1,000',
      second: '₹500',
      overall: '₹1,500',
    },`
);

// Update SYMPOSIUM_METADATA total prize pool if any
content = content.replace(/\{ label: "Total Prize Pool", value: "₹50K\+", prefix: "" \}/g, 
  `{ label: "Total Prize Pool", value: "₹18K+", prefix: "" }`
);

fs.writeFileSync('lib/data/events.ts', content, 'utf8');
console.log('Updated events.ts');

let seedContent = fs.readFileSync('scripts/seed.ts', 'utf8');
// Update prize strings in seed.ts
seedContent = seedContent.replace(/prizes: '.*?',/g, 
  `prizes: '1st: ₹1,000 | 2nd: ₹500 | Total: ₹1,500',`
);
fs.writeFileSync('scripts/seed.ts', seedContent, 'utf8');
console.log('Updated scripts/seed.ts');
