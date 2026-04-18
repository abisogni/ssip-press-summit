import AnimatedSection from "./AnimatedSection";
import { CellularBg } from "./AnimatedBackgrounds";

const items = [
  "Where microgravity creates immediate impact across pharma and biotech pipelines",
  "Which applications are closest to industrial and commercial deployment",
  "How early access can accelerate R&D timelines and unlock new product opportunities",
  "What infrastructure and partners are required to start engaging today",
  "How early movers can secure strategic and competitive advantage",
];

const LearnSection = () => (
  <section className="relative overflow-hidden">
    <CellularBg />
    <div className="absolute inset-0 bg-gradient-dark" style={{ opacity: 0.87 }} />
    <div className="relative z-10 section-padding max-w-4xl mx-auto">
      <AnimatedSection className="text-center mb-16">
        <p className="label-caps mb-4">Takeaways</p>
        <h2 className="heading-section">What Decisions You Will Be Able to Make</h2>
      </AnimatedSection>

      <div className="space-y-6">
        {items.map((item, i) => (
          <AnimatedSection key={i} delay={i * 0.08}>
            <div className="flex items-start gap-5 group">
              <div className="mt-1.5 flex-shrink-0 w-8 h-px bg-glow-primary/40 group-hover:w-12 transition-all duration-500" />
              <p className="text-lg font-light" style={{ color: "hsl(var(--foreground) / 0.85)" }}>
                {item}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default LearnSection;
