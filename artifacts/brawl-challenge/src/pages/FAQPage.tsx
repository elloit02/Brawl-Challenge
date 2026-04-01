import { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";

interface Props {
  onBack: () => void;
}

const faqs = [
  {
    q: "What is Brawl Challenge?",
    a: "Brawl Challenge is a website that helps you on your brawlstars journey and keeps you from getting bored with extra challenges, quizzes and other fun features.",
  },
  {
    q: "How do you level up in Brawl Challenge?",
    a: "You level up by completing Daily challenges, speed challenges and the quiz mode. This earns you XP which will make you level up when you earn enough. TIP: Apply the titles you have unlocked for more points!",
  },
  {
    q: "How are challenges selected?",
    a: "Challenges are picked from a predetermined pool. That same goes for the quiz mode, although there the pools are different based on your level in the website.",
  },
  {
    q: "Do I need an account to use Brawl Challenge?",
    a: "Currently no account is needed, but we may add log in options for users later as things like leaderboards may require authorization.",
  },
  {
    q: "Is my history and data about the website saved?",
    a: "Yes, to keep your progress from resetting and allow you to continue where you left off, data about you will be saved in your browser info (like cookies). Note that deleting your browser data will delete the progress too, and your progress won't be saved across devices.",
  },
  {
    q: "How do I contact support?",
    a: "You can contact us via elloit.02@gmail.com. Expect a reply within a few business days.",
  },
  {
    q: "Is this website safe for kids?",
    a: "Brawl Challenge does not include any content unsafe for children. We would not recommend it for under 13 year olds.",
  },
  {
    q: "How do we handle privacy and data?",
    a: "We do not sell your data. We may use some data for analytics such as device type and country but not more. Most data is stored on your own device and the site doesn't require any personal data like your name or age.",
  },
  {
    q: "What about Ads and monetisation?",
    a: "We do not include subscriptions or any micro transactions which means we have to use ads to fund the site. Ads include Google Adsense ads but also ads for the creator such as invite links to discord servers and links to youtube channels.",
  },
  {
    q: "How can I find out more about the creator and the site?",
    a: "You can join the community Discord server, check out the youtube channel linked across the site or message me personally from the contact email provided.",
  },
];

export default function FAQPage({ onBack }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      <h1 className="text-3xl font-black mb-2">FAQ</h1>
      <p className="text-muted-foreground text-sm mb-6">Frequently asked questions about Brawl Challenge.</p>

      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
            >
              <span className="font-semibold text-sm">{faq.q}</span>
              <ChevronDown
                size={16}
                className={`text-muted-foreground shrink-0 ml-3 transition-transform ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
