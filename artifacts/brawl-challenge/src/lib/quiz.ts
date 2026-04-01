// ─── Quiz Questions ───────────────────────────────────────────────────────────

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  level: 1 | 2 | 3 | 4;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Level 1 (unlocks at 0 correct)
  {
    question: "Who is the starter brawler?",
    options: ["Nita", "Shelly", "Bull", "Sprout"],
    correctIndex: 1,
    level: 1,
  },
  {
    question: "What is the best type of stardrop?",
    options: ["Epic", "Legendary", "Mega", "Ultra Legendary"],
    correctIndex: 3,
    level: 1,
  },
  {
    question: "What are Bling used for?",
    options: ["Upgrading brawlers", "Trophy Pushing", "Unlocking Brawlers", "Buying skins"],
    correctIndex: 3,
    level: 1,
  },
  {
    question: "What gender is Berry?",
    options: ["Male", "Female", "Transgender", "Unicorn"],
    correctIndex: 0,
    level: 1,
  },
  {
    question: "How many Ammo does Lily have?",
    options: ["Infinite", "3", "2", "1"],
    correctIndex: 2,
    level: 1,
  },
  {
    question: "Which brawler can walk on water?",
    options: ["Angelo", "Ziggy", "Sprout", "Glowy"],
    correctIndex: 0,
    level: 1,
  },

  // Level 2 (unlocks at 5 correct)
  {
    question: "What year did Brawl Stars go global?",
    options: ["2018", "1967", "2017", "2019"],
    correctIndex: 0,
    level: 2,
  },
  {
    question: "Which gamemode is most popular?",
    options: ["Showdown", "Knockout", "Brawl Arena", "Brawl Ball"],
    correctIndex: 3,
    level: 2,
  },
  {
    question: "What do you start getting after unlocking all brawlers?",
    options: ["A powerbank", "Fame", "Leaderboards", "Unlimited coins"],
    correctIndex: 1,
    level: 2,
  },
  {
    question: "Which of these brands have collaborated with BrawlStars?",
    options: ["Spongebob", "Apple", "Fortnite", "Spotify"],
    correctIndex: 0,
    level: 2,
  },
  {
    question: "How many coins do you need to upgrade a brawler to level 11?",
    options: ["4046", "8900", "11900", "7765"],
    correctIndex: 3,
    level: 2,
  },
  {
    question: "Which brawler doesn't heal with their super?",
    options: ["Pam", "Byron", "Piper", "Jae Yong"],
    correctIndex: 2,
    level: 2,
  },

  // Level 3 (unlocks at 10 correct)
  {
    question: "Whose title is \"The Pretty\"?",
    options: ["Lola", "Colt", "Angelo", "Ruffs"],
    correctIndex: 1,
    level: 3,
  },
  {
    question: "Which brawler has multiple supers?",
    options: ["Chester", "Buster", "Meeple", "Squeak"],
    correctIndex: 0,
    level: 3,
  },
  {
    question: "Which brawler is French?",
    options: ["Crow", "Charlie", "Tara", "Belle"],
    correctIndex: 1,
    level: 3,
  },
  {
    question: "What was Glowy's original name?",
    options: ["Bertglow", "Glowbert", "Globert", "Glower"],
    correctIndex: 1,
    level: 3,
  },
  {
    question: "Which gamemode is Chuck the best on?",
    options: ["Gemgrab", "Showdown", "Brawl hockey", "Heist"],
    correctIndex: 3,
    level: 3,
  },
  {
    question: "How many skins does Bibi have?",
    options: ["31", "12", "29", "34"],
    correctIndex: 3,
    level: 3,
  },
  {
    question: "Which skins were released for April Fools 2025?",
    options: ["Poop Spike", "Baby Shark El Primo", "Inflatable Melodie", "Egg Rico & Egg Pam"],
    correctIndex: 3,
    level: 3,
  },
  {
    question: "How many supers does Darryl have?",
    options: ["0", "1", "2", "3"],
    correctIndex: 2,
    level: 3,
  },
  {
    question: "How many supers does Melodie have?",
    options: ["1", "2", "3", "4"],
    correctIndex: 2,
    level: 3,
  },
  {
    question: "What is the biggest gem pack you can buy in the in-game store?",
    options: ["2000 gems", "1500 gems", "3000 gems", "1 gem"],
    correctIndex: 0,
    level: 3,
  },
  {
    question: "If you're not in a clan___",
    options: ["Join a clan", "Find a clan", "Make a clan", "Play solo"],
    correctIndex: 0,
    level: 3,
  },
  {
    question: "Does Nita or Nita's bear have more health?",
    options: ["Nita", "Nita's bear", "Same amount of health", "What bear?"],
    correctIndex: 1,
    level: 3,
  },
  {
    question: "What gamemode is the map: Healthy Middle Ground?",
    options: ["Brawl ball", "Showdown", "Knockout", "Heist"],
    correctIndex: 2,
    level: 3,
  },
  {
    question: "What gamemode is the map: Tip Toe?",
    options: ["Showdown", "Wipeout", "Gem Grab", "Brawl Hockey"],
    correctIndex: 3,
    level: 3,
  },
  {
    question: "Who is the CEO of Supercell (Brawl Stars)?",
    options: ["Ilka Paananen", "Frank", "Mikko Kartanonkoski", "Sprout"],
    correctIndex: 0,
    level: 3,
  },
  {
    question: "How long is a brawlball game (no overtime)?",
    options: ["2 minutes", "1.5 minutes", "3 minutes", "2.5 minutes"],
    correctIndex: 3,
    level: 3,
  },
  {
    question: "How many ammo does it take to charge Stu's super?",
    options: ["1", "3", "0", "Depends"],
    correctIndex: 0,
    level: 3,
  },
  {
    question: "How many gadgets can you use in a game?",
    options: ["3", "1", "Unlimited", "2"],
    correctIndex: 2,
    level: 3,
  },

  // Level 4 (unlocks at 20 correct)
  {
    question: "Whose title is: The Rocket?",
    options: ["Brock", "Janet", "Bull", "Gale"],
    correctIndex: 1,
    level: 4,
  },
  {
    question: "Which brawler isn't a mythic?",
    options: ["Buzz", "Pierce", "Tara", "Lou"],
    correctIndex: 1,
    level: 4,
  },
  {
    question: "Who should you subscribe to?",
    options: ["ELLOit2", "Not ELLOit2", "Not ELLOit2", "Not ELLOit2"],
    correctIndex: 0,
    level: 4,
  },
  {
    question: "What is the name of Berry's first gadget?",
    options: ["Double scoop", "Friendship is great", "Ice cold", "Rainbows and Sprinkles"],
    correctIndex: 1,
    level: 4,
  },
  {
    question: "How much does a True Silver skin cost?",
    options: ["20,000 coins", "10,000 credits", "10,000 coins", "15,000 coins"],
    correctIndex: 2,
    level: 4,
  },
  {
    question: "How long does Sandy's sandstorm last?",
    options: ["10 seconds", "12 seconds", "9 seconds", "14 seconds"],
    correctIndex: 2,
    level: 4,
  },
  {
    question: "Who says: \"My dance will break your soul!\"",
    options: ["Jae Yong", "Shelly", "Spike", "Mina"],
    correctIndex: 3,
    level: 4,
  },
  {
    question: "Who's got 4 ammo with their starpower?",
    options: ["Melodie", "Brock", "Ruffs", "Amber"],
    correctIndex: 1,
    level: 4,
  },
  {
    question: "Where are BrawlStars Headquarters?",
    options: ["USA, New York", "Finland, Helsinki", "Sweden, Stockholm", "China, Beijing"],
    correctIndex: 1,
    level: 4,
  },
  {
    question: "What season was Gale released?",
    options: ["Season 1", "Season 46", "Season 7", "Season 23"],
    correctIndex: 0,
    level: 4,
  },
  {
    question: "Who won the 2025 Brawl Stars championships?",
    options: ["Crazy Racoon", "HMBL", "SK Gaming", "LOUD"],
    correctIndex: 0,
    level: 4,
  },
  {
    question: "Who was the first Ultra Legendary?",
    options: ["Surge", "Brawler", "Sirius", "Kaze"],
    correctIndex: 3,
    level: 4,
  },
  {
    question: "What year were hypercharges introduced?",
    options: ["2024", "2023", "2022", "2021"],
    correctIndex: 1,
    level: 4,
  },
  {
    question: "Who works at a movie theater?",
    options: ["Colette", "Nani", "Buster", "Barley"],
    correctIndex: 2,
    level: 4,
  },
  {
    question: "What is the final reward of the trophy road?",
    options: ["Ultra Legendary Star drop", "Hypercharge", "10,000 coins", "Legendary Star drop"],
    correctIndex: 1,
    level: 4,
  },
  {
    question: "Which brawler has a potato skin?",
    options: ["Dynamika", "Rico", "Squeak", "Tick"],
    correctIndex: 2,
    level: 4,
  },
  {
    question: "Which brawler currently has the highest play rate in the game?",
    options: ["Edgar", "Shelly", "Buzz Lightyear", "Mortis"],
    correctIndex: 3,
    level: 4,
  },
  {
    question: "Who wakes up and makes 2 bowls of cereal?",
    options: ["Ollie", "Colette", "Ziggy", "Mina"],
    correctIndex: 0,
    level: 4,
  },
  {
    question: "What is the name of El Primo's super?",
    options: ["El Fuego", "Asteroid belt", "El Luchador", "Flying elbow drop"],
    correctIndex: 3,
    level: 4,
  },
  {
    question: "How much health does Frank have at level 11?",
    options: ["10,000", "11,200", "12,400", "13,600"],
    correctIndex: 3,
    level: 4,
  },
];

export function getQuestionsForLevel(quizLevel: number): QuizQuestion[] {
  // Filter questions available at this quiz level
  const available: QuizQuestion[] = [];
  for (const q of QUIZ_QUESTIONS) {
    if (q.level <= quizLevel) {
      available.push(q);
    }
  }
  return available;
}

export function getNextQuestion(quizLevel: number, usedIndices: number[]): { question: QuizQuestion; index: number } | null {
  const available = getQuestionsForLevel(quizLevel);
  const unusedIndices = available
    .map((_, i) => i)
    .filter(i => !usedIndices.includes(i));

  if (unusedIndices.length === 0) {
    // All used — reset
    const idx = Math.floor(Math.random() * available.length);
    return { question: available[idx], index: idx };
  }

  const idx = unusedIndices[Math.floor(Math.random() * unusedIndices.length)];
  return { question: available[idx], index: idx };
}

export const QUIZ_LEVEL_NAMES = ["Starter", "Rookie", "Pro", "Elite"];
export const QUIZ_LEVEL_THRESHOLDS = [0, 5, 10, 20];
