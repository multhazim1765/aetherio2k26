import { only } from "node:test";
import { add, or } from "three/src/nodes/math/OperatorNode.js";

export interface Coordinator {
  name: string;
  year: '4th Year' | '2nd Year' | '3rd Year' | 'Faculty' | 'Staff';
  role?: string;
  phone?: string;
}

export interface SubEvent {
  id: string;
  name: string;
  description: string;
  coordinators: Coordinator[];
  rules?: string[];
  teamSize?: string;
  prize?: string;
  fee?: number;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  category: 'technical' | 'non-technical' | 'e-sports';
  subCategory?: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  date: string;
  time: string;
  venue: string;
  fee: number;
  teamSize: string;
  prizes: {
    first?: string;
    second?: string;
    third?: string;
    overall?: string;
  };
  coordinators: Coordinator[];
  subEvents?: SubEvent[];
  rules: string[];
  rounds?: { title: string; desc: string }[];
  judgingCriteria?: string[];
  iconName: string;
  badge?: string;
  isActive: boolean;
}

export const OFFICIAL_PAYMENT_INFO = {
  upiId: 'abdulmalik4041977@okhdfcbank',
  accountInfo: 'Tamilnad Mercantile Bank 6781',
  payeeName: "Aetherion '26",
  qrImagePath: '/qr-code.png',
};

export const GOOGLE_FORM_REGISTRATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdCrqKNRWyz6w1rYWcoR_1etYfvPkYTo7Vys_ORtFHhhfusYA/viewform?usp=preview";

