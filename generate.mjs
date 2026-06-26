import fs from 'fs';

const customImages = [
  { id: "aeps-upsc-notes", image: "/aeps_concept.png" },
  { id: "manipur-violence-explained", image: "/manipur_concept.png" },
  { id: "buddhism-upsc-notes", image: "/buddhism_concept.png" },
  { id: "climate-change", image: "/climate_concept.png" },
  { id: "reserve-bank-of-india", image: "/rbi_concept.png" },
  { id: "constitution-of-india", image: "/polity_concept.png" },
  { id: "space-exploration", image: "/space_concept.png" },
  { id: "harappan-civilization", image: "/harappa_concept.png" },
  { id: "physical-geography", image: "/geography_concept.png" },
  { id: "agriculture-notes-for-upsc", image: "/agriculture_concept.png" }
];

const subjects = [
  "Economy", "Internal Security", "Ancient History", "Environment", 
  "Polity", "Science & Tech", "Geography", "Modern History", 
  "Art & Culture", "Governance", "International Relations", "Ethics"
];

// Curated high quality Unsplash URLs
const unsplashImages = [
  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800", // Lab/Science
  "https://images.unsplash.com/photo-1621243801267-33671cd72223?auto=format&fit=crop&q=80&w=800", // Monuments
  "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800", // Ethics
  "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800", // Law
  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800", // Finance
  "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800", // Science
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800", // Geography
  "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800", // World
  "https://images.unsplash.com/photo-1447015237013-0e80b2786ddc?auto=format&fit=crop&q=80&w=800", // Env
  "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800", // Summit
  "https://images.unsplash.com/photo-1506869640319-ce1a44e94b29?auto=format&fit=crop&q=80&w=800", // Art
  "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800", // Office
  "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&q=80&w=800", // Time
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800", // Team
  "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800"  // Tech
];

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
  let img = null;
  
  // First 10 get custom AI images
  if (index < 10) {
    img = customImages[index].image;
  } 
  // Next 15 get Unsplash images
  else if (index >= 10 && index < 25) {
    img = unsplashImages[index - 10];
  }

  return {
    id: t.id,
    topic: t.topic,
    subject: t.sub,
    url: "https://testbook.com/ias-preparation/" + t.id,
    ...(img && { imageUrl: img }),
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
        title: "Challenges & Issues",
        color: colors[2],
        children: [
          { title: "Current Hurdles", facts: ["Implementation gap", "Resource constraints"] },
          { title: "Future Risks", facts: ["Long-term sustainability", "Policy bottlenecks"] }
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
