// src/pages/Lesson.jsx
// Place at: src/pages/Lesson.jsx
// Same Google Fonts as Home — already loaded via index.html

import { useState } from "react";
import { Link } from "react-router-dom";

// ── LESSON DATA ────────────────────────────────────────────────
const lessons = [
  {
    id: 1,
    slug: "basic-components",
    title: "Basic Components",
    tag: "Components",
    tagColor: "bg-sky-100 text-sky-700",
    duration: "12 min",
    icon: "🔧",
    summary:
      "Every circuit is built from components. Knowing what each one does and how to wire it correctly is the foundation of practical electronics and IoT.",
    keyPoints: [
      "Resistor — limits current flow. Colour bands tell you its value.",
      "LED — emits light when current flows in the correct direction. Always needs a resistor.",
      "Capacitor — stores and releases charge; used for smoothing power.",
      "Switch / Button — opens or closes a circuit path on demand.",
    ],
    iotLink: "Arduino and ESP32 projects combine these exact components: buttons for input, LEDs for output, capacitors for stable power.",
    visual: "components",
  },
  {
    id: 2,
    slug: "resistance",
    title: "Resistance & Ohm's Law",
    tag: "Core Fundamentals",
    tagColor: "bg-blue-100 text-blue-700",
    duration: "10 min",
    icon: "〰️",
    summary:
      "Resistance opposes the flow of current in a circuit. Ohm's Law ties voltage, current, and resistance together with one simple equation: V = I × R.",
    keyPoints: [
      "Resistance (R) is measured in Ohms (Ω).",
      "Ohm's Law: V = I × R — if you know two values, you can always find the third.",
      "Resistors protect components from receiving too much current.",
      "LEDs always need a resistor in series to avoid burning out.",
    ],
    iotLink: "Pull-up and pull-down resistors are used on every IoT button or sensor pin to ensure a stable HIGH or LOW signal.",
    visual: "resistance",
  },
  {
    id: 3,
    slug: "series-circuits",
    title: "Series Circuits",
    tag: "Circuit Types",
    tagColor: "bg-indigo-100 text-indigo-700",
    duration: "9 min",
    icon: "➡️",
    summary:
      "In a series circuit, all components share the same current path. If one component breaks, the entire circuit stops. Voltage is divided across each component.",
    keyPoints: [
      "Current is the same through every component in series.",
      "Total voltage = sum of voltages across each component.",
      "Total resistance = sum of all individual resistances.",
      "One broken component = circuit fails (like old Christmas lights).",
    ],
    iotLink: "Series wiring is common when connecting multiple sensors to a single power line — total resistance determines how much current flows.",
    visual: "series",
  },
  {
    id: 4,
    slug: "parallel-circuits",
    title: "Parallel Circuits",
    tag: "Circuit Types",
    tagColor: "bg-violet-100 text-violet-700",
    duration: "9 min",
    icon: "⬛",
    summary:
      "In a parallel circuit, components share the same voltage but split the current. Removing one branch doesn't affect others — making it more reliable.",
    keyPoints: [
      "Voltage is the same across every branch in parallel.",
      "Total current = sum of currents through each branch.",
      "Total resistance is less than the smallest branch resistance.",
      "One broken branch = other branches keep working.",
    ],
    iotLink: "IoT devices like multiple LEDs or modules on the same power rail are wired in parallel so each gets the correct voltage.",
    visual: "parallel",
  },
  {
    id: 5,
    slug: "voltage-current",
    title: "Voltage & Current",
    tag: "Core Fundamentals",
    tagColor: "bg-blue-100 text-blue-700",
    duration: "8 min",
    icon: "⚡",
    summary:
      "Voltage is the electrical pressure that pushes charges through a circuit. Current is the actual flow of those charges. Together, they are the two most fundamental quantities in electronics.",
    keyPoints: [
      "Voltage (V) is measured in Volts — think of it as the 'push' behind electrons.",
      "Current (I) is measured in Amperes (A) — it's how many electrons flow per second.",
      "A battery provides voltage; the circuit determines how much current flows.",
      "Higher voltage with the same resistance = more current (Ohm's Law preview).",
    ],
    iotLink: "In IoT, sensors like temperature modules run on 3.3V or 5V. Getting voltage wrong can damage your Arduino or ESP32.",
    visual: "Voltage",
  },
  {
    id: 6,
    slug: "sensors-iot",
    title: "Sensors & IoT Basics",
    tag: "IoT Focus",
    tagColor: "bg-emerald-100 text-emerald-700",
    duration: "14 min",
    icon: "📡",
    summary:
      "Sensors convert real-world conditions into electrical signals your microcontroller can read. Understanding how they're wired is essential for any IoT project.",
    keyPoints: [
      "Sensors output analog (variable voltage) or digital (HIGH/LOW) signals.",
      "Common sensors: temperature (DHT11), light (LDR), motion (PIR), distance (HC-SR04).",
      "Every sensor has a VCC, GND, and signal pin — correct wiring is critical.",
      "Microcontrollers like Arduino read sensor data and trigger actions based on it.",
    ],
    iotLink: "This is the bridge lesson — once you understand sensors and wiring, you can build real IoT systems like smart fans, alarms, and monitors.",
    visual: "sensors",
  },
];

