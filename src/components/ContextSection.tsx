import AnimatedSection from "./AnimatedSection";
import { EarthOrbitBg } from "./AnimatedBackgrounds";

const ContextSection = () => (
  <section className="relative overflow-hidden">
    {/* Animated earth orbit background */}
    <EarthOrbitBg />
    <div className="absolute inset-0 bg-gradient-dark" style={{ opacity: 0.85 }} />
    <div className="relative z-10 section-padding max-w-4xl mx-auto text-center">
      <AnimatedSection>
        <p className="label-caps mb-10">The Opportunity</p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <blockquote className="heading-section mb-10" style={{ color: "hsl(var(--foreground))" }}>
          "This is not about space as spectacle.
          <br />
          This is about <span className="text-gradient-primary">industrial advantage</span>."
        </blockquote>
      </AnimatedSection>

      <div className="divider-glow mx-auto max-w-xs mb-10" />

      <AnimatedSection delay={0.2}>
        <p className="body-large max-w-3xl mx-auto mb-6">
          Microgravity introduces a fundamentally new operating environment for biologics discovery, crystal engineering, and advanced manufacturing, enabling outcomes not achievable under Earth gravity.
        </p>
        <p className="body-large max-w-3xl mx-auto mb-6">
          For pharmaceutical and biotech leaders, this represents early access to capabilities that can directly impact R&D efficiency, molecular design, and future production strategies.
        </p>
        <p className="body-large max-w-3xl mx-auto">
          This pre-summit is designed to provide decision-makers with a clear, practical understanding of what can be done today, and where early adoption creates measurable competitive advantage.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default ContextSection;
