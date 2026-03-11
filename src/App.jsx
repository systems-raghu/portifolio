import { useEffect, useMemo, useState } from "react";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" }
];

const services = [
  {
    title: "AI Content System",
    text: "Script, repurpose, and publish across platforms without manual chaos."
  },
  {
    title: "Lead Generation System",
    text: "Find, qualify, and reach the right prospects with automated sequences."
  },
  {
    title: "Website Development",
    text: "Conversion-focused websites built for trust, speed, and action."
  },
  {
    title: "Automation Workflows",
    text: "If it is repetitive, it should not involve you anymore."
  },
  {
    title: "AI Agents",
    text: "Custom agents trained on your business to execute real tasks."
  },
  {
    title: "AI-Powered Marketing",
    text: "One connected engine across content, outreach, email, and analytics."
  }
];

const processSteps = [
  { num: "01", title: "Discovery Call (30 min)", desc: "Clarity on bottlenecks, goals, and what you should stop doing manually." },
  { num: "02", title: "Scope + Proposal (24-48 hrs)", desc: "Exact deliverables, timeline, stack, and fixed pricing." },
  { num: "03", title: "Build (7-21 days)", desc: "Regular updates while your system gets built and deployed." },
  { num: "04", title: "Handoff + Support", desc: "Documentation, walkthrough, and support window after launch." }
];

const proofCards = [
  {
    title: "Steal This AI Image System Before Your Competitors Do",
    desc: "Live project: watch the full workflow to generate high-converting AI images fast.",
    status: "Live Project",
    href: "https://youtu.be/tFLkRRIZuCY?si=q_Yy3uEXPTsFWYB6",
    cta: "Watch Video"
  },
  {
    title: "AI Lead Generation System",
    desc: "This build is currently in progress. Full case study dropping soon.",
    status: "In Process"
  },
  {
    title: "Full AI Marketing Stack",
    desc: "This build is currently in progress. Full case study dropping soon.",
    status: "In Process"
  }
];

const trustLine = ["Founders", "Coaches", "B2B Teams", "SaaS Teams", "India", "UAE", "Global"];
const TEXTURE_IMAGE = "https://i.pinimg.com/736x/f4/89/b4/f489b4df3c9b3f48de6541ea675d73f8.jpg";

const textureStyle = {
  backgroundImage: [
    "linear-gradient(to bottom, rgba(245,245,245,0.94) 0%, rgba(245,245,245,0.78) 45%, rgba(245,245,245,0.9) 100%)",
    `url('${TEXTURE_IMAGE}')`
  ].join(", "),
  backgroundSize: "100% 100%, cover",
  backgroundPosition: "center top, center top",
  backgroundRepeat: "no-repeat, no-repeat"
};

const textureReflectionStyle = {
  backgroundImage: [
    "linear-gradient(to bottom, rgba(248,248,248,0.95) 0%, rgba(248,248,248,0.65) 42%, rgba(248,248,248,0.9) 100%)",
    `url('${TEXTURE_IMAGE}')`
  ].join(", "),
  backgroundSize: "100% 100%, cover",
  backgroundPosition: "center top, center bottom",
  backgroundRepeat: "no-repeat, no-repeat"
};