export const SYMPOSIUM_METADATA = {
  name: "AETHERION'26",
  presenter: "AMSphere",
  tagline: "Convergence of Intelligence, Technology & Innovation",
  institution: "AMSphere",
  date: "[SYMPOSIUM DATE]",
  venue: "[CAMPUS AUDITORIUM & TECH HUBS]",
  registrationUrl: GOOGLE_FORM_REGISTRATION_URL,
  email: "contact@aetherion26.org",
  pricingOffer: "₹150 Flat Fee (For All Events)",
  stats: [
    { label: "Technical & Non-Tech Events", value: "8+", prefix: "" },
    { label: "Pass Fee (All Events)", value: "₹150", prefix: "" },
  ]
};
export const EVENTS_DATA: EventItem[] = [
  // --- TECHNICAL EVENTS ---
  {
    id: 'neural-quest',
    slug: 'neural-quest',
    title: 'NEURAL QUEST',
    category: 'technical',
    tagline: 'Test your AI knowledge, observation, and creativity.',
    shortDesc: 'A 4-round event testing your AI knowledge, observation, and creativity. Think smart, spot the AI, and prompt like a pro!',
    fullDesc: 'NEURAL QUEST is a 4-round event testing your AI knowledge, observation, and creativity. From identifying AI slides to quick-fire MCQs, spotting AI-generated images, and crafting the best tech prompts, this event will push your boundaries. Think smart. Spot the AI. Prompt like a pro. The team with the highest score wins NEURAL QUEST!!!',
    date: '[SYMPOSIUM DATE]',
    time: '10:00 AM - 12:30 PM',
    venue: 'Tech Hall 1',
    fee: 100,
    teamSize: '2 Members',
    prizes: {
      first: '₹1,000',
      second: '₹500',
      overall: '₹1,500',
    },
    coordinators: [
      { name: 'Mohammed Ayyub Khan', year: '4th Year', role: 'Student Coordinator', phone: '9940518091' },
      { name: 'Mrs. Muthupriya C', year: 'Faculty', role: 'Asst. Professor' },
    ],
    rules: [
      'Each team consists of exactly 2 members.',
      'No mobile phones or internet during the rounds.',
      'Decisions made by the judging panel and quiz masters are final and binding.',
      'The teams with the lowest scores in Round 3 will be eliminated.',
    ],
    rounds: [
      { title: 'ROUND 1 — AI SLIDES', desc: 'Test your knowledge through AI-related slides, images, and clues. Observe carefully and identify the correct answer!' },
      { title: 'ROUND 2 — AI MCQs', desc: 'A quick-fire round of AI and technology-based multiple-choice questions. Choose the correct answer before time runs out!' },
      { title: 'ROUND 3 — HUMAN OR AI? (Elimination Round)', desc: 'Can you tell what’s real and what’s AI-generated? Identify whether the given image is Human-made or AI-generated.' },
      { title: 'ROUND 4 — TECH PROMPTS (Final Round)', desc: 'Put your technical knowledge and creativity to the test! Teams will be given a situation or task and must create the best AI prompt to solve it.' },
    ],
    judgingCriteria: [
      'Accuracy of response under time constraints',
      'Ability to distinguish between real and AI-generated content',
      'Creativity and effectiveness of AI prompts in the final round',
    ],
    iconName: 'Cpu',
    badge: 'Popular',
    isActive: true,
  },
  {
    id: 'black-box',
    slug: 'black-box',
    title: 'AI ESCAPE ROOM',
    category: 'technical',
    tagline: 'Team-based AI puzzle-solving experience',
    shortDesc: 'Solve AI-based puzzles, clues, and challenges to escape before the allotted time expires.',
    fullDesc: 'AI Escape Room is a thrilling team-based AI puzzle-solving experience. Work together to solve AI-based puzzles, clues, and challenges to escape. Complete the challenge before the allotted time expires.',
    date: '[SYMPOSIUM DATE]',
    time: '01:30 PM - 03:30 PM',
    venue: 'Computing Hub A',
    fee: 100,
    teamSize: '2-3 Members',
    prizes: {
      first: '₹1,000',
      second: '₹500',
      overall: '₹1,500',
    },
    coordinators: [
      { name: 'Abdul Malik B J', year: '4th Year', role: 'Student Coordinator', phone: '7550365320' },
      { name: 'Mrs. Muthupriya C', year: 'Faculty', role: 'Asst. Professor' },
    ],
    rules: [
      'Team Size: Each team must have 2–3 members.',
      'Time Limit: The challenge must be completed within the allotted time.',
      'Teamwork: Members must work together to solve the challenges.',
      'No Outside Help: Assistance from other teams or outsiders is strictly prohibited.',
      'No Mobile Phones: Mobile phones are not permitted during the challenge.',
      'Fair Play: Teams must follow the instructions given by the organizers.',
      'Final Decision: The organizers\' decision will be final and binding.',
    ],
    rounds: [
      { title: 'Round 1 — Enter the Room', desc: 'Teams receive the initial AI challenge and clues. Carefully analyze the information provided.' },
      { title: 'Round 2 — Solve the Clues', desc: 'Work together to solve puzzles and unlock the next stages. Each solved challenge leads to the next clue.' },
      { title: 'Final Round — Escape', desc: 'Complete the final challenge before time runs out. The team that successfully completes the challenge according to the event criteria qualifies as the winner.' },
    ],
    judgingCriteria: [
      'Successful escape before time runs out',
      'Accuracy in solving AI puzzles and clues',
      'Teamwork and collaborative problem-solving',
    ],
    iconName: 'Terminal',
    badge: 'Hardcore',
    isActive: true,
  },
  {
    id: 'ppt',
    slug: 'ppt',
    title: 'PPT (Paper Presentation)',
    category: 'technical',
    tagline: 'Showcase Groundbreaking Research & Innovations',
    shortDesc: 'Present your visionary technical papers, research publications, or novel engineering ideas before an esteemed panel of experts.',
    fullDesc: 'The Paper Presentation symposium track invites students to share original research, technical reviews, and engineering breakthroughs across Artificial Intelligence, Quantum Computing, IoT, Renewable Systems, Cyber Security, and Cloud Architecture.',
    date: '[SYMPOSIUM DATE]',
    time: '10:30 AM - 01:00 PM',
    venue: 'Conference Auditorium',
    fee: 150,
    teamSize: '1-3 Members',
    prizes: {
      first: '₹1,000',
      second: '₹500',
      overall: '₹1,500',
    },
    coordinators: [
      { name: 'Mohammed Madina', year: '4th Year', role: 'Student Coordinator', phone: '7732003687' },
      { name: 'Mr. Khaja Mohideen C', year: 'Faculty', role: 'Asst. Professor' },
    ],
    rules: [
      'Presentation duration: 8 minutes presentation + 2 minutes Q&A.',
      'Slide decks must be submitted in PPTX or PDF format 30 minutes prior to the event.',
      'Plagiarism must not exceed standard academic thresholds (max 15%).',
      'All team members must participate actively in the presentation delivery.',
    ],
    rounds: [
      { title: 'Round 1: Abstract & Paper Shortlisting', desc: 'Pre-event screening of research abstracts and methodology.' },
      { title: 'Round 2: Live Defense & Demonstration', desc: 'On-stage presentation and defense before the academic & industry jury.' },
    ],
    judgingCriteria: [
      'Novelty and technical depth of the research',
      'Clarity of presentation slides and delivery',
      'Response to panel questions during Q&A',
    ],
    iconName: 'Presentation',
    badge: 'Research',
    isActive: true,
  },
  {
    id: 'ui-ux',
    slug: 'ui-ux',
    title: 'AI WEB SPRINT',
    category: 'technical',
    tagline: 'AI-powered frontend development, creativity, UI design, problem solving and speed.',
    shortDesc: 'Participants receive a problem statement and must create the best frontend website using AI tools within the given time limit.',
    fullDesc: 'Team Size: 2–4 Members\n\nObjective:\nParticipants receive a problem statement and must create the best frontend website using AI tools within the given time limit.\n\nTime Limit: 20 Minutes\n\nFocus:\nAI-powered frontend development, creativity, UI design, problem solving and speed.',
    date: '[SYMPOSIUM DATE]',
    time: '11:00 AM - 02:00 PM',
    venue: 'Design Studio Lab',
    fee: 100,
    teamSize: '2-4 Members',
    prizes: {
      first: '₹1,000',
      second: '₹500',
      overall: '₹1,500',
    },
    coordinators: [
      { name: 'Sara Fathima M', year: '4th Year', role: 'Student Coordinator', phone: '7010689438' },
      { name: 'Mr. Khaja Mohideen C', year: 'Faculty', role: 'Asst. Professor' },
    ],
    rules: [
      'The problem statement and requirements will be revealed only at the start of the event.',
      'Participants have 20 minutes to design and build the website.',
      'Any AI-powered website-building tool may be used.',
      'Only frontend/UI development is required.',
      'Backend functionality is not required.',
      'Pre-built projects are strictly prohibited.',
      'Previously prepared projects are strictly prohibited.',
      'Copied projects or content are strictly prohibited.',
      'The final website must satisfy the requirements in the problem statement.',
      'The final website link or output must be submitted before the deadline.',
      'No modifications are permitted after submission.',
      'The judges\' decision will be final and binding.',
    ],
    rounds: [
      { title: 'Challenge Round', desc: '1. The problem statement and requirements are revealed only at the beginning of the event.\n2. Participants analyze the problem statement.\n3. Teams design and build a frontend website using AI-powered tools.\n4. Participants have 20 minutes to complete the challenge.\n5. The final website/output must be submitted before the time limit expires.\n6. The submitted website is evaluated based on how well it satisfies the given requirements.' },
    ],
    judgingCriteria: [
      'User Experience and intuitive navigation flow',
      'Visual polish, typography, and color harmony',
      'Innovation and responsiveness of the prototype',
    ],
    iconName: 'Palette',
    badge: 'Creative',
    isActive: true,
  },
  {
    id: 'code-debugging',
    slug: 'code-debugging',
    title: 'CODE DEBUGGING',
    category: 'technical',
    tagline: 'One Code. Many Bugs. One Winner!',
    shortDesc: 'Individual Format. Participants receive a program with intentional errors and must fix as many bugs as possible within the time limit without internet or AI tools.',
    fullDesc: 'Individual Format: Each participant competes individually.\n\nParticipants will receive a program containing intentional errors. Participants must fix as many errors as possible within the given time.\n\nNo internet, AI tools, or external assistance allowed.\n\nFIND THE BUG:\nIdentify syntax, spelling, capitalization, brackets, and keyword errors. Carefully inspect the given code and locate the bugs.\n\nFIX THE CODE:\nCorrect the identified errors without changing the intended program. Speed and accuracy will determine the score.\n\nWINNER:\nThe participant who fixes the most errors in the shortest time will be declared the winner.\n\n“One Code. Many Bugs. One Winner!”',
    date: '[SYMPOSIUM DATE]',
    time: '10:30 AM - 12:30 PM',
    venue: 'Computing Lab B',
    fee: 100,
    teamSize: 'Solo (1 Player)',
    prizes: {
      first: '₹1,000',
      second: '₹500',
      overall: '₹1,500',
    },
    coordinators: [
      { name: 'Jeevan Kumar S', year: '4th Year', role: 'Student Coordinator', phone: '8122544643' },
      { name: 'Mrs. Kiruthiga R', year: 'Faculty', role: 'Asst. Professor' },
    ],
    rules: [
      'Individual Format: Each participant competes individually.',
      'Participants will receive a program containing intentional errors.',
      'Participants must fix as many errors as possible within the given time.',
      'No internet, AI tools, or external assistance allowed.',
      'FIND THE BUG: Identify syntax, spelling, capitalization, brackets, and keyword errors.',
      'FIX THE CODE: Correct the identified errors without changing the intended program. Speed and accuracy will determine the score.',
      'WINNER: The participant who fixes the most errors in the shortest time will be declared the winner.',
    ],
    rounds: [
      { title: 'ROUND 1 — FIND THE BUG', desc: 'Identify syntax, spelling, capitalization, brackets, and keyword errors. Carefully inspect the given code and locate the bugs.' },
      { title: 'ROUND 2 — FIX THE CODE', desc: 'Correct the identified errors without changing the intended program. Speed and accuracy will determine the score.' },
    ],
    judgingCriteria: [
      'Number of syntax, spelling, capitalization, bracket, and keyword errors fixed',
      'Accuracy of code without changing intended program structure',
      'Completion speed within allotted time',
    ],
    iconName: 'Terminal',
    badge: 'Hardcore',
    isActive: true,
  },

  // --- NON-TECHNICAL EVENTS ---
  {
    id: 'e-sports',
    slug: 'e-sports',
    title: 'FREE FIRE TOURNAMENT',
    category: 'e-sports',
    subCategory: 'Gaming',
    tagline: 'Battle Royale Qualifier → Clash Squad Final',
    shortDesc: 'The top two teams from the Battle Royale points table qualify for the Clash Squad Final.',
    fullDesc: 'Tournament Format:\nBattle Royale Qualifier → Clash Squad Final\n\nQualification:\nThe top two teams from the Battle Royale points table qualify for the Clash Squad Final.\n\nScoring:\n\n| Achievement | Points |\n| ----------- | --------: |\n| Each Kill | 5 Points |\n| Booyah | 10 Points |\n\nThe team winning the Clash Squad Final will be declared the Tournament Winner.',
    date: '[SYMPOSIUM DATE]',
    time: '10:00 AM - 04:00 PM',
    venue: 'E-Sports Arena / Hall B',
    fee: 150,
    teamSize: 'Squad (4 Players)',
    prizes: {
      first: '₹1,000',
      second: '₹500',
      overall: '₹1,500',
    },
    coordinators: [
      { name: 'Mohamed Shafiq', year: '4th Year', role: 'Student Coordinator', phone: '8825514094' },
      { name: 'Ms. Preetha M', year: 'Faculty', role: 'Asst. Professor' },
    ],
    rules: [
      'General Rules: All players and teams must follow organizer and coordinator instructions. Organizer decisions regarding procedures, disputes, penalties and results are final. Serious misconduct or deliberate conflicts may result in team disqualification. Players must maintain proper sportsmanship and respectful behavior.',
      'Fair Play: Panels, hacks, cheats, scripts and unauthorized third-party software are strictly prohibited. Emulators are strictly prohibited. Players must use the permitted mobile platform. Suspicious activity may be investigated by the organizers. Players must cooperate with verification if requested.',
      'Clash Squad Restrictions: Grenades and smoke bombs are not allowed. Gun skins are not allowed. Character skills are not allowed. Players must follow the gameplay settings announced before the match.',
      'Disqualification: If any team member uses a prohibited tool, hack, panel, emulator or unfair advantage, the entire team may be disqualified. Evidence of cheating or rule violations may be reviewed before the final decision. A disqualified team cannot continue the match or claim the winning position.',
      'Winner Declaration: The winner of the Clash Squad Final will be officially declared the Tournament Winner. The result announced by the organizers is official and final. Players or teams must not interfere with the official result after it has been announced.',
      'Code of Conduct: Participants must maintain respectful and professional behavior, follow organizer instructions, avoid disputes, play fairly and report cheating through proper channels.',
    ],
    rounds: [
      { title: 'ROUND 1 — BATTLE ROYALE QUALIFIER', desc: '1. The tournament begins with a Battle Royale match.\n2. The BR match serves as the qualifying round.\n3. Points are awarded based on kills and Booyah.\n4. Each kill earns 5 points.\n5. Booyah earns 10 points.\n6. The final BR ranking is determined by total points.\n7. The top two teams qualify for the Clash Squad Final.' },
      { title: 'TIE-BREAKER', desc: '1. If two teams have the same total points, a 4-round Clash Squad tie-breaker will be conducted.\n2. The winner of the tie-breaker receives the qualification position.\n3. The tie-breaker format and necessary adjustments will be decided by the organizers.' },
      { title: 'ROUND 2 — CLASH SQUAD FINAL', desc: '1. The two teams qualified from the BR round compete in the Clash Squad Final.\n2. The number of rounds and match format will be announced by the organizers.\n3. Necessary changes to the match format may be made based on tournament requirements.' },
    ],
    iconName: 'Gamepad2',
    badge: 'High Stakes',
    isActive: true,
  },
  {
    id: 'film-hunt',
    slug: 'film-hunt',
    title: 'FILM HUNT',
    category: 'non-technical',
    tagline: 'Movie and music-based challenge',
    shortDesc: 'Film Hunt is a movie and music-based challenge testing participants\' knowledge.',
    fullDesc: 'Team Format: 2 Members\n\nTotal Rounds: 4\n\nSpecial Rule: Round 3 is the elimination round.\n\nFilm Hunt is a movie and music-based challenge testing participants\' knowledge of:\n* Movie background music\n* Songs\n* Movie connections\n* Lyrics\n* Actors\n* Famous dialogues\n\nNo mobile phones or internet access are permitted during the rounds.\nTeams must answer only when the host gives permission.',
    date: '[SYMPOSIUM DATE]',
    time: '11:30 AM - 01:30 PM',
    venue: 'Campus Quad & Media Lab',
    fee: 100,
    teamSize: '2 Members',
    prizes: {
      first: '₹1,000',
      second: '₹500',
      overall: '₹1,500',
    },
    coordinators: [
      { name: 'Mohamed Abdul Faazil A', year: '4th Year', role: 'Student Coordinator', phone: '9445328586' },
      { name: 'Ms. Preetha M', year: 'Faculty', role: 'Asst. Professor' },
    ],
    rules: [
      'Each team must consist of exactly 2 members.',
      'Mobile phones are not allowed during the rounds.',
      'Internet access is not allowed during the event.',
      'Teams must answer only when the host gives permission.',
      'Participants must follow the time limits for each round.',
      'Only answers given within the allotted time will be considered.',
      'Participants must not use outside assistance.',
      'Round 3 is the elimination round.',
      'Participants must follow all instructions given by the host and organizers.',
      'The organizers\' decision will be final and binding.',
    ],
    rounds: [
      { title: 'ROUND 1 — BGM BLAST', desc: 'Concept: Identify the movie/song from its background music.\n\nFormat:\n1. Play a 5–15 second BGM clip.\n2. Stop the clip.\n3. Team gets 10 seconds to answer.\n4. Questions may require identifying a song or movie.\n\nRules:\n* Only the first answer is considered.\n* If a team passes, the question may be opened to other teams.\n* Replaying a clip may be prohibited or may carry reduced marks.\n* Difficulty should progressively increase.' },
      { title: 'ROUND 2 — CONNECTION', desc: 'Concept: Find the common connection between multiple movie-related clues.\n\nFormat:\n1. Display/play 3 clues initially.\n2. Clues may include images or movie-related information.\n3. Team gets 15 seconds to identify the connection.\n4. If the team cannot answer, reveal the 4th clue.\n\nRules:\n* Teams must identify the common connection.\n* A misleading clue may be included to increase difficulty.\n* Answers must be given within the allotted time.\n* Only the first valid answer is considered.' },
      { title: 'ROUND 3 — MISSING LYRICS (ELIMINATION ROUND)', desc: 'ELIMINATION ROUND\n\nConcept: Test participants\' knowledge of popular movie songs.\n\nFormat:\n1. Play a short portion of a song.\n2. Stop/mute the song at a specific point.\n3. Display the missing lyric.\n4. Team must provide the next line.\n5. Team gets 10 seconds to answer.\n6. Performance in this round determines elimination.\n\nRules:\n* Only a short portion of the song will be played.\n* The song must stop at a clear point.\n* Answer must match the intended lyric.\n* Participants cannot hum the answer.\n* Participants cannot play the song from their phones.\n* The answer must not be revealed until all teams have attempted.' },
      { title: 'ROUND 4 — FINAL ROUND', desc: 'Objective: Identify movies, actors and famous dialogues using clues.\n\nTeam Format: One participant gives/reads clues while the other participant discusses and guesses.\n\nTime Limit: 15 seconds per challenge.\n\nFormat:\n1. Host starts the timer after giving the first clue.\n2. A secret card is given to one team member.\n3. The card may contain: Actor name, Famous dialogue, Movie-related clue.\n4. The participant provides clues.\n5. The other participant attempts to identify the answer.\n6. The answer must be identified within 15 seconds.\n\nWinner: The team that successfully completes the final challenge according to the event criteria will be declared the winner.' },
    ],
    iconName: 'Film',
    badge: 'Exciting',
    isActive: true,
  },
  {
    id: 'voice-and-noise',
    slug: 'voice-and-noise',
    title: 'VOICE & NOISE GAME',
    category: 'non-technical',
    tagline: 'Team Format: Teams/Pairs',
    shortDesc: 'The Guesser must identify words by watching the Speaker\'s lips while wearing headphones with loud music.',
    fullDesc: 'Team Format: Teams/Pairs\n\nRoles:\n* One participant is the Speaker.\n* One participant is the Guesser.\n\nObjective:\nThe Guesser must identify words by watching the Speaker\'s lips while wearing headphones with loud music.\n\nScoring:\nEvery correctly guessed word = 1 point.\n\nWinner:\nThe team with the highest score wins.',
    date: '[SYMPOSIUM DATE]',
    time: '02:00 PM - 03:30 PM',
    venue: 'Acoustic Stage / Open Amphitheatre',
    fee: 80,
    teamSize: 'Teams/Pairs',
    prizes: {
      first: '₹1,000',
      second: '₹500',
      overall: '₹1,500',
    },
    coordinators: [
      { name: 'Divya K', year: '4th Year', role: 'Student Coordinator', phone: '9941902579' },
      { name: 'Ms. Jeevitha V', year: 'Faculty', role: 'Asst. Professor' },
    ],
    rules: [
      'The Speaker must say the selected word clearly.',
      'The Speaker cannot use hand gestures to communicate the answer.',
      'The Speaker cannot intentionally reveal the word through gestures.',
      'The word must not be shown to the Guesser.',
      'The Guesser must wear headphones with loud music.',
      'The Guesser must attempt to identify the word by watching the Speaker\'s lips.',
      'No outside assistance is allowed.',
      'Only correctly guessed words receive points.',
      'Participants must switch roles when instructed.',
      'The team with the highest score wins.',
      'The organizers\' decision will be final and binding.',
    ],
    rounds: [
      { title: 'Round Format', desc: '1. Divide participants into teams/pairs.\n2. One participant becomes the Speaker.\n3. The other participant becomes the Guesser.\n4. The Guesser wears headphones with loud music.\n5. The Speaker selects a word and says the actual word aloud.\n6. The Guesser watches the Speaker\'s lips and attempts to identify the word.\n7. Set a time limit of approximately 30–60 seconds.\n8. Each correctly guessed word earns 1 point.\n9. After the time ends, participants switch roles.\n10. Scores from both turns are calculated.' },
    ],
    iconName: 'Mic2',
    badge: 'Live',
    isActive: true,
  },
  {
    id: 'creative-quest',
    slug: 'creative-quest',
    title: 'CREATIVE QUEST',
    category: 'non-technical',
    tagline: 'Switch Your Role. Change Your Perspective',
    shortDesc: 'Team Format: 2–4 members. Features 2 creative challenges (Switch-a-Sketch & Touch and Feel) where participants switch roles and perspectives.',
    fullDesc: 'Team Format: Each team consists of 2–4 members.\n\nThe event consists of 2 creative challenges. Participants must switch roles as instructed.\n\nCHALLENGE 1 — SWITCH-A-SKETCH:\nTwo participants create a single drawing together. Every 5 minutes, they must switch turns and continue the same artwork.\n\nCHALLENGE 2 — TOUCH & FEEL:\nOne participant is blindfolded and identifies an object through touch. Give an indirect clue and let the teammate guess the object.\n\nWINNER:\nTeams will be judged on creativity, communication, teamwork, observation, and adaptability.\n\n“Switch Your Role. Change Your Perspective”',
    date: '[SYMPOSIUM DATE]',
    time: '11:30 AM - 01:00 PM',
    venue: 'Design Studio & Creative Hub',
    fee: 100,
    teamSize: '2-4 Members',
    prizes: {
      first: '₹1,000',
      second: '₹500',
      overall: '₹1,500',
    },
    coordinators: [
      { name: 'Afraa K.S', year: '4th Year', role: 'Student Coordinator', phone: '9003163977' },
      { name: 'Mrs. Kiruthiga', year: 'Faculty', role: 'Asst. Professor' },
    ],
    rules: [
      'Team Format: Each team consists of 2–4 members.',
      'The event consists of 2 creative challenges.',
      'Participants must switch roles as instructed.',
      'CHALLENGE 1 — SWITCH-A-SKETCH: Two participants create a single drawing together. Every 5 minutes, they must switch turns and continue the same artwork.',
      'CHALLENGE 2 — TOUCH & FEEL: One participant is blindfolded and identifies an object through touch. Give an indirect clue and let the teammate guess the object.',
      'WINNER: Teams will be judged on creativity, communication, teamwork, observation, and adaptability.',
    ],
    rounds: [
      { title: 'CHALLENGE 1 — SWITCH-A-SKETCH', desc: 'Two participants create a single drawing together. Every 5 minutes, they must switch turns and continue the same artwork.' },
      { title: 'CHALLENGE 2 — TOUCH & FEEL', desc: 'One participant is blindfolded and identifies an object through touch. Give an indirect clue and let the teammate guess the object.' },
    ],
    judgingCriteria: [
      'Creativity and artistic continuity',
      'Communication and observation skills',
      'Teamwork, collaboration, and adaptability',
    ],
    iconName: 'Palette',
    badge: 'Creative',
    isActive: true,
  },
  {
    id: 'wrong-answers-only',
    slug: 'wrong-answers-only',
    title: 'WRONG ANSWERS ONLY',
    category: 'non-technical',
    tagline: 'Think Wrong. Answer Fast. Don\'t Be Correct!',
    shortDesc: 'Team Format: 2 participants. Features 3 fun-filled rounds where participants must give only wrong or funny answers. Giving the correct answer leads to elimination.',
    fullDesc: 'Team Format: Each team consists of 2 participants.\n\nThe event consists of 3 fun-filled rounds. Participants must give only wrong or funny answers. Giving the correct answer results in elimination.\n\nROUND 1 — QUICK WRONG:\nEasy and general questions will be asked. Give an immediate and funny wrong answer.\n\nROUND 2 — TRICKY WRONG:\nQuestions become faster and more confusing. Avoid automatically giving the correct answer.\n\nROUND 3 — WRONG ANSWER BATTLE:\nFinal teams face rapid-fire questions. Answer within a few seconds. One correct answer can eliminate you.\n\nWINNER:\nThe team with the most creative, funniest, and consistently wrong answers wins.\n\n“Think Wrong. Answer Fast. Don\'t Be Correct!”',
    date: '[SYMPOSIUM DATE]',
    time: '02:00 PM - 03:30 PM',
    venue: 'Open Amphitheatre',
    fee: 80,
    teamSize: '2 Members',
    prizes: {
      first: '₹1,000',
      second: '₹500',
      overall: '₹1,500',
    },
    coordinators: [
      { name: 'TheanMercy M', year: '4th Year', role: 'Student Coordinator', phone: '9445072534' },
      { name: 'Ms. Shakila A', year: 'Faculty', role: 'Asst. Professor' },
    ],
    rules: [
      'Team Format: Each team consists of 2 participants.',
      'The event consists of 3 fun-filled rounds.',
      'Participants must give ONLY wrong or funny answers.',
      'Giving the correct answer results in elimination.',
      'ROUND 1 — QUICK WRONG: Easy and general questions will be asked. Give an immediate and funny wrong answer.',
      'ROUND 2 — TRICKY WRONG: Questions become faster and more confusing. Avoid automatically giving the correct answer.',
      'ROUND 3 — WRONG ANSWER BATTLE: Final teams face rapid-fire questions. Answer within a few seconds. One correct answer can eliminate you.',
      'WINNER: The team with the most creative, funniest, and consistently wrong answers wins.',
    ],
    rounds: [
      { title: 'ROUND 1 — QUICK WRONG', desc: 'Easy and general questions will be asked. Give an immediate and funny wrong answer.' },
      { title: 'ROUND 2 — TRICKY WRONG', desc: 'Questions become faster and more confusing. Avoid automatically giving the correct answer.' },
      { title: 'ROUND 3 — WRONG ANSWER BATTLE', desc: 'Final teams face rapid-fire questions. Answer within a few seconds. One correct answer can eliminate you.' },
    ],
    judgingCriteria: [
      'Speed and immediacy of response without hesitation',
      'Humor and creativity of wrong answer',
      'Consistency in avoiding correct answers',
    ],
    iconName: 'Sparkles',
    badge: 'Fun & Witty',
    isActive: true,
  },

  {
    id: 'e-football',
    slug: 'e-football',
    title: 'E-FOOTBALL',
    category: 'e-sports',
    subCategory: 'Gaming',
    tagline: 'Knockout Tournament',
    shortDesc: 'E-Football esports tournament featuring a knockout format with Dream Teams.',
    fullDesc: 'Match Settings:\n\n* 🎮 Game: E-Football\n* 🏆 Match Type: Knockout\n* 👥 Team Type: Dream Team\n* ⏱️ Match Time: 8 Minutes\n* 🩹 Injuries: ON\n* ⚡ Extra Time: OFF\n* 🎯 Penalty: ON\n* 🎲 Condition: Random\n* 🔄 Substitution: Default',
    date: '[SYMPOSIUM DATE]',
    time: '10:00 AM - 04:00 PM',
    venue: 'E-Sports Arena / Hall B',
    fee: 150,
    teamSize: 'Solo (1 Player)',
    prizes: {
      first: '₹1,000',
      second: '₹500',
      overall: '₹1,500',
    },
    coordinators: [
      { name: 'Mohamed Aarif Buhary', year: '4th Year', role: 'Student Coordinator', phone: '9486746138' },
      { name: 'Ms. Preetha M', year: 'Faculty', role: 'Asst. Professor' },
    ],
    rules: [
      'Match Rules:',
      '1. Players must not intentionally disconnect from the match.',
      '2. Deliberately wasting time is prohibited.',
      '3. Exploiting glitches, bugs or unintended game mechanics is strictly prohibited.',
      '4. Repeatedly abusing game mechanics to gain an unfair advantage is prohibited.',
      '5. Players must not pause the game unnecessarily.',
      '6. Pauses should only be used for: Substitutions, Tactical changes, Genuine technical issues.',
      '7. Players must follow the match settings announced by the organizers.',
      '8. Players must maintain fair play and sportsmanlike behavior throughout the tournament.',
      '9. Any intentional attempt to disrupt or manipulate a match may result in penalties or disqualification.',
      '',
      'Disconnection Rules:',
      'Technical / Network Disconnection:',
      'If a match is disconnected because of a genuine technical or network problem:',
      'Before Half-Time: The match may be restarted according to the circumstances and instructions of the organizers. Where applicable, the restart/result will be handled on an aggregate basis according to the organizers\' decision.',
      'After 10 Minutes: If the disconnection occurs after 10 minutes of gameplay, the organizers will review the situation and decide whether to continue the match, restart the match, or award the result.',
      '',
      'Deliberate Disconnection:',
      'If a player deliberately disconnects from the match: The opponent may be awarded a 3-0 victory, OR the player may be disqualified from the tournament. The final decision will be made by the organizers based on the circumstances.',
      '',
      'Fair Play & Esports Conduct:',
      'All participants must play fairly, respect opponents, follow organizer instructions, avoid intentional exploitation of glitches or bugs, avoid unnecessary delays, maintain proper sportsmanship, cooperate with tournament officials during technical issues, and accept official decisions regarding match disputes.',
      'Any serious misconduct, cheating, deliberate disruption or repeated rule violation may result in disqualification.'
    ],
    rounds: [
      { title: 'KNOCKOUT STAGE', desc: 'The tournament follows a knockout format.\nMatches are played according to the announced fixture.\nThe winning player/team advances to the next stage.\n\nSettings:\n* Match Type: Knockout\n* Team Type: Dream Team\n* Match Time: 8 Minutes\n* Injuries: ON\n* Extra Time: OFF\n* Penalty: ON\n* Condition: Random\n* Substitution: Default' },
      { title: 'SEMI-FINAL', desc: 'The qualified players/teams compete in the Semi-Final.\n\nSettings:\n* Extra Time: ON\n* Penalty: ON\n\nThe winner advances to the Final.' },
      { title: 'FINAL', desc: 'The Semi-Final winners compete in the Final.\n\nSettings:\n* Extra Time: ON\n* Penalty: ON\n\nThe winner of the Final will be declared the E-Football Esports Champion.' }
    ],
    iconName: 'Gamepad2',
    badge: 'High Stakes',
    isActive: true,
  },
];

