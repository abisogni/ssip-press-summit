import AnimatedSection from "./AnimatedSection";
import { OrbitalPathsBg } from "./AnimatedBackgrounds";

const GOISSection = () => (
  <section className="relative overflow-hidden">
    <OrbitalPathsBg />
    <div className="absolute inset-0 bg-gradient-dark" style={{ opacity: 0.85 }} />
    <div className="relative z-10 section-padding max-w-4xl mx-auto text-center">
      <AnimatedSection>
        <p className="label-caps mb-4">Connection</p>
        <h2 className="heading-section mb-8">
          This executive pre-summit is part of the
          <br />
          <a
            href="https://gois.ssip-pl.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gradient-primary hover:opacity-80 transition-opacity duration-300"
          >
            Global Orbital Infrastructure Summit
          </a>
        </h2>
        <p className="text-sm font-light tracking-[0.15em] uppercase" style={{ color: "hsl(var(--muted-foreground) / 0.7)" }}>
          June 24‒25, 2026 | Technopark Luzern, Switzerland
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default GOISSection;