function Pill({ href, children, dark = false }) {
  return (
    <a
      href={href}
      className={[
        "action-btn surface-soft font-basis inline-flex min-h-[40px] w-full items-center justify-center rounded-full px-5 py-2 text-[12px] font-medium transition-colors duration-300 sm:w-auto",
        dark ? "bg-[#171717] text-white hover:bg-black" : "bg-[#ececec] text-[#171717] hover:bg-[#e2e2e2]"
      ].join(" ")}
    >
      <span>{children}</span>
    </a>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [progress, setProgress] = useState(0);
  const sectionIds = useMemo(() => navItems.map((n) => n.id), []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.55 }
    );

    sectionIds.forEach((id) => {
      const node = document.getElementById(id);
      if (node) sectionObserver.observe(node);
    });

    return () => sectionObserver.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("in-view", entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));
    return () => revealObserver.disconnect();
  }, []);

  async function submitForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setSubmitError("");
    setSent(false);

    try {
      const response = await fetch("https://formspree.io/f/mjgawkwk", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      form.reset();
      setSent(true);
    } catch (error) {
      setSubmitError("Could not send your message right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleHeroMove(event) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const ry = ((x - 50) / 50) * 4.5;
    const rx = ((50 - y) / 50) * 3.8;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--rx", `${rx}deg`);
  }

  function resetHeroMove(event) {
    const el = event.currentTarget;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  }

  return (
    <div className="font-basis min-h-screen bg-[#d8d8d8] px-3 py-4 text-[#171717] md:px-8 md:py-6">
      <div className="ambient-rail ambient-left" aria-hidden="true">
        <span className="ambient-line" />
        <span className="ambient-dot ambient-dot-a" />
        <span className="ambient-dot ambient-dot-b" />
        <span className="ambient-dot ambient-dot-c" />
      </div>
      <div className="ambient-rail ambient-right" aria-hidden="true">
        <span className="ambient-line" />
        <span className="ambient-dot ambient-dot-a" />
        <span className="ambient-dot ambient-dot-b" />
        <span className="ambient-dot ambient-dot-c" />
      </div>

      <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-transparent">
        <div className="h-full bg-[#1d1d1d] transition-[width] duration-200" style={{ width: `${progress}%` }} />
      </div>

      <div
        className="surface-card mx-auto w-full max-w-[980px] rounded-[28px] bg-[#efefef] p-3 sm:rounded-[32px] sm:p-4 md:rounded-[38px] md:p-7"
        style={{
          backgroundImage: [
            "linear-gradient(to bottom, rgba(239,239,239,0.96), rgba(239,239,239,0.9))",
            `url('${TEXTURE_IMAGE}')`
          ].join(", "),
          backgroundSize: "100% 100%, cover",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "center top, center top"
        }}
      >
        <header className="sticky top-2 z-40 sm:top-3 md:top-4">
          <div className="nav-glass rounded-[18px] border border-white/55 bg-[#f6f6f6]/72 px-2.5 py-2 backdrop-blur-xl sm:rounded-[20px] sm:px-3 md:rounded-[22px] md:px-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] text-[#6d6d6d]">AI SYSTEMS BUILDER</span>
              <nav className="hidden items-center gap-1 md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={[
                      "nav-chip surface-soft rounded-full px-3 py-1.5 text-[11px] transition-colors duration-300",
                      activeSection === item.id ? "bg-[#171717] text-white" : "bg-[#ececec] text-[#444] hover:bg-[#dfdfdf]"
                    ].join(" ")}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="flex items-center gap-2">
                <a href="#contact" className="hidden text-[10px] text-[#5d5d5d] md:block">
                  systems.raghu@gmail.com
                </a>
                <button
                  type="button"
                  className="action-btn nav-chip surface-soft rounded-full bg-[#171717] px-3 py-2 text-[11px] text-white transition-colors hover:bg-black md:hidden"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-nav"
                >
                  <span>Menu</span>
                </button>
              </div>
            </div>

            <div
              id="mobile-nav"
              aria-hidden={!menuOpen}
              className={[
                "overflow-hidden transition-all duration-300 ease-out md:hidden",
                menuOpen
                  ? "mt-3 max-h-80 translate-y-0 border-t border-[#e3e3e3] pt-3 opacity-100"
                  : "max-h-0 -translate-y-1 border-t border-transparent pt-0 opacity-0"
              ].join(" ")}
            >
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="nav-chip rounded-full bg-[#ececec] px-3 py-2.5 text-center text-[12px] text-[#222]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </header>

        <main className="mt-4 space-y-5 sm:space-y-6 md:mt-5 md:space-y-8">
          <section
            id="hero"
            className="hero-god surface-card relative overflow-hidden rounded-[24px] bg-[#f5f5f5] px-4 py-8 sm:rounded-[28px] sm:py-9 md:rounded-[34px] md:px-12 md:py-14"
            style={textureStyle}
            onMouseMove={handleHeroMove}
            onMouseLeave={resetHeroMove}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center_bottom,rgba(0,0,0,0.05),transparent_56%)]" />
            <div className="relative mx-auto max-w-[640px] text-center">
              <div className="reveal mx-auto mb-4 w-fit rounded-full bg-[#e5e5e5] px-3 py-1 text-[10px] text-[#595959]">
                raghu.systems
              </div>
              <h1 className="font-basis reveal text-[31px] font-normal leading-[1.02] tracking-[-0.03em] text-[#1f1f1f] sm:text-[34px] md:text-[58px]">
                Your competitors aren&apos;t working harder.
              </h1>
              <h2 className="font-sprig reveal stagger-1 mt-1 text-[32px] italic leading-[1.02] tracking-[-0.02em] text-[#1f1f1f] sm:text-[35px] md:text-[60px]">
                They just stopped doing it manually.
              </h2>
              <p className="reveal stagger-2 mx-auto mt-6 max-w-[580px] text-[14px] leading-relaxed text-[#666] sm:text-[15px] md:mt-7 md:text-[17px]">
                I build AI systems that replace the work eating your week — content, leads, outreach, and ops. Done for you. Running in days.
              </p>
              <div className="reveal stagger-3 mt-6 flex flex-col items-center justify-center gap-2 sm:mt-7 sm:flex-row">
                <Pill href="#contact" dark>
                  Start a Project
                </Pill>
                <Pill href="#work">See My Work</Pill>
              </div>
            </div>
          </section>

          <section className="reveal surface-card relative overflow-hidden rounded-[24px] bg-[#f8f8f8] px-4 py-5 sm:rounded-[28px] sm:px-5 sm:py-6 md:rounded-[34px] md:px-10" style={textureReflectionStyle}>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.72),rgba(255,255,255,0.5),rgba(255,255,255,0.72))]" />
            <div className="relative z-10 mx-auto max-w-[860px] rounded-[16px] border border-white/70 bg-white/45 px-2.5 py-2.5 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-8px_16px_rgba(0,0,0,0.04)] sm:rounded-[20px] sm:px-3 sm:py-3 md:px-5">
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center sm:gap-x-3 md:gap-x-4">
              {trustLine.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#dcdcdc] bg-white/75 px-2.5 py-1.5 text-[10px] font-semibold tracking-wide text-[#2c2c2c] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:px-3 sm:text-[11px]"
                  >
                    {item}
                  </span>
              ))}
              </div>
            </div>
          </section>

          <section id="services" className="surface-card rounded-[24px] bg-[#f3f3f3] px-4 py-8 sm:rounded-[28px] sm:px-5 sm:py-10 md:rounded-[34px] md:px-10 md:py-14" style={textureStyle}>
            <div className="mx-auto max-w-[680px] text-center reveal">
              <p className="font-['Space_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#6a6a6a]">What We Build</p>
              <h3 className="mt-3 text-[28px] font-medium leading-tight tracking-[-0.02em] text-[#1f1f1f] sm:text-[30px] md:text-[44px]">
                Six systems. One outcome.
              </h3>
            </div>
            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {services.map((card, idx) => (
                <article key={card.title} className={`interactive-card surface-soft reveal stagger-${(idx % 4) + 1} rounded-[24px] border border-[#e5e5e5] bg-[#fafafa] p-5`}>
                  <div className="font-['Space_Mono'] text-[10px] text-[#6a6a6a]">0{idx + 1}</div>
                  <h4 className="mt-2 text-[22px] font-medium text-[#202020]">{card.title}</h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#666]">{card.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="process" className="surface-card rounded-[24px] bg-[#f6f6f6] px-4 py-8 sm:rounded-[28px] sm:px-5 sm:py-10 md:rounded-[34px] md:px-10 md:py-14" style={textureReflectionStyle}>
            <div className="mx-auto max-w-[640px] text-center reveal">
              <p className="font-['Space_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#6a6a6a]">The Process</p>
              <h3 className="mt-3 text-[28px] font-medium leading-tight tracking-[-0.02em] text-[#1f1f1f] sm:text-[30px] md:text-[44px]">From zero to deployed.</h3>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {processSteps.map((step, idx) => (
                <article key={step.num} className={`interactive-card surface-soft reveal stagger-${(idx % 4) + 1} rounded-[24px] border border-[#e5e5e5] bg-[#fbfbfb] p-5`}>
                  <div className="font-['Space_Mono'] text-[10px] text-[#6a6a6a]">{step.num}</div>
                  <h4 className="mt-2 text-[21px] font-medium text-[#212121]">{step.title}</h4>
                  <p className="mt-2 text-[14px] text-[#666]">{step.desc}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="work" className="surface-card rounded-[24px] bg-[#f5f5f5] px-4 py-8 sm:rounded-[28px] sm:px-5 sm:py-10 md:rounded-[34px] md:px-10 md:py-14" style={textureStyle}>
            <div className="mx-auto max-w-[680px] text-center reveal">
              <p className="font-['Space_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#6a6a6a]">Proof Of Work</p>
              <h3 className="mt-3 text-[28px] font-medium leading-tight tracking-[-0.02em] text-[#1f1f1f] sm:text-[30px] md:text-[44px]">Every video is a live case study.</h3>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {proofCards.map((item, idx) => (
                <article key={item.title} className={`interactive-card surface-soft reveal stagger-${(idx % 4) + 1} rounded-[24px] border border-[#e7e7e7] bg-[#fbfbfb] p-5 transition-colors duration-300 hover:bg-white`}>
                  <div className="mb-4 h-[130px] rounded-[18px] bg-[#e4e4e4]" />
                  <div className="font-['Space_Mono'] text-[10px] uppercase tracking-[0.12em] text-[#6a6a6a]">{item.status}</div>
                  <h4 className="mt-2 text-[20px] font-medium text-[#212121]">{item.title}</h4>
                  <p className="mt-2 text-[13px] text-[#656565]">{item.desc}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="action-btn surface-soft mt-4 inline-flex rounded-full bg-[#171717] px-4 py-2 text-[11px] font-medium text-white transition-colors duration-300 hover:bg-black"
                    >
                      <span>{item.cta}</span>
                    </a>
                  ) : (
                    <span className="mt-4 inline-flex rounded-full border border-[#d8d8d8] bg-white/70 px-4 py-2 text-[11px] font-medium text-[#505050]">
                      Coming Soon
                    </span>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section id="about" className="surface-card rounded-[24px] bg-[#f6f6f6] px-4 py-8 sm:rounded-[28px] sm:px-5 sm:py-10 md:rounded-[34px] md:px-10 md:py-14" style={textureReflectionStyle}>
            <div className="mx-auto max-w-[720px] text-center reveal">
              <p className="font-['Space_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#6a6a6a]">The Builder</p>
              <h3 className="mt-3 text-[31px] font-medium leading-tight tracking-[-0.02em] text-[#1f1f1f] sm:text-[34px] md:text-[52px]">I am Raghu.</h3>
              <p className="mt-4 text-[16px] leading-relaxed text-[#666]">
                I build AI systems for businesses. Not theory. Not slides. Actual working systems deployed, tested, and handed off.
              </p>
            </div>
          </section>

          <section id="contact" className="surface-card rounded-[24px] bg-[#f5f5f5] px-4 py-9 sm:rounded-[28px] sm:px-5 sm:py-11 md:rounded-[34px] md:px-12 md:py-12" style={textureStyle}>
            <div className="mx-auto max-w-[560px] text-center reveal">
              <h3 className="text-[31px] font-medium leading-[1.05] tracking-[-0.02em] text-[#1f1f1f] sm:text-[35px] md:text-[50px]">
                Tell me about your next project
              </h3>
              <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
                <Pill href="mailto:systems.raghu@gmail.com" dark>
                  Email Me
                </Pill>
                <Pill href="https://youtube.com/@raghusystems">YouTube</Pill>
              </div>
            </div>

            <form onSubmit={submitForm} className="mx-auto mt-8 grid max-w-[640px] gap-3 reveal stagger-2">
              <input
                type="text"
                name="name"
                required
                placeholder="Name"
                className="w-full rounded-[14px] border border-[#dfdfdf] bg-white px-4 py-3.5 text-[14px] outline-none transition-colors focus:border-[#bcbcbc]"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="w-full rounded-[14px] border border-[#dfdfdf] bg-white px-4 py-3.5 text-[14px] outline-none transition-colors focus:border-[#bcbcbc]"
              />
              <textarea
                name="message"
                required
                placeholder="What do you need built?"
                rows={4}
                className="w-full rounded-[14px] border border-[#dfdfdf] bg-white px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#bcbcbc]"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="action-btn surface-soft w-full rounded-full bg-[#171717] px-5 py-3 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-black sm:w-auto"
              >
                <span>{isSubmitting ? "Sending..." : "Send Inquiry"}</span>
              </button>
              {sent && <p className="text-center text-[12px] text-[#4f4f4f]">Message sent. I usually reply within 4 hours.</p>}
              {submitError && <p className="text-center text-[12px] text-[#8b2f2f]">{submitError}</p>}
            </form>
          </section>
        </main>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 px-2 pb-2 text-[10px] text-[#6b6b6b]">
          <span>&copy; 2026 raghu.systems</span>
          <div className="flex items-center gap-3">
            <a href="#hero" className="transition-colors hover:text-[#222]">Home</a>
            <a href="#services" className="transition-colors hover:text-[#222]">Services</a>
            <a href="#work" className="transition-colors hover:text-[#222]">Work</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

