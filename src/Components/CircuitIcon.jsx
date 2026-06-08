export default function CircuitIcon({ type, size = 34, active = false }) {
    const stroke = active ? "#22c55e" : "#2f3547";
    const accent = active ? "#86efac" : "#facc15";
  
    const common = {
      width: size,
      height: size,
      viewBox: "0 0 48 48",
      fill: "none",
      stroke,
      strokeWidth: 3,
      strokeLinecap: "round",
      strokeLinejoin: "round",
    };
  
    if (type === "battery") {
      return (
        <svg {...common}>
          <line x1="24" y1="6" x2="24" y2="14" />
          <line x1="24" y1="34" x2="24" y2="42" />
          <line x1="14" y1="16" x2="34" y2="16" />
          <line x1="18" y1="23" x2="30" y2="23" />
          <line x1="14" y1="30" x2="34" y2="30" />
          <text x="31" y="13" fontSize="10" fill={stroke} stroke="none">+</text>
          <text x="33" y="36" fontSize="10" fill={stroke} stroke="none">−</text>
        </svg>
      );
    }
  
    if (type === "resistor") {
      return (
        <svg {...common}>
          <line x1="4" y1="24" x2="10" y2="24" />
          <polyline points="10,24 14,16 20,32 26,16 32,32 38,24" />
          <line x1="38" y1="24" x2="44" y2="24" />
        </svg>
      );
    }
  
    if (type === "led") {
      return (
        <svg {...common}>
          <line x1="8" y1="34" x2="40" y2="34" />
          <polygon points="18,12 18,34 34,23" fill={accent} stroke={stroke} />
          <line x1="34" y1="12" x2="34" y2="34" />
          <line x1="28" y1="10" x2="36" y2="4" />
          <line x1="36" y1="4" x2="34" y2="10" />
          <line x1="34" y1="14" x2="42" y2="8" />
          <line x1="42" y1="8" x2="40" y2="14" />
        </svg>
      );
    }
  
    if (type === "switch") {
      return (
        <svg {...common}>
          <line x1="6" y1="32" x2="17" y2="32" />
          <circle cx="18" cy="32" r="2.5" fill={stroke} />
          <circle cx="34" cy="32" r="2.5" fill={stroke} />
          <line x1="20" y1="30" x2="33" y2="18" />
          <line x1="35" y1="32" x2="42" y2="32" />
        </svg>
      );
    }
  
    if (type === "meter") {
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="17" />
          <path d="M14 30a12 12 0 0 1 20 0" />
          <line x1="24" y1="24" x2="33" y2="18" />
          <text x="18" y="34" fontSize="10" fill={stroke} stroke="none">A</text>
        </svg>
      );
    }
  
    if (type === "ldr") {
      return (
        <svg {...common}>
          <circle cx="24" cy="25" r="10" />
          <path d="M15 25h-8M41 25h-8" />
          <path d="M20 15l8 20M28 15l-8 20" />
          <line x1="34" y1="8" x2="27" y2="15" />
          <line x1="39" y1="13" x2="31" y2="20" />
          <polyline points="34,8 33,14 39,13" />
          <polyline points="39,13 37,19 31,20" />
        </svg>
      );
    }
  
    if (type === "transistor") {
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="16" />
          <line x1="12" y1="24" x2="22" y2="24" />
          <line x1="22" y1="14" x2="22" y2="34" />
          <line x1="22" y1="18" x2="34" y2="10" />
          <line x1="22" y1="30" x2="34" y2="38" />
          <polyline points="30,35 34,38 31,40" />
        </svg>
      );
    }
  
    return (
      <svg {...common}>
        <circle cx="24" cy="24" r="16" />
        <text x="20" y="29" fontSize="16" fill={stroke} stroke="none">?</text>
      </svg>
    );
  }