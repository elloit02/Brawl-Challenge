import { ExternalLink } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-black mb-2 tracking-tight">ABOUT</h1>
      <p className="text-muted-foreground mb-8">Everything you need to know about Brawl Challenge.</p>

      {/* About Us */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-4">
        <h2 className="text-xl font-black mb-4 text-primary">About Us</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Brawl Challenge is a website where you can find a lot of more challenges when brawlstars has been getting boring. Features like quiz mode, Daily challenge and speed challenge are all part of it. They offer some new exciting stuff to check out and earn points from.
          </p>
          <p>
            When you complete challenges you earn XP, which get added to the level bar. When the level bar is filled to the top you level up! Unlock titles by getting enough answers right on the quiz mode, completing the speed or daily challenge. With the titles you can earn more points from the same amount of work. Like the 2x title. Specifically how to get the titles is a mystery for you to solve. But they aren't impossible.
          </p>
          <p>
            We've solved the issue of brawlstars not having enough or fun enough quests and quizzes. So we've improved upon them. The website is also done for the "love of the game" both in the sense that we'd like to see BrawlStars succeed but also as good practice for website making and experience. Developed over 2 months. We've worked hard and made many other features of it. Like the history page where you can see your past challenges or the profile where you can see a bunch of stats and more.
          </p>
          <p>
            Although Brawlstars is the core and the base of this website, we are simply an extension of it. We aren't in any way involved or partnered with supercell. We are our completely own brand with our own logo and own theme colours.
          </p>
          <p>
            Hopefully you enjoy this website. We thank you a lot for visiting it and hope you enjoy it to its fullest. Tell us what's your favourite part? The BrawlStars quizzes, Daily BrawlStars challenges or Speed BrawlStars challenges. Is there anything else you would like to see?
          </p>
        </div>
      </div>

      {/* Legal buttons */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href="https://docs.google.com/document/d/11s_oinlZhXjTQFS5BcTZI4NkOnNrcTaSBuyVxB5Ew1M/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors group"
        >
          <div>
            <p className="font-bold">Privacy Policy</p>
            <p className="text-xs text-muted-foreground">How we handle your data</p>
          </div>
          <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </a>

        <a
          href="https://docs.google.com/document/d/1-h-Qw0Uhig5O2LLHBdMf2mucMF0Op7HKN21S62bvlUc/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors group"
        >
          <div>
            <p className="font-bold">Terms of Service</p>
            <p className="text-xs text-muted-foreground">Rules and conditions</p>
          </div>
          <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </a>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-6">
        Brawl Challenge is not affiliated with, endorsed by, or sponsored by Supercell. All Brawl Stars trademarks belong to Supercell.
      </p>
    </div>
  );
}
