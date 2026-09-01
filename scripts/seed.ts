const events = [
  // Technical Events
  {
    title: 'NEURAL QUEST',
    slug: 'neural-quest',
    description: 'A high-intensity battle of intellect testing your acumen across modern AI, Machine Learning architectures, LLMs, and computational logic.',
    shortDesc: 'Battle of Neural Minds and Machine Intelligence',
    category: 'technical',
    date: new Date('2026-09-12'),
    time: '10:00 AM - 12:30 PM',
    venue: 'Tech Hall 1',
    coordinator: 'Ayyub (4th Year), Rifan & Mehjabeen (2nd Year)',
    contact: 'contact@aetherion26.org',
    price: 100,
    maxParticipants: 100,
    prizes: '1st: ₹1,000 | 2nd: ₹500 | Total: ₹1,500',
    prerequisites: 'Knowledge in Machine Learning, Deep Learning, and AI Fundamentals',
  },
  {
    title: 'AI ESCAPE ROOM',
    slug: 'black-box',
    description: 'Reverse engineering challenge. Given mystery inputs and resulting outputs, deduce hidden algorithmic logic and reconstruct the exact source code.',
    shortDesc: 'Reverse Engineer the Unknown Code & Logic',
    category: 'technical',
    date: new Date('2026-09-12'),
    time: '01:30 PM - 03:30 PM',
    venue: 'Computing Hub A',
    coordinator: 'Malik (4th Year), Nafees & Karthik (2nd Year)',
    contact: 'contact@aetherion26.org',
    price: 100,
    maxParticipants: 80,
    prizes: '1st: ₹1,000 | 2nd: ₹500 | Total: ₹1,500',
    prerequisites: 'C/C++/Java/Python proficiency',
  },
  {
    title: 'PPT (Paper Presentation)',
    slug: 'ppt',
    description: 'Present original research papers, reviews, and engineering breakthroughs across AI, Cyber Security, IoT, and Cloud Computing.',
    shortDesc: 'Showcase Groundbreaking Research & Innovations',
    category: 'technical',
    date: new Date('2026-09-12'),
    time: '10:30 AM - 01:00 PM',
    venue: 'Conference Auditorium',
    coordinator: 'Madina (4th Year), Sharmi Sri & Sindhya (2nd Year)',
    contact: 'contact@aetherion26.org',
    price: 150,
    maxParticipants: 60,
    prizes: '1st: ₹1,000 | 2nd: ₹500 | Total: ₹1,500',
    prerequisites: 'Presentation slides and IEEE format abstract submission',
  },
  {
    title: 'UI/UX DESIGN DESIGNATHON',
    slug: 'ui-ux',
    description: 'Craft intuitive, aesthetically breathtaking, futuristic user experiences and interactive prototypes based on on-spot problem briefs.',
    shortDesc: 'Craft Intuitive, Futuristic Digital Experiences',
    category: 'technical',
    date: new Date('2026-03-16'),
    time: '11:00 AM - 02:00 PM',
    venue: 'Design Studio Lab',
    coordinator: 'Sara (4th Year), Yumna & Sultan (2nd Year)',
    contact: 'contact@aetherion26.org',
    price: 100,
    maxParticipants: 70,
    prizes: '1st: ₹1,000 | 2nd: ₹500 | Total: ₹1,500',
    prerequisites: 'Figma / Adobe XD / Penpot knowledge',
  },

  {
    title: 'CODE DEBUGGING',
    slug: 'code-debugging',
    description: 'Find bugs, fix memory leaks, and solve complex edge cases across multiple languages under time pressure.',
    shortDesc: 'Multi-round code syntax & logic debugging challenge',
    category: 'technical',
    date: new Date('2026-09-12'),
    time: '10:30 AM - 12:30 PM',
    venue: 'Computing Lab B',
    coordinator: 'Jeevan Kumar S (4th Year), Mrs. Kiruthiga R (Faculty)',
    contact: 'contact@aetherion26.org',
    price: 100,
    maxParticipants: 80,
    prizes: '1st: ₹1,000 | 2nd: ₹500 | Total: ₹1,500',
    prerequisites: 'Knowledge in C/C++, Java, Python, and Debugging concepts',
  },

  // Non-Technical Events
  {
    title: 'CREATIVE QUEST',
    slug: 'creative-quest',
    description: 'A fun and innovative non-technical event designed to test your out-of-the-box thinking, creative design, and problem-solving agility.',
    shortDesc: 'Unleash your imagination, design, and lateral thinking',
    category: 'non-technical',
    date: new Date('2026-03-16'),
    time: '11:30 AM - 01:00 PM',
    venue: 'Design Studio & Creative Hub',
    coordinator: 'Afraa K.S (4th Year), Kiruthiga (Faculty)',
    contact: 'contact@aetherion26.org',
    price: 100,
    maxParticipants: 60,
    prizes: '1st: ₹1,000 | 2nd: ₹500 | Total: ₹1,500',
    prerequisites: 'Lateral thinking and creative teamwork',
  },
  {
    title: 'WRONG ANSWERS ONLY',
    slug: 'wrong-answers-only',
    description: 'A hilarious fast-paced quiz where giving the correct answer gets you eliminated! Think fast, stay witty, and come up with the funniest wrong responses.',
    shortDesc: 'Where the wrong answer is the right way to win!',
    category: 'non-technical',
    date: new Date('2026-03-16'),
    time: '02:00 PM - 03:30 PM',
    venue: 'Open Amphitheatre',
    coordinator: 'TheanMercy M (4th Year), Shakila A (Faculty)',
    contact: 'contact@aetherion26.org',
    price: 80,
    maxParticipants: 60,
    prizes: '1st: ₹1,000 | 2nd: ₹500 | Total: ₹1,500',
    prerequisites: 'Quick reflexes and witty humor',
  },
  {
    title: 'E-SPORTS CHAMPIONSHIP (Free Fire & E-Football)',
    slug: 'e-sports',
    description: 'Mobile gaming arena featuring intense Free Fire Squad Battle Royale and 1v1 tactical E-Football knockout tournaments.',
    shortDesc: 'The Ultimate Mobile Gaming Arena',
    category: 'non-technical',
    date: new Date('2026-09-12'),
    time: '10:00 AM - 04:00 PM',
    venue: 'E-Sports Arena',
    coordinator: 'Free Fire: Mohamed Shafiq | E-Football: Mohamed Aarif Buhary',
    contact: 'contact@aetherion26.org',
    price: 150,
    maxParticipants: 128,
    prizes: '1st: ₹1,000 | 2nd: ₹500 | Total: ₹1,500',
    prerequisites: 'Mobile devices only. No emulators or physical triggers.',
  },
  {
    title: 'FILM HUNT',
    slug: 'film-hunt',
    description: 'Cinephile treasure hunt decoding cryptic movie clues, soundtracks, dialogue fragments, and on-campus mystery trails.',
    shortDesc: 'Cinematic Clues, Climax Deduction & Media Trivia',
    category: 'non-technical',
    date: new Date('2026-03-16'),
    time: '11:30 AM - 01:30 PM',
    venue: 'Campus Quad & Media Lab',
    coordinator: 'Mohamed Abdul Faazil A (4th Year), Tameem & Durgeh (2nd Year)',
    contact: 'contact@aetherion26.org',
    price: 100,
    maxParticipants: 80,
    prizes: '1st: ₹1,000 | 2nd: ₹500 | Total: ₹1,500',
    prerequisites: 'Sharp film trivia knowledge and campus navigation',
  },
  {
    title: 'VOICE & NOISE',
    slug: 'voice-and-noise',
    description: 'Sonic perception and auditory showdown featuring vocal sound mimicry, beatboxing, dialogue dubbing, and Foley battles.',
    shortDesc: 'Sonic Perception, Acoustics & Vocal Showdown',
    category: 'non-technical',
    date: new Date('2026-09-12'),
    time: '02:00 PM - 03:30 PM',
    venue: 'Acoustic Stage',
    coordinator: 'Divya (4th Year), Kausmitha & Usna (2nd Year)',
    contact: 'contact@aetherion26.org',
    price: 80,
    maxParticipants: 50,
    prizes: '1st: ₹1,000 | 2nd: ₹500 | Total: ₹1,500',
    prerequisites: 'Vocal control, rhythm, and mimicry',
  },

];

async function seed() {
  console.log("Seeding AETHERION'26 database...");

  const mongoose = await import('mongoose');
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error('MONGODB_URI not set in environment');
    process.exit(1);
  }

  await mongoose.default.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const Event = (await import('../models/Event')).default;
  const User = (await import('../models/User')).default;
  const bcrypt = (await import('bcryptjs')).default;

  // Clear existing
  await Event.deleteMany({});
  await User.deleteMany({});
  console.log('Cleared existing data');

  // Seed events
  await Event.insertMany(events);
  console.log(`Seeded ${events.length} AETHERION'26 official events`);

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  await User.create({
    name: 'AETHERION Admin',
    email: process.env.ADMIN_EMAIL || 'admin@aetherion26.org',
    password: adminPassword,
    role: 'admin',
  });
  console.log('Created AETHERION admin user');

  await mongoose.default.disconnect();
  console.log('AETHERION Database Seed Complete!');
}

seed().catch(console.error);