export const TIMELINE_SCHEDULE = [
  {
    day: "Day 1",
    label: "Symposium Itinerary",
    items: [
      { time: "08:30 AM - 09:30 AM", title: "Grand Check-in, Delegate Kit Distribution & Breakfast", venue: "Central Foyer", category: "General" },
      { time: "09:30 AM - 10:15 AM", title: "AMSphere Presents AETHERION'26 Inaugural Ceremony", venue: "Main Auditorium", category: "Keynote" },
      { time: "10:15 AM - 12:30 PM", title: "PPT (Paper Presentation)", venue: "Conference Auditorium", category: "Technical" },
      { time: "10:30 AM - 12:30 PM", title: "Neural Quest", venue: "Tech Hall 1", category: "Technical" },
      { time: "10:30 AM - 01:30 PM", title: "E-Sports: Free Fire & E-Football Tournaments", venue: "E-Sports Arena", category: "Non-Technical" },
      { time: "10:30 AM - 12:30 PM", title: "Reverse Engineering (Code Debugging)", venue: "Computing Lab B", category: "Technical" },
      { time: "11:00 AM - 01:30 PM", title: "UI/UX Designathon: High-Fidelity Sprint", venue: "Design Studio Lab", category: "Technical" },
      { time: "11:30 AM - 01:00 PM", title: "Film Hunt: Mystery Clue Trail", venue: "Campus Quad & Media Lab", category: "Non-Technical" },
      { time: "01:00 PM - 02:00 PM", title: "Networking & Buffet Lunch Break", venue: "Dining Pavilion", category: "General" },
      { time: "02:00 PM - 04:00 PM", title: "AI Escape Room: Reverse Engineering Contest", venue: "Computing Hub A", category: "Technical" },
      { time: "02:00 PM - 03:30 PM", title: "Voice & Noise Auditory & Foley Showdown", venue: "Acoustic Stage", category: "Non-Technical" },
      { time: "05:00 PM - 06:00 PM", title: "Valedictory, Grand Award Ceremony & Cash Prize Distribution", venue: "Main Auditorium", category: "General" },
    ]
  }
];
export const RULES_SECTIONS = [
  {
    id: 'certificate-rules',
    title: '📌 NOTE – Certificate Eligibility',
    rules: [
      '💻 Technical Event Only: Certificate will be provided.',
      '🎯 Non-Technical Event Only: No certificate will be provided.',
      '🏆 Both Technical + Non-Technical Events: Certificate will be provided.',
    ]
  },
  {
    id: 'general-rules',
    title: 'General Symposium Guidelines',
    rules: [
      'All participants must produce a valid College/Institution Identity Card at the registration reception.',
      'Participants must maintain high standards of discipline and decorum across all campus venues.',
      'Registration fees once paid are strictly non-refundable and non-transferable.',
      'Any damage to institution computing hardware or event facilities will result in immediate disqualification and liability.',
      'The decisions of the Organizers, Jury, and Event Coordinators are final in all matters of dispute.',
    ]
  },
  {
    id: 'technical-rules',
    title: 'Technical Event Rules',
    rules: [
      'Participants in coding and design events (AI Escape Room, UI/UX) must adhere to ethical code and original design guidelines.',
      'Use of unauthorized third-party scripts, cheating tools, or external AI assistants during live competitive rounds is prohibited.',
      'Bring personal laptops with necessary software pre-installed (charging stations will be provided).',
      'Submissions after the official countdown timer will not be evaluated.',
    ]
  },
  {
    id: 'non-tech-rules',
    title: 'Non-Technical & E-Sports Rules',
    rules: [
      'Mobile gaming tournaments permit only official mobile devices (no emulators or physical add-on trigger devices).',
      'Participants must adhere to the allotted reporting time; late arrivals will forfeit their round.',
      'Film Hunt participants must stay within designated public campus zones without disrupting ongoing lectures or technical sessions.',
      'Proper athletic gear is mandatory for participants taking part in the Fitness Event.',
    ]
  },
  {
    id: 'payment-rules',
    title: 'Payment & UTR Verification Rules',
    rules: [
      'Scan the official symposium UPI QR Code and pay to: abdulmalik4041977@okhdfcbank.',
      'Ensure the exact amount is paid corresponding to your chosen event.',
      'Accurately enter the 12-digit UTR / Transaction ID in the registration verification step.',
      'Upload a clear screenshot of the completed payment receipt showing the UTR and timestamp.',
      'Your registration will be marked as "Payment Verification Pending" until verified by the symposium finance team.',
    ]
  }
];
export const FAQ_DATA = [
  {
    question: "Who is eligible to participate in AETHERION'26?",
    answer: "Students currently enrolled in undergraduate or postgraduate engineering, technology, science, and arts programs across recognized colleges and universities with a valid student ID are welcome to participate."
  },
  {
    question: "What is the symposium registration fee and how many events can I participate in?",
    answer: "The symposium delegate registration pass is ₹150 flat per participant. This single ₹150 pass gives you full entry to participate in all events of your choice (Technical, Non-Technical, or E-Sports)."
  },
  {
    question: "Can I participate in both Technical and Non-Technical events?",
    answer: "Yes! Your ₹150 registration fee allows you to pick events across Technical and Non-Technical tracks, as long as their schedule timings do not directly conflict."
  },
  {
    question: "How do I make the registration payment?",
    answer: "You can pay instantly using any UPI app (Google Pay, PhonePe, Paytm, BHIM) by scanning the official QR code or transferring to the official UPI ID: abdulmalik4041977@okhdfcbank. After payment, submit your 12-digit UTR/Transaction ID and receipt screenshot on our portal."
  },
  {
    question: "How will I know if my registration and payment are verified?",
    answer: "Upon submitting the form, you receive a unique Registration ID (A26-XXXXXX) with a 'Payment Verification Pending' status. Our coordinators verify the transaction against bank statements, after which your digital event pass becomes fully active."
  },
  {
    question: "Will all participants receive certificates?",
    answer: "Yes! All verified attendees will receive official AETHERION'26 Certificates of Participation, and winners will be awarded cash prizes, prestigious trophies, and Certificates of Excellence."
  },
  {
    question: "Where will AETHERION'26 be held and is transportation/food provided?",
    answer: "AETHERION'26 is held at [COLLEGE / INSTITUTION NAME] main campus. Refreshments and lunch are provided for all registered participants. Detailed directions and campus map links are available in our Contact section."
  }
];