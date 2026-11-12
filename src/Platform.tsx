import { useEffect, useMemo, useState } from "react";
import { CityScene, Icon, IconName, metricData, problems, proposals } from "./App";
import "./platform.css";

type PageId =
  | "overview"
  | "projects"
  | "explorer"
  | "studio"
  | "visualization"
  | "recommendations"
  | "simulation"
  | "comparison"
  | "sustainability"
  | "reports";

type Project = {
  id: number;
  name: string;
  city: string;
  area: string;
  objective: string;
  budget: string;
  status: string;
  updated: string;
};

const navItems: { id: PageId; label: string; icon: IconName; step: string }[] = [
  { id: "overview", label: "Overview", icon: "layers", step: "01" },
  { id: "projects", label: "Projects", icon: "build", step: "02" },
  { id: "explorer", label: "City Explorer", icon: "pin", step: "03" },
  { id: "studio", label: "Urban Planning Studio", icon: "city", step: "04" },
  { id: "visualization", label: "3D City Visualization", icon: "rotate", step: "05" },
  { id: "recommendations", label: "AI Recommendations", icon: "spark", step: "06" },
  { id: "simulation", label: "Simulation Lab", icon: "play", step: "07" },
  { id: "comparison", label: "Scenario Comparison", icon: "layers", step: "08" },
  { id: "sustainability", label: "Sustainability Analysis", icon: "leaf", step: "09" },
  { id: "reports", label: "Reports & Export", icon: "download", step: "10" },
];

const initialProjects: Project[] = [
  {
    id: 1,
    name: "Central Mobility Plan 2040",
    city: "Aurora City",
    area: "Central District · Sector 12",
    objective: "Reduce traffic congestion",
    budget: "$85M",
    status: "Active",
    updated: "Today, 09:42",
  },
  {
    id: 2,
    name: "Riverside Green Corridor",
    city: "Aurora City",
    area: "Riverside Corridor · Sector 08",
    objective: "Increase green coverage",
    budget: "$42M",
    status: "In review",
    updated: "Yesterday",
  },
  {
    id: 3,
    name: "Innovation District Access",
    city: "Aurora City",
    area: "Innovation District · Sector 21",
    objective: "Improve connectivity",
    budget: "$64M",
    status: "Draft",
    updated: "12 Jun 2025",
  },
];

function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="mp-page-header">
      <div>
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </header>
  );
}

