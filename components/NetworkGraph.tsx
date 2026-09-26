const studentNodes = [
  { x: 90, y: 120 },
  { x: 60, y: 260 },
  { x: 130, y: 380 },
  { x: 40, y: 420 },
];

const startupNodes = [
  { x: 710, y: 100 },
  { x: 750, y: 240 },
  { x: 690, y: 360 },
  { x: 760, y: 430 },
];

const hub = { x: 400, y: 260 };

export default function NetworkGraph() {
  return (
    <svg
      viewBox="0 0 800 500"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="node-glow">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Edges: students -> hub -> startups */}
      {studentNodes.map((node, i) => (
        <path
          key={`s-edge-${i}`}
          d={`M ${node.x} ${node.y} Q ${(node.x + hub.x) / 2} ${
            (node.y + hub.y) / 2 - 20
          } ${hub.x} ${hub.y}`}
          fill="none"
          stroke="url(#edge-gradient)"
          strokeWidth="1.5"
          className={i % 2 === 0 ? "animate-dash-flow" : ""}
        />
      ))}
      {startupNodes.map((node, i) => (
        <path
          key={`t-edge-${i}`}
          d={`M ${hub.x} ${hub.y} Q ${(node.x + hub.x) / 2} ${
            (node.y + hub.y) / 2 + 20
          } ${node.x} ${node.y}`}
          fill="none"
          stroke="url(#edge-gradient)"
          strokeWidth="1.5"
          className={i % 2 === 1 ? "animate-dash-flow" : ""}
        />
      ))}

      {/* Hub */}
      <circle cx={hub.x} cy={hub.y} r="46" fill="url(#node-glow)" opacity="0.5" />
      <circle
        cx={hub.x}
        cy={hub.y}
        r="6"
        fill="#f4f4f7"
        className="animate-node-pulse"
      />

      {/* Student + startup nodes */}
      {[...studentNodes, ...startupNodes].map((node, i) => (
        <g key={`node-${i}`}>
          <circle
            cx={node.x}
            cy={node.y}
            r="3.5"
            fill={i < studentNodes.length ? "#22d3ee" : "#8b5cf6"}
            className={i % 3 === 0 ? "animate-node-pulse" : ""}
          />
        </g>
      ))}
    </svg>
  );
}
