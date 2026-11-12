import { CSSProperties, PointerEvent, useRef } from "react";

export type IconName = "city"|"play"|"download"|"traffic"|"road"|"leaf"|"walk"|"build"|"layers"|"rotate"|"plus"|"minus"|"reset"|"check"|"clock"|"spark"|"chevron"|"pin";
const paths: Record<IconName, React.ReactNode> = {
 city:<path d="M3 21h18M5 21V8l5-4v17M10 10l5-3v14M15 11h4v10M7 9v1M7 13v1M7 17v1M12 11v1M12 15v1"/>,
 play:<path d="m8 5 11 7-11 7V5Z"/>,download:<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/>,
 traffic:<><path d="M5 19h14M7 16l2-9h6l2 9M9 10h6M8 16h8M10 4h4"/><circle cx="9.5" cy="16" r="1"/><circle cx="14.5" cy="16" r="1"/></>,
 road:<path d="m7 21 2-18m8 18L15 3M12 5v3m0 4v3m0 4v2"/>,leaf:<><path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16Z"/><path d="M4 21c3-6 7-9 13-13"/></>,
 walk:<><circle cx="13" cy="4" r="2"/><path d="m10 21 2-7-3-3m3 3 4 3m-6-9 4 1 3 3M7 21l3-5"/></>,
 build:<path d="M3 21h18M6 21V5h8v16m0-11h4v11M9 8h2m-2 4h2m-2 4h2m7-3h.01m0 4h.01"/>,layers:<><path d="m12 3-9 5 9 5 9-5-9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
 rotate:<path d="M20 11a8 8 0 1 0-2.3 6M20 5v6h-6"/>,plus:<path d="M12 5v14M5 12h14"/>,minus:<path d="M5 12h14"/>,reset:<><path d="M4 7v5h5M20 17v-5h-5"/><path d="M6.1 17A8 8 0 0 0 19 8M17.9 7A8 8 0 0 0 5 16"/></>,check:<path d="m5 12 4 4L19 6"/>,clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,spark:<><path d="m12 3 1.4 4.2L18 9l-4.6 1.8L12 15l-1.4-4.2L6 9l4.6-1.8L12 3Z"/><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z"/></>,chevron:<path d="m9 18 6-6-6-6"/>,pin:<><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>
};
export function Icon({name,size=18}:{name:IconName;size?:number}) { return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>; }
export const problems=[
{id:"traffic",label:"Traffic congestion",detail:"Severe at peak hours",score:86,icon:"traffic" as IconName},
{id:"connectivity",label:"Poor road connectivity",detail:"2 critical links missing",score:68,icon:"road" as IconName},
{id:"green",label:"Insufficient green spaces",detail:"8.4% below target",score:62,icon:"leaf" as IconName},
{id:"pedestrian",label:"Pedestrian accessibility",detail:"4 unsafe crossings",score:58,icon:"walk" as IconName},
{id:"gaps",label:"Infrastructure gaps",detail:"Drainage and transit",score:49,icon:"build" as IconName}];
export const proposals=[
{id:"flyover",name:"Elevated corridor",fullName:"Construct an elevated flyover",problem:"Traffic congestion",solution:"Dual-lane grade-separated flyover",cost:"$38.2M",feasibility:"High",impact:"32% less congestion",location:"Central Junction, Sector 12",land:"1.8 hectares",environment:"Moderate during construction",traffic:"28–35% improvement",timeline:"24–30 months",drawbacks:"Temporary disruption and moderate embodied carbon.",icon:"road" as IconName},
{id:"widen",name:"Road widening",fullName:"Widen the existing road",problem:"Poor road connectivity",solution:"Expand arterial from 4 to 6 lanes",cost:"$21.6M",feasibility:"Medium",impact:"24% more capacity",location:"Civic Avenue, Sector 12",land:"2.6 hectares",environment:"6 mature trees relocated",traffic:"18–24% improvement",timeline:"16–20 months",drawbacks:"Requires limited land acquisition.",icon:"layers" as IconName},
{id:"signals",name:"Smart signals",fullName:"Optimize traffic signals",problem:"Traffic congestion",solution:"AI adaptive signal coordination",cost:"$4.8M",feasibility:"Very high",impact:"18% faster flow",location:"7 junctions, Central District",land:"No additional land",environment:"Low positive impact",traffic:"14–19% improvement",timeline:"6–8 months",drawbacks:"Requires ongoing sensor calibration.",icon:"traffic" as IconName},
{id:"park",name:"Civic green",fullName:"Develop green spaces",problem:"Insufficient green spaces",solution:"Landscaped urban park and bioswale",cost:"$12.4M",feasibility:"High",impact:"+4.2% green cover",location:"East Quadrant, Sector 12",land:"3.4 hectares",environment:"Strong positive impact",traffic:"3–5% active travel shift",timeline:"12–15 months",drawbacks:"Reduces future development footprint.",icon:"leaf" as IconName},
{id:"walkways",name:"Safe pathways",fullName:"Improve pedestrian pathways",problem:"Pedestrian accessibility",solution:"Shaded paths and raised crossings",cost:"$7.9M",feasibility:"High",impact:"41% safer crossings",location:"Central Junction perimeter",land:"0.4 hectares",environment:"Positive",traffic:"6% active travel shift",timeline:"9–12 months",drawbacks:"Minor curbside parking reduction.",icon:"walk" as IconName}];
export const metricData=[
{label:"Congestion index",existing:82,proposed:56,unit:"/100",good:-32},{label:"Avg. travel time",existing:34,proposed:25,unit:" min",good:-26},{label:"Road capacity",existing:64,proposed:82,unit:"%",good:28},{label:"Carbon emissions",existing:76,proposed:64,unit:" kt",good:-16},{label:"Green coverage",existing:12,proposed:16.2,unit:"%",good:35}];
const buildingData=[ [8,8,56,46,"slate"],[17,7,38,62,"blue"],[28,6,48,40,"slate"],[72,7,44,55,"blue"],[83,7,58,70,"slate"],[6,28,42,34,"blue"],[20,27,65,80,"slate"],[76,29,58,42,"slate"],[89,28,40,52,"blue"],[7,66,48,55,"slate"],[19,69,56,38,"blue"],[31,72,38,68,"slate"],[70,70,62,72,"blue"],[84,70,48,44,"slate"],[5,88,35,38,"blue"],[25,88,46,48,"slate"],[76,89,42,62,"slate"],[90,88,54,36,"blue"] ];
function Building({item,index}:{item:(number|string)[];index:number}) { const [x,y,w,h,tone]=item;const style={"--x":`${x}%`,"--y":`${y}%`,"--w":`${w}px`,"--h":`${h}px`,"--delay":`${index*25}ms`} as CSSProperties;return <div className={`building ${tone}`} style={style}><span className="building-top"/><span className="windows"/></div>; }
export function CityScene({mode,proposal,proposals:activeProposals,showInfra,zoom,rotation,onRotation}:{mode:"existing"|"proposed";proposal:string;proposals?:string[];showInfra:boolean;zoom:number;rotation:number;onRotation:(v:number)=>void}) {
 const drag=useRef<{x:number;rotation:number}|null>(null);
 const ids=mode==="proposed"&&showInfra?(activeProposals?.length?activeProposals:[proposal]):[];
 const has=(id:string)=>ids.includes(id);
 const down=(e:PointerEvent<HTMLDivElement>)=>{drag.current={x:e.clientX,rotation};e.currentTarget.setPointerCapture(e.pointerId);};
 const move=(e:PointerEvent<HTMLDivElement>)=>{if(drag.current)onRotation(drag.current.rotation+(e.clientX-drag.current.x)*.16);};
 return <div className="city-viewport" onPointerDown={down} onPointerMove={move} onPointerUp={()=>{drag.current=null;}}>
 <div className="horizon-glow"/><div className="district-label"><Icon name="pin" size={13}/> CENTRAL JUNCTION <span>SECTOR 12</span></div><div className="north">N <span>↑</span></div>
 <div className="city-stage" style={{transform:`translate(-50%, -48%) scale(${zoom}) rotateX(59deg) rotateZ(${rotation}deg)`}}>
 <div className="ground-grid"/><div className={`road road-main ${has("widen")?"wide":""}`}><i/><i/><i/><i/></div><div className="road road-cross"><i/><i/><i/></div><div className="intersection-markings horizontal"/><div className="intersection-markings vertical"/>
 {buildingData.map((b,i)=><Building key={i} item={b} index={i}/>)}
 <div className={`park ${has("park")?"expanded":""}`}><span className="tree t1"/><span className="tree t2"/><span className="tree t3"/><span className="tree t4"/><span className="park-path"/></div><div className="parking"><span/><span/><span/><span/></div>
 {[12,22,38,48,64,79].map((x,i)=><div key={`v${i}`} className={`vehicle v${i}`} style={{left:`${x}%`}}/>)}{[17,29,72,84].map((y,i)=><div key={`h${i}`} className={`vehicle cross c${i}`} style={{top:`${y}%`}}/>)}
 {has("flyover")&&<div className="flyover"><span className="fly-road"><i/><i/></span>{[1,2,3,4].map(n=><b key={n} className={`pier p${n}`}/>)}</div>}
 {has("walkways")&&<><div className="walkway w1"/><div className="walkway w2"/></>}
 {has("signals")&&<><div className="signal s1"><i/></div><div className="signal s2"><i/></div><div className="signal s3"><i/></div></>}
 </div><div className="scene-caption"><span className={`status-dot ${ids.length?"proposed":""}`}/><div><strong>{ids.length?`${ids.length} intervention${ids.length>1?"s":""} visualized`:"Existing urban fabric"}</strong><small>{ids.length?ids.map(id=>proposals.find(p=>p.id===id)?.name).filter(Boolean).join(" · "):"Baseline conditions · Demonstration model"}</small></div></div><div className="scene-hint">Drag to rotate · use controls to zoom</div></div>;
}
