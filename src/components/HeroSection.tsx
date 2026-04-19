import { motion } from "framer-motion";
import ssipLogo from "@/assets/ssip-logo.png";
import inventiciaLogo from "@/assets/inventicia-logo.png";
import heroVideoAsset from "../../public/hero-video.mp4.asset.json";
const heroVideoUrl = heroVideoAsset.url;
import { ChevronDown } from "lucide-react";
import { FloatingParticlesOverlay } from "./AnimatedBackgrounds";

const HeroSection = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden">
    {/* Video Background */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-0"
      style={{ opacity: 0.32 }}
      poster=""
    >
      <source src={heroVideoUrl} type="video/mp4" />
    </video>

    {/* Dark gradient overlay */}
    <div
      className="absolute inset-0 z-[1]"
      style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.70) 70%, rgba(0,0,0,0.88) 100%)",
      }}
    />

    {/* Floating particles */}
    <FloatingParticlesOverlay />

    {/* Floating orbs */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-glow-primary/5 blur-[120px] animate-drift z-[2]" />
    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-glow-secondary/5 blur-[100px] animate-drift z-[2]" style={{ animationDelay: "-7s" }} />

    {/* Logos */}
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 pt-12 md:pt-14 flex flex-col items-center mb-[38px] md:mb-[44px]"
    >
      <div className="flex items-center gap-9 md:gap-11">
        <img src={ssipLogo} alt="SSIP" className="h-[60px] md:h-[75px] w-auto opacity-90" />
        <img src={inventiciaLogo} alt="Inventicia" className="h-[51px] md:h-[66px] w-auto opacity-80" />
      </div>
    </motion.div>

    {/* Content */}
    <div className="relative z-10 text-center max-w-[52rem] mx-auto px-8 mt-auto mb-auto flex flex-col items-center justify-center" style={{ paddingTop: "1vh", paddingBottom: "5vh" }}>
      {/* Subtitle + Date block */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center mb-[28px] md:mb-[32px]"
      >
        <p
          className="text-[11.5px] md:text-[14px] font-normal tracking-[0.32em] uppercase"
          style={{ color: "hsl(175 45% 58% / 0.85)" }}
        >
          GOIS Executive Pre-Summit · Basel, Switzerland
        </p>
        <p
          className="text-[10.5px] md:text-[12px] font-light tracking-[0.28em] uppercase mt-[6px]"
          style={{ color: "hsl(220 15% 72% / 0.7)" }}
        >
          26 May 2026
        </p>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-[2.6rem] md:text-[3.4rem] lg:text-[4rem] font-extralight tracking-[-0.03em] leading-[1.1] mb-[22px] md:mb-[26px]"
      >
        <span className="text-gradient-primary">Inside a Microgravity Lab</span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-lg md:text-[1.35rem] lg:text-[1.5rem] font-light tracking-[-0.01em] leading-relaxed mb-[16px] md:mb-[20px]"
        style={{ color: "hsl(220 15% 78% / 0.75)" }}
      >
        Early Industrial Access to Microgravity &amp; Orbital Infrastructure
      </motion.p>

      {/* Body */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-[0.95rem] md:text-[1.05rem] font-light leading-[1.75] max-w-[38rem] mx-auto mb-[36px] md:mb-[42px]"
        style={{ color: "hsl(220 10% 55% / 0.85)" }}
      >
        An invitation-only executive pre-summit bringing together leaders in life sciences, biotechnology, advanced manufacturing, and orbital infrastructure.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-5"
      >
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href="#invitation"
            className="px-10 py-3.5 text-[13px] font-medium tracking-[0.08em] uppercase rounded-[3px] transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "hsl(var(--glow-primary))",
              color: "hsl(var(--background))",
              boxShadow: "0 0 0 1px hsl(var(--glow-primary) / 0.3), 0 4px 24px hsl(var(--glow-primary) / 0.15)",
            }}
          >
            Request Access
          </a>
          <a
            href="https://gois.ssip-pl.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-3.5 text-[13px] font-medium tracking-[0.08em] uppercase rounded-[3px] transition-all duration-300 hover:-translate-y-0.5"
            style={{
              border: "1px solid hsl(220 15% 70% / 0.2)",
              color: "hsl(220 15% 78% / 0.8)",
            }}
          >
            Learn about GOIS 2026
          </a>
        </div>
        <a
          href="#agenda"
          className="text-[11px] font-light tracking-[0.2em] uppercase transition-colors duration-300"
          style={{ color: "hsl(220 10% 45% / 0.7)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "hsl(220 10% 65% / 0.9)")}
          onMouseLeave={e => (e.currentTarget.style.color = "hsl(220 10% 45% / 0.7)")}
        >
          Explore the Agenda
        </a>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
    >
      <ChevronDown className="w-[18px] h-[18px] animate-scroll-hint" style={{ color: "hsl(220 10% 50% / 0.4)" }} />
    </motion.div>
  </section>
);

export default HeroSection;
