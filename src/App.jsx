import { useState, useEffect } from "react";
import LearnerApp from "./Learner.jsx";
import InstructorApp from "./Instructor.jsx";

// ─── ICONS ───────────────────────────────────────────────────
const I = {
  settings: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  calendar: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  book: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  bell: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  chevDown: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  chevRight: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  check: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  clock: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  shield: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  map: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  grid: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  sun: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  edit: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  plus: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  fileText: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  trash: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  back: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  eye: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  menu: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  xClose: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  swipe: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/><circle cx="7" cy="6" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="17" cy="18" r="1.2" fill="currentColor"/></svg>,
  info: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
};

// ─── THEME ───────────────────────────────────────────────────
const T = {
  bg:"#F5F6FA", white:"#FFFFFF",
  kraft:"#E8390E", kraftDark:"#C62E0A", kraftLight:"#FFF0ED", kraftPale:"#FFF8F6",
  navy:"#1B2559", navyLight:"#2B3674",
  text:"#1B2559", textSec:"#707EAE", textMuted:"#A3AED0",
  border:"#E9EDF7", borderLight:"#F4F7FE",
  green:"#05CD99", greenBg:"#05CD9912",
  orange:"#FFB547", orangeBg:"#FFB54712",
  blue:"#4318FF", blueBg:"#4318FF10",
  shadow:"0 4px 24px rgba(27,37,89,0.06)",
  shadowHover:"0 8px 32px rgba(27,37,89,0.1)",
  radius:16, radiusSm:10,
};
const FONT = "'Outfit','DM Sans',-apple-system,sans-serif";

const Styles = () => <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:${FONT};background:${T.bg};color:${T.text}}
  ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${T.border};border-radius:3px}
  @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
  @keyframes scaleIn{from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:scale(1)}}
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.45;transform:scale(0.85)}}
  input,select,textarea{font-family:${FONT}}
  input:focus,select:focus{outline:none;border-color:${T.kraft}!important;box-shadow:0 0 0 3px ${T.kraft}18}
  select{cursor:pointer}
