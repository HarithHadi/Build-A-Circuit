// src/pages/Quiz.jsx
// Place at: src/pages/Quiz.jsx

import { useState } from "react";
import { Link } from "react-router-dom";

// ── DEFAULT QUIZ DATA ─────────────────────────────────────────
const defaultTopics = [
  {
    id: 1,
    title: "Voltage & Current",
    icon: "⚡",
    color: "#4e6ef2",
    colorLight: "rgba(78,110,242,0.1)",
    questions: [
      {
        id: 1,
        question: "What unit is voltage measured in?",
        options: ["Amperes", "Ohms", "Volts", "Watts"],
        answer: 2,
      },
      {
        id: 2,
        question: "What does current measure in a circuit?",
        options: ["Electrical pressure", "Flow of electric charge", "Opposition to flow", "Power consumed"],
        answer: 1,
      },
      {
        id: 3,
        question: "A typical Arduino runs on which voltage?",
        options: ["1.5V", "5V", "12V", "220V"],
        answer: 1,
      },
      {
        id: 4,
        question: "Which symbol represents current in equations?",
        options: ["V", "R", "I", "P"],
        answer: 2,
      },
    ],
  },
  {
    id: 2,
    title: "Resistance & Ohm's Law",
    icon: "〰️",
    color: "#f59e0b",
    colorLight: "rgba(245,158,11,0.1)",
    questions: [
      {
        id: 1,
        question: "What is Ohm's Law?",
        options: ["V = I + R", "V = I × R", "V = I ÷ R", "V = I² × R"],
        answer: 1,
      },
      {
        id: 2,
        question: "What unit is resistance measured in?",
        options: ["Volts", "Amperes", "Watts", "Ohms"],
        answer: 3,
      },
      {
        id: 3,
        question: "Why do LEDs need a resistor in series?",
        options: ["To increase voltage", "To limit current and prevent burnout", "To store charge", "To reverse polarity"],
        answer: 1,
      },
    ],
  },
  {
    id: 3,
    title: "Series & Parallel Circuits",
    icon: "🔗",
    color: "#7c3aed",
    colorLight: "rgba(124,58,237,0.1)",
    questions: [
      {
        id: 1,
        question: "In a series circuit, what is the same through all components?",
        options: ["Voltage", "Resistance", "Current", "Power"],
        answer: 2,
      },
      {
        id: 2,
        question: "In a parallel circuit, what is the same across all branches?",
        options: ["Current", "Resistance", "Voltage", "None of the above"],
        answer: 2,
      },
      {
        id: 3,
        question: "If one bulb breaks in a series circuit, what happens?",
        options: ["Others glow brighter", "Nothing changes", "Entire circuit stops", "Only that bulb turns off"],
        answer: 2,
      },
      {
        id: 4,
        question: "How is total resistance calculated in series?",
        options: ["R_total = R1 × R2", "R_total = R1 + R2", "1/R_total = 1/R1 + 1/R2", "R_total = R1 - R2"],
        answer: 1,
      },
    ],
  },
];

// ── SHARED STYLES ─────────────────────────────────────────────

const glassCard = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(14px)",
  border: "1.5px solid rgba(255,255,255,0.75)",
  boxShadow: "0 8px 32px rgba(80,100,200,0.14)",
};

