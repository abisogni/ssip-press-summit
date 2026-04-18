import { useEffect, useRef } from "react";

/* ─── Shared helpers ─── */
const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

function useCanvas(draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const resize = () => {
      const r = dpr();
      canvas.width = canvas.offsetWidth * r;
      canvas.height = canvas.offsetHeight * r;
      ctx.scale(r, r);
    };
    resize();
    window.addEventListener("resize", resize);
    const loop = (t: number) => {
      ctx.setTransform(dpr(), 0, 0, dpr(), 0, 0);
      draw(ctx, canvas.offsetWidth, canvas.offsetHeight, t * 0.001);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [draw]);
  return ref;
}

/* ─── 1. Earth Orbit — slow rotating atmospheric arcs ─── */
export function EarthOrbitBg() {
  const draw = useRef((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    ctx.clearRect(0, 0, w, h);
    // Atmospheric arcs
    for (let i = 0; i < 5; i++) {
      const a = t * 0.08 + i * 1.2;
      const cx = w * 0.5 + Math.cos(a) * w * 0.15;
      const cy = h * 0.6 + Math.sin(a * 0.7) * h * 0.1;
      const r = w * (0.3 + i * 0.08);
      ctx.beginPath();
      ctx.arc(cx, cy, r, -0.4 + i * 0.1, 0.4 + i * 0.1);
      ctx.strokeStyle = `hsla(200, 60%, 50%, ${0.04 - i * 0.006})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    // Soft glow at center-bottom
    const grd = ctx.createRadialGradient(w * 0.5, h * 0.85, 0, w * 0.5, h * 0.85, w * 0.5);
    grd.addColorStop(0, "hsla(200, 60%, 40%, 0.06)");
    grd.addColorStop(1, "transparent");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);
  }).current;
  const ref = useCanvas(draw);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }} />;
}

/* ─── 2. Biotech Fiber — organic cells + light pulses ─── */
export function BiotechFiberBg() {
  const draw = useRef((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    ctx.clearRect(0, 0, w, h);
    // Organic cell shapes
    for (let i = 0; i < 8; i++) {
      const x = (w * (0.1 + i * 0.12)) + Math.sin(t * 0.15 + i) * 20;
      const y = h * 0.5 + Math.cos(t * 0.1 + i * 0.8) * h * 0.2;
      const r = 30 + Math.sin(t * 0.2 + i * 2) * 10;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
      grd.addColorStop(0, `hsla(168, 80%, 45%, ${0.06 + Math.sin(t * 0.3 + i) * 0.02})`);
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    // Light pulse lines (fiber optics)
    for (let i = 0; i < 4; i++) {
      const yBase = h * (0.2 + i * 0.2);
      ctx.beginPath();
      ctx.moveTo(0, yBase);
      for (let x = 0; x <= w; x += 5) {
        const y = yBase + Math.sin(x * 0.005 + t * 0.3 + i * 2) * 15;
        ctx.lineTo(x, y);
      }
      // Traveling pulse
      const pulseX = ((t * 40 + i * 200) % (w + 200)) - 100;
      const grd = ctx.createLinearGradient(pulseX - 80, 0, pulseX + 80, 0);
      grd.addColorStop(0, "transparent");
      grd.addColorStop(0.5, `hsla(168, 100%, 50%, 0.12)`);
      grd.addColorStop(1, "transparent");
      ctx.strokeStyle = grd;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }).current;
  const ref = useCanvas(draw);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ opacity: 0.8 }} />;
}

/* ─── 3. Cellular / Biological ─── */
export function CellularBg() {
  const draw = useRef((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    ctx.clearRect(0, 0, w, h);
    // Organoid-like clusters
    for (let i = 0; i < 12; i++) {
      const seed = i * 7.3;
      const cx = w * (0.15 + (seed * 0.07) % 0.7) + Math.sin(t * 0.08 + seed) * 25;
      const cy = h * (0.15 + (seed * 0.11) % 0.7) + Math.cos(t * 0.06 + seed) * 20;
      const r = 15 + Math.sin(t * 0.15 + seed * 0.5) * 8;
      // Outer membrane
      ctx.beginPath();
      ctx.arc(cx, cy, r + 8, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(168, 60%, 40%, ${0.04 + Math.sin(t * 0.1 + i) * 0.015})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      // Inner nucleus
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grd.addColorStop(0, `hsla(180, 50%, 45%, 0.05)`);
      grd.addColorStop(0.7, `hsla(200, 40%, 40%, 0.02)`);
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
    // Fluid connections between nearby cells
    for (let i = 0; i < 6; i++) {
      const s1 = i * 7.3, s2 = (i + 3) * 7.3;
      const x1 = w * (0.15 + (s1 * 0.07) % 0.7) + Math.sin(t * 0.08 + s1) * 25;
      const y1 = h * (0.15 + (s1 * 0.11) % 0.7) + Math.cos(t * 0.06 + s1) * 20;
      const x2 = w * (0.15 + (s2 * 0.07) % 0.7) + Math.sin(t * 0.08 + s2) * 25;
      const y2 = h * (0.15 + (s2 * 0.11) % 0.7) + Math.cos(t * 0.06 + s2) * 20;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2 + Math.sin(t * 0.2 + i) * 30, (y1 + y2) / 2, x2, y2);
      ctx.strokeStyle = `hsla(168, 50%, 45%, 0.025)`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }
  }).current;
  const ref = useCanvas(draw);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ opacity: 0.9 }} />;
}

/* ─── 4. Particle Field (subtle, for Speakers / Invitation) ─── */
export function ParticleFieldBg({ intensity = 0.5 }: { intensity?: number }) {
  const particles = useRef(
    Array.from({ length: 40 }, (_, i) => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      size: 0.8 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
    }))
  ).current;

  const draw = useRef((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
      const x = (p.x * w + Math.sin(t * 0.05 + p.phase) * p.vx * 60) % w;
      const y = (p.y * h + Math.cos(t * 0.04 + p.phase) * p.vy * 50) % h;
      const alpha = (0.15 + Math.sin(t * 0.2 + p.phase) * 0.08) * intensity;
      ctx.beginPath();
      ctx.arc(x < 0 ? x + w : x, y < 0 ? y + h : y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(168, 80%, 55%, ${alpha})`;
      ctx.fill();
    });
    // Soft light streaks
    for (let i = 0; i < 3; i++) {
      const y = h * (0.2 + i * 0.3) + Math.sin(t * 0.06 + i * 2) * 30;
      const grd = ctx.createLinearGradient(0, y, w, y);
      grd.addColorStop(0, "transparent");
      grd.addColorStop(0.3, `hsla(200, 50%, 50%, ${0.015 * intensity})`);
      grd.addColorStop(0.7, `hsla(168, 60%, 50%, ${0.01 * intensity})`);
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, y - 1, w, 2);
    }
  }).current;
  const ref = useCanvas(draw);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

