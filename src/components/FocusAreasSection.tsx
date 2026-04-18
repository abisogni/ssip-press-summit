import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { BiotechFiberBg } from "./AnimatedBackgrounds";
import { Microscope, Pill, Satellite, Cpu, Zap, Globe } from "lucide-react";

const areas = [
  { icon: Microscope, title: "Life Sciences & Biotech", desc: "Applications in organoids, tissue engineering, and biological systems, with direct implications for drug discovery and translational research." },
  { icon: Pill, title: "Pharmaceutical Manufacturing", desc: "Protein crystallization, advanced drug formulations, and manufacturing pathways enabled by microgravity to improve efficacy, stability, and delivery." },
  { icon: Satellite, title: "Microgravity Research Platforms", desc: "Access to orbital laboratories and experimental infrastructure for applied R&D, pilot programs, and early industrial validation." },
  { icon: Cpu, title: "Semiconductors & Advanced Materials", desc: "High-precision materials and manufacturing processes benefiting from reduced gravity-driven defects and enhanced structural control." },
  { icon: Zap, title: "Fiber Optics & Precision Systems", desc: "Production of ultra-pure optical fibers and next-generation precision systems with performance beyond terrestrial limits." },
  { icon: Globe, title: "Orbital Infrastructure", desc: "Development of scalable platforms, stations, and logistics enabling continuous industrial operations in orbit." },
];

const FocusAreasSection = () => (
  <section className="relative overflow-hidden">
    <BiotechFiberBg />
    <div className="absolute inset-0 bg-gradient-section" style={{ opacity: 0.88 }} />
    <div className="relative z-10 section-padding max-w-6xl mx-auto">
      <AnimatedSection className="text-center mb-16">
        <p className="label-caps mb-4">Focus Areas</p>
        <h2 className="heading-section">Strategic Domains for Industrial Application</h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {areas.map((area, i) => (
          <AnimatedSection key={area.title} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="glass-card glow-border rounded-lg p-8 h-full transition-all duration-500"
            >
              <area.icon className="w-8 h-8 mb-5" style={{ color: "hsl(var(--glow-primary))" }} />
              <h3 className="text-lg font-medium mb-3" style={{ color: "hsl(var(--foreground))" }}>{area.title}</h3>
              <p className="body-regular text-sm">{area.desc}</p>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default FocusAreasSection;
