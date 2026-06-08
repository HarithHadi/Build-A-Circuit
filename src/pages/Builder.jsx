import { useEffect, useMemo, useState } from "react";
import CircuitIcon from "../Components/CircuitIcon";

const glassCard = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(14px)",
  border: "1.5px solid rgba(255,255,255,0.75)",
  boxShadow: "0 8px 32px rgba(80,100,200,0.14)",
};

const components = [
  {
    id: "battery",
    name: "Battery",
    icon: "battery",
    description: "Provides power to the circuit.",
    color: "#4e6ef2",
  },
  {
    id: "resistor",
    name: "Resistor",
    icon: "resistor",
    description: "Limits current flow.",
    color: "#f59e0b",
  },
  {
    id: "led",
    name: "LED",
    icon: "led",
    description: "Lights up when current flows.",
    color: "#22c55e",
  },
  {
    id: "switch",
    name: "Switch",
    icon: "switch",
    description: "Opens or closes the circuit.",
    color: "#64748b",
  },
  {
    id: "meter",
    name: "Current Meter",
    icon: "meter",
    description: "Shows current flow.",
    color: "#0ea5e9",
  },
  {
    id: "ldr",
    name: "LDR Sensor",
    icon: "ldr",
    description: "Detects light and dark.",
    color: "#10b981",
  },
  {
    id: "transistor",
    name: "Transistor",
    icon: "transistor",
    description: "Acts as an electronic switch.",
    color: "#8b5cf6",
  },
];