// ── VISUAL COMPONENTS ──────────────────────────────────────────
function LessonVisual({ type }) {
  return (
    <img
      src={`/Diagrams/${type}.png`}
      alt={`${type} diagram`}
      className="w-full h-full object-contain"
      style={{ maxHeight: "160px" }}
    />
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────
export default function Lesson() {
  const [activeId, setActiveId] = useState(1);
  const lesson = lessons.find((l) => l.id === activeId);
  const currentIndex = lessons.findIndex((l) => l.id === activeId);

  return (
    <div className="min-h-screen">

      <div className="relative max-w-5xl mx-auto px-4 py-10">

        {/* Page header */}
        <div className="mb-8">
          <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: "#5a6fa8" }}>
            ✦ Build-A-Circuit
          </p>
          <h1
            className="text-4xl md:text-5xl font-black leading-tight"
            style={{ fontFamily: "'DM Serif Display', serif", color: "#1a2a6c" }}
          >
            Lessons
          </h1>
          <p className="text-sm mt-2" style={{ color: "#4a5a8a" }}>
            Core electronics fundamentals for IoT — learn at your own pace.
          </p>
        </div>

        {/* ── MAIN LAYOUT: sidebar + content ── */}
        <div className="flex flex-col md:flex-row gap-5">

          {/* LEFT — stepper / topic list (matches wireframe) */}
          <div
            className="md:w-64 flex-shrink-0 rounded-2xl p-4"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(14px)",
              border: "1.5px solid rgba(255,255,255,0.75)",
              boxShadow: "0 8px 32px rgba(80,100,200,0.12)",
              alignSelf: "flex-start",
            }}
          >
            <p className="text-xs font-black tracking-widest uppercase mb-4 px-1" style={{ color: "#7a8bbf" }}>
              Topics
            </p>

            <div className="relative flex flex-col gap-1">
              {/* Vertical connector line */}
              <div
                className="absolute left-[22px] top-6 bottom-6 w-px"
                style={{ background: "rgba(78,110,242,0.2)" }}
              />

              {lessons.map((l, idx) => {
                const isActive = l.id === activeId;
                const isDone = l.id < activeId;
                return (
                  <button
                    key={l.id}
                    onClick={() => setActiveId(l.id)}
                    className="relative flex items-center gap-3 px-2 py-2.5 rounded-xl text-left transition-all duration-150 w-full"
                    style={{
                      background: isActive ? "rgba(78,110,242,0.12)" : "transparent",
                      border: isActive ? "1.5px solid rgba(78,110,242,0.3)" : "1.5px solid transparent",
                    }}
                  >
                    {/* Step indicator */}
                    <div
                      className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-black transition-all"
                      style={{
                        background: isActive
                          ? "#4e6ef2"
                          : isDone
                          ? "rgba(34,197,94,0.15)"
                          : "rgba(255,255,255,0.7)",
                        border: isActive
                          ? "2px solid #4e6ef2"
                          : isDone
                          ? "2px solid #22c55e"
                          : "2px solid rgba(150,170,240,0.4)",
                        color: isActive ? "#fff" : isDone ? "#16a34a" : "#7a8bbf",
                        boxShadow: isActive ? "0 4px 12px rgba(78,110,242,0.35)" : "none",
                      }}
                    >
                      {isDone ? "✓" : l.id}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-black truncate leading-tight"
                        style={{ color: isActive ? "#1a2a6c" : "#4a5a8a" }}
                      >
                        {l.icon} {l.title}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#7a8bbf" }}>
                        {l.duration}
                      </p>
                    </div>

                    {/* Chevron */}
                    {isActive && (
                      <svg viewBox="0 0 16 16" fill="none" stroke="#4e6ef2" strokeWidth={2.5} className="w-3.5 h-3.5 flex-shrink-0">
                        <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — lesson content */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Lesson card */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(14px)",
                border: "1.5px solid rgba(255,255,255,0.75)",
                boxShadow: "0 8px 32px rgba(80,100,200,0.14)",
              }}
            >
              {/* Card header */}
              <div
                className="px-7 py-5 border-b flex items-start justify-between gap-4"
                style={{ borderColor: "rgba(150,170,240,0.25)" }}
              >
                <div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${lesson.tagColor}`}>
                    {lesson.tag}
                  </span>
                  <h2
                    className="text-2xl font-black mt-2"
                    style={{ fontFamily: "'DM Serif Display', serif", color: "#1a2a6c" }}
                  >
                    {lesson.icon} {lesson.title}
                  </h2>
                </div>
                <div
                  className="flex-shrink-0 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl"
                  style={{ background: "rgba(78,110,242,0.1)", color: "#4e6ef2" }}
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                    <circle cx="8" cy="8" r="6" />
                    <path d="M8 5v3l2 2" strokeLinecap="round" />
                  </svg>
                  {lesson.duration}
                </div>
              </div>

              {/* Visual diagram */}
              <div
                className="mx-7 mt-6 rounded-2xl flex items-center justify-center p-4"
                style={{
                  background: "rgba(200,216,245,0.45)",
                  border: "1.5px dashed rgba(78,110,242,0.25)",
                  minHeight: "140px",
                }}
              >
                <LessonVisual type={lesson.visual} />
              </div>

              {/* Content */}
              <div className="px-7 py-6">
                {/* Summary */}
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#3a4a7a" }}>
                  {lesson.summary}
                </p>

                {/* Key points */}
                <div className="mb-6">
                  <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: "#7a8bbf" }}>
                    Key Points
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {lesson.keyPoints.map((point, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black"
                          style={{ background: "rgba(78,110,242,0.12)", color: "#4e6ef2" }}
                        >
                          {i + 1}
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "#3a4a7a" }}>
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* IoT connection callout */}
                <div
                  className="rounded-xl px-5 py-4 flex gap-3"
                  style={{
                    background: "rgba(16,185,129,0.08)",
                    border: "1.5px solid rgba(16,185,129,0.25)",
                  }}
                >
                  <span className="text-lg flex-shrink-0">📡</span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: "#059669" }}>
                      IoT Connection
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "#1a4a3a" }}>
                      {lesson.iotLink}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => currentIndex > 0 && setActiveId(lessons[currentIndex - 1].id)}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: currentIndex === 0 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.55)",
                  border: "1.5px solid rgba(255,255,255,0.75)",
                  color: currentIndex === 0 ? "#aab8d8" : "#3b55d9",
                  cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                }}
              >
                ← Previous
              </button>

              {/* Progress dots */}
              <div className="flex items-center gap-2">
                {lessons.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setActiveId(l.id)}
                    className="rounded-full transition-all"
                    style={{
                      width: l.id === activeId ? "20px" : "8px",
                      height: "8px",
                      background: l.id === activeId ? "#4e6ef2" : l.id < activeId ? "#22c55e" : "rgba(78,110,242,0.25)",
                    }}
                  />
                ))}
              </div>

              {currentIndex < lessons.length - 1 ? (
                <button
                  onClick={() => setActiveId(lessons[currentIndex + 1].id)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-black text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #4e6ef2, #3b55d9)",
                    boxShadow: "0 4px 16px rgba(78,110,242,0.4)",
                  }}
                >
                  Next →
                </button>
              ) : (
                <Link to="/builder">
                  <button
                    className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-black text-white transition-all hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      boxShadow: "0 4px 16px rgba(16,185,129,0.4)",
                    }}
                  >
                    Try Builder ⚡
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}