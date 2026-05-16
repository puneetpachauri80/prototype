import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// LEARNER MOBILE APP — Kraftshala LMS (offline attendance)
// ═══════════════════════════════════════════════════════════════
// Self-contained file: theme, icons, mock data, all screens.
// Renders inside a faux phone frame on desktop; full-screen on mobile.
// ═══════════════════════════════════════════════════════════════

// ─── THEME ───────────────────────────────────────────────────
const T = {
  bg:"#F5F6FA", white:"#FFFFFF",
  kraft:"#E8390E", kraftDark:"#C62E0A", kraftLight:"#FFF0ED", kraftPale:"#FFF8F6",
  navy:"#1B2559", navyLight:"#2B3674",
  text:"#1B2559", textSec:"#707EAE", textMuted:"#A3AED0",
  border:"#E9EDF7", borderLight:"#F4F7FE",
  green:"#02AC7D", greenLight:"#E7FBF5",
  rose:"#E8390E", roseLight:"#FEE7E2",
  blue:"#4318FF", blueLight:"#EFE9FF",
  shadow:"0 4px 24px rgba(27,37,89,0.06)",
  shadowHover:"0 8px 32px rgba(27,37,89,0.12)",
  radius:16, radiusSm:10,
};
const FONT = "'Outfit','DM Sans',-apple-system,sans-serif";

// ─── ICONS ───────────────────────────────────────────────────
const I = {
  menu:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  bell:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  close:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  back:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  check:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  pin:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  clock:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  calendar:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  shield:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  book:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  user:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  alertC:  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  home:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  cR:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  cD:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  info:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  arrowIn: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  arrowOut:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  wifi:    <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><circle cx="1.5" cy="8.5" r="1.5"/><path d="M4.5 6.5c1.66-1 3.34-1 5 0L7.5 4.5C5.84 3.5 4.16 3.5 2.5 4.5z"/><path d="M0 4.5c2.21-1.66 5.79-1.66 8 0L9 3C6.79 1.34 3.21 1.34 1 3z"/></svg>,
  battery: <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="currentColor"/><rect x="2" y="2" width="15" height="7" rx="1" fill="currentColor"/><rect x="20" y="3" width="1.5" height="5" rx="0.5" fill="currentColor"/></svg>,
  signal:  <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0"  y="7" width="3" height="3" rx="0.5"/><rect x="4.5" y="5" width="3" height="5" rx="0.5"/><rect x="9"  y="2.5" width="3" height="7.5" rx="0.5"/><rect x="13" y="0" width="3" height="10" rx="0.5"/></svg>,
};

// ─── STYLES ──────────────────────────────────────────────────
const Styles = () => <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:${FONT};color:${T.text}}
  ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${T.border};border-radius:3px}
  @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes scaleIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.85)}}
  @keyframes ping{0%{transform:scale(1);opacity:0.6}100%{transform:scale(3);opacity:0}}
  @keyframes drawSlide{from{transform:translateX(-100%)}to{transform:translateX(0)}}
  input,textarea{font-family:${FONT}}
  input:focus,textarea:focus{outline:none;border-color:${T.kraft};box-shadow:0 0 0 3px ${T.kraft}18}