const templates = [
  {
    id: "simple-led",
    title: "Simple LED Circuit",
    difficulty: "Easy",
    shape: "Closed Loop",
    purpose: "Lights up an LED safely using a resistor.",
    application: "Indicator lights, beginner circuits, basic output devices.",
    successText: "Great! The LED circuit is complete and the LED is on.",
    wirePaths: ["M18 50 L18 22 L50 22 L82 22 L82 50 L82 78 L50 78 L18 78 Z"],
    slots: [
      { label: "Power Source", accept: "battery", hint: "Start with the battery.", x: 18, y: 50 },
      { label: "Current Limiter", accept: "resistor", hint: "Use a resistor to protect the LED.", x: 50, y: 22 },
      { label: "Output Device", accept: "led", hint: "Place the LED as the output component.", x: 82, y: 50 },
      { label: "Control Point", accept: "switch", hint: "Use a switch to turn the circuit on or off.", x: 50, y: 78 },
    ],
  },
  {
    id: "ohms-law",
    title: "Ohm’s Law Circuit",
    difficulty: "Easy",
    shape: "Current Path",
    purpose: "Shows how resistance affects current flow.",
    application: "Understanding voltage, resistance, current, and LED brightness.",
    successText: "Correct! Change the resistor value to see how current changes.",
    wirePaths: ["M15 50 L30 50 L30 25 L55 25 L78 25 L78 50 L78 75 L55 75 L30 75 L30 50"],
    slots: [
      { label: "Voltage Source", accept: "battery", hint: "The battery provides voltage.", x: 15, y: 50 },
      { label: "Resistance Area", accept: "resistor", hint: "Resistance controls current flow.", x: 45, y: 25 },
      { label: "Reading Point", accept: "meter", hint: "The meter shows the current.", x: 70, y: 25 },
      { label: "Output Device", accept: "led", hint: "The LED brightness changes with current.", x: 78, y: 50 },
      { label: "Circuit Control", accept: "switch", hint: "The switch completes the path.", x: 45, y: 75 },
    ],
  },
  {
    id: "series-circuit",
    title: "Series Circuit",
    difficulty: "Medium",
    shape: "Single Path",
    purpose: "Shows that current flows through every component in one path.",
    application: "Basic wiring, sequential components, simple lighting circuits.",
    successText: "Correct! The series circuit is complete. Every component shares one current path.",
    wirePaths: ["M14 54 L28 28 L48 28 L68 28 L86 54 L68 78 L44 78 L24 78 Z"],
    slots: [
      { label: "Starting Point", accept: "battery", hint: "Start with the battery.", x: 14, y: 54 },
      { label: "First Load", accept: "resistor", hint: "Add the first resistor.", x: 32, y: 28 },
      { label: "Output Point", accept: "led", hint: "Place the LED in the same path.", x: 58, y: 28 },
      { label: "Second Load", accept: "resistor", hint: "Add another resistor in series.", x: 70, y: 78 },
      { label: "Closing Point", accept: "switch", hint: "The switch completes the circuit.", x: 34, y: 78 },
    ],
  },
  {
    id: "parallel-circuit",
    title: "Parallel Circuit",
    difficulty: "Medium",
    shape: "Two Branches",
    purpose: "Shows that components can share the same voltage on separate branches.",
    application: "Home lighting, multiple LEDs, reliable branch circuits.",
    successText: "Correct! The parallel circuit is complete. Both LED branches can work.",
    wirePaths: [
      "M15 50 L28 50 L38 28 L78 28 L88 50",
      "M28 50 L38 72 L78 72 L88 50",
      "M88 50 L88 82 L15 82 L15 50",
    ],
    slots: [
      { label: "Power Source", accept: "battery", hint: "The battery supplies both branches.", x: 15, y: 50 },
      { label: "Top Branch Limiter", accept: "resistor", hint: "Each LED branch needs a resistor.", x: 43, y: 28 },
      { label: "Top Branch Output", accept: "led", hint: "This LED is on the top branch.", x: 70, y: 28 },
      { label: "Bottom Branch Limiter", accept: "resistor", hint: "The lower branch also needs a resistor.", x: 43, y: 72 },
      { label: "Bottom Branch Output", accept: "led", hint: "This LED is on the bottom branch.", x: 70, y: 72 },
    ],
  },
  {
    id: "ldr-sensor",
    title: "LDR Light Sensor Circuit",
    difficulty: "Hard",
    shape: "Sensor Input",
    purpose: "Uses a light sensor to control an LED.",
    application: "Smart lamps, night lights, IoT sensing systems.",
    successText: "Correct! The LDR sensor circuit is complete. Try changing between light and dark mode.",
    wirePaths: [
      "M15 50 L30 50 L42 25 L65 25 L85 50",
      "M30 50 L42 75 L65 75 L85 50",
      "M85 50 L85 80 L15 80 L15 50",
    ],
    slots: [
      { label: "Power Source", accept: "battery", hint: "Start with the battery.", x: 15, y: 50 },
      { label: "Input Sensor", accept: "ldr", hint: "The LDR detects light level.", x: 42, y: 25 },
      { label: "Current Control", accept: "resistor", hint: "The resistor helps control current.", x: 68, y: 25 },
      { label: "Output Device", accept: "led", hint: "The LED responds to the sensor condition.", x: 42, y: 75 },
      { label: "Circuit Control", accept: "switch", hint: "The switch completes the circuit.", x: 68, y: 75 },
    ],
  },
  {
    id: "transistor-switch",
    title: "Bonus: Transistor Switch Circuit",
    difficulty: "Bonus",
    shape: "Electronic Switch",
    purpose: "Acts as an electronic switch.",
    application: "Digital logic circuits, power control, switching systems.",
    successText: "Correct! The transistor switch circuit is complete. Try toggling the switch.",
    wirePaths: [
      "M16 50 L16 24 L40 24 L58 24 L58 50",
      "M58 50 L80 50 L80 25",
      "M58 50 L58 76 L80 76 L80 50",
      "M16 76 L58 76",
      "M16 50 L16 76",
    ],
    slots: [
      { label: "Power Source", accept: "battery", hint: "Start with the battery.", x: 16, y: 50 },
      { label: "Input Control", accept: "switch", hint: "This controls the transistor.", x: 40, y: 24 },
      { label: "Electronic Switch", accept: "transistor", hint: "The transistor works like an electronic switch.", x: 58, y: 50 },
      { label: "Controlled Output", accept: "led", hint: "The LED is controlled by the transistor.", x: 80, y: 25 },
      { label: "Protection Point", accept: "resistor", hint: "Use a resistor to protect the LED.", x: 80, y: 76 },
    ],
  },
];

function findComponent(componentId) {
  return components.find((component) => component.id === componentId);
}

