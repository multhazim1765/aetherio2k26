const fs = require('fs');
const path = 'lib/data/events.ts';
let content = fs.readFileSync(path, 'utf8');

// Find the incorrectly placed event at the end
const eventStr = `  {
    id: 'e-football',
    slug: 'e-football',
    title: 'E-FOOTBALL ESPORTS',
    category: 'non-technical',
    subCategory: 'Gaming',
    tagline: 'Knockout Tournament',
    shortDesc: 'E-Football esports tournament featuring a knockout format with Dream Teams.',
    fullDesc: 'Match Settings:\\n\\n* 🎮 Game: E-Football\\n* 🏆 Match Type: Knockout\\n* 👥 Team Type: Dream Team\\n* ⏱️ Match Time: 8 Minutes\\n* 🩹 Injuries: ON\\n* ⚡ Extra Time: OFF\\n* 🎯 Penalty: ON\\n* 🎲 Condition: Random\\n* 🔄 Substitution: Default',
    date: '[SYMPOSIUM DATE]',
    time: '10:00 AM - 04:00 PM',
    venue: 'E-Sports Arena / Hall B',
    fee: 150,
    teamSize: 'Solo (1 Player)',
    prizes: {
      first: '₹5,000 + Winner Trophy',
      second: '₹2,500 + Runner-up Trophy',
      overall: 'Exclusive E-Sports Champion Medals',
    },
    coordinators: [
      { name: '[Coordinator details pending]', year: '2nd Year', role: 'E-Football Coordinator' },
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
      'Before Half-Time: The match may be restarted according to the circumstances and instructions of the organizers. Where applicable, the restart/result will be handled on an aggregate basis according to the organizers\\' decision.',
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
      { title: 'KNOCKOUT STAGE', desc: 'The tournament follows a knockout format.\\nMatches are played according to the announced fixture.\\nThe winning player/team advances to the next stage.\\n\\nSettings:\\n* Match Type: Knockout\\n* Team Type: Dream Team\\n* Match Time: 8 Minutes\\n* Injuries: ON\\n* Extra Time: OFF\\n* Penalty: ON\\n* Condition: Random\\n* Substitution: Default' },
      { title: 'SEMI-FINAL', desc: 'The qualified players/teams compete in the Semi-Final.\\n\\nSettings:\\n* Extra Time: ON\\n* Penalty: ON\\n\\nThe winner advances to the Final.' },
      { title: 'FINAL', desc: 'The Semi-Final winners compete in the Final.\\n\\nSettings:\\n* Extra Time: ON\\n* Penalty: ON\\n\\nThe winner of the Final will be declared the E-Football Esports Champion.' }
    ],
    iconName: 'Gamepad2',
    badge: 'High Stakes',
    isActive: true,
  },
`;

// Remove the event string from the end of the file
if (content.includes(eventStr)) {
  content = content.replace(eventStr, '');
} else {
  console.log("Could not find exact string to remove");
}

// Find the end of EVENTS_DATA
// We know it ends with `isActive: true,\n  }\n];\n\nexport const TIMELINE_SCHEDULE`
const splitTarget = `  }\n];\n\nexport const TIMELINE_SCHEDULE`;
if (content.includes(splitTarget)) {
  content = content.replace(splitTarget, `  },\n` + eventStr + `];\n\nexport const TIMELINE_SCHEDULE`);
  fs.writeFileSync(path, content, 'utf8');
  console.log("Fixed events.ts");
} else {
  console.log("Could not find the target to insert");
}