`}</style>;

// ─── NAV ITEMS ───────────────────────────────────────────────
const ATT_PAGES = [
  { id:"scheme", label:"Attendance Scheme", icon:I.grid },
  { id:"setup", label:"Setup Guide", icon:I.map },
  { id:"policy", label:"Attendance Policy", icon:I.shield },
  { id:"holiday", label:"Holiday Calendar", icon:I.calendar },
  { id:"weekend", label:"Weekend Policy", icon:I.sun },
  { id:"schedule", label:"Session Schedule", icon:I.clock },
];

// ─── SCHEME NAMES ONLY ───────────────────────────────────────
const SCHEME_NAMES = [
  "PGP in AI-Led Marketing — Offline Batch 1",
  "Weekend Digital Marketing Bootcamp",
  "Hybrid Performance Marketing Program",
  "Corporate Upskilling Cohort — Nestlé",
  "Sales & GTM Fellowship — Batch 1",
  "Placement Preparation Sprint — May 2026",
  "Industry Certification Program — Q3",
];

// ─── Reusable small CTA button ──────────────────────────────
const SmallBtn = ({children, style:s={}}) => (
  <button style={{
    display:"inline-flex",alignItems:"center",gap:5,padding:"7px 14px",borderRadius:8,
    border:`1px solid ${T.border}`,background:T.white,fontSize:12,fontWeight:600,
    color:T.textSec,cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap",...s,
  }}
    onMouseEnter={e=>{e.currentTarget.style.borderColor=T.kraft+"50";e.currentTarget.style.color=T.kraft}}
    onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.textSec}}
  >{children}</button>
);

// ═══════════════════════════════════════════════════════════════
// SCHEME LIST (simplified cards — name + edit/delete only)
// ═══════════════════════════════════════════════════════════════
function SchemeList({ onAdd }) {
  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      {/* Header */}
      <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24 }}>
        <div>
          <h2 style={{ fontSize:22,fontWeight:700,color:T.navy }}>Attendance Scheme</h2>
          <p style={{ fontSize:14,color:T.textSec,marginTop:4 }}>7 schemes · 198 learners covered</p>
        </div>
        <div style={{ display:"flex",gap:10,alignItems:"center" }}>
          <SmallBtn>? Show Help</SmallBtn>
          <button onClick={onAdd} style={{
            display:"inline-flex",alignItems:"center",gap:8,padding:"10px 22px",borderRadius:T.radiusSm,
            border:`1.5px dashed ${T.kraft}60`,background:T.kraftPale,fontSize:14,fontWeight:700,
            color:T.kraft,cursor:"pointer",transition:"all 0.2s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.background=T.kraftLight;e.currentTarget.style.borderColor=T.kraft}}
            onMouseLeave={e=>{e.currentTarget.style.background=T.kraftPale;e.currentTarget.style.borderColor=T.kraft+"60"}}>
            {I.plus} Add Attendance Scheme
          </button>
        </div>
      </div>

      {/* Scheme Cards */}
      <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
        {SCHEME_NAMES.map((name,idx) => (
          <div key={idx} style={{
            background:T.white,borderRadius:14,border:`1px solid ${T.border}`,
            boxShadow:T.shadow,transition:"all 0.2s",
            animation:`fadeIn 0.3s ease ${idx*0.04}s both`,
          }}
            onMouseEnter={e=>e.currentTarget.style.boxShadow=T.shadowHover}
            onMouseLeave={e=>e.currentTarget.style.boxShadow=T.shadow}
          >
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 22px" }}>
              <h3 style={{ fontSize:15,fontWeight:600,color:T.navy }}>{name}</h3>
              <div style={{ display:"flex",gap:6,flexShrink:0,marginLeft:16 }}>
                <button style={{
                  width:34,height:34,borderRadius:8,border:`1px solid ${T.border}`,background:T.white,
                  display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",
                  color:T.textSec,transition:"all 0.15s",
                }}
                  onMouseEnter={e=>{e.currentTarget.style.background=T.kraftLight;e.currentTarget.style.color=T.kraft;e.currentTarget.style.borderColor=T.kraft+"40"}}
                  onMouseLeave={e=>{e.currentTarget.style.background=T.white;e.currentTarget.style.color=T.textSec;e.currentTarget.style.borderColor=T.border}}
                  title="Edit">{I.edit}</button>
                <button style={{
                  width:34,height:34,borderRadius:8,border:`1px solid ${T.border}`,background:T.white,
                  display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",
                  color:T.textMuted,transition:"all 0.15s",
                }}
                  onMouseEnter={e=>{e.currentTarget.style.color="#E17055";e.currentTarget.style.borderColor="#E1705540"}}
                  onMouseLeave={e=>{e.currentTarget.style.color=T.textMuted;e.currentTarget.style.borderColor=T.border}}
                  title="Delete">{I.trash}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCHEME FORM (Add Attendance Scheme)
// ═══════════════════════════════════════════════════════════════
function SchemeForm({ onCancel }) {
  const [form, setForm] = useState({ name:"", session:"", weekend:"", swipe:"", policy:"", schedule:"", batch:"" });
  const set = (k,v) => setForm(p=>({...p,[k]:v}));

  const fields = [
    { k:"name", l:"Name of Scheme", t:"text", p:"Enter scheme name" },
    { k:"session", l:"Session Policy", t:"select", o:[
      "Morning Session (9 AM – 12 PM)",
      "Afternoon Session (12 PM – 3 PM)",
      "Evening Session (3 PM – 6 PM)",
      "Night Session (6 PM – 9 PM)",
      "Full Day (9 AM – 5 PM)",
    ]},
    { k:"weekend", l:"Weekend Policy", t:"select", o:[
      "PGP AI-Led Marketing Weekend Policy",
      "Weekend Bootcamp Weekend Policy",
      "Corporate Cohort Weekend Policy",
      "Sales Fellowship Weekend Policy",
    ]},
    { k:"swipe", l:"Swipe Capturing Method", t:"select", o:[
      "Geo-fencing",
      "Geo-tracking",
      "Geo-fencing + Instructor Approval",
      "Manual Instructor Marking",
    ]},
    { k:"policy", l:"Attendance Policy", t:"select", o:[
      "PGP AI-Led Marketing Attendance Policy",
      "Weekend Bootcamp Attendance Policy",
      "Corporate Cohort Attendance Policy",
      "Sales Fellowship Attendance Policy",
    ]},
    { k:"schedule", l:"Session Schedule", t:"select", o:[
      "PGP AI-Led Marketing — Weekday Schedule (Mon–Fri, 9 AM – 1 PM)",
      "Weekend Bootcamp Schedule (Sat–Sun, 10 AM – 4 PM)",
      "Corporate Cohort Schedule (Mon–Wed, 6 PM – 9 PM)",
      "Sales Fellowship Schedule (Tue–Thu, 9 AM – 12 PM)",
      "Full Day Schedule (9 AM – 5 PM)",
      "Half Day Schedule (9 AM – 1 PM)",
    ]},
    { k:"batch", l:"Batch Filter", t:"select", o:[
      "PGP AI-Led Marketing Batch 1 (30 learners)",
      "PGP AI-Led Marketing Batch 2 (28 learners)",
      "Weekend Bootcamp Batch 3 (25 learners)",
      "Corporate Cohort — Nestlé (18 learners)",
      "Sales GTM Fellowship Batch 1 (22 learners)",
    ]},
  ];

  return (
    <div style={{ animation:"scaleIn 0.3s ease" }}>
      <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:24 }}>
        <div onClick={onCancel} style={{
          width:34,height:34,borderRadius:8,border:`1px solid ${T.border}`,display:"flex",
          alignItems:"center",justifyContent:"center",cursor:"pointer",color:T.textSec,
          background:T.white,transition:"all 0.15s",
        }}
          onMouseEnter={e=>{e.currentTarget.style.background=T.kraftLight;e.currentTarget.style.color=T.kraft}}
          onMouseLeave={e=>{e.currentTarget.style.background=T.white;e.currentTarget.style.color=T.textSec}}>
          {I.back}
        </div>
        <div>
          <h2 style={{ fontSize:22,fontWeight:700,color:T.navy }}>Add Attendance Scheme</h2>
          <p style={{ fontSize:13,color:T.textSec,marginTop:2 }}>Configure a new attendance scheme for a program batch</p>
        </div>
      </div>

      <div style={{
        background:T.white,borderRadius:T.radius,border:`1px solid ${T.border}`,
        boxShadow:T.shadow,padding:"28px 32px",
      }}>
        <div style={{ display:"flex",flexDirection:"column",gap:24,maxWidth:560 }}>
          {fields.map((f,idx) => (
            <div key={f.k} style={{ animation:`slideIn 0.3s ease ${idx*0.04}s both` }}>
              <label style={{ fontSize:13,fontWeight:600,color:T.navyLight,display:"block",marginBottom:8 }}>
                {f.l}
              </label>
              {f.t === "text" && (
                <input
                  value={form[f.k]||""} onChange={e=>set(f.k,e.target.value)} placeholder={f.p}
                  style={{
                    width:"100%",padding:"12px 16px",borderRadius:T.radiusSm,
                    border:`1px solid ${T.border}`,fontSize:14,color:T.text,background:T.bg,
                    transition:"all 0.2s",
                  }}
                />
              )}
              {f.t === "select" && (
                <select
                  value={form[f.k]||""} onChange={e=>set(f.k,e.target.value)}
                  style={{
                    width:"100%",padding:"12px 16px",borderRadius:T.radiusSm,
                    border:`1px solid ${T.border}`,fontSize:14,
                    color:form[f.k]?T.text:T.textMuted,background:T.bg,transition:"all 0.2s",
                  }}
                >
                  <option value="">Select...</option>
                  {f.o.map(o=><option key={o} value={o}>{o}</option>)}
                </select>
              )}
            </div>
          ))}
        </div>

        {/* Save / Close */}
        <div style={{ display:"flex",gap:12,marginTop:32,paddingTop:22,borderTop:`1px solid ${T.border}` }}>
          <button onClick={onCancel} style={{
            padding:"11px 32px",borderRadius:T.radiusSm,border:"none",
            background:T.kraft,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",
            transition:"all 0.2s",
          }}
            onMouseEnter={e=>e.currentTarget.style.background=T.kraftDark}
            onMouseLeave={e=>e.currentTarget.style.background=T.kraft}
          >Save</button>
          <button onClick={onCancel} style={{
            padding:"11px 24px",borderRadius:T.radiusSm,border:`1px solid ${T.border}`,
            background:T.white,fontSize:14,fontWeight:600,color:T.textSec,cursor:"pointer",
          }}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SETUP GUIDE PAGE
// ═══════════════════════════════════════════════════════════════
function SetupGuidePage() {
  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24 }}>
        <div>
          <h2 style={{ fontSize:22,fontWeight:700,color:T.navy }}>Setup Guide</h2>
          <p style={{ fontSize:14,color:T.textSec,marginTop:4 }}>Configure geofence location and campus boundaries</p>
        </div>
        <SmallBtn>{I.eye} View Geofence Locations</SmallBtn>
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:20,maxWidth:540 }}>
        {[
          {l:"Campus Name",p:"Kraftshala Campus, Gurugram"},
          {l:"Latitude",p:"28.4595"},
          {l:"Longitude",p:"77.0266"},
          {l:"Geofence Radius (meters)",p:"100"},
          {l:"Status",t:"select",o:["Active","Inactive","Testing"]},
        ].map((f,i) => (
          <div key={i}>
            <label style={{ fontSize:13,fontWeight:600,color:T.navyLight,display:"block",marginBottom:6 }}>{f.l}</label>
            {f.t==="select"
              ? <select style={{ width:"100%",padding:"11px 16px",borderRadius:T.radiusSm,border:`1px solid ${T.border}`,fontSize:14,color:T.text,background:T.bg }}><option>Select...</option>{f.o.map((o,j)=><option key={j}>{o}</option>)}</select>
              : <input placeholder={f.p} style={{ width:"100%",padding:"11px 16px",borderRadius:T.radiusSm,border:`1px solid ${T.border}`,fontSize:14,color:T.text,background:T.bg }}/>
            }
          </div>
        ))}
      </div>
      <div style={{ marginTop:28,display:"flex",gap:12 }}>
        <button style={{ padding:"11px 32px",borderRadius:T.radiusSm,border:"none",background:T.kraft,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer" }} onMouseEnter={e=>e.currentTarget.style.background=T.kraftDark} onMouseLeave={e=>e.currentTarget.style.background=T.kraft}>Save Configuration</button>
        <button style={{ padding:"11px 24px",borderRadius:T.radiusSm,border:`1px solid ${T.border}`,background:T.white,fontSize:14,fontWeight:600,color:T.textSec,cursor:"pointer" }}>Cancel</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ATTENDANCE POLICY PAGE
// ═══════════════════════════════════════════════════════════════
function AttendancePolicyPage() {
  const [creating, setCreating] = useState(false);

  if (!creating) {
    return (
      <div style={{ animation:"fadeIn 0.35s ease" }}>
        <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24 }}>
          <div>
            <h2 style={{ fontSize:22,fontWeight:700,color:T.navy }}>Attendance Policy</h2>
            <p style={{ fontSize:14,color:T.textSec,marginTop:4 }}>Define attendance rules, penalties, and regularization criteria</p>
          </div>
          <SmallBtn>{I.eye} View All Attendance Policies</SmallBtn>
        </div>

        {/* Empty state with create CTA */}
        <div style={{
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
          padding:"80px 40px",background:T.white,borderRadius:T.radius,
          border:`1px solid ${T.border}`,boxShadow:T.shadow,
        }}>
          <div style={{
            width:64,height:64,borderRadius:16,background:T.kraftLight,
            display:"flex",alignItems:"center",justifyContent:"center",
            color:T.kraft,marginBottom:16,
          }}>{I.shield}</div>
          <h3 style={{ fontSize:18,fontWeight:700,color:T.navy,marginBottom:6 }}>Create an Attendance Policy</h3>
          <p style={{ fontSize:14,color:T.textMuted,marginBottom:24,textAlign:"center",maxWidth:400 }}>
            Define the rules that govern how attendance is marked, penalized, and regularized for a program.
          </p>
          <button onClick={()=>setCreating(true)} style={{
            display:"inline-flex",alignItems:"center",gap:8,padding:"12px 28px",borderRadius:T.radiusSm,
            border:"none",background:T.kraft,fontSize:14,fontWeight:700,color:"#fff",cursor:"pointer",
            transition:"all 0.2s",
          }}
            onMouseEnter={e=>e.currentTarget.style.background=T.kraftDark}
            onMouseLeave={e=>e.currentTarget.style.background=T.kraft}
          >{I.plus} Create New Attendance Policy</button>
        </div>
      </div>
    );
  }

  // CREATE FORM
  return (
    <div style={{ animation:"scaleIn 0.3s ease" }}>
      <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24 }}>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <div onClick={()=>setCreating(false)} style={{
            width:34,height:34,borderRadius:8,border:`1px solid ${T.border}`,display:"flex",
            alignItems:"center",justifyContent:"center",cursor:"pointer",color:T.textSec,
            background:T.white,transition:"all 0.15s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.background=T.kraftLight;e.currentTarget.style.color=T.kraft}}
            onMouseLeave={e=>{e.currentTarget.style.background=T.white;e.currentTarget.style.color=T.textSec}}>
            {I.back}
          </div>
          <div>
            <h2 style={{ fontSize:22,fontWeight:700,color:T.navy }}>Create Attendance Policy</h2>
            <p style={{ fontSize:13,color:T.textSec,marginTop:2 }}>Define policy name and select applicable rules</p>
          </div>
        </div>
        <SmallBtn>{I.eye} View All Attendance Policies</SmallBtn>
      </div>

      <div style={{
        background:T.white,borderRadius:T.radius,border:`1px solid ${T.border}`,
        boxShadow:T.shadow,padding:"28px 32px",
      }}>
        <div style={{ display:"flex",flexDirection:"column",gap:24,maxWidth:560 }}>
          {/* Policy Name */}
          <div style={{ animation:"slideIn 0.3s ease both" }}>
            <label style={{ fontSize:13,fontWeight:600,color:T.navyLight,display:"block",marginBottom:8 }}>
              Policy Name
            </label>
            <input placeholder="e.g. PGP AI-Led Marketing Attendance Policy" style={{
              width:"100%",padding:"12px 16px",borderRadius:T.radiusSm,
              border:`1px solid ${T.border}`,fontSize:14,color:T.text,background:T.bg,
              transition:"all 0.2s",
            }}/>
          </div>

          {/* Rules Dropdown */}
          <div style={{ animation:"slideIn 0.3s ease 0.04s both" }}>
            <label style={{ fontSize:13,fontWeight:600,color:T.navyLight,display:"block",marginBottom:8 }}>
              Select Rules
            </label>
            <select style={{
              width:"100%",padding:"12px 16px",borderRadius:T.radiusSm,
              border:`1px solid ${T.border}`,fontSize:14,color:T.textMuted,background:T.bg,
              transition:"all 0.2s",
            }}>
              <option value="">Select rule type...</option>
              <option>Attendance Status Criteria</option>
              <option>Penalty Rules</option>
              <option>Regularization Rules</option>
            </select>
          </div>
        </div>

        {/* Finish / Cancel */}
        <div style={{ display:"flex",gap:12,marginTop:32,paddingTop:22,borderTop:`1px solid ${T.border}` }}>
          <button onClick={()=>setCreating(false)} style={{
            padding:"11px 32px",borderRadius:T.radiusSm,border:"none",
            background:T.kraft,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",
            transition:"all 0.2s",
          }}
            onMouseEnter={e=>e.currentTarget.style.background=T.kraftDark}
            onMouseLeave={e=>e.currentTarget.style.background=T.kraft}
          >Finish</button>
          <button onClick={()=>setCreating(false)} style={{
            padding:"11px 24px",borderRadius:T.radiusSm,border:`1px solid ${T.border}`,
            background:T.white,fontSize:14,fontWeight:600,color:T.textSec,cursor:"pointer",
          }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HOLIDAY CALENDAR PAGE
// ═══════════════════════════════════════════════════════════════
function HolidayPage() {
  const holidays = [
    {d:"26 Jan",n:"Republic Day",t:"N"},{d:"14 Mar",n:"Holi",t:"F"},
    {d:"02 Apr",n:"Ram Navami",t:"F"},{d:"14 Apr",n:"Ambedkar Jayanti",t:"N"},
    {d:"01 May",n:"May Day",t:"N"},{d:"15 Aug",n:"Independence Day",t:"N"},
    {d:"02 Oct",n:"Gandhi Jayanti",t:"N"},{d:"20 Oct",n:"Dussehra",t:"F"},
    {d:"09 Nov",n:"Diwali",t:"F"},{d:"25 Dec",n:"Christmas",t:"F"},
  ];
  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      <h2 style={{ fontSize:22,fontWeight:700,color:T.navy,marginBottom:4 }}>Holiday Calendar</h2>
      <p style={{ fontSize:14,color:T.textSec,marginBottom:24 }}>Upload and manage holiday list for the program duration</p>

      <div style={{ display:"flex",flexDirection:"column",gap:20,maxWidth:540,marginBottom:24 }}>
        <div>
          <label style={{ fontSize:13,fontWeight:600,color:T.navyLight,display:"block",marginBottom:6 }}>Calendar Year</label>
          <select style={{ width:"100%",padding:"11px 16px",borderRadius:T.radiusSm,border:`1px solid ${T.border}`,fontSize:14,color:T.text,background:T.bg }}><option>2026</option><option>2027</option></select>
        </div>
        <div>
          <label style={{ fontSize:13,fontWeight:600,color:T.navyLight,display:"block",marginBottom:6 }}>Upload Holiday List</label>
          <div style={{ border:`2px dashed ${T.border}`,borderRadius:T.radiusSm,padding:28,textAlign:"center",cursor:"pointer",background:T.bg,transition:"border-color 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=T.kraft} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
            <p style={{ fontSize:14,fontWeight:600,color:T.navyLight }}>Drop CSV here or click to upload</p>
            <p style={{ fontSize:12,color:T.textMuted,marginTop:4 }}>.csv, .xlsx</p>
          </div>
        </div>
      </div>

      <h4 style={{ fontSize:14,fontWeight:700,color:T.navy,marginBottom:10 }}>Holiday List — 2026</h4>
      <div style={{ borderRadius:T.radiusSm,border:`1px solid ${T.border}`,overflow:"hidden",marginBottom:28 }}>
        <div style={{ display:"grid",gridTemplateColumns:"80px 1fr 90px",background:T.bg,padding:"9px 16px",fontSize:11,fontWeight:700,color:T.textMuted,textTransform:"uppercase",letterSpacing:0.8 }}>
          <span>Date</span><span>Holiday</span><span>Type</span>
        </div>
        {holidays.map((h,i)=>(
          <div key={i} style={{ display:"grid",gridTemplateColumns:"80px 1fr 90px",padding:"11px 16px",borderTop:`1px solid ${T.borderLight}`,fontSize:14 }}>
            <span style={{ color:T.text,fontWeight:500 }}>{h.d}</span>
            <span style={{ color:T.navyLight }}>{h.n}</span>
            <span style={{ fontSize:12,fontWeight:600,padding:"2px 9px",borderRadius:20,background:h.t==="N"?T.blueBg:T.orangeBg,color:h.t==="N"?T.blue:T.orange,width:"fit-content" }}>{h.t==="N"?"National":"Festival"}</span>
          </div>
        ))}
      </div>
      <div style={{ display:"flex",gap:12 }}>
        <button style={{ padding:"11px 32px",borderRadius:T.radiusSm,border:"none",background:T.kraft,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer" }} onMouseEnter={e=>e.currentTarget.style.background=T.kraftDark} onMouseLeave={e=>e.currentTarget.style.background=T.kraft}>Save Configuration</button>
        <button style={{ padding:"11px 24px",borderRadius:T.radiusSm,border:`1px solid ${T.border}`,background:T.white,fontSize:14,fontWeight:600,color:T.textSec,cursor:"pointer" }}>Cancel</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// WEEKEND POLICY PAGE
// ═══════════════════════════════════════════════════════════════
function WeekendPage() {
  const [wd, setWd] = useState({Saturday:true,Sunday:true});
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24 }}>
        <div>
          <h2 style={{ fontSize:22,fontWeight:700,color:T.navy }}>Weekend Policy</h2>
          <p style={{ fontSize:14,color:T.textSec,marginTop:4 }}>Define which days are treated as non-working days</p>
        </div>
        <SmallBtn>{I.eye} View All Weekend Policies</SmallBtn>
      </div>
      <div style={{ maxWidth:540,marginBottom:20 }}>
        <label style={{ fontSize:13,fontWeight:600,color:T.navyLight,display:"block",marginBottom:6 }}>Policy Name</label>
        <input placeholder="e.g. Standard Sat-Sun Off" style={{ width:"100%",padding:"11px 16px",borderRadius:T.radiusSm,border:`1px solid ${T.border}`,fontSize:14,color:T.text,background:T.bg }}/>
      </div>
      <h4 style={{ fontSize:14,fontWeight:700,color:T.navy,marginBottom:14 }}>Select Weekend Days</h4>
      <div style={{ display:"flex",flexDirection:"column",gap:7,maxWidth:540,marginBottom:28 }}>
        {days.map(day=>(
          <div key={day} onClick={()=>setWd(p=>({...p,[day]:!p[day]}))}
            style={{ display:"flex",alignItems:"center",gap:14,padding:"13px 18px",borderRadius:T.radiusSm,cursor:"pointer",background:wd[day]?T.kraftLight:T.bg,border:`1px solid ${wd[day]?T.kraft+"40":T.border}`,transition:"all 0.2s" }}>
            <div style={{ width:22,height:22,borderRadius:6,border:`2px solid ${wd[day]?T.kraft:T.textMuted}`,background:wd[day]?T.kraft:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s" }}>
              {wd[day]&&<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
            </div>
            <span style={{ fontSize:15,fontWeight:wd[day]?700:500,color:wd[day]?T.kraft:T.navyLight }}>{day}</span>
            {wd[day]&&<span style={{ marginLeft:"auto",fontSize:11,fontWeight:700,color:T.kraft,background:T.kraft+"15",padding:"3px 10px",borderRadius:20 }}>WEEKEND</span>}
          </div>
        ))}
      </div>
      <div style={{ display:"flex",gap:12 }}>
        <button style={{ padding:"11px 32px",borderRadius:T.radiusSm,border:"none",background:T.kraft,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer" }} onMouseEnter={e=>e.currentTarget.style.background=T.kraftDark} onMouseLeave={e=>e.currentTarget.style.background=T.kraft}>Save Configuration</button>
        <button style={{ padding:"11px 24px",borderRadius:T.radiusSm,border:`1px solid ${T.border}`,background:T.white,fontSize:14,fontWeight:600,color:T.textSec,cursor:"pointer" }}>Cancel</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SESSION SCHEDULE PAGE
// ═══════════════════════════════════════════════════════════════
function SchedulePage() {
  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24 }}>
        <div>
          <h2 style={{ fontSize:22,fontWeight:700,color:T.navy }}>Session Schedule</h2>
          <p style={{ fontSize:14,color:T.textSec,marginTop:4 }}>Configure session timings and daily schedule structure</p>
        </div>
        <SmallBtn>{I.eye} View All Session Schedules</SmallBtn>
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:20,maxWidth:540 }}>
        {[
          {l:"Schedule Name",p:"e.g. Full Day Schedule"},
          {l:"Session 1 — Start",p:"09:00 AM"},{l:"Session 1 — End",p:"11:00 AM"},
          {l:"Session 2 — Start",p:"11:30 AM"},{l:"Session 2 — End",p:"01:00 PM"},
          {l:"Session 3 — Start",p:"02:00 PM"},{l:"Session 3 — End",p:"04:00 PM"},
        ].map((f,i)=>(
          <div key={i}>
            <label style={{ fontSize:13,fontWeight:600,color:T.navyLight,display:"block",marginBottom:6 }}>{f.l}</label>
            <input placeholder={f.p} style={{ width:"100%",padding:"11px 16px",borderRadius:T.radiusSm,border:`1px solid ${T.border}`,fontSize:14,color:T.text,background:T.bg }}/>
          </div>
        ))}
      </div>
      <div style={{ marginTop:28,display:"flex",gap:12 }}>
        <button style={{ padding:"11px 32px",borderRadius:T.radiusSm,border:"none",background:T.kraft,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer" }} onMouseEnter={e=>e.currentTarget.style.background=T.kraftDark} onMouseLeave={e=>e.currentTarget.style.background=T.kraft}>Save Configuration</button>
        <button style={{ padding:"11px 24px",borderRadius:T.radiusSm,border:`1px solid ${T.border}`,background:T.white,fontSize:14,fontWeight:600,color:T.textSec,cursor:"pointer" }}>Cancel</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ATTENDANCE WRAPPER (Left Panel + Content)
// ═══════════════════════════════════════════════════════════════
function AttendancePage({ activePage, onPageChange }) {
  const [schemeView, setSchemeView] = useState("list"); // list | form

  const renderContent = () => {
    if (activePage === "scheme") {
      return schemeView === "form"
        ? <SchemeForm onCancel={()=>setSchemeView("list")} />
        : <SchemeList onAdd={()=>setSchemeView("form")} />;
    }
    if (activePage === "setup") return <SetupGuidePage />;
    if (activePage === "policy") return <AttendancePolicyPage />;
    if (activePage === "holiday") return <HolidayPage />;
    if (activePage === "weekend") return <WeekendPage />;
    if (activePage === "schedule") return <SchedulePage />;
    return null;
  };

  return (
    <div style={{ display:"flex",gap:0,minHeight:"calc(100vh - 140px)",animation:"fadeIn 0.3s ease" }}>
      {/* Left Panel */}
      <div style={{ width:240,flexShrink:0,background:T.white,borderRadius:`${T.radius}px 0 0 ${T.radius}px`,border:`1px solid ${T.border}`,borderRight:"none",padding:"20px 0",boxShadow:T.shadow }}>
        <div style={{ padding:"0 18px 14px",borderBottom:`1px solid ${T.border}` }}>
          <p style={{ fontSize:11,fontWeight:700,color:T.textMuted,textTransform:"uppercase",letterSpacing:1.2 }}>Attendance Settings</p>
        </div>
        <div style={{ padding:"8px 8px" }}>
          {ATT_PAGES.map(p => {
            const act = activePage === p.id;
            return (
              <div key={p.id}
                onClick={() => { onPageChange(p.id); if(p.id==="scheme") setSchemeView("list"); }}
                style={{
                  display:"flex",alignItems:"center",gap:11,padding:"11px 13px",
                  borderRadius:T.radiusSm,cursor:"pointer",marginBottom:2,
                  background:act?T.kraftLight:"transparent",
                  color:act?T.kraft:T.navyLight,
                  fontWeight:act?700:500,fontSize:13,
                  transition:"all 0.2s",
                  borderLeft:act?`3px solid ${T.kraft}`:"3px solid transparent",
                }}
                onMouseEnter={e=>{if(!act)e.currentTarget.style.background=T.borderLight}}
                onMouseLeave={e=>{if(!act)e.currentTarget.style.background=act?T.kraftLight:"transparent"}}
              >
                <span style={{ opacity:act?1:0.5 }}>{p.icon}</span>
                <span>{p.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Content */}
      <div style={{ flex:1,background:T.white,borderRadius:`0 ${T.radius}px ${T.radius}px 0`,border:`1px solid ${T.border}`,padding:"28px 32px",boxShadow:T.shadow,overflow:"auto" }}>
        {renderContent()}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ATTENDANCE INFO — status config, mock data, page
// ═══════════════════════════════════════════════════════════════

const STATUS = {
  P:  { code:"P",  label:"Present",     bg:"#E7FBF5", fg:"#02AC7D",   border:"#9DECC9" },
  A:  { code:"A",  label:"Absent",      bg:"#FEE7E2", fg:T.kraftDark, border:"#FFB7A8" },
  L:  { code:"L",  label:"Late",        bg:"#FFF4DB", fg:"#B66F00",   border:"#F1D693" },
  HD: { code:"HD", label:"Half Day",    bg:"#FFE9D3", fg:"#C25F00",   border:"#FFC899" },
  R:  { code:"R",  label:"Regularized", bg:"#EFE9FF", fg:"#5A3FD9",   border:"#C9B8FF" },
  H:  { code:"H",  label:"Holiday",     bg:"#EEF0F7", fg:"#5D6B97",   border:"#D8DDEA" },
  W:  { code:"W",  label:"Weekend",     bg:"#F8FAFD", fg:"#A3AED0",   border:"#E9EDF7" },
  C:  { code:"C",  label:"Cancelled",   bg:"#F0F2F6", fg:"#828FB0",   border:"#D8DDEA", stripe:true },
  IP: { code:"P",  label:"In Progress", bg:"#E7FBF5", fg:"#02AC7D",   border:"#02AC7D", pulse:true },
};

// May 2026 — today = 16 May 2026 (Saturday). Sundays = weekend, Mon–Sat = class days.
const MAY_2026 = [
  { d:1,  s:"H",  note:"Labour Day" },
  { d:2,  s:"P" },
  { d:3,  s:"W" },
  { d:4,  s:"P" },
  { d:5,  s:"L",  note:"Late · 18m" },
  { d:6,  s:"P" },
  { d:7,  s:"P" },
  { d:8,  s:"P" },
  { d:9,  s:"P" },
  { d:10, s:"W" },
  { d:11, s:"A",  note:"No-show" },
  { d:12, s:"R",  note:"Approved" },
  { d:13, s:"P" },
  { d:14, s:"C",  note:"Cancelled" },
  { d:15, s:"HD", note:"Left 10:32" },
  { d:16, s:"IP", note:"In session" },
];

const SCHEME   = "PGP AI-Led Marketing — Offline Batch 1 Attendance Scheme";
const SCHEDULE = "PGP AILM — Weekday Schedule (Mon–Sat, 9 AM – 1 PM)";

// Full detail for today (16 May 2026, Saturday — currently mid-Session 2)
const TODAY_DETAIL = {
  kind:"full",
  date:"16 May 2026", weekday:"Saturday", status:"IP",
  scheme:SCHEME, schedule:SCHEDULE,
  processedAt:"16 May 2026, 11:33 AM (live · attendance still rolling)",
  firstIn:"08:58 AM", lastOut:"—", studyHrs:"1h 57m",
  lateBy:"2 min",
  verification:"Session 1 verified by Priya Kothari · Session 2 verification pending",
  sessions:[
    { id:1, name:"Brand Strategy Foundations",   timing:"09:00 – 11:00", signIn:"08:58:42", signOut:"10:55:11", lateBy:"0 min", verifiedBy:"Priya K.", status:"Present"     },
    { id:2, name:"AI in Performance Marketing",  timing:"11:30 – 13:00", signIn:"11:32:09", signOut:"—",        lateBy:"2 min", verifiedBy:"Pending",  status:"In Progress" },
  ],
  swipes:[
    { id:"sw1", type:"IN",  time:"08:58:42", session:1, status:"verified", lat:28.45947, lng:77.02671, dist:"12 m", verifiedBy:"Priya Kothari" },
    { id:"sw2", type:"OUT", time:"10:55:11", session:1, status:"verified", lat:28.45951, lng:77.02668, dist:"8 m",  verifiedBy:null },
    { id:"sw3", type:"IN",  time:"11:32:09", session:2, status:"verified", lat:28.45945, lng:77.02674, dist:"15 m", verifiedBy:"Priya Kothari" },
    { id:"sw4", type:"OUT", time:null,       session:2, status:"pending",  lat:null,     lng:null,     dist:null,   verifiedBy:null },
  ],
};

// Per-day detail map. "event" = banner card (Holiday/Weekend/Cancelled/Absent),
// "summary" = historical metrics (no live swipe trail), "full" = today only.
const DAYS = {
  1:  { kind:"event",   date:"01 May 2026", weekday:"Friday",    status:"H",  title:"Labour Day",                   note:"Public holiday — no classes scheduled. Excluded from attendance calculation." },
  2:  { kind:"summary", date:"02 May 2026", weekday:"Saturday",  status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"02 May 2026, 13:08 PM", firstIn:"08:55 AM", lastOut:"12:58 PM", studyHrs:"3h 58m", lateBy:"0 min", verification:"Both sessions verified by Priya Kothari" },
  3:  { kind:"event",   date:"03 May 2026", weekday:"Sunday",    status:"W",  title:"Weekend",                      note:"No classes scheduled on Sundays for this batch." },
  4:  { kind:"summary", date:"04 May 2026", weekday:"Monday",    status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"04 May 2026, 13:11 PM", firstIn:"08:57 AM", lastOut:"13:02 PM", studyHrs:"4h 04m", lateBy:"0 min", verification:"Both sessions verified by Priya Kothari" },
  5:  { kind:"summary", date:"05 May 2026", weekday:"Tuesday",   status:"L",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"05 May 2026, 13:06 PM", firstIn:"09:18 AM", lastOut:"13:01 PM", studyHrs:"3h 40m", lateBy:"18 min", verification:"Both sessions verified by Priya Kothari", note:"Sign-in for Session 1 was 18 minutes after start. Counts as Late." },
  6:  { kind:"summary", date:"06 May 2026", weekday:"Wednesday", status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"06 May 2026, 13:10 PM", firstIn:"08:59 AM", lastOut:"13:00 PM", studyHrs:"4h 01m", lateBy:"0 min", verification:"Both sessions verified by Priya Kothari" },
  7:  { kind:"summary", date:"07 May 2026", weekday:"Thursday",  status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"07 May 2026, 13:07 PM", firstIn:"08:55 AM", lastOut:"12:59 PM", studyHrs:"4h 04m", lateBy:"0 min", verification:"Both sessions verified by Priya Kothari" },
  8:  { kind:"summary", date:"08 May 2026", weekday:"Friday",    status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"08 May 2026, 13:09 PM", firstIn:"08:58 AM", lastOut:"13:01 PM", studyHrs:"4h 03m", lateBy:"0 min", verification:"Both sessions verified by Priya Kothari" },
  9:  { kind:"summary", date:"09 May 2026", weekday:"Saturday",  status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"09 May 2026, 13:05 PM", firstIn:"08:56 AM", lastOut:"12:58 PM", studyHrs:"4h 02m", lateBy:"0 min", verification:"Both sessions verified by Priya Kothari" },
  10: { kind:"event",   date:"10 May 2026", weekday:"Sunday",    status:"W",  title:"Weekend",                      note:"No classes scheduled on Sundays for this batch." },
  11: { kind:"event",   date:"11 May 2026", weekday:"Monday",    status:"A",  title:"Absent — no sign-in received", note:"Geofence proximity was not confirmed at the start of either Session 1 (09:00) or Session 2 (11:30). Counts as 1 absent day toward the attendance threshold.", regularization:true },
  12: { kind:"summary", date:"12 May 2026", weekday:"Tuesday",   status:"R",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"13 May 2026, 10:14 AM (regularized)", firstIn:"Manual mark", lastOut:"Manual mark", studyHrs:"3h 58m (regularized)", lateBy:"—", verification:"Regularization approved by Priya Kothari", note:"Originally marked Absent. Regularization request approved on 13 May based on instructor confirmation of physical presence." },
  13: { kind:"summary", date:"13 May 2026", weekday:"Wednesday", status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"13 May 2026, 13:08 PM", firstIn:"08:59 AM", lastOut:"13:01 PM", studyHrs:"4h 02m", lateBy:"0 min", verification:"Both sessions verified by Priya Kothari" },
  14: { kind:"event",   date:"14 May 2026", weekday:"Thursday",  status:"C",  title:"Session Cancelled",            note:"Cancelled by Program Coordinator on 13 May 2026. Reason: Instructor emergency. This day is excluded from the attendance calculation." },
  15: { kind:"summary", date:"15 May 2026", weekday:"Friday",    status:"HD", scheme:SCHEME, schedule:SCHEDULE, processedAt:"15 May 2026, 13:00 PM", firstIn:"08:59 AM", lastOut:"10:32 AM", studyHrs:"1h 32m", lateBy:"0 min", verification:"Session 1 verified by Priya Kothari", note:"Early departure at 10:32 AM. Attended less than 50% of scheduled time — counts as Half Day." },
  16: TODAY_DETAIL,
};

const MOCK_LEARNER = {
  name:"Aarav Sharma", rollNo:"L-2026-0143", avatar:"AS",
  batch:"PGP AI-Led Marketing · Batch 1",
  attendancePct:92, present:11, total:12,     // total excludes 1 cancelled day
  avgStudyHrs:"3h 35m", belowThreshold:0,
};

const ALT_LEARNERS = [
  { name:"Aarav Sharma",  rollNo:"L-2026-0143", avatar:"AS", pct:92 },
  { name:"Priya Mehta",   rollNo:"L-2026-0144", avatar:"PM", pct:96 },
  { name:"Rahul Iyer",    rollNo:"L-2026-0145", avatar:"RI", pct:81 },
  { name:"Sneha Gupta",   rollNo:"L-2026-0146", avatar:"SG", pct:98 },
  { name:"Vikram Joshi",  rollNo:"L-2026-0147", avatar:"VJ", pct:74 },
  { name:"Anika Bose",    rollNo:"L-2026-0148", avatar:"AB", pct:90 },
  { name:"Karan Khanna",  rollNo:"L-2026-0149", avatar:"KK", pct:85 },
];

// ─── helpers ─────────────────────────────────────────────
function StatusChip({ code, large }) {
  const cfg = STATUS[code]; if (!cfg) return null;
  return (
    <span style={{
      display:"inline-flex",alignItems:"center",gap:6,
      padding:large?"5px 12px":"3px 9px",borderRadius:20,
      fontSize:large?12:11,fontWeight:700,
      background:cfg.bg,color:cfg.fg,border:`1px solid ${cfg.border}`,
    }}>
      <span style={{width:6,height:6,borderRadius:"50%",background:cfg.fg}}/>{cfg.label}
    </span>
  );
}

function KPI({ label, value, sub, accent, onClick, highlight }) {
  return (
    <div onClick={onClick}
      style={{
        flex:"1 1 180px", background:T.white,
        border:`1px solid ${highlight?T.kraft+"50":T.border}`,
        borderRadius:T.radiusSm, padding:"14px 16px",
        boxShadow:T.shadow, cursor:onClick?"pointer":"default",
        transition:"all 0.2s",
        ...(highlight ? { background:T.kraftPale } : {}),
      }}
      onMouseEnter={onClick?(e=>{e.currentTarget.style.boxShadow=T.shadowHover;e.currentTarget.style.transform="translateY(-1px)"}):undefined}
      onMouseLeave={onClick?(e=>{e.currentTarget.style.boxShadow=T.shadow;e.currentTarget.style.transform="translateY(0)"}):undefined}
    >
      <p style={{fontSize:10,fontWeight:700,color:T.textMuted,textTransform:"uppercase",letterSpacing:1}}>{label}</p>
      <p style={{fontSize:24,fontWeight:800,color:accent||T.navy,marginTop:6,lineHeight:1.1}}>{value}</p>
      {sub && <p style={{fontSize:11,color:T.textSec,marginTop:4}}>{sub}</p>}
    </div>
  );
}

function InfoField({ label, value, mono, span }) {
  return (
    <div style={{ gridColumn:span===2?"span 2":undefined }}>
      <p style={{ fontSize:11, fontWeight:600, color:T.textMuted, marginBottom:3 }}>{label}</p>
      <div style={{ fontSize:13, color:T.navy, fontWeight:500, fontFamily:mono?"ui-monospace, SFMono-Regular, monospace":undefined, wordBreak:"break-word" }}>{value || "—"}</div>
    </div>
  );
}

function Pill({ icon, label, onClick }) {
  return (
    <span onClick={onClick}
      style={{
        display:"inline-flex",alignItems:"center",gap:6,padding:"7px 12px",
        borderRadius:8,background:T.white,border:`1px solid ${T.border}`,
        fontSize:12,fontWeight:600,color:T.navyLight,cursor:onClick?"pointer":"default",
        transition:"all 0.15s",
      }}
      onMouseEnter={onClick?(e=>e.currentTarget.style.borderColor=T.kraft+"55"):undefined}
      onMouseLeave={onClick?(e=>e.currentTarget.style.borderColor=T.border):undefined}>
      <span style={{ opacity:0.7 }}>{icon}</span>{label}
    </span>
  );
}

// ─── CALENDAR GRID ───────────────────────────────────────
function CalendarGrid({ data, selected, onSelect, today }) {
  const map = Object.fromEntries(data.map(x=>[x.d,x]));
  const startCol = 5; // May 1 2026 = Friday in Sun-Sat indexing
  const totalDays = 31;
  const cells = [];
  for (let i=0;i<startCol;i++) cells.push(null);
  for (let d=1;d<=totalDays;d++) cells.push(d);
  while (cells.length%7!==0) cells.push(null);

  return (
    <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:T.radius, boxShadow:T.shadow, overflow:"hidden" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", borderBottom:`1px solid ${T.border}` }}>
        <button style={navBtn}>‹ Prev</button>
        <div style={{ textAlign:"center" }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:T.navy }}>May 2026</h3>
          <p style={{ fontSize:11, color:T.textMuted, marginTop:1 }}>13 scheduled · 11 attended · 1 absent · 1 cancelled</p>
        </div>
        <button style={navBtn}>Next ›</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", borderBottom:`1px solid ${T.border}`, background:T.bg }}>
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(w=>(
          <div key={w} style={{ padding:"9px 0", textAlign:"center", fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1 }}>{w}</div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)" }}>
        {cells.map((d,i)=>{
          if (d===null) return <div key={i} style={{ height:78, background:T.borderLight, borderRight:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}` }}/>;
          const info = map[d];
          const cfg  = info?STATUS[info.s]:null;
          const isToday  = d===today;
          const isSel    = d===selected;
          const isFuture = d>today;
          const clickable = !!info && !isFuture;
          return (
            <div key={i}
              onClick={()=>clickable && onSelect(d)}
              style={{
                height:78, padding:8, position:"relative",
                borderRight:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`,
                cursor:clickable?"pointer":"default",
                background:cfg?cfg.bg:T.white,
                opacity:isFuture?0.4:1,
                transition:"all 0.15s",
                ...(isSel ? { boxShadow:`inset 0 0 0 2px ${T.kraft}` } : {}),
                ...(cfg?.stripe ? { backgroundImage:"repeating-linear-gradient(45deg,rgba(130,143,176,0.18),rgba(130,143,176,0.18) 4px,transparent 4px,transparent 10px)" } : {}),
              }}
              onMouseEnter={e=>{ if(clickable && !isSel) e.currentTarget.style.filter="brightness(0.97)"; }}
              onMouseLeave={e=>{ if(clickable && !isSel) e.currentTarget.style.filter="none"; }}
            >
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ fontSize:13, fontWeight:isToday?800:600, color:isToday?T.kraft:T.navy }}>
                  {String(d).padStart(2,"0")}
                </span>
                {isToday && <span style={{ fontSize:8, fontWeight:800, color:"#fff", background:T.kraft, padding:"1px 5px", borderRadius:4, letterSpacing:0.5 }}>TODAY</span>}
              </div>
              {cfg && info.s!=="W" && (
                <>
                  <div style={{ marginTop:4, fontSize:20, fontWeight:800, color:cfg.fg, lineHeight:1, fontFamily:FONT }}>{cfg.code}</div>
                  {info.note && (
                    <div style={{ fontSize:9, color:cfg.fg, opacity:0.9, fontWeight:600, marginTop:3, lineHeight:1.2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{info.note}</div>
                  )}
                </>
              )}
              {info?.s==="W" && (
                <div style={{ fontSize:10, color:cfg.fg, fontWeight:600, marginTop:18, textAlign:"center", letterSpacing:1 }}>WEEKEND</div>
              )}
              {cfg?.pulse && (
                <span style={{ position:"absolute", top:6, right:6, width:7, height:7, borderRadius:"50%", background:cfg.fg, animation:"pulse 1.5s ease infinite" }}/>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const navBtn = {
  display:"inline-flex", alignItems:"center", gap:5, padding:"6px 12px", borderRadius:8,
  border:`1px solid ${T.border}`, background:T.white, fontSize:12, fontWeight:600,
  color:T.textSec, cursor:"pointer",
};

// ─── DAY DETAIL PANEL ────────────────────────────────────
function DayDetailPanel({ day, onSwipeClick }) {
  if (!day) {
    return (
      <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:T.radius, boxShadow:T.shadow, padding:"48px 24px", textAlign:"center" }}>
        <p style={{ fontSize:13, color:T.textMuted }}>Select a class day in the calendar to view attendance details.</p>
      </div>
    );
  }

  const eventIcons = { H:"🎉", W:"🌙", C:"🚫", A:"⚠️" };

  return (
    <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:T.radius, boxShadow:T.shadow, overflow:"hidden", display:"flex", flexDirection:"column" }}>
      {/* HEADER */}
      <div style={{ padding:"16px 20px", borderBottom:`1px solid ${T.border}`, background:`linear-gradient(180deg,${T.bg},${T.white})` }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6, flexWrap:"wrap", gap:6 }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
            <h3 style={{ fontSize:18, fontWeight:700, color:T.navy }}>{day.date}</h3>
            <span style={{ fontSize:13, color:T.textSec }}>{day.weekday}</span>
          </div>
          <StatusChip code={day.status} large/>
        </div>
        {day.processedAt && <p style={{ fontSize:11, color:T.textMuted }}>Processed on {day.processedAt}</p>}
      </div>

      {/* EVENT KIND — Holiday / Weekend / Cancelled / Absent */}
      {day.kind === "event" && (
        <div style={{ padding:"32px 24px", textAlign:"center", flex:1 }}>
          <div style={{ fontSize:38, marginBottom:12 }}>{eventIcons[day.status] || "—"}</div>
          <h4 style={{ fontSize:15, fontWeight:700, color:T.navy, marginBottom:8 }}>{day.title}</h4>
          <p style={{ fontSize:12, color:T.textSec, lineHeight:1.55, maxWidth:340, margin:"0 auto" }}>{day.note}</p>
          {day.regularization && (
            <button
              style={{ marginTop:18, padding:"10px 18px", borderRadius:8, background:T.kraft, border:"none", color:"#fff", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.background=T.kraftDark}
              onMouseLeave={e=>e.currentTarget.style.background=T.kraft}
            >+ Raise Regularization Request</button>
          )}
        </div>
      )}

      {/* SHARED — scheme + 4 top metrics + verification + note */}
      {(day.kind === "summary" || day.kind === "full") && (
        <>
          <div style={{ padding:"12px 20px", borderBottom:`1px solid ${T.border}` }}>
            <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>Attendance Scheme</p>
            <p style={{ fontSize:13, fontWeight:600, color:T.navy, lineHeight:1.35 }}>{day.scheme}</p>
            <p style={{ fontSize:11, color:T.textSec, marginTop:6 }}>↳ {day.schedule}</p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)" }}>
            {[
              {l:"First Sign-In", v:day.firstIn,  mono:true},
              {l:"Last Sign-Out", v:day.lastOut,  mono:true},
              {l:"Study Hours",   v:day.studyHrs, mono:true},
              {l:"Late By",       v:day.lateBy,   mono:true},
            ].map((m,i)=>(
              <div key={i} style={{ padding:"11px 20px", borderBottom:`1px solid ${T.borderLight}`, borderRight:i%2===0?`1px solid ${T.borderLight}`:"none" }}>
                <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:0.8 }}>{m.l}</p>
                <p style={{ fontSize:13, fontWeight:600, color:T.navy, marginTop:3, fontFamily:m.mono?"ui-monospace, SFMono-Regular, monospace":undefined }}>{m.v}</p>
              </div>
            ))}
          </div>

          {day.verification && (
            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 20px", background:T.kraftPale, borderBottom:`1px solid ${T.border}` }}>
              <span style={{ color:T.kraft, flexShrink:0 }}>{I.shield}</span>
              <p style={{ fontSize:12, color:T.navy, fontWeight:500, lineHeight:1.4 }}>{day.verification}</p>
            </div>
          )}

          {day.note && (
            <div style={{ padding:"10px 20px", borderBottom:`1px solid ${T.border}`, background:T.bg }}>
              <p style={{ fontSize:11, color:T.textSec, lineHeight:1.5 }}>
                <span style={{ color:T.navy, fontWeight:600 }}>Note · </span>{day.note}
              </p>
            </div>
          )}
        </>
      )}

      {/* FULL — live sessions + swipes (today only) */}
      {day.kind === "full" && (
        <>
          <SessionsTable sessions={day.sessions}/>
          <SwipesTable swipes={day.swipes} totalHrs={day.studyHrs} onSwipeClick={onSwipeClick}/>
        </>
      )}

      {/* SUMMARY — archived placeholder */}
      {day.kind === "summary" && (
        <div style={{ padding:"14px 20px" }}>
          <p style={{ fontSize:11, color:T.textMuted, textAlign:"center", padding:"10px 0", borderTop:`1px dashed ${T.border}`, borderBottom:`1px dashed ${T.border}`, lineHeight:1.5 }}>
            Detailed session log and swipe trail archived for this day.<br/>Open <strong style={{ color:T.kraft }}>today's view (16 May)</strong> for the live breakdown.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── SESSIONS TABLE ──────────────────────────────────────
function SessionsTable({ sessions }) {
  return (
    <div style={{ padding:"14px 20px", borderBottom:`1px solid ${T.border}` }}>
      <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>Session Details</p>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {sessions.map(s => (
          <div key={s.id} style={{ border:`1px solid ${T.border}`, borderRadius:T.radiusSm, overflow:"hidden", background:T.bg }}>
            {/* Session header */}
            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:T.white, borderBottom:`1px solid ${T.border}` }}>
              <div style={{ width:26, height:26, borderRadius:7, background:T.kraftLight, color:T.kraft, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, flexShrink:0 }}>{s.id}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontSize:12, fontWeight:600, color:T.navy, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.name}</p>
                <p style={{ fontSize:10, color:T.textSec, marginTop:1, fontFamily:"ui-monospace, SFMono-Regular, monospace" }}>{s.timing}</p>
              </div>
              <span style={{
                fontSize:10, fontWeight:800, padding:"3px 7px", borderRadius:6,
                background: s.status==="Present" ? STATUS.P.bg : s.status==="In Progress" ? STATUS.IP.bg : "#F0F2F6",
                color:      s.status==="Present" ? STATUS.P.fg : s.status==="In Progress" ? STATUS.IP.fg : "#828FB0",
                textTransform:"uppercase", letterSpacing:0.5, whiteSpace:"nowrap",
              }}>{s.status}</span>
            </div>
            {/* 4-col metric grid */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
              {[
                {l:"Sign-In",  v:s.signIn,     mono:true},
                {l:"Sign-Out", v:s.signOut,    mono:true},
                {l:"Late In",  v:s.lateBy,     mono:true},
                {l:"Verified", v:s.verifiedBy, mono:false},
              ].map((c,i)=>(
                <div key={i} style={{ padding:"8px 6px", borderRight:i<3?`1px solid ${T.border}`:"none", textAlign:"center" }}>
                  <p style={{ fontSize:9, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:0.5 }}>{c.l}</p>
                  <p style={{ fontSize:c.mono?12:11, fontWeight:600, color:T.navy, marginTop:3, fontFamily:c.mono?"ui-monospace, SFMono-Regular, monospace":undefined, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.v}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SWIPES TABLE ────────────────────────────────────────
function SwipesTable({ swipes, totalHrs, onSwipeClick }) {
  return (
    <div style={{ padding:"14px 20px" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
        <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1 }}>Swipes</p>
        <span style={{ fontSize:11, color:T.textSec }}>
          Total: <strong style={{ color:T.navy, fontFamily:"ui-monospace, SFMono-Regular, monospace" }}>{totalHrs}</strong>
        </span>
      </div>
      <div style={{ border:`1px solid ${T.border}`, borderRadius:T.radiusSm, overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"54px 96px 1fr 56px", padding:"8px 12px", background:T.bg, borderBottom:`1px solid ${T.border}`, fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:0.8 }}>
          <span>Type</span><span>Swipe Time</span><span>Location</span><span style={{ textAlign:"right" }}>Action</span>
        </div>
        {swipes.map((sw,i) => (
          <div key={sw.id} style={{ display:"grid", gridTemplateColumns:"54px 96px 1fr 56px", padding:"10px 12px", borderTop:i>0?`1px solid ${T.borderLight}`:"none", alignItems:"center", fontSize:12 }}>
            <span style={{
              width:44, height:22, borderRadius:6, display:"inline-flex", alignItems:"center", justifyContent:"center",
              fontSize:10, fontWeight:800,
              background:sw.type==="IN"?STATUS.P.bg:T.blueBg, color:sw.type==="IN"?STATUS.P.fg:T.blue,
            }}>{sw.type}</span>
            <span>
              <span style={{ fontSize:12, fontWeight:600, color:sw.time?T.navy:T.textMuted, fontFamily:"ui-monospace, SFMono-Regular, monospace", display:"block" }}>{sw.time || "—"}</span>
              <span style={{ fontSize:10, color:T.textMuted, display:"block", marginTop:1 }}>16 May 2026</span>
            </span>
            <span style={{ fontSize:11, color:sw.status==="verified"?T.navyLight:T.textMuted, lineHeight:1.35 }}>
              {sw.status==="verified" ? (
                <>
                  Inside geofence · <span style={{ fontFamily:"ui-monospace, SFMono-Regular, monospace" }}>{sw.dist}</span>
                  <br/>
                  <span style={{ fontSize:10, color:T.textSec }}>Session {sw.session}</span>
                </>
              ) : (
                <>
                  Awaiting sign-out
                  <br/><span style={{ fontSize:10, color:T.textMuted }}>Session {sw.session}</span>
                </>
              )}
            </span>
            <span style={{ textAlign:"right" }}>
              <button onClick={()=>sw.status==="verified" && onSwipeClick(sw)} disabled={sw.status!=="verified"}
                style={{
                  background:"none", border:"none",
                  color: sw.status==="verified" ? T.blue : T.textMuted,
                  fontSize:11, fontWeight:600, padding:"3px 0",
                  cursor: sw.status==="verified" ? "pointer" : "not-allowed",
                }}>
                {sw.status==="verified" ? "Info ›" : "—"}
              </button>
            </span>
          </div>
        ))}
      </div>
      <p style={{ fontSize:11, color:T.textSec, marginTop:8, textAlign:"right" }}>
        Actual Hours: <strong style={{ color:T.navy, fontFamily:"ui-monospace, SFMono-Regular, monospace" }}>{totalHrs}</strong>
      </p>
    </div>
  );
}

// ─── SWIPE DETAILS MODAL ─────────────────────────────────
function SwipeDetailsModal({ swipe, learner, onClose }) {
  if (!swipe) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(27,37,89,0.5)", backdropFilter:"blur(2px)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:20, animation:"fadeIn 0.2s ease" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:T.white, borderRadius:T.radius, maxWidth:560, width:"100%", boxShadow:"0 20px 60px rgba(27,37,89,0.3)", animation:"scaleIn 0.25s ease" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 24px", borderBottom:`1px solid ${T.border}` }}>
          <div>
            <h3 style={{ fontSize:17, fontWeight:700, color:T.navy }}>Swipe Details</h3>
            <p style={{ fontSize:12, color:T.textSec, marginTop:2 }}>Geofence-verified sign-{swipe.type==="IN"?"in":"out"}</p>
          </div>
          <div onClick={onClose} style={{ width:32, height:32, borderRadius:8, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:T.textSec, transition:"all 0.15s" }}
            onMouseEnter={e=>{e.currentTarget.style.background=T.borderLight;e.currentTarget.style.color=T.kraft}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.textSec}}>
            {I.xClose}
          </div>
        </div>
        <div style={{ padding:"22px 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"18px 24px" }}>
          <InfoField label="Learner Name"   value={learner.name}/>
          <InfoField label="Roll Number"    value={learner.rollNo}/>
          <InfoField label="Swipe Date"     value="16 May 2026"/>
          <InfoField label="Swipe Time"     value={`${swipe.time} IST`} mono/>
          <InfoField label="Type"
            value={
              <span style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"3px 9px", borderRadius:6, fontSize:11, fontWeight:700, background:swipe.type==="IN"?STATUS.P.bg:T.blueBg, color:swipe.type==="IN"?STATUS.P.fg:T.blue }}>
                {swipe.type==="IN"?"↘ Sign-In":"↗ Sign-Out"}
              </span>
            }/>
          <InfoField label="Session"        value={`Session ${swipe.session}`}/>
          <InfoField label="Latitude"       value={swipe.lat?.toFixed(5)} mono/>
          <InfoField label="Longitude"      value={swipe.lng?.toFixed(5)} mono/>
          <InfoField label="Geofence Check" span={2}
            value={<span style={{ color:STATUS.P.fg, fontWeight:600 }}>✓ Inside · {swipe.dist} from center · Kraftshala Campus, Gurugram</span>}/>
          <InfoField label="Google Maps" span={2}
            value={<a href={`https://maps.google.com/?q=${swipe.lat},${swipe.lng}`} target="_blank" rel="noopener noreferrer" style={{ color:T.blue, textDecoration:"underline", fontSize:13 }}>Open in Google Maps ↗</a>}/>
          <InfoField label="Device"         value="iPhone 14 · iOS 17.4"/>
          <InfoField label="App Version"    value="KS-LMS 2.4.1"/>
          <InfoField label="Network"        value="Campus-WiFi"/>
          <InfoField label={swipe.type==="IN" ? "Instructor Verification" : "Sign-Out Validation"}
            value={
              swipe.type==="IN"
                ? <span style={{ color:STATUS.P.fg, fontWeight:600 }}>✓ Visual check by {swipe.verifiedBy || "instructor"} after sign-in</span>
                : <span style={{ color:T.textSec }}>Auto-recorded · geofence revalidated at exit (no instructor check needed for sign-out)</span>
            }/>
          <InfoField label="Location" span={2}
            value="Building A, Kraftshala Campus, Sector 32, Gurugram, Haryana 122001, India"/>
        </div>
        <div style={{ padding:"14px 24px", borderTop:`1px solid ${T.border}`, display:"flex", justifyContent:"flex-end" }}>
          <button onClick={onClose} style={{ padding:"10px 22px", borderRadius:T.radiusSm, border:"none", background:T.kraft, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.background=T.kraftDark}
            onMouseLeave={e=>e.currentTarget.style.background=T.kraft}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── INSIGHTS MODAL ──────────────────────────────────────
function InsightsModal({ open, learner, onClose }) {
  if (!open) return null;
  // Counts derived directly from MAY_2026 (days 1–16, excluding weekends)
  const segs = [
    { s:"P",  count:7 },   // 2, 4, 6, 7, 8, 9, 13
    { s:"IP", count:1 },   // 16 (today)
    { s:"L",  count:1 },   // 5
    { s:"R",  count:1 },   // 12
    { s:"HD", count:1 },   // 15
    { s:"A",  count:1 },   // 11
    { s:"C",  count:1 },   // 14
    { s:"H",  count:1 },   // 1
  ];
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(27,37,89,0.5)", backdropFilter:"blur(2px)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:20, animation:"fadeIn 0.2s ease" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:T.white, borderRadius:T.radius, maxWidth:680, width:"100%", boxShadow:"0 20px 60px rgba(27,37,89,0.3)", animation:"scaleIn 0.25s ease" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 24px", borderBottom:`1px solid ${T.border}` }}>
          <div>
            <h3 style={{ fontSize:17, fontWeight:700, color:T.navy }}>Insights · May 2026</h3>
            <p style={{ fontSize:12, color:T.textSec, marginTop:2 }}>{learner.name} · {learner.batch}</p>
          </div>
          <div onClick={onClose} style={{ width:32, height:32, borderRadius:8, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:T.textSec, transition:"all 0.15s" }}
            onMouseEnter={e=>{e.currentTarget.style.background=T.borderLight;e.currentTarget.style.color=T.kraft}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.textSec}}>
            {I.xClose}
          </div>
        </div>
        <div style={{ padding:"22px 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:24 }}>
            {[
              {l:"Class Days",          v:"12",       sub:"this month so far (1 cancelled, excluded)"},
              {l:"Attendance %",        v:"92%",      sub:"11 of 12 attended · above 80% threshold", accent:STATUS.P.fg},
              {l:"Late Days",           v:"1",        sub:"5 May · 18 min late",                     accent:"#B66F00"},
              {l:"Absent Days",         v:"1",        sub:"11 May · geofence not confirmed",         accent:STATUS.A.fg},
              {l:"Avg First Sign-In",   v:"08:58 AM", sub:"vs 09:00 scheduled"},
              {l:"Avg Last Sign-Out",   v:"12:57 PM", sub:"vs 13:00 scheduled"},
            ].map((m,i)=>(
              <div key={i} style={{ padding:"14px 16px", background:T.bg, borderRadius:T.radiusSm, border:`1px solid ${T.border}` }}>
                <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:0.8 }}>{m.l}</p>
                <p style={{ fontSize:22, fontWeight:800, color:m.accent||T.navy, marginTop:4, lineHeight:1.1 }}>{m.v}</p>
                <p style={{ fontSize:11, color:T.textSec, marginTop:3 }}>{m.sub}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>Status Distribution</p>
          <div style={{ display:"flex", height:30, borderRadius:T.radiusSm, overflow:"hidden", marginBottom:14, border:`1px solid ${T.border}` }}>
            {segs.map((seg,i)=>(
              <div key={i} title={`${STATUS[seg.s].label}: ${seg.count} day${seg.count>1?"s":""}`}
                style={{ flex:seg.count, background:STATUS[seg.s].fg, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:10, fontWeight:800 }}>
                {seg.count>=2?seg.count:""}
              </div>
            ))}
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px 14px" }}>
            {segs.map(seg=>(
              <span key={seg.s} style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:11, color:T.textSec }}>
                <span style={{ width:10, height:10, borderRadius:3, background:STATUS[seg.s].fg }}/>{STATUS[seg.s].label}: <strong style={{ color:T.navy }}>{seg.count}</strong>
              </span>
            ))}
          </div>
        </div>
        <div style={{ padding:"14px 24px", borderTop:`1px solid ${T.border}`, display:"flex", justifyContent:"flex-end" }}>
          <button onClick={onClose} style={{ padding:"10px 22px", borderRadius:T.radiusSm, border:"none", background:T.kraft, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.background=T.kraftDark}
            onMouseLeave={e=>e.currentTarget.style.background=T.kraft}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── TABLE VIEW ──────────────────────────────────────────
// Each row pulls timing/hours from the DAYS map so it never contradicts the calendar/detail panel.
function TableView({ data, onSelectDay }) {
  const rows = data.filter(r=>r.s!=="W");
  const cols = "78px 1fr 78px 78px 76px 110px 64px 1fr";
  return (
    <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:T.radius, boxShadow:T.shadow, overflow:"hidden", marginBottom:16 }}>
      <div style={{ display:"grid", gridTemplateColumns:cols, background:T.bg, padding:"11px 16px", fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1 }}>
        <span>Date</span><span>Scheme</span><span>First In</span><span>Last Out</span><span>Hrs</span><span>Status</span><span>Detail</span><span>Exception</span>
      </div>
      {rows.map((r,i)=>{
        const cfg  = STATUS[r.s];
        const info = DAYS[r.d];
        const mono = { fontFamily:"ui-monospace, SFMono-Regular, monospace", fontSize:12 };
        const isClass = r.s!=="H" && r.s!=="C";
        const firstIn  = info?.firstIn  || "—";
        const lastOut  = info?.lastOut  || "—";
        const studyHrs = info?.studyHrs?.split(" (")[0] || "—";
        return (
          <div key={i} style={{ display:"grid", gridTemplateColumns:cols, padding:"11px 16px", borderTop:`1px solid ${T.borderLight}`, fontSize:13, alignItems:"center" }}>
            <span style={{ color:T.navy, fontWeight:600 }}>{String(r.d).padStart(2,"0")} May</span>
            <span style={{ color:T.navyLight, fontSize:12 }}>{isClass ? "PGP AILM — Weekday" : "—"}</span>
            <span style={{ color:T.textSec, ...mono, fontSize:11 }}>{firstIn.replace(" AM","").replace(" PM","")}</span>
            <span style={{ color:T.textSec, ...mono, fontSize:11 }}>{lastOut.replace(" AM","").replace(" PM","")}</span>
            <span style={{ color:T.navy, fontWeight:600, fontSize:12 }}>{studyHrs}</span>
            <span><StatusChip code={r.s}/></span>
            <span>
              <button onClick={()=>onSelectDay(r.d)}
                style={{ background:"none", border:"none", color:T.blue, fontSize:12, fontWeight:600, cursor:"pointer", padding:0 }}>
                View ›
              </button>
            </span>
            <span style={{ color:r.note?cfg.fg:T.textMuted, fontSize:12 }}>{r.note || "No attention required"}</span>
          </div>
        );
      })}
      <div style={{ display:"grid", gridTemplateColumns:cols, padding:"13px 16px", borderTop:`1.5px solid ${T.border}`, background:T.bg, fontSize:12, fontWeight:700 }}>
        <span style={{ color:T.navy }}>TOTAL</span>
        <span/><span/><span/>
        <span style={{ color:T.navy, fontFamily:"ui-monospace, SFMono-Regular, monospace" }}>39h 12m</span>
        <span/><span/><span style={{ color:T.textMuted, fontWeight:500 }}>11 of 12 class days attended (cancelled excluded)</span>
      </div>
    </div>
  );
}

// ─── LEGEND ──────────────────────────────────────────────
function AttendanceLegend() {
  return (
    <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:T.radius, boxShadow:T.shadow, padding:"14px 20px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
        <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1 }}>Legend</p>
        <span style={{ fontSize:11, color:T.textMuted }}>· status codes shown on each calendar day</span>
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:14 }}>
        {["P","A","L","HD","R","H","W","C"].map(k=>(
          <span key={k} style={{ display:"inline-flex", alignItems:"center", gap:8 }}>
            <span style={{
              width:24, height:24, borderRadius:6, background:STATUS[k].bg,
              border:`1px solid ${STATUS[k].border}`, color:STATUS[k].fg,
              display:"inline-flex", alignItems:"center", justifyContent:"center",
              fontSize:11, fontWeight:800,
              ...(STATUS[k].stripe ? { backgroundImage:"repeating-linear-gradient(45deg,rgba(130,143,176,0.18),rgba(130,143,176,0.18) 4px,transparent 4px,transparent 10px)" } : {}),
            }}>{STATUS[k].code}</span>
            <span style={{ fontSize:12, fontWeight:600, color:T.navyLight }}>{STATUS[k].label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const toggleBtn = (active) => ({
  padding:"6px 14px", borderRadius:6, border:"none", fontSize:12, fontWeight:600, cursor:"pointer",
  background:active?T.white:"transparent",
  color:active?T.kraft:T.textSec,
  boxShadow:active?"0 1px 2px rgba(27,37,89,0.06)":"none",
});

// ═══════════════════════════════════════════════════════════════
// ATTENDANCE INFO PAGE
// ═══════════════════════════════════════════════════════════════
function AttendanceInfoPage() {
  const [selected, setSelected]     = useState(16);
  const [view, setView]             = useState("calendar"); // calendar | table
  const [swipeOpen, setSwipeOpen]   = useState(null);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [search, setSearch]         = useState("");
  const [dropOpen, setDropOpen]     = useState(false);
  const learner     = MOCK_LEARNER;
  const TODAY       = 16;
  const selectedDay = DAYS[selected] || null;

  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      {/* Filter bar */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:18, gap:12, flexWrap:"wrap" }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:700, color:T.navy }}>Attendance Info</h2>
          <p style={{ fontSize:14, color:T.textSec, marginTop:4 }}>Per-learner attendance details with swipes, sessions, and geofence proofs</p>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          <Pill icon={I.users}    label="Batch · PGP AILM B1"  onClick={()=>{}}/>
          <Pill icon={I.calendar} label="May 2026"             onClick={()=>{}}/>
          <div style={{ display:"flex", border:`1px solid ${T.border}`, borderRadius:8, padding:3, background:T.bg }}>
            <button onClick={()=>setView("calendar")} style={toggleBtn(view==="calendar")}>Calendar</button>
            <button onClick={()=>setView("table")}    style={toggleBtn(view==="table")}>Table</button>
          </div>
        </div>
      </div>

      {/* Learner header card */}
      <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:T.radius, boxShadow:T.shadow, padding:"18px 22px", marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
          <div style={{ width:54, height:54, borderRadius:14, background:`linear-gradient(135deg,${T.kraft},#FF6B4A)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:800, color:"#fff", flexShrink:0 }}>{learner.avatar}</div>
          <div style={{ minWidth:200 }}>
            <h3 style={{ fontSize:17, fontWeight:700, color:T.navy }}>{learner.name}</h3>
            <p style={{ fontSize:12, color:T.textSec, marginTop:2 }}>{learner.rollNo} · {learner.batch}</p>
          </div>
          <div style={{ flex:1, minWidth:240, position:"relative" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, background:T.bg, borderRadius:30, padding:"8px 18px", border:`1px solid ${T.border}` }}>
              <span style={{ color:T.textMuted }}>{I.search}</span>
              <input
                placeholder="Switch learner — search by name or roll no..."
                value={search}
                onChange={e=>setSearch(e.target.value)}
                onFocus={()=>setDropOpen(true)}
                onBlur={()=>setTimeout(()=>setDropOpen(false),180)}
                style={{ border:"none", outline:"none", background:"transparent", fontSize:13, color:T.text, width:"100%", fontFamily:FONT }}
              />
            </div>
            {dropOpen && (
              <div style={{ position:"absolute", top:"calc(100% + 6px)", left:0, right:0, background:T.white, border:`1px solid ${T.border}`, borderRadius:T.radiusSm, boxShadow:T.shadowHover, zIndex:20, maxHeight:300, overflowY:"auto" }}>
                {ALT_LEARNERS
                  .filter(l => !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.rollNo.toLowerCase().includes(search.toLowerCase()))
                  .map(l=>(
                    <div key={l.rollNo} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", cursor:"pointer", borderBottom:`1px solid ${T.borderLight}`, transition:"background 0.15s" }}
                      onMouseEnter={e=>e.currentTarget.style.background=T.borderLight}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <div style={{ width:32, height:32, borderRadius:8, background:T.borderLight, color:T.navyLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700 }}>{l.avatar}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ fontSize:13, fontWeight:600, color:T.navy }}>{l.name}</p>
                        <p style={{ fontSize:11, color:T.textSec }}>{l.rollNo}</p>
                      </div>
                      <span style={{ fontSize:12, fontWeight:700, color:l.pct>=80?STATUS.P.fg:STATUS.A.fg }}>{l.pct}%</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display:"flex", gap:12, marginBottom:14, flexWrap:"wrap" }}>
        <KPI label="Attendance %"     value={learner.attendancePct+"%"}                sub="vs 80% placement threshold"           accent={STATUS.P.fg}/>
        <KPI label="Days Present"     value={`${learner.present}/${learner.total}`}    sub="this month · cancelled excluded"/>
        <KPI label="Avg Study Hrs"    value={learner.avgStudyHrs}                       sub="per class day"/>
        <KPI label="Below Threshold"  value={learner.belowThreshold}                    sub="weeks under 75%"/>
        <KPI label="+3 Insights"      value="View"                                      sub="Click to expand →"                    accent={T.kraft} onClick={()=>setInsightsOpen(true)} highlight/>
      </div>

      {/* Main area */}
      {view==="calendar" ? (
        <div style={{ display:"grid", gridTemplateColumns:"1.35fr 1fr", gap:14, marginBottom:14 }}>
          <CalendarGrid data={MAY_2026} selected={selected} onSelect={setSelected} today={TODAY}/>
          <DayDetailPanel day={selectedDay} onSwipeClick={setSwipeOpen}/>
        </div>
      ) : (
        <TableView data={MAY_2026} onSelectDay={(d)=>{ setSelected(d); setView("calendar"); }}/>
      )}

      <AttendanceLegend/>

      <SwipeDetailsModal swipe={swipeOpen} learner={learner} onClose={()=>setSwipeOpen(null)}/>
      <InsightsModal open={insightsOpen} learner={learner} onClose={()=>setInsightsOpen(false)}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// REGULARIZATIONS — review queue (Program Coordinator / Instructor)
// ═══════════════════════════════════════════════════════════════

const REVIEW_QUEUE_INITIAL = [
  // Active (pending review)
  {
    id:"REG-2026-0007",
    learner:{ name:"Vikram Joshi", rollNo:"L-2026-0147", avatar:"VJ" },
    forDate:"14 May 2026", forDateLabel:"Thursday, 14 May 2026",
    forStatus:"A",
    appliedOn:"15 May 2026, 09:32 AM",
    daysAgo:"23 hours ago",
    reasonType:"I was present but forgot to check in",
    details:"I reached campus at 09:00 sharp but my phone battery had died on the way. Priya saw me in the room throughout Session 1. I'd appreciate the day being marked Present.",
    sessions:"Both sessions",
    status:"pending",
    level:"L1",
  },
  {
    id:"REG-2026-0008",
    learner:{ name:"Rahul Iyer", rollNo:"L-2026-0145", avatar:"RI" },
    forDate:"11 May 2026", forDateLabel:"Monday, 11 May 2026",
    forStatus:"L",
    appliedOn:"12 May 2026, 08:15 AM",
    daysAgo:"5 days ago",
    reasonType:"I was late but had a valid reason",
    details:"Sign-in at 09:23 was due to a metro delay (Yellow Line halted for 18 min). I have the DMRC notification screenshot attached. Requesting Late be excused.",
    sessions:"Session 1",
    status:"pending",
    level:"L1",
    evidence:"DMRC-yellow-line-delay.png",
  },
  // Closed
  {
    id:"REG-2026-0005",
    learner:{ name:"Sneha Gupta", rollNo:"L-2026-0146", avatar:"SG" },
    forDate:"08 May 2026", forDateLabel:"Friday, 08 May 2026",
    forStatus:"P",
    appliedOn:"09 May 2026, 11:00 AM",
    reasonType:"I checked in but wasn't verified",
    details:"I signed in at 08:55 (geofence ✓) but the instructor's panel showed Not Yet because she missed my row. Confirming I was present and in the room throughout both sessions.",
    sessions:"Both sessions",
    status:"approved",
    reviewer:"Priya Kothari (Instructor · L1)",
    reviewedAt:"09 May 2026, 13:20 PM",
    reviewNote:"Confirmed via session recording — learner was visible in classroom throughout. Verification updated.",
  },
  {
    id:"REG-2026-0003",
    learner:{ name:"Karan Khanna", rollNo:"L-2026-0149", avatar:"KK" },
    forDate:"06 May 2026", forDateLabel:"Wednesday, 06 May 2026",
    forStatus:"A",
    appliedOn:"08 May 2026, 19:00 PM",
    reasonType:"I was present but forgot to check in",
    details:"Forgot to tap sign-in. Was in class with everyone.",
    sessions:"Both sessions",
    status:"rejected",
    reviewer:"Priya Kothari (Instructor · L1)",
    reviewedAt:"09 May 2026, 09:00 AM",
    reviewNote:"Filed beyond the 48-hour window per policy. Instructor cannot approve at L1 — please escalate to Program Coordinator if you'd like to dispute.",
  },
];

const ghostBtnStyle = {
  padding:"8px 14px", borderRadius:8,
  border:`1px solid ${T.border}`, background:T.white,
  color:T.navy, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:FONT,
};

// ─── REVIEW REQUEST CARD ─────────────────────────────────
function ReviewRequestCard({ request, onView, onReject, onApprove }) {
  const r = request;
  const isPending = r.status === "pending";
  const statusCfg = {
    pending:  { bg:"#FFF4DB", fg:"#B66F00",   border:"#F1D693", label:"Pending Review" },
    approved: { bg:"#E7FBF5", fg:"#02AC7D",   border:"#9DECC9", label:"Approved" },
    rejected: { bg:"#FEE7E2", fg:T.kraftDark, border:"#FFB7A8", label:"Rejected" },
  }[r.status];

  return (
    <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:T.radius, boxShadow:T.shadow, overflow:"hidden", marginBottom:12, transition:"all 0.2s" }}
      onMouseEnter={e=>e.currentTarget.style.boxShadow=T.shadowHover}
      onMouseLeave={e=>e.currentTarget.style.boxShadow=T.shadow}>
      {/* Header row */}
      <div style={{ padding:"14px 20px", display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:14, borderBottom:`1px solid ${T.borderLight}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, minWidth:0, flex:1 }}>
          <div style={{ width:42, height:42, borderRadius:11, background:T.borderLight, color:T.navyLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, flexShrink:0 }}>{r.learner.avatar}</div>
          <div style={{ minWidth:0 }}>
            <p style={{ fontSize:14, fontWeight:700, color:T.navy }}>{r.learner.name}</p>
            <p style={{ fontSize:11, color:T.textSec, marginTop:1 }}>{r.learner.rollNo} · {r.sessions}</p>
          </div>
        </div>
        <div style={{ textAlign:"right", flexShrink:0 }}>
          <span style={{
            padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:700,
            background:statusCfg.bg, color:statusCfg.fg, border:`1px solid ${statusCfg.border}`,
            display:"inline-block", marginBottom:5,
          }}>{statusCfg.label}</span>
          <p style={{ fontSize:10, color:T.textMuted, fontFamily:"ui-monospace, SFMono-Regular, monospace" }}>{r.id}</p>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding:"14px 20px", display:"grid", gridTemplateColumns:"170px 1fr", gap:"8px 16px", fontSize:12 }}>
        <span style={{ color:T.textSec, fontWeight:600 }}>Date in question</span>
        <span style={{ color:T.navy, display:"inline-flex", alignItems:"center", gap:8 }}>
          {r.forDateLabel} <StatusChip code={r.forStatus}/>
        </span>
        <span style={{ color:T.textSec, fontWeight:600 }}>Applied</span>
        <span style={{ color:T.navy }}>
          {r.appliedOn}{isPending && r.daysAgo ? <span style={{ color:T.textMuted }}> · {r.daysAgo}</span> : null}
        </span>
        <span style={{ color:T.textSec, fontWeight:600 }}>Reason</span>
        <span style={{ color:T.navy, fontWeight:600 }}>{r.reasonType}</span>
        <span style={{ color:T.textSec, fontWeight:600, alignSelf:"flex-start" }}>Details</span>
        <span style={{ color:T.navyLight, lineHeight:1.5 }}>"{r.details}"</span>
        {r.evidence && (
          <>
            <span style={{ color:T.textSec, fontWeight:600 }}>Evidence</span>
            <a href="#" onClick={e=>e.preventDefault()} style={{ color:T.blue, textDecoration:"underline" }}>📎 {r.evidence}</a>
          </>
        )}
      </div>

      {/* Footer */}
      {isPending ? (
        <div style={{ padding:"12px 20px", borderTop:`1px solid ${T.borderLight}`, background:T.bg, display:"flex", justifyContent:"flex-end", gap:8 }}>
          <button onClick={onView} style={ghostBtnStyle}>View Details</button>
          <button onClick={onReject} style={{...ghostBtnStyle, color:T.kraftDark, borderColor:"#FFB7A8"}}>Reject</button>
          <button onClick={onApprove} style={{ padding:"8px 18px", borderRadius:8, border:"none", background:T.kraft, color:"#fff", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:FONT }}>Approve</button>
        </div>
      ) : r.reviewer && (
        <div style={{ padding:"12px 20px", borderTop:`1px solid ${T.borderLight}`, background:r.status==="approved" ? "#F0FCF7" : "#FFF6F4" }}>
          <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:0.6, marginBottom:4 }}>Reviewer's note</p>
          <p style={{ fontSize:12, color:T.navyLight, lineHeight:1.5 }}>{r.reviewNote}</p>
          <p style={{ fontSize:11, color:T.textSec, marginTop:6 }}>— {r.reviewer} · {r.reviewedAt}</p>
        </div>
      )}
    </div>
  );
}

