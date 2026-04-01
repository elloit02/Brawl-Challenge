import { ArrowLeft, ExternalLink } from "lucide-react";

interface Props {
  onBack: () => void;
}

export default function PrivacyPage({ onBack }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      <h1 className="text-3xl font-black mb-1">Privacy Policy</h1>
      <p className="text-muted-foreground text-sm mb-6">Last updated: 16 March 2026</p>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-6 text-sm leading-relaxed">
        <div>
          <p className="text-muted-foreground mb-4">
            Brawl Challenge is an unofficial, fan-made quiz and challenge platform inspired by Brawl Stars. We are not affiliated with, endorsed by, or sponsored by Supercell. This summary explains how we handle your personal data when you use our site.
          </p>
        </div>

        <Section title="What We Collect">
          <p>We collect two broad categories of information:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1 text-muted-foreground">
            <li><strong className="text-foreground">Information you provide directly</strong> — when you create an account, we collect your email address and the display name you choose. If you sign in via Google, we receive your Google account email and display name.</li>
            <li><strong className="text-foreground">Information collected automatically</strong> — we collect device and usage data such as your browser type, operating system, IP address, pages visited, and session activity. Cookies and similar tracking technologies are also used by us and our advertising partner, Google AdSense.</li>
          </ul>
          <p className="mt-2 text-muted-foreground">We do not collect sensitive data such as payment details, government IDs, health information, or precise location data.</p>
        </Section>

        <Section title="How We Use Your Information">
          <p className="text-muted-foreground">Your information is used to run your account, improve the site, serve advertising via Google AdSense, keep the site secure, comply with the law, and communicate with you. We do not sell your personal information to third parties.</p>
        </Section>

        <Section title="Cookies and Advertising">
          <p className="text-muted-foreground">We use essential, preference, analytics, and advertising cookies. Google AdSense may serve personalised or non-personalised ads. You can opt out of personalised advertising at <a href="https://adssettings.google.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</p>
        </Section>

        <Section title="Data Storage and Security">
          <p className="text-muted-foreground">Your data is stored through our hosting provider. We use HTTPS encryption for all data in transit. Most progress data is stored locally in your browser via localStorage.</p>
        </Section>

        <Section title="Children's Privacy">
          <p className="text-muted-foreground">Brawl Challenge is not directed at children under 13. We do not knowingly collect personal information from anyone under 13.</p>
        </Section>

        <Section title="Your Rights">
          <p className="text-muted-foreground">Depending on where you live, you may have the right to access, correct, delete, or export your personal data. To exercise any of these rights, contact us at <a href="mailto:elloit.02@gmail.com" className="text-primary hover:underline">elloit.02@gmail.com</a>.</p>
        </Section>

        <Section title="Questions?">
          <p className="text-muted-foreground">Contact us at <a href="mailto:elloit.02@gmail.com" className="text-primary hover:underline">elloit.02@gmail.com</a></p>
        </Section>
      </div>

      <div className="mt-4 flex justify-center">
        <a
          href="https://docs.google.com/document/d/11s_oinlZhXjTQFS5BcTZI4NkOnNrcTaSBuyVxB5Ew1M/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary text-sm hover:underline"
        >
          <ExternalLink size={14} />
          View full Privacy Policy document
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