export default function Builder() {
  const [activeTemplateId, setActiveTemplateId] = useState("simple-led");
  const activeTemplate =
    templates.find((template) => template.id === activeTemplateId) || templates[0];

  const [selectedComponent, setSelectedComponent] = useState(null);
  const [placedComponents, setPlacedComponents] = useState([]);
  const [message, setMessage] = useState(
    "Drag a component into a slot, or click a component and then click a slot."
  );
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [activeDropIndex, setActiveDropIndex] = useState(null);

  const [resistorValue, setResistorValue] = useState(1000);
  const [lightMode, setLightMode] = useState("dark");
  const [transistorSwitchOn, setTransistorSwitchOn] = useState(false);

  const currentValue = useMemo(() => {
    const voltage = 5;
    const current = voltage / resistorValue;
    return current.toFixed(3);
  }, [resistorValue]);

  const ledBrightness = useMemo(() => {
    if (!isComplete) return 0.2;
    if (activeTemplateId !== "ohms-law") return 1;

    if (resistorValue <= 330) return 1;
    if (resistorValue <= 1000) return 0.75;
    if (resistorValue <= 2200) return 0.5;
    return 0.3;
  }, [activeTemplateId, isComplete, resistorValue]);

  const ledVisualOn = useMemo(() => {
    if (!isComplete) return false;
    if (activeTemplateId === "ldr-sensor") return lightMode === "dark";
    if (activeTemplateId === "transistor-switch") return transistorSwitchOn;
    return true;
  }, [activeTemplateId, isComplete, lightMode, transistorSwitchOn]);

  const wireColor = isComplete ? "#22c55e" : "rgba(78,110,242,0.42)";

  useEffect(() => {
    setPlacedComponents(Array(activeTemplate.slots.length).fill(null));
    setSelectedComponent(null);
    setMessage("Drag a component into a slot, or click a component and then click a slot.");
    setIsComplete(false);
    setShowHint(false);
    setHasChecked(false);
    setActiveDropIndex(null);
    setLightMode("dark");
    setTransistorSwitchOn(false);
  }, [activeTemplateId, activeTemplate.slots.length]);

  function selectComponent(component) {
    setSelectedComponent(component);
    setMessage(`${component.name} selected. Now click a slot on the board.`);
  }

  function placeComponent(index) {
    if (!selectedComponent) {
      setMessage("Choose a component from the left panel first.");
      return;
    }

    const updated = [...placedComponents];
    updated[index] = selectedComponent;
    setPlacedComponents(updated);
    setMessage(`${selectedComponent.name} placed in ${activeTemplate.slots[index].label}.`);
    setIsComplete(false);
    setHasChecked(false);
  }

  function handleDragStart(event, component) {
    event.dataTransfer.setData("componentId", component.id);
    event.dataTransfer.effectAllowed = "copy";
    setSelectedComponent(component);
  }

  function handleDrop(event, index) {
    event.preventDefault();

    const componentId = event.dataTransfer.getData("componentId");
    const droppedComponent = findComponent(componentId);

    if (!droppedComponent) return;

    const updated = [...placedComponents];
    updated[index] = droppedComponent;
    setPlacedComponents(updated);
    setMessage(`${droppedComponent.name} placed in ${activeTemplate.slots[index].label}.`);
    setIsComplete(false);
    setHasChecked(false);
    setActiveDropIndex(null);
  }

  function removeComponent(index) {
    const updated = [...placedComponents];
    updated[index] = null;
    setPlacedComponents(updated);
    setIsComplete(false);
    setHasChecked(false);
    setMessage("Component removed. Try placing another one.");
  }

  function checkCircuit() {
    setHasChecked(true);

    const hasEmptySlot =
      placedComponents.length !== activeTemplate.slots.length ||
      placedComponents.some((component) => component === null);

    if (hasEmptySlot) {
      setMessage("Some slots are still empty. Complete all slots first.");
      setIsComplete(false);
      return;
    }

    const correct = placedComponents.every(
      (component, index) => component.id === activeTemplate.slots[index].accept
    );

    if (correct) {
      setIsComplete(true);
      setMessage(activeTemplate.successText);

      if (activeTemplateId === "transistor-switch") {
        setTransistorSwitchOn(false);
      }
    } else {
      setIsComplete(false);
      setMessage("Not quite. Some components are in the wrong position. Use hints and try again.");
    }
  }

  function resetCircuit() {
    setPlacedComponents(Array(activeTemplate.slots.length).fill(null));
    setSelectedComponent(null);
    setMessage("Circuit reset. Drag or choose a component to start again.");
    setIsComplete(false);
    setShowHint(false);
    setHasChecked(false);
    setActiveDropIndex(null);
    setLightMode("dark");
    setTransistorSwitchOn(false);
  }

  function getSlotBorder(index, placed) {
    if (activeDropIndex === index) return "2px solid #4e6ef2";
    if (!placed) return "2px dashed rgba(78,110,242,0.35)";
    if (hasChecked && placed.id === activeTemplate.slots[index].accept) {
      return "2px solid rgba(34,197,94,0.75)";
    }
    if (hasChecked && placed.id !== activeTemplate.slots[index].accept) {
      return "2px solid rgba(239,68,68,0.65)";
    }
    return "2px solid rgba(78,110,242,0.45)";
  }

  function getSlotBackground(index, placed) {
    if (activeDropIndex === index) return "rgba(78,110,242,0.12)";
    if (!placed) return "rgba(255,255,255,0.58)";
    if (hasChecked && placed.id === activeTemplate.slots[index].accept) {
      return "rgba(34,197,94,0.1)";
    }
    if (hasChecked && placed.id !== activeTemplate.slots[index].accept) {
      return "rgba(239,68,68,0.08)";
    }
    return "rgba(255,255,255,0.88)";
  }

  function renderCircuitSlot(slot, index) {
    const placed = placedComponents[index];

    return (
      <div
        key={`${activeTemplate.id}-${index}`}
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
              placed?.id === "led" && ledVisualOn
                ? `0 0 ${24 * ledBrightness}px rgba(34,197,94,${0.65 * ledBrightness})`
                : "0 4px 16px rgba(80,100,200,0.08)",
          }}
        >
          <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: "#7a8bbf" }}>
            Point {String.fromCharCode(65 + index)}
          </p>

          <p className="text-[11px] font-black mb-2 leading-tight" style={{ color: "#4a5a8a" }}>
            {slot.label}
          </p>

          {placed ? (
            <>
              <div
                className="w-11 h-11 rounded-xl mx-auto flex items-center justify-center text-2xl mb-2"
                style={{
                  background: `${placed.color}18`,
                  border: `1.5px solid ${placed.color}40`,
                  opacity: placed.id === "led" ? (ledVisualOn ? ledBrightness : 0.45) : 1,
                }}
              >
                <CircuitIcon type={placed.icon} size={32} active={placed.id === "led" && ledVisualOn} />
              </div>
              <p className="text-xs font-black" style={{ color: "#1a2a6c" }}>
                {placed.name}
              </p>
            </>
          ) : (
            <>
              <div className="w-11 h-11 rounded-xl mx-auto flex items-center justify-center text-2xl mb-2 bg-white/60">
                +
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

        {showHint && (
          <div
            className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 rounded-xl px-3 py-2 text-center"
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(245,158,11,0.35)",
              color: "#92400e",
              fontSize: "11px",
              lineHeight: "1.35",
              zIndex: 5,
            }}
          >
            Hint: {slot.hint}
          </div>
        )}
      </div>
    );
  }

  function renderInteractivePanel() {
    if (activeTemplateId === "ohms-law") {
      return (
        <div
          className="mt-5 rounded-2xl px-5 py-4"
          style={{
            background: "rgba(255,255,255,0.62)",
            border: "1.5px solid rgba(180,200,255,0.35)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm font-black" style={{ color: "#1a2a6c" }}>
                Ohm’s Law Control
              </p>
              <p className="text-xs mt-1" style={{ color: "#6b7aa8" }}>
                After checking the circuit, change the resistor value to see how current and LED brightness change.
              </p>
            </div>

            <div
              className="rounded-2xl px-5 py-4 text-center min-w-[150px]"
              style={{
                background: "#111827",
                color: "#22c55e",
                fontFamily: "monospace",
                boxShadow: "inset 0 0 12px rgba(34,197,94,0.25)",
              }}
            >
              <p className="text-xs mb-1" style={{ color: "#93c5fd" }}>
                CURRENT
              </p>
              <p className="text-2xl font-black">{isComplete ? currentValue : "0.000"} A</p>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs font-black uppercase" style={{ color: "#7a8bbf" }}>
              Resistor Value: {resistorValue} Ω
            </label>
            <input
              type="range"
              min="330"
              max="4700"
              step="10"
              value={resistorValue}
              onChange={(event) => setResistorValue(Number(event.target.value))}
              disabled={!isComplete}
              className="w-full mt-2"
            />
          </div>
        </div>
      );
    }

    if (activeTemplateId === "ldr-sensor") {
      return (
        <div
          className="mt-5 rounded-2xl px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{
            background: "rgba(255,255,255,0.62)",
            border: "1.5px solid rgba(180,200,255,0.35)",
          }}
        >
          <div>
            <p className="text-sm font-black" style={{ color: "#1a2a6c" }}>
              LDR Sensor Control
            </p>
            <p className="text-xs mt-1" style={{ color: "#6b7aa8" }}>
              After checking the circuit, switch between light and dark mode to test the sensor response.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="text-sm font-black px-3 py-2 rounded-xl"
              style={{
                background: lightMode === "dark" ? "rgba(34,197,94,0.15)" : "rgba(245,158,11,0.12)",
                color: lightMode === "dark" ? "#15803d" : "#b45309",
                border:
                  lightMode === "dark"
                    ? "1.5px solid rgba(34,197,94,0.35)"
                    : "1.5px solid rgba(245,158,11,0.35)",
              }}
            >
              {lightMode === "dark" ? "Dark: LED ON" : "Light: LED OFF"}
            </span>

            <button
              type="button"
              disabled={!isComplete}
              onClick={() => setLightMode((mode) => (mode === "dark" ? "light" : "dark"))}
              className="px-5 py-3 rounded-xl text-sm font-black transition-all"
              style={{
                background: isComplete
                  ? "linear-gradient(135deg, #10b981, #059669)"
                  : "rgba(203,213,225,0.8)",
                color: "#fff",
                cursor: isComplete ? "pointer" : "not-allowed",
              }}
            >
              Toggle Light
            </button>
          </div>
        </div>
      );
    }

    if (activeTemplateId === "transistor-switch") {
      return (
        <div
          className="mt-5 rounded-2xl px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{
            background: "rgba(255,255,255,0.62)",
            border: "1.5px solid rgba(180,200,255,0.35)",
          }}
        >
          <div>
            <p className="text-sm font-black" style={{ color: "#1a2a6c" }}>
              Transistor Switch Control
            </p>
            <p className="text-xs mt-1" style={{ color: "#6b7aa8" }}>
              After checking the circuit, toggle the switch to control the LED load.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="text-sm font-black px-3 py-2 rounded-xl"
              style={{
                background: transistorSwitchOn ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.12)",
                color: transistorSwitchOn ? "#15803d" : "#b91c1c",
                border: transistorSwitchOn
                  ? "1.5px solid rgba(34,197,94,0.35)"
                  : "1.5px solid rgba(239,68,68,0.35)",
              }}
            >
              {transistorSwitchOn ? "Switch ON" : "Switch OFF"}
            </span>

            <button
              type="button"
              disabled={!isComplete}
              onClick={() => setTransistorSwitchOn((current) => !current)}
              className="px-5 py-3 rounded-xl text-sm font-black transition-all"
              style={{
                background: isComplete
                  ? "linear-gradient(135deg, #8b5cf6, #7c3aed)"
                  : "rgba(203,213,225,0.8)",
                color: "#fff",
                cursor: isComplete ? "pointer" : "not-allowed",
              }}
            >
              Toggle Switch
            </button>
          </div>
        </div>
      );
    }

    return null;
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
            Circuit Builder
          </h1>
          <p className="text-sm mt-2" style={{ color: "#4a5a8a" }}>
            Practice different circuit types. Drag components into the correct slots, check your work,
            and explore how each circuit behaves.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(760px,1fr)_250px] gap-5">
          <aside className="rounded-2xl p-4" style={glassCard}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-black tracking-widest uppercase" style={{ color: "#7a8bbf" }}>
                Components
              </p>
              <span
                className="text-[10px] font-black px-2 py-1 rounded-full"
                style={{ background: "rgba(78,110,242,0.1)", color: "#4e6ef2" }}
              >
                Drag / Click
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {components.map((component) => {
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
                    style={{ background: "rgba(78,110,242,0.12)", color: "#4e6ef2" }}
                  >
                    {activeTemplate.difficulty}
                  </span>
                  <span
                    className="text-xs font-black px-3 py-1 rounded-full"
                    style={{ background: "rgba(16,185,129,0.10)", color: "#059669" }}
                  >
                    {activeTemplate.shape}
                  </span>
                </div>

                <h2
                  className="text-2xl font-black mt-2"
                  style={{ fontFamily: "'DM Serif Display', serif", color: "#1a2a6c" }}
                >
                  {activeTemplate.title}
                </h2>

                <p className="text-sm mt-1" style={{ color: "#4a5a8a" }}>
                  <strong>Purpose:</strong> {activeTemplate.purpose}
                </p>
                <p className="text-sm mt-1" style={{ color: "#4a5a8a" }}>
                  <strong>Application:</strong> {activeTemplate.application}
                </p>
              </div>

              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{
                  background: ledVisualOn ? "rgba(34,197,94,0.16)" : "rgba(255,255,255,0.65)",
                  border: ledVisualOn
                    ? "2px solid rgba(34,197,94,0.5)"
                    : "1.5px solid rgba(180,200,255,0.45)",
                  boxShadow: ledVisualOn
                    ? `0 0 ${30 * ledBrightness}px rgba(34,197,94,${0.75 * ledBrightness})`
                    : "none",
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
                  {isComplete ? "✅ Circuit complete" : "🔧 Build mode"}
                </div>

                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <filter id="wireGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {activeTemplate.wirePaths.map((path, index) => (
                    <path
                      key={index}
                      d={path}
                      fill="none"
                      stroke={wireColor}
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter={isComplete ? "url(#wireGlow)" : "none"}
                    />
                  ))}
                </svg>

                {activeTemplate.slots.map((slot, index) => renderCircuitSlot(slot, index))}
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

              {renderInteractivePanel()}

              <div className="flex flex-wrap gap-3 mt-5">
                <button
                  type="button"
                  onClick={checkCircuit}
                  className="px-6 py-3 rounded-xl text-sm font-black text-white transition-all hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(135deg, #4e6ef2, #3b55d9)",
                    boxShadow: "0 4px 16px rgba(78,110,242,0.35)",
                  }}
                >
                  Check Circuit
                </button>

                <button
                  type="button"
                  onClick={resetCircuit}
                  className="px-6 py-3 rounded-xl text-sm font-black transition-all hover:scale-[1.02]"
                  style={{
                    background: "rgba(255,255,255,0.58)",
                    color: "#4e6ef2",
                    border: "1.5px solid rgba(78,110,242,0.25)",
                  }}
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={() => setShowHint((current) => !current)}
                  className="px-6 py-3 rounded-xl text-sm font-black transition-all hover:scale-[1.02]"
                  style={{
                    background: "rgba(245,158,11,0.12)",
                    color: "#b45309",
                    border: "1.5px solid rgba(245,158,11,0.25)",
                  }}
                >
                  {showHint ? "Hide Hints" : "Show Hints"}
                </button>
              </div>
            </div>
          </main>

          <aside className="rounded-2xl p-4" style={glassCard}>
            <p className="text-xs font-black tracking-widest uppercase mb-4" style={{ color: "#7a8bbf" }}>
              Circuit Types
            </p>

            <div className="flex flex-col gap-3 mb-6">
              {templates.map((template) => {
                const isActive = template.id === activeTemplateId;

                return (
                  <button
                    type="button"
                    key={template.id}
                    onClick={() => setActiveTemplateId(template.id)}
                    className="text-left rounded-xl p-3 transition-all hover:scale-[1.02]"
                    style={{
                      background: isActive ? "rgba(78,110,242,0.13)" : "rgba(255,255,255,0.58)",
                      border: isActive
                        ? "2px solid rgba(78,110,242,0.45)"
                        : "1.5px solid rgba(180,200,255,0.4)",
                    }}
                  >
                    <p className="text-sm font-black" style={{ color: "#1a2a6c" }}>
                      {template.title}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#7a8bbf" }}>
                      {template.difficulty} · {template.shape}
                    </p>
                  </button>
                );
              })}
            </div>

            <div
              className="rounded-xl px-4 py-4"
              style={{
                background: "rgba(16,185,129,0.08)",
                border: "1.5px solid rgba(16,185,129,0.25)",
              }}
            >
              <p className="text-xs font-black uppercase mb-2" style={{ color: "#059669" }}>
                Builder Mode
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#1a4a3a" }}>
                Build circuits at your own pace. Drag the components into the correct slots,
                check your work, and use hints if you get stuck.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}