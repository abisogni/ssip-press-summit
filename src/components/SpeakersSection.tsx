import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { ParticleFieldBg } from "./AnimatedBackgrounds";
import speakerMagdalena from "@/assets/speaker-magdalena-centered.png";
import speakerJana from "@/assets/speaker-jana.png";
import speakerToby from "@/assets/speaker-toby.png";
import logoSsip from "@/assets/logo-ssip-biotesc.png";
import logoInnovian from "@/assets/logo-innovian.png";
import logoMassbalance from "@/assets/logo-massbalance.png";

const speakers = [
  {
    name: "Dr. Magdalena Herová",
    title: "Head of Space Biology & Scientific Operations",
    org: "SSIP / BIOTESC",
    orgLogo: logoSsip,
    logoClassName: "max-h-16",
    
    bio: "Expert in cell biology and microgravity research, focused on experimental design, biological systems behavior in altered gravity, and the scientific validation of space-based research environments. At the Lucerne University of Applied Sciences and Arts, within BIOTESC, she supports the execution and translation of life-science experiments on the International Space Station. Her work connects academia, ESA infrastructures, and industry, enabling robust, repeatable pathways for microgravity-driven innovation.",
    initials: "MH",
    photo: speakerMagdalena,
    photoClassName: "object-[21%_28%]",
  },
  {
    name: "Jana Stoudemire",
    title: "Chief Commercial Officer",
    org: "Innovian Space",
    orgLogo: logoInnovian,
    
    bio: "Jana is a global leader at the intersection of space, life sciences, and commercialization, driving economically sustainable applications of space with impact on Earth. She has shaped emerging markets in healthcare and in-space manufacturing, bridging pharma, biotech, and advanced technologies with the space economy. She held leadership roles at the International Space Station U.S. National Laboratory, Space Tango, and Axiom Space. Her vision: extending the global economy into low Earth orbit through scalable life sciences innovation.",
    initials: "JS",
    photo: speakerJana,
    photoClassName: "object-center",
  },
  {
    name: "Toby Call",
    title: "Founder & CEO",
    org: "Mass Balance",
    orgLogo: logoMassbalance,
    
    bio: "Toby is following a passion in space and biotech to bring the unfair advantage of microgravity to discovery and manufacturing of protein therapeutics, our most powerful weapons against intractable chronic diseases like cancer, autoimmunity, and neurodegeneration. He sees a world where every biopharma needs its space portfolio to stay competitive.",
    initials: "TC",
    photo: speakerToby,
    photoClassName: "object-center",
  },
];

const SpeakersSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden">
      <ParticleFieldBg intensity={0.4} />
      <div className="absolute inset-0 bg-gradient-dark" style={{ opacity: 0.88 }} />
      <div className="relative z-10 section-padding max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="label-caps mb-4">Faculty</p>
          <h2 className="heading-section">Speakers</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {speakers.map((speaker, i) => (
            <AnimatedSection key={speaker.name} delay={i * 0.08}>
              <motion.div
                layout
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="glass-card glow-border rounded-lg p-8 cursor-pointer transition-all duration-500 h-full"
                whileHover={{ y: -2 }}
              >
                {speaker.photo ? (
                  <img
                    src={speaker.photo}
                    alt={speaker.name}
                    className={`w-20 h-20 rounded-full mb-6 object-cover grayscale hover:grayscale-0 transition-all duration-500 ${speaker.photoClassName ?? "object-center"}`}
                    style={{ border: "1px solid hsl(var(--glow-primary) / 0.2)" }}
                  />
                ) : (
                  <div
                    className="w-20 h-20 rounded-full mb-6 flex items-center justify-center text-xl font-light"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--glow-primary) / 0.15), hsl(var(--glow-secondary) / 0.1))",
                      border: "1px solid hsl(var(--glow-primary) / 0.2)",
                      color: "hsl(var(--glow-primary))",
                    }}
                  >
                    {speaker.initials}
                  </div>
                )}

                <h3 className="text-lg font-medium mb-1" style={{ color: "hsl(var(--foreground))" }}>
                  {speaker.name}
                </h3>
                <p className="text-sm mb-1 min-h-[2.5rem]" style={{ color: "hsl(var(--glow-primary) / 0.8)" }}>
                  {speaker.title}
                </p>
                {speaker.orgLogo ? (
                  <div className="h-16 w-full mb-4 flex items-center gap-3">
                    <img
                      src={speaker.orgLogo}
                      alt={speaker.org}
                      className={`max-w-[10rem] object-contain opacity-90 brightness-125 ${speaker.logoClassName ?? "max-h-12"}`}
                    />
                    <span className="text-sm font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {speaker.org}
                    </span>
                  </div>
                ) : (
                  <p className="text-sm mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {speaker.org}
                  </p>
                )}

                <AnimatePresence>
                  {expanded === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="body-regular text-sm overflow-hidden"
                    >
                      {speaker.bio}
                    </motion.p>
                  )}
                </AnimatePresence>

                <p className="text-xs mt-3" style={{ color: "hsl(var(--muted-foreground) / 0.6)" }}>
                  {expanded === i ? "Click to collapse" : "Click to read bio"}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
