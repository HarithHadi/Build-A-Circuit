import { useEffect, useMemo, useState } from "react";
import CircuitIcon from "../Components/CircuitIcon";

const glassCard = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(14px)",
  border: "1.5px solid rgba(255,255,255,0.75)",
  boxShadow: "0 8px 32px rgba(80,100,200,0.14)",
};

const componentLibrary = [
  {
    id: "battery",
    name: "Battery",
    icon: "battery",
    description: "Power source",
    color: "#4e6ef2",
  },
  {
    id: "resistor",
    name: "Resistor",
    icon: "resistor",
    description: "Limits current",
    color: "#f59e0b",
  },
  {
    id: "led",
    name: "LED",
    icon: "led",
    description: "Light output",
    color: "#22c55e",
  },
  {
    id: "switch",
    name: "Switch",
    icon: "switch",
    description: "Opens or closes path",
    color: "#64748b",
  },
  {
    id: "ldr",
    name: "LDR Sensor",
    icon: "ldr",
    description: "Detects light",
    color: "#10b981",
  },
  {
    id: "meter",
    name: "Current Meter",
    icon: "meter",
    description: "Measures current",
    color: "#0ea5e9",
  },
  {
    id: "transistor",
    name: "Transistor",
    icon: "transistor",
    description: "Electronic switch",
    color: "#8b5cf6",
  },
];

const challenges = [
  {
    id: "easy-led",
    difficulty: "Easy",
    title: "Light Up the LED",
    subtitle: "Build a safe LED circuit.",
    mission:
      "Create a complete closed-loop LED circuit. The LED should only turn on when the required components are in the correct positions.",
    attempts: 3,
    hints: 2,
    reward: 100,
    wirePaths: ["M18 50 L18 22 L50 22 L82 22 L82 50 L82 78 L50 78 L18 78 Z"],
    availableComponents: ["battery", "resistor", "led", "switch", "meter"],
    slots: [
      { label: "Point A", role: "Power Source", accept: "battery", hint: "Start with the component that provides voltage.", x: 18, y: 50 },
      { label: "Point B", role: "Current Limiter", accept: "resistor", hint: "The LED needs protection from too much current.", x: 50, y: 22 },
      { label: "Point C", role: "Output Device", accept: "led", hint: "This is the part that should light up.", x: 82, y: 50 },
      { label: "Point D", role: "Control Point", accept: "switch", hint: "Use this to open or close the circuit path.", x: 50, y: 78 },
    ],
  },
  {
    id: "medium-parallel",
    difficulty: "Medium",
    title: "Build Two LED Branches",
    subtitle: "Complete a parallel circuit.",
    mission:
      "Build a parallel circuit with two LED branches. Each LED branch needs its own current-limiting component.",
    attempts: 3,
    hints: 2,
    reward: 150,
    wirePaths: [
      "M15 50 L28 50 L38 28 L78 28 L88 50",
      "M28 50 L38 72 L78 72 L88 50",
      "M88 50 L88 82 L15 82 L15 50",
    ],
    availableComponents: ["battery", "resistor", "led", "switch", "meter", "ldr"],
    slots: [
      { label: "Point A", role: "Power Source", accept: "battery", hint: "Both branches need one shared power source.", x: 15, y: 50 },
      { label: "Point B", role: "Upper Branch Control", accept: "resistor", hint: "The upper LED branch needs current protection.", x: 43, y: 28 },
      { label: "Point C", role: "Upper Branch Output", accept: "led", hint: "Place a light output on the upper branch.", x: 70, y: 28 },
      { label: "Point D", role: "Lower Branch Control", accept: "resistor", hint: "The lower LED branch also needs current protection.", x: 43, y: 72 },
      { label: "Point E", role: "Lower Branch Output", accept: "led", hint: "Place another light output on the lower branch.", x: 70, y: 72 },
    ],
  },
  {
    id: "hard-sensor",
    difficulty: "Hard",
    title: "Smart Night Light",
    subtitle: "Build an LDR sensor circuit.",
    mission:
      "Create a sensor-based circuit. The LED should respond to the light sensor after the circuit is completed.",
    attempts: 3,
    hints: 1,
    reward: 200,
    wirePaths: [
      "M15 50 L30 50 L42 25 L65 25 L85 50",
      "M30 50 L42 75 L65 75 L85 50",
      "M85 50 L85 80 L15 80 L15 50",
    ],
    availableComponents: ["battery", "ldr", "resistor", "led", "switch", "transistor", "meter"],
    slots: [
      { label: "Point A", role: "Power Source", accept: "battery", hint: "Start with the power source.", x: 15, y: 50 },
      { label: "Point B", role: "Input Sensor", accept: "ldr", hint: "This component detects light or darkness.", x: 42, y: 25 },
      { label: "Point C", role: "Current Control", accept: "resistor", hint: "Use this to control current flow.", x: 68, y: 25 },
      { label: "Point D", role: "Output Device", accept: "led", hint: "This component responds by lighting up.", x: 42, y: 75 },
      { label: "Point E", role: "Circuit Control", accept: "switch", hint: "Use this to complete the circuit path.", x: 68, y: 75 },
    ],
  },
];