// ── RESULT SCREEN ─────────────────────────────────────────────
function ResultScreen({ score, total, topic, onRetry, onBack }) {
  const pct = Math.round((score / total) * 100);
  const grade = pct >= 80 ? { label: "Excellent!", emoji: "🏆", color: "#22c55e" }
    : pct >= 60 ? { label: "Good job!", emoji: "👍", color: "#4e6ef2" }
    : { label: "Keep practicing!", emoji: "💪", color: "#f59e0b" };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="rounded-3xl p-10 max-w-sm w-full text-center" style={glassCard}>
        <div className="text-6xl mb-4">{grade.emoji}</div>
        <h2 className="text-3xl font-black mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: "#1a2a6c" }}>
          {grade.label}
        </h2>
        <p className="text-sm mb-6" style={{ color: "#5a6fa8" }}>{topic}</p>

        {/* Score ring */}
        <div className="relative w-28 h-28 mx-auto mb-6">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(78,110,242,0.15)" strokeWidth="10" />
            <circle
              cx="50" cy="50" r="40" fill="none"
              stroke={grade.color} strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${pct * 2.513} 251.3`}
              style={{ transition: "stroke-dasharray 1s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black" style={{ color: "#1a2a6c" }}>{pct}%</span>
            <span className="text-xs" style={{ color: "#7a8bbf" }}>{score}/{total}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onRetry}
            className="flex-1 py-3 rounded-xl text-sm font-black transition-all hover:scale-[1.02]"
            style={{ background: "rgba(78,110,242,0.12)", color: "#4e6ef2", border: "1.5px solid rgba(78,110,242,0.25)" }}
          >
            Retry ↺
          </button>
          <button
            onClick={onBack}
            className="flex-1 py-3 rounded-xl text-sm font-black text-white transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #4e6ef2, #3b55d9)", boxShadow: "0 4px 14px rgba(78,110,242,0.4)" }}
          >
            All Topics
          </button>
        </div>
      </div>
    </div>
  );
}

// ── QUIZ RUNNER ───────────────────────────────────────────────
function QuizRunner({ topic, onBack }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = topic.questions[current];
  const isCorrect = selected === q.answer;

  function confirm() {
    if (selected === null) return;
    setConfirmed(true);
    if (selected === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (current + 1 >= topic.questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setConfirmed(false);
    }
  }

  if (finished) {
    return (
      <ResultScreen
        score={score}
        total={topic.questions.length}
        topic={topic.title}
        onRetry={() => { setCurrent(0); setSelected(null); setConfirmed(false); setScore(0); setFinished(false); }}
        onBack={onBack}
      />
    );
  }

  const progress = ((current) / topic.questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold transition-all hover:opacity-70" style={{ color: "#4a5a8a" }}>
          ← Back
        </button>
        <div className="flex items-center gap-2 text-xs font-black px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.55)", color: "#4e6ef2" }}>
          <span style={{ color: topic.color }}>{topic.icon}</span>
          {topic.title}
        </div>
        <span className="text-xs font-bold" style={{ color: "#7a8bbf" }}>{current + 1} / {topic.questions.length}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 rounded-full mb-8 overflow-hidden" style={{ background: "rgba(78,110,242,0.15)" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: topic.color }}
        />
      </div>

      {/* Question card */}
      <div className="rounded-2xl p-7 mb-5" style={glassCard}>
        <p className="text-xs font-black tracking-widest uppercase mb-4" style={{ color: "#7a8bbf" }}>
          Question {current + 1}
        </p>
        <h2 className="text-xl font-black leading-snug mb-8" style={{ fontFamily: "'DM Serif Display', serif", color: "#1a2a6c" }}>
          {q.question}
        </h2>

        <div className="flex flex-col gap-3">
          {q.options.map((opt, i) => {
            let bg = "rgba(255,255,255,0.6)";
            let border = "1.5px solid rgba(180,200,255,0.4)";
            let color = "#2a3a7c";

            if (confirmed) {
              if (i === q.answer) {
                bg = "rgba(34,197,94,0.12)";
                border = "1.5px solid #22c55e";
                color = "#15803d";
              } else if (i === selected && i !== q.answer) {
                bg = "rgba(239,68,68,0.1)";
                border = "1.5px solid #ef4444";
                color = "#b91c1c";
              } else {
                bg = "rgba(255,255,255,0.35)";
                color = "#9aa5c4";
              }
            } else if (selected === i) {
              bg = topic.colorLight;
              border = `1.5px solid ${topic.color}`;
              color = topic.color;
            }

            return (
              <button
                key={i}
                disabled={confirmed}
                onClick={() => setSelected(i)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-150 w-full"
                style={{ background: bg, border, color, cursor: confirmed ? "default" : "pointer" }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black"
                  style={{
                    background: confirmed && i === q.answer ? "#22c55e"
                      : confirmed && i === selected && i !== q.answer ? "#ef4444"
                      : selected === i && !confirmed ? topic.color
                      : "rgba(78,110,242,0.12)",
                    color: (confirmed && (i === q.answer || i === selected)) || (!confirmed && selected === i) ? "#fff" : "#7a8bbf",
                  }}
                >
                  {["A", "B", "C", "D"][i]}
                </span>
                <span className="text-sm font-bold">{opt}</span>
                {confirmed && i === q.answer && (
                  <span className="ml-auto text-green-500 text-base">✓</span>
                )}
                {confirmed && i === selected && i !== q.answer && (
                  <span className="ml-auto text-red-400 text-base">✗</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      {confirmed && (
        <div
          className="rounded-xl px-5 py-3.5 mb-4 flex items-center gap-3"
          style={{
            background: isCorrect ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.08)",
            border: `1.5px solid ${isCorrect ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.25)"}`,
          }}
        >
          <span className="text-xl">{isCorrect ? "🎉" : "💡"}</span>
          <p className="text-sm font-bold" style={{ color: isCorrect ? "#15803d" : "#b91c1c" }}>
            {isCorrect ? "Correct! Great work." : `The correct answer is: ${q.options[q.answer]}`}
          </p>
        </div>
      )}

      {/* Action button */}
      {!confirmed ? (
        <button
          onClick={confirm}
          disabled={selected === null}
          className="w-full py-3.5 rounded-xl text-sm font-black text-white transition-all"
          style={{
            background: selected !== null ? `linear-gradient(135deg, ${topic.color}, #3b55d9)` : "rgba(150,170,220,0.4)",
            boxShadow: selected !== null ? `0 4px 16px ${topic.color}55` : "none",
            cursor: selected !== null ? "pointer" : "not-allowed",
          }}
        >
          Confirm Answer
        </button>
      ) : (
        <button
          onClick={next}
          className="w-full py-3.5 rounded-xl text-sm font-black text-white transition-all hover:scale-[1.01]"
          style={{ background: "linear-gradient(135deg, #4e6ef2, #3b55d9)", boxShadow: "0 4px 16px rgba(78,110,242,0.4)" }}
        >
          {current + 1 >= topic.questions.length ? "See Results →" : "Next Question →"}
        </button>
      )}
    </div>
  );
}

