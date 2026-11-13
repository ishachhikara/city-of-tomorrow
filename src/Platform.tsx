import { useEffect, useState } from "react";
import { CityScene, Icon, IconName, metricData, problems, proposals } from "./App";
import "./platform.css";

type PageId="overview"|"projects"|"explorer"|"studio"|"visualization"|"recommendations"|"simulation"|"comparison"|"sustainability"|"reports";
type Project={id:number;name:string;city:string;area:string;objective:string;budget:string;status:string;updated:string};
const nav:{id:PageId;label:string;icon:IconName;step:string}[]=[
["overview","Overview","layers","01"],["projects","Projects","build","02"],["explorer","City Explorer","pin","03"],["studio","Urban Planning Studio","city","04"],["visualization","3D City Visualization","rotate","05"],["recommendations","Planning Recommendations","spark","06"],["simulation","Simulation Lab","play","07"],["comparison","Scenario Comparison","layers","08"],["sustainability","Sustainability Analysis","leaf","09"],["reports","Reports & Export","download","10"]
].map(([id,label,icon,step])=>({id:id as PageId,label,icon:icon as IconName,step}));
const initial:Project[]=[
{id:1,name:"Central Mobility Plan 2040",city:"Aurora City",area:"Central District · Sector 12",objective:"Reduce traffic congestion",budget:"$85M",status:"Active",updated:"Today"},
{id:2,name:"Riverside Green Corridor",city:"Aurora City",area:"Riverside Corridor · Sector 08",objective:"Increase green coverage",budget:"$42M",status:"In review",updated:"Yesterday"},
{id:3,name:"Innovation District Access",city:"Aurora City",area:"Innovation District · Sector 21",objective:"Improve connectivity",budget:"$64M",status:"Draft",updated:"12 Jun 2025"}];
const areas=["Central District · Sector 12","Riverside Corridor · Sector 08","Innovation District · Sector 21"];
const money=(n:number)=>`$${n.toFixed(1)}M`;
function Header({eyebrow,title,description,action}:{eyebrow:string;title:string;description:string;action?:React.ReactNode}){return <header className="mp-page-header"><div><span>{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{action}</header>;}
function Btn({children,onClick,secondary=false,disabled=false}:{children:React.ReactNode;onClick?:()=>void;secondary?:boolean;disabled?:boolean}){return <button className={`mp-button ${secondary?"secondary":""}`} onClick={onClick} disabled={disabled}>{children}</button>;}
function Scene({ids,mode="proposed",compact=false,labels=true}:{ids:string[];mode?:"existing"|"proposed";compact?:boolean;labels?:boolean}){
 const [zoom,setZoom]=useState(compact ? .74 : .9),[rotation,setRotation]=useState(-30),[view,setView]=useState(mode);
 useEffect(()=>setView(mode),[mode]);
 return <div className={`mp-scene ${compact?"compact":""} ${labels?"":"hide-labels"}`}><CityScene mode={view} proposal={ids[0]||"flyover"} showInfra zoom={zoom} rotation={rotation} onRotation={setRotation}/>{!compact&&<><div className="mp-scene-switch"><button className={view==="existing"?"active":""} onClick={()=>setView("existing")}>Existing</button><button className={view==="proposed"?"active":""} onClick={()=>setView("proposed")}>Proposed</button></div><div className="mp-scene-tools"><button onClick={()=>setRotation(x=>x+15)}><Icon name="rotate"/></button><button onClick={()=>setZoom(x=>Math.min(1.2,x+.08))}><Icon name="plus"/></button><button onClick={()=>setZoom(x=>Math.max(.62,x-.08))}><Icon name="minus"/></button><button onClick={()=>{setZoom(.9);setRotation(-30);}}><Icon name="reset"/></button></div></>}</div>;
}
function Overview({go,project,applied}:{go:(p:PageId)=>void;project:Project;applied:string[]}){
 return <div className="mp-page"><Header eyebrow="PLANNING COMMAND CENTRE" title="City planning overview" description="A unified view of your active urban transformation programme." action={<Btn onClick={()=>go("projects")}><Icon name="plus"/> Create New Project</Btn>}/><div className="mp-overview-grid"><section className="mp-hero-panel"><div className="mp-hero-copy"><span className="mp-kicker">ACTIVE PROJECT</span><h2>{project.name}</h2><p>Coordinated mobility and public-realm upgrades for {project.area}, with decision support across feasibility, sustainability and cost.</p><div className="mp-hero-meta"><span><Icon name="pin"/>{project.city}</span><span>Budget {project.budget}</span><span className="mp-live-dot">Demo model</span></div><div className="mp-hero-actions"><Btn onClick={()=>go("studio")}>Open Planning Studio</Btn><Btn secondary onClick={()=>go("visualization")}>View 3D City</Btn></div></div><div className="mp-hero-scene"><Scene ids={applied} compact/></div></section><section className="mp-stat-strip">{[["Active projects",String(1).padStart(2,"0"),"Current workspace"],["Critical problems","05","Illustrative diagnostics"],["Applied proposals",String(applied.length).padStart(2,"0"),"Shared workflow"],["Planning readiness",applied.length?"84%":"62%","Illustrative assessment"]].map(x=><div key={x[0]}><span>{x[0]}</span><strong>{x[1]}</strong><small>{x[2]}</small></div>)}</section><section className="mp-panel mp-problem-summary"><div className="mp-section-title"><div><span>URBAN DIAGNOSTICS</span><h3>Major planning problems</h3></div><button onClick={()=>go("studio")}>Open studio</button></div>{problems.slice(0,4).map(x=><div className="mp-problem-row" key={x.id}><span className="mp-square-icon"><Icon name={x.icon}/></span><div><strong>{x.label}</strong><small>{x.detail}</small></div><div className="mp-severity"><i style={{width:`${x.score}%`}}/></div><b>{x.score}</b></div>)}</section><section className="mp-panel mp-rec-summary"><div className="mp-section-title"><div><span>PLANNING PRIORITIES</span><h3>Recommended interventions</h3></div><button onClick={()=>go("recommendations")}>View all</button></div>{proposals.slice(0,3).map((x,i)=><button className="mp-rec-row" key={x.id} onClick={()=>go("recommendations")}><span>0{i+1}</span><div><strong>{x.fullName}</strong><small>{x.cost} · {x.feasibility} feasibility</small></div><em>{x.impact}</em><Icon name="chevron"/></button>)}</section></div></div>;
}
function Projects({projects,setProjects,activeId,setActiveId,go}:{projects:Project[];setProjects:React.Dispatch<React.SetStateAction<Project[]>>;activeId:number;setActiveId:(n:number)=>void;go:(p:PageId)=>void}){
 const [q,setQ]=useState(""),[open,setOpen]=useState(false),[edit,setEdit]=useState<number|null>(null);
 const blank={name:"",city:"Aurora City",area:areas[0],objective:"Reduce traffic congestion",budget:"$50M"};
 const [form,setForm]=useState(blank);
 const list=projects.filter(p=>`${p.name} ${p.city} ${p.area} ${p.objective}`.toLowerCase().includes(q.toLowerCase()));
 const save=()=>{if(!form.name.trim())return;if(edit!==null)setProjects(a=>a.map(p=>p.id===edit?{...p,...form,updated:"Just now"}:p));else{const id=Date.now();setProjects(a=>[{...form,id,status:"Draft",updated:"Just now"},...a]);setActiveId(id);}setOpen(false);};
 const remove=(id:number)=>{if(!confirm("Delete this project?"))return;const next=projects.filter(p=>p.id!==id);setProjects(next);if(activeId===id&&next.length)setActiveId(next[0].id);};
 return <div className="mp-page"><Header eyebrow="PROJECT PORTFOLIO" title="Planning projects" description="Create, manage and continue urban planning programmes." action={<Btn onClick={()=>{setForm(blank);setEdit(null);setOpen(true);}}><Icon name="plus"/> New Planning Project</Btn>}/><div className="mp-project-toolbar"><div><strong>{list.length} projects</strong><span>All planning programmes</span></div><label><Icon name="spark"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search projects…"/></label></div><div className="mp-project-grid">{list.map(p=><article className={`mp-project-card ${activeId===p.id?"selected":""}`} key={p.id}><div className="mp-project-thumb"><Scene ids={[]} compact/><span>{p.status}</span></div><div className="mp-project-body"><small>{p.city} · {p.area}</small><h3>{p.name}</h3><dl><div><dt>Objective</dt><dd>{p.objective}</dd></div><div><dt>Budget</dt><dd>{p.budget}</dd></div></dl><div className="mp-project-foot"><span>Updated {p.updated}</span><div><button onClick={()=>{setForm({name:p.name,city:p.city,area:p.area,objective:p.objective,budget:p.budget});setEdit(p.id);setOpen(true);}}>Edit</button><button onClick={()=>remove(p.id)}>Delete</button><button className="open" onClick={()=>{setActiveId(p.id);go("explorer");}}>Open <Icon name="chevron"/></button></div></div></div></article>)}</div>{!list.length&&<p>No matching projects found.</p>}{open&&<div className="mp-modal-backdrop" onMouseDown={()=>setOpen(false)}><form className="mp-modal" onMouseDown={e=>e.stopPropagation()} onSubmit={e=>{e.preventDefault();save();}}><span className="mp-kicker">{edit!==null?"EDIT PROJECT":"NEW PLANNING PROJECT"}</span><h2>{edit!==null?"Update project details":"Create a planning programme"}</h2><div className="mp-form-grid"><label className="wide">Project name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>City<input value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/></label><label>Planning area<select value={form.area} onChange={e=>setForm({...form,area:e.target.value})}>{areas.map(a=><option key={a}>{a}</option>)}</select></label><label>Objective<select value={form.objective} onChange={e=>setForm({...form,objective:e.target.value})}>{["Reduce traffic congestion","Increase green coverage","Improve connectivity","Improve pedestrian safety"].map(x=><option key={x}>{x}</option>)}</select></label><label>Budget<input value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}/></label></div><div className="mp-modal-actions"><Btn secondary onClick={()=>setOpen(false)}>Cancel</Btn><Btn>{edit!==null?"Save Changes":"Create Project"}</Btn></div></form></div>}</div>;
}
function Explorer({area,setArea,go}:{area:string;setArea:(s:string)=>void;go:(p:PageId)=>void}){
 const [q,setQ]=useState("");const list=areas.filter(a=>a.toLowerCase().includes(q.toLowerCase()));
 return <div className="mp-page mp-explorer-page"><Header eyebrow="AREA DISCOVERY" title="City Explorer" description="Locate and define the urban area to be assessed."/><div className="mp-explorer"><aside className="mp-explorer-side"><label className="mp-search"><Icon name="pin"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search city or locality"/></label><span className="mp-kicker">PLANNING AREAS</span>{list.map((a,i)=><button className={`mp-area-option ${area===a?"active":""}`} key={a} onClick={()=>setArea(a)}><span>0{i+1}</span><div><strong>{a.split(" · ")[0]}</strong><small>{a.split(" · ")[1]} · 4.8 km²</small></div><Icon name="chevron"/></button>)}{!list.length&&<small>No matching area.</small>}<div className="mp-area-detail"><span>SELECTED AREA</span><h3>{area}</h3><dl><div><dt>Primary road</dt><dd>Civic Avenue</dd></div><div><dt>Major junctions</dt><dd>7</dd></div><div><dt>Buildings mapped</dt><dd>284</dd></div><div><dt>Green cover</dt><dd>12.1%</dd></div></dl></div><Btn onClick={()=>go("studio")}>Confirm Area & Continue</Btn></aside><section className="mp-map"><div className="mp-map-grid"/><div className="mp-map-road arterial a1"><span>CIVIC AVENUE</span></div><div className="mp-map-road arterial a2"><span>MERIDIAN ROAD</span></div><div className="mp-map-road local l1"/><div className="mp-map-road local l2"/><div className="mp-map-road local l3"/><div className="mp-map-river"/><div className="mp-map-park p1">Central Park</div><div className="mp-map-park p2">River Garden</div><div className="mp-map-buildings b1"/><div className="mp-map-buildings b2"/><div className="mp-map-buildings b3"/><button className="mp-selected-zone" onClick={()=>setArea(areas[0])}><i/><span>SELECTED PLANNING AREA<strong>{area}</strong></span></button><span className="mp-map-pin pin1"><Icon name="pin"/>Transit Hub</span><span className="mp-map-pin pin2"><Icon name="pin"/>Civic Centre</span><div className="mp-map-legend"><span><i/>Selected area</span><span><i/>Major road</span><span><i/>Green space</span></div><div className="mp-map-note">Simplified demonstration basemap · Not a live GIS feed</div></section></div></div>;
}
function Studio({selected,setSelected,applied,setApplied}:{selected:string;setSelected:(s:string)=>void;applied:string[];setApplied:React.Dispatch<React.SetStateAction<string[]>>}){
 const [problem,setProblem]=useState("traffic"),[history,setHistory]=useState<string[][]>([]);
 const current=proposals.find(p=>p.id===selected)||proposals[0];const commit=(next:string[])=>{setHistory(h=>[...h,applied]);setApplied(next);};
 return <div className="mp-page mp-studio-page"><Header eyebrow="CORE WORKSPACE" title="Urban Planning Studio" description="Diagnose constraints and apply infrastructure improvements to the shared city model."/><div className="mp-studio"><aside className="mp-studio-panel"><span className="mp-kicker">01 · EXISTING PROBLEMS</span><h3>Urban constraints</h3><p>Select a diagnosed issue to focus the planning model.</p><div className="mp-studio-list">{problems.map(x=><button className={problem===x.id?"active":""} key={x.id} onClick={()=>{setProblem(x.id);const m=proposals.find(p=>p.problem===x.label)||(x.id==="gaps"?proposals.find(p=>p.id==="widen"):undefined);if(m)setSelected(m.id);}}><span><Icon name={x.icon}/></span><div><strong>{x.label}</strong><small>{x.detail}</small></div><b>{x.score}</b></button>)}</div><div className="mp-diagnostic"><span>MODEL FINDING</span><p>Peak-hour delay is concentrated at the central four-arm junction. All findings are illustrative.</p></div></aside><section className="mp-studio-city"><div className="mp-studio-bar"><span><i/> SHARED CITY MODEL</span><strong>{current.location}</strong><em>{applied.length} applied</em></div><Scene ids={applied.length?applied:[selected]}/><div className="mp-studio-actions"><button disabled={!history.length} onClick={()=>{if(history.length){setApplied(history.at(-1)!);setHistory(h=>h.slice(0,-1));}}}><Icon name="reset"/> Undo</button><button disabled={!applied.length} onClick={()=>commit([])}><Icon name="reset"/> Reset All</button><button className={applied.includes(selected)?"applied":""} onClick={()=>{if(!applied.includes(selected))commit([...applied,selected]);}}><Icon name="check"/>{applied.includes(selected)?"Proposal Applied":"Apply Proposal"}</button></div></section><aside className="mp-studio-panel right"><span className="mp-kicker">02 · PROPOSED IMPROVEMENTS</span><h3>Intervention library</h3><p>Select an improvement to preview it on the 3D model.</p><div className="mp-improvement-list">{proposals.map(x=><button className={selected===x.id?"active":""} key={x.id} onClick={()=>setSelected(x.id)}><span><Icon name={x.icon}/></span><div><strong>{x.fullName}</strong><small>{x.cost} · {x.impact}</small></div><Icon name={applied.includes(x.id)?"check":"chevron"}/></button>)}</div><div className="mp-selection-detail"><span>SELECTED PROPOSAL</span><strong>{current.solution}</strong><dl><div><dt>Feasibility</dt><dd>{current.feasibility}</dd></div><div><dt>Timeline</dt><dd>{current.timeline}</dd></div></dl></div></aside></div></div>;
}
function Visualization({selected,applied}:{selected:string;applied:string[]}){const [labels,setLabels]=useState(true);return <div className="mp-page mp-viz-page"><Header eyebrow="DIGITAL TWIN VIEWER" title="3D City Visualization" description="Inspect the existing city and applied infrastructure in an immersive architectural model." action={<span className="mp-demo-badge">DEMONSTRATION MODEL</span>}/><div className="mp-viz-toolbar"><div><span className="mp-live-dot">Model synchronized</span><strong>Central Junction · Sector 12</strong></div><label className="mp-check"><input type="checkbox" checked={labels} onChange={e=>setLabels(e.target.checked)}/><i/>Infrastructure labels</label><span>{applied.length} applied interventions</span></div><div className="mp-immersive-scene"><Scene ids={applied.length?applied:[selected]} labels={labels}/><div className="mp-infra-label fly"><span>PROPOSED</span>Applied infrastructure</div><div className="mp-infra-label junction"><span>JUNCTION</span>Central intersection</div><div className="mp-viz-data"><span>MODEL EXTENT<strong>4.8 km²</strong></span><span>BUILDINGS<strong>284</strong></span><span>ROAD NETWORK<strong>18.6 km</strong></span><span>COORDINATE VIEW<strong>35° / 142°</strong></span></div></div></div>;}

function Recommendations({
  selected,
  setSelected,
  applied,
  setApplied,
  go,
}: {
  selected: string;
  setSelected: (s: string) => void;
  applied: string[];
  setApplied: React.Dispatch<React.SetStateAction<string[]>>;
  go: (p: PageId) => void;
}) {
  return (
    <div className="mp-page">
      <Header
        eyebrow="URBAN PLANNING GUIDANCE"
        title="Planning Recommendations"
        description="Explore proposed infrastructure improvements, compare feasibility and select interventions for your city."
        action={<span className="mp-demo-badge">PLANNING WORKSPACE</span>}
      />

      <div className="mp-recommendation-grid">
        {proposals.map((p, i) => (
          <article
            className={`mp-recommendation-card ${
              selected === p.id ? "selected" : ""
            }`}
            key={p.id}
          >
            <header>
              <span className="mp-rec-number">0{i + 1}</span>
              <span className="mp-square-icon">
                <Icon name={p.icon} />
              </span>
              <div>
                <small>RECOMMENDED INTERVENTION</small>
                <h3>{p.fullName}</h3>
              </div>
              <em>{p.feasibility}</em>
            </header>

            <p>
              <strong>Detected problem:</strong> {p.problem}. {p.solution} is
              recommended for further feasibility assessment.
            </p>

            <div className="mp-rec-facts">
              {[
                ["Estimated cost", p.cost],
                ["Land requirement", p.land],
                ["Expected benefit", p.impact],
                ["Timeline", p.timeline],
              ].map((x) => (
                <div key={x[0]}>
                  <span>{x[0]}</span>
                  <strong>{x[1]}</strong>
                </div>
              ))}
            </div>

            <div className="mp-rec-analysis">
              <div>
                <span>Environmental impact</span>
                <p>{p.environment}</p>
              </div>
              <div>
                <span>Possible drawback</span>
                <p>{p.drawbacks}</p>
              </div>
            </div>

            <footer>
              <button
                onClick={() => {
                  setSelected(p.id);
                  go("visualization");
                }}
              >
                View in 3D
              </button>

              <button
                onClick={() => {
                  setSelected(p.id);
                  setApplied((a) =>
                    a.includes(p.id) ? a : [...a, p.id]
                  );
                  go("studio");
                }}
              >
                {applied.includes(p.id)
                  ? "Already applied"
                  : "Add to Planning Studio"}
              </button>

              <button
                className="primary"
                onClick={() => {
                  setSelected(p.id);
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
function calculate(ids:string[],budget:number,traffic:number,green:number,objective:string){
 const chosen=ids.map(id=>proposals.find(p=>p.id===id)).filter(Boolean);const cost=chosen.reduce((s,p)=>s+Number((p!.cost.match(/[\d.]+/)||["0"])[0]),0);const factor=Math.min(1.25,Math.max(.25,budget/(cost||1)));
 const mobility=Math.min(65,Math.max(0,((ids.includes("flyover")?18:0)+(ids.includes("signals")?13:0)+(ids.includes("widen")?10:0)+traffic*.18)*factor));
 const greenGain=(ids.includes("park")?4.2:0)+(green/100)*3.5;const carbon=Math.max(35,Math.round(76-greenGain*1.4+(ids.includes("flyover")?5:0)));
 const proposed=[{label:"Congestion index",existing:82,value:Math.round(82-mobility),unit:"/100",change:Math.round(mobility/82*100)},{label:"Avg. travel time",existing:34,value:Math.max(12,Math.round(34*(1-mobility/120))),unit:" min",change:Math.round(mobility/120*100)},{label:"Road capacity",existing:64,value:Math.min(100,Math.round(64+((ids.includes("flyover")?18:0)+(ids.includes("widen")?10:0)+(ids.includes("signals")?8:0))*factor)),unit:"%",change:Math.round(mobility/2)},{label:"Carbon emissions",existing:76,value:carbon,unit:" kt",change:Math.round((76-carbon)/76*100)},{label:"Green coverage",existing:12,value:Number((12+greenGain).toFixed(1)),unit:"%",change:Math.round(greenGain/12*100)}];
 const score=Math.min(100,Math.max(0,Math.round(48+mobility*.45+greenGain*1.5+(ids.includes("walkways")?8:0)-(cost>budget?12:0)+(objective==="Improve sustainability"?5:0))));
 return {cost,proposed,score,withinBudget:cost<=budget};
}
type SimResult=ReturnType<typeof calculate>;
function Simulation({applied,onComplete,onInvalidate}:{applied:string[];onComplete:(r:SimResult)=>void;onInvalidate:()=>void}){
 const [budget,setBudget]=useState(65),[traffic,setTraffic]=useState(72),[green,setGreen]=useState(35),[objective,setObjective]=useState("Reduce traffic congestion"),[running,setRunning]=useState(false),[result,setResult]=useState<SimResult|null>(null);
 useEffect(()=>{setResult(null);onInvalidate();},[applied,budget,traffic,green,objective]);
 const run=()=>{setRunning(true);window.setTimeout(()=>{const r=calculate(applied,budget,traffic,green,objective);setResult(r);onComplete(r);setRunning(false);},400);};
 const included=applied.map(id=>proposals.find(p=>p.id===id)).filter(Boolean);
 return <div className="mp-page"><Header eyebrow="IMPACT MODELLING" title="Simulation Lab" description="Test planning interventions against adjustable development priorities." action={<span className="mp-demo-badge">SAMPLE MODEL · NOT VALIDATED</span>}/><div className="mp-sim-layout"><aside className="mp-panel mp-sim-controls"><span className="mp-kicker">SIMULATION PARAMETERS</span><h3>Scenario configuration</h3><label>Planning objective<select value={objective} onChange={e=>setObjective(e.target.value)}><option>Reduce traffic congestion</option><option>Improve sustainability</option><option>Balance mobility and environment</option></select></label>{[[budget,setBudget,20,120,"Budget allocation",`$${budget}M`],[traffic,setTraffic,0,100,"Traffic improvement target",`${traffic}%`],[green,setGreen,0,100,"Green infrastructure level",`${green}%`]].map(([v,set,min,max,label,value]:any)=><div className="mp-range" key={label}><span><b>{label}</b><strong>{value}</strong></span><input type="range" min={min} max={max} value={v} onChange={e=>set(+e.target.value)}/></div>)}<span className="mp-kicker">INCLUDED INTERVENTIONS</span><div className="mp-applied-list">{included.length?included.map(p=><span key={p!.id}><Icon name="check"/>{p!.fullName}</span>):<span>No interventions applied yet</span>}</div><Btn onClick={run} disabled={running}>{running?"Running model…":"Run Simulation"}</Btn></aside><section className={`mp-sim-results ${result?"done":""}`}><div className="mp-sim-summary"><div><span className="mp-kicker">PROJECTED OUTCOME</span><h2>{result?"Scenario results calculated":"Ready to simulate"}</h2><p>{result?`${result.withinBudget?"Within":"Above"} selected budget. Values are calculated from your demo parameters.`:"Apply interventions, configure parameters and run the illustrative model."}</p></div><div className="mp-score-ring" style={{"--score":result?`${result.score}%`:"0%"} as React.CSSProperties}><span><strong>{result?result.score:"—"}</strong>Scenario score</span></div></div><div className="mp-metric-grid">{metricData.map((m,i)=>{const r=result?.proposed[i];return <article key={m.label}><header><span>{m.label}</span><strong>{r?`${r.change}%`:"Pending"}</strong></header><div className="mp-big-values"><span><small>EXISTING</small>{m.existing}{m.unit}</span><Icon name="chevron"/><b><small>PROPOSED</small>{r?`${r.value}${r.unit}`:"—"}</b></div><div className="mp-sim-bars"><i style={{width:`${Math.min(100,m.existing)}%`}}/><i style={{width:r?`${Math.min(100,Number(r.value))}%`:"0%"}}/></div></article>;})}</div><div className="mp-chart-panel"><div className="mp-section-title"><div><span>HOURLY NETWORK MODEL</span><h3>Travel time by hour</h3></div><span className="mp-chart-legend"><i/>Existing <i/>Proposed</span></div><div className="mp-line-chart"><svg viewBox="0 0 700 140" preserveAspectRatio="none"><path className="grid" d="M0 25H700M0 70H700M0 115H700"/><polyline className="existing-line" points="0,100 80,92 160,48 240,25 320,64 400,82 480,37 560,54 640,91 700,103"/><polyline className="proposed-line" points={result?"0,112 80,105 160,84 240,69 320,88 400,96 480,76 560,84 640,104 700,112":""}/></svg><div><span>06:00</span><span>09:00</span><span>12:00</span><span>15:00</span><span>18:00</span><span>21:00</span></div></div></div><p className="mp-disclaimer">Illustrative calculations only; not validated real-world predictions. Detailed transport, environmental and engineering studies are required.</p></section></div></div>;
}
function Comparison({preferred,setPreferred,selected,applied}:{preferred:string;setPreferred:(s:string)=>void;selected:string;applied:string[]}){
 const scenarios=[{id:"A",name:"Existing Infrastructure",ids:[],cost:"$0",score:48},{id:"B",name:"Selected Intervention",ids:[selected],cost:proposals.find(p=>p.id===selected)?.cost||"—",score:72},{id:"C",name:"Integrated Mobility Plan",ids:applied.length?applied:["flyover","signals","park"],cost:"Combined package",score:84}];
 return <div className="mp-page"><Header eyebrow="ALTERNATIVE ASSESSMENT" title="Scenario Comparison" description="Compare alternative planning futures."/><div className="mp-scenario-grid">{scenarios.map(s=><article className={`mp-scenario ${preferred===s.id?"preferred":""}`} key={s.id}><header><span>SCENARIO {s.id}</span>{preferred===s.id&&<em>✓ Preferred</em>}<h2>{s.name}</h2></header><div className="mp-scenario-scene"><Scene ids={s.ids} compact/></div><dl><div><dt>Estimated cost</dt><dd>{s.cost}</dd></div><div><dt>Interventions</dt><dd>{s.ids.length}</dd></div><div><dt>Assessment</dt><dd>Illustrative only</dd></div></dl><div className="mp-mini-score"><span>Planning score</span><div><i style={{width:`${s.score}%`}}/></div><strong>{s.score}</strong></div><Btn secondary={preferred!==s.id} onClick={()=>setPreferred(s.id)}>{preferred===s.id?"Selected Scenario":"Select as Preferred"}</Btn></article>)}</div><p className="mp-disclaimer">Scenario scores are indicative demo values, not validated predictions.</p></div>;
}
function Sustainability({applied}:{applied:string[]}){const metrics=[["Carbon emissions",applied.includes("park")?"−12%":"−3%",72,"leaf" as IconName],["Green cover",applied.includes("park")?"+4.2%":"+1.2%",64,"leaf" as IconName],["Energy efficiency","+8%",58,"build" as IconName],["Pedestrian accessibility",applied.includes("walkways")?"+38%":"+12%",86,"walk" as IconName]];return <div className="mp-page"><Header eyebrow="ENVIRONMENTAL ASSESSMENT" title="Sustainability Analysis" description="Evaluate environmental and social value across the selected plan."/><div className="mp-sustain-hero"><div><span className="mp-kicker">COMPOSITE SUSTAINABILITY SCORE</span><h2>{applied.includes("park")?"Green infrastructure included":"Potential environmental improvements"}</h2><p>Indicators update based on applied interventions.</p></div><div className="mp-sustain-score"><strong>{applied.includes("park")?78:62}</strong><span>/ 100</span><small>ILLUSTRATIVE</small></div></div><div className="mp-sustain-grid">{metrics.map(([label,value,score,icon])=><article className="mp-panel" key={label as string}><header><span className="mp-square-icon"><Icon name={icon as IconName}/></span><em>PROJECTED</em></header><span>{label}</span><strong>{value}</strong><small>Indicative change</small><div><i style={{width:`${score}%`}}/></div></article>)}</div><p className="mp-disclaimer">Environmental values are indicative placeholders requiring detailed assessment.</p></div>;}
const reportSections=["Executive summary","Project details & selected area","Urban problem assessment","Proposed infrastructure","3D existing / proposed views","Simulation results","Cost & feasibility","Sustainability assessment","Final recommendation"];
function Reports({project,area,applied,simulated,preferred,exportReport,checked,setChecked}:{project:Project;area:string;applied:string[];simulated:boolean;preferred:string;exportReport:(pdf?:boolean)=>void;checked:string[];setChecked:React.Dispatch<React.SetStateAction<string[]>>}){
 const sections=reportSections;
 return <div className="mp-page"><Header eyebrow="DOCUMENT CENTRE" title="Reports & Export" description="Compile selected sections into a planning report." action={<div className="mp-header-actions"><Btn secondary onClick={()=>exportReport()}>Download Report</Btn><Btn onClick={()=>exportReport(true)}>Export PDF</Btn></div>}/><div className="mp-report-layout"><aside className="mp-panel mp-report-options"><span className="mp-kicker">REPORT CONFIGURATION</span><h3>Included sections</h3>{sections.map(s=><label key={s}><input type="checkbox" checked={checked.includes(s)} onChange={()=>setChecked(a=>a.includes(s)?a.filter(x=>x!==s):[...a,s])}/><i><Icon name="check"/></i>{s}</label>)}<div className="mp-report-ready"><span>REPORT READINESS</span><strong>{simulated?"100%":"82%"}</strong><div><i style={{width:simulated?"100%":"82%"}}/></div><small>{checked.length} sections selected</small></div></aside><section className="mp-report-preview"><div className="mp-paper"><header><div className="brand-mark"><Icon name="city"/></div><div><strong>CITY OF TOMORROW</strong><span>URBAN PLANNING ASSESSMENT</span></div><em>DEMONSTRATION REPORT</em></header><div className="mp-paper-title"><span>PLANNING REPORT · 2040</span><h1>{project.name}</h1><p>{project.city} · {area}</p></div><div className="mp-paper-scene"><Scene ids={applied} compact/><span>PROPOSED CITY MODEL</span></div><div className="mp-paper-summary"><div><span>Preferred scenario</span><strong>Scenario {preferred}</strong></div><div><span>Applied interventions</span><strong>{applied.length}</strong></div><div><span>Simulation</span><strong>{simulated?"Complete":"Pending"}</strong></div></div><section><span>SELECTED REPORT SECTIONS</span>{checked.map(s=><p key={s}>• {s}</p>)}</section><footer><span>Illustrative planning values · Not validated real-world predictions</span><b>01</b></footer></div></section><aside className="mp-panel mp-report-status"><span className="mp-kicker">WORKFLOW COMPLETENESS</span><h3>Project evidence</h3>{[["Area selected",true],["Proposal applied",applied.length>0],["Simulation completed",simulated],["Scenario preferred",!!preferred]].map(([label,ok])=><div className={ok?"ready":""} key={label as string}><span><Icon name={ok?"check":"clock"}/></span><strong>{label}</strong><small>{ok?"Included":"Pending"}</small></div>)}</aside></div></div>;
}
export default function Platform(){
 const initialPage=(window.location.hash.replace("#/","")||"overview") as PageId;const [page,setPage]=useState<PageId>(nav.some(n=>n.id===initialPage)?initialPage:"overview");
 const [projects,setProjects]=useState<Project[]>(()=>{try{return JSON.parse(localStorage.getItem("cot-projects")||"")||initial;}catch{return initial;}});const [activeId,setActiveId]=useState(projects[0]?.id||1);const active=projects.find(p=>p.id===activeId)||projects[0]||initial[0];
 const [area,setArea]=useState(active.area),[selected,setSelected]=useState("flyover"),[applied,setApplied]=useState<string[]>([]),[simulated,setSimulated]=useState(false),[simResult,setSimResult]=useState<SimResult|null>(null),[preferred,setPreferred]=useState("B"),[mobile,setMobile]=useState(false),[reportIncluded,setReportIncluded]=useState<string[]>(reportSections);
 useEffect(()=>{localStorage.setItem("cot-projects",JSON.stringify(projects));},[projects]);useEffect(()=>{setArea(active.area);},[activeId]);
 useEffect(()=>{const f=()=>{const n=window.location.hash.replace("#/","") as PageId;if(nav.some(x=>x.id===n))setPage(n);};window.addEventListener("hashchange",f);return()=>window.removeEventListener("hashchange",f);},[]);
 const go=(p:PageId)=>{setPage(p);window.location.hash=`/${p}`;setMobile(false);window.scrollTo(0,0);};
 const exportReport=(pdf=false)=>{const chosen=applied.map(id=>proposals.find(p=>p.id===id)?.fullName).filter(Boolean);const lines=[`CITY OF TOMORROW — ${active.name}`,"Demonstration planning report","",`City: ${active.city}`,`Area: ${area}`,`Objective: ${active.objective}`,`Budget: ${active.budget}`,`Preferred scenario: ${preferred}`,`Applied infrastructure: ${chosen.join(", ")||"None"}`,`Simulation: ${simulated?"Completed":"Pending"}`,`Included sections: ${reportIncluded.join(", ")||"None selected"}`,...(simResult?["",`Score: ${simResult.score}`,`Combined estimated cost: ${money(simResult.cost)}`,...simResult.proposed.map(m=>`${m.label}: ${m.existing}${m.unit} → ${m.value}${m.unit} (${m.change}% indicative change)` )]:[]),"","Disclaimer: Illustrative values only; not validated real-world predictions."];if(pdf){const w=window.open("","_blank");if(!w){alert("Allow pop-ups to print the report.");return;}const safe=lines.map(x=>x.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]!))).join("<br>");w.document.write(`<html><head><title>City of Tomorrow</title><style>body{font:14px Arial;padding:40px;line-height:1.6}</style></head><body><h1>CITY OF TOMORROW</h1>${safe}<script>window.onload=()=>window.print()</script></body></html>`);w.document.close();return;}const blob=new Blob([lines.join("\n")],{type:"text/plain;charset=utf-8"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="city-of-tomorrow-report.txt";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
 const pages:Record<PageId,React.ReactNode>={overview:<Overview go={go} project={active} applied={applied}/>,projects:<Projects projects={projects} setProjects={setProjects} activeId={activeId} setActiveId={setActiveId} go={go}/>,explorer:<Explorer area={area} setArea={setArea} go={go}/>,studio:<Studio selected={selected} setSelected={setSelected} applied={applied} setApplied={setApplied}/>,visualization:<Visualization selected={selected} applied={applied}/>,recommendations:<Recommendations selected={selected} setSelected={setSelected} applied={applied} setApplied={setApplied} go={go}/>,simulation:<Simulation applied={applied} onComplete={r=>{setSimResult(r);setSimulated(true);}} onInvalidate={()=>{setSimResult(null);setSimulated(false);}}/>,comparison:<Comparison preferred={preferred} setPreferred={setPreferred} selected={selected} applied={applied}/>,sustainability:<Sustainability applied={applied}/>,reports:<Reports project={active} area={area} applied={applied} simulated={simulated} preferred={preferred} exportReport={exportReport} checked={reportIncluded} setChecked={setReportIncluded}/>};
 const title=nav.find(n=>n.id===page)?.label||"Overview";
 return <div className="mp-app"><aside className={`mp-sidebar ${mobile?"open":""}`}><div className="mp-brand"><div className="brand-mark"><Icon name="city" size={21}/></div><div><strong>City of Tomorrow</strong><span>Plan Smarter. Build Better.</span></div></div><nav>{nav.map(n=><button key={n.id} className={page===n.id?"active":""} onClick={()=>go(n.id)}><Icon name={n.icon} size={17}/><span>{n.label}</span><small>{n.step}</small></button>)}</nav><div className="mp-sidebar-project"><span>CURRENT PROJECT</span><strong>{active.name}</strong><small><i/>Demonstration workspace</small></div><div className="mp-sidebar-user"><span>AP</span><div><strong>Planning Team</strong><small>Urban Planning Workspace</small></div><button>•••</button></div></aside><div className="mp-main"><header className="mp-topbar"><button className="mp-menu" onClick={()=>setMobile(x=>!x)}><Icon name="layers"/></button><div><span>WORKSPACE /</span><strong>{title}</strong></div><div className="mp-top-project"><span><Icon name="pin"/>{area}</span><i/><span>{active.name}</span></div><div className="mp-top-actions"><span className="mp-demo-badge">DEMO DATA</span><button title="Planning status"><Icon name="clock"/><i/></button><button className="mp-avatar">AP</button></div></header><div className="mp-content">{pages[page]}</div></div></div>;
}
