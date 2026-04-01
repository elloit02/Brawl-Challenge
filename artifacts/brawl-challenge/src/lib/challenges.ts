// ─── Daily Challenges ─────────────────────────────────────────────────────────

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Challenge {
  text: string;
  difficulty: Difficulty;
  xp: number;
}

const rawDailyChallenges: Array<{ text: string; difficulty: Difficulty }> = [
  { text: "Do A Brawlball Trickshot", difficulty: "Medium" },
  { text: "Win A Game Of Gem Grab Without Picking Up A Single Gem", difficulty: "Hard" },
  { text: "Play A Game Without Healing", difficulty: "Medium" },
  { text: "Play A Game Without Using Your Super", difficulty: "Medium" },
  { text: "Play A Game Without Using Your Gadget", difficulty: "Easy" },
  { text: "Buy A New Skin With Bling Or Gems", difficulty: "Easy" },
  { text: "Buy A New Gadget", difficulty: "Easy" },
  { text: "Buy A New Starpower", difficulty: "Easy" },
  { text: "Play Your Lowest Trophy Brawler", difficulty: "Easy" },
  { text: "Play A Game Of Showdown Without Stepping In A Single Bush", difficulty: "Hard" },
  { text: "Win A Game, But You Have To Keep Moving Throughout The Whole Game", difficulty: "Medium" },
  { text: "Score A Brawl Hockey Goal From Across The Map", difficulty: "Hard" },
  { text: "Teamwipe In Any Mode!", difficulty: "Medium" },
  { text: "Win A Game Of Brawlball Without Scoring A Goal", difficulty: "Hard" },
  { text: "Win A Trio Showdown Game Without Getting Within 3 Tiles Of Your Teammates", difficulty: "Hard" },
  { text: "Win A Match In Under Two Minutes", difficulty: "Hard" },
  { text: "Get The First Elimination In A Match", difficulty: "Medium" },
  { text: "Win A Match Using A Brawler You Haven't Played This Season", difficulty: "Medium" },
  { text: "Visit Every Corner Of The Map At Least Once In A Match", difficulty: "Medium" },
  { text: "Play A Match While Holding Your Phone Upside Down", difficulty: "Easy" },
  { text: "Steal As Many Kills From Your Teammates As You Can", difficulty: "Easy" },
  { text: "Use A Skin You've Never Played With", difficulty: "Easy" },
  { text: "Play A Game With A Brawler Until The Enemy Has The Same Brawler On Their Team", difficulty: "Medium" },
  { text: "Open A Star Drop With Your Nose", difficulty: "Easy" },
  { text: "Win A Game Without Your Super", difficulty: "Medium" },
  { text: "Spin For At Least 30 Seconds In One Match", difficulty: "Easy" },
  { text: "Win A Match In Under 90 Seconds", difficulty: "Hard" },
  { text: "Use Your Gadget 4 Times In One Match", difficulty: "Medium" },
  { text: "Win A Knockout Game Without Stepping On The Enemy's Half Of The Map", difficulty: "Hard" },
  { text: "Win A Heist Game Without The Enemy Getting 50% Of Your Safe Destroyed", difficulty: "Hard" },
  { text: "Win An Overtime Game", difficulty: "Medium" },
  { text: "Get 30 Trophies Today", difficulty: "Hard" },
  { text: "Open A Stardrop Without Looking At Your Phone", difficulty: "Easy" },
  { text: "Win By Only Staying On The Left Half Of The Map", difficulty: "Hard" },
  { text: "Win By Only Staying On The Right Half Of The Map", difficulty: "Hard" },
  { text: "See How Fast You Can Kill Every Bot In The Training Cave", difficulty: "Easy" },
  { text: "Win A Knockout Game Without Losing A Single Round", difficulty: "Hard" },
  { text: "Win A Game With A Brawler With A Christmas Skin", difficulty: "Easy" },
  { text: "Win A Game With The Most Recent Brawler You Unlocked", difficulty: "Medium" },
  { text: "Win A Brawlball Game Without Picking Up The Ball", difficulty: "Hard" },
  { text: "Play A Gamemode You Haven't Played This Week", difficulty: "Easy" },
  { text: "Win A Game While Spinning In A Circle (In Real Life)", difficulty: "Easy" },
  { text: "Invite A Random Of Your Recently Played With And See If Anybody Accepts", difficulty: "Easy" },
  { text: "Use Any Brawler From The Epic Rarity", difficulty: "Easy" },
  { text: "Use Any Brawler From The Mythic Rarity", difficulty: "Easy" },
  { text: "Use Any Brawler From The Super Rare Rarity", difficulty: "Easy" },
  { text: "Equip A Pin That You've Never Used", difficulty: "Easy" },
  { text: "Shoot 5 Ammo Without Missing A Single One Of Them", difficulty: "Hard" },
  { text: "In Heist, Prevent The Enemy From Getting More Than 5% On The Safe Within The First 30 Seconds Of The Game", difficulty: "Hard" },
  { text: "In Hot Zone, Prevent The Enemy From Getting More Than 5% On The Zone Within The First 30 Seconds Of The Game", difficulty: "Hard" },
  { text: "Play A Healer, But Don't Heal Your Teammates For The Whole Match", difficulty: "Medium" },
  { text: "Destroy 20 Walls / Bushes With Any Brawler In One Game", difficulty: "Medium" },
  { text: "Get The Blue Star At Least Once During A Bounty Game", difficulty: "Medium" },
  { text: "Play A Game Only Using Autoaim", difficulty: "Easy" },
  { text: "Spend The First 15 Seconds Of The Game Without Shooting A Single Shot", difficulty: "Medium" },
  { text: "Get A Kill With Full Health", difficulty: "Medium" },
  { text: "Get A Kill While Moving Backwards", difficulty: "Medium" },
  { text: "Use 2 Supers Within 8 Seconds (With A Brawler That Only Has 1 Super)", difficulty: "Hard" },
  { text: "Use 2 Hypercharges In One Game", difficulty: "Hard" },
  { text: "Win A Game And Get Star Player", difficulty: "Medium" },
  { text: "Touch The Enemy's Side Of The Arena During A Brawlball Game", difficulty: "Medium" },
  { text: "Touch The Enemy's Side Of The Arena During A Brawl Hockey Game", difficulty: "Medium" },
  { text: "Touch The Enemy's Side Of The Arena During A Heist Game", difficulty: "Medium" },
  { text: "Touch The Enemy's Side Of The Arena During A Hot Zone Game", difficulty: "Medium" },
  { text: "Touch The Enemy's Side Of The Arena During A Gem Grab Game", difficulty: "Medium" },
  { text: "Predict Correctly What Rank An Enemy Is After The Game", difficulty: "Easy" },
  { text: "Use A Pin 10 Times During One Game", difficulty: "Easy" },
  { text: "Get A Kill With Under 2000 Health", difficulty: "Medium" },
  { text: "Score A Goal Within The Last 30 Seconds Of A Brawl Ball / Hockey Game", difficulty: "Hard" },
  { text: "Kill A Legendary Brawler", difficulty: "Medium" },
  { text: "Kill A Mythic Brawler", difficulty: "Medium" },
  { text: "Click Play Again No Matter How Bad The Teammates Were", difficulty: "Easy" },
  { text: "Clap Once After Getting Each Kill In One Match", difficulty: "Easy" },
  { text: "Kill An Enemy From Full Health To Dead In 5 Seconds", difficulty: "Hard" },
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getDifficultyXP(difficulty: Difficulty): number {
  switch (difficulty) {
    case "Easy": return 50;
    case "Medium": return 75;
    case "Hard": return 100;
  }
}

export const DAILY_CHALLENGES: Challenge[] = shuffleArray(
  rawDailyChallenges.map(c => ({ ...c, xp: getDifficultyXP(c.difficulty) }))
);

// ─── Speed Challenges ─────────────────────────────────────────────────────────

const rawSpeedChallenges: Array<{ text: string; difficulty: Difficulty }> = [
  { text: "Kill Every Bot In The Training Arena Once", difficulty: "Easy" },
  { text: "Win A Game. Simple As That", difficulty: "Easy" },
  { text: "Touch A Bush (In Real Life Also Accepted)", difficulty: "Easy" },
  { text: "Get A Little More Of Any Currency (Ex +10 Coins, +50 Powerpoints Or +5 Credits)", difficulty: "Easy" },
  { text: "Put Down A Spray 10 Times", difficulty: "Easy" },
  { text: "Go Into A Solo Showdown Game And Collect A Power Cube", difficulty: "Easy" },
  { text: "Go Into A Gem Grab Game And Collect At Least 1 Gem", difficulty: "Easy" },
  { text: "Go Into A Brawl Ball Game And Touch The Ball", difficulty: "Easy" },
  { text: "Go Into A Brawl Hockey Game And Touch The Puck", difficulty: "Easy" },
  { text: "Witness A Teammate Dying In Any Gamemode", difficulty: "Easy" },
  { text: "Hug A Wall With Any Brawler In Any Gamemode For 5 Seconds", difficulty: "Easy" },
  { text: "Take Damage From The Storm In Any Gamemode (Knockout Or Showdown Recommended)", difficulty: "Easy" },
  { text: "Use Your Gadget Once", difficulty: "Easy" },
  { text: "Use Your Super Once", difficulty: "Easy" },
  { text: "Hit 3 Shots In A Row In Any Gamemode", difficulty: "Medium" },
  { text: "Play A Match And Get Positive KD (Kill-Death Ratio)", difficulty: "Medium" },
  { text: "Gain At Least 1 Trophy", difficulty: "Easy" },
  { text: "Find And Equip A Skin You've Never Played With", difficulty: "Easy" },
  { text: "Get 33% Of The Zone In Hotzone", difficulty: "Medium" },
  { text: "Deal 33% Of The Safe's Health In Heist", difficulty: "Medium" },
  { text: "Find A Teammate In Quick Search", difficulty: "Easy" },
  { text: "Mute The Sounds And Win One Game", difficulty: "Medium" },
  { text: "Spin In Any Match For 15 Seconds", difficulty: "Easy" },
  { text: "Kill An Enemy From Full Health To Dead In 5 Seconds", difficulty: "Hard" },
  { text: "Go To Your Battle Log And Find A Game Where You Got Star Player. If Not Found You'll Have To Get One", difficulty: "Medium" },
  { text: "Pick A Brawler That Can Walk On Water And Stay On Water For At Least 10 Seconds", difficulty: "Medium" },
  { text: "Get Your Super With Any Brawler", difficulty: "Easy" },
  { text: "Use A Super That Deals Damage To At Least 2 Enemies", difficulty: "Medium" },
  { text: "Heal From Less Than 1500 Health All The Way To Full Health", difficulty: "Medium" },
  { text: "Kill Someone And Use A Pin", difficulty: "Easy" },
  { text: "Witness 3 Other Players Use A Pin", difficulty: "Easy" },
  { text: "Witness Another Player Use A Spray", difficulty: "Easy" },
  { text: "Kill Someone The Same Rank As You", difficulty: "Medium" },
  { text: "Reach Top 3 In Showdown", difficulty: "Medium" },
  { text: "Get A Kill While Standing Still", difficulty: "Medium" },
  { text: "Kill An Enemy While In A Bush", difficulty: "Medium" },
  { text: "Stun Or Slow An Enemy", difficulty: "Medium" },
  { text: "Take At Least 8000 Damage", difficulty: "Medium" },
  { text: "Use Your Super Within 5 Seconds Your Teammate Used Theirs", difficulty: "Hard" },
  { text: "Win A Game With A Default Skin", difficulty: "Easy" },
  { text: "Use 3 Different Pins", difficulty: "Easy" },
  { text: "Use A Brawler That Kills With Bullets (Ex. Colt Or Bull)", difficulty: "Easy" },
  { text: "Play A Game Of The Newest Gamemode", difficulty: "Easy" },
  { text: "Click 2 Yellow Buttons In Brawlstars", difficulty: "Easy" },
  { text: "Go To The News Tab And Find Something New", difficulty: "Easy" },
  { text: "Play A Brawler That's An Actual Animal In Real Life (Ex. Ruffs Or Kit)", difficulty: "Easy" },
  { text: "Touch One Side, And The Other Side Of Any Map", difficulty: "Medium" },
  { text: "Use A Hypercharge", difficulty: "Medium" },
  { text: "Walk At Least 20 Tiles", difficulty: "Easy" },
  { text: "Use A Gadget 3 Times", difficulty: "Medium" },
];

export const SPEED_CHALLENGES: Challenge[] = shuffleArray(
  rawSpeedChallenges.map(c => ({ ...c, xp: getDifficultyXP(c.difficulty) }))
);

// ─── Brawlers for Trophy Challenge ────────────────────────────────────────────

export const BRAWLERS = [
  "Shelly", "Nita", "Colt", "Bull", "Brock", "El Primo", "Barley", "Poco", "Rosa",
  "Jessie", "Dynamike", "Tick", "8-Bit", "Rico", "Darryl", "Penny", "Carl", "Jacky",
  "Gus", "Bo", "Emz", "Stu", "Piper", "Pam", "Frank", "Bibi", "Bea", "Nani",
  "Edgar", "Griff", "Grom", "Bonnie", "Gale", "Colette", "Belle", "Ash", "Meg",
  "Lola", "Fang", "Eve", "Janet", "Otis", "Buster", "Gray", "R-T", "Will",
  "Maisie", "Hank", "Pearl", "Larry & Lawrie", "Angelo", "Berry", "Melodie",
  "Lily", "Clancy", "Mico", "Charlie", "Spike", "Crow", "Leon", "Sandy",
  "Amber", "Meg", "Surge", "Chester", "Cordelius", "Doug", "Buzz", "Squeak",
  "Grom", "Ruffs", "Sprout", "Byron", "Mortis", "Tara", "Gene", "Max",
  "Mr. P", "Sprout", "Crow", "Spike", "Leon", "Sandy", "Amber", "Chuck",
  "Melodie", "Lily", "Draco", "Kenji", "Meeple", "Jae-Yong", "Shade",
  "Mina", "Mandy", "Fang", "Sam", "Gus", "Eve", "Otis", "Buster",
  "Gray", "R-T", "Willow", "Doug", "Pearl", "Kaze", "Sirius",
];

// Unique brawlers
export const UNIQUE_BRAWLERS = [...new Set(BRAWLERS)].slice(0, 101);

export function getRandomTrophyChallenge(): { brawler: string; trophies: number } {
  const brawler = UNIQUE_BRAWLERS[Math.floor(Math.random() * UNIQUE_BRAWLERS.length)];
  const trophies = Math.floor(Math.random() * 36) + 5; // 5-40
  return { brawler, trophies };
}
