import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { ParticleFieldBg } from "./AnimatedBackgrounds";

type FormState = "idle" | "loading" | "success" | "error";

const InvitationSection = () => {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    company: "", jobTitle: "", mailingList: false,
  });
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: string, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, eventId: "TX-2605" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Submission failed");
      setState("success");
    } catch (err: any) {
      setErrorMsg(err.message ?? "Something went wrong. Please try again.");
      setState("error");
    }
  };

  const inputClass = `
    w-full bg-transparent border border-[hsl(240_10%_20%)] rounded-[3px]
    px-4 py-3 text-sm font-light text-[hsl(220_15%_85%)]
    placeholder:text-[hsl(220_10%_35%)] outline-none
    focus:border-[hsl(var(--glow-primary)/0.5)]
    focus:shadow-[0_0_0_1px_hsl(var(--glow-primary)/0.15)]
    transition-all duration-200
  `.trim();

  return (
    <section id="invitation" className="relative overflow-hidden">
      <ParticleFieldBg intensity={0.25} />
      <div className="absolute inset-0 bg-gradient-section" style={{ opacity: 0.92 }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-glow-primary/3 blur-[150px]" />

      <div className="relative z-10 section-padding max-w-2xl mx-auto text-center">
        <AnimatedSection>
          <p className="label-caps mb-4">Apply</p>
          <h2 className="heading-section mb-6">
            "This is a closed-door,{" "}
            <span className="text-gradient-primary">invitation-only</span> session."
          </h2>
          <p className="body-large mb-12">
            Participation is limited to a highly curated group of industry leaders, investors, and technical experts.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          {state === "success" ? (
            <div
              className="rounded-[3px] px-8 py-10 text-center"
              style={{
                background: "hsl(168 100% 42% / 0.06)",
                border: "1px solid hsl(168 100% 42% / 0.2)",
              }}
            >
              <p className="label-caps mb-3">Request Received</p>
              <p className="text-[hsl(220_15%_78%)] font-light text-[0.95rem] leading-relaxed">
                Thank you. Our team will review your request and be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="text-left space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-[hsl(220_10%_45%)] mb-1.5">First Name</label>
                  <input
                    required
                    className={inputClass}
                    placeholder="Jane"
                    value={form.firstName}
                    onChange={e => set("firstName", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-[hsl(220_10%_45%)] mb-1.5">Last Name</label>
                  <input
                    required
                    className={inputClass}
                    placeholder="Smith"
                    value={form.lastName}
                    onChange={e => set("lastName", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[hsl(220_10%_45%)] mb-1.5">Company</label>
                <input
                  required
                  className={inputClass}
                  placeholder="Organisation name"
                  value={form.company}
                  onChange={e => set("company", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[hsl(220_10%_45%)] mb-1.5">Role / Title</label>
                <input
                  required
                  className={inputClass}
                  placeholder="Chief Executive Officer"
                  value={form.jobTitle}
                  onChange={e => set("jobTitle", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-[hsl(220_10%_45%)] mb-1.5">Email</label>
                  <input
                    required
                    type="email"
                    className={inputClass}
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={e => set("email", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-[hsl(220_10%_45%)] mb-1.5">Phone</label>
                  <input
                    className={inputClass}
                    placeholder="+41 ..."
                    value={form.phone}
                    onChange={e => set("phone", e.target.value)}
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group pt-1">
                <div className="relative mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={form.mailingList}
                    onChange={e => set("mailingList", e.target.checked)}
                  />
                  <div
                    className="w-4 h-4 rounded-[2px] border transition-all duration-200"
                    style={{
                      background: form.mailingList ? "hsl(var(--glow-primary))" : "transparent",
                      borderColor: form.mailingList
                        ? "hsl(var(--glow-primary))"
                        : "hsl(240 10% 30%)",
                    }}
                  >
                    {form.mailingList && (
                      <svg className="w-3 h-3 absolute top-0.5 left-0.5" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="hsl(var(--background))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-[0.85rem] font-light text-[hsl(220_10%_50%)] leading-snug group-hover:text-[hsl(220_10%_65%)] transition-colors">
                  Keep me informed about SSIP events and updates
                </span>
              </label>

              {state === "error" && (
                <p className="text-[0.83rem] text-[hsl(0_70%_60%)]">{errorMsg}</p>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="w-full py-3.5 text-[13px] font-medium tracking-[0.08em] uppercase rounded-[3px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                  style={{
                    background: "hsl(var(--glow-primary))",
                    color: "hsl(var(--background))",
                    boxShadow: "0 0 0 1px hsl(var(--glow-primary) / 0.3), 0 4px 24px hsl(var(--glow-primary) / 0.15)",
                  }}
                >
                  {state === "loading" ? "Submitting…" : "Request Access"}
                </button>
              </div>
            </form>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default InvitationSection;