// ── ADMIN FORM ────────────────────────────────────────────────
const COLORS = ["#4e6ef2", "#f59e0b", "#7c3aed", "#10b981", "#ef4444", "#06b6d4"];
const ICONS = ["⚡", "〰️", "🔗", "📡", "🔧", "🧠", "💡", "🔬"];

function AdminForm({ topics, setTopics, onClose }) {
  const [view, setView] = useState("list"); // list | addTopic | editTopic
  const [editingTopic, setEditingTopic] = useState(null);

  // New topic form state
  const [topicTitle, setTopicTitle] = useState("");
  const [topicIcon, setTopicIcon] = useState("⚡");
  const [topicColor, setTopicColor] = useState("#4e6ef2");

  // New question form state
  const [qText, setQText] = useState("");
  const [qOptions, setQOptions] = useState(["", "", "", ""]);
  const [qAnswer, setQAnswer] = useState(0);
  const [editingQuestions, setEditingQuestions] = useState([]);

  function saveTopic() {
    if (!topicTitle.trim()) return;
    const newTopic = {
      id: Date.now(),
      title: topicTitle.trim(),
      icon: topicIcon,
      color: topicColor,
      colorLight: topicColor + "1a",
      questions: [],
    };
    setTopics((prev) => [...prev, newTopic]);
    setTopicTitle(""); setTopicIcon("⚡"); setTopicColor("#4e6ef2");
    setView("list");
  }

  function openEditTopic(topic) {
    setEditingTopic(topic);
    setEditingQuestions([...topic.questions]);
    setQText(""); setQOptions(["", "", "", ""]); setQAnswer(0);
    setView("editTopic");
  }

  function addQuestion() {
    if (!qText.trim() || qOptions.some((o) => !o.trim())) return;
    const newQ = {
      id: Date.now(),
      question: qText.trim(),
      options: qOptions.map((o) => o.trim()),
      answer: qAnswer,
    };
    setEditingQuestions((prev) => [...prev, newQ]);
    setQText(""); setQOptions(["", "", "", ""]); setQAnswer(0);
  }

  function removeQuestion(id) {
    setEditingQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  function saveEditedTopic() {
    setTopics((prev) =>
      prev.map((t) =>
        t.id === editingTopic.id ? { ...t, questions: editingQuestions } : t
      )
    );
    setView("list");
  }

  function deleteTopic(id) {
    setTopics((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(10,20,60,0.5)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl" style={glassCard}>

        {/* Modal header */}
        <div className="flex items-center justify-between px-7 py-5 border-b sticky top-0 z-10 rounded-t-3xl" style={{ borderColor: "rgba(150,170,240,0.25)", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)" }}>
          <div>
            {view !== "list" && (
              <button onClick={() => setView("list")} className="text-xs font-bold mb-1 flex items-center gap-1 hover:opacity-70" style={{ color: "#7a8bbf" }}>
                ← Back
              </button>
            )}
            <h3 className="text-lg font-black" style={{ fontFamily: "'DM Serif Display', serif", color: "#1a2a6c" }}>
              {view === "list" ? "Manage Quiz" : view === "addTopic" ? "Add New Topic" : `Edit: ${editingTopic?.title}`}
            </h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all hover:bg-red-50" style={{ color: "#7a8bbf" }}>✕</button>
        </div>

        <div className="px-7 py-6">

          {/* ── LIST VIEW ── */}
          {view === "list" && (
            <div>
              <button
                onClick={() => setView("addTopic")}
                className="w-full py-3 rounded-xl text-sm font-black text-white mb-5 transition-all hover:scale-[1.01]"
                style={{ background: "linear-gradient(135deg, #4e6ef2, #3b55d9)", boxShadow: "0 4px 14px rgba(78,110,242,0.35)" }}
              >
                + Add New Topic
              </button>

              {topics.length === 0 && (
                <p className="text-center text-sm py-8" style={{ color: "#9aa5c4" }}>No topics yet. Add one above!</p>
              )}

              <div className="flex flex-col gap-3">
                {topics.map((t) => (
                  <div key={t.id} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.6)", border: "1.5px solid rgba(180,200,255,0.4)" }}>
                    <span className="text-2xl">{t.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-sm truncate" style={{ color: "#1a2a6c" }}>{t.title}</p>
                      <p className="text-xs" style={{ color: "#7a8bbf" }}>{t.questions.length} question{t.questions.length !== 1 ? "s" : ""}</p>
                    </div>
                    <button
                      onClick={() => openEditTopic(t)}
                      className="px-3 py-1.5 rounded-lg text-xs font-black transition-all hover:scale-105"
                      style={{ background: t.color + "15", color: t.color, border: `1px solid ${t.color}33` }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTopic(t.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-black transition-all hover:scale-105"
                      style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ADD TOPIC VIEW ── */}
          {view === "addTopic" && (
            <div className="flex flex-col gap-5">
              <div>
                <label className="text-xs font-black tracking-widest uppercase mb-2 block" style={{ color: "#7a8bbf" }}>Topic Title</label>
                <input
                  value={topicTitle}
                  onChange={(e) => setTopicTitle(e.target.value)}
                  placeholder="e.g. Basic Components"
                  className="w-full px-4 py-3 rounded-xl text-sm font-bold outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(150,170,240,0.4)", color: "#1a2a6c" }}
                />
              </div>

              <div>
                <label className="text-xs font-black tracking-widest uppercase mb-2 block" style={{ color: "#7a8bbf" }}>Icon</label>
                <div className="flex gap-2 flex-wrap">
                  {ICONS.map((ic) => (
                    <button
                      key={ic}
                      onClick={() => setTopicIcon(ic)}
                      className="w-10 h-10 rounded-xl text-xl transition-all hover:scale-110"
                      style={{
                        background: topicIcon === ic ? "rgba(78,110,242,0.15)" : "rgba(255,255,255,0.6)",
                        border: topicIcon === ic ? "2px solid #4e6ef2" : "1.5px solid rgba(180,200,255,0.4)",
                      }}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-black tracking-widest uppercase mb-2 block" style={{ color: "#7a8bbf" }}>Color</label>
                <div className="flex gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setTopicColor(c)}
                      className="w-8 h-8 rounded-full transition-all hover:scale-110"
                      style={{
                        background: c,
                        border: topicColor === c ? "3px solid white" : "3px solid transparent",
                        boxShadow: topicColor === c ? `0 0 0 2px ${c}` : "none",
                      }}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={saveTopic}
                disabled={!topicTitle.trim()}
                className="w-full py-3 rounded-xl text-sm font-black text-white transition-all"
                style={{
                  background: topicTitle.trim() ? "linear-gradient(135deg, #4e6ef2, #3b55d9)" : "rgba(150,170,220,0.4)",
                  boxShadow: topicTitle.trim() ? "0 4px 14px rgba(78,110,242,0.35)" : "none",
                  cursor: topicTitle.trim() ? "pointer" : "not-allowed",
                }}
              >
                Create Topic →
              </button>
            </div>
          )}

          {/* ── EDIT TOPIC VIEW (add questions) ── */}
          {view === "editTopic" && (
            <div className="flex flex-col gap-6">

              {/* Add question form */}
              <div className="p-5 rounded-2xl flex flex-col gap-4" style={{ background: "rgba(78,110,242,0.05)", border: "1.5px dashed rgba(78,110,242,0.25)" }}>
                <p className="text-xs font-black tracking-widest uppercase" style={{ color: "#7a8bbf" }}>Add Question</p>

                <div>
                  <label className="text-xs font-bold mb-1 block" style={{ color: "#5a6fa8" }}>Question</label>
                  <textarea
                    value={qText}
                    onChange={(e) => setQText(e.target.value)}
                    placeholder="Type your question here..."
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl text-sm font-bold outline-none resize-none transition-all"
                    style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(150,170,240,0.4)", color: "#1a2a6c" }}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold mb-2 block" style={{ color: "#5a6fa8" }}>Answer Options <span style={{ color: "#9aa5c4" }}>(click radio = correct answer)</span></label>
                  <div className="flex flex-col gap-2">
                    {qOptions.map((opt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <button
                          onClick={() => setQAnswer(i)}
                          className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-all"
                          style={{
                            background: qAnswer === i ? editingTopic?.color || "#4e6ef2" : "rgba(255,255,255,0.7)",
                            border: `2px solid ${qAnswer === i ? editingTopic?.color || "#4e6ef2" : "rgba(150,170,240,0.5)"}`,
                          }}
                        >
                          {qAnswer === i && <span className="w-2 h-2 rounded-full bg-white block" />}
                        </button>
                        <input
                          value={opt}
                          onChange={(e) => {
                            const updated = [...qOptions];
                            updated[i] = e.target.value;
                            setQOptions(updated);
                          }}
                          placeholder={`Option ${["A", "B", "C", "D"][i]}`}
                          className="flex-1 px-3 py-2 rounded-lg text-sm font-bold outline-none"
                          style={{
                            background: qAnswer === i ? (editingTopic?.color || "#4e6ef2") + "12" : "rgba(255,255,255,0.7)",
                            border: `1.5px solid ${qAnswer === i ? (editingTopic?.color || "#4e6ef2") + "44" : "rgba(150,170,240,0.35)"}`,
                            color: "#1a2a6c",
                          }}
                        />
                        <span className="text-xs font-black w-5" style={{ color: "#9aa5c4" }}>{["A", "B", "C", "D"][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={addQuestion}
                  disabled={!qText.trim() || qOptions.some((o) => !o.trim())}
                  className="w-full py-2.5 rounded-xl text-sm font-black transition-all"
                  style={{
                    background: (!qText.trim() || qOptions.some((o) => !o.trim())) ? "rgba(150,170,220,0.3)" : (editingTopic?.color || "#4e6ef2") + "20",
                    color: (!qText.trim() || qOptions.some((o) => !o.trim())) ? "#9aa5c4" : editingTopic?.color || "#4e6ef2",
                    border: `1.5px solid ${(!qText.trim() || qOptions.some((o) => !o.trim())) ? "transparent" : (editingTopic?.color || "#4e6ef2") + "33"}`,
                    cursor: (!qText.trim() || qOptions.some((o) => !o.trim())) ? "not-allowed" : "pointer",
                  }}
                >
                  + Add Question
                </button>
              </div>

              {/* Existing questions */}
              {editingQuestions.length > 0 && (
                <div>
                  <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: "#7a8bbf" }}>
                    Questions ({editingQuestions.length})
                  </p>
                  <div className="flex flex-col gap-2">
                    {editingQuestions.map((q, i) => (
                      <div key={q.id} className="p-4 rounded-xl flex items-start gap-3" style={{ background: "rgba(255,255,255,0.6)", border: "1.5px solid rgba(180,200,255,0.35)" }}>
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5" style={{ background: "rgba(78,110,242,0.12)", color: "#4e6ef2" }}>
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate" style={{ color: "#1a2a6c" }}>{q.question}</p>
                          <p className="text-xs mt-0.5" style={{ color: "#22c55e" }}>✓ {q.options[q.answer]}</p>
                        </div>
                        <button onClick={() => removeQuestion(q.id)} className="text-xs font-black px-2 py-1 rounded-lg hover:bg-red-50 transition-all" style={{ color: "#ef4444" }}>✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={saveEditedTopic}
                className="w-full py-3 rounded-xl text-sm font-black text-white transition-all hover:scale-[1.01]"
                style={{ background: "linear-gradient(135deg, #4e6ef2, #3b55d9)", boxShadow: "0 4px 14px rgba(78,110,242,0.35)" }}
              >
                Save Topic ✓
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN QUIZ PAGE ────────────────────────────────────────────
export default function Quiz() {
  const [topics, setTopics] = useState(defaultTopics);
  const [activeTopic, setActiveTopic] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  if (activeTopic) {
    const topic = topics.find((t) => t.id === activeTopic);
    return (
        <div className="min-h-screen">
            <div className="relative pt-6">
                <QuizRunner topic={topic} onBack={() => setActiveTopic(null)} />
            </div>
        </div>
    );
  }

  return (
   <div className="min-h-screen">
      {showAdmin && <AdminForm topics={topics} setTopics={setTopics} onClose={() => setShowAdmin(false)} />}

      <div className="relative max-w-5xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: "#5a6fa8" }}>✦ Build-A-Circuit</p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight" style={{ fontFamily: "'DM Serif Display', serif", color: "#1a2a6c" }}>
              Quiz
            </h1>
            <p className="text-sm mt-2" style={{ color: "#4a5a8a" }}>
              Test your electronics knowledge — pick a topic to begin.
            </p>
          </div>
          <button
            onClick={() => setShowAdmin(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black transition-all hover:scale-[1.02]"
            style={{ background: "rgba(255,255,255,0.55)", border: "1.5px solid rgba(255,255,255,0.75)", color: "#4e6ef2", boxShadow: "0 4px 16px rgba(80,100,200,0.1)" }}
          >
            ⚙️ Manage Quiz
          </button>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Topics", value: topics.length, icon: "📚" },
            { label: "Questions", value: topics.reduce((a, t) => a + t.questions.length, 0), icon: "❓" },
            { label: "Difficulty", value: "Beginner", icon: "🎯" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl px-5 py-4 flex items-center gap-3" style={glassCard}>
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className="text-lg font-black" style={{ color: "#1a2a6c" }}>{s.value}</p>
                <p className="text-xs" style={{ color: "#7a8bbf" }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Topic grid */}
        {topics.length === 0 ? (
          <div className="text-center py-20 rounded-2xl" style={glassCard}>
            <p className="text-4xl mb-3">📭</p>
            <p className="font-black text-lg mb-1" style={{ color: "#1a2a6c" }}>No topics yet</p>
            <p className="text-sm mb-5" style={{ color: "#7a8bbf" }}>Click "Manage Quiz" to add your first topic and questions.</p>
            <button
              onClick={() => setShowAdmin(true)}
              className="px-6 py-3 rounded-xl text-sm font-black text-white"
              style={{ background: "linear-gradient(135deg, #4e6ef2, #3b55d9)" }}
            >
              + Add Topic
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topics.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer"
                style={{ ...glassCard, boxShadow: "0 8px 32px rgba(80,100,200,0.14)" }}
                onClick={() => t.questions.length > 0 && setActiveTopic(t.id)}
              >
                {/* Color bar */}
                <div className="h-1.5 w-full" style={{ background: t.color }} />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: t.color + "18", border: `1.5px solid ${t.color}30` }}
                    >
                      {t.icon}
                    </div>
                    <span
                      className="text-xs font-black px-2.5 py-1 rounded-full"
                      style={{ background: t.color + "15", color: t.color }}
                    >
                      {t.questions.length} Q{t.questions.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <h3 className="text-base font-black mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: "#1a2a6c" }}>
                    {t.title}
                  </h3>
                  <p className="text-xs mb-5" style={{ color: "#7a8bbf" }}>
                    {t.questions.length > 0 ? `${t.questions.length} question${t.questions.length !== 1 ? "s" : ""} · Multiple choice` : "No questions yet — click Manage Quiz to add some."}
                  </p>

                  <button
                    disabled={t.questions.length === 0}
                    className="w-full py-2.5 rounded-xl text-sm font-black transition-all"
                    style={{
                      background: t.questions.length > 0 ? t.color + "15" : "rgba(200,210,230,0.3)",
                      color: t.questions.length > 0 ? t.color : "#aab8d8",
                      border: `1.5px solid ${t.questions.length > 0 ? t.color + "30" : "transparent"}`,
                      cursor: t.questions.length > 0 ? "pointer" : "not-allowed",
                    }}
                  >
                    {t.questions.length > 0 ? "Start Quiz →" : "No questions yet"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}