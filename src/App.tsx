import { CSSProperties, PointerEvent, useMemo, useRef, useState } from "react";

export type IconName =
  | "city"
  | "play"
  | "download"
  | "traffic"
  | "road"
  | "leaf"
  | "walk"
  | "build"
  | "layers"
  | "rotate"
  | "plus"
  | "minus"
  | "reset"
  | "check"
  | "clock"
  | "spark"
  | "chevron"
  | "pin";

const paths: Record<IconName, React.ReactNode> = {
  city: (
    <>
      <path d="M3 21h18M5 21V8l5-4v17M10 10l5-3v14M15 11h4v10M7.5 9v1M7.5 13v1M7.5 17v1M12.5 11v1M12.5 15v1" />
    </>
  ),
  play: <path d="m8 5 11 7-11 7V5Z" />,
  download: (
    <>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
    </>
  ),
  traffic: (
    <>
      <path d="M5 19h14M7 16l2-9h6l2 9M9 10h6M8 16h8M10 4h4" />
      <circle cx="9.5" cy="16" r="1" />
      <circle cx="14.5" cy="16" r="1" />
    </>
  ),
  road: (
    <>
      <path d="m7 21 2-18m8 18L15 3M12 5v3m0 4v3m0 4v2" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16Z" />
      <path d="M4 21c3-6 7-9 13-13" />
    </>
  ),
  walk: (
    <>
      <circle cx="13" cy="4" r="2" />
      <path d="m10 21 2-7-3-3m3 3 4 3m-6-9 4 1 3 3M7 21l3-5" />
    </>
  ),
  build: (
    <>
      <path d="M3 21h18M6 21V5h8v16m0-11h4v11M9 8h2m-2 4h2m-2 4h2m7-3h.01m0 4h.01" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3-9 5 9 5 9-5-9-5Z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </>
  ),
  rotate: (
    <>
      <path d="M20 11a8 8 0 1 0-2.3 6M20 5v6h-6" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  reset: (
    <>
      <path d="M4 7v5h5M20 17v-5h-5" />
      <path d="M6.1 17A8 8 0 0 0 19 8M17.9 7A8 8 0 0 0 5 16" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  spark: (
    <>
      <path d="m12 3 1.4 4.2L18 9l-4.6 1.8L12 15l-1.4-4.2L6 9l4.6-1.8L12 3Z" />
      <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
    </>
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  pin: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export const problems = [
  {
    id: "traffic",
    label: "Traffic congestion",
    detail: "Severe at peak hours",
    score: 86,
    icon: "traffic" as IconName,
  },
  {
    id: "connectivity",
    label: "Poor road connectivity",
    detail: "2 critical links missing",
    score: 68,
    icon: "road" as IconName,
  },
  {
    id: "green",
    label: "Insufficient green spaces",
    detail: "8.4% below target",
    score: 62,
    icon: "leaf" as IconName,
  },
  {
    id: "pedestrian",
    label: "Pedestrian accessibility",
    detail: "4 unsafe crossings",
    score: 58,
    icon: "walk" as IconName,
  },
  {
    id: "gaps",
    label: "Infrastructure gaps",
    detail: "Drainage and transit",
    score: 49,
    icon: "build" as IconName,
  },
];

export const proposals = [
  {
    id: "flyover",
    name: "Elevated corridor",
    fullName: "Construct an elevated flyover",
    problem: "Traffic congestion",
    solution: "Dual-lane grade-separated flyover",
    cost: "$38.2M",
    feasibility: "High",
    impact: "32% less congestion",
    location: "Central Junction, Sector 12",
    land: "1.8 hectares",
    environment: "Moderate during construction",
    traffic: "28–35% improvement",
    timeline: "24–30 months",
    drawbacks: "Temporary disruption and moderate embodied carbon.",
    icon: "road" as IconName,
  },
  {
    id: "widen",
    name: "Road widening",
    fullName: "Widen the existing road",
    problem: "Poor road connectivity",
    solution: "Expand arterial from 4 to 6 lanes",
    cost: "$21.6M",
    feasibility: "Medium",
    impact: "24% more capacity",
    location: "Civic Avenue, Sector 12",
    land: "2.6 hectares",
    environment: "6 mature trees relocated",
    traffic: "18–24% improvement",
    timeline: "16–20 months",
    drawbacks: "Requires limited land acquisition.",
    icon: "layers" as IconName,
  },
  {
    id: "signals",
    name: "Smart signals",
    fullName: "Optimize traffic signals",
    problem: "Traffic congestion",
    solution: "AI adaptive signal coordination",
    cost: "$4.8M",
    feasibility: "Very high",
    impact: "18% faster flow",
    location: "7 junctions, Central District",
    land: "No additional land",
    environment: "Low positive impact",
    traffic: "14–19% improvement",
    timeline: "6–8 months",
    drawbacks: "Requires ongoing sensor calibration.",
    icon: "traffic" as IconName,
  },
  {
    id: "park",
    name: "Civic green",
    fullName: "Develop green spaces",
    problem: "Insufficient green spaces",
    solution: "Landscaped urban park and bioswale",
    cost: "$12.4M",
    feasibility: "High",
    impact: "+4.2% green cover",
    location: "East Quadrant, Sector 12",
    land: "3.4 hectares",
    environment: "Strong positive impact",
    traffic: "3–5% active travel shift",
    timeline: "12–15 months",
    drawbacks: "Reduces future development footprint.",
    icon: "leaf" as IconName,
  },
  {
    id: "walkways",
    name: "Safe pathways",
    fullName: "Improve pedestrian pathways",
    problem: "Pedestrian accessibility",
    solution: "Shaded paths and raised crossings",
    cost: "$7.9M",
    feasibility: "High",
    impact: "41% safer crossings",
    location: "Central Junction perimeter",
    land: "0.4 hectares",
    environment: "Positive",
    traffic: "6% active travel shift",
    timeline: "9–12 months",
    drawbacks: "Minor curbside parking reduction.",
    icon: "walk" as IconName,
  },
];

export const metricData = [
  { label: "Congestion index", existing: 82, proposed: 56, unit: "/100", good: -32 },
  { label: "Avg. travel time", existing: 34, proposed: 25, unit: " min", good: -26 },
  { label: "Road capacity", existing: 64, proposed: 82, unit: "%", good: 28 },
  { label: "Carbon emissions", existing: 76, proposed: 64, unit: " kt", good: -16 },
  { label: "Green coverage", existing: 12, proposed: 16.2, unit: "%", good: 35 },
];

const buildings = [
  [8, 8, 56, 46, "slate"],
  [17, 7, 38, 62, "blue"],
  [28, 6, 48, 40, "slate"],
  [72, 7, 44, 55, "blue"],
  [83, 7, 58, 70, "slate"],
  [6, 28, 42, 34, "blue"],
  [20, 27, 65, 80, "slate"],
  [76, 29, 58, 42, "slate"],
  [89, 28, 40, 52, "blue"],
  [7, 66, 48, 55, "slate"],
  [19, 69, 56, 38, "blue"],
  [31, 72, 38, 68, "slate"],
  [70, 70, 62, 72, "blue"],
  [84, 70, 48, 44, "slate"],
  [5, 88, 35, 38, "blue"],
  [25, 88, 46, 48, "slate"],
  [76, 89, 42, 62, "slate"],
  [90, 88, 54, 36, "blue"],
];

function Building({ item, index }: { item: (number | string)[]; index: number }) {
  const [x, y, w, h, tone] = item;
  const style = {
    "--x": `${x}%`,
    "--y": `${y}%`,
    "--w": `${w}px`,
    "--h": `${h}px`,
    "--delay": `${index * 25}ms`,
  } as CSSProperties;
  return (
    <div className={`building ${tone}`} style={style}>
      <span className="building-top" />
      <span className="windows" />
    </div>
  );
}

export function CityScene({
  mode,
  proposal,
  showInfra,
  zoom,
  rotation,
  onRotation,
}: {
  mode: "existing" | "proposed";
  proposal: string;
  showInfra: boolean;
  zoom: number;
  rotation: number;
  onRotation: (value: number) => void;
}) {
  const drag = useRef<{ x: number; rotation: number } | null>(null);
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    drag.current = { x: event.clientX, rotation };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current) onRotation(drag.current.rotation + (event.clientX - drag.current.x) * 0.16);
  };
  const onPointerUp = () => {
    drag.current = null;
  };
  const isProposed = mode === "proposed" && showInfra;

  return (
    <div
      className="city-viewport"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div className="horizon-glow" />
      <div className="district-label">
        <Icon name="pin" size={13} /> CENTRAL JUNCTION <span>SECTOR 12</span>
      </div>
      <div className="north">
        N <span>↑</span>
      </div>
      <div
        className="city-stage"
        style={{
          transform: `translate(-50%, -48%) scale(${zoom}) rotateX(59deg) rotateZ(${rotation}deg)`,
        }}
      >
        <div className="ground-grid" />
        <div className={`road road-main ${isProposed && proposal === "widen" ? "wide" : ""}`}>
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="road road-cross">
          <i />
          <i />
          <i />
        </div>
        <div className="intersection-markings horizontal" />
        <div className="intersection-markings vertical" />
        {buildings.map((b, i) => (
          <Building key={i} item={b} index={i} />
        ))}
        <div className={`park ${isProposed && proposal === "park" ? "expanded" : ""}`}>
          <span className="tree t1" />
          <span className="tree t2" />
          <span className="tree t3" />
          <span className="tree t4" />
          <span className="park-path" />
        </div>
        <div className="parking">
          <span />
          <span />
          <span />
          <span />
        </div>
        {[12, 22, 38, 48, 64, 79].map((x, i) => (
          <div key={`v${i}`} className={`vehicle v${i}`} style={{ left: `${x}%` }} />
        ))}
        {[17, 29, 72, 84].map((y, i) => (
          <div key={`h${i}`} className={`vehicle cross c${i}`} style={{ top: `${y}%` }} />
        ))}
        {isProposed && proposal === "flyover" && (
          <div className="flyover">
            <span className="fly-road">
              <i />
              <i />
            </span>
            <b className="pier p1" />
            <b className="pier p2" />
            <b className="pier p3" />
            <b className="pier p4" />
          </div>
        )}
        {isProposed && proposal === "walkways" && (
          <>
            <div className="walkway w1" />
            <div className="walkway w2" />
          </>
        )}
        {isProposed && proposal === "signals" && (
          <>
            <div className="signal s1">
              <i />
            </div>
            <div className="signal s2">
              <i />
            </div>
            <div className="signal s3">
              <i />
            </div>
          </>
        )}
      </div>
      <div className="scene-caption">
        <span className={`status-dot ${isProposed ? "proposed" : ""}`} />
        <div>
          <strong>
            {isProposed
              ? proposals.find((p) => p.id === proposal)?.fullName
              : "Existing urban fabric"}
          </strong>
          <small>
            {isProposed
              ? "Proposed intervention visualization"
              : "Baseline conditions · Demonstration model"}
          </small>
        </div>
      </div>
      <div className="scene-hint">Drag to rotate · use controls to zoom</div>
    </div>
  );
}

export default function App() {
  const [area, setArea] = useState("Central District · Sector 12");
  const [problem, setProblem] = useState("traffic");
  const [proposal, setProposal] = useState("flyover");
  const [mode, setMode] = useState<"existing" | "proposed">("proposed");
  const [showInfra, setShowInfra] = useState(true);
  const [zoom, setZoom] = useState(0.92);
  const [rotation, setRotation] = useState(-30);
  const [applied, setApplied] = useState<string[]>([]);
  const [simulated, setSimulated] = useState(false);
  const [running, setRunning] = useState(false);
  const [scenario, setScenario] = useState(1);
  const current = proposals.find((p) => p.id === proposal)!;
  const relevantProposals = useMemo(
    () =>
      proposals.filter((p) => {
        if (problem === "traffic") return ["flyover", "signals"].includes(p.id);
        if (problem === "connectivity") return ["widen", "flyover"].includes(p.id);
        if (problem === "green") return p.id === "park";
        if (problem === "pedestrian") return ["walkways", "park"].includes(p.id);
        return ["widen", "walkways"].includes(p.id);
      }),
    [problem],
  );

  const runSimulation = () => {
    setRunning(true);
    setMode("proposed");
    window.setTimeout(() => {
      setRunning(false);
      setSimulated(true);
    }, 1100);
  };
  const applyProposal = () => {
    setApplied((a) => (a.includes(proposal) ? a : [...a, proposal]));
    setMode("proposed");
    setShowInfra(true);
  };
  const exportReport = () => {
    const lines = [
      "CITY OF TOMORROW — PLANNING SUMMARY",
      "Demonstration data only",
      "",
      `Area: ${area}`,
      `Scenario: Scenario ${scenario}`,
      `Selected proposal: ${current.fullName}`,
      `Estimated cost: ${current.cost}`,
      `Feasibility: ${current.feasibility}`,
      `Expected impact: ${current.impact}`,
      `Timeline: ${current.timeline}`,
      "",
      "Illustrative simulation results:",
      ...metricData.map(
        (m) =>
          `${m.label}: ${m.existing}${m.unit} → ${m.proposed}${m.unit} (${m.good > 0 ? "+" : ""}${m.good}%)`,
      ),
      "",
      "Disclaimer: Sample values are illustrative and are not validated real-world predictions.",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `city-of-tomorrow-scenario-${scenario}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <Icon name="city" size={22} />
          </div>
          <div>
            <strong>City of Tomorrow</strong>
            <span>Plan Smarter. Build Better.</span>
          </div>
        </div>
        <div className="project-meta">
          <div>
            <span>PROJECT</span>
            <strong>Central Mobility Plan 2040</strong>
          </div>
          <div className="meta-divider" />
          <label className="area-select">
            <Icon name="pin" size={15} />
            <span>
              <small>SELECTED AREA</small>
              <select value={area} onChange={(e) => setArea(e.target.value)}>
                <option>Central District · Sector 12</option>
                <option>Riverside Corridor · Sector 08</option>
                <option>Innovation District · Sector 21</option>
              </select>
            </span>
            <Icon name="chevron" size={13} />
          </label>
        </div>
        <div className="top-actions">
          <span className="mode-badge">
            <i /> DEMO PROJECT
          </span>
          <button
            className={`btn secondary ${running ? "loading" : ""}`}
            onClick={runSimulation}
            disabled={running}
          >
            <Icon name="play" size={15} />
            {running ? "Simulating…" : "Run Simulation"}
          </button>
          <button className="btn primary" onClick={exportReport}>
            <Icon name="download" size={15} />
            Export Report
          </button>
        </div>
      </header>

      <section className="workspace">
        <aside className="panel left-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">URBAN DIAGNOSTICS</span>
              <h2>Planning challenges</h2>
            </div>
            <span className="count">5</span>
          </div>
          <div className="problem-list">
            {problems.map((item) => (
              <button
                key={item.id}
                className={`problem-item ${problem === item.id ? "active" : ""}`}
                onClick={() => {
                  setProblem(item.id);
                  const match = proposals.find((p) => p.problem === item.label);
                  if (match) setProposal(match.id);
                }}
              >
                <span className="problem-icon">
                  <Icon name={item.icon} size={17} />
                </span>
                <span className="problem-copy">
                  <strong>{item.label}</strong>
                  <small>{item.detail}</small>
                </span>
                <span className="severity">
                  <i style={{ width: `${item.score}%` }} />
                </span>
              </button>
            ))}
          </div>
          <div className="section-divider">
            <span>AI RECOMMENDATIONS</span>
            <i />
          </div>
          <div className="recommendation-list">
            {relevantProposals.map((item, index) => (
              <button
                key={item.id}
                className={`recommendation ${proposal === item.id ? "selected" : ""}`}
                onClick={() => {
                  setProposal(item.id);
                  setMode("proposed");
                }}
              >
                <span className="rec-rank">0{index + 1}</span>
                <span className="rec-main">
                  <span className="rec-title">
                    <Icon name={item.icon} size={16} />
                    <strong>{item.fullName}</strong>
                    {applied.includes(item.id) && (
                      <span className="applied-mark">
                        <Icon name="check" size={11} />
                      </span>
                    )}
                  </span>
                  <small>{item.solution}</small>
                  <span className="rec-stats">
                    <b>{item.cost}</b>
                    <i>{item.feasibility} feasibility</i>
                    <em>{item.impact}</em>
                  </span>
                </span>
                <Icon name="chevron" size={15} />
              </button>
            ))}
          </div>
          <div className="demo-note">
            <span>DEMO DATA</span> Diagnostics use illustrative sample inputs for this prototype.
          </div>
        </aside>

        <section className="visual-column">
          <div className="visual-toolbar">
            <div className="view-switch" role="group" aria-label="City view">
              <button
                className={mode === "existing" ? "active" : ""}
                onClick={() => setMode("existing")}
              >
                EXISTING CITY
              </button>
              <button
                className={mode === "proposed" ? "active" : ""}
                onClick={() => setMode("proposed")}
              >
                PROPOSED CITY
                <span />
              </button>
            </div>
            <div className="scenario-tabs">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={scenario === n ? "active" : ""}
                  onClick={() => {
                    setScenario(n);
                    if (n === 2) setProposal("widen");
                    if (n === 3) setProposal("park");
                  }}
                >
                  S{n}
                </button>
              ))}
              <span>Scenario {scenario}</span>
            </div>
            <label className="infra-toggle">
              <span>Infrastructure</span>
              <input
                type="checkbox"
                checked={showInfra}
                onChange={(e) => setShowInfra(e.target.checked)}
              />
              <i />
            </label>
          </div>
          <div className="city-frame">
            <CityScene
              mode={mode}
              proposal={proposal}
              showInfra={showInfra}
              zoom={zoom}
              rotation={rotation}
              onRotation={setRotation}
            />
            <div className="camera-controls">
              <button title="Rotate view" onClick={() => setRotation((r) => r + 15)}>
                <Icon name="rotate" size={17} />
              </button>
              <button title="Zoom in" onClick={() => setZoom((z) => Math.min(1.2, z + 0.08))}>
                <Icon name="plus" size={17} />
              </button>
              <button title="Zoom out" onClick={() => setZoom((z) => Math.max(0.68, z - 0.08))}>
                <Icon name="minus" size={17} />
              </button>
              <button
                title="Reset view"
                onClick={() => {
                  setZoom(0.92);
                  setRotation(-30);
                }}
              >
                <Icon name="reset" size={17} />
              </button>
            </div>
            <div className="legend">
              <span>
                <i className="existing-key" />
                Existing
              </span>
              <span>
                <i className="proposed-key" />
                Proposed
              </span>
              <span>
                <i className="green-key" />
                Green space
              </span>
            </div>
          </div>
        </section>

        <aside className="panel right-panel">
          <div className="panel-heading insights-heading">
            <div>
              <span className="eyebrow">PROPOSAL 0{proposals.indexOf(current) + 1}</span>
              <h2>Planning insights</h2>
            </div>
            <span className="feasibility">{current.feasibility}</span>
          </div>
          <div className="proposal-hero">
            <span className="proposal-icon">
              <Icon name={current.icon} size={22} />
            </span>
            <div>
              <small>INFRASTRUCTURE TYPE</small>
              <strong>{current.fullName}</strong>
              <span>
                <Icon name="pin" size={12} />
                {current.location}
              </span>
            </div>
          </div>
          <div className="insight-grid">
            <div>
              <span>Estimated cost</span>
              <strong>{current.cost}</strong>
            </div>
            <div>
              <span>Land requirement</span>
              <strong>{current.land}</strong>
            </div>
            <div>
              <span>Traffic improvement</span>
              <strong className="positive">{current.traffic}</strong>
            </div>
            <div>
              <span>Timeline</span>
              <strong>{current.timeline}</strong>
            </div>
          </div>
          <div className="impact-row">
            <span>Environmental impact</span>
            <strong>{current.environment}</strong>
          </div>
          <button
            className={`apply-btn ${applied.includes(proposal) ? "applied" : ""}`}
            onClick={applyProposal}
          >
            <Icon name={applied.includes(proposal) ? "check" : "spark"} size={16} />
            {applied.includes(proposal) ? "Proposal Applied" : "Apply This Proposal"}
          </button>

          <div className="ai-brief">
            <div className="ai-title">
              <span>
                <Icon name="spark" size={16} />
              </span>
              <div>
                <small>AI PLANNING ASSISTANT</small>
                <strong>Decision support brief</strong>
              </div>
            </div>
            <p>
              {current.problem} detected around the selected area. <b>{current.fullName}</b> is
              recommended for further feasibility assessment.
            </p>
            <dl>
              <div>
                <dt>Recommendation basis</dt>
                <dd>{current.solution} addresses the highest-weighted network constraint.</dd>
              </div>
              <div>
                <dt>Expected benefit</dt>
                <dd>{current.impact}, with improved network resilience.</dd>
              </div>
              <div>
                <dt>Possible drawback</dt>
                <dd>{current.drawbacks}</dd>
              </div>
            </dl>
          </div>
          <div className="confidence">
            <span>AI suitability score</span>
            <div>
              <i style={{ width: proposal === "signals" ? "91%" : "84%" }} />
            </div>
            <strong>{proposal === "signals" ? 91 : 84}%</strong>
          </div>
        </aside>
      </section>

      <section className={`results-panel ${simulated ? "updated" : ""}`}>
        <div className="results-title">
          <span className="eyebrow">SIMULATION RESULTS</span>
          <h2>Scenario impact</h2>
          <span className="simulation-status">
            <i />
            {simulated ? "Simulation complete" : "Illustrative baseline"}
          </span>
        </div>
        <div className="metrics">
          {metricData.map((metric, index) => (
            <div className="metric" key={metric.label}>
              <div className="metric-top">
                <span>{metric.label}</span>
                <strong className={metric.good > 0 ? "up" : "down"}>
                  {metric.good > 0 ? "+" : ""}
                  {metric.good}%
                </strong>
              </div>
              <div className="metric-values">
                <span>
                  {metric.existing}
                  {metric.unit}
                </span>
                <Icon name="chevron" size={12} />
                <b>
                  {simulated ? metric.proposed : "—"}
                  {simulated ? metric.unit : ""}
                </b>
              </div>
              <div className="comparison-bars">
                <i style={{ width: `${Math.min(100, Number(metric.existing))}%` }} />
                <i
                  className="proposed-bar"
                  style={{ width: simulated ? `${Math.min(100, Number(metric.proposed))}%` : "0%" }}
                />
              </div>
              {index === 0 && (
                <span className="bar-labels">
                  <i>Existing</i>
                  <i>Proposed</i>
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="disclaimer">
          <strong>Illustrative model</strong>
          <span>
            Sample simulation values are for demonstration only and are not validated real-world
            predictions.
          </span>
        </div>
      </section>
    </main>
  );
}
