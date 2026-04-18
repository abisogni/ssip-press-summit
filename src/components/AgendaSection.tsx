import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { DataGridBg } from "./AnimatedBackgrounds";

const agenda = [
  { time: "15:00", title: "Arrival & Welcome Coffee", desc: "Private arrival, light reception, and initial networking in a curated setting" },
  { time: "15:10", title: "Opening Remarks", speaker: "Paulo Pinheiro, SSIP", desc: "Setting the strategic context: microgravity as a new operating environment for research and industrial development" },
  { time: "15:15", title: "What a Microgravity Lab Actually Is", speaker: "Dr. Magdalena Herová", desc: "Scientific foundations, laboratory conditions, and the operational realities of microgravity research environments" },
  { time: "15:35", title: "Building and Experimenting in Microgravity", speaker: "Toby Call", desc: "A founder's perspective on payload development, biological systems, and rapid experimentation in microgravity" },
  { time: "15:55", title: "How Industry Accesses Microgravity", speaker: "Jana Stoudemire, Innovian Space", desc: "Commercial pathways, access models, and how selected industry players can enter the orbital ecosystem" },
  { time: "16:15", title: "Focused Discussion", speaker: "All Speakers", desc: "A moderated exchange on misconceptions, readiness, barriers, and where industry should move first" },
  { time: "16:35", title: "Closing Remarks", speaker: "Debraj Dasgupta, Inventicia", desc: "Final reflections and connection to broader industrial and collaboration opportunities" },
  { time: "17:00", title: "Networking Apéro", desc: "An elegant and informal networking session with drinks, designed to foster direct conversations and strategic connections" },
];

const AgendaSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="agenda" className="relative overflow-hidden">
      <DataGridBg />
      <div className="absolute inset-0 bg-gradient-section" style={{ opacity: 0.9 }} />
      <div className="relative z-10 section-padding max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="label-caps mb-4">Programme</p>
          <h2 className="heading-section mb-4">Agenda</h2>
          <p className="body-regular text-sm" style={{ color: "hsl(var(--muted-foreground) / 0.7)" }}>
            A focused executive session designed for clarity, access, and meaningful exchange
          </p>
        </AnimatedSection>

        <div className="space-y-0">
          {agenda.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.04}>
              <div
                className="group relative border-l border-border/30 pl-8 py-5 cursor-default transition-all duration-500"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-7 w-2 h-2 rounded-full -translate-x-1 transition-all duration-500"
                  style={{
                    backgroundColor: hoveredIndex === i ? "hsl(var(--glow-primary))" : "hsl(var(--muted-foreground) / 0.3)",
                    boxShadow: hoveredIndex === i ? "0 0 12px hsl(var(--glow-primary) / 0.5)" : "none",
                  }}
                />

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                  <span className="text-sm font-medium shrink-0" style={{ color: "hsl(var(--glow-primary) / 0.7)" }}>
                    {item.time}
                  </span>
                    <div>
                    <h3 className="text-base font-medium mb-0.5" style={{ color: "hsl(var(--foreground))" }}>
                      {item.title}
                    </h3>
                    {(item as any).speaker && (
                      <p className="text-xs font-light tracking-wide mb-1" style={{ color: "hsl(var(--glow-primary) / 0.6)" }}>
                        {(item as any).speaker}
                      </p>
                    )}
                    <AnimatePresence>
                      {hoveredIndex === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="body-regular text-sm overflow-hidden"
                        >
                          {item.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
