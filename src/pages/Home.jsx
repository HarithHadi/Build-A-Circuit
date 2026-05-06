import { Link } from "react-router-dom";


// TO BE CHANGED
const topics = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
      </svg>
    ),
    label: "Voltage & Current",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path d="M4 12h16M4 6h16M4 18h7" strokeLinecap="round" />
      </svg>
    ),
    label: "Series Circuits",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    label: "Parallel Circuits",
    color: "bg-violet-100 text-violet-600",
  },
  {
    id: 4,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    label: "Ohm's Law",
    color: "bg-sky-100 text-sky-600",
  },
];

const features = [
  {
    icon: "⚡",
    title: "Drag & Drop Builder",
    desc: "Place components on a virtual breadboard and wire them up instantly.",
  },
  {
    icon: "🔬",
    title: "Live Simulation",
    desc: "See voltage and current change in real-time as you build.",
  },
  {
    icon: "🏆",
    title: "Challenges & Quizzes",
    desc: "Test your skills with circuit puzzles and knowledge checks.",
  },
];

export default function Home() {
  return (
    <div
        className="min-h-screen"
        style={{
            background: "#c8d8f5",   
            fontFamily: "'Nunito', sans-serif",
        }}
    >
      {/* Decorative dot grid */}
    <div
        className="fixed inset-0 pointer-events-none"
        style={{
            backgroundImage: `
            radial-gradient(circle, #5a7abf 1.5px, transparent 1.5px)
            `,
            backgroundSize: "24px 24px",
            opacity: 0.35,
        }}
    />

      {/* ── HERO ── */}
      <section className="relative pt-10 pb-0 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Badge */}
          <div className="text-center mb-3">
            <span
              className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.55)", color: "#3b5fc0" }}
            >
              ✦ Build-A-Circuit
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-center text-5xl md:text-6xl font-black mb-2 leading-tight"
            style={{ fontFamily: "'DM Serif Display', serif", color: "#1a2a6c" }}
          >
            Learn Electronics
          </h1>
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-5" style={{ color: "#3b5fc0" }}>
            by actually building circuits ⚡
          </h2>
          <p className="text-center text-base max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: "#4a5a8a" }}>
            An interactive simulator for beginners. Drag components, connect wires,
            and watch circuits come to life .
          </p>

          {/* ── MAIN WIREFRAME CARD ── */}
          <div
            className="relative rounded-3xl overflow-hidden mx-auto max-w-4xl"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(16px)",
              border: "1.5px solid rgba(255,255,255,0.75)",
              boxShadow: "0 24px 64px rgba(80,100,200,0.22), 0 2px 0 rgba(255,255,255,0.8) inset",
            }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-2 px-5 py-3 border-b"
              style={{ borderColor: "rgba(150,170,240,0.3)", background: "rgba(255,255,255,0.4)" }}
            >
              <span className="w-3 h-3 rounded-full bg-red-300" />
              <span className="w-3 h-3 rounded-full bg-yellow-300" />
              <span className="w-3 h-3 rounded-full bg-green-300" />

            </div>

            {/* Two-column body matching wireframe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

              {/* LEFT — hero image + CTA */}
              <div className="p-9 flex flex-col justify-between gap-6">
                {/* Image box */}
                <div
                  className="w-full rounded-2xl overflow-hidden flex items-center justify-center"
                  style={{
                    height: "200px",
                    background: "linear-gradient(135deg, #c5d4f8, #b0bef0)",
                    border: "2px dashed #8da6e8",
                  }}
                >
                  <img
                    src="/readme.png"
                    alt="Circuit preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentNode.querySelector(".img-fallback").style.display = "flex";
                    }}
                  />
                  <div className="img-fallback hidden w-full h-full items-center justify-center flex-col gap-2" style={{ color: "#7a9de0" }}>
                    <svg viewBox="0 0 100 80" className="w-20 h-16 opacity-40">
                      <rect x="2" y="2" width="96" height="76" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
                      <line x1="2" y1="2" x2="98" y2="78" stroke="currentColor" strokeWidth="2" />
                      <line x1="98" y1="2" x2="2" y2="78" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <span className="text-xs opacity-60">Preview image</span>
                  </div>
                </div>

                {/* CTA button */}
                <Link to="/lesson">
                  <button
                    className="w-full py-4 rounded-2xl font-black text-white text-base tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(135deg, #4e6ef2, #3b55d9)",
                      boxShadow: "0 6px 24px rgba(78,110,242,0.45)",
                    }}
                  >
                    Start Learning →
                  </button>
                </Link>
              </div>

              {/* RIGHT — topics list */}
              <div
                className="p-8 flex flex-col justify-center gap-3 border-l"
                style={{ borderColor: "rgba(150,170,240,0.25)" }}
              >
                <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: "#7a8bbf" }}>
                  Topics
                </p>
                {topics.map((t) => (
                  <Link to="/lesson" key={t.id}>
                    <div
                      className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-150 hover:scale-[1.015]"
                      style={{
                        background: "rgba(255,255,255,0.65)",
                        border: "1.5px solid rgba(180,200,255,0.45)",
                        boxShadow: "0 2px 8px rgba(100,130,240,0.08)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`p-2 rounded-lg ${t.color}`}>{t.icon}</span>
                        <span className="text-sm font-bold" style={{ color: "#2a3a7c" }}>
                          {t.label}
                        </span>
                      </div>
                      <svg viewBox="0 0 20 20" fill="none" stroke="#8da6e8" strokeWidth={2} className="w-4 h-4">
                        <path d="M7 10h6M10 7l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="relative py-16 px-6 mt-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-black tracking-widest uppercase mb-8" style={{ color: "#5a6fa8" }}>
            Why Build-A-Circuit?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(10px)",
                  border: "1.5px solid rgba(255,255,255,0.75)",
                  boxShadow: "0 4px 20px rgba(100,130,220,0.12)",
                }}
              >
                <span className="text-3xl mb-3">{f.icon}</span>
                <h3 className="font-black text-base mb-2" style={{ color: "#1a2a6c" }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#5a6fa8" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-4 px-6 text-center">
        <div
          className="max-w-lg mx-auto py-10 w-full rounded-2xl"
          style={{
            background: "rgba(255, 255, 255, 0.1)", 
            border: "1.5px solid rgba(255,255,255,0.75)",
            backdropFilter: "blur(12px)",
          }}
        >
          <h3
            className="text-3xl font-black mb-3"
            style={{ fontFamily: "'DM Serif Display', serif", color: "#1a2a6c" }}
          >
            Ready to wire up?
          </h3>
          <p className="text-sm mb-6" style={{ color: "#5a6fa8" }}>
            Jump into the circuit builder and start experimenting — no sign-up needed.
          </p>
          <Link to="/builder">
            <button
              className="px-8 py-3.5 rounded-2xl font-black text-white text-sm tracking-wide transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "#4e6ef2",
                boxShadow: "0 8px 30px rgba(78,110,242,0.4)",
              }}
            >
              Open Circuit Builder ⚡
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}