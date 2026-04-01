import { ArrowLeft } from "lucide-react";

interface Props {
  onBack: () => void;
}

export default function MoreAboutPage({ onBack }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      <h1 className="text-3xl font-black mb-2">More About Brawl Challenge</h1>
      <p className="text-muted-foreground text-sm mb-6">The full story behind the site.</p>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-5 text-sm leading-relaxed text-muted-foreground">
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
        <p className="text-xs text-center pt-2 border-t border-border">
          Brawl Challenge is not affiliated with, endorsed by, or sponsored by Supercell. All Brawl Stars trademarks belong to Supercell.
        </p>
      </div>
    </div>
  );
}
