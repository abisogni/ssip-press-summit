import ssipLogo from "@/assets/ssip-logo.png";

const FooterSection = () => (
  <footer className="relative px-6 py-16 md:px-12">
    <div className="divider-glow mb-12" />
    <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
      <img src={ssipLogo} alt="SSIP" className="h-11 w-auto opacity-70 mb-5" />

      <p className="text-sm mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
        Space Systems Innovation Platform · Switzerland
      </p>

      <p className="text-sm font-medium mb-3" style={{ color: "hsl(var(--foreground) / 0.85)" }}>
        Request Sponsorship Information for GOIS &amp; Pre-Summit
      </p>
      <a
        href="mailto:contact@ssip-pl.ch?subject=Sponsorship%20Information%20%E2%80%93%20GOIS%20%26%20Pre-Summit%20Basel%202026"
        className="text-sm transition-colors duration-300"
        style={{ color: "hsl(var(--glow-primary) / 0.7)" }}
      >
        contact@ssip-pl.ch
      </a>

      <div className="mt-12">
        <p className="text-xs" style={{ color: "hsl(var(--muted-foreground) / 0.4)" }}>
          © 2026 GOIS Pre-Summit. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default FooterSection;