/* ─── 5. Data Grid Lines (Agenda) ─── */
export function DataGridBg() {
  const draw = useRef((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    ctx.clearRect(0, 0, w, h);
    const spacing = 60;
    // Horizontal lines
    for (let y = 0; y < h; y += spacing) {
      const offset = Math.sin(t * 0.05 + y * 0.01) * 2;
      ctx.beginPath();
      ctx.moveTo(0, y + offset);
      ctx.lineTo(w, y + offset);
      ctx.strokeStyle = `hsla(200, 30%, 50%, 0.025)`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    // Vertical traveling pulses
    for (let i = 0; i < 3; i++) {
      const x = ((t * 15 + i * w / 3) % (w + 100)) - 50;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      const grd = ctx.createLinearGradient(x, 0, x, h);
      grd.addColorStop(0, "transparent");
      grd.addColorStop(0.3, `hsla(168, 80%, 50%, 0.04)`);
      grd.addColorStop(0.7, `hsla(168, 80%, 50%, 0.02)`);
      grd.addColorStop(1, "transparent");
      ctx.strokeStyle = grd;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    // Horizontal traveling pulses
    for (let i = 0; i < 2; i++) {
      const y = ((t * 10 + i * h / 2) % (h + 100)) - 50;
      const grd = ctx.createLinearGradient(0, y, w, y);
      grd.addColorStop(0, "transparent");
      grd.addColorStop(0.4, `hsla(200, 50%, 55%, 0.03)`);
      grd.addColorStop(0.6, `hsla(168, 60%, 50%, 0.02)`);
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, y - 0.5, w, 1);
    }
  }).current;
  const ref = useCanvas(draw);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ opacity: 0.8 }} />;
}

/* ─── 6. Orbital Infrastructure — curved orbital paths ─── */
export function OrbitalPathsBg() {
  const draw = useRef((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    ctx.clearRect(0, 0, w, h);
    // Orbital ellipses
    for (let i = 0; i < 6; i++) {
      const cx = w * 0.5;
      const cy = h * 0.5;
      const rx = w * (0.2 + i * 0.07);
      const ry = h * (0.12 + i * 0.05);
      const rot = t * 0.02 + i * 0.5;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(200, 50%, 50%, ${0.035 - i * 0.004})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
      // Dot traveling along path
      const angle = t * (0.15 - i * 0.01) + i * 1.5;
      const dx = Math.cos(angle) * rx;
      const dy = Math.sin(angle) * ry;
      ctx.beginPath();
      ctx.arc(dx, dy, 2, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(168, 80%, 55%, ${0.12 - i * 0.015})`;
      ctx.fill();
      ctx.restore();
    }
  }).current;
  const ref = useCanvas(draw);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }} />;
}

/* ─── 7. Floating Particles overlay for Hero ─── */
export function FloatingParticlesOverlay() {
  const particles = useRef(
    Array.from({ length: 30 }, () => ({
      x: Math.random(), y: Math.random(),
      size: 0.5 + Math.random() * 1.5,
      speed: 0.01 + Math.random() * 0.02,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.5,
    }))
  ).current;

  const draw = useRef((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
      const x = (p.x * w + Math.sin(t * 0.03 + p.phase) * p.drift * 80);
      const baseY = p.y * h;
      const y = baseY + Math.sin(t * p.speed * 3 + p.phase) * 30;
      const alpha = 0.15 + Math.sin(t * 0.15 + p.phase) * 0.1;
      ctx.beginPath();
      ctx.arc(
        ((x % w) + w) % w,
        ((y % h) + h) % h,
        p.size, 0, Math.PI * 2
      );
      ctx.fillStyle = `hsla(168, 70%, 60%, ${alpha})`;
      ctx.fill();
    });
  }).current;
  const ref = useCanvas(draw);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full z-[2]" style={{ opacity: 0.6 }} />;
}
