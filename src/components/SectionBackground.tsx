interface SectionBackgroundProps {
  image: string;
  opacity?: number;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const SectionBackground = ({ image, opacity = 0.15, children, className = "", id }: SectionBackgroundProps) => (
  <section id={id} className={`relative overflow-hidden ${className}`}>
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${image})`, opacity }}
    />
    <div className="absolute inset-0 bg-gradient-dark" style={{ opacity: 1 - opacity * 0.5 }} />
    <div className="relative z-10">{children}</div>
  </section>
);

export default SectionBackground;
