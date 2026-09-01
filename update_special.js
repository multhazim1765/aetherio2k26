const fs = require('fs');

// 1. Update lib/data/events.ts
let eventsFile = 'lib/data/events.ts';
let eventsContent = fs.readFileSync(eventsFile, 'utf8');

// Change categories for fitness-event and free-style
eventsContent = eventsContent.replace(
  /id: 'fitness-event',([\s\S]*?)category: 'non-technical',/,
  "id: 'fitness-event',$1category: 'special',"
);
eventsContent = eventsContent.replace(
  /id: 'free-style',([\s\S]*?)category: 'non-technical',/,
  "id: 'free-style',$1category: 'special',"
);

// We already added 'special' to EventItem category in a previous step, but just to be sure:
if (!eventsContent.includes("| 'special';")) {
  eventsContent = eventsContent.replace(
    /category: 'technical' \| 'non-technical' \| 'e-sports';/,
    "category: 'technical' | 'non-technical' | 'e-sports' | 'special';"
  );
}
fs.writeFileSync(eventsFile, eventsContent);
console.log('Updated events.ts');

// 2. Update scripts/seed.ts
let seedFile = 'scripts/seed.ts';
let seedContent = fs.readFileSync(seedFile, 'utf8');
seedContent = seedContent.replace(
  /id: 'fitness-event',([\s\S]*?)category: 'non-technical',/,
  "id: 'fitness-event',$1category: 'special',"
);
seedContent = seedContent.replace(
  /id: 'free-style',([\s\S]*?)category: 'non-technical',/,
  "id: 'free-style',$1category: 'special',"
);
fs.writeFileSync(seedFile, seedContent);
console.log('Updated seed.ts');

// 3. Update components/event-explorer.tsx
let explorerFile = 'components/event-explorer.tsx';
let explorerContent = fs.readFileSync(explorerFile, 'utf8');
explorerContent = explorerContent.replace(
  /useState<'all' \| 'technical' \| 'non-technical' \| 'e-sports'>/,
  "useState<'all' | 'technical' | 'non-technical' | 'e-sports' | 'special'>"
);
explorerContent = explorerContent.replace(
  /if \(selectedCategory === 'e-sports'\) matchesCat = event\.category === 'e-sports';/,
  "if (selectedCategory === 'e-sports') matchesCat = event.category === 'e-sports';\n      if (selectedCategory === 'special') matchesCat = event.category === 'special';"
);
explorerContent = explorerContent.replace(
  /\{ id: 'e-sports', label: 'E-Sports' \},/,
  "{ id: 'e-sports', label: 'E-Sports' },\n            { id: 'special', label: 'Special Events' },"
);
fs.writeFileSync(explorerFile, explorerContent);
console.log('Updated event-explorer.tsx');

// 4. Update components/schedule-section.tsx
let scheduleFile = 'components/schedule-section.tsx';
let scheduleContent = fs.readFileSync(scheduleFile, 'utf8');
scheduleContent = scheduleContent.replace(
  /useState\<'All' \| 'Technical' \| 'Non-Technical'\>\('All'\);/,
  "useState<'All' | 'Technical' | 'Non-Technical' | 'Special'>('All');"
);
scheduleContent = scheduleContent.replace(
  /\(\['All', 'Technical', 'Non-Technical'\] as const\)/,
  "(['All', 'Technical', 'Non-Technical', 'Special'] as const)"
);
// Inside the filter logic
scheduleContent = scheduleContent.replace(
  /const isNonTech = item\.category === 'Non-Technical';/,
  "const isNonTech = item.category === 'Non-Technical';\n          const isSpecial = item.category === 'Special';"
);
scheduleContent = scheduleContent.replace(
  /if \(filterCategory === 'Non-Technical'\) return isNonTech;/,
  "if (filterCategory === 'Non-Technical') return isNonTech;\n          if (filterCategory === 'Special') return isSpecial;"
);
fs.writeFileSync(scheduleFile, scheduleContent);
console.log('Updated schedule-section.tsx');

// 5. Update components/coordinators-section.tsx
let coordsFile = 'components/coordinators-section.tsx';
let coordsContent = fs.readFileSync(coordsFile, 'utf8');
coordsContent = coordsContent.replace(
  /useState\<'all' \| 'technical' \| 'non-technical'\>\('all'\);/,
  "useState<'all' | 'technical' | 'non-technical' | 'special'>('all');"
);
coordsContent = coordsContent.replace(
  /\{ id: 'non-technical', label: 'Non-Technical Leads' \},/,
  "{ id: 'non-technical', label: 'Non-Technical Leads' },\n            { id: 'special', label: 'Special Events Leads' },"
);
coordsContent = coordsContent.replace(
  /if \(filter === 'non-technical'\) return event\.category === 'non-technical';/,
  "if (filter === 'non-technical') return event.category === 'non-technical';\n    if (filter === 'special') return event.category === 'special';"
);
fs.writeFileSync(coordsFile, coordsContent);
console.log('Updated coordinators-section.tsx');

// 6. Update components/event-card.tsx
let cardFile = 'components/event-card.tsx';
let cardContent = fs.readFileSync(cardFile, 'utf8');
cardContent = cardContent.replace(
  /const bgColors = \{([\s\S]*?)'e-sports': 'bg-\[#f59e0b\]\/20 text-\[#fcd34d\]',([\s\S]*?)\};/,
  "const bgColors = {$1'e-sports': 'bg-[#f59e0b]/20 text-[#fcd34d]',$2'special': 'bg-[#ec4899]/20 text-[#f472b6]',\n  };"
);
fs.writeFileSync(cardFile, cardContent);
console.log('Updated event-card.tsx');

// 7. Update components/registration-form.tsx
let regFile = 'components/registration-form.tsx';
let regContent = fs.readFileSync(regFile, 'utf8');
regContent = regContent.replace(
  /\{EVENTS_DATA\.filter\(\(e\) => e\.category === 'non-technical' \|\| e\.category === 'e-sports'\)\.map/,
  "{EVENTS_DATA.filter((e) => e.category === 'non-technical' || e.category === 'e-sports' || e.category === 'special').map"
);
regContent = regContent.replace(
  /<span>Non-Technical & E-Sports Tracks<\/span>/,
  "<span>Non-Technical, Special & E-Sports Tracks</span>"
);
fs.writeFileSync(regFile, regContent);
console.log('Updated registration-form.tsx');