`}</style>;

// ─── MOCK DATA ───────────────────────────────────────────────
const LEARNER = {
  name:"Aarav Sharma", firstName:"Aarav",
  rollNo:"L-2026-0143", avatar:"AS",
  batch:"PGP AI-Led Marketing · Batch 1",
  attendancePct:92, present:11, total:12,
  avgStudyHrs:"3h 35m",
};

const SCHEME   = "PGP AI-Led Marketing — Offline Batch 1 Attendance Scheme";
const SCHEDULE = "PGP AILM — Weekday Schedule (Mon–Sat, 9 AM – 1 PM)";

// "Today" simulated state. Time advances through the day for the demo.
const TODAY = {
  date:"Saturday, 16 May 2026", iso:"16 May 2026",
  // Both sessions for today
  sessions:[
    { id:1, name:"Brand Strategy Foundations",  timing:"09:00 – 11:00", scheduledStart:"09:00", scheduledEnd:"11:00" },
    { id:2, name:"AI in Performance Marketing", timing:"11:30 – 13:00", scheduledStart:"11:30", scheduledEnd:"13:00" },
  ],
};

// Geofence (campus center). Lat/lng matches admin's setup screen.
const GEOFENCE = { lat:28.45953, lng:77.02664, radius:100, name:"Kraftshala Campus, Gurugram" };

// Status config for calendar — same as admin for consistency.
const STATUS = {
  P:  { code:"P",  label:"Present",     bg:"#E7FBF5", fg:"#02AC7D",   border:"#9DECC9" },
  A:  { code:"A",  label:"Absent",      bg:"#FEE7E2", fg:T.kraftDark, border:"#FFB7A8" },
  L:  { code:"L",  label:"Late",        bg:"#FFF4DB", fg:"#B66F00",   border:"#F1D693" },
  HD: { code:"HD", label:"Half Day",    bg:"#FFE9D3", fg:"#C25F00",   border:"#FFC899" },
  R:  { code:"R",  label:"Regularized", bg:"#EFE9FF", fg:"#5A3FD9",   border:"#C9B8FF" },
  H:  { code:"H",  label:"Holiday",     bg:"#EEF0F7", fg:"#5D6B97",   border:"#D8DDEA" },
  W:  { code:"W",  label:"Weekend",     bg:"#F8FAFD", fg:"#A3AED0",   border:"#E9EDF7" },
  C:  { code:"C",  label:"Cancelled",   bg:"#F0F2F6", fg:"#828FB0",   border:"#D8DDEA", stripe:true },
  IP: { code:"IP", label:"In Progress", bg:"#E7FBF5", fg:"#02AC7D",   border:"#02AC7D", pulse:true },
};

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

const DAYS = {
  1:  { kind:"event",   date:"01 May 2026", weekday:"Friday",    status:"H",  title:"Labour Day", note:"Public holiday — no classes scheduled." },
  2:  { kind:"summary", date:"02 May 2026", weekday:"Saturday",  status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"02 May, 13:08 PM", firstIn:"08:55 AM", lastOut:"12:58 PM", studyHrs:"3h 58m", lateBy:"0 min", verification:"Verified by Priya Kothari" },
  3:  { kind:"event",   date:"03 May 2026", weekday:"Sunday",    status:"W",  title:"Weekend", note:"No classes on Sundays." },
  4:  { kind:"summary", date:"04 May 2026", weekday:"Monday",    status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"04 May, 13:11 PM", firstIn:"08:57 AM", lastOut:"13:02 PM", studyHrs:"4h 04m", lateBy:"0 min", verification:"Verified by Priya Kothari" },
  5:  { kind:"summary", date:"05 May 2026", weekday:"Tuesday",   status:"L",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"05 May, 13:06 PM", firstIn:"09:18 AM", lastOut:"13:01 PM", studyHrs:"3h 40m", lateBy:"18 min", verification:"Verified by Priya Kothari", note:"Sign-in for Session 1 was 18 minutes after start. Counts as Late." },
  6:  { kind:"summary", date:"06 May 2026", weekday:"Wednesday", status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"06 May, 13:10 PM", firstIn:"08:59 AM", lastOut:"13:00 PM", studyHrs:"4h 01m", lateBy:"0 min", verification:"Verified by Priya Kothari" },
  7:  { kind:"summary", date:"07 May 2026", weekday:"Thursday",  status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"07 May, 13:07 PM", firstIn:"08:55 AM", lastOut:"12:59 PM", studyHrs:"4h 04m", lateBy:"0 min", verification:"Verified by Priya Kothari" },
  8:  { kind:"summary", date:"08 May 2026", weekday:"Friday",    status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"08 May, 13:09 PM", firstIn:"08:58 AM", lastOut:"13:01 PM", studyHrs:"4h 03m", lateBy:"0 min", verification:"Verified by Priya Kothari" },
  9:  { kind:"summary", date:"09 May 2026", weekday:"Saturday",  status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"09 May, 13:05 PM", firstIn:"08:56 AM", lastOut:"12:58 PM", studyHrs:"4h 02m", lateBy:"0 min", verification:"Verified by Priya Kothari" },
  10: { kind:"event",   date:"10 May 2026", weekday:"Sunday",    status:"W",  title:"Weekend", note:"No classes on Sundays." },
  11: { kind:"event",   date:"11 May 2026", weekday:"Monday",    status:"A",  title:"Absent — no sign-in received", note:"Geofence proximity was not confirmed at the start of either session. Counts as 1 absent day.", regularization:true },
  12: { kind:"summary", date:"12 May 2026", weekday:"Tuesday",   status:"R",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"13 May, 10:14 AM", firstIn:"Manual mark", lastOut:"Manual mark", studyHrs:"3h 58m (regularized)", lateBy:"—", verification:"Regularization approved by Priya Kothari", note:"Originally Absent — regularization approved on 13 May based on instructor confirmation." },
  13: { kind:"summary", date:"13 May 2026", weekday:"Wednesday", status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"13 May, 13:08 PM", firstIn:"08:59 AM", lastOut:"13:01 PM", studyHrs:"4h 02m", lateBy:"0 min", verification:"Verified by Priya Kothari" },
  14: { kind:"event",   date:"14 May 2026", weekday:"Thursday",  status:"C",  title:"Session Cancelled", note:"Cancelled by Program Coordinator on 13 May. Reason: Instructor emergency. Excluded from attendance %." },
  15: { kind:"summary", date:"15 May 2026", weekday:"Friday",    status:"HD", scheme:SCHEME, schedule:SCHEDULE, processedAt:"15 May, 13:00 PM", firstIn:"08:59 AM", lastOut:"10:32 AM", studyHrs:"1h 32m", lateBy:"0 min", verification:"Session 1 verified by Priya Kothari", note:"Early departure at 10:32 AM. Less than 50% of session — counts as Half Day." },
  16: {
    kind:"full",
    date:"16 May 2026", weekday:"Saturday", status:"IP",
    scheme:SCHEME, schedule:SCHEDULE,
    processedAt:"16 May, 11:33 AM (live)",
    firstIn:"08:58 AM", lastOut:"—", studyHrs:"1h 57m", lateBy:"2 min",
    verification:"S1 verified by Priya K. · S2 verification pending",
    sessions:[
      { id:1, name:"Brand Strategy Foundations",  timing:"09:00 – 11:00", signIn:"08:58:42", signOut:"10:55:11", lateBy:"0 min", verifiedBy:"Priya K.", status:"Present"     },
      { id:2, name:"AI in Performance Marketing", timing:"11:30 – 13:00", signIn:"11:32:09", signOut:"—",        lateBy:"2 min", verifiedBy:"Pending",  status:"In Progress" },
    ],
    swipes:[
      { id:"sw1", type:"IN",  time:"08:58:42", session:1, status:"verified", lat:28.45947, lng:77.02671, dist:"12 m" },
      { id:"sw2", type:"OUT", time:"10:55:11", session:1, status:"verified", lat:28.45951, lng:77.02668, dist:"8 m"  },
      { id:"sw3", type:"IN",  time:"11:32:09", session:2, status:"verified", lat:28.45945, lng:77.02674, dist:"15 m" },
      { id:"sw4", type:"OUT", time:null,       session:2, status:"pending",  lat:null,     lng:null,     dist:null   },
    ],
  },
};

// ─── REGULARIZATION DATA ─────────────────────────────────────
// Reason types come from the PRD's regularization workflow.
const REASON_TYPES = [
  "I was present but forgot to check in",
  "I checked in but wasn't verified by the instructor",
  "I was late but had a valid reason",
  "I had to leave early for a valid reason",
];

// Days from Aarav's record that are still eligible to file a regularization for.
const ELIGIBLE_DAYS = [
  { d:11, status:"A",  date:"11 May 2026", weekday:"Monday",  note:"No sign-in received. Counts as 1 absent day." },
  { d:5,  status:"L",  date:"05 May 2026", weekday:"Tuesday", note:"Late sign-in at 09:18 (18 min after start)." },
  { d:15, status:"HD", date:"15 May 2026", weekday:"Friday",  note:"Left at 10:32 — below 50% threshold = Half Day." },
];

// Learner's own past requests.
const MY_REGS_INITIAL = [
  {
    id:"REG-2026-0006",
    forDate:"12 May 2026", forDateLabel:"Tuesday, 12 May",
    appliedOn:"12 May 2026, 14:30",
    reasonType:"I was present but forgot to check in",
    details:"Phone GPS was acting up at 09:00 — couldn't confirm location. Was in class throughout S1 and S2. Priya can confirm.",
    sessions:"Both sessions",
    status:"approved",
    reviewer:"Priya Kothari (Instructor · L1)",
    reviewedAt:"13 May 2026, 10:14",
    reviewNote:"Confirmed presence in classroom for both sessions. Attendance updated to Regularized.",
  },
];

// ═══════════════════════════════════════════════════════════════
// PHONE FRAME — desktop-only shell. Below 480px viewport, full-screen.
// ═══════════════════════════════════════════════════════════════
function PhoneFrame({ children }) {
  const [narrow, setNarrow] = useState(typeof window !== "undefined" && window.innerWidth < 540);
  useEffect(() => {
    const r = () => setNarrow(window.innerWidth < 540);
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);

  if (narrow) {
    // Native mobile — render content edge-to-edge
    return (
      <div style={{ minHeight:"100vh", background:T.white, color:T.text, fontFamily:FONT }}>
        {children}
      </div>
    );
  }

  // Desktop — wrap in a phone bezel so reviewers see the mobile experience
  return (
    <div style={{
      minHeight:"100vh", background:"#0d0d0f",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"32px 16px", fontFamily:FONT,
    }}>
      <div style={{
        width:414, background:"#1c1c1e", borderRadius:54, padding:11,
        boxShadow:"0 30px 80px rgba(0,0,0,0.55), inset 0 0 0 1.5px #2a2a2c",
        position:"relative",
      }}>
        {/* Side buttons */}
        <span style={{ position:"absolute", left:-2, top:110, width:3, height:30, background:"#2a2a2c", borderRadius:2 }}/>
        <span style={{ position:"absolute", left:-2, top:170, width:3, height:55, background:"#2a2a2c", borderRadius:2 }}/>
        <span style={{ position:"absolute", left:-2, top:240, width:3, height:55, background:"#2a2a2c", borderRadius:2 }}/>
        <span style={{ position:"absolute", right:-2, top:180, width:3, height:80, background:"#2a2a2c", borderRadius:2 }}/>

        <div style={{
          background:T.white, borderRadius:44, overflow:"hidden",
          height:830, display:"flex", flexDirection:"column", position:"relative",
        }}>
          {/* Dynamic Island */}
          <div style={{
            position:"absolute", top:11, left:"50%", transform:"translateX(-50%)",
            width:124, height:34, background:"#000", borderRadius:20, zIndex:50,
          }}/>
          {/* Status bar */}
          <div style={{
            height:48, padding:"14px 28px 0", display:"flex",
            justifyContent:"space-between", alignItems:"center",
            fontSize:14, fontWeight:600, color:T.navy, flexShrink:0, zIndex:1,
          }}>
            <span style={{ fontVariantNumeric:"tabular-nums" }}>11:25</span>
            <span style={{ display:"flex", gap:6, alignItems:"center", color:T.navy }}>
              {I.signal}{I.wifi}{I.battery}
            </span>
          </div>
          {/* Scrollable content area */}
          <div style={{ flex:1, overflowY:"auto", overflowX:"hidden", position:"relative" }}>
            {children}
          </div>
          {/* Home indicator */}
          <div style={{
            position:"absolute", bottom:8, left:"50%", transform:"translateX(-50%)",
            width:134, height:5, background:"#000", borderRadius:3, opacity:0.85, zIndex:50,
          }}/>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SHARED UI HELPERS
// ═══════════════════════════════════════════════════════════════
function MobileHeader({ title, left, right, onLeft, onRight, sticky }) {
  return (
    <div style={{
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"12px 16px", background:T.white,
      borderBottom:`1px solid ${T.border}`,
      position:sticky?"sticky":"relative", top:0, zIndex:10,
    }}>
      <button onClick={onLeft} style={{ background:"none", border:"none", padding:8, color:T.navy, cursor:"pointer", display:"flex" }}>
        {left || I.menu}
      </button>
      <h2 style={{ fontSize:15, fontWeight:700, color:T.navy }}>{title}</h2>
      <button onClick={onRight} style={{ background:"none", border:"none", padding:8, color:T.navy, cursor:"pointer", display:"flex" }}>
        {right || I.bell}
      </button>
    </div>
  );
}

function StatusChip({ code, sm }) {
  const c = STATUS[code]; if (!c) return null;
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:5,
      padding:sm?"2px 7px":"3px 9px", borderRadius:20,
      fontSize:sm?9:10, fontWeight:700,
      background:c.bg, color:c.fg, border:`1px solid ${c.border}`, whiteSpace:"nowrap",
    }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:c.fg }}/>
      {c.label}
    </span>
  );
}

function PillBtn({ children, onClick, variant="primary", full, disabled, icon }) {
  const styles = {
    primary: { background:T.kraft, color:"#fff", hover:T.kraftDark },
    ghost:   { background:"transparent", color:T.navy, border:`1.5px solid ${T.border}`, hover:T.borderLight },
    dark:    { background:T.navy, color:"#fff", hover:T.navyLight },
    success: { background:T.green, color:"#fff", hover:"#019d72" },
  }[variant];
  return (
    <button onClick={onClick} disabled={disabled}
      style={{
        display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
        width:full?"100%":"auto", padding:"14px 20px",
        borderRadius:14, border:styles.border || "none",
        background:disabled?"#e9ebf0":styles.background,
        color:disabled?T.textMuted:styles.color,
        fontSize:15, fontWeight:700, cursor:disabled?"not-allowed":"pointer",
        transition:"all 0.2s", fontFamily:FONT,
      }}
      onMouseEnter={e=>{ if (!disabled) e.currentTarget.style.background = styles.hover; }}
      onMouseLeave={e=>{ if (!disabled) e.currentTarget.style.background = styles.background; }}
    >
      {icon}{children}
    </button>
  );
}

// ─── Map preview with geofence circle ────────────────────────
function MiniMap({ inside }) {
  const ringColor = inside ? T.green : T.rose;
  const ringBg    = inside ? T.greenLight : T.roseLight;
  return (
    <div style={{
      position:"relative", height:160, width:"100%",
      borderRadius:14, overflow:"hidden",
      border:`1px solid ${T.border}`, background:"#F0F4F9",
    }}>
      {/* grid */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:"linear-gradient(to right, rgba(168,180,205,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(168,180,205,0.25) 1px, transparent 1px)",
        backgroundSize:"20px 20px",
      }}/>
      {/* roads */}
      <div style={{ position:"absolute", left:0, right:0, top:"55%", height:8, background:"#fff", opacity:0.7 }}/>
      <div style={{ position:"absolute", top:0, bottom:0, left:"38%", width:8, background:"#fff", opacity:0.7 }}/>
      {/* geofence ring */}
      <div style={{
        position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)",
        width:120, height:120, borderRadius:"50%",
        background:ringBg, border:`2px solid ${ringColor}`,
      }}/>
      {/* center pin with ping */}
      <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)" }}>
        <span style={{
          position:"absolute", inset:-2, width:14, height:14, borderRadius:"50%",
          background:ringColor, opacity:0.6, animation:"ping 1.8s ease infinite",
        }}/>
        <span style={{
          position:"relative", width:10, height:10, borderRadius:"50%",
          background:ringColor, display:"inline-block",
          boxShadow:`0 0 0 3px #fff, 0 2px 6px rgba(0,0,0,0.15)`,
        }}/>
      </div>
      {/* user pin (outside case) */}
      {!inside && (
        <div style={{ position:"absolute", left:"18%", top:"22%" }}>
          <span style={{ display:"inline-block", width:10, height:10, borderRadius:"50%", background:T.blue, boxShadow:`0 0 0 3px #fff, 0 2px 6px rgba(0,0,0,0.2)` }}/>
          <div style={{ position:"absolute", top:14, left:"50%", transform:"translateX(-50%)", fontSize:9, fontWeight:700, color:T.blue, background:"#fff", padding:"1px 5px", borderRadius:4, whiteSpace:"nowrap" }}>You</div>
        </div>
      )}
      {/* label */}
      <div style={{ position:"absolute", left:10, top:10, background:"rgba(255,255,255,0.95)", padding:"5px 9px", borderRadius:8, fontSize:10, fontWeight:600, color:T.navy }}>
        Kraftshala Campus
      </div>
      <div style={{ position:"absolute", right:10, bottom:10, background:"rgba(255,255,255,0.95)", padding:"4px 8px", borderRadius:6, fontSize:9, fontWeight:600, color:T.textSec }}>
        100m radius
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HOME SCREEN
// ═══════════════════════════════════════════════════════════════
function HomeScreen({ sessionStates, onSignIn, onSignOut, onAttendance, onMenu }) {
  // sessionStates: { 1: "completed", 2: "pending" | "signed-in" | "completed" }
  const s1State = sessionStates[1];
  const s2State = sessionStates[2];

  return (
    <div style={{ background:T.bg, minHeight:"100%", animation:"fadeIn 0.35s ease" }}>
      {/* Header */}
      <MobileHeader title="" sticky
        left={I.menu} onLeft={onMenu}
        right={
          <span style={{ position:"relative", display:"inline-flex" }}>
            {I.bell}
            <span style={{ position:"absolute", top:1, right:1, width:7, height:7, borderRadius:"50%", background:T.kraft, border:"1.5px solid #fff" }}/>
          </span>
        }
      />

      {/* Logo strip */}
      <div style={{ background:T.white, padding:"0 16px 12px", display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:30, height:30, borderRadius:9, background:`linear-gradient(135deg,${T.kraft},#FF6B4A)`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:14, color:"#fff" }}>K</div>
        <span style={{ fontSize:16, fontWeight:800, color:T.navy, letterSpacing:-0.3 }}>kraftshala</span>
        <span style={{ fontSize:9, fontWeight:700, color:T.textMuted, background:T.bg, padding:"3px 7px", borderRadius:5 }}>LMS</span>
      </div>

      {/* Greeting */}
      <div style={{
        margin:"14px 16px 0", padding:"18px 20px", borderRadius:18, color:"#fff",
        background:`linear-gradient(135deg,${T.kraft} 0%,#FF6B4A 60%,#FF8F6B 100%)`,
        position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", top:-30, right:-20, width:140, height:140, borderRadius:"50%", background:"rgba(255,255,255,0.10)" }}/>
        <div style={{ position:"absolute", bottom:-40, right:40, width:90, height:90, borderRadius:"50%", background:"rgba(255,255,255,0.08)" }}/>
        <p style={{ fontSize:12, opacity:0.85, marginBottom:2 }}>Good Morning,</p>
        <h1 style={{ fontSize:22, fontWeight:800, marginBottom:4 }}>{LEARNER.firstName} 👋</h1>
        <p style={{ fontSize:11, opacity:0.85 }}>{TODAY.date}</p>
        <div style={{ marginTop:10, display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.18)", borderRadius:30, padding:"5px 12px", fontSize:11, fontWeight:600 }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:"#05CD99" }}/>
          {LEARNER.batch}
        </div>
      </div>

      {/* Today's class — primary card */}
      <div style={{ margin:"14px 16px 0", padding:"16px 18px", background:T.white, borderRadius:16, boxShadow:T.shadow }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
          <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1 }}>Today's Class</p>
          <span style={{ fontSize:10, color:T.textSec, fontFamily:"ui-monospace, SFMono-Regular, monospace" }}>11:25 AM</span>
        </div>

        {/* Session 1 row */}
        <SessionRow
          n={1} name="Brand Strategy Foundations" timing="09:00 – 11:00"
          state={s1State}
          onSignIn={()=>onSignIn(1)} onSignOut={()=>onSignOut(1)}
        />

        <div style={{ height:1, background:T.borderLight, margin:"12px 0" }}/>

        {/* Session 2 row */}
        <SessionRow
          n={2} name="AI in Performance Marketing" timing="11:30 – 13:00"
          state={s2State}
          onSignIn={()=>onSignIn(2)} onSignOut={()=>onSignOut(2)}
        />
      </div>

      {/* Quick stats */}
      <div style={{ margin:"16px 16px 0", display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {[
          { l:"Attendance", v:LEARNER.attendancePct+"%", sub:"vs 80% min", c:T.green },
          { l:"Days Present", v:`${LEARNER.present}/${LEARNER.total}`, sub:"this month", c:T.navy },
          { l:"Avg Study Hrs", v:LEARNER.avgStudyHrs, sub:"per class day", c:T.navy },
          { l:"Below Threshold", v:"0", sub:"weeks", c:T.green },
        ].map((s,i)=>(
          <div key={i} style={{ padding:"13px 14px", background:T.white, borderRadius:13, border:`1px solid ${T.border}` }}>
            <p style={{ fontSize:9, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:0.8 }}>{s.l}</p>
            <p style={{ fontSize:20, fontWeight:800, color:s.c, marginTop:4, lineHeight:1 }}>{s.v}</p>
            <p style={{ fontSize:10, color:T.textSec, marginTop:3 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div style={{ margin:"16px 16px 0", background:T.white, borderRadius:16, overflow:"hidden", border:`1px solid ${T.border}` }}>
        {[
          { l:"My Attendance",       sub:"Calendar, swipes & insights", icon:I.calendar, action:onAttendance, accent:T.kraft },
          { l:"My Schedule",         sub:"Upcoming sessions this week", icon:I.clock,    accent:T.blue },
          { l:"Study Resources",     sub:"Slides, recordings & reads",  icon:I.book,     accent:T.green },
          { l:"Regularization",      sub:"Raise or track a request",    icon:I.shield,   accent:"#B66F00" },
        ].map((q,i,arr)=>(
          <button key={i} onClick={q.action}
            style={{
              display:"flex", alignItems:"center", gap:12, width:"100%",
              padding:"13px 16px", background:"none", border:"none", textAlign:"left",
              borderBottom:i<arr.length-1?`1px solid ${T.borderLight}`:"none",
              cursor:q.action?"pointer":"default", fontFamily:FONT,
            }}>
            <span style={{ width:34, height:34, borderRadius:10, background:q.accent+"15", color:q.accent, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{q.icon}</span>
            <span style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:13, fontWeight:700, color:T.navy }}>{q.l}</p>
              <p style={{ fontSize:11, color:T.textSec, marginTop:1 }}>{q.sub}</p>
            </span>
            <span style={{ color:T.textMuted }}>{I.cR}</span>
          </button>
        ))}
      </div>

      {/* Latest updates */}
      <div style={{ margin:"16px 16px 0", padding:"14px 16px", background:T.white, borderRadius:16, border:`1px solid ${T.border}` }}>
        <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>Announcements</p>
        {[
          { d:"Today", t:"Session 2 starts at 11:30. Please sign in once inside campus." },
          { d:"Yesterday", t:"Brand strategy assignment submitted: 24 of 28 learners." },
          { d:"14 May", t:"Thursday's class was cancelled (rescheduled to 18 May)." },
        ].map((u,i,arr)=>(
          <div key={i} style={{ padding:"10px 0", borderBottom:i<arr.length-1?`1px solid ${T.borderLight}`:"none" }}>
            <p style={{ fontSize:10, color:T.textMuted, marginBottom:3 }}>{u.d}</p>
            <p style={{ fontSize:12, color:T.navyLight, lineHeight:1.45 }}>{u.t}</p>
          </div>
        ))}
      </div>

      <div style={{ height:30 }}/>
    </div>
  );
}

function SessionRow({ n, name, timing, state, onSignIn, onSignOut }) {
  // state: "completed" | "pending" | "signed-in" | "future"
  const label = ({ completed:"Present ✓", "signed-in":"In Progress", pending:"Awaiting sign-in", future:"Upcoming" })[state];
  const labelColor = state==="completed" ? T.green : state==="signed-in" ? T.green : state==="pending" ? "#B66F00" : T.textMuted;
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
        <div style={{ width:28, height:28, borderRadius:8, background:T.kraftLight, color:T.kraft, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, flexShrink:0 }}>{n}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ fontSize:13, fontWeight:700, color:T.navy, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{name}</p>
          <p style={{ fontSize:11, color:T.textSec, marginTop:1, fontFamily:"ui-monospace, SFMono-Regular, monospace" }}>{timing}</p>
        </div>
        <span style={{ fontSize:10, fontWeight:700, color:labelColor, whiteSpace:"nowrap" }}>{label}</span>
      </div>
      <div style={{ display:"flex", gap:8 }}>
        {state === "pending" && (
          <PillBtn full onClick={onSignIn} icon={I.arrowIn}>Sign In</PillBtn>
        )}
        {state === "signed-in" && (
          <PillBtn full variant="dark" onClick={onSignOut} icon={I.arrowOut}>Sign Out</PillBtn>
        )}
        {state === "completed" && (
          <div style={{ flex:1, padding:"10px 14px", borderRadius:12, background:T.greenLight, color:T.green, fontSize:12, fontWeight:700, textAlign:"center" }}>
            ✓ Attendance recorded
          </div>
        )}
        {state === "future" && (
          <div style={{ flex:1, padding:"10px 14px", borderRadius:12, background:T.bg, color:T.textMuted, fontSize:12, fontWeight:600, textAlign:"center" }}>
            Sign-in opens 15 min before
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SIGN-IN / SIGN-OUT SCREENS
// ═══════════════════════════════════════════════════════════════
function SignInScreen({ session, geofenceInside, onConfirm, onCancel, onToggleFence, mode }) {
  // mode: "in" or "out"
  const isOut = mode === "out";
  const [remarks, setRemarks] = useState("");
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(()=>setTick(x=>x+1), 1000); return () => clearInterval(t); }, []);

  const now = new Date();
  const hh = String(now.getHours()).padStart(2,"0");
  const mm = String(now.getMinutes()).padStart(2,"0");
  const ss = String(now.getSeconds()).padStart(2,"0");

  return (
    <div style={{ background:T.bg, minHeight:"100%", display:"flex", flexDirection:"column", animation:"slideUp 0.3s ease" }}>
      <MobileHeader title={isOut ? "Sign Out of Session" : "Sign In to Session"} sticky
        left={I.close} onLeft={onCancel}
        right={<span style={{ width:22 }}/>} onRight={()=>{}}
      />

      <div style={{ flex:1, padding:"14px 16px 100px" }}>
        {/* Demo toggle */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"8px 12px", marginBottom:12, borderRadius:10,
          background:T.kraftPale, border:`1px dashed ${T.kraft}55`,
        }}>
          <span style={{ fontSize:11, color:T.kraft, fontWeight:600 }}>
            🧪 Demo · simulate location
          </span>
          <button onClick={onToggleFence} style={{
            padding:"4px 10px", borderRadius:6, border:`1px solid ${T.kraft}`,
            background:T.white, color:T.kraft, fontSize:10, fontWeight:700, cursor:"pointer", fontFamily:FONT,
          }}>
            Toggle to {geofenceInside ? "Outside" : "Inside"}
          </button>
        </div>

        {/* Map */}
        <MiniMap inside={geofenceInside}/>

        {/* Geofence status */}
        <div style={{
          marginTop:12, padding:"12px 14px", borderRadius:12,
          background:geofenceInside ? T.greenLight : T.roseLight,
          border:`1px solid ${geofenceInside ? "#9DECC9" : "#FFB7A8"}`,
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ color:geofenceInside ? T.green : T.rose, flexShrink:0 }}>
              {geofenceInside ? I.check : I.alertC}
            </span>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:13, fontWeight:700, color:geofenceInside ? T.green : T.rose }}>
                {geofenceInside ? "Inside campus geofence" : "Outside campus geofence"}
              </p>
              <p style={{ fontSize:11, color:T.textSec, marginTop:2 }}>
                {geofenceInside
                  ? "12 m from Kraftshala Campus center"
                  : "247 m from Kraftshala Campus — move closer to sign in"}
              </p>
            </div>
          </div>
        </div>

        {/* Session card */}
        <div style={{ marginTop:14, padding:"14px 16px", background:T.white, borderRadius:14, border:`1px solid ${T.border}` }}>
          <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Session Details</p>
          <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
            <div style={{ width:30, height:30, borderRadius:9, background:T.kraftLight, color:T.kraft, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, flexShrink:0 }}>{session.n}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:14, fontWeight:700, color:T.navy }}>{session.name}</p>
              <p style={{ fontSize:11, color:T.textSec, marginTop:2, fontFamily:"ui-monospace, SFMono-Regular, monospace" }}>{session.timing}</p>
            </div>
          </div>
          <div style={{ marginTop:10, paddingTop:10, borderTop:`1px solid ${T.borderLight}` }}>
            <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>Attendance Scheme</p>
            <p style={{ fontSize:11, color:T.navyLight, lineHeight:1.4 }}>{SCHEME}</p>
            <p style={{ fontSize:10, color:T.textSec, marginTop:4 }}>↳ {SCHEDULE}</p>
          </div>
        </div>

        {/* Tech details */}
        <div style={{ marginTop:12, padding:"12px 14px", background:T.white, borderRadius:14, border:`1px solid ${T.border}` }}>
          <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>Sign-{isOut?"Out":"In"} Details</p>
          <Row k="Date" v={TODAY.date}/>
          <Row k="Time" v={`${hh}:${mm}:${ss} IST`} mono/>
          <Row k="Latitude"  v="28.45947" mono/>
          <Row k="Longitude" v="77.02671" mono/>
          {isOut && (
            <>
              <Row k="Sign-In Time"   v="11:32:09 AM" mono/>
              <Row k="Elapsed" v={<span style={{ color:T.green, fontWeight:700 }}>1h 28m so far</span>}/>
            </>
          )}
          {!isOut && (
            <Row k="Session Starts In" v={
              <span style={{ color:T.green, fontWeight:700 }}>
                {session.n===2 ? "5 min · 11:30 AM" : "Class in progress"}
              </span>
            }/>
          )}
        </div>

        {/* Remarks */}
        <div style={{ marginTop:12 }}>
          <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>Remarks (optional)</p>
          <textarea value={remarks} onChange={e=>setRemarks(e.target.value)}
            placeholder={isOut ? "e.g. Had to leave early for medical appointment..." : "e.g. Reached late due to traffic..."}
            rows={2}
            style={{
              width:"100%", padding:"10px 12px", borderRadius:10,
              border:`1px solid ${T.border}`, background:T.white,
              fontSize:13, color:T.text, resize:"none", lineHeight:1.4,
            }}
          />
        </div>

        {!geofenceInside && (
          <div style={{ marginTop:14, padding:"12px 14px", background:"#FFF8E6", border:"1px solid #F1D693", borderRadius:12 }}>
            <p style={{ fontSize:11, color:"#A37200", lineHeight:1.5 }}>
              <strong>Can't sign {isOut?"out":"in"} from here.</strong> If your GPS is acting up,
              tell the instructor — they can mark you {isOut?"out":"present"} manually and you
              can file a regularization request later.
            </p>
          </div>
        )}
      </div>

      {/* Sticky bottom action */}
      <div style={{
        position:"sticky", bottom:0, left:0, right:0,
        padding:"12px 16px 18px", background:T.white,
        borderTop:`1px solid ${T.border}`,
        boxShadow:"0 -8px 24px rgba(27,37,89,0.06)",
      }}>
        <PillBtn full
          variant={isOut ? "dark" : "primary"}
          disabled={!geofenceInside}
          onClick={onConfirm}
          icon={isOut ? I.arrowOut : I.arrowIn}>
          {isOut ? "Confirm Sign-Out" : "Confirm Sign-In"}
        </PillBtn>
        <p style={{ fontSize:10, color:T.textMuted, textAlign:"center", marginTop:8 }}>
          Your location and timestamp will be recorded.
        </p>
      </div>
    </div>
  );
}

function Row({ k, v, mono }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", fontSize:12 }}>
      <span style={{ color:T.textSec }}>{k}</span>
      <span style={{ color:T.navy, fontWeight:600, fontFamily:mono?"ui-monospace, SFMono-Regular, monospace":undefined }}>{v}</span>
    </div>
  );
}

// ─── Success screen ──────────────────────────────────────────
function SignSuccess({ mode, session, onHome }) {
  const isOut = mode === "out";
  return (
    <div style={{
      background:T.bg, minHeight:"100%",
      display:"flex", flexDirection:"column",
      animation:"fadeIn 0.3s ease",
    }}>
      <div style={{ flex:1, padding:"60px 24px 0", textAlign:"center" }}>
        <div style={{
          width:88, height:88, borderRadius:"50%",
          background:T.greenLight, margin:"0 auto",
          display:"flex", alignItems:"center", justifyContent:"center",
          animation:"scaleIn 0.4s ease",
          boxShadow:"0 0 0 8px rgba(2,172,125,0.08)",
        }}>
          <div style={{ color:T.green, transform:"scale(1.8)" }}>{I.check}</div>
        </div>

        <h2 style={{ fontSize:22, fontWeight:800, color:T.navy, marginTop:22 }}>
          You're {isOut ? "signed out" : "signed in"}!
        </h2>
        <p style={{ fontSize:13, color:T.textSec, marginTop:6, lineHeight:1.5 }}>
          {isOut
            ? `Session ${session.n} attendance has been recorded.`
            : `Welcome to Session ${session.n}. Your sign-in is on the instructor's panel.`}
        </p>

        <div style={{ marginTop:24, padding:"16px 18px", background:T.white, borderRadius:14, border:`1px solid ${T.border}`, textAlign:"left" }}>
          <Row k={isOut ? "Sign-Out Time" : "Sign-In Time"} v={isOut ? "12:58:32 PM" : "11:32:09 AM"} mono/>
          <Row k="Location" v="✓ Inside geofence (12m)"/>
          <Row k="Session" v={`Session ${session.n}`}/>
          {isOut && <Row k="Duration"  v={<span style={{ color:T.green, fontWeight:700 }}>1h 26m</span>}/>}
          <Row k="Status" v={<StatusChip code={isOut?"P":"IP"} sm/>}/>
        </div>

        {!isOut && (
          <div style={{ marginTop:16, padding:"12px 14px", background:T.kraftPale, borderRadius:12, border:`1px solid ${T.kraft}30` }}>
            <p style={{ fontSize:11, color:T.kraftDark, lineHeight:1.5 }}>
              <strong>Next:</strong> The instructor will visually confirm everyone in the room.
              You'll see your status flip to <strong>Verified</strong> once that's done.
            </p>
          </div>
        )}
      </div>

      <div style={{ padding:"16px 16px 24px", background:T.white, borderTop:`1px solid ${T.border}` }}>
        <PillBtn full variant="primary" onClick={onHome} icon={I.home}>
          Back to Home
        </PillBtn>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MY ATTENDANCE SCREEN
// ═══════════════════════════════════════════════════════════════
function MyAttendanceScreen({ onBack, onMenu, onRegularize }) {
  const [selected, setSelected] = useState(16);
  const [swipeOpen, setSwipeOpen] = useState(null);
  const day = DAYS[selected] || null;

  return (
    <div style={{ background:T.bg, minHeight:"100%", animation:"fadeIn 0.3s ease" }}>
      <MobileHeader title="My Attendance" sticky
        left={I.back} onLeft={onBack}
        right={I.menu} onRight={onMenu}
      />

      {/* Identity strip */}
      <div style={{ padding:"14px 16px", background:`linear-gradient(135deg,${T.kraft},#FF6B4A)`, color:"#fff" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:42, height:42, borderRadius:12, background:"rgba(255,255,255,0.22)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800 }}>{LEARNER.avatar}</div>
          <div style={{ flex:1, minWidth:0 }}>
            <p style={{ fontSize:14, fontWeight:700 }}>{LEARNER.name}</p>
            <p style={{ fontSize:11, opacity:0.85, marginTop:1 }}>{LEARNER.rollNo} · {LEARNER.batch}</p>
          </div>
        </div>
      </div>

      {/* KPI strip — 2x2 grid */}
      <div style={{ padding:"14px 16px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {[
          { l:"Attendance %",   v:"92%",   sub:"vs 80% threshold", c:T.green },
          { l:"Days Present",   v:"11/12", sub:"cancelled excluded", c:T.navy },
          { l:"Avg Study Hrs",  v:"3h 35m", sub:"per class day", c:T.navy },
          { l:"Late Days",      v:"1",     sub:"5 May · 18m", c:"#B66F00" },
        ].map((k,i)=>(
          <div key={i} style={{ padding:"12px 14px", background:T.white, borderRadius:12, border:`1px solid ${T.border}` }}>
            <p style={{ fontSize:9, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:0.8 }}>{k.l}</p>
            <p style={{ fontSize:20, fontWeight:800, color:k.c, marginTop:3, lineHeight:1 }}>{k.v}</p>
            <p style={{ fontSize:10, color:T.textSec, marginTop:2 }}>{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <MobileCalendar data={MAY_2026} selected={selected} onSelect={setSelected} today={16}/>

      {/* Day detail */}
      <div style={{ padding:"4px 16px 16px" }}>
        <MobileDayDetail day={day} onSwipeClick={setSwipeOpen} onRegularize={onRegularize}/>
      </div>

      {/* Legend */}
      <div style={{ padding:"0 16px 30px" }}>
        <div style={{ background:T.white, padding:"12px 14px", borderRadius:12, border:`1px solid ${T.border}` }}>
          <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>Legend</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 12px" }}>
            {["P","A","L","HD","R","H","C","W"].map(k=>(
              <span key={k} style={{ display:"inline-flex", alignItems:"center", gap:7 }}>
                <span style={{ width:20, height:20, borderRadius:5, background:STATUS[k].bg, border:`1px solid ${STATUS[k].border}`, color:STATUS[k].fg, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, flexShrink:0 }}>{STATUS[k].code}</span>
                <span style={{ fontSize:11, color:T.navyLight, fontWeight:500 }}>{STATUS[k].label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {swipeOpen && <MobileSwipeModal swipe={swipeOpen} onClose={()=>setSwipeOpen(null)}/>}
    </div>
  );
}

// ─── Mobile Calendar ─────────────────────────────────────────
function MobileCalendar({ data, selected, onSelect, today }) {
  const map = Object.fromEntries(data.map(x=>[x.d,x]));
  const startCol = 5; // May 1 2026 = Friday
  const cells = [];
  for (let i=0; i<startCol; i++) cells.push(null);
  for (let d=1; d<=31; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div style={{ margin:"0 16px 14px", background:T.white, borderRadius:14, overflow:"hidden", border:`1px solid ${T.border}` }}>
      {/* Month header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", borderBottom:`1px solid ${T.border}` }}>
        <button style={navBtn}>‹</button>
        <div style={{ textAlign:"center" }}>
          <p style={{ fontSize:14, fontWeight:700, color:T.navy }}>May 2026</p>
          <p style={{ fontSize:10, color:T.textMuted, marginTop:1 }}>11 attended · 1 absent · 1 cancelled</p>
        </div>
        <button style={navBtn}>›</button>
      </div>
      {/* Weekdays */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", background:T.bg, borderBottom:`1px solid ${T.border}` }}>
        {["S","M","T","W","T","F","S"].map((w,i)=>(
          <div key={i} style={{ padding:"6px 0", textAlign:"center", fontSize:9, fontWeight:700, color:T.textMuted, letterSpacing:0.5 }}>{w}</div>
        ))}
      </div>
      {/* Cells */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)" }}>
        {cells.map((d,i)=>{
          if (d===null) return <div key={i} style={{ aspectRatio:"1/1", background:T.borderLight }}/>;
          const info = map[d];
          const cfg  = info?STATUS[info.s]:null;
          const isToday  = d===today;
          const isSel    = d===selected;
          const isFuture = d>today;
          const clickable = !!info && !isFuture;
          return (
            <button key={i} onClick={()=>clickable && onSelect(d)} disabled={!clickable}
              style={{
                aspectRatio:"1/1", padding:4, position:"relative",
                border:"none", background:cfg?cfg.bg:T.white,
                cursor:clickable?"pointer":"default",
                opacity:isFuture?0.35:1,
                boxShadow: isSel ? `inset 0 0 0 2px ${T.kraft}` : "none",
                ...(cfg?.stripe ? { backgroundImage:"repeating-linear-gradient(45deg,rgba(130,143,176,0.18),rgba(130,143,176,0.18) 3px,transparent 3px,transparent 7px)" } : {}),
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                fontFamily:FONT,
              }}>
              <span style={{ fontSize:11, fontWeight:isToday?800:600, color:isToday?T.kraft:T.navy, lineHeight:1 }}>{d}</span>
              {cfg && info.s!=="W" && (
                <span style={{ fontSize:13, fontWeight:800, color:cfg.fg, marginTop:1, lineHeight:1 }}>{cfg.code}</span>
              )}
              {isToday && (
                <span style={{ position:"absolute", top:2, right:2, width:5, height:5, borderRadius:"50%", background:T.kraft }}/>
              )}
              {cfg?.pulse && (
                <span style={{ position:"absolute", bottom:2, right:2, width:5, height:5, borderRadius:"50%", background:cfg.fg, animation:"pulse 1.5s ease infinite" }}/>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const navBtn = {
  width:32, height:32, borderRadius:8, border:`1px solid ${T.border}`,
  background:T.white, color:T.textSec, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:FONT,
};

// ─── Mobile Day Detail ───────────────────────────────────────
function MobileDayDetail({ day, onSwipeClick, onRegularize }) {
  if (!day) return null;
  const eventIcons = { H:"🎉", W:"🌙", C:"🚫", A:"⚠️" };

  return (
    <div style={{ background:T.white, borderRadius:14, border:`1px solid ${T.border}`, overflow:"hidden" }}>
      {/* Day header */}
      <div style={{ padding:"12px 16px", borderBottom:`1px solid ${T.border}`, background:`linear-gradient(180deg,${T.bg},${T.white})` }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:T.navy }}>{day.date}</h3>
          <StatusChip code={day.status}/>
        </div>
        <p style={{ fontSize:11, color:T.textSec }}>{day.weekday}</p>
        {day.processedAt && <p style={{ fontSize:10, color:T.textMuted, marginTop:3 }}>Processed on {day.processedAt}</p>}
      </div>

      {/* EVENT */}
      {day.kind === "event" && (
        <div style={{ padding:"24px 20px", textAlign:"center" }}>
          <div style={{ fontSize:32, marginBottom:8 }}>{eventIcons[day.status] || "—"}</div>
          <h4 style={{ fontSize:14, fontWeight:700, color:T.navy, marginBottom:6 }}>{day.title}</h4>
          <p style={{ fontSize:11, color:T.textSec, lineHeight:1.5 }}>{day.note}</p>
          {day.regularization && (
            <button onClick={()=>onRegularize?.(day)} style={{
              marginTop:14, padding:"9px 16px", borderRadius:10,
              background:T.kraft, border:"none", color:"#fff",
              fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:FONT,
            }}>
              + Raise Regularization Request
            </button>
          )}
        </div>
      )}

      {/* SUMMARY + FULL — shared */}
      {(day.kind === "summary" || day.kind === "full") && (
        <>
          {/* Top metrics 2x2 */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", borderBottom:`1px solid ${T.border}` }}>
            {[
              { l:"First Sign-In", v:day.firstIn,  mono:true },
              { l:"Last Sign-Out", v:day.lastOut,  mono:true },
              { l:"Study Hours",   v:day.studyHrs, mono:true },
              { l:"Late By",       v:day.lateBy,   mono:true },
            ].map((m,i)=>(
              <div key={i} style={{
                padding:"10px 14px",
                borderRight:i%2===0?`1px solid ${T.borderLight}`:"none",
                borderBottom:i<2?`1px solid ${T.borderLight}`:"none",
              }}>
                <p style={{ fontSize:9, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:0.6 }}>{m.l}</p>
                <p style={{ fontSize:12, fontWeight:600, color:T.navy, marginTop:3, fontFamily:m.mono?"ui-monospace, SFMono-Regular, monospace":undefined }}>{m.v}</p>
              </div>
            ))}
          </div>

          {/* Verification */}
          {day.verification && (
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 14px", background:T.kraftPale, borderBottom:`1px solid ${T.border}` }}>
              <span style={{ color:T.kraft, flexShrink:0 }}>{I.shield}</span>
              <p style={{ fontSize:11, color:T.navy, fontWeight:500, lineHeight:1.4 }}>{day.verification}</p>
            </div>
          )}

          {day.note && (
            <div style={{ padding:"10px 14px", borderBottom:`1px solid ${T.border}`, background:T.bg }}>
              <p style={{ fontSize:10, color:T.textSec, lineHeight:1.5 }}>
                <span style={{ color:T.navy, fontWeight:600 }}>Note · </span>{day.note}
              </p>
            </div>
          )}
        </>
      )}

      {/* FULL — sessions */}
      {day.kind === "full" && day.sessions && (
        <div style={{ padding:"12px 14px", borderBottom:`1px solid ${T.border}` }}>
          <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Sessions</p>
          {day.sessions.map((s,i)=>(
            <div key={s.id} style={{ marginTop:i>0?8:0, border:`1px solid ${T.border}`, borderRadius:10, overflow:"hidden", background:T.bg }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px", background:T.white, borderBottom:`1px solid ${T.border}` }}>
                <div style={{ width:22, height:22, borderRadius:6, background:T.kraftLight, color:T.kraft, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, flexShrink:0 }}>{s.id}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:11, fontWeight:700, color:T.navy, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.name}</p>
                  <p style={{ fontSize:9, color:T.textSec, marginTop:1, fontFamily:"ui-monospace, SFMono-Regular, monospace" }}>{s.timing}</p>
                </div>
                <span style={{
                  fontSize:9, fontWeight:800, padding:"2px 6px", borderRadius:5,
                  background:s.status==="Present"?STATUS.P.bg:s.status==="In Progress"?STATUS.IP.bg:"#F0F2F6",
                  color:s.status==="Present"?STATUS.P.fg:s.status==="In Progress"?STATUS.IP.fg:"#828FB0",
                  textTransform:"uppercase", letterSpacing:0.4,
                }}>{s.status}</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
                {[
                  { l:"In",   v:s.signIn,     mono:true },
                  { l:"Out",  v:s.signOut,    mono:true },
                  { l:"Late", v:s.lateBy,     mono:true },
                  { l:"Verif", v:s.verifiedBy, mono:false },
                ].map((c,i)=>(
                  <div key={i} style={{ padding:"6px 4px", borderRight:i<3?`1px solid ${T.border}`:"none", textAlign:"center" }}>
                    <p style={{ fontSize:8, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:0.4 }}>{c.l}</p>
                    <p style={{ fontSize:c.mono?10:9, fontWeight:600, color:T.navy, marginTop:2, fontFamily:c.mono?"ui-monospace, SFMono-Regular, monospace":undefined, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.v}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FULL — swipes */}
      {day.kind === "full" && day.swipes && (
        <div style={{ padding:"12px 14px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
            <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1 }}>Swipes</p>
            <span style={{ fontSize:10, color:T.textSec }}>Total: <strong style={{ color:T.navy, fontFamily:"ui-monospace, SFMono-Regular, monospace" }}>{day.studyHrs}</strong></span>
          </div>
          <div style={{ border:`1px solid ${T.border}`, borderRadius:10, overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"42px 82px 1fr 36px", padding:"6px 10px", background:T.bg, borderBottom:`1px solid ${T.border}`, fontSize:9, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:0.6 }}>
              <span>Type</span><span>Time</span><span>Location</span><span style={{ textAlign:"right" }}></span>
            </div>
            {day.swipes.map((sw,i)=>(
              <div key={sw.id} style={{ display:"grid", gridTemplateColumns:"42px 82px 1fr 36px", padding:"8px 10px", borderTop:i>0?`1px solid ${T.borderLight}`:"none", alignItems:"center", fontSize:10 }}>
                <span style={{ width:34, height:18, borderRadius:5, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, background:sw.type==="IN"?STATUS.P.bg:T.blueLight, color:sw.type==="IN"?STATUS.P.fg:T.blue }}>{sw.type}</span>
                <span>
                  <span style={{ fontSize:11, fontWeight:600, color:sw.time?T.navy:T.textMuted, fontFamily:"ui-monospace, SFMono-Regular, monospace", display:"block" }}>{sw.time || "—"}</span>
                  <span style={{ fontSize:8, color:T.textMuted }}>16 May</span>
                </span>
                <span style={{ fontSize:10, color:sw.status==="verified"?T.navyLight:T.textMuted, lineHeight:1.3 }}>
                  {sw.status==="verified" ? (
                    <>Inside · <span style={{ fontFamily:"ui-monospace, SFMono-Regular, monospace" }}>{sw.dist}</span><br/><span style={{ fontSize:9, color:T.textSec }}>Session {sw.session}</span></>
                  ) : (
                    <>Awaiting<br/><span style={{ fontSize:9, color:T.textMuted }}>Session {sw.session}</span></>
                  )}
                </span>
                <span style={{ textAlign:"right" }}>
                  <button onClick={()=>sw.status==="verified" && onSwipeClick(sw)} disabled={sw.status!=="verified"}
                    style={{
                      background:"none", border:"none",
                      color:sw.status==="verified"?T.blue:T.textMuted,
                      fontSize:10, fontWeight:600, cursor:sw.status==="verified"?"pointer":"not-allowed", padding:0, fontFamily:FONT,
                    }}>{sw.status==="verified"?"Info":"—"}</button>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {day.kind === "summary" && (
        <div style={{ padding:"10px 14px 12px" }}>
          <p style={{ fontSize:10, color:T.textMuted, textAlign:"center", padding:"8px 0", borderTop:`1px dashed ${T.border}`, lineHeight:1.5 }}>
            Live session log archived. Open today's view for the running breakdown.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Mobile Swipe Details (bottom sheet) ─────────────────────
function MobileSwipeModal({ swipe, onClose }) {
  return (
    <div onClick={onClose} style={{
      position:"absolute", inset:0, background:"rgba(27,37,89,0.45)",
      backdropFilter:"blur(2px)", zIndex:60,
      display:"flex", alignItems:"flex-end", justifyContent:"center",
      animation:"fadeIn 0.2s ease",
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:T.white, width:"100%", borderTopLeftRadius:24, borderTopRightRadius:24,
        padding:"14px 18px 24px", animation:"slideUp 0.3s ease",
        maxHeight:"85%", overflowY:"auto",
      }}>
        {/* Handle */}
        <div style={{ width:42, height:5, background:T.border, borderRadius:3, margin:"0 auto 14px" }}/>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:T.navy }}>Swipe Details</h3>
          <button onClick={onClose} style={{ background:"none", border:"none", color:T.textSec, cursor:"pointer", padding:4 }}>{I.close}</button>
        </div>

        <p style={{ fontSize:11, color:T.textSec, marginBottom:14 }}>
          Geofence-verified sign-{swipe.type==="IN"?"in":"out"}
        </p>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px 16px" }}>
          <SwipeField l="Learner" v={LEARNER.name}/>
          <SwipeField l="Roll No" v={LEARNER.rollNo}/>
          <SwipeField l="Date" v="16 May 2026"/>
          <SwipeField l="Time" v={`${swipe.time} IST`} mono/>
          <SwipeField l="Type"
            v={
              <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"2px 7px", borderRadius:5, fontSize:10, fontWeight:700,
                background:swipe.type==="IN"?STATUS.P.bg:T.blueLight, color:swipe.type==="IN"?STATUS.P.fg:T.blue }}>
                {swipe.type==="IN" ? "↘ Sign-In" : "↗ Sign-Out"}
              </span>
            }/>
          <SwipeField l="Session" v={`Session ${swipe.session}`}/>
          <SwipeField l="Latitude"  v={swipe.lat?.toFixed(5)} mono/>
          <SwipeField l="Longitude" v={swipe.lng?.toFixed(5)} mono/>
          <SwipeField l="Geofence" span2
            v={<span style={{ color:T.green, fontWeight:700 }}>✓ Inside · {swipe.dist} from center</span>}/>
          <SwipeField l="Maps" span2
            v={<a href={`https://maps.google.com/?q=${swipe.lat},${swipe.lng}`} target="_blank" rel="noopener noreferrer" style={{ color:T.blue, textDecoration:"underline", fontSize:12 }}>Open in Google Maps ↗</a>}/>
          <SwipeField l="Device" v="iPhone 14 · iOS 17.4"/>
          <SwipeField l="Network" v="Campus-WiFi"/>
          <SwipeField span2 l={swipe.type==="IN" ? "Instructor Verification" : "Sign-Out Validation"}
            v={
              swipe.type==="IN"
                ? <span style={{ color:T.green, fontWeight:600 }}>✓ Visual check by Priya Kothari</span>
                : <span style={{ color:T.textSec }}>Auto-recorded · geofence revalidated</span>
            }/>
          <SwipeField span2 l="Location" v="Building A, Kraftshala Campus, Sector 32, Gurugram, Haryana 122001, India"/>
        </div>

        <button onClick={onClose} style={{
          marginTop:18, width:"100%", padding:"12px 16px",
          borderRadius:12, border:"none", background:T.kraft, color:"#fff",
          fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:FONT,
        }}>Got it</button>
      </div>
    </div>
  );
}

function SwipeField({ l, v, mono, span2 }) {
  return (
    <div style={{ gridColumn:span2?"span 2":undefined }}>
      <p style={{ fontSize:10, fontWeight:600, color:T.textMuted, marginBottom:3 }}>{l}</p>
      <div style={{ fontSize:12, color:T.navy, fontWeight:500, fontFamily:mono?"ui-monospace, SFMono-Regular, monospace":undefined, wordBreak:"break-word" }}>{v || "—"}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// REGULARIZATION SCREEN
// ═══════════════════════════════════════════════════════════════
function RegularizationScreen({ onBack, onMenu, requests, onSubmit, presetDay, onClearPreset }) {
  const [tab, setTab] = useState("apply");
  const [applyOpen, setApplyOpen] = useState(null);
  const [toast, setToast] = useState(null);

  // Open preset day on mount (when navigated from My Attendance "Raise Request" CTA)
  useEffect(() => {
    if (presetDay) {
      const elig = ELIGIBLE_DAYS.find(e => e.d === presetDay.d);
      if (elig) {
        setApplyOpen(elig);
        setTab("apply");
      }
      onClearPreset?.();
    }
  }, [presetDay, onClearPreset]);

  const pending = requests.filter(r => r.status === "pending");
  const closed  = requests.filter(r => r.status !== "pending");

  const handleSubmit = (data) => {
    onSubmit(data);
    setApplyOpen(null);
    setTab("pending");
    setToast({ kind:"success", msg:"Request submitted · Instructor will review within 24h" });
    setTimeout(()=>setToast(null), 3500);
  };

  return (
    <div style={{ background:T.bg, minHeight:"100%", animation:"fadeIn 0.3s ease" }}>
      <MobileHeader title="Regularization" sticky
        left={I.back} onLeft={onBack}
        right={I.menu} onRight={onMenu}
      />

      {/* Identity strip */}
      <div style={{ padding:"12px 16px 14px", background:`linear-gradient(135deg,${T.kraft},#FF6B4A)`, color:"#fff" }}>
        <p style={{ fontSize:11, opacity:0.85, marginBottom:2 }}>Regularization requests</p>
        <p style={{ fontSize:15, fontWeight:700 }}>{LEARNER.name}</p>
        <p style={{ fontSize:10, opacity:0.85, marginTop:1 }}>{LEARNER.rollNo} · {LEARNER.batch}</p>
      </div>

      {/* Tabs */}
      <div style={{ background:T.white, borderBottom:`1px solid ${T.border}`, display:"flex", position:"sticky", top:48, zIndex:5 }}>
        {[
          { id:"apply",   label:"Apply",   count:ELIGIBLE_DAYS.length },
          { id:"pending", label:"Pending", count:pending.length },
          { id:"history", label:"History", count:closed.length },
        ].map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{
              flex:1, padding:"12px 8px", border:"none", background:"none",
              borderBottom:tab===t.id?`3px solid ${T.kraft}`:"3px solid transparent",
              color:tab===t.id?T.kraft:T.textSec,
              fontSize:12, fontWeight:tab===t.id?700:600, cursor:"pointer", fontFamily:FONT,
              display:"flex", alignItems:"center", justifyContent:"center", gap:6,
            }}>
            {t.label}
            {t.count > 0 && (
              <span style={{
                padding:"1px 6px", borderRadius:10,
                background:tab===t.id?T.kraft:T.borderLight,
                color:tab===t.id?"#fff":T.textSec,
                fontSize:10, fontWeight:700,
              }}>{t.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Apply tab */}
      {tab === "apply" && (
        <div style={{ padding:"14px 16px" }}>
          <div style={{ padding:"12px 14px", background:T.kraftPale, borderRadius:12, border:`1px solid ${T.kraft}30`, marginBottom:14 }}>
            <p style={{ fontSize:11, color:T.kraftDark, lineHeight:1.55 }}>
              <strong>How regularization works:</strong> pick a day with an exception
              (Absent / Late / Half-Day), tell us what happened, and your instructor
              reviews within 24h. Requests must be filed within 48h of the session.
            </p>
          </div>

          <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>
            Days available · {ELIGIBLE_DAYS.length}
          </p>

          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {ELIGIBLE_DAYS.map(d => (
              <button key={d.d} onClick={()=>setApplyOpen(d)}
                style={{
                  display:"flex", alignItems:"center", gap:12, width:"100%",
                  padding:"12px 14px", background:T.white,
                  border:`1px solid ${T.border}`, borderRadius:12,
                  cursor:"pointer", textAlign:"left", fontFamily:FONT, transition:"all 0.15s",
                }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=T.kraft+"55"; e.currentTarget.style.background=T.kraftPale}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border; e.currentTarget.style.background=T.white}}>
                <span style={{
                  width:36, height:36, borderRadius:9,
                  background:STATUS[d.status].bg, color:STATUS[d.status].fg,
                  border:`1px solid ${STATUS[d.status].border}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:13, fontWeight:800, flexShrink:0,
                }}>{STATUS[d.status].code}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:13, fontWeight:700, color:T.navy }}>{d.weekday}, {d.date.split(" ").slice(0,2).join(" ")}</p>
                  <p style={{ fontSize:11, color:T.textSec, marginTop:1, lineHeight:1.4 }}>{d.note}</p>
                </div>
                <span style={{ color:T.kraft, flexShrink:0 }}>{I.cR}</span>
              </button>
            ))}
          </div>

          <p style={{ fontSize:11, color:T.textMuted, textAlign:"center", marginTop:18, lineHeight:1.5 }}>
            Don't see your day? It might be past the 48-hour window,<br/>
            or doesn't qualify. <strong style={{ color:T.kraft }}>Contact your instructor.</strong>
          </p>
        </div>
      )}

      {/* Pending tab */}
      {tab === "pending" && (
        <div style={{ padding:"14px 16px" }}>
          {pending.length === 0 ? (
            <EmptyState icon="⏳" title="No pending requests" note="Submitted requests appear here while they're being reviewed (instructor SLA is 24h)."/>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {pending.map(r => <RequestCard key={r.id} request={r}/>)}
            </div>
          )}
        </div>
      )}

      {/* History tab */}
      {tab === "history" && (
        <div style={{ padding:"14px 16px" }}>
          {closed.length === 0 ? (
            <EmptyState icon="📋" title="No past requests" note="Approved and rejected requests will appear here."/>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {closed.map(r => <RequestCard key={r.id} request={r}/>)}
            </div>
          )}
        </div>
      )}

      <div style={{ height:30 }}/>

      {applyOpen && <ApplyForm day={applyOpen} onClose={()=>setApplyOpen(null)} onSubmit={handleSubmit}/>}
      {toast && <Toast {...toast}/>}
    </div>
  );
}

// ─── Apply form (bottom sheet) ───────────────────────────
function ApplyForm({ day, onClose, onSubmit }) {
  const [reason, setReason] = useState(REASON_TYPES[0]);
  const [details, setDetails] = useState("");
  const [sessions, setSessions] = useState("Both sessions");
  const canSubmit = details.trim().length >= 10;

  const submit = () => {
    if (!canSubmit) return;
    onSubmit({
      forDate: day.date,
      forDateLabel: `${day.weekday}, ${day.date.split(" ").slice(0,2).join(" ")}`,
      reasonType: reason,
      details,
      sessions,
    });
  };

  return (
    <div onClick={onClose} style={{
      position:"absolute", inset:0, background:"rgba(27,37,89,0.45)", backdropFilter:"blur(2px)",
      zIndex:60, display:"flex", alignItems:"flex-end", animation:"fadeIn 0.2s ease",
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:T.white, width:"100%", borderTopLeftRadius:24, borderTopRightRadius:24,
        padding:"14px 18px 24px", animation:"slideUp 0.3s ease",
        maxHeight:"94%", overflowY:"auto",
      }}>
        <div style={{ width:42, height:5, background:T.border, borderRadius:3, margin:"0 auto 14px" }}/>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:T.navy }}>Apply for Regularization</h3>
          <button onClick={onClose} style={{ background:"none", border:"none", color:T.textSec, cursor:"pointer", padding:4 }}>{I.close}</button>
        </div>
        <p style={{ fontSize:11, color:T.textSec, marginBottom:14 }}>
          Your instructor will see this and approve or reject within 24h.
        </p>

        {/* Day card */}
        <div style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", background:STATUS[day.status].bg, borderRadius:10, border:`1px solid ${STATUS[day.status].border}`, marginBottom:14 }}>
          <span style={{
            width:32, height:32, borderRadius:8, background:T.white, color:STATUS[day.status].fg,
            border:`1px solid ${STATUS[day.status].border}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:12, fontWeight:800, flexShrink:0,
          }}>{STATUS[day.status].code}</span>
          <div style={{ flex:1, minWidth:0 }}>
            <p style={{ fontSize:12, fontWeight:700, color:STATUS[day.status].fg }}>{day.weekday}, {day.date.split(" ").slice(0,2).join(" ")} 2026</p>
            <p style={{ fontSize:10, color:STATUS[day.status].fg, opacity:0.85, marginTop:1, lineHeight:1.4 }}>{day.note}</p>
          </div>
        </div>

        {/* Reason */}
        <FormGroup label="Reason for regularization">
          <select value={reason} onChange={e=>setReason(e.target.value)}
            style={{
              width:"100%", padding:"10px 12px", borderRadius:10,
              border:`1px solid ${T.border}`, background:T.bg,
              fontSize:13, color:T.text, fontFamily:FONT, cursor:"pointer",
            }}>
            {REASON_TYPES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </FormGroup>

        {/* Sessions */}
        <FormGroup label="Sessions affected">
          <div style={{ display:"flex", gap:8 }}>
            {["Session 1","Session 2","Both sessions"].map(s => (
              <button key={s} onClick={()=>setSessions(s)}
                style={{
                  flex:1, padding:"9px 6px", borderRadius:8,
                  border:`1.5px solid ${sessions===s?T.kraft:T.border}`,
                  background:sessions===s?T.kraftLight:T.white,
                  color:sessions===s?T.kraft:T.textSec,
                  fontSize:11, fontWeight:sessions===s?700:600,
                  cursor:"pointer", fontFamily:FONT,
                }}>{s}</button>
            ))}
          </div>
        </FormGroup>

        {/* Details */}
        <FormGroup label={`Tell us what happened (${details.length}/500)`}>
          <textarea value={details} onChange={e=>setDetails(e.target.value.slice(0,500))}
            placeholder="e.g. I reached campus at 09:00 but my phone battery died. The instructor saw me in the room throughout Session 1…"
            rows={5}
            style={{
              width:"100%", padding:"10px 12px", borderRadius:10,
              border:`1px solid ${T.border}`, background:T.bg,
              fontSize:13, color:T.text, resize:"none", lineHeight:1.4, fontFamily:FONT,
            }}/>
          {details.length > 0 && details.trim().length < 10 && (
            <p style={{ fontSize:10, color:"#B66F00", marginTop:4 }}>Add a bit more context — at least 10 characters.</p>
          )}
        </FormGroup>

        {/* Evidence — gimmick */}
        <FormGroup label="Supporting evidence (optional)">
          <button style={{
            display:"flex", alignItems:"center", gap:8, width:"100%",
            padding:"10px 12px", border:`1px dashed ${T.border}`, borderRadius:10,
            background:T.bg, color:T.textSec, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:FONT,
          }}>
            <span>📎</span> Attach a screenshot or document
          </button>
          <p style={{ fontSize:10, color:T.textMuted, marginTop:5 }}>
            e.g. metro delay screenshot, medical note, instructor confirmation
          </p>
        </FormGroup>

        {/* Notice */}
        <div style={{ padding:"10px 12px", background:T.kraftPale, borderRadius:10, marginBottom:14 }}>
          <p style={{ fontSize:10, color:T.kraftDark, lineHeight:1.5 }}>
            <strong>Heads up:</strong> your original sign-in/out timestamps stay on
            record. If approved, the day moves to <strong>Regularized</strong> with
            the instructor's note attached.
          </p>
        </div>

        {/* Actions */}
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onClose} style={{
            flex:1, padding:"12px 16px", borderRadius:12,
            border:`1.5px solid ${T.border}`, background:T.white,
            color:T.navy, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:FONT,
          }}>Cancel</button>
          <button onClick={submit} disabled={!canSubmit} style={{
            flex:2, padding:"12px 16px", borderRadius:12, border:"none",
            background:canSubmit ? T.kraft : "#e9ebf0",
            color:canSubmit ? "#fff" : T.textMuted,
            fontSize:13, fontWeight:700, cursor:canSubmit?"pointer":"not-allowed", fontFamily:FONT,
          }}>Submit Request</button>
        </div>
      </div>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div style={{ marginBottom:12 }}>
      <p style={{ fontSize:11, fontWeight:700, color:T.navyLight, marginBottom:6 }}>{label}</p>
      {children}
    </div>
  );
}

// ─── Request card (used in Pending + History tabs) ───────
function RequestCard({ request }) {
  const r = request;
  const statusCfg = {
    pending:  { bg:"#FFF4DB", fg:"#B66F00",   border:"#F1D693", label:"Pending Review" },
    approved: { bg:"#E7FBF5", fg:"#02AC7D",   border:"#9DECC9", label:"Approved" },
    rejected: { bg:"#FEE7E2", fg:T.kraftDark, border:"#FFB7A8", label:"Rejected" },
  }[r.status];

  return (
    <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:12, overflow:"hidden" }}>
      <div style={{ padding:"12px 14px", borderBottom:`1px solid ${T.borderLight}` }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6, gap:8 }}>
          <div style={{ flex:1, minWidth:0 }}>
            <p style={{ fontSize:13, fontWeight:700, color:T.navy }}>{r.forDateLabel}</p>
            <p style={{ fontSize:10, color:T.textSec, marginTop:1 }}>{r.id} · {r.sessions} · Applied {r.appliedOn}</p>
          </div>
          <span style={{
            padding:"3px 9px", borderRadius:20, fontSize:10, fontWeight:700,
            background:statusCfg.bg, color:statusCfg.fg, border:`1px solid ${statusCfg.border}`, whiteSpace:"nowrap",
          }}>{statusCfg.label}</span>
        </div>
      </div>
      <div style={{ padding:"12px 14px", background:T.bg }}>
        <p style={{ fontSize:9, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:0.6, marginBottom:4 }}>Your reason</p>
        <p style={{ fontSize:12, fontWeight:600, color:T.navy }}>{r.reasonType}</p>
        <p style={{ fontSize:11, color:T.textSec, marginTop:4, lineHeight:1.5 }}>{r.details}</p>
      </div>
      {r.status !== "pending" && r.reviewer && (
        <div style={{ padding:"12px 14px", borderTop:`1px solid ${T.borderLight}`, background:r.status==="approved" ? "#F0FCF7" : "#FFF6F4" }}>
          <p style={{ fontSize:9, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:0.6, marginBottom:4 }}>Reviewer's note</p>
          <p style={{ fontSize:11, color:T.navyLight, lineHeight:1.5 }}>{r.reviewNote}</p>
          <p style={{ fontSize:10, color:T.textSec, marginTop:6 }}>— {r.reviewer} · {r.reviewedAt}</p>
        </div>
      )}
    </div>
  );
}

function EmptyState({ icon, title, note }) {
  return (
    <div style={{ padding:"40px 24px", textAlign:"center", background:T.white, borderRadius:12, border:`1px solid ${T.border}` }}>
      <div style={{ fontSize:38, marginBottom:10 }}>{icon}</div>
      <h4 style={{ fontSize:14, fontWeight:700, color:T.navy, marginBottom:6 }}>{title}</h4>
      <p style={{ fontSize:11, color:T.textSec, lineHeight:1.5 }}>{note}</p>
    </div>
  );
}

function Toast({ kind, msg }) {
  return (
    <div style={{
      position:"absolute", top:62, left:"50%", transform:"translateX(-50%)",
      padding:"10px 16px", borderRadius:12,
      background:kind==="success" ? "#02AC7D" : T.kraft, color:"#fff",
      fontSize:12, fontWeight:700, zIndex:80,
      boxShadow:"0 8px 24px rgba(0,0,0,0.18)", maxWidth:"90%", textAlign:"center",
      animation:"slideUp 0.3s ease",
    }}>{msg}</div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SIDE DRAWER
// ═══════════════════════════════════════════════════════════════
function MobileDrawer({ open, onClose, onAttendance, onRegularization }) {
  const [attHover, setAttHover] = useState(false);
  const subItems = [
    { id:"my-att", label:"My Attendance", icon:I.calendar, live:true, action:onAttendance },
    { id:"swipes", label:"My Swipes",     icon:I.pin,      live:false },
    { id:"reg",    label:"Regularization",icon:I.shield,   live:true, action:onRegularization },
  ];
  return (
    <>
      <div onClick={onClose} style={{
        position:"absolute", inset:0, background:"rgba(27,37,89,0.45)", backdropFilter:"blur(2px)",
        opacity:open?1:0, pointerEvents:open?"auto":"none",
        transition:"opacity 0.25s ease", zIndex:40,
      }}/>
      <aside style={{
        position:"absolute", top:0, left:0, bottom:0, width:"82%", maxWidth:300,
        background:T.white,
        transform:open?"translateX(0)":"translateX(-100%)",
        transition:"transform 0.28s cubic-bezier(0.4,0,0.2,1)",
        zIndex:41, display:"flex", flexDirection:"column",
      }}>
        {/* Header */}
        <div style={{ padding:"18px 18px", background:`linear-gradient(135deg,${T.kraft},#FF6B4A)`, color:"#fff" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
            <div style={{ width:40, height:40, borderRadius:12, background:"rgba(255,255,255,0.22)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800 }}>{LEARNER.avatar}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:13, fontWeight:700 }}>{LEARNER.name}</p>
              <p style={{ fontSize:10, opacity:0.85 }}>{LEARNER.rollNo}</p>
            </div>
            <button onClick={onClose} style={{ background:"none", border:"none", color:"#fff", padding:4, cursor:"pointer" }}>{I.close}</button>
          </div>
          <p style={{ fontSize:10, opacity:0.85 }}>{LEARNER.batch}</p>
        </div>

        {/* Section */}
        <div style={{ padding:"14px 14px 6px" }}>
          <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1 }}>Workspaces</p>
        </div>

        {/* Attendance with hover sub-menu */}
        <div style={{ padding:"0 10px" }} onMouseEnter={()=>setAttHover(true)} onMouseLeave={()=>setAttHover(false)}>
          <div style={{
            display:"flex", alignItems:"center", gap:11, padding:"11px 12px",
            borderRadius:10, cursor:"pointer", transition:"all 0.2s",
            background:attHover?T.kraftLight:"transparent",
            color:attHover?T.kraft:T.navyLight,
            fontWeight:attHover?700:600, fontSize:13,
            borderLeft:`3px solid ${attHover?T.kraft:"transparent"}`,
          }} onClick={()=>setAttHover(v=>!v)}>
            <span style={{ opacity:attHover?1:0.7 }}>{I.calendar}</span>
            <span style={{ flex:1 }}>Attendance</span>
            <span style={{ transform:attHover?"rotate(90deg)":"rotate(0)", transition:"transform 0.25s ease", opacity:0.6 }}>{I.cR}</span>
          </div>
          <div style={{ maxHeight:attHover?180:0, overflow:"hidden", transition:"max-height 0.3s ease" }}>
            <div style={{ padding:"4px 0 8px 20px", borderLeft:`1.5px solid ${T.kraftLight}`, marginLeft:16, marginTop:4 }}>
              {subItems.map((item,i)=>(
                <div key={item.id} onClick={()=>item.live && item.action?.()}
                  style={{
                    display:"flex", alignItems:"center", gap:10, padding:"8px 10px",
                    borderRadius:7, cursor:"pointer", fontSize:12, fontWeight:500,
                    color:T.textSec, animation:attHover?`fadeIn 0.25s ease ${i*0.04}s both`:"none",
                  }}>
                  <span style={{ opacity:0.7 }}>{item.icon}</span>
                  <span style={{ flex:1 }}>{item.label}</span>
                  {item.live && <span style={{ fontSize:8, fontWeight:800, color:T.kraft, background:T.kraftLight, padding:"2px 5px", borderRadius:4, letterSpacing:0.4 }}>OPEN</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Other static items */}
        <div style={{ padding:"4px 10px" }}>
          {[
            { l:"Home",        i:I.home },
            { l:"My Schedule", i:I.clock },
            { l:"Resources",   i:I.book },
            { l:"My Profile",  i:I.user },
          ].map((m,i)=>(
            <div key={i} style={{
              display:"flex", alignItems:"center", gap:11, padding:"11px 12px",
              borderRadius:10, fontSize:13, fontWeight:500, color:T.textSec, cursor:"pointer",
            }}>
              <span style={{ opacity:0.7 }}>{m.i}</span>
              <span>{m.l}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop:"auto", padding:"14px 18px", borderTop:`1px solid ${T.border}`, background:T.bg }}>
          <p style={{ fontSize:10, color:T.textMuted, lineHeight:1.4 }}>
            Tap <strong style={{ color:T.navyLight }}>Attendance → My Attendance</strong> to see your calendar, swipes & insights.
          </p>
        </div>
      </aside>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN LEARNER APP
// ═══════════════════════════════════════════════════════════════
export default function LearnerApp() {
  const [screen, setScreen]                = useState("home"); // home | signin | signout | success-in | success-out | attendance | regularization
  const [activeSession, setActiveSession]  = useState(null);
  const [drawerOpen, setDrawerOpen]        = useState(false);
  const [geofence, setGeofence]            = useState(true);
  const [sessionStates, setSessionStates]  = useState({ 1:"completed", 2:"signed-in" });
  const [requests, setRequests]            = useState(MY_REGS_INITIAL);
  const [regPreset, setRegPreset]          = useState(null);

  const toSignIn  = (n) => { setActiveSession({ n, name:TODAY.sessions[n-1].name, timing:TODAY.sessions[n-1].timing }); setGeofence(true); setScreen("signin"); };
  const toSignOut = (n) => { setActiveSession({ n, name:TODAY.sessions[n-1].name, timing:TODAY.sessions[n-1].timing }); setGeofence(true); setScreen("signout"); };
  const confirmSignIn  = () => { setSessionStates(s => ({ ...s, [activeSession.n]:"signed-in" })); setScreen("success-in"); };
  const confirmSignOut = () => { setSessionStates(s => ({ ...s, [activeSession.n]:"completed" })); setScreen("success-out"); };

  const openRegularization = (day = null) => {
    setRegPreset(day);
    setScreen("regularization");
    setDrawerOpen(false);
  };

  const submitRequest = (data) => {
    const newReq = {
      id: `REG-2026-${String(1000 + requests.length + 7).padStart(4,"0")}`,
      appliedOn: "Just now",
      status: "pending",
      ...data,
    };
    setRequests([newReq, ...requests]);
  };

  return (
    <>
      <Styles/>
      <PhoneFrame>
        {screen === "home" && (
          <HomeScreen
            sessionStates={sessionStates}
            onSignIn={toSignIn}
            onSignOut={toSignOut}
            onAttendance={()=>setScreen("attendance")}
            onMenu={()=>setDrawerOpen(true)}
          />
        )}
        {screen === "signin" && activeSession && (
          <SignInScreen mode="in" session={activeSession} geofenceInside={geofence}
            onConfirm={confirmSignIn} onCancel={()=>setScreen("home")} onToggleFence={()=>setGeofence(v=>!v)}/>
        )}
        {screen === "signout" && activeSession && (
          <SignInScreen mode="out" session={activeSession} geofenceInside={geofence}
            onConfirm={confirmSignOut} onCancel={()=>setScreen("home")} onToggleFence={()=>setGeofence(v=>!v)}/>
        )}
        {screen === "success-in"  && activeSession && <SignSuccess mode="in"  session={activeSession} onHome={()=>setScreen("home")}/>}
        {screen === "success-out" && activeSession && <SignSuccess mode="out" session={activeSession} onHome={()=>setScreen("home")}/>}
        {screen === "attendance" && (
          <MyAttendanceScreen
            onBack={()=>setScreen("home")}
            onMenu={()=>setDrawerOpen(true)}
            onRegularize={openRegularization}
          />
        )}
        {screen === "regularization" && (
          <RegularizationScreen
            onBack={()=>setScreen("home")}
            onMenu={()=>setDrawerOpen(true)}
            requests={requests}
            onSubmit={submitRequest}
            presetDay={regPreset}
            onClearPreset={()=>setRegPreset(null)}
          />
        )}

        <MobileDrawer
          open={drawerOpen}
          onClose={()=>setDrawerOpen(false)}
          onAttendance={()=>{ setScreen("attendance"); setDrawerOpen(false); }}
          onRegularization={()=>openRegularization(null)}
        />
      </PhoneFrame>
    </>
  );
}
