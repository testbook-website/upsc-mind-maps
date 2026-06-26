import fs from 'fs';

const getGSPaper = (subject) => {
  if (['Ancient History', 'Geography', 'Modern History', 'Art & Culture'].includes(subject)) return 'GS Paper 1';
  if (['Polity', 'Governance', 'International Relations'].includes(subject)) return 'GS Paper 2';
  if (['Economy', 'Internal Security', 'Environment', 'Science & Tech'].includes(subject)) return 'GS Paper 3';
  if (['Ethics'].includes(subject)) return 'GS Paper 4';
  return 'General Studies';
};

const topics = [
  { id: "aeps-upsc-notes", topic: "Aadhaar Enabled Payment System", sub: "Economy", root: "AePS" },
  { id: "manipur-violence-explained", topic: "2023 Manipur Violence", sub: "Internal Security", root: "MANIPUR" },
  { id: "buddhism-upsc-notes", topic: "Buddhism Notes", sub: "Ancient History", root: "BUDDHISM" },
  { id: "climate-change", topic: "Climate Change & UNFCCC", sub: "Environment", root: "CLIMATE" },
  { id: "reserve-bank-of-india", topic: "Reserve Bank of India", sub: "Economy", root: "RBI" },
  { id: "constitution-of-india", topic: "Constitution of India", sub: "Polity", root: "CONSTITUTION" },
  { id: "space-exploration", topic: "Space Exploration", sub: "Science & Tech", root: "ISRO" },
  { id: "harappan-civilization", topic: "Harappan Civilization", sub: "Ancient History", root: "IVC" },
  { id: "physical-geography", topic: "Physical Geography", sub: "Geography", root: "GEOGRAPHY" },
  { id: "agriculture-notes-for-upsc", topic: "Agriculture in India", sub: "Economy", root: "AGRICULTURE" },
];

// Generate 40 more topics to reach 50
const baseTopics = [
  "Inflation & Monetary Policy", "National Income Accounting", "Poverty & Unemployment", 
  "Cyber Security Threats", "Naxalism in India", "Border Management", 
  "Mauryan Empire", "Gupta Empire", "Vedic Period", 
  "Biodiversity Conservation", "Pollution Control Boards", "Wildlife Protection Act",
  "Fundamental Rights", "Directive Principles", "Parliamentary System",
  "Biotechnology Applications", "Nanotechnology", "Artificial Intelligence",
  "Indian Monsoon System", "Plate Tectonics", "Ocean Currents",
  "Indian Freedom Struggle", "Revolt of 1857", "Indian National Congress",
  "Temple Architecture", "Classical Dances", "Indian Paintings",
  "E-Governance in India", "RTI Act 2005", "Civil Services Reforms",
  "India-USA Relations", "India-China Border Dispute", "United Nations Reforms",
  "Emotional Intelligence", "Probity in Governance", "Moral Philosophers",
  "Fiscal Policy & Budget", "World Trade Organization", "Disaster Management Framework",
  "Sangam Literature"
];

const subjects = [
  "Economy", "Internal Security", "Ancient History", "Environment", 
  "Polity", "Science & Tech", "Geography", "Modern History", 
  "Art & Culture", "Governance", "International Relations", "Ethics"
];

for (let i = 0; i < baseTopics.length; i++) {
  const name = baseTopics[i];
  topics.push({
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    topic: name,
    sub: subjects[i % subjects.length],
    root: name.split(' ')[0].toUpperCase()
  });
}

const colors = ["#16a34a", "#3b82f6", "#8b5cf6", "#ef4444", "#f59e0b"];

const mindmaps = topics.map((t, index) => {
  return {
    id: t.id,
    topic: t.topic,
    subject: t.sub,
    gsPaper: getGSPaper(t.sub),
    url: "https://testbook.com/ias-preparation/" + t.id,
    root: t.root,
    branches: [
      {
        title: "Introduction & Context",
        color: colors[0],
        children: [
          { title: "Definition", facts: ["Core concept of " + t.topic, "Key underlying principle"] },
          { title: "Background", facts: ["Historical context", "Recent developments"] }
        ]
      },
      {
        title: "Key Features",
        color: colors[1],
        children: [
          { title: "Component 1", facts: ["Crucial element involved", "Major characteristic"] },
          { title: "Component 2", facts: ["Secondary aspect", "Associated framework"] }
        ]
      },
      {
        title: "Significance & Challenges",
        color: colors[2],
        children: [
          { title: "Significance", facts: ["Importance of the topic", "Positive impacts and benefits"] },
          { title: "Challenges", facts: ["Implementation hurdles", "Future risks and bottlenecks"] }
        ]
      },
      {
        title: "UPSC Relevance",
        color: colors[3],
        children: [
          { title: "Prelims Focus", facts: ["Factual data points", "Latest index/reports"] },
          { title: "Mains Strategy", facts: ["Critical analysis required", "Way forward & solutions"] }
        ]
      }
    ]
  };
});

const content = `// Auto-generated 50 UPSC Mindmaps
export const mindmaps = ${JSON.stringify(mindmaps, null, 2)};
`;

fs.writeFileSync('src/data/mindmaps.js', content);
console.log("Successfully generated src/data/mindmaps.js with 50 topics.");
