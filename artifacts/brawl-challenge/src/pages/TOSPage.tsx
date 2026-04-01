import { ArrowLeft, ExternalLink } from "lucide-react";

interface Props {
  onBack: () => void;
}

export default function TOSPage({ onBack }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      <h1 className="text-3xl font-black mb-1">Terms of Service</h1>
      <p className="text-muted-foreground text-sm mb-6">Last updated: 22 March 2026</p>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-6 text-sm leading-relaxed">
        <p className="text-muted-foreground">
          Brawl Challenge is an unofficial, fan-made quiz and challenge platform inspired by Brawl Stars. We are not affiliated with, endorsed by, or sponsored by Supercell. By using our site, you agree to these Terms. If you don't agree, please don't use the site.
        </p>

        <Section title="Who Can Use Brawl Challenge">
          <p className="text-muted-foreground">Brawl Challenge is open to anyone aged 13 and over. If you're between 13 and 18, you'll need permission from a parent or guardian. We do not knowingly collect personal information from anyone under 13.</p>
        </Section>

        <Section title="How You're Expected to Behave">
          <p className="text-muted-foreground mb-2">When using the site, you must not:</p>
          <ul className="list-disc ml-5 space-y-1 text-muted-foreground">
            <li>Break any applicable laws or regulations</li>
            <li>Post abusive, threatening, offensive, or harassing content</li>
            <li>Infringe on anyone else's intellectual property or privacy</li>
            <li>Attempt to access accounts or systems without authorisation</li>
            <li>Use bots, scripts, or automated tools to interact with the site</li>
            <li>Impersonate another person or entity</li>
          </ul>
          <p className="mt-2 text-muted-foreground">Hate speech, bullying, and discrimination of any kind are not tolerated.</p>
        </Section>

        <Section title="Accounts and Data">
          <p className="text-muted-foreground">You can use Brawl Challenge without an account. Your progress is saved locally on your device. You're responsible for keeping your login credentials secure. We may suspend or terminate accounts that violate these Terms.</p>
        </Section>

        <Section title="Virtual Rewards">
          <p className="text-muted-foreground">Any XP, streaks, or other virtual rewards earned on Brawl Challenge have no real-world monetary value. They cannot be exchanged for cash, goods, or services — they exist purely for fun and personal achievement.</p>
        </Section>

        <Section title="Intellectual Property">
          <p className="text-muted-foreground">All original content on Brawl Challenge belongs to us. As a fan site, we respect Supercell's intellectual property. Nothing on Brawl Challenge should be taken to imply endorsement or sponsorship by Supercell.</p>
        </Section>

        <Section title="Disclaimers and Liability">
          <p className="text-muted-foreground">Brawl Challenge is provided "as is" with no guarantees of uptime, accuracy, or security. To the extent permitted by law, we are not liable for any losses or damages arising from your use of the site.</p>
        </Section>

        <Section title="Governing Law">
          <p className="text-muted-foreground">These Terms are governed by the laws of Finland. Any disputes will be handled by the courts in Helsinki, Finland.</p>
        </Section>

        <Section title="Questions or concerns?">
          <p className="text-muted-foreground">Contact us at <a href="mailto:elloit.02@gmail.com" className="text-primary hover:underline">elloit.02@gmail.com</a></p>
        </Section>
      </div>

      <div className="mt-4 flex justify-center">
        <a
          href="https://docs.google.com/document/d/1TOSDoc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary text-sm hover:underline"
        >
          <ExternalLink size={14} />
          View full Terms of Service document
        </a>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-black text-base mb-2">{title}</h2>
      {children}
    </div>
  );
}