function Button({
  children,
  onClick,
  secondary = false,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      className={`mp-button ${secondary ? "secondary" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function ScenePanel({
  proposal,
  mode = "proposed",
  compact = false,
  labels = true,
}: {
  proposal: string;
  mode?: "existing" | "proposed";
  compact?: boolean;
  labels?: boolean;
}) {
  const [zoom, setZoom] = useState(compact ? 0.74 : 0.9);
  const [rotation, setRotation] = useState(-30);
  const [view, setView] = useState(mode);
  return (
    <div className={`mp-scene ${compact ? "compact" : ""} ${labels ? "" : "hide-labels"}`}>
      <CityScene
        mode={view}
        proposal={proposal}
        showInfra
        zoom={zoom}
        rotation={rotation}
        onRotation={setRotation}
      />
      {!compact && (
        <>
          <div className="mp-scene-switch">
            <button
              className={view === "existing" ? "active" : ""}
              onClick={() => setView("existing")}
            >
              Existing
            </button>
            <button
              className={view === "proposed" ? "active" : ""}
              onClick={() => setView("proposed")}
            >
              Proposed
            </button>
          </div>
          <div className="mp-scene-tools">
            <button onClick={() => setRotation((r) => r + 15)} title="Rotate">
              <Icon name="rotate" size={16} />
            </button>
            <button onClick={() => setZoom((z) => Math.min(1.2, z + 0.08))} title="Zoom in">
              <Icon name="plus" size={16} />
            </button>
            <button onClick={() => setZoom((z) => Math.max(0.62, z - 0.08))} title="Zoom out">
              <Icon name="minus" size={16} />
            </button>
            <button
              onClick={() => {
                setZoom(0.9);
                setRotation(-30);
              }}
              title="Reset view"
            >
              <Icon name="reset" size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function OverviewPage({
  go,
  project,
  applied,
}: {
  go: (page: PageId) => void;
  project: Project;
  applied: string[];
}) {
  return (
    <div className="mp-page">
      <PageHeader
        eyebrow="PLANNING COMMAND CENTRE"
        title="City planning overview"
        description="A unified view of your active urban transformation programme."
        action={
          <Button onClick={() => go("projects")}>
            <Icon name="plus" size={15} /> Create New Project
          </Button>
        }
      />
      <div className="mp-overview-grid">
        <section className="mp-hero-panel">
          <div className="mp-hero-copy">
            <span className="mp-kicker">ACTIVE PROJECT</span>
            <h2>{project.name}</h2>
            <p>
              Coordinated mobility and public-realm upgrades for {project.area}, with decision
              support across feasibility, sustainability and cost.
            </p>
            <div className="mp-hero-meta">
              <span>
                <Icon name="pin" size={14} />
                {project.city}
              </span>
              <span>Budget {project.budget}</span>
              <span className="mp-live-dot">Demo model</span>
            </div>
            <div className="mp-hero-actions">
              <Button onClick={() => go("studio")}>Open Planning Studio</Button>
              <Button secondary onClick={() => go("visualization")}>
                View 3D City
              </Button>
            </div>
          </div>
          <div className="mp-hero-scene">
            <ScenePanel proposal={applied.at(-1) || "flyover"} compact />
          </div>
        </section>
        <section className="mp-stat-strip">
          {[
            ["Active projects", "03", "2 awaiting review"],
            ["Critical problems", "05", "Traffic ranks highest"],
            [
              "Applied proposals",
              String(applied.length).padStart(2, "0"),
              "Shared across workflow",
            ],
            ["Planning readiness", applied.length ? "84%" : "62%", "Illustrative assessment"],
          ].map(([label, value, sub]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{sub}</small>
            </div>
          ))}
        </section>
        <section className="mp-panel mp-problem-summary">
          <div className="mp-section-title">
            <div>
              <span>URBAN DIAGNOSTICS</span>
              <h3>Major planning problems</h3>
            </div>
            <button onClick={() => go("studio")}>Open studio</button>
          </div>
          {problems.slice(0, 4).map((item) => (
            <div className="mp-problem-row" key={item.id}>
              <span className="mp-square-icon">
                <Icon name={item.icon} size={16} />
              </span>
              <div>
                <strong>{item.label}</strong>
                <small>{item.detail}</small>
              </div>
              <div className="mp-severity">
                <i style={{ width: `${item.score}%` }} />
              </div>
              <b>{item.score}</b>
            </div>
          ))}
        </section>
        <section className="mp-panel mp-rec-summary">
          <div className="mp-section-title">
            <div>
              <span>AI PRIORITIES</span>
              <h3>Recommended interventions</h3>
            </div>
            <button onClick={() => go("recommendations")}>View all</button>
          </div>
          {proposals.slice(0, 3).map((item, i) => (
            <button className="mp-rec-row" key={item.id} onClick={() => go("recommendations")}>
              <span>0{i + 1}</span>
              <div>
                <strong>{item.fullName}</strong>
                <small>
                  {item.cost} · {item.feasibility} feasibility
                </small>
              </div>
              <em>{item.impact}</em>
              <Icon name="chevron" size={14} />
            </button>
          ))}
        </section>
        <section className="mp-panel mp-activity">
          <div className="mp-section-title">
            <div>
              <span>PROJECT HISTORY</span>
              <h3>Recent planning activity</h3>
            </div>
          </div>
          {[
            ["Simulation baseline prepared", "12 minutes ago"],
            ["Central Junction selected", "38 minutes ago"],
            ["Urban diagnostics completed", "Today, 08:54"],
          ].map(([name, time], i) => (
            <div className="mp-activity-row" key={name}>
              <i className={i === 0 ? "active" : ""} />
              <div>
                <strong>{name}</strong>
                <small>{time}</small>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

function ProjectsPage({
  projects,
  setProjects,
  activeId,
  setActiveId,
  go,
}: {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  activeId: number;
  setActiveId: (id: number) => void;
  go: (page: PageId) => void;
}) {
  const empty = {
    name: "",
    city: "Aurora City",
    area: "Central District · Sector 12",
    objective: "Reduce traffic congestion",
    budget: "$50M",
  };
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);
  const save = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setProjects((items) =>
        items.map((p) => (p.id === editing ? { ...p, ...form, updated: "Just now" } : p)),
      );
    } else {
      const id = Date.now();
      setProjects((items) => [{ ...form, id, status: "Draft", updated: "Just now" }, ...items]);
      setActiveId(id);
    }
    setShowForm(false);
    setEditing(null);
    setForm(empty);
  };
  return (
    <div className="mp-page">
      <PageHeader
        eyebrow="PROJECT PORTFOLIO"
        title="Planning projects"
        description="Create, manage and continue urban planning programmes."
        action={
          <Button
            onClick={() => {
              setForm(empty);
              setEditing(null);
              setShowForm(true);
            }}
          >
            <Icon name="plus" size={15} /> New Planning Project
          </Button>
        }
      />
      <div className="mp-project-toolbar">
        <div>
          <strong>{projects.length} projects</strong>
          <span>All planning programmes</span>
        </div>
        <label>
          <Icon name="spark" size={14} />
          <input placeholder="Search projects…" />
        </label>
      </div>
      <div className="mp-project-grid">
        {projects.map((project) => (
          <article
            className={`mp-project-card ${activeId === project.id ? "selected" : ""}`}
            key={project.id}
          >
            <div className="mp-project-thumb">
              <ScenePanel proposal={project.id % 2 ? "flyover" : "park"} compact />
              <span>{project.status}</span>
            </div>
            <div className="mp-project-body">
              <small>
                {project.city} · {project.area}
              </small>
              <h3>{project.name}</h3>
              <dl>
                <div>
                  <dt>Objective</dt>
                  <dd>{project.objective}</dd>
                </div>
                <div>
                  <dt>Budget</dt>
                  <dd>{project.budget}</dd>
                </div>
              </dl>
              <div className="mp-project-foot">
                <span>Updated {project.updated}</span>
                <div>
                  <button
                    title="Edit project"
                    onClick={() => {
                      setForm(project);
                      setEditing(project.id);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    title="Delete project"
                    onClick={() => setProjects((items) => items.filter((p) => p.id !== project.id))}
                  >
                    Delete
                  </button>
                  <button
                    className="open"
                    onClick={() => {
                      setActiveId(project.id);
                      go("explorer");
                    }}
                  >
                    Open <Icon name="chevron" size={12} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      {showForm && (
        <div className="mp-modal-backdrop" onMouseDown={() => setShowForm(false)}>
          <form
            className="mp-modal"
            onMouseDown={(e) => e.stopPropagation()}
            onSubmit={(e) => e.preventDefault()}
          >
            <span className="mp-kicker">{editing ? "EDIT PROJECT" : "NEW PLANNING PROJECT"}</span>
            <h2>{editing ? "Update project details" : "Create a planning programme"}</h2>
            <div className="mp-form-grid">
              <label className="wide">
                Project name
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. North Corridor Mobility Plan"
                  autoFocus
                />
              </label>
              <label>
                City
                <select
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                >
                  <option>Aurora City</option>
                  <option>Meridian</option>
                  <option>Nova Capital</option>
                </select>
              </label>
              <label>
                Planning area
                <select
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value })}
                >
                  <option>Central District · Sector 12</option>
                  <option>Riverside Corridor · Sector 08</option>
                  <option>Innovation District · Sector 21</option>
                </select>
              </label>
              <label>
                Planning objective
                <select
                  value={form.objective}
                  onChange={(e) => setForm({ ...form, objective: e.target.value })}
                >
                  <option>Reduce traffic congestion</option>
                  <option>Increase green coverage</option>
                  <option>Improve connectivity</option>
                  <option>Improve pedestrian safety</option>
                </select>
              </label>
              <label>
                Indicative budget
                <input
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                />
              </label>
            </div>
            <div className="mp-modal-actions">
              <Button secondary onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button onClick={save}>{editing ? "Save Changes" : "Create Project"}</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function ExplorerPage({
  area,
  setArea,
  go,
}: {
  area: string;
  setArea: (area: string) => void;
  go: (page: PageId) => void;
}) {
  const [search, setSearch] = useState("Aurora City");
  const areas = [
    "Central District · Sector 12",
    "Riverside Corridor · Sector 08",
    "Innovation District · Sector 21",
  ];
  return (
    <div className="mp-page mp-explorer-page">
      <PageHeader
        eyebrow="AREA DISCOVERY"
        title="City Explorer"
        description="Locate and define the urban area to be assessed."
      />
      <div className="mp-explorer">
        <aside className="mp-explorer-side">
          <label className="mp-search">
            <Icon name="pin" size={15} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city or locality"
            />
          </label>
          <span className="mp-kicker">PLANNING AREAS</span>
          {areas.map((item, i) => (
            <button
              className={`mp-area-option ${area === item ? "active" : ""}`}
              key={item}
              onClick={() => setArea(item)}
            >
              <span>0{i + 1}</span>
              <div>
                <strong>{item.split(" · ")[0]}</strong>
                <small>{item.split(" · ")[1]} · 4.8 km²</small>
              </div>
              <Icon name="chevron" size={14} />
            </button>
          ))}
          <div className="mp-area-detail">
            <span>SELECTED AREA</span>
            <h3>{area}</h3>
            <dl>
              <div>
                <dt>Primary road</dt>
                <dd>Civic Avenue</dd>
              </div>
              <div>
                <dt>Major junctions</dt>
                <dd>7</dd>
              </div>
              <div>
                <dt>Buildings mapped</dt>
                <dd>284</dd>
              </div>
              <div>
                <dt>Green cover</dt>
                <dd>12.1%</dd>
              </div>
            </dl>
          </div>
          <Button onClick={() => go("studio")}>Confirm Area & Continue</Button>
        </aside>
        <section className="mp-map">
          <div className="mp-map-grid" />
          <div className="mp-map-road arterial a1">
            <span>CIVIC AVENUE</span>
          </div>
          <div className="mp-map-road arterial a2">
            <span>MERIDIAN ROAD</span>
          </div>
          <div className="mp-map-road local l1" />
          <div className="mp-map-road local l2" />
          <div className="mp-map-road local l3" />
          <div className="mp-map-river" />
          <div className="mp-map-park p1">Central Park</div>
          <div className="mp-map-park p2">River Garden</div>
          <div className="mp-map-buildings b1" />
          <div className="mp-map-buildings b2" />
          <div className="mp-map-buildings b3" />
          <button
            className="mp-selected-zone"
            onClick={() => setArea("Central District · Sector 12")}
          >
            <i />
            <span>
              SELECTED PLANNING AREA<strong>Central Junction · 4.8 km²</strong>
            </span>
          </button>
          <span className="mp-map-pin pin1">
            <Icon name="pin" size={14} /> Transit Hub
          </span>
          <span className="mp-map-pin pin2">
            <Icon name="pin" size={14} /> Civic Centre
          </span>
          <div className="mp-map-legend">
            <span>
              <i />
              Selected area
            </span>
            <span>
              <i />
              Major road
            </span>
            <span>
              <i />
              Green space
            </span>
          </div>
          <div className="mp-map-note">Simplified demonstration basemap · Not a live GIS feed</div>
        </section>
      </div>
    </div>
  );
}

function StudioPage({
  selected,
  setSelected,
  applied,
  setApplied,
}: {
  selected: string;
  setSelected: (id: string) => void;
  applied: string[];
  setApplied: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [problem, setProblem] = useState("traffic");
  const [history, setHistory] = useState<string[]>(applied);
  const current = proposals.find((p) => p.id === selected)!;
  const apply = () => {
    if (!applied.includes(selected)) {
      setHistory(applied);
      setApplied([...applied, selected]);
    }
  };
  return (
    <div className="mp-page mp-studio-page">
      <PageHeader
        eyebrow="CORE WORKSPACE"
        title="Urban Planning Studio"
        description="Diagnose constraints and apply infrastructure improvements to the shared city model."
      />
      <div className="mp-studio">
        <aside className="mp-studio-panel">
          <span className="mp-kicker">01 · EXISTING PROBLEMS</span>
          <h3>Urban constraints</h3>
          <p>Select a diagnosed issue to focus the planning model.</p>
          <div className="mp-studio-list">
            {problems.map((item) => (
              <button
                className={problem === item.id ? "active" : ""}
                key={item.id}
                onClick={() => setProblem(item.id)}
              >
                <span>
                  <Icon name={item.icon} size={17} />
                </span>
                <div>
                  <strong>{item.label}</strong>
                  <small>{item.detail}</small>
                </div>
                <b>{item.score}</b>
              </button>
            ))}
          </div>
          <div className="mp-diagnostic">
            <span>MODEL FINDING</span>
            <p>
              Peak-hour delay is concentrated at the central four-arm junction. Grade separation
              scores highest for network impact.
            </p>
          </div>
        </aside>
        <section className="mp-studio-city">
          <div className="mp-studio-bar">
            <span>
              <i /> SHARED CITY MODEL
            </span>
            <strong>{current.location}</strong>
            <em>{applied.length} applied</em>
          </div>
          <ScenePanel proposal={selected} />
          <div className="mp-studio-actions">
            <button
              onClick={() => {
                setApplied(history);
              }}
            >
              <Icon name="reset" size={14} /> Undo
            </button>
            <button
              onClick={() => {
                setApplied([]);
                setHistory([]);
              }}
            >
              <Icon name="reset" size={14} /> Reset All
            </button>
            <button className={applied.includes(selected) ? "applied" : ""} onClick={apply}>
              <Icon name={applied.includes(selected) ? "check" : "spark"} size={15} />
              {applied.includes(selected) ? "Proposal Applied" : "Apply Proposal"}
            </button>
          </div>
        </section>
        <aside className="mp-studio-panel right">
          <span className="mp-kicker">02 · PROPOSED IMPROVEMENTS</span>
          <h3>Intervention library</h3>
          <p>Select an improvement to preview it on the 3D model.</p>
          <div className="mp-improvement-list">
            {proposals.map((item) => (
              <button
                className={selected === item.id ? "active" : ""}
                key={item.id}
                onClick={() => setSelected(item.id)}
              >
                <span>
                  <Icon name={item.icon} size={17} />
                </span>
                <div>
                  <strong>{item.fullName}</strong>
                  <small>
                    {item.cost} · {item.impact}
                  </small>
                </div>
                {applied.includes(item.id) ? (
                  <Icon name="check" size={14} />
                ) : (
                  <Icon name="chevron" size={14} />
                )}
              </button>
            ))}
          </div>
          <div className="mp-selection-detail">
            <span>SELECTED PROPOSAL</span>
            <strong>{current.solution}</strong>
            <dl>
              <div>
                <dt>Feasibility</dt>
                <dd>{current.feasibility}</dd>
              </div>
              <div>
                <dt>Timeline</dt>
                <dd>{current.timeline}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}

function VisualizationPage({ selected, applied }: { selected: string; applied: string[] }) {
  const [labels, setLabels] = useState(true);
  const [angle, setAngle] = useState("Aerial perspective");
  const proposal = applied.at(-1) || selected;
  return (
    <div className="mp-page mp-viz-page">
      <PageHeader
        eyebrow="DIGITAL TWIN VIEWER"
        title="3D City Visualization"
        description="Inspect the existing city and applied infrastructure in an immersive architectural model."
        action={<span className="mp-demo-badge">DEMONSTRATION MODEL</span>}
      />
      <div className="mp-viz-toolbar">
        <div>
          <span className="mp-live-dot">Model synchronized</span>
          <strong>Central Junction · Sector 12</strong>
        </div>
        <label>
          Viewing angle
          <select value={angle} onChange={(e) => setAngle(e.target.value)}>
            <option>Aerial perspective</option>
            <option>Junction focus</option>
            <option>Low architectural</option>
          </select>
        </label>
        <label className="mp-check">
          <input type="checkbox" checked={labels} onChange={(e) => setLabels(e.target.checked)} />
          <i />
          Infrastructure labels
        </label>
        <span>{applied.length} applied interventions</span>
      </div>
      <div className="mp-immersive-scene">
        <ScenePanel proposal={proposal} labels={labels} />
        <div className="mp-infra-label fly">
          <span>PROPOSED</span>Elevated mobility corridor
        </div>
        <div className="mp-infra-label junction">
          <span>JUNCTION</span>Central intersection
        </div>
        <div className="mp-viz-data">
          <span>
            MODEL EXTENT<strong>4.8 km²</strong>
          </span>
          <span>
            BUILDINGS<strong>284</strong>
          </span>
          <span>
            ROAD NETWORK<strong>18.6 km</strong>
          </span>
          <span>
            COORDINATE VIEW<strong>35° / 142°</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

function RecommendationsPage({
  selected,
  setSelected,
  setApplied,
  go,
}: {
  selected: string;
  setSelected: (id: string) => void;
  setApplied: React.Dispatch<React.SetStateAction<string[]>>;
  go: (page: PageId) => void;
}) {
  return (
    <div className="mp-page">
      <PageHeader
        eyebrow="AI DECISION SUPPORT"
        title="Planning recommendations"
        description="Ranked infrastructure interventions based on the demonstration diagnostic model."
        action={<span className="mp-demo-badge">ILLUSTRATIVE ASSESSMENT</span>}
      />
      <div className="mp-recommendation-grid">
        {proposals.map((item, i) => (
          <article
            className={`mp-recommendation-card ${selected === item.id ? "selected" : ""}`}
            key={item.id}
          >
            <header>
              <span className="mp-rec-number">0{i + 1}</span>
              <span className="mp-square-icon">
                <Icon name={item.icon} size={19} />
              </span>
              <div>
                <small>RECOMMENDED INTERVENTION</small>
                <h3>{item.fullName}</h3>
              </div>
              <em>{i === 0 ? "Highest priority" : item.feasibility}</em>
            </header>
            <p>
              <strong>Detected problem:</strong> {item.problem}. {item.solution} is recommended
              because it directly addresses the highest-weighted network constraint in this area.
            </p>
            <div className="mp-rec-facts">
              <div>
                <span>Estimated cost</span>
                <strong>{item.cost}</strong>
              </div>
              <div>
                <span>Land requirement</span>
                <strong>{item.land}</strong>
              </div>
              <div>
                <span>Expected benefit</span>
                <strong>{item.impact}</strong>
              </div>
              <div>
                <span>Timeline</span>
                <strong>{item.timeline}</strong>
              </div>
            </div>
            <div className="mp-rec-analysis">
              <div>
                <span>Environmental impact</span>
                <p>{item.environment}</p>
              </div>
              <div>
                <span>Possible drawback</span>
                <p>{item.drawbacks}</p>
              </div>
            </div>
            <footer>
              <button
                onClick={() => {
                  setSelected(item.id);
                  go("visualization");
                }}
              >
                View in 3D
              </button>
              <button
                onClick={() => {
                  setSelected(item.id);
                  setApplied((a) => (a.includes(item.id) ? a : [...a, item.id]));
                  go("studio");
                }}
              >
                Add to Planning Studio
              </button>
              <button
                className="primary"
                onClick={() => {
                  setSelected(item.id);
                  go("comparison");
                }}
              >
                Compare Alternatives
              </button>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}

function SimulationPage({
  applied,
  setSimulated,
}: {
  applied: string[];
  setSimulated: (value: boolean) => void;
}) {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [budget, setBudget] = useState(65);
  const [traffic, setTraffic] = useState(72);
  const [green, setGreen] = useState(35);
  const run = () => {
    setRunning(true);
    window.setTimeout(() => {
      setRunning(false);
      setDone(true);
      setSimulated(true);
    }, 1000);
  };
  return (
    <div className="mp-page">
      <PageHeader
        eyebrow="IMPACT MODELLING"
        title="Simulation Lab"
        description="Test planning interventions against adjustable development priorities."
        action={<span className="mp-demo-badge">SAMPLE MODEL · NOT VALIDATED</span>}
      />
      <div className="mp-sim-layout">
        <aside className="mp-panel mp-sim-controls">
          <span className="mp-kicker">SIMULATION PARAMETERS</span>
          <h3>Scenario configuration</h3>
          <label>
            Planning objective
            <select>
              <option>Reduce traffic congestion</option>
              <option>Improve sustainability</option>
              <option>Balance mobility and environment</option>
            </select>
          </label>
          <div className="mp-range">
            <span>
              <b>Budget allocation</b>
              <strong>${budget}M</strong>
            </span>
            <input
              type="range"
              min="20"
              max="120"
              value={budget}
              onChange={(e) => setBudget(+e.target.value)}
            />
          </div>
          <div className="mp-range">
            <span>
              <b>Traffic improvement target</b>
              <strong>{traffic}%</strong>
            </span>
            <input type="range" value={traffic} onChange={(e) => setTraffic(+e.target.value)} />
          </div>
          <div className="mp-range">
            <span>
              <b>Green infrastructure level</b>
              <strong>{green}%</strong>
            </span>
            <input type="range" value={green} onChange={(e) => setGreen(+e.target.value)} />
          </div>
          <span className="mp-kicker">INCLUDED INTERVENTIONS</span>
          <div className="mp-applied-list">
            {(applied.length ? applied : ["flyover"]).map((id) => {
              const item = proposals.find((p) => p.id === id)!;
              return (
                <span key={id}>
                  <Icon name="check" size={12} />
                  {item.fullName}
                </span>
              );
            })}
          </div>
          <Button onClick={run} disabled={running}>
            <Icon name="play" size={15} />
            {running ? "Running model…" : "Run Simulation"}
          </Button>
        </aside>
        <section className={`mp-sim-results ${done ? "done" : ""}`}>
          <div className="mp-sim-summary">
            <div>
              <span className="mp-kicker">PROJECTED OUTCOME</span>
              <h2>{done ? "Network performance improved" : "Ready to simulate"}</h2>
              <p>
                {done
                  ? "The selected interventions improve mobility while maintaining an acceptable environmental trade-off."
                  : "Configure parameters and run the illustrative model to generate scenario results."}
              </p>
            </div>
            <div
              className="mp-score-ring"
              style={{ "--score": done ? "84%" : "0%" } as React.CSSProperties}
            >
              <span>
                <strong>{done ? "84" : "—"}</strong>Scenario score
              </span>
            </div>
          </div>
          <div className="mp-metric-grid">
            {metricData.map((m) => (
              <article key={m.label}>
                <header>
                  <span>{m.label}</span>
                  <strong>{done ? `${m.good > 0 ? "+" : ""}${m.good}%` : "Pending"}</strong>
                </header>
                <div className="mp-big-values">
                  <span>
                    <small>EXISTING</small>
                    {m.existing}
                    {m.unit}
                  </span>
                  <Icon name="chevron" size={17} />
                  <b>
                    <small>PROPOSED</small>
                    {done ? m.proposed : "—"}
                    {done ? m.unit : ""}
                  </b>
                </div>
                <div className="mp-sim-bars">
                  <i style={{ width: `${Math.min(100, Number(m.existing))}%` }} />
                  <i style={{ width: done ? `${Math.min(100, Number(m.proposed))}%` : "0%" }} />
                </div>
              </article>
            ))}
          </div>
          <div className="mp-chart-panel">
            <div className="mp-section-title">
              <div>
                <span>HOURLY NETWORK MODEL</span>
                <h3>Travel time by hour</h3>
              </div>
              <span className="mp-chart-legend">
                <i />
                Existing <i />
                Proposed
              </span>
            </div>
            <div className="mp-line-chart">
              <svg viewBox="0 0 700 140" preserveAspectRatio="none">
                <path className="grid" d="M0 25H700M0 70H700M0 115H700" />
                <polyline
                  className="existing-line"
                  points="0,100 80,92 160,48 240,25 320,64 400,82 480,37 560,54 640,91 700,103"
                />
                <polyline
                  className="proposed-line"
                  points={
                    done
                      ? "0,112 80,105 160,84 240,69 320,88 400,96 480,76 560,84 640,104 700,112"
                      : ""
                  }
                />
              </svg>
              <div>
                <span>06:00</span>
                <span>09:00</span>
                <span>12:00</span>
                <span>15:00</span>
                <span>18:00</span>
                <span>21:00</span>
              </div>
            </div>
          </div>
          <p className="mp-disclaimer">
            Illustrative sample results only. These values are not validated real-world predictions
            and require detailed transport, environmental and engineering studies.
          </p>
        </section>
      </div>
    </div>
  );
}

function ComparisonPage({
  preferred,
  setPreferred,
  selected,
}: {
  preferred: string;
  setPreferred: (id: string) => void;
  selected: string;
}) {
  const scenarios = [
    {
      id: "A",
      name: "Existing Infrastructure",
      proposal: selected,
      mode: "existing" as const,
      cost: "$0",
      traffic: "Baseline",
      environment: "Current impact",
      feasibility: "Existing",
      time: "—",
    },
    {
      id: "B",
      name: "Flyover Construction",
      proposal: "flyover",
      mode: "proposed" as const,
      cost: "$38.2M",
      traffic: "32% improvement",
      environment: "Moderate",
      feasibility: "High",
      time: "24–30 months",
    },
    {
      id: "C",
      name: "Integrated Mobility Plan",
      proposal: "widen",
      mode: "proposed" as const,
      cost: "$64.6M",
      traffic: "44% improvement",
      environment: "Moderate positive",
      feasibility: "Medium–High",
      time: "30–36 months",
    },
  ];
  return (
    <div className="mp-page">
      <PageHeader
        eyebrow="ALTERNATIVE ASSESSMENT"
        title="Scenario Comparison"
        description="Compare cost, performance and environmental trade-offs across three planning futures."
      />
      <div className="mp-scenario-grid">
        {scenarios.map((s) => (
          <article className={`mp-scenario ${preferred === s.id ? "preferred" : ""}`} key={s.id}>
            <header>
              <span>SCENARIO {s.id}</span>
              {preferred === s.id && (
                <em>
                  <Icon name="check" size={11} />
                  Preferred
                </em>
              )}
              <h2>{s.name}</h2>
            </header>
            <div className="mp-scenario-scene">
              <ScenePanel proposal={s.proposal} mode={s.mode} compact />
            </div>
            <dl>
              <div>
                <dt>Estimated cost</dt>
                <dd>{s.cost}</dd>
              </div>
              <div>
                <dt>Traffic improvement</dt>
                <dd className="positive">{s.traffic}</dd>
              </div>
              <div>
                <dt>Environmental impact</dt>
                <dd>{s.environment}</dd>
              </div>
              <div>
                <dt>Feasibility</dt>
                <dd>{s.feasibility}</dd>
              </div>
              <div>
                <dt>Implementation time</dt>
                <dd>{s.time}</dd>
              </div>
            </dl>
            <div className="mp-mini-score">
              <span>Overall planning score</span>
              <div>
                <i style={{ width: s.id === "A" ? "48%" : s.id === "B" ? "82%" : "88%" }} />
              </div>
              <strong>{s.id === "A" ? "48" : s.id === "B" ? "82" : "88"}</strong>
            </div>
            <Button secondary={preferred !== s.id} onClick={() => setPreferred(s.id)}>
              {preferred === s.id ? "Selected Scenario" : "Select as Preferred"}
            </Button>
          </article>
        ))}
      </div>
      <div className="mp-comparison-graph mp-panel">
        <div className="mp-section-title">
          <div>
            <span>NORMALIZED COMPARISON</span>
            <h3>Scenario performance profile</h3>
          </div>
        </div>
        {[
          "Mobility performance",
          "Cost efficiency",
          "Environmental value",
          "Implementation readiness",
        ].map((label, i) => (
          <div className="mp-compare-row" key={label}>
            <span>{label}</span>
            {scenarios.map((s, si) => (
              <div key={s.id}>
                <i
                  style={{
                    width: `${[48, 72, 62, 90, 82, 64, 71, 76, 88, 55, 84, 69][si * 4 + i]}%`,
                  }}
                />
                <b>{s.id}</b>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SustainabilityPage() {
  const metrics = [
    ["Carbon emissions", "−16%", "12 kt annual reduction", 72, "leaf" as IconName],
    ["Green cover", "+4.2%", "16.2% district coverage", 64, "leaf" as IconName],
    ["Energy efficiency", "+21%", "Public infrastructure", 78, "build" as IconName],
    ["Pedestrian accessibility", "+38%", "Safe access index", 86, "walk" as IconName],
  ];
  return (
    <div className="mp-page">
      <PageHeader
        eyebrow="ENVIRONMENTAL ASSESSMENT"
        title="Sustainability Analysis"
        description="Evaluate long-term environmental and social value across the preferred plan."
        action={<span className="mp-demo-badge">SCENARIO B · ILLUSTRATIVE</span>}
      />
      <div className="mp-sustain-hero">
        <div>
          <span className="mp-kicker">COMPOSITE SUSTAINABILITY SCORE</span>
          <h2>Positive district-level impact</h2>
          <p>
            The preferred plan balances mobility improvements with targeted green infrastructure and
            active-travel upgrades.
          </p>
        </div>
        <div className="mp-sustain-score">
          <strong>78</strong>
          <span>/ 100</span>
          <small>GOOD</small>
        </div>
        <div className="mp-radar">
          <svg viewBox="0 0 180 150">
            <polygon className="rings" points="90,8 166,51 147,135 33,135 14,51" />
            <polygon className="rings inner" points="90,38 136,65 125,113 55,113 44,65" />
            <polygon className="shape" points="90,20 148,56 132,122 45,120 28,56" />
          </svg>
          <span className="r1">Carbon</span>
          <span className="r2">Green cover</span>
          <span className="r3">Access</span>
          <span className="r4">Energy</span>
          <span className="r5">Resilience</span>
        </div>
      </div>
      <div className="mp-sustain-grid">
        {metrics.map(([label, value, sub, score, icon]) => (
          <article className="mp-panel" key={label as string}>
            <header>
              <span className="mp-square-icon">
                <Icon name={icon as IconName} size={18} />
              </span>
              <em>PROJECTED</em>
            </header>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{sub}</small>
            <div>
              <i style={{ width: `${score}%` }} />
            </div>
          </article>
        ))}
      </div>
      <div className="mp-sustain-bottom">
        <section className="mp-panel">
          <div className="mp-section-title">
            <div>
              <span>ENVIRONMENTAL BENEFITS</span>
              <h3>Expected co-benefits</h3>
            </div>
          </div>
          {[
            "Reduced idling emissions around Central Junction",
            "3.4 hectares of permeable landscaped public space",
            "Shaded pedestrian routes connecting transit and civic uses",
            "Bioswale capacity for high-intensity rainfall events",
          ].map((x) => (
            <p className="mp-benefit" key={x}>
              <Icon name="check" size={13} />
              {x}
            </p>
          ))}
        </section>
        <section className="mp-panel">
          <div className="mp-section-title">
            <div>
              <span>NEXT BEST ACTIONS</span>
              <h3>Sustainable infrastructure recommendations</h3>
            </div>
          </div>
          {[
            "Specify low-carbon concrete for flyover structures",
            "Retain and relocate mature roadside trees",
            "Install solar-powered adaptive signals",
            "Monitor mode shift at six-month intervals",
          ].map((x, i) => (
            <div className="mp-action-row" key={x}>
              <span>0{i + 1}</span>
              <p>{x}</p>
              <Icon name="chevron" size={13} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

function ReportsPage({
  project,
  applied,
  simulated,
  preferred,
  exportReport,
}: {
  project: Project;
  applied: string[];
  simulated: boolean;
  preferred: string;
  exportReport: (pdf?: boolean) => void;
}) {
  const sections = [
    "Executive summary",
    "Project details & selected area",
    "Urban problem assessment",
    "Proposed infrastructure",
    "3D existing / proposed views",
    "Simulation results",
    "Cost & feasibility",
    "Sustainability assessment",
    "Final recommendation",
  ];
  return (
    <div className="mp-page">
      <PageHeader
        eyebrow="DOCUMENT CENTRE"
        title="Reports & Export"
        description="Compile the complete planning workflow into an executive-ready project report."
        action={
          <div className="mp-header-actions">
            <Button secondary onClick={() => exportReport()}>
              <Icon name="download" size={14} />
              Download Report
            </Button>
            <Button onClick={() => exportReport(true)}>
              <Icon name="download" size={14} />
              Export PDF
            </Button>
          </div>
        }
      />
      <div className="mp-report-layout">
        <aside className="mp-panel mp-report-options">
          <span className="mp-kicker">REPORT CONFIGURATION</span>
          <h3>Included sections</h3>
          {sections.map((s) => (
            <label key={s}>
              <input type="checkbox" defaultChecked />
              <i>
                <Icon name="check" size={10} />
              </i>
              {s}
            </label>
          ))}
          <div className="mp-report-ready">
            <span>REPORT READINESS</span>
            <strong>{simulated ? "100%" : "82%"}</strong>
            <div>
              <i style={{ width: simulated ? "100%" : "82%" }} />
            </div>
            <small>
              {simulated ? "All workflow stages complete" : "Run simulation to complete results"}
            </small>
          </div>
        </aside>
        <section className="mp-report-preview">
          <div className="mp-paper">
            <header>
              <div className="brand-mark">
                <Icon name="city" size={20} />
              </div>
              <div>
                <strong>CITY OF TOMORROW</strong>
                <span>URBAN PLANNING ASSESSMENT</span>
              </div>
              <em>DEMONSTRATION REPORT</em>
            </header>
            <div className="mp-paper-title">
              <span>PLANNING REPORT · 2040</span>
              <h1>{project.name}</h1>
              <p>
                {project.city} · {project.area}
              </p>
            </div>
            <div className="mp-paper-scene">
              <ScenePanel proposal={applied.at(-1) || "flyover"} compact />
              <span>PROPOSED CITY MODEL</span>
            </div>
            <div className="mp-paper-summary">
              <div>
                <span>Preferred scenario</span>
                <strong>Scenario {preferred}</strong>
              </div>
              <div>
                <span>Estimated programme cost</span>
                <strong>{applied.length > 1 ? "$64.6M" : "$38.2M"}</strong>
              </div>
              <div>
                <span>Planning feasibility</span>
                <strong>High</strong>
              </div>
            </div>
            <section>
              <span>EXECUTIVE RECOMMENDATION</span>
              <p>
                Proceed to detailed feasibility assessment for the selected infrastructure package,
                subject to transport modelling, geotechnical review and stakeholder consultation.
              </p>
            </section>
            <footer>
              <span>Illustrative planning values · Not validated real-world predictions</span>
              <b>01</b>
            </footer>
          </div>
        </section>
        <aside className="mp-panel mp-report-status">
          <span className="mp-kicker">WORKFLOW COMPLETENESS</span>
          <h3>Project evidence</h3>
          {[
            ["Area selected", true],
            ["Problems identified", true],
            ["Proposal applied", applied.length > 0],
            ["Simulation completed", simulated],
            ["Scenario preferred", !!preferred],
            ["Sustainability assessed", true],
          ].map(([label, ready]) => (
            <div className={ready ? "ready" : ""} key={label as string}>
              <span>
                <Icon name={ready ? "check" : "clock"} size={13} />
              </span>
              <strong>{label}</strong>
              <small>{ready ? "Included" : "Pending"}</small>
            </div>
          ))}
          <p>All values in this report are demonstration data for concept evaluation.</p>
        </aside>
      </div>
    </div>
  );
}

export default function Platform() {
  const initialPage = (window.location.hash.replace("#/", "") || "overview") as PageId;
  const [page, setPage] = useState<PageId>(
    navItems.some((n) => n.id === initialPage) ? initialPage : "overview",
  );
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("cot-projects") || "") || initialProjects;
    } catch {
      return initialProjects;
    }
  });
  const [activeId, setActiveId] = useState(projects[0]?.id || 1);
  const activeProject =
    projects.find((p) => p.id === activeId) || projects[0] || initialProjects[0];
  const [area, setArea] = useState(activeProject.area);
  const [selected, setSelected] = useState("flyover");
  const [applied, setApplied] = useState<string[]>([]);
  const [simulated, setSimulated] = useState(false);
  const [preferred, setPreferred] = useState("B");
  const [mobileNav, setMobileNav] = useState(false);
  useEffect(() => {
    localStorage.setItem("cot-projects", JSON.stringify(projects));
  }, [projects]);
  useEffect(() => {
    const handler = () => {
      const next = window.location.hash.replace("#/", "") as PageId;
      if (navItems.some((n) => n.id === next)) setPage(next);
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  const go = (next: PageId) => {
    setPage(next);
    window.location.hash = `/${next}`;
    setMobileNav(false);
    window.scrollTo(0, 0);
  };
  const exportReport = (pdf = false) => {
    if (pdf) {
      window.print();
      return;
    }
    const chosen = applied
      .map((id) => proposals.find((p) => p.id === id)?.fullName)
      .filter(Boolean);
    const report = [
      `CITY OF TOMORROW — ${projectName(activeProject)}`,
      "Demonstration planning report",
      "",
      `City: ${activeProject.city}`,
      `Area: ${area}`,
      `Objective: ${activeProject.objective}`,
      `Budget: ${activeProject.budget}`,
      `Preferred scenario: ${preferred}`,
      `Applied infrastructure: ${chosen.join(", ") || "No proposal applied"}`,
      `Simulation: ${simulated ? "Completed" : "Pending"}`,
      "",
      "Final recommendation: Proceed to detailed feasibility assessment subject to validated engineering, transport and environmental studies.",
      "",
      "Disclaimer: Illustrative values only; not validated real-world predictions.",
    ].join("\n");
    const blob = new Blob([report], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "city-of-tomorrow-report.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const title = navItems.find((n) => n.id === page)?.label || "Overview";
  const pages = useMemo(
    () => ({
      overview: <OverviewPage go={go} project={activeProject} applied={applied} />,
      projects: (
        <ProjectsPage
          projects={projects}
          setProjects={setProjects}
          activeId={activeId}
          setActiveId={setActiveId}
          go={go}
        />
      ),
      explorer: <ExplorerPage area={area} setArea={setArea} go={go} />,
      studio: (
        <StudioPage
          selected={selected}
          setSelected={setSelected}
          applied={applied}
          setApplied={setApplied}
        />
      ),
      visualization: <VisualizationPage selected={selected} applied={applied} />,
      recommendations: (
        <RecommendationsPage
          selected={selected}
          setSelected={setSelected}
          setApplied={setApplied}
          go={go}
        />
      ),
      simulation: <SimulationPage applied={applied} setSimulated={setSimulated} />,
      comparison: (
        <ComparisonPage preferred={preferred} setPreferred={setPreferred} selected={selected} />
      ),
      sustainability: <SustainabilityPage />,
      reports: (
        <ReportsPage
          project={activeProject}
          applied={applied}
          simulated={simulated}
          preferred={preferred}
          exportReport={exportReport}
        />
      ),
    }),
    [page, projects, activeId, area, selected, applied, simulated, preferred],
  );
  return (
    <div className="mp-app">
      <aside className={`mp-sidebar ${mobileNav ? "open" : ""}`}>
        <div className="mp-brand">
          <div className="brand-mark">
            <Icon name="city" size={21} />
          </div>
          <div>
            <strong>City of Tomorrow</strong>
            <span>Plan Smarter. Build Better.</span>
          </div>
        </div>
        <nav>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={page === item.id ? "active" : ""}
              onClick={() => go(item.id)}
            >
              <Icon name={item.icon} size={17} />
              <span>{item.label}</span>
              <small>{item.step}</small>
            </button>
          ))}
        </nav>
        <div className="mp-sidebar-project">
          <span>CURRENT PROJECT</span>
          <strong>{activeProject.name}</strong>
          <small>
            <i />
            Demonstration workspace
          </small>
        </div>
        <div className="mp-sidebar-user">
          <span>AP</span>
          <div>
            <strong>Alex Patel</strong>
            <small>Urban Planning Lead</small>
          </div>
          <button>•••</button>
        </div>
      </aside>
      <div className="mp-main">
        <header className="mp-topbar">
          <button className="mp-menu" onClick={() => setMobileNav(!mobileNav)}>
            <Icon name="layers" size={19} />
          </button>
          <div>
            <span>WORKSPACE /</span>
            <strong>{title}</strong>
          </div>
          <div className="mp-top-project">
            <span>
              <Icon name="pin" size={13} />
              {area}
            </span>
            <i />
            <span>{activeProject.name}</span>
          </div>
          <div className="mp-top-actions">
            <span className="mp-demo-badge">DEMO DATA</span>
            <button title="Planning status">
              <Icon name="clock" size={16} />
              <i />
            </button>
            <button className="mp-avatar">AP</button>
          </div>
        </header>
        <div className="mp-content">{pages[page]}</div>
      </div>
    </div>
  );
}

function projectName(project: Project) {
  return project.name.toUpperCase();
}