// ─── Approval-ladder step ────────────────────────────────
function LadderStep({ n, label, done, active, meta }) {
  const color = done ? "#02AC7D" : active ? T.kraft : T.textMuted;
  const bg    = done ? "#E7FBF5" : active ? T.kraftLight : T.borderLight;
  return (
    <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
      <div style={{ width:26, height:26, borderRadius:"50%", background:bg, color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, flexShrink:0, marginTop:1 }}>
        {done ? "✓" : n}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <p style={{ fontSize:13, fontWeight:600, color: done || active ? T.navy : T.textSec }}>{label}</p>
        {meta && <p style={{ fontSize:11, color:T.textSec, marginTop:2 }}>{meta}</p>}
      </div>
    </div>
  );
}

function ReviewSection({ title, children }) {
  return (
    <div style={{ marginBottom:18 }}>
      <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>{title}</p>
      {children}
    </div>
  );
}

// ─── Details Modal ───────────────────────────────────────
function DetailsModal({ request, onClose, onApprove, onReject }) {
  const r = request;
  const isPending = r.status === "pending";

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(27,37,89,0.5)", backdropFilter:"blur(2px)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:20, animation:"fadeIn 0.2s ease" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:T.white, borderRadius:T.radius, maxWidth:720, width:"100%", maxHeight:"92vh", overflowY:"auto", boxShadow:"0 20px 60px rgba(27,37,89,0.3)", animation:"scaleIn 0.25s ease" }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"18px 24px", borderBottom:`1px solid ${T.border}`, gap:12, position:"sticky", top:0, background:T.white, zIndex:1 }}>
          <div>
            <h3 style={{ fontSize:17, fontWeight:700, color:T.navy }}>Request Details</h3>
            <p style={{ fontSize:12, color:T.textSec, marginTop:2, fontFamily:"ui-monospace, SFMono-Regular, monospace" }}>{r.id}</p>
          </div>
          <div onClick={onClose} style={{ width:32, height:32, borderRadius:8, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:T.textSec }}
            onMouseEnter={e=>{e.currentTarget.style.background=T.borderLight;e.currentTarget.style.color=T.kraft}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.textSec}}>
            {I.xClose}
          </div>
        </div>

        <div style={{ padding:"22px 24px" }}>
          <ReviewSection title="Learner">
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:48, height:48, borderRadius:12, background:T.borderLight, color:T.navyLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800 }}>{r.learner.avatar}</div>
              <div>
                <p style={{ fontSize:14, fontWeight:700, color:T.navy }}>{r.learner.name}</p>
                <p style={{ fontSize:12, color:T.textSec, marginTop:1 }}>{r.learner.rollNo} · PGP AI-Led Marketing · Batch 1</p>
              </div>
            </div>
          </ReviewSection>

          <ReviewSection title="Date in question">
            <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:4, flexWrap:"wrap" }}>
              <span style={{ fontSize:14, fontWeight:600, color:T.navy }}>{r.forDateLabel}</span>
              <StatusChip code={r.forStatus}/>
            </div>
            <p style={{ fontSize:12, color:T.textSec, marginTop:6 }}>
              Original record: {r.forStatus === "A" ? "Absent — no sign-in detected within the geofence" : r.forStatus === "L" ? "Late — sign-in after the grace window" : r.forStatus === "HD" ? "Half Day — early departure below 50% threshold" : "Recorded status"}.
            </p>
          </ReviewSection>

          <ReviewSection title="Request">
            <div style={{ display:"grid", gridTemplateColumns:"160px 1fr", gap:"8px 14px", fontSize:13 }}>
              <span style={{ color:T.textSec }}>Filed on</span>
              <span style={{ color:T.navy }}>{r.appliedOn}{r.daysAgo ? <span style={{ color:T.textMuted }}> · {r.daysAgo}</span> : null}</span>
              <span style={{ color:T.textSec }}>Sessions affected</span>
              <span style={{ color:T.navy }}>{r.sessions}</span>
              <span style={{ color:T.textSec }}>Reason</span>
              <span style={{ color:T.navy, fontWeight:600 }}>{r.reasonType}</span>
              <span style={{ color:T.textSec, alignSelf:"flex-start" }}>Details</span>
              <p style={{ color:T.navyLight, lineHeight:1.55, fontSize:13 }}>"{r.details}"</p>
              {r.evidence && (
                <>
                  <span style={{ color:T.textSec }}>Evidence</span>
                  <a href="#" onClick={e=>e.preventDefault()} style={{ color:T.blue, textDecoration:"underline" }}>📎 {r.evidence}</a>
                </>
              )}
            </div>
          </ReviewSection>

          <ReviewSection title="Approval ladder">
            <div style={{ display:"flex", flexDirection:"column", gap:10, padding:"12px 14px", background:T.bg, borderRadius:T.radiusSm, border:`1px solid ${T.border}` }}>
              <LadderStep n={1} label="Learner files request" done meta={r.appliedOn}/>
              <LadderStep n={2} label="Instructor (L1) reviews" done={!isPending} active={isPending}
                meta={isPending ? "Pending · SLA 24h from filing" : `${r.reviewedAt} · ${r.status==="approved" ? "Approved" : "Rejected"}`}/>
              <LadderStep n={3} label="Program Coordinator (L2)"
                meta={isPending ? "Only invoked if learner escalates after L1 rejection" : (r.status==="approved" ? "Not required" : "Available if learner escalates")}/>
            </div>
          </ReviewSection>

          {!isPending && r.reviewer && (
            <ReviewSection title="Decision">
              <div style={{ padding:"14px 16px", borderRadius:10, background:r.status==="approved" ? "#F0FCF7" : "#FFF6F4", border:`1px solid ${r.status==="approved" ? "#9DECC9" : "#FFB7A8"}` }}>
                <p style={{ fontSize:13, color:T.navyLight, lineHeight:1.55 }}>{r.reviewNote}</p>
                <p style={{ fontSize:11, color:T.textSec, marginTop:8 }}>— {r.reviewer} · {r.reviewedAt}</p>
              </div>
            </ReviewSection>
          )}

          <div style={{ padding:"12px 14px", background:T.kraftPale, borderRadius:T.radiusSm, border:`1px solid ${T.kraft}30` }}>
            <p style={{ fontSize:11, color:T.kraftDark, lineHeight:1.55 }}>
              <strong>Data integrity:</strong> the learner's original sign-in/out
              timestamps are never deleted. Approval adds a verification overlay
              and an instructor note; the audit trail stays intact.
            </p>
          </div>
        </div>

        {isPending ? (
          <div style={{ padding:"14px 24px", borderTop:`1px solid ${T.border}`, display:"flex", justifyContent:"flex-end", gap:10, background:T.bg, position:"sticky", bottom:0 }}>
            <button onClick={onClose} style={ghostBtnStyle}>Close</button>
            <button onClick={onReject} style={{...ghostBtnStyle, color:T.kraftDark, borderColor:"#FFB7A8"}}>Reject</button>
            <button onClick={onApprove} style={{ padding:"8px 22px", borderRadius:8, border:"none", background:T.kraft, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:FONT }}>Approve</button>
          </div>
        ) : (
          <div style={{ padding:"14px 24px", borderTop:`1px solid ${T.border}`, display:"flex", justifyContent:"flex-end", background:T.bg }}>
            <button onClick={onClose} style={{ padding:"8px 22px", borderRadius:8, border:"none", background:T.kraft, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:FONT }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Confirm action modal ────────────────────────────────
function ConfirmModal({ action, request, onCancel, onConfirm }) {
  const [note, setNote] = useState("");
  const isApprove = action === "approved";
  const canSubmit = isApprove || note.trim().length >= 5;

  return (
    <div onClick={onCancel} style={{ position:"fixed", inset:0, background:"rgba(27,37,89,0.5)", backdropFilter:"blur(2px)", zIndex:310, display:"flex", alignItems:"center", justifyContent:"center", padding:20, animation:"fadeIn 0.2s ease" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:T.white, borderRadius:T.radius, maxWidth:480, width:"100%", boxShadow:"0 20px 60px rgba(27,37,89,0.3)", animation:"scaleIn 0.25s ease" }}>
        <div style={{ padding:"18px 24px 14px", borderBottom:`1px solid ${T.border}` }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:T.navy }}>{isApprove ? "Approve request?" : "Reject request?"}</h3>
          <p style={{ fontSize:12, color:T.textSec, marginTop:3 }}>
            {request.learner.name} · {request.forDateLabel}
          </p>
        </div>
        <div style={{ padding:"18px 24px" }}>
          <p style={{ fontSize:12, color:T.navyLight, lineHeight:1.55, marginBottom:14 }}>
            {isApprove
              ? "Marking as Regularized will update the attendance record. The original timestamp is preserved per data integrity rules."
              : "The learner will be notified with your reason. They can escalate to the Program Coordinator if they disagree."}
          </p>
          <p style={{ fontSize:11, fontWeight:700, color:T.navyLight, marginBottom:6 }}>
            Add a note ({isApprove ? "optional" : "required, min 5 chars"})
          </p>
          <textarea value={note} onChange={e=>setNote(e.target.value)} rows={4}
            placeholder={isApprove
              ? "e.g. Confirmed presence via session recording / classroom observation."
              : "e.g. Filed beyond 48-hour window. Per policy, escalate to coordinator if needed."}
            style={{ width:"100%", padding:"10px 12px", borderRadius:10, border:`1px solid ${T.border}`, background:T.bg, fontSize:13, color:T.text, resize:"none", lineHeight:1.4, fontFamily:FONT }}/>
        </div>
        <div style={{ padding:"14px 24px", borderTop:`1px solid ${T.border}`, display:"flex", justifyContent:"flex-end", gap:10 }}>
          <button onClick={onCancel} style={ghostBtnStyle}>Cancel</button>
          <button onClick={()=>onConfirm(note)} disabled={!canSubmit}
            style={{
              padding:"8px 22px", borderRadius:8, border:"none",
              background: !canSubmit ? "#e9ebf0" : (isApprove ? "#02AC7D" : T.kraft),
              color: !canSubmit ? T.textMuted : "#fff",
              fontSize:13, fontWeight:700, cursor: !canSubmit ? "not-allowed" : "pointer",
              fontFamily:FONT,
            }}>
            {isApprove ? "Approve" : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Admin toast ─────────────────────────────────────────
function AdminToast({ kind, msg }) {
  return (
    <div style={{
      position:"fixed", top:80, right:24,
      padding:"12px 20px", borderRadius:12,
      background:kind==="approved" ? "#02AC7D" : T.kraft, color:"#fff",
      fontSize:13, fontWeight:700, zIndex:400,
      boxShadow:"0 8px 24px rgba(0,0,0,0.18)",
      animation:"slideUp 0.3s ease",
    }}>{msg}</div>
  );
}

// ─── REGULARIZATION REVIEW PAGE ──────────────────────────
function RegularizationsReviewPage() {
  const [requests, setRequests] = useState(REVIEW_QUEUE_INITIAL);
  const [tab, setTab]           = useState("active");
  const [detail, setDetail]     = useState(null);
  const [confirm, setConfirm]   = useState(null);
  const [toast, setToast]       = useState(null);

  const active = requests.filter(r => r.status === "pending");
  const closed = requests.filter(r => r.status !== "pending");
  const list   = tab === "active" ? active : closed;

  const review = (id, action, note) => {
    setRequests(rs => rs.map(r => r.id === id ? {
      ...r,
      status: action,
      reviewer: "Priya Kothari (Instructor · L1)",
      reviewedAt: "Just now",
      reviewNote: note || (action==="approved"
        ? "Approved based on instructor's classroom observation."
        : "Rejected."),
    } : r));
    setConfirm(null);
    setDetail(null);
    setToast({ msg: action==="approved" ? "Request approved ✓ Learner notified." : "Request rejected. Learner notified.", kind: action });
    setTimeout(()=>setToast(null), 3500);
  };

  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:18, flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:700, color:T.navy }}>Regularization Requests</h2>
          <p style={{ fontSize:14, color:T.textSec, marginTop:4 }}>
            {active.length} pending review · {closed.length} closed this month · L1 instructor approval, L2 coordinator escalation
          </p>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          <SmallBtn>📅 Date range</SmallBtn>
          <SmallBtn>🔍 Search learner</SmallBtn>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"inline-flex", gap:0, marginBottom:14, background:T.white, padding:4, borderRadius:T.radiusSm, border:`1px solid ${T.border}` }}>
        {[
          { id:"active", label:"Active", count:active.length },
          { id:"closed", label:"Closed", count:closed.length },
        ].map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{
              padding:"7px 16px", borderRadius:6, border:"none",
              background:tab===t.id?T.kraftLight:"transparent",
              color:tab===t.id?T.kraft:T.textSec,
              fontSize:13, fontWeight:tab===t.id?700:600,
              cursor:"pointer", fontFamily:FONT,
              display:"inline-flex", alignItems:"center", gap:7,
            }}>
            {t.label}
            <span style={{
              padding:"1px 8px", borderRadius:10, fontSize:11, fontWeight:700,
              background:tab===t.id?T.kraft:T.borderLight, color:tab===t.id?"#fff":T.textSec,
            }}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* List */}
      {list.length === 0 ? (
        <div style={{ padding:"60px 30px", textAlign:"center", background:T.white, borderRadius:T.radius, border:`1px solid ${T.border}` }}>
          <div style={{ fontSize:42, marginBottom:12 }}>{tab==="active" ? "✅" : "📋"}</div>
          <h4 style={{ fontSize:16, fontWeight:700, color:T.navy }}>{tab==="active" ? "Nothing pending" : "No closed requests yet"}</h4>
          <p style={{ fontSize:13, color:T.textSec, marginTop:6, maxWidth:380, margin:"6px auto 0" }}>
            {tab==="active"
              ? "All caught up — no regularization requests waiting on instructor review."
              : "Approved and rejected requests will land here once you've actioned them."}
          </p>
        </div>
      ) : (
        <div>
          {list.map(r => (
            <ReviewRequestCard key={r.id} request={r}
              onView={()=>setDetail(r)}
              onApprove={()=>setConfirm({ id:r.id, action:"approved", request:r })}
              onReject={()=>setConfirm({ id:r.id, action:"rejected", request:r })}
            />
          ))}
        </div>
      )}

      {detail && <DetailsModal request={detail} onClose={()=>setDetail(null)}
        onApprove={()=>setConfirm({ id:detail.id, action:"approved", request:detail })}
        onReject={()=>setConfirm({ id:detail.id, action:"rejected", request:detail })}/>}

      {confirm && <ConfirmModal {...confirm}
        onCancel={()=>setConfirm(null)}
        onConfirm={(note)=>review(confirm.id, confirm.action, note)}/>}

      {toast && <AdminToast {...toast}/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HOMEPAGE
// ═══════════════════════════════════════════════════════════════
function HomePage() {
  const hour = new Date().getHours();
  const greet = hour<12?"Good Morning":hour<17?"Good Afternoon":"Good Evening";
  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <div style={{ background:`linear-gradient(135deg,${T.kraft} 0%,#FF6B4A 50%,#FF8F6B 100%)`,borderRadius:T.radius,padding:"36px 40px",marginBottom:28,position:"relative",overflow:"hidden",color:"#fff" }}>
        <div style={{ position:"absolute",top:-40,right:-20,width:260,height:260,borderRadius:"50%",background:"rgba(255,255,255,0.08)" }}/>
        <div style={{ position:"absolute",bottom:-60,right:80,width:180,height:180,borderRadius:"50%",background:"rgba(255,255,255,0.05)" }}/>
        <div style={{ position:"absolute",top:20,right:40,fontSize:64,opacity:0.15,fontWeight:800 }}>K</div>
        <p style={{ fontSize:14,opacity:0.8,marginBottom:4,fontWeight:500 }}>{greet},</p>
        <h1 style={{ fontSize:28,fontWeight:700,marginBottom:6 }}>Program Coordinator</h1>
        <p style={{ fontSize:15,opacity:0.85 }}>Let's build something great today 🚀</p>
        <div style={{ display:"inline-flex",alignItems:"center",gap:8,marginTop:16,background:"rgba(255,255,255,0.18)",borderRadius:30,padding:"8px 18px",fontSize:13,fontWeight:500 }}>
          <span style={{ width:8,height:8,borderRadius:"50%",background:"#05CD99" }}/>Batch 1 — PGP in AI-Led Marketing · 28 active learners
        </div>
      </div>
      <div style={{ marginBottom:28 }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14 }}>
          <h3 style={{ fontSize:16,fontWeight:700,color:T.navy }}>My Favourites</h3>
          <span style={{ fontSize:12,color:T.textMuted,cursor:"pointer" }}>+ Add shortcut</span>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14 }}>
          {[{l:"Batch Overview",i:I.users,c:T.blue},{l:"Session Calendar",i:I.calendar,c:T.green},{l:"Curriculum",i:I.book,c:T.orange},{l:"Reports",i:I.fileText,c:T.kraft}].map((q,i)=>(
            <div key={i} style={{ background:T.white,borderRadius:T.radiusSm,padding:"20px 16px",textAlign:"center",cursor:"pointer",border:`1px solid ${T.border}`,transition:"all 0.2s",boxShadow:T.shadow }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=T.shadowHover}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=T.shadow}}>
              <div style={{ width:44,height:44,borderRadius:12,margin:"0 auto 10px",display:"flex",alignItems:"center",justifyContent:"center",background:q.c+"12",color:q.c }}>{q.i}</div>
              <span style={{ fontSize:13,fontWeight:600,color:T.navyLight }}>{q.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>
        <div style={{ background:T.white,borderRadius:T.radius,padding:24,border:`1px solid ${T.border}`,boxShadow:T.shadow }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18 }}>
            <h3 style={{ fontSize:16,fontWeight:700,color:T.navy }}>My Tasks</h3>
            <span style={{ background:T.kraft,color:"#fff",borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:700 }}>4 pending</span>
          </div>
          {[{l:"Review 3 regularization requests",t:"Attendance",u:true},{l:"Approve session schedule for Week 12",t:"Schedule",u:false},{l:"5 learners below 75% threshold",t:"Alert",u:true},{l:"Upload holiday calendar for June",t:"Setup",u:false}].map((t,i)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:i<3?`1px solid ${T.borderLight}`:"none" }}>
              <div style={{ width:8,height:8,borderRadius:"50%",flexShrink:0,background:t.u?T.kraft:T.orange }}/>
              <div style={{ flex:1 }}><p style={{ fontSize:13,fontWeight:500,color:T.text }}>{t.l}</p><p style={{ fontSize:11,color:T.textMuted,marginTop:2 }}>{t.t}</p></div>
              <span style={{ fontSize:12,color:T.blue,fontWeight:600,cursor:"pointer" }}>Review →</span>
            </div>
          ))}
        </div>
        <div style={{ background:T.white,borderRadius:T.radius,padding:24,border:`1px solid ${T.border}`,boxShadow:T.shadow }}>
          <h3 style={{ fontSize:16,fontWeight:700,color:T.navy,marginBottom:18 }}>Latest Updates</h3>
          {[{d:"16 May 2026",t:"Offline attendance module live for Batch 1"},{d:"14 May",t:"Geofence setup completed for Gurugram campus"},{d:"10 May",t:"Session schedule synced for Digital Marketing Fundamentals"},{d:"08 May",t:"New regularization workflow activated"}].map((u,i)=>(
            <div key={i} style={{ padding:"12px 0",borderBottom:i<3?`1px solid ${T.borderLight}`:"none" }}>
              <p style={{ fontSize:11,color:T.textMuted,marginBottom:4 }}>{u.d}</p><p style={{ fontSize:13,fontWeight:500,color:T.text }}>{u.t}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop:28 }}>
        <h3 style={{ fontSize:16,fontWeight:700,color:T.navy,marginBottom:14 }}>Help Links</h3>
        <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
          {["📚 Knowledge Base","🎥 How-to Videos","💬 Community","📝 Raise a Ticket","📻 Kraftshala Live"].map((h,i)=>(
            <span key={i} style={{ background:T.white,border:`1px solid ${T.border}`,borderRadius:30,padding:"8px 18px",fontSize:13,fontWeight:500,color:T.navyLight,cursor:"pointer" }}
              onMouseEnter={e=>e.currentTarget.style.background=T.borderLight} onMouseLeave={e=>e.currentTarget.style.background=T.white}>{h}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════════════════════════
function SettingsPage({ onNavigate }) {
  const [exp, setExp] = useState("attendance");
  const secs = [
    { id:"attendance",label:"Attendance",icon:I.check,desc:"Configure schemes, policies, schedules",items:ATT_PAGES },
    { id:"users",label:"User Management",icon:I.users,desc:"Manage learners, instructors, coordinators",items:[] },
    { id:"notifications",label:"Notifications",icon:I.bell,desc:"Configure notification preferences",items:[] },
    { id:"integrations",label:"Integrations",icon:I.grid,desc:"Third-party integrations",items:[] },
  ];
  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <h2 style={{ fontSize:24,fontWeight:700,color:T.navy,marginBottom:4 }}>Settings</h2>
      <p style={{ fontSize:14,color:T.textSec,marginBottom:24 }}>Manage your LMS configuration</p>
      <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
        {secs.map(s=>(
          <div key={s.id} style={{ background:T.white,borderRadius:T.radius,border:`1px solid ${T.border}`,boxShadow:T.shadow,overflow:"hidden" }}>
            <div onClick={()=>setExp(exp===s.id?null:s.id)} style={{ display:"flex",alignItems:"center",gap:16,padding:"18px 24px",cursor:"pointer",transition:"background 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.background=T.borderLight} onMouseLeave={e=>e.currentTarget.style.background=T.white}>
              <div style={{ width:42,height:42,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",background:s.id==="attendance"?T.kraftLight:T.blueBg,color:s.id==="attendance"?T.kraft:T.blue }}>{s.icon}</div>
              <div style={{ flex:1 }}><p style={{ fontSize:15,fontWeight:600,color:T.navy }}>{s.label}</p><p style={{ fontSize:12,color:T.textMuted }}>{s.desc}</p></div>
              <div style={{ transform:exp===s.id?"rotate(180deg)":"rotate(0)",transition:"transform 0.3s",color:T.textMuted }}>{I.chevDown}</div>
            </div>
            {exp===s.id && s.items.length>0 && (
              <div style={{ borderTop:`1px solid ${T.border}`,padding:"8px 16px 14px",background:T.borderLight }}>
                {s.items.map((item,i)=>(
                  <div key={item.id} onClick={()=>onNavigate("attendance",item.id)}
                    style={{ display:"flex",alignItems:"center",gap:14,padding:"13px 16px",borderRadius:T.radiusSm,cursor:"pointer",transition:"all 0.2s",animation:`slideIn 0.3s ease ${i*0.05}s both` }}
                    onMouseEnter={e=>{e.currentTarget.style.background=T.white;e.currentTarget.style.boxShadow=T.shadow}}
                    onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.boxShadow="none"}}>
                    <div style={{ color:T.kraft,opacity:0.7 }}>{item.icon}</div>
                    <div style={{ flex:1 }}><p style={{ fontSize:14,fontWeight:600,color:T.navyLight }}>{item.label}</p></div>
                    <div style={{ color:T.textMuted }}>{I.chevRight}</div>
                  </div>
                ))}
              </div>
            )}
            {exp===s.id && s.items.length===0 && (
              <div style={{ borderTop:`1px solid ${T.border}`,padding:"28px 24px",background:T.borderLight,textAlign:"center" }}>
                <p style={{ fontSize:14,color:T.textMuted }}>Coming soon — not in MVP scope</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SIDE PANEL (left drawer with Attendance + hover sub-menu)
// ═══════════════════════════════════════════════════════════════
function SidePanel({ open, onClose, onSelect }) {
  const [attHover, setAttHover] = useState(false);
  const subItems = [
    { id:"swipes",         label:"Learner Swipes",     icon:I.swipe,     live:false },
    { id:"regularization", label:"Regularization",     icon:I.shield,    live:true  },
    { id:"muster",         label:"Attendance Muster",  icon:I.fileText,  live:false },
    { id:"info",           label:"Attendance Info",    icon:I.info,      live:true  },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position:"fixed", inset:0, background:"rgba(27,37,89,0.45)",
          backdropFilter:"blur(2px)",
          opacity:open?1:0, pointerEvents:open?"auto":"none",
          transition:"opacity 0.25s ease", zIndex:200,
        }}
      />

      {/* Panel */}
      <aside
        style={{
          position:"fixed", top:0, left:0, bottom:0, width:300,
          background:T.white, borderRight:`1px solid ${T.border}`,
          transform:open?"translateX(0)":"translateX(-100%)",
          transition:"transform 0.28s cubic-bezier(0.4,0,0.2,1)",
          zIndex:201, display:"flex", flexDirection:"column",
          boxShadow:open?"4px 0 32px rgba(27,37,89,0.18)":"none",
        }}
      >
        {/* Header */}
        <div style={{
          padding:"18px 22px", borderBottom:`1px solid ${T.border}`,
          display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{
              width:32, height:32, borderRadius:10,
              background:`linear-gradient(135deg,${T.kraft},#FF6B4A)`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontWeight:800, fontSize:16, color:"#fff",
            }}>K</div>
            <div>
              <p style={{ fontSize:14, fontWeight:700, color:T.navy, lineHeight:1.2 }}>Quick Access</p>
              <p style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>Program Coordinator</p>
            </div>
          </div>
          <div
            onClick={onClose}
            style={{
              width:32, height:32, borderRadius:8, cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              color:T.textSec, transition:"all 0.15s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.background=T.borderLight;e.currentTarget.style.color=T.kraft}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.textSec}}
          >{I.xClose}</div>
        </div>

        {/* Section label */}
        <div style={{ padding:"16px 22px 8px" }}>
          <p style={{ fontSize:11, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1.2 }}>
            Workspaces
          </p>
        </div>

        {/* Attendance item with hover-expand sub-menu */}
        <div style={{ padding:"0 12px" }}
          onMouseEnter={()=>setAttHover(true)}
          onMouseLeave={()=>setAttHover(false)}
        >
          <div style={{
            display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
            borderRadius:T.radiusSm, cursor:"pointer", transition:"all 0.2s",
            background:attHover?T.kraftLight:"transparent",
            color:attHover?T.kraft:T.navyLight,
            fontWeight:attHover?700:600, fontSize:14,
            borderLeft:`3px solid ${attHover?T.kraft:"transparent"}`,
          }}>
            <span style={{ opacity:attHover?1:0.7 }}>{I.check}</span>
            <span style={{ flex:1 }}>Attendance</span>
            <span style={{
              transform:attHover?"rotate(90deg)":"rotate(0)",
              transition:"transform 0.25s ease",
              opacity:0.6,
            }}>{I.chevRight}</span>
          </div>

          {/* Inline-expanding sub-menu */}
          <div style={{
            maxHeight:attHover?260:0, overflow:"hidden",
            transition:"max-height 0.3s ease",
          }}>
            <div style={{
              padding:"6px 0 10px 26px",
              borderLeft:`1.5px solid ${T.kraftLight}`,
              marginLeft:18, marginTop:4,
            }}>
              {subItems.map((item,i)=>(
                <div key={item.id}
                  onClick={()=>item.live && onSelect?.(item.id)}
                  style={{
                    display:"flex", alignItems:"center", gap:11, padding:"10px 12px",
                    borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:500,
                    color:T.textSec, transition:"all 0.15s",
                    animation:attHover?`slideIn 0.25s ease ${i*0.04}s both`:"none",
                  }}
                  onMouseEnter={e=>{
                    e.currentTarget.style.background=T.borderLight;
                    e.currentTarget.style.color=T.kraft;
                  }}
                  onMouseLeave={e=>{
                    e.currentTarget.style.background="transparent";
                    e.currentTarget.style.color=T.textSec;
                  }}
                >
                  <span style={{ opacity:0.7 }}>{item.icon}</span>
                  <span style={{ flex:1 }}>{item.label}</span>
                  {item.live && (
                    <span style={{ fontSize:9, fontWeight:800, color:T.kraft, background:T.kraftLight, padding:"2px 6px", borderRadius:4, letterSpacing:0.5 }}>OPEN</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer hint */}
        <div style={{ marginTop:"auto", padding:"16px 22px", borderTop:`1px solid ${T.border}`, background:T.bg }}>
          <p style={{ fontSize:11, color:T.textMuted, lineHeight:1.5 }}>
            Hover the <strong style={{ color:T.navyLight }}>Attendance</strong> item to reveal quick actions.
          </p>
        </div>
      </aside>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// ADMIN APP (Program Coordinator console)
// ═══════════════════════════════════════════════════════════════
function AdminApp() {
  const [view, setView] = useState("home");
  const [attPage, setAttPage] = useState("scheme");
  const [sideOpen, setSideOpen] = useState(false);
  const nav = (v,sub) => { setView(v); if(sub) setAttPage(sub); };

  return (
    <div style={{ minHeight:"100vh",background:T.bg,fontFamily:FONT }}>
      <Styles/>
      <SidePanel
        open={sideOpen}
        onClose={()=>setSideOpen(false)}
        onSelect={(id)=>{
          if (id === "info") { setView("attendanceInfo"); setSideOpen(false); }
          if (id === "regularization") { setView("regularizations"); setSideOpen(false); }
        }}
      />
      {/* Navbar */}
      <div style={{ background:T.white,borderBottom:`1px solid ${T.border}`,padding:"0 32px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100,boxShadow:"0 1px 12px rgba(27,37,89,0.04)" }}>
        <div style={{ display:"flex",alignItems:"center",gap:6 }}>
          <div
            onClick={()=>setSideOpen(true)}
            title="Open menu"
            style={{
              width:38, height:38, borderRadius:10, cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              color:T.textSec, transition:"all 0.15s", marginRight:4,
            }}
            onMouseEnter={e=>{e.currentTarget.style.background=T.bg;e.currentTarget.style.color=T.kraft}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.textSec}}
          >{I.menu}</div>
          <div style={{ display:"flex",alignItems:"center",gap:12,cursor:"pointer" }} onClick={()=>setView("home")}>
            <div style={{ width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${T.kraft},#FF6B4A)`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:18,color:"#fff" }}>K</div>
            <span style={{ fontSize:18,fontWeight:800,color:T.navy,letterSpacing:-0.5 }}>kraftshala</span>
            <span style={{ fontSize:10,fontWeight:700,color:T.textMuted,background:T.bg,padding:"3px 8px",borderRadius:6,marginLeft:4 }}>LMS</span>
          </div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:10,background:T.bg,borderRadius:30,padding:"8px 20px",width:340,border:`1px solid ${T.border}` }}>
          <span style={{ color:T.textMuted }}>{I.search}</span>
          <input placeholder="Search actions..." style={{ border:"none",outline:"none",background:"transparent",fontSize:14,color:T.text,width:"100%",fontFamily:FONT }}/>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <div style={{ width:40,height:40,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:T.textSec,position:"relative" }} onMouseEnter={e=>e.currentTarget.style.background=T.bg} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            {I.bell}<div style={{ position:"absolute",top:8,right:8,width:8,height:8,borderRadius:"50%",background:T.kraft }}/>
          </div>
          <div onClick={()=>setView("settings")} style={{ width:40,height:40,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:view==="settings"||view==="attendance"?T.kraft:T.textSec,background:view==="settings"||view==="attendance"?T.kraftLight:"transparent",transition:"all 0.2s" }}
            onMouseEnter={e=>{if(view==="home")e.currentTarget.style.background=T.bg}} onMouseLeave={e=>{if(view==="home")e.currentTarget.style.background="transparent"}} title="Settings">{I.settings}</div>
          <div style={{ width:38,height:38,borderRadius:12,background:`linear-gradient(135deg,${T.kraft},#FF6B4A)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#fff",cursor:"pointer",marginLeft:4 }}>PC</div>
        </div>
      </div>
      {/* Content */}
      <div style={{ maxWidth:1140,margin:"0 auto",padding:"24px 32px" }}>
        {view!=="home" && (
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:20,fontSize:13,animation:"fadeIn 0.3s ease" }}>
            <span onClick={()=>setView("home")} style={{ color:T.textMuted,cursor:"pointer",fontWeight:500 }} onMouseEnter={e=>e.currentTarget.style.color=T.kraft} onMouseLeave={e=>e.currentTarget.style.color=T.textMuted}>Home</span>
            <span style={{ color:T.textMuted }}>›</span>
            {view==="attendanceInfo" ? (
              <>
                <span style={{ color:T.navy,fontWeight:600 }}>Attendance</span>
                <span style={{ color:T.textMuted }}>›</span>
                <span style={{ color:T.kraft,fontWeight:700 }}>Attendance Info</span>
              </>
            ) : view==="regularizations" ? (
              <>
                <span style={{ color:T.navy,fontWeight:600 }}>Attendance</span>
                <span style={{ color:T.textMuted }}>›</span>
                <span style={{ color:T.kraft,fontWeight:700 }}>Regularization Requests</span>
              </>
            ) : (
              <>
                <span onClick={()=>setView("settings")} style={{ color:view==="settings"?T.navy:T.textMuted,cursor:"pointer",fontWeight:view==="settings"?600:500 }} onMouseEnter={e=>e.currentTarget.style.color=T.kraft} onMouseLeave={e=>e.currentTarget.style.color=view==="settings"?T.navy:T.textMuted}>Settings</span>
                {view==="attendance" && <><span style={{ color:T.textMuted }}>›</span><span style={{ color:T.navy,fontWeight:600 }}>Attendance</span><span style={{ color:T.textMuted }}>›</span><span style={{ color:T.kraft,fontWeight:700 }}>{ATT_PAGES.find(p=>p.id===attPage)?.label}</span></>}
              </>
            )}
          </div>
        )}
        {view==="home" && <HomePage/>}
        {view==="settings" && <SettingsPage onNavigate={nav}/>}
        {view==="attendance" && <AttendancePage activePage={attPage} onPageChange={setAttPage}/>}
        {view==="attendanceInfo" && <AttendanceInfoPage/>}
        {view==="regularizations" && <RegularizationsReviewPage/>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PERSONA SWITCHER (floating pill, bottom-right)
// ═══════════════════════════════════════════════════════════════
function PersonaSwitcher({ persona, setPersona }) {
  return (
    <div style={{
      position:"fixed", bottom:18, right:18, zIndex:500,
      background:T.white, border:`1px solid ${T.border}`,
      borderRadius:30, padding:4, boxShadow:"0 10px 32px rgba(27,37,89,0.18)",
      display:"flex", gap:0, fontFamily:FONT,
    }}>
      {[
        { id:"admin",      label:"🖥  Admin"      },
        { id:"instructor", label:"👨‍🏫  Instructor" },
        { id:"learner",    label:"📱  Learner"    },
      ].map(p => (
        <button key={p.id} onClick={()=>setPersona(p.id)}
          style={{
            padding:"8px 14px", borderRadius:26, border:"none",
            background:persona===p.id ? T.kraft : "transparent",
            color:persona===p.id ? "#fff" : T.navyLight,
            fontSize:12, fontWeight:700, cursor:"pointer",
            fontFamily:FONT, transition:"all 0.18s",
          }}>
          {p.label}
        </button>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TOP-LEVEL APP — picks Admin / Instructor / Learner; hash routes
// ═══════════════════════════════════════════════════════════════
function personaFromHash() {
  if (typeof window === "undefined") return "admin";
  if (window.location.hash === "#learner")    return "learner";
  if (window.location.hash === "#instructor") return "instructor";
  return "admin";
}

export default function App() {
  const [persona, setPersona] = useState(personaFromHash);

  // Keep URL hash in sync so direct links work
  useEffect(() => {
    const expected = persona === "admin" ? "" : `#${persona}`;
    if ((window.location.hash || "") !== expected) {
      window.history.replaceState(null, "", expected || window.location.pathname);
    }
  }, [persona]);

  // React to back/forward / external hash changes
  useEffect(() => {
    const onHash = () => setPersona(personaFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <>
      {persona === "learner"    && <LearnerApp/>}
      {persona === "instructor" && <InstructorApp/>}
      {persona === "admin"      && <AdminApp/>}
      <PersonaSwitcher persona={persona} setPersona={setPersona}/>
    </>
  );
}