function findComponent(id) {
  return componentLibrary.find((component) => component.id === id);
}

function getDifficultyColor(difficulty) {
  if (difficulty === "Easy") return "#22c55e";
  if (difficulty === "Medium") return "#f59e0b";
  if (difficulty === "Hard") return "#ef4444";
  return "#4e6ef2";
}

function calculateStars(remainingAttempts, remainingHints, maxAttempts) {
  if (remainingAttempts === maxAttempts && remainingHints > 0) return 3;
  if (remainingAttempts >= 1) return 2;
  return 1;
}

export default function Challenge() {
  const [activeChallengeId, setActiveChallengeId] = useState("easy-led");
  const activeChallenge =
    challenges.find((challenge) => challenge.id === activeChallengeId) || challenges[0];

  const [completed, setCompleted] = useState({});
  const [placedComponents, setPlacedComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(activeChallenge.attempts);
  const [hintsLeft, setHintsLeft] = useState(activeChallenge.hints);
  const [hintMessage, setHintMessage] = useState("");
  const [message, setMessage] = useState("Drag a component into the circuit, then check your answer.");
  const [isComplete, setIsComplete] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [activeDropIndex, setActiveDropIndex] = useState(null);
  const [lightMode, setLightMode] = useState("dark");

  const availableComponents = useMemo(() => {
    return activeChallenge.availableComponents.map((id) => findComponent(id)).filter(Boolean);
  }, [activeChallenge]);

  const ledOn = useMemo(() => {
    if (!isComplete) return false;
    if (activeChallenge.id === "hard-sensor") return lightMode === "dark";
    return true;
  }, [activeChallenge.id, isComplete, lightMode]);

  const totalScore = useMemo(() => {
    return Object.values(completed).reduce((sum, item) => sum + item.score, 0);
  }, [completed]);

  const currentIndex = challenges.findIndex((challenge) => challenge.id === activeChallengeId);

  useEffect(() => {
    setPlacedComponents(Array(activeChallenge.slots.length).fill(null));
    setSelectedComponent(null);
    setAttemptsLeft(activeChallenge.attempts);
    setHintsLeft(activeChallenge.hints);
    setHintMessage("");
    setMessage("Drag a component into the circuit, then check your answer.");
    setIsComplete(false);
    setHasChecked(false);
    setActiveDropIndex(null);
    setLightMode("dark");
  }, [activeChallengeId, activeChallenge.attempts, activeChallenge.hints, activeChallenge.slots.length]);

  function isUnlocked(index) {
    if (index === 0) return true;
    const previousChallenge = challenges[index - 1];
    return Boolean(completed[previousChallenge.id]);
  }

  function selectChallenge(challengeId, index) {
    if (!isUnlocked(index)) {
      setMessage("Complete the previous challenge first to unlock this level.");
      return;
    }

    setActiveChallengeId(challengeId);
  }

  function selectComponent(component) {
    setSelectedComponent(component);
    setMessage(`${component.name} selected. Now click a slot in the circuit.`);
  }

  function handleDragStart(event, component) {
    event.dataTransfer.setData("componentId", component.id);
    event.dataTransfer.effectAllowed = "copy";
    setSelectedComponent(component);
  }

  function placeComponent(index) {
    if (!selectedComponent) {
      setMessage("Choose or drag a component first.");
      return;
    }

    const updated = [...placedComponents];
    updated[index] = selectedComponent;

    setPlacedComponents(updated);
    setHasChecked(false);
    setIsComplete(false);
    setMessage(`${selectedComponent.name} placed at ${activeChallenge.slots[index].label}.`);
  }

  function handleDrop(event, index) {
    event.preventDefault();

    const componentId = event.dataTransfer.getData("componentId");
    const droppedComponent = findComponent(componentId);

    if (!droppedComponent) return;

    const updated = [...placedComponents];
    updated[index] = droppedComponent;

    setPlacedComponents(updated);
    setHasChecked(false);
    setIsComplete(false);
    setActiveDropIndex(null);
    setMessage(`${droppedComponent.name} placed at ${activeChallenge.slots[index].label}.`);
  }

  function removeComponent(index) {
    const updated = [...placedComponents];
    updated[index] = null;

    setPlacedComponents(updated);
    setIsComplete(false);
    setHasChecked(false);
    setMessage("Component removed. Try again.");
  }

  function checkChallenge() {
    setHasChecked(true);
    setHintMessage("");

    const hasEmptySlot =
      placedComponents.length !== activeChallenge.slots.length ||
      placedComponents.some((component) => component === null);

    if (hasEmptySlot) {
      setMessage("Some circuit points are still empty.");
      return;
    }

    const correct = placedComponents.every(
      (component, index) => component.id === activeChallenge.slots[index].accept
    );

    if (correct) {
      const stars = calculateStars(attemptsLeft, hintsLeft, activeChallenge.attempts);
      const score = activeChallenge.reward + stars * 25;

      setIsComplete(true);
      setMessage(`Challenge completed! You earned ${stars} star${stars > 1 ? "s" : ""}.`);
      setCompleted((previous) => ({
        ...previous,
        [activeChallenge.id]: {
          stars,
          score,
        },
      }));
      return;
    }

    const nextAttempts = attemptsLeft - 1;
    setAttemptsLeft(nextAttempts);

    if (nextAttempts <= 0) {
      setMessage("No attempts left. Reset the challenge and try again.");
    } else {
      setMessage(`Not correct yet. You have ${nextAttempts} attempt${nextAttempts > 1 ? "s" : ""} left.`);
    }
  }

  function useHint() {
    if (hintsLeft <= 0) {
      setHintMessage("No hints left for this challenge.");
      return;
    }

    const firstProblemIndex = activeChallenge.slots.findIndex((slot, index) => {
      const placed = placedComponents[index];
      return !placed || placed.id !== slot.accept;
    });

    if (firstProblemIndex === -1) {
      setHintMessage("Everything looks correct. Try checking the circuit.");
      return;
    }

    setHintsLeft((current) => current - 1);
    setHintMessage(`${activeChallenge.slots[firstProblemIndex].label}: ${activeChallenge.slots[firstProblemIndex].hint}`);
  }

  function resetChallenge() {
    setPlacedComponents(Array(activeChallenge.slots.length).fill(null));
    setSelectedComponent(null);
    setAttemptsLeft(activeChallenge.attempts);
    setHintsLeft(activeChallenge.hints);
    setHintMessage("");
    setMessage("Challenge reset. Try building the circuit again.");
    setIsComplete(false);
    setHasChecked(false);
    setActiveDropIndex(null);
    setLightMode("dark");
  }

  function goNextChallenge() {
    if (currentIndex >= challenges.length - 1) return;
    const nextChallenge = challenges[currentIndex + 1];
    setActiveChallengeId(nextChallenge.id);
  }

  function getSlotBorder(index, placed) {
    if (activeDropIndex === index) return "2px solid #4e6ef2";
    if (!placed) return "2px dashed rgba(78,110,242,0.35)";

    if (hasChecked && placed.id === activeChallenge.slots[index].accept) {
      return "2px solid rgba(34,197,94,0.75)";
    }

    if (hasChecked && placed.id !== activeChallenge.slots[index].accept) {
      return "2px solid rgba(239,68,68,0.65)";
    }

    return "2px solid rgba(78,110,242,0.45)";
  }

  function getSlotBackground(index, placed) {
    if (activeDropIndex === index) return "rgba(78,110,242,0.12)";
    if (!placed) return "rgba(255,255,255,0.58)";

    if (hasChecked && placed.id === activeChallenge.slots[index].accept) {
      return "rgba(34,197,94,0.1)";
    }

    if (hasChecked && placed.id !== activeChallenge.slots[index].accept) {
      return "rgba(239,68,68,0.08)";
    }

    return "rgba(255,255,255,0.88)";
  }

  function renderSlot(slot, index) {
    const placed = placedComponents[index];

    return (
      <div
        key={`${activeChallenge.id}-${index}`}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${slot.x}%`, top: `${slot.y}%`, width: "118px" }}
      >
        <button
          type="button"
          onClick={() => placeComponent(index)}
          onDragOver={(event) => {
            event.preventDefault();
            setActiveDropIndex(index);
          }}
          onDragLeave={() => setActiveDropIndex(null)}
          onDrop={(event) => handleDrop(event, index)}
          className="w-full rounded-2xl p-3 text-center transition-all hover:scale-[1.03]"
          style={{
            minHeight: "110px",
            background: getSlotBackground(index, placed),
            border: getSlotBorder(index, placed),
            boxShadow:
              placed?.id === "led" && ledOn
                ? "0 0 26px rgba(34,197,94,0.75)"
                : "0 4px 16px rgba(80,100,200,0.08)",
          }}
        >
          <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: "#7a8bbf" }}>
            {slot.label}
          </p>

          <p className="text-[11px] font-black mb-2 leading-tight" style={{ color: "#4a5a8a" }}>
            {slot.role}
          </p>

          {placed ? (
            <>
              <div
                className="w-11 h-11 rounded-xl mx-auto flex items-center justify-center text-2xl mb-2"
                style={{
                  background: `${placed.color}18`,
                  border: `1.5px solid ${placed.color}40`,
                  opacity: placed.id === "led" ? (ledOn ? 1 : 0.45) : 1,
                }}
              >
                <CircuitIcon type={placed.icon} size={32} active={placed.id === "led" && ledOn} />
              </div>
              <p className="text-xs font-black" style={{ color: "#1a2a6c" }}>
                {placed.name}
              </p>
            </>
          ) : (
            <>
              <div className="w-11 h-11 rounded-xl mx-auto flex items-center justify-center text-2xl mb-2 bg-white/60">
                ?
              </div>
              <p className="text-xs font-black" style={{ color: "#4a5a8a" }}>
                Drop here
              </p>
            </>
          )}
        </button>

        {placed && (
          <button
            type="button"
            onClick={() => removeComponent(index)}
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full text-xs font-black text-white"
            style={{ background: "#ef4444" }}
          >
            ×
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="relative max-w-[1500px] mx-auto px-4 py-8">
        <div className="mb-8">
          <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: "#5a6fa8" }}>
            ✦ Build-A-Circuit
          </p>
          <h1
            className="text-4xl md:text-5xl font-black leading-tight"
            style={{ fontFamily: "'DM Serif Display', serif", color: "#1a2a6c" }}
          >
            Circuit Challenge
          </h1>
          <p className="text-sm mt-2 max-w-3xl" style={{ color: "#4a5a8a" }}>
            Complete each circuit mission with limited attempts and hints. Start with Easy,
            unlock the next level, and earn stars for accurate circuit building.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(760px,1fr)_260px] gap-5">
          <aside className="rounded-2xl p-4" style={glassCard}>
            <p className="text-xs font-black tracking-widest uppercase mb-4" style={{ color: "#7a8bbf" }}>
              Levels
            </p>

            <div className="flex flex-col gap-3">
              {challenges.map((challenge, index) => {
                const unlocked = isUnlocked(index);
                const active = challenge.id === activeChallengeId;
                const done = completed[challenge.id];
                const difficultyColor = getDifficultyColor(challenge.difficulty);

                return (
                  <button
                    type="button"
                    key={challenge.id}
                    onClick={() => selectChallenge(challenge.id, index)}
                    className="text-left rounded-xl p-3 transition-all hover:scale-[1.02]"
                    style={{
                      background: active ? `${difficultyColor}18` : "rgba(255,255,255,0.58)",
                      border: active
                        ? `2px solid ${difficultyColor}`
                        : "1.5px solid rgba(180,200,255,0.4)",
                      opacity: unlocked ? 1 : 0.55,
                      cursor: unlocked ? "pointer" : "not-allowed",
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-black" style={{ color: difficultyColor }}>
                        {challenge.difficulty}
                      </span>
                      <span className="text-xs">
                        {!unlocked ? "🔒" : done ? "⭐".repeat(done.stars) : "▶"}
                      </span>
                    </div>
                    <p className="text-sm font-black" style={{ color: "#1a2a6c" }}>
                      {challenge.title}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#7a8bbf" }}>
                      {challenge.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>

            <div
              className="rounded-xl px-4 py-4 mt-5"
              style={{
                background: "rgba(78,110,242,0.08)",
                border: "1.5px solid rgba(78,110,242,0.2)",
              }}
            >
              <p className="text-xs font-black uppercase mb-1" style={{ color: "#4e6ef2" }}>
                Total Score
              </p>
              <p className="text-2xl font-black" style={{ color: "#1a2a6c" }}>
                {totalScore}
              </p>
            </div>
          </aside>

          <main className="rounded-2xl overflow-hidden" style={glassCard}>
            <div
              className="px-6 py-5 border-b flex items-start justify-between gap-4"
              style={{ borderColor: "rgba(150,170,240,0.25)" }}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="text-xs font-black px-3 py-1 rounded-full"
                    style={{
                      background: `${getDifficultyColor(activeChallenge.difficulty)}18`,
                      color: getDifficultyColor(activeChallenge.difficulty),
                    }}
                  >
                    {activeChallenge.difficulty}
                  </span>

                  <span
                    className="text-xs font-black px-3 py-1 rounded-full"
                    style={{ background: "rgba(16,185,129,0.10)", color: "#059669" }}
                  >
                    Attempts: {attemptsLeft}
                  </span>

                  <span
                    className="text-xs font-black px-3 py-1 rounded-full"
                    style={{ background: "rgba(245,158,11,0.12)", color: "#b45309" }}
                  >
                    Hints: {hintsLeft}
                  </span>
                </div>

                <h2
                  className="text-2xl font-black mt-2"
                  style={{ fontFamily: "'DM Serif Display', serif", color: "#1a2a6c" }}
                >
                  {activeChallenge.title}
                </h2>

                <p className="text-sm mt-1 max-w-2xl" style={{ color: "#4a5a8a" }}>
                  {activeChallenge.mission}
                </p>
              </div>

              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{
                  background: ledOn ? "rgba(34,197,94,0.16)" : "rgba(255,255,255,0.65)",
                  border: ledOn
                    ? "2px solid rgba(34,197,94,0.5)"
                    : "1.5px solid rgba(180,200,255,0.45)",
                  boxShadow: ledOn ? "0 0 30px rgba(34,197,94,0.75)" : "none",
                }}
              >
                💡
              </div>
            </div>

            <div className="p-6">
              <div
                className="rounded-2xl relative overflow-hidden"
                style={{
                  minHeight: "430px",
                  background: "rgba(200,216,245,0.38)",
                  border: "1.5px dashed rgba(78,110,242,0.25)",
                  backgroundImage:
                    "radial-gradient(circle, rgba(70,80,120,0.25) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                <div
                  className="absolute left-4 top-4 z-10 rounded-full px-4 py-2 text-xs font-black"
                  style={{
                    background: isComplete ? "rgba(34,197,94,0.16)" : "rgba(255,255,255,0.78)",
                    color: isComplete ? "#15803d" : "#4e6ef2",
                    border: isComplete
                      ? "1.5px solid rgba(34,197,94,0.35)"
                      : "1.5px solid rgba(180,200,255,0.4)",
                  }}
                >
                  {isComplete ? "✅ Completed" : "🎯 Challenge mode"}
                </div>

                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <filter id="challengeWireGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {activeChallenge.wirePaths.map((path, index) => (
                    <path
                      key={index}
                      d={path}
                      fill="none"
                      stroke={isComplete ? "#22c55e" : "rgba(78,110,242,0.42)"}
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter={isComplete ? "url(#challengeWireGlow)" : "none"}
                    />
                  ))}
                </svg>

                {activeChallenge.slots.map((slot, index) => renderSlot(slot, index))}
              </div>

              <div
                className="mt-6 rounded-xl px-5 py-4 flex items-center gap-3"
                style={{
                  background: isComplete ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.62)",
                  border: isComplete
                    ? "1.5px solid rgba(34,197,94,0.35)"
                    : "1.5px solid rgba(180,200,255,0.35)",
                }}
              >
                <span className="text-xl">{isComplete ? "✅" : "💡"}</span>
                <p
                  className="text-sm font-bold"
                  style={{ color: isComplete ? "#15803d" : "#3a4a7a" }}
                >
                  {message}
                </p>
              </div>

              {hintMessage && (
                <div
                  className="mt-4 rounded-xl px-5 py-4"
                  style={{
                    background: "rgba(245,158,11,0.1)",
                    border: "1.5px solid rgba(245,158,11,0.25)",
                  }}
                >
                  <p className="text-sm font-bold" style={{ color: "#92400e" }}>
                    Hint: {hintMessage}
                  </p>
                </div>
              )}

              {activeChallenge.id === "hard-sensor" && isComplete && (
                <div
                  className="mt-5 rounded-2xl px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  style={{
                    background: "rgba(255,255,255,0.62)",
                    border: "1.5px solid rgba(180,200,255,0.35)",
                  }}
                >
                  <div>
                    <p className="text-sm font-black" style={{ color: "#1a2a6c" }}>
                      Sensor Test
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#6b7aa8" }}>
                      Toggle the environment to test whether the night light responds.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLightMode((mode) => (mode === "dark" ? "light" : "dark"))}
                    className="px-5 py-3 rounded-xl text-sm font-black text-white transition-all hover:scale-[1.02]"
                    style={{
                      background: lightMode === "dark"
                        ? "linear-gradient(135deg, #10b981, #059669)"
                        : "linear-gradient(135deg, #f59e0b, #d97706)",
                    }}
                  >
                    {lightMode === "dark" ? "Dark Mode: LED ON" : "Light Mode: LED OFF"}
                  </button>
                </div>
              )}

              <div className="flex flex-wrap gap-3 mt-5">
                <button
                  type="button"
                  onClick={checkChallenge}
                  disabled={attemptsLeft <= 0 || isComplete}
                  className="px-6 py-3 rounded-xl text-sm font-black text-white transition-all hover:scale-[1.02]"
                  style={{
                    background:
                      attemptsLeft <= 0 || isComplete
                        ? "rgba(148,163,184,0.8)"
                        : "linear-gradient(135deg, #4e6ef2, #3b55d9)",
                    boxShadow:
                      attemptsLeft <= 0 || isComplete
                        ? "none"
                        : "0 4px 16px rgba(78,110,242,0.35)",
                    cursor: attemptsLeft <= 0 || isComplete ? "not-allowed" : "pointer",
                  }}
                >
                  Check Circuit
                </button>

                <button
                  type="button"
                  onClick={useHint}
                  disabled={hintsLeft <= 0 || isComplete}
                  className="px-6 py-3 rounded-xl text-sm font-black transition-all hover:scale-[1.02]"
                  style={{
                    background: "rgba(245,158,11,0.12)",
                    color: "#b45309",
                    border: "1.5px solid rgba(245,158,11,0.25)",
                    cursor: hintsLeft <= 0 || isComplete ? "not-allowed" : "pointer",
                    opacity: hintsLeft <= 0 || isComplete ? 0.6 : 1,
                  }}
                >
                  Use Hint
                </button>

                <button
                  type="button"
                  onClick={resetChallenge}
                  className="px-6 py-3 rounded-xl text-sm font-black transition-all hover:scale-[1.02]"
                  style={{
                    background: "rgba(255,255,255,0.58)",
                    color: "#4e6ef2",
                    border: "1.5px solid rgba(78,110,242,0.25)",
                  }}
                >
                  Reset
                </button>

                {isComplete && currentIndex < challenges.length - 1 && (
                  <button
                    type="button"
                    onClick={goNextChallenge}
                    className="px-6 py-3 rounded-xl text-sm font-black text-white transition-all hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      boxShadow: "0 4px 16px rgba(16,185,129,0.35)",
                    }}
                  >
                    Next Challenge →
                  </button>
                )}
              </div>
            </div>
          </main>

          <aside className="rounded-2xl p-4" style={glassCard}>
            <p className="text-xs font-black tracking-widest uppercase mb-4" style={{ color: "#7a8bbf" }}>
              Components
            </p>

            <div className="flex flex-col gap-3">
              {availableComponents.map((component) => {
                const isSelected = selectedComponent?.id === component.id;

                return (
                  <button
                    type="button"
                    key={component.id}
                    draggable
                    onDragStart={(event) => handleDragStart(event, component)}
                    onClick={() => selectComponent(component)}
                    className="text-left rounded-xl px-3 py-2.5 transition-all hover:scale-[1.02] cursor-grab active:cursor-grabbing"
                    style={{
                      background: isSelected ? `${component.color}18` : "rgba(255,255,255,0.62)",
                      border: isSelected
                        ? `2px solid ${component.color}`
                        : "1.5px solid rgba(180,200,255,0.4)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center">
                    <CircuitIcon type={component.icon} size={32} />
                    </span>
                      <div>
                        <p className="text-sm font-black" style={{ color: "#1a2a6c" }}>
                          {component.name}
                        </p>
                        <p className="text-xs leading-snug" style={{ color: "#6b7aa8" }}>
                          {component.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div
              className="rounded-xl px-4 py-4 mt-5"
              style={{
                background: "rgba(16,185,129,0.08)",
                border: "1.5px solid rgba(16,185,129,0.25)",
              }}
            >
              <p className="text-xs font-black uppercase mb-2" style={{ color: "#059669" }}>
                Challenge Rules
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#1a4a3a" }}>
                Use fewer hints and fewer attempts to earn more stars. Complete each level to unlock the next challenge.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}