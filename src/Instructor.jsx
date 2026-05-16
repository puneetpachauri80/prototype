import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// INSTRUCTOR WEB LMS — Kraftshala
// ═══════════════════════════════════════════════════════════════
// Self-contained file: theme, icons, mock data, all pages.
// Persona: Priya Kothari (Instructor for PGP AI-Led Marketing · Batch 1)
//
// Pages:
//   1. Attendance Approval (the new flagship — verify learners' sign-ins)
//   2. Batch Attendance (table of all 24 learners with attendance %)
//   3. My Attendance (instructor's own calendar/swipes)
//   4. Regularization (L1 review queue + own apply, two tabs)
//   5. Home (defaults to Approval when a session is in progress)
// ═══════════════════════════════════════════════════════════════

// ─── THEME ───────────────────────────────────────────────────
const T = {
  bg:"#F5F6FA", white:"#FFFFFF",
  kraft:"#E8390E", kraftDark:"#C62E0A", kraftLight:"#FFF0ED", kraftPale:"#FFF8F6",
  navy:"#1B2559", navyLight:"#2B3674",
  text:"#1B2559", textSec:"#707EAE", textMuted:"#A3AED0",
  border:"#E9EDF7", borderLight:"#F4F7FE",
  green:"#02AC7D", greenLight:"#E7FBF5", greenBorder:"#9DECC9",
  rose:"#E8390E", roseLight:"#FEE7E2", roseBorder:"#FFB7A8",
  amber:"#B66F00", amberLight:"#FFF4DB", amberBorder:"#F1D693",
  blue:"#4318FF", blueLight:"#EFE9FF", blueBorder:"#C9B8FF",
  slate:"#5D6B97", slateLight:"#EEF0F7",
  shadow:"0 4px 24px rgba(27,37,89,0.06)",
  shadowHover:"0 8px 32px rgba(27,37,89,0.10)",
  radius:16, radiusSm:10,
};
const FONT = "'Outfit','DM Sans',-apple-system,sans-serif";

// ─── ICONS ───────────────────────────────────────────────────
const I = {
  menu:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  bell:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  search:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  close:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  check:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  x:       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  undo:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>,
  cR:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  cD:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  shield:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  cal:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  users:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  user:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  clock:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  alert:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  filter:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  plus:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  pin:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  trend:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  download:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
};

// ─── STYLES ──────────────────────────────────────────────────
const Styles = () => <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:${FONT};background:${T.bg};color:${T.text}}
  ::-webkit-scrollbar{width:6px;height:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${T.border};border-radius:3px}
  @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes scaleIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.45;transform:scale(0.85)}}
  @keyframes liveDot{0%,100%{box-shadow:0 0 0 0 ${T.kraft}80}50%{box-shadow:0 0 0 6px ${T.kraft}00}}
  input,textarea,select{font-family:${FONT}}
  input:focus,textarea:focus,select:focus{outline:none;border-color:${T.kraft};box-shadow:0 0 0 3px ${T.kraft}18}
`}</style>;

// ─── DATA ────────────────────────────────────────────────────
const INSTRUCTOR = {
  name:"Priya Kothari", firstName:"Priya", empId:"I-2024-018", avatar:"PK",
  role:"Instructor", subject:"Brand & Performance Marketing",
  batch:"PGP AI-Led Marketing · Batch 1",
  attendancePct:98, present:13, total:13, onTimePct:96,
};

const SCHEME   = "PGP AI-Led Marketing — Offline Batch 1 Attendance Scheme";
const SCHEDULE = "PGP AILM — Weekday Schedule (Mon–Sat, 9 AM – 1 PM)";

// Today (Sat 16 May 2026) — sessions Priya is teaching.
const TEACHING_TODAY = [
  { id:1, name:"Brand Strategy Foundations",  timing:"09:00 – 11:00", status:"completed",  attended:27, absent:1, late:1, late_count:1 },
  { id:2, name:"AI in Performance Marketing", timing:"11:30 – 13:00", status:"in-progress", started:"11:30 AM" },
];

// The batch — 24 learners.
const BATCH_LEARNERS = [
  { rollNo:"L-2026-0143", name:"Aarav Sharma",     avatar:"AS", attendancePct:92 },
  { rollNo:"L-2026-0144", name:"Priya Mehta",      avatar:"PM", attendancePct:96 },
  { rollNo:"L-2026-0145", name:"Rahul Iyer",       avatar:"RI", attendancePct:81 },
  { rollNo:"L-2026-0146", name:"Sneha Gupta",      avatar:"SG", attendancePct:98 },
  { rollNo:"L-2026-0147", name:"Vikram Joshi",     avatar:"VJ", attendancePct:74 },
  { rollNo:"L-2026-0148", name:"Anika Bose",       avatar:"AB", attendancePct:90 },
  { rollNo:"L-2026-0149", name:"Karan Khanna",     avatar:"KK", attendancePct:85 },
  { rollNo:"L-2026-0150", name:"Diya Reddy",       avatar:"DR", attendancePct:93 },
  { rollNo:"L-2026-0151", name:"Yash Malhotra",    avatar:"YM", attendancePct:79 },
  { rollNo:"L-2026-0152", name:"Tara Mukherjee",   avatar:"TM", attendancePct:88 },
  { rollNo:"L-2026-0153", name:"Aditya Krishnan",  avatar:"AT", attendancePct:91 },
  { rollNo:"L-2026-0154", name:"Ishaani Pillai",   avatar:"IP", attendancePct:94 },
  { rollNo:"L-2026-0155", name:"Rohit Verma",      avatar:"RV", attendancePct:87 },
  { rollNo:"L-2026-0156", name:"Meera Nair",       avatar:"MN", attendancePct:95 },
  { rollNo:"L-2026-0157", name:"Arjun Kapoor",     avatar:"AR", attendancePct:69, flag:"at-risk" },
  { rollNo:"L-2026-0158", name:"Sanya Roy",        avatar:"SY", attendancePct:97 },
  { rollNo:"L-2026-0159", name:"Kabir Singh",      avatar:"KB", attendancePct:82 },
  { rollNo:"L-2026-0160", name:"Riya Chatterjee",  avatar:"RC", attendancePct:89 },
  { rollNo:"L-2026-0161", name:"Devansh Aggarwal", avatar:"DV", attendancePct:76 },
  { rollNo:"L-2026-0162", name:"Naina Bhatt",      avatar:"NB", attendancePct:99 },
  { rollNo:"L-2026-0163", name:"Ojas Mehrotra",    avatar:"OM", attendancePct:84 },
  { rollNo:"L-2026-0164", name:"Saanvi Goyal",     avatar:"SV", attendancePct:92 },
  { rollNo:"L-2026-0165", name:"Tejas Bhardwaj",   avatar:"TB", attendancePct:73 },
  { rollNo:"L-2026-0166", name:"Pooja Rao",        avatar:"PR", attendancePct:90 },
];

// Session 2 attendance state.
// status: "self-reported" | "verified" | "not-yet" | "rejected" | "manual"
const SESSION_2_INITIAL = [
  { idx:0,  status:"self-reported", time:"11:25:14" },
  { idx:1,  status:"verified",      time:"11:28:42", verifiedAt:"11:35:00" },
  { idx:2,  status:"self-reported", time:"11:30:00" },
  { idx:3,  status:"self-reported", time:"11:30:42" },
  { idx:4,  status:"self-reported", time:"11:31:18" },
  { idx:5,  status:"verified",      time:"11:32:09", verifiedAt:"11:36:00" },
  { idx:6,  status:"self-reported", time:"11:32:55" },
  { idx:7,  status:"self-reported", time:"11:33:01" },
  { idx:8,  status:"self-reported", time:"11:33:48" },
  { idx:9,  status:"self-reported", time:"11:34:17" },
  { idx:10, status:"self-reported", time:"11:35:00" },
  { idx:11, status:"verified",      time:"11:35:33", verifiedAt:"11:38:00" },
  { idx:12, status:"self-reported", time:"11:36:24" },
  { idx:13, status:"self-reported", time:"11:37:11" },
  { idx:14, status:"verified",      time:"11:38:00", verifiedAt:"11:39:30" },
  { idx:15, status:"self-reported", time:"11:38:22" },
  { idx:16, status:"self-reported", time:"11:39:15" },
  { idx:17, status:"self-reported", time:"11:39:50" },
  { idx:18, status:"not-yet",       time:null },
  { idx:19, status:"not-yet",       time:null },
  { idx:20, status:"not-yet",       time:null },
  { idx:21, status:"rejected",      time:"11:31:42" },
  { idx:22, status:"manual",        time:"11:33:00", verifiedAt:"11:33:00", note:"Phone died" },
  { idx:23, status:"manual",        time:"11:36:30", verifiedAt:"11:36:30", note:"GPS issue" },
];

// ─── Status config (for badges) ─────────────────────────
const ATT = {
  "self-reported": { label:"Self-Reported",  bg:T.amberLight, fg:T.amber, border:T.amberBorder, dot:T.amber },
  "verified":      { label:"Verified",       bg:T.greenLight, fg:T.green, border:T.greenBorder, dot:T.green },
  "not-yet":       { label:"Not Yet",        bg:T.slateLight, fg:T.slate, border:"#D8DDEA",     dot:T.slate },
  "rejected":      { label:"Rejected",       bg:T.roseLight,  fg:T.kraftDark, border:T.roseBorder, dot:T.kraft },
  "manual":        { label:"Manual",         bg:T.blueLight,  fg:T.blue,  border:T.blueBorder,  dot:T.blue },
};

// Status for calendar (same as admin/learner)
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

// Instructor's own May 2026 calendar — Priya is on campus every class day.
const MAY_2026 = [
  { d:1,  s:"H",  note:"Labour Day" },
  { d:2,  s:"P" }, { d:3,  s:"W" },
  { d:4,  s:"P" }, { d:5,  s:"P" }, { d:6,  s:"P" }, { d:7,  s:"P" },
  { d:8,  s:"P" }, { d:9,  s:"P" }, { d:10, s:"W" },
  { d:11, s:"P" }, { d:12, s:"P" }, { d:13, s:"P" },
  { d:14, s:"C",  note:"Cancelled" }, { d:15, s:"P" },
  { d:16, s:"IP", note:"In session" },
];

// L1 review queue (regularizations from learners in Priya's batch awaiting review).
const REVIEW_QUEUE_INITIAL = [
  {
    id:"REG-2026-0007",
    learner:{ name:"Vikram Joshi", rollNo:"L-2026-0147", avatar:"VJ" },
    forDateLabel:"Thursday, 14 May 2026", forStatus:"A",
    appliedOn:"15 May, 09:32 AM", daysAgo:"23 hours ago",
    reasonType:"I was present but forgot to check in",
    details:"I reached campus at 09:00 sharp but my phone battery had died on the way. Priya saw me in the room throughout Session 1. I'd appreciate the day being marked Present.",
    sessions:"Both sessions", status:"pending",
  },
  {
    id:"REG-2026-0008",
    learner:{ name:"Rahul Iyer", rollNo:"L-2026-0145", avatar:"RI" },
    forDateLabel:"Monday, 11 May 2026", forStatus:"L",
    appliedOn:"12 May, 08:15 AM", daysAgo:"5 days ago",
    reasonType:"I was late but had a valid reason",
    details:"Sign-in at 09:23 was due to a metro delay (Yellow Line halted for 18 min). DMRC notification screenshot attached. Requesting Late be excused.",
    sessions:"Session 1", status:"pending", evidence:"DMRC-yellow-line-delay.png",
  },
];

// Priya's own regularization history.
const MY_REGS_INITIAL = [];

// ─── Data for Batch Attendance page (per-learner view) ──────
// This mirrors the admin's Attendance Info page: when the instructor opens
// any learner from the batch, they see this exact layout/data.

const LEARNER_MAY_2026 = [
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

const DAYS = {
  1:  { kind:"event",   date:"01 May 2026", weekday:"Friday",    status:"H",  title:"Labour Day", note:"Public holiday — no classes scheduled." },
  2:  { kind:"summary", date:"02 May 2026", weekday:"Saturday",  status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"02 May 2026, 13:08 PM", firstIn:"08:55 AM", lastOut:"12:58 PM", studyHrs:"3h 58m", lateBy:"0 min", verification:"Both sessions verified by Priya Kothari" },
  3:  { kind:"event",   date:"03 May 2026", weekday:"Sunday",    status:"W",  title:"Weekend", note:"No classes scheduled on Sundays." },
  4:  { kind:"summary", date:"04 May 2026", weekday:"Monday",    status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"04 May 2026, 13:11 PM", firstIn:"08:57 AM", lastOut:"13:02 PM", studyHrs:"4h 04m", lateBy:"0 min", verification:"Both sessions verified by Priya Kothari" },
  5:  { kind:"summary", date:"05 May 2026", weekday:"Tuesday",   status:"L",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"05 May 2026, 13:06 PM", firstIn:"09:18 AM", lastOut:"13:01 PM", studyHrs:"3h 40m", lateBy:"18 min", verification:"Both sessions verified by Priya Kothari", note:"Sign-in for Session 1 was 18 minutes after start. Counts as Late." },
  6:  { kind:"summary", date:"06 May 2026", weekday:"Wednesday", status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"06 May 2026, 13:10 PM", firstIn:"08:59 AM", lastOut:"13:00 PM", studyHrs:"4h 01m", lateBy:"0 min", verification:"Both sessions verified by Priya Kothari" },
  7:  { kind:"summary", date:"07 May 2026", weekday:"Thursday",  status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"07 May 2026, 13:07 PM", firstIn:"08:55 AM", lastOut:"12:59 PM", studyHrs:"4h 04m", lateBy:"0 min", verification:"Both sessions verified by Priya Kothari" },
  8:  { kind:"summary", date:"08 May 2026", weekday:"Friday",    status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"08 May 2026, 13:09 PM", firstIn:"08:58 AM", lastOut:"13:01 PM", studyHrs:"4h 03m", lateBy:"0 min", verification:"Both sessions verified by Priya Kothari" },
  9:  { kind:"summary", date:"09 May 2026", weekday:"Saturday",  status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"09 May 2026, 13:05 PM", firstIn:"08:56 AM", lastOut:"12:58 PM", studyHrs:"4h 02m", lateBy:"0 min", verification:"Both sessions verified by Priya Kothari" },
  10: { kind:"event",   date:"10 May 2026", weekday:"Sunday",    status:"W",  title:"Weekend", note:"No classes scheduled on Sundays." },
  11: { kind:"event",   date:"11 May 2026", weekday:"Monday",    status:"A",  title:"Absent — no sign-in received", note:"Geofence proximity was not confirmed at the start of either Session 1 (09:00) or Session 2 (11:30). Counts as 1 absent day toward the attendance threshold.", regularization:true },
  12: { kind:"summary", date:"12 May 2026", weekday:"Tuesday",   status:"R",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"13 May 2026, 10:14 AM (regularized)", firstIn:"Manual mark", lastOut:"Manual mark", studyHrs:"3h 58m (regularized)", lateBy:"—", verification:"Regularization approved by Priya Kothari", note:"Originally marked Absent. Regularization request approved on 13 May based on instructor confirmation of physical presence." },
  13: { kind:"summary", date:"13 May 2026", weekday:"Wednesday", status:"P",  scheme:SCHEME, schedule:SCHEDULE, processedAt:"13 May 2026, 13:08 PM", firstIn:"08:59 AM", lastOut:"13:01 PM", studyHrs:"4h 02m", lateBy:"0 min", verification:"Both sessions verified by Priya Kothari" },
  14: { kind:"event",   date:"14 May 2026", weekday:"Thursday",  status:"C",  title:"Session Cancelled", note:"Cancelled by Program Coordinator on 13 May 2026. Reason: Instructor emergency. Excluded from attendance %." },
  15: { kind:"summary", date:"15 May 2026", weekday:"Friday",    status:"HD", scheme:SCHEME, schedule:SCHEDULE, processedAt:"15 May 2026, 13:00 PM", firstIn:"08:59 AM", lastOut:"10:32 AM", studyHrs:"1h 32m", lateBy:"0 min", verification:"Session 1 verified by Priya Kothari", note:"Early departure at 10:32 AM. Attended less than 50% of scheduled time — counts as Half Day." },
  16: TODAY_DETAIL,
};

const DEFAULT_LEARNER = {
  name:"Aarav Sharma", rollNo:"L-2026-0143", avatar:"AS",
  batch:"PGP AI-Led Marketing · Batch 1",
  attendancePct:92, present:11, total:12,
  avgStudyHrs:"3h 35m", belowThreshold:0,
};

// ═══════════════════════════════════════════════════════════════
// SHARED UI HELPERS
// ═══════════════════════════════════════════════════════════════
function AttStatusChip({ status, sm }) {
  const c = ATT[status]; if (!c) return null;
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:5,
      padding:sm?"2px 8px":"3px 10px", borderRadius:20,
      fontSize:sm?10:11, fontWeight:700,
      background:c.bg, color:c.fg, border:`1px solid ${c.border}`, whiteSpace:"nowrap",
    }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:c.dot }}/>
      {c.label}
    </span>
  );
}

function StatusChip({ code, large }) {
  const c = STATUS[code]; if (!c) return null;
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:6,
      padding: large ? "5px 12px" : "3px 9px",
      borderRadius:20,
      fontSize: large ? 12 : 11,
      fontWeight:700,
      background:c.bg, color:c.fg, border:`1px solid ${c.border}`,
    }}>
      <span style={{ width: large ? 6 : 5, height: large ? 6 : 5, borderRadius:"50%", background:c.fg }}/>{c.label}
    </span>
  );
}

const Btn = ({ children, onClick, variant="ghost", disabled, sm, icon }) => {
  const styles = {
    primary: { bg:T.kraft,  color:"#fff", hover:T.kraftDark },
    success: { bg:T.green,  color:"#fff", hover:"#019d72" },
    danger:  { bg:T.rose,   color:"#fff", hover:T.kraftDark },
    ghost:   { bg:T.white,  color:T.navy, border:`1px solid ${T.border}`, hover:T.borderLight },
    soft:    { bg:T.borderLight, color:T.navy, hover:T.border },
  }[variant];
  return (
    <button onClick={onClick} disabled={disabled}
      style={{
        display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6,
        padding: sm ? "5px 10px" : "8px 16px",
        borderRadius:8, border:styles.border || "none",
        background:disabled?"#ECEEF3":styles.bg, color:disabled?T.textMuted:styles.color,
        fontSize:sm?11:12, fontWeight:700, cursor:disabled?"not-allowed":"pointer",
        transition:"all 0.15s", fontFamily:FONT, whiteSpace:"nowrap",
      }}
      onMouseEnter={e=>{ if(!disabled) e.currentTarget.style.background = styles.hover; }}
      onMouseLeave={e=>{ if(!disabled) e.currentTarget.style.background = styles.bg; }}
    >{icon}{children}</button>
  );
};

const Pill = ({ children, color="navy", sm }) => {
  const c = { navy:T.borderLight, kraft:T.kraftLight, green:T.greenLight, blue:T.blueLight, amber:T.amberLight }[color] || T.borderLight;
  const fg = { navy:T.navyLight, kraft:T.kraft, green:T.green, blue:T.blue, amber:T.amber }[color] || T.navyLight;
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:5,
      padding:sm?"2px 7px":"3px 9px", borderRadius:20,
      fontSize:sm?10:11, fontWeight:700, background:c, color:fg, whiteSpace:"nowrap",
    }}>{children}</span>
  );
};

// ═══════════════════════════════════════════════════════════════
// SHELL — top navbar + side drawer + content
// ═══════════════════════════════════════════════════════════════
function InstructorShell({ children, currentPage, onPage, breadcrumb }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:FONT }}>
      <Styles/>

      {/* Top navbar */}
      <div style={{ background:T.white, borderBottom:`1px solid ${T.border}`, padding:"0 32px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, boxShadow:"0 1px 12px rgba(27,37,89,0.04)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div onClick={()=>setDrawerOpen(true)} title="Open menu"
            style={{ width:38, height:38, borderRadius:10, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:T.textSec, transition:"all 0.15s", marginRight:4 }}
            onMouseEnter={e=>{e.currentTarget.style.background=T.bg;e.currentTarget.style.color=T.kraft}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.textSec}}>{I.menu}</div>
          <div style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer" }} onClick={()=>onPage("home")}>
            <div style={{ width:34, height:34, borderRadius:10, background:`linear-gradient(135deg,${T.kraft},#FF6B4A)`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:18, color:"#fff" }}>K</div>
            <span style={{ fontSize:18, fontWeight:800, color:T.navy, letterSpacing:-0.5 }}>kraftshala</span>
            <span style={{ fontSize:10, fontWeight:700, color:T.textMuted, background:T.bg, padding:"3px 8px", borderRadius:6, marginLeft:4 }}>LMS</span>
            <span style={{ fontSize:10, fontWeight:700, color:T.kraft, background:T.kraftLight, padding:"3px 8px", borderRadius:6, letterSpacing:0.4 }}>👨‍🏫 INSTRUCTOR</span>
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:10, background:T.bg, borderRadius:30, padding:"8px 18px", width:320, border:`1px solid ${T.border}` }}>
          <span style={{ color:T.textMuted }}>{I.search}</span>
          <input placeholder="Search learners or sessions..."
            style={{ border:"none", outline:"none", background:"transparent", fontSize:13, color:T.text, width:"100%", fontFamily:FONT }}/>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:40, height:40, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:T.textSec, position:"relative" }}>
            {I.bell}<div style={{ position:"absolute", top:8, right:8, width:8, height:8, borderRadius:"50%", background:T.kraft }}/>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"5px 14px 5px 5px", borderRadius:30, background:T.bg }}>
            <div style={{ width:34, height:34, borderRadius:10, background:`linear-gradient(135deg,${T.kraft},#FF6B4A)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff" }}>{INSTRUCTOR.avatar}</div>
            <div style={{ lineHeight:1.2 }}>
              <p style={{ fontSize:12, fontWeight:700, color:T.navy }}>{INSTRUCTOR.name}</p>
              <p style={{ fontSize:10, color:T.textMuted }}>{INSTRUCTOR.empId}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <InstructorDrawer open={drawerOpen} onClose={()=>setDrawerOpen(false)} currentPage={currentPage} onPage={(p)=>{ onPage(p); setDrawerOpen(false); }}/>

      {/* Breadcrumb */}
      {breadcrumb && (
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"20px 32px 0", display:"flex", alignItems:"center", gap:8, fontSize:13 }}>
          <span onClick={()=>onPage("home")} style={{ color:T.textMuted, cursor:"pointer", fontWeight:500 }}
            onMouseEnter={e=>e.currentTarget.style.color=T.kraft} onMouseLeave={e=>e.currentTarget.style.color=T.textMuted}>Home</span>
          <span style={{ color:T.textMuted }}>›</span>
          <span style={{ color:T.kraft, fontWeight:700 }}>{breadcrumb}</span>
        </div>
      )}

      {/* Content */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"24px 32px" }}>
        {children}
      </div>
    </div>
  );
}

// ─── Drawer ─────────────────────────────────────────────
function InstructorDrawer({ open, onClose, currentPage, onPage }) {
  const items = [
    { id:"home",     label:"Home",                icon:I.user,    section:"main" },
    { id:"approval", label:"Take Attendance",     icon:I.check,   section:"attendance", live:true, badge:"LIVE" },
    { id:"batch",    label:"Batch Attendance",    icon:I.users,   section:"attendance" },
    { id:"my-att",   label:"My Attendance",       icon:I.cal,     section:"attendance" },
    { id:"reg",      label:"Regularization",      icon:I.shield,  section:"regularization", badge:"2" },
  ];

  return (
    <>
      <div onClick={onClose} style={{
        position:"fixed", inset:0, background:"rgba(27,37,89,0.45)", backdropFilter:"blur(2px)",
        opacity:open?1:0, pointerEvents:open?"auto":"none", transition:"opacity 0.25s ease", zIndex:200,
      }}/>
      <aside style={{
        position:"fixed", top:0, left:0, bottom:0, width:300,
        background:T.white, borderRight:`1px solid ${T.border}`,
        transform:open?"translateX(0)":"translateX(-100%)",
        transition:"transform 0.28s cubic-bezier(0.4,0,0.2,1)",
        zIndex:201, display:"flex", flexDirection:"column",
        boxShadow:open?"4px 0 32px rgba(27,37,89,0.18)":"none",
      }}>
        <div style={{ padding:"18px 22px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:11, background:`linear-gradient(135deg,${T.kraft},#FF6B4A)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, color:"#fff" }}>{INSTRUCTOR.avatar}</div>
            <div style={{ lineHeight:1.2 }}>
              <p style={{ fontSize:13, fontWeight:700, color:T.navy }}>{INSTRUCTOR.name}</p>
              <p style={{ fontSize:11, color:T.textMuted }}>{INSTRUCTOR.role} · {INSTRUCTOR.subject}</p>
            </div>
          </div>
          <div onClick={onClose} style={{ width:32, height:32, borderRadius:8, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:T.textSec }}>{I.close}</div>
        </div>

        <div style={{ padding:"14px 12px 6px" }}>
          <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1.2, padding:"0 10px" }}>Workspaces</p>
        </div>

        <nav style={{ padding:"4px 12px", flex:1 }}>
          {items.map(it => {
            const active = currentPage === it.id;
            return (
              <div key={it.id} onClick={()=>onPage(it.id)}
                style={{
                  display:"flex", alignItems:"center", gap:11, padding:"10px 12px",
                  borderRadius:10, cursor:"pointer", fontSize:13, fontWeight:active?700:600,
                  color:active?T.kraft:T.navyLight, marginBottom:2,
                  background:active?T.kraftLight:"transparent",
                  borderLeft:`3px solid ${active?T.kraft:"transparent"}`,
                  transition:"all 0.18s",
                }}
                onMouseEnter={e=>{ if(!active) e.currentTarget.style.background=T.borderLight; }}
                onMouseLeave={e=>{ if(!active) e.currentTarget.style.background="transparent"; }}>
                <span style={{ opacity:active?1:0.7 }}>{it.icon}</span>
                <span style={{ flex:1 }}>{it.label}</span>
                {it.live && <span style={{ width:8, height:8, borderRadius:"50%", background:T.kraft, animation:"liveDot 1.4s ease infinite" }}/>}
                {it.badge && it.badge !== "LIVE" && (
                  <span style={{ padding:"1px 7px", borderRadius:10, fontSize:10, fontWeight:800, background:T.kraft, color:"#fff" }}>{it.badge}</span>
                )}
              </div>
            );
          })}
        </nav>

        <div style={{ padding:"14px 22px", borderTop:`1px solid ${T.border}`, background:T.bg }}>
          <p style={{ fontSize:11, fontWeight:700, color:T.navyLight, marginBottom:4 }}>Today, 16 May 2026</p>
          <p style={{ fontSize:10, color:T.textMuted, lineHeight:1.5 }}>
            <strong style={{ color:T.kraft }}>Session 2 in progress.</strong> 14 learners waiting to be verified.
          </p>
        </div>
      </aside>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// HOME / DASHBOARD
// ═══════════════════════════════════════════════════════════════
function HomePage({ onPage, sessionCounts }) {
  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      {/* Hero */}
      <div style={{
        background:`linear-gradient(135deg,${T.kraft} 0%,#FF6B4A 60%,#FF8F6B 100%)`,
        borderRadius:T.radius, padding:"32px 36px", marginBottom:24, position:"relative", overflow:"hidden", color:"#fff",
      }}>
        <div style={{ position:"absolute", top:-40, right:-20, width:260, height:260, borderRadius:"50%", background:"rgba(255,255,255,0.08)" }}/>
        <div style={{ position:"absolute", bottom:-60, right:80, width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
        <p style={{ fontSize:14, opacity:0.85, marginBottom:3, fontWeight:500 }}>Good Morning,</p>
        <h1 style={{ fontSize:30, fontWeight:800, marginBottom:6 }}>{INSTRUCTOR.firstName} 👋</h1>
        <p style={{ fontSize:14, opacity:0.88 }}>Saturday, 16 May 2026 · 11:42 AM</p>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginTop:14, background:"rgba(255,255,255,0.18)", borderRadius:30, padding:"7px 16px", fontSize:12, fontWeight:600 }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:"#fff", animation:"liveDot 1.4s ease infinite" }}/>
          Session 2 live · {sessionCounts.selfReported} learners pending verification
        </div>
      </div>

      {/* Today's classes */}
      <h3 style={{ fontSize:14, fontWeight:700, color:T.navy, marginBottom:12 }}>Today's Sessions</h3>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:24 }}>
        {TEACHING_TODAY.map(s => (
          <div key={s.id} style={{
            background:T.white, borderRadius:T.radius, padding:"18px 20px",
            border:`1px solid ${s.status==="in-progress"?T.kraft+"50":T.border}`,
            boxShadow:T.shadow, position:"relative", overflow:"hidden",
          }}>
            {s.status==="in-progress" && (
              <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:T.kraft }}/>
            )}
            <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:T.kraftLight, color:T.kraft, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, flexShrink:0 }}>{s.id}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontSize:14, fontWeight:700, color:T.navy }}>{s.name}</p>
                <p style={{ fontSize:11, color:T.textSec, marginTop:2, fontFamily:"ui-monospace, SFMono-Regular, monospace" }}>{s.timing}</p>
              </div>
              {s.status==="in-progress" ? (
                <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 10px", borderRadius:20, fontSize:10, fontWeight:800, background:T.kraftLight, color:T.kraft, letterSpacing:0.4 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:T.kraft, animation:"liveDot 1.4s ease infinite" }}/>LIVE
                </span>
              ) : (
                <Pill color="green" sm>COMPLETE</Pill>
              )}
            </div>
            {s.status==="completed" ? (
              <div style={{ marginTop:14, padding:"10px 12px", background:T.bg, borderRadius:10, display:"flex", justifyContent:"space-between", fontSize:11 }}>
                <span style={{ color:T.textSec }}>Attended <strong style={{ color:T.navy }}>{s.attended}/24</strong></span>
                <span style={{ color:T.textSec }}>Absent <strong style={{ color:T.kraftDark }}>{s.absent}</strong></span>
                <span style={{ color:T.textSec }}>Late <strong style={{ color:T.amber }}>{s.late_count}</strong></span>
              </div>
            ) : (
              <Btn variant="primary" onClick={()=>onPage("approval")} icon={I.check}>
                Take Attendance · {sessionCounts.selfReported} pending
              </Btn>
            )}
          </div>
        ))}
      </div>

      {/* Quick stats */}
      <h3 style={{ fontSize:14, fontWeight:700, color:T.navy, marginBottom:12 }}>This week</h3>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
        {[
          { l:"Batch attendance", v:"88%", sub:"PGP AILM B1 · this month", c:T.green },
          { l:"At-risk learners", v:"2", sub:"below 75% threshold",       c:T.kraft },
          { l:"Sessions taken",   v:"13", sub:"with 11 attended ≥ 80%",  c:T.navy },
          { l:"My on-time rate",  v:"96%", sub:"vs 95% target",            c:T.green },
        ].map((k,i)=>(
          <div key={i} style={{ padding:"16px 18px", background:T.white, borderRadius:T.radius, border:`1px solid ${T.border}`, boxShadow:T.shadow }}>
            <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:0.8 }}>{k.l}</p>
            <p style={{ fontSize:26, fontWeight:800, color:k.c, marginTop:4, lineHeight:1 }}>{k.v}</p>
            <p style={{ fontSize:11, color:T.textSec, marginTop:4 }}>{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <h3 style={{ fontSize:14, fontWeight:700, color:T.navy, marginBottom:12 }}>Quick links</h3>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
        {[
          { id:"batch",    l:"Batch Attendance",   sub:"24 learners · sortable",       icon:I.users,  c:T.blue },
          { id:"my-att",   l:"My Attendance",      sub:"Your calendar & swipes",       icon:I.cal,    c:T.green },
          { id:"reg",      l:"Regularization",     sub:"2 requests waiting on you",    icon:I.shield, c:T.kraft },
          { id:"approval", l:"Take Attendance",    sub:"Session 2 — 14 to verify",     icon:I.check,  c:T.amber },
        ].map((q,i)=>(
          <div key={i} onClick={()=>onPage(q.id)} style={{
            background:T.white, borderRadius:T.radius, padding:"18px", cursor:"pointer",
            border:`1px solid ${T.border}`, transition:"all 0.2s", boxShadow:T.shadow,
          }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=T.shadowHover; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=T.shadow; }}>
            <div style={{ width:42, height:42, borderRadius:12, background:q.c+"15", color:q.c, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}>{q.icon}</div>
            <p style={{ fontSize:13, fontWeight:700, color:T.navy }}>{q.l}</p>
            <p style={{ fontSize:11, color:T.textSec, marginTop:3 }}>{q.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ATTENDANCE APPROVAL PAGE  (the new flagship)
// ═══════════════════════════════════════════════════════════════
function ApprovalPage({ attendance, setAttendance }) {
  const [filter, setFilter] = useState("self-reported");
  const [search, setSearch] = useState("");
  const [toast, setToast]   = useState(null);
  const [finalConfirm, setFinalConfirm] = useState(false);

  const counts = {
    total:        attendance.length,
    selfReported: attendance.filter(a=>a.status==="self-reported").length,
    verified:     attendance.filter(a=>a.status==="verified").length,
    notYet:       attendance.filter(a=>a.status==="not-yet").length,
    rejected:     attendance.filter(a=>a.status==="rejected").length,
    manual:       attendance.filter(a=>a.status==="manual").length,
  };

  const filtered = attendance.filter(a => {
    if (filter !== "all" && a.status !== filter) return false;
    if (search) {
      const l = BATCH_LEARNERS[a.idx];
      const q = search.toLowerCase();
      if (!l.name.toLowerCase().includes(q) && !l.rollNo.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const setOne = (idx, newStatus, extra={}) => {
    setAttendance(arr => arr.map(a => a.idx===idx ? { ...a, status:newStatus, ...extra } : a));
  };

  const verifyAll = () => {
    setAttendance(arr => arr.map(a => a.status==="self-reported" ? { ...a, status:"verified", verifiedAt:"Just now" } : a));
    setToast({ msg:`${counts.selfReported} learners verified in one tap.`, kind:"success" });
    setTimeout(()=>setToast(null), 3000);
  };

  const finalize = () => {
    setToast({ msg:"Attendance finalized for Session 2 · 21 Present · 3 Absent", kind:"success" });
    setFinalConfirm(false);
    setTimeout(()=>setToast(null), 4000);
  };

  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      {/* Session header */}
      <div style={{
        background:T.white, borderRadius:T.radius, border:`1px solid ${T.border}`,
        padding:"20px 24px", marginBottom:14, boxShadow:T.shadow,
        borderTop:`3px solid ${T.kraft}`,
      }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"3px 10px", borderRadius:20, background:T.kraftLight, color:T.kraft, fontSize:10, fontWeight:800, letterSpacing:0.5, marginBottom:8 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:T.kraft, animation:"liveDot 1.4s ease infinite" }}/>SESSION IN PROGRESS · 12 MIN
            </div>
            <h2 style={{ fontSize:22, fontWeight:800, color:T.navy }}>Session 2 · AI in Performance Marketing</h2>
            <p style={{ fontSize:13, color:T.textSec, marginTop:5, fontFamily:"ui-monospace, SFMono-Regular, monospace" }}>
              Saturday, 16 May 2026 · 11:30 – 13:00 · Kraftshala Campus, Gurugram
            </p>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <Btn variant="ghost" icon={I.download}>Export roster</Btn>
            <Btn variant="ghost">Session details</Btn>
          </div>
        </div>
      </div>

      {/* Summary bar */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr) auto", gap:12, marginBottom:14, alignItems:"stretch" }}>
        {[
          { l:"Self-Reported", v:counts.selfReported, status:"self-reported" },
          { l:"Verified",      v:counts.verified,     status:"verified" },
          { l:"Not Yet",       v:counts.notYet,       status:"not-yet" },
          { l:"Rejected",      v:counts.rejected,     status:"rejected" },
          { l:"Manual",        v:counts.manual,       status:"manual" },
        ].map((s,i)=>{
          const c = ATT[s.status];
          return (
            <div key={i} onClick={()=>setFilter(s.status)} style={{
              padding:"14px 16px", background:T.white, borderRadius:T.radiusSm, cursor:"pointer",
              border:`1.5px solid ${filter===s.status ? c.dot : T.border}`,
              boxShadow: filter===s.status ? `0 0 0 3px ${c.bg}` : T.shadow,
              transition:"all 0.18s",
            }}>
              <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:0.8, display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:c.dot }}/>
                {s.l}
              </p>
              <p style={{ fontSize:26, fontWeight:800, color:c.fg, marginTop:5, lineHeight:1 }}>{s.v}</p>
              <p style={{ fontSize:10, color:T.textSec, marginTop:3 }}>
                {filter===s.status ? "Filtering by this" : "Click to filter"}
              </p>
            </div>
          );
        })}

        <div style={{ display:"flex", flexDirection:"column", gap:8, justifyContent:"center", padding:"4px 0" }}>
          <Btn variant="primary" onClick={verifyAll} disabled={counts.selfReported===0} icon={I.check}>
            Verify All Self-Reported
          </Btn>
          <Btn variant="ghost" onClick={()=>setFilter("all")}>
            View all 24
          </Btn>
        </div>
      </div>

      {/* Filter + search + manual mark */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12, gap:10, flexWrap:"wrap" }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
          {[
            { id:"all",            l:"All",            count:counts.total },
            { id:"self-reported",  l:"Self-Reported",  count:counts.selfReported },
            { id:"verified",       l:"Verified",       count:counts.verified },
            { id:"not-yet",        l:"Not Yet",        count:counts.notYet },
            { id:"rejected",       l:"Rejected",       count:counts.rejected },
            { id:"manual",         l:"Manual",         count:counts.manual },
          ].map(f => (
            <button key={f.id} onClick={()=>setFilter(f.id)} style={{
              padding:"6px 12px", borderRadius:8,
              border:`1px solid ${filter===f.id ? T.kraft : T.border}`,
              background: filter===f.id ? T.kraft : T.white,
              color: filter===f.id ? "#fff" : T.navyLight,
              fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:FONT,
              display:"inline-flex", alignItems:"center", gap:6,
            }}>
              {f.l}
              <span style={{ padding:"1px 6px", borderRadius:10, fontSize:10, fontWeight:800,
                background: filter===f.id ? "rgba(255,255,255,0.25)" : T.borderLight,
                color: filter===f.id ? "#fff" : T.textSec }}>{f.count}</span>
            </button>
          ))}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:T.white, borderRadius:8, padding:"6px 12px", border:`1px solid ${T.border}`, minWidth:220 }}>
            <span style={{ color:T.textMuted }}>{I.search}</span>
            <input placeholder="Search by name or roll no..." value={search} onChange={e=>setSearch(e.target.value)}
              style={{ border:"none", outline:"none", background:"transparent", fontSize:12, color:T.text, width:"100%", fontFamily:FONT }}/>
          </div>
        </div>
      </div>

      {/* Learner list */}
      <div style={{ background:T.white, borderRadius:T.radius, border:`1px solid ${T.border}`, boxShadow:T.shadow, overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"40px 1fr 130px 110px 220px", padding:"11px 18px", background:T.bg, borderBottom:`1px solid ${T.border}`, fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1 }}>
          <span/>
          <span>Learner</span>
          <span>Status</span>
          <span>Sign-In</span>
          <span style={{ textAlign:"right" }}>Action</span>
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding:"60px 30px", textAlign:"center" }}>
            <p style={{ fontSize:32, marginBottom:8 }}>{filter==="self-reported" ? "✅" : "🔍"}</p>
            <p style={{ fontSize:14, fontWeight:700, color:T.navy }}>
              {filter==="self-reported" ? "All self-reported learners verified" : "No learners match"}
            </p>
            <p style={{ fontSize:12, color:T.textSec, marginTop:4 }}>
              {filter==="self-reported" ? "Nicely done. Anyone arriving late will appear here." : "Try a different filter or clear your search."}
            </p>
          </div>
        ) : filtered.map(a => (
          <LearnerRow key={a.idx} a={a} learner={BATCH_LEARNERS[a.idx]} onAction={setOne}/>
        ))}
      </div>

      {/* Finalize bar */}
      <div style={{
        marginTop:14, padding:"14px 18px", background:T.white, borderRadius:T.radius,
        border:`1px solid ${T.border}`, boxShadow:T.shadow,
        display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12,
      }}>
        <div>
          <p style={{ fontSize:13, fontWeight:700, color:T.navy }}>
            Done verifying? Finalize attendance for Session 2.
          </p>
          <p style={{ fontSize:11, color:T.textSec, marginTop:3 }}>
            {counts.selfReported > 0
              ? `${counts.selfReported} learners are still self-reported. They'll be saved as Self-Reported (Unverified) if you finalize now.`
              : "All verified or marked. The session will be locked and records sent to the LMS."}
          </p>
        </div>
        <Btn variant={counts.selfReported>0?"ghost":"primary"} onClick={()=>setFinalConfirm(true)} icon={I.check}>
          Finalize Attendance
        </Btn>
      </div>

      {finalConfirm && (
        <Modal onClose={()=>setFinalConfirm(false)} title="Finalize Session 2 attendance?">
          <p style={{ fontSize:13, color:T.navyLight, lineHeight:1.55, marginBottom:14 }}>
            This will lock the attendance record for <strong>Session 2 · AI in Performance Marketing</strong> on 16 May 2026.
            The LMS will mark:
          </p>
          <div style={{ background:T.bg, borderRadius:10, padding:"12px 14px", marginBottom:14 }}>
            <FinalRow label="Present (Verified)"    v={counts.verified + counts.manual} c={T.green}/>
            <FinalRow label="Present (Unverified — self-reported)" v={counts.selfReported} c={T.amber}/>
            <FinalRow label="Absent (Not Yet)"      v={counts.notYet} c={T.slate}/>
            <FinalRow label="Absent (Rejected)"     v={counts.rejected} c={T.kraftDark}/>
          </div>
          <p style={{ fontSize:11, color:T.textSec, lineHeight:1.55 }}>
            Learners can still file regularization within 48h of session start.
          </p>
          <div style={{ display:"flex", gap:10, marginTop:18, justifyContent:"flex-end" }}>
            <Btn variant="ghost" onClick={()=>setFinalConfirm(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={finalize}>Finalize</Btn>
          </div>
        </Modal>
      )}

      {toast && <Toast {...toast}/>}
    </div>
  );
}

function FinalRow({ label, v, c }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"5px 0", fontSize:12 }}>
      <span style={{ color:T.navy }}>{label}</span>
      <span style={{ color:c, fontWeight:800, fontSize:14 }}>{v}</span>
    </div>
  );
}

// ─── Learner row inside Approval Page ────────────────────
function LearnerRow({ a, learner, onAction }) {
  const c = ATT[a.status];

  // Lateness (Session 2 starts at 11:30)
  const lateMinutes = a.time ? (() => {
    const [h,m] = a.time.split(":").map(Number);
    const minutes = h*60 + m;
    const sessionStart = 11*60 + 30;
    return Math.max(0, minutes - sessionStart);
  })() : null;

  return (
    <div style={{ display:"grid", gridTemplateColumns:"40px 1fr 130px 110px 220px", padding:"11px 18px", borderTop:`1px solid ${T.borderLight}`, alignItems:"center" }}>
      {/* Avatar */}
      <div style={{ width:30, height:30, borderRadius:9, background:T.borderLight, color:T.navyLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800 }}>{learner.avatar}</div>

      {/* Name + roll */}
      <div style={{ minWidth:0, paddingRight:10 }}>
        <p style={{ fontSize:13, fontWeight:600, color:T.navy }}>{learner.name}</p>
        <p style={{ fontSize:11, color:T.textSec, marginTop:1, display:"flex", alignItems:"center", gap:6 }}>
          {learner.rollNo}
          {learner.flag==="at-risk" && <Pill color="kraft" sm>AT-RISK {learner.attendancePct}%</Pill>}
        </p>
      </div>

      {/* Status */}
      <AttStatusChip status={a.status}/>

      {/* Time */}
      <div style={{ fontSize:11 }}>
        {a.time ? (
          <>
            <p style={{ fontFamily:"ui-monospace, SFMono-Regular, monospace", color:T.navy, fontWeight:600 }}>{a.time}</p>
            {a.status === "self-reported" && lateMinutes > 0 && (
              <p style={{ color:T.amber, marginTop:2, fontWeight:600 }}>+{lateMinutes} min late</p>
            )}
            {a.verifiedAt && a.status !== "self-reported" && (
              <p style={{ color:T.textMuted, marginTop:2, fontSize:10 }}>
                {a.status === "manual" ? "Marked" : "Verified"} at {a.verifiedAt}
              </p>
            )}
            {a.status === "manual" && a.note && (
              <p style={{ color:T.blue, marginTop:2, fontSize:10 }}>{a.note}</p>
            )}
          </>
        ) : (
          <p style={{ color:T.textMuted, fontStyle:"italic" }}>No check-in</p>
        )}
      </div>

      {/* Action */}
      <div style={{ display:"flex", gap:6, justifyContent:"flex-end" }}>
        {a.status === "self-reported" && (
          <>
            <Btn variant="success" sm icon={I.check} onClick={()=>onAction(a.idx, "verified", { verifiedAt:"Just now" })}>Verify</Btn>
            <Btn variant="danger"  sm icon={I.x}     onClick={()=>onAction(a.idx, "rejected")}>Reject</Btn>
          </>
        )}
        {a.status === "not-yet" && (
          <Btn variant="primary" sm onClick={()=>onAction(a.idx, "manual", { time:"Just now", verifiedAt:"Just now", note:"Marked manually" })}>
            Mark Present
          </Btn>
        )}
        {(a.status === "verified" || a.status === "rejected") && (
          <Btn variant="ghost" sm icon={I.undo} onClick={()=>onAction(a.idx, "self-reported")}>Revert</Btn>
        )}
        {a.status === "manual" && (
          <Btn variant="ghost" sm icon={I.undo} onClick={()=>onAction(a.idx, "not-yet", { time:null, verifiedAt:null, note:null })}>Revert</Btn>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ATTENDANCE INFO COMPONENTS (used by Batch Attendance — mirror admin)
// ═══════════════════════════════════════════════════════════════

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
      onMouseLeave={onClick?(e=>{e.currentTarget.style.boxShadow=T.shadow;e.currentTarget.style.transform="translateY(0)"}):undefined}>
      <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1 }}>{label}</p>
      <p style={{ fontSize:24, fontWeight:800, color:accent||T.navy, marginTop:6, lineHeight:1.1 }}>{value}</p>
      {sub && <p style={{ fontSize:11, color:T.textSec, marginTop:4 }}>{sub}</p>}
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

function FilterChip({ icon, label, onClick }) {
  return (
    <span onClick={onClick}
      style={{
        display:"inline-flex", alignItems:"center", gap:6, padding:"7px 12px",
        borderRadius:8, background:T.white, border:`1px solid ${T.border}`,
        fontSize:12, fontWeight:600, color:T.navyLight,
        cursor:onClick?"pointer":"default", transition:"all 0.15s",
      }}
      onMouseEnter={onClick?(e=>e.currentTarget.style.borderColor=T.kraft+"55"):undefined}
      onMouseLeave={onClick?(e=>e.currentTarget.style.borderColor=T.border):undefined}>
      <span style={{ opacity:0.7 }}>{icon}</span>{label}
    </span>
  );
}

const navBtnStyle = {
  display:"inline-flex", alignItems:"center", gap:5, padding:"6px 12px", borderRadius:8,
  border:`1px solid ${T.border}`, background:T.white, fontSize:12, fontWeight:600,
  color:T.textSec, cursor:"pointer", fontFamily:FONT,
};

const toggleBtn = (active) => ({
  padding:"6px 14px", borderRadius:6, border:"none",
  fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:FONT,
  background: active ? T.white : "transparent",
  color: active ? T.kraft : T.textSec,
  boxShadow: active ? "0 1px 2px rgba(27,37,89,0.06)" : "none",
});

// ─── CalendarGrid (full version, matches admin) ─────────────
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
        <button style={navBtnStyle}>‹ Prev</button>
        <div style={{ textAlign:"center" }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:T.navy }}>May 2026</h3>
          <p style={{ fontSize:11, color:T.textMuted, marginTop:1 }}>13 scheduled · 11 attended · 1 absent · 1 cancelled</p>
        </div>
        <button style={navBtnStyle}>Next ›</button>
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
          const cfg = info ? STATUS[info.s] : null;
          const isToday  = d===today;
          const isSel    = d===selected;
          const isFuture = d>today;
          const clickable = !!info && !isFuture;
          return (
            <div key={i} onClick={()=>clickable && onSelect(d)}
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
              onMouseLeave={e=>{ if(clickable && !isSel) e.currentTarget.style.filter="none"; }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ fontSize:13, fontWeight:isToday?800:600, color:isToday?T.kraft:T.navy }}>{String(d).padStart(2,"0")}</span>
                {isToday && <span style={{ fontSize:8, fontWeight:800, color:"#fff", background:T.kraft, padding:"1px 5px", borderRadius:4, letterSpacing:0.5 }}>TODAY</span>}
              </div>
              {cfg && info.s!=="W" && (
                <>
                  <div style={{ marginTop:4, fontSize:20, fontWeight:800, color:cfg.fg, lineHeight:1, fontFamily:FONT }}>{cfg.code}</div>
                  {info.note && <div style={{ fontSize:9, color:cfg.fg, opacity:0.9, fontWeight:600, marginTop:3, lineHeight:1.2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{info.note}</div>}
                </>
              )}
              {info?.s==="W" && (
                <div style={{ fontSize:10, color:cfg.fg, fontWeight:600, marginTop:18, textAlign:"center", letterSpacing:1 }}>WEEKEND</div>
              )}
              {cfg?.pulse && <span style={{ position:"absolute", top:6, right:6, width:7, height:7, borderRadius:"50%", background:cfg.fg, animation:"pulse 1.5s ease infinite" }}/>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── DayDetailPanel ─────────────────────────────────────────
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

      {day.kind === "event" && (
        <div style={{ padding:"32px 24px", textAlign:"center", flex:1 }}>
          <div style={{ fontSize:38, marginBottom:12 }}>{eventIcons[day.status] || "—"}</div>
          <h4 style={{ fontSize:15, fontWeight:700, color:T.navy, marginBottom:8 }}>{day.title}</h4>
          <p style={{ fontSize:12, color:T.textSec, lineHeight:1.55, maxWidth:340, margin:"0 auto" }}>{day.note}</p>
          {day.regularization && (
            <div style={{ marginTop:18, padding:"10px 14px", background:T.kraftPale, borderRadius:10, border:`1px solid ${T.kraft}30`, textAlign:"left" }}>
              <p style={{ fontSize:11, color:T.kraftDark, lineHeight:1.5 }}>
                <strong>Regularization eligible:</strong> the learner can file a request within 48h of the session. Review it from the Regularization tab.
              </p>
            </div>
          )}
        </div>
      )}

      {(day.kind === "summary" || day.kind === "full") && (
        <>
          <div style={{ padding:"12px 20px", borderBottom:`1px solid ${T.border}` }}>
            <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>Attendance Scheme</p>
            <p style={{ fontSize:13, fontWeight:600, color:T.navy, lineHeight:1.35 }}>{day.scheme}</p>
            <p style={{ fontSize:11, color:T.textSec, marginTop:6 }}>↳ {day.schedule}</p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)" }}>
            {[
              { l:"First Sign-In", v:day.firstIn,  mono:true },
              { l:"Last Sign-Out", v:day.lastOut,  mono:true },
              { l:"Study Hours",   v:day.studyHrs, mono:true },
              { l:"Late By",       v:day.lateBy,   mono:true },
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

      {day.kind === "full" && (
        <>
          <SessionsTable sessions={day.sessions}/>
          <SwipesTable swipes={day.swipes} totalHrs={day.studyHrs} onSwipeClick={onSwipeClick}/>
        </>
      )}

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

// ─── SessionsTable ──────────────────────────────────────────
function SessionsTable({ sessions }) {
  return (
    <div style={{ padding:"14px 20px", borderBottom:`1px solid ${T.border}` }}>
      <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>Session Details</p>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {sessions.map(s => (
          <div key={s.id} style={{ border:`1px solid ${T.border}`, borderRadius:T.radiusSm, overflow:"hidden", background:T.bg }}>
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
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
              {[
                { l:"Sign-In",  v:s.signIn,     mono:true },
                { l:"Sign-Out", v:s.signOut,    mono:true },
                { l:"Late In",  v:s.lateBy,     mono:true },
                { l:"Verified", v:s.verifiedBy, mono:false },
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

// ─── SwipesTable ────────────────────────────────────────────
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
              background:sw.type==="IN"?STATUS.P.bg:T.blueLight, color:sw.type==="IN"?STATUS.P.fg:T.blue,
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
                <>Awaiting sign-out<br/><span style={{ fontSize:10, color:T.textMuted }}>Session {sw.session}</span></>
              )}
            </span>
            <span style={{ textAlign:"right" }}>
              <button onClick={()=>sw.status==="verified" && onSwipeClick(sw)} disabled={sw.status!=="verified"}
                style={{
                  background:"none", border:"none",
                  color: sw.status==="verified" ? T.blue : T.textMuted,
                  fontSize:11, fontWeight:600, padding:"3px 0",
                  cursor: sw.status==="verified" ? "pointer" : "not-allowed",
                  fontFamily:FONT,
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

// ─── SwipeDetailsModal ──────────────────────────────────────
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
          <div onClick={onClose} style={{ width:32, height:32, borderRadius:8, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:T.textSec }}>{I.close}</div>
        </div>
        <div style={{ padding:"22px 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"18px 24px" }}>
          <InfoField label="Learner Name"   value={learner.name}/>
          <InfoField label="Roll Number"    value={learner.rollNo}/>
          <InfoField label="Swipe Date"     value="16 May 2026"/>
          <InfoField label="Swipe Time"     value={`${swipe.time} IST`} mono/>
          <InfoField label="Type"
            value={
              <span style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"3px 9px", borderRadius:6, fontSize:11, fontWeight:700, background:swipe.type==="IN"?STATUS.P.bg:T.blueLight, color:swipe.type==="IN"?STATUS.P.fg:T.blue }}>
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
          <button onClick={onClose} style={{ padding:"10px 22px", borderRadius:T.radiusSm, border:"none", background:T.kraft, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:FONT }}>Got it</button>
        </div>
      </div>
    </div>
  );
}

// ─── InsightsModal ──────────────────────────────────────────
function InsightsModal({ open, learner, onClose }) {
  if (!open) return null;
  const segs = [
    { s:"P",  count:7 },
    { s:"IP", count:1 },
    { s:"L",  count:1 },
    { s:"R",  count:1 },
    { s:"HD", count:1 },
    { s:"A",  count:1 },
    { s:"C",  count:1 },
    { s:"H",  count:1 },
  ];
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(27,37,89,0.5)", backdropFilter:"blur(2px)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:20, animation:"fadeIn 0.2s ease" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:T.white, borderRadius:T.radius, maxWidth:680, width:"100%", boxShadow:"0 20px 60px rgba(27,37,89,0.3)", animation:"scaleIn 0.25s ease" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 24px", borderBottom:`1px solid ${T.border}` }}>
          <div>
            <h3 style={{ fontSize:17, fontWeight:700, color:T.navy }}>Insights · May 2026</h3>
            <p style={{ fontSize:12, color:T.textSec, marginTop:2 }}>{learner.name} · {learner.batch}</p>
          </div>
          <div onClick={onClose} style={{ width:32, height:32, borderRadius:8, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:T.textSec }}>{I.close}</div>
        </div>
        <div style={{ padding:"22px 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:24 }}>
            {[
              { l:"Class Days",          v:"12",       sub:"this month so far (1 cancelled, excluded)" },
              { l:"Attendance %",        v:"92%",      sub:"11 of 12 attended · above 80% threshold", accent:STATUS.P.fg },
              { l:"Late Days",           v:"1",        sub:"5 May · 18 min late",                     accent:"#B66F00" },
              { l:"Absent Days",         v:"1",        sub:"11 May · geofence not confirmed",         accent:STATUS.A.fg },
              { l:"Avg First Sign-In",   v:"08:58 AM", sub:"vs 09:00 scheduled" },
              { l:"Avg Last Sign-Out",   v:"12:57 PM", sub:"vs 13:00 scheduled" },
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
          <button onClick={onClose} style={{ padding:"10px 22px", borderRadius:T.radiusSm, border:"none", background:T.kraft, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:FONT }}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ─── TableView ──────────────────────────────────────────────
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
                style={{ background:"none", border:"none", color:T.blue, fontSize:12, fontWeight:600, cursor:"pointer", padding:0, fontFamily:FONT }}>
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

// ─── AttendanceLegend ───────────────────────────────────────
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
              width:24, height:24, borderRadius:6,
              background:STATUS[k].bg, border:`1px solid ${STATUS[k].border}`, color:STATUS[k].fg,
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

// ═══════════════════════════════════════════════════════════════
// BATCH ATTENDANCE PAGE  (mirrors admin's Attendance Info)
// ═══════════════════════════════════════════════════════════════
function BatchPage() {
  const [activeLearner, setActiveLearner] = useState(DEFAULT_LEARNER);
  const [selected, setSelected]           = useState(16);
  const [view, setView]                   = useState("calendar"); // calendar | table
  const [swipeOpen, setSwipeOpen]         = useState(null);
  const [insightsOpen, setInsightsOpen]   = useState(false);
  const [search, setSearch]               = useState("");
  const [dropOpen, setDropOpen]           = useState(false);
  const TODAY = 16;
  const selectedDay = DAYS[selected] || null;

  const pickLearner = (l) => {
    setActiveLearner({
      name:l.name, rollNo:l.rollNo, avatar:l.avatar,
      batch:"PGP AI-Led Marketing · Batch 1",
      attendancePct:l.attendancePct, present:Math.round(l.attendancePct/100 * 12), total:12,
      avgStudyHrs:l.attendancePct >= 90 ? "3h 50m" : l.attendancePct >= 80 ? "3h 35m" : "2h 58m",
      belowThreshold: l.attendancePct < 80 ? 1 : 0,
    });
    setSearch("");
    setDropOpen(false);
  };

  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      {/* Filter bar */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:18, gap:12, flexWrap:"wrap" }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:700, color:T.navy }}>Batch Attendance</h2>
          <p style={{ fontSize:14, color:T.textSec, marginTop:4 }}>
            PGP AI-Led Marketing · Batch 1 · 24 learners · pick any to view full attendance details
          </p>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          <FilterChip icon={I.users}    label="Batch · PGP AILM B1"  onClick={()=>{}}/>
          <FilterChip icon={I.cal}      label="May 2026"             onClick={()=>{}}/>
          <div style={{ display:"flex", border:`1px solid ${T.border}`, borderRadius:8, padding:3, background:T.bg }}>
            <button onClick={()=>setView("calendar")} style={toggleBtn(view==="calendar")}>Calendar</button>
            <button onClick={()=>setView("table")}    style={toggleBtn(view==="table")}>Table</button>
          </div>
        </div>
      </div>

      {/* Learner header card */}
      <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:T.radius, boxShadow:T.shadow, padding:"18px 22px", marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
          <div style={{ width:54, height:54, borderRadius:14, background:`linear-gradient(135deg,${T.kraft},#FF6B4A)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:800, color:"#fff", flexShrink:0 }}>{activeLearner.avatar}</div>
          <div style={{ minWidth:200 }}>
            <h3 style={{ fontSize:17, fontWeight:700, color:T.navy }}>{activeLearner.name}</h3>
            <p style={{ fontSize:12, color:T.textSec, marginTop:2 }}>{activeLearner.rollNo} · {activeLearner.batch}</p>
          </div>
          <div style={{ flex:1, minWidth:240, position:"relative" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, background:T.bg, borderRadius:30, padding:"8px 18px", border:`1px solid ${T.border}` }}>
              <span style={{ color:T.textMuted }}>{I.search}</span>
              <input
                placeholder="Switch learner — search across the batch..."
                value={search}
                onChange={e=>setSearch(e.target.value)}
                onFocus={()=>setDropOpen(true)}
                onBlur={()=>setTimeout(()=>setDropOpen(false),180)}
                style={{ border:"none", outline:"none", background:"transparent", fontSize:13, color:T.text, width:"100%", fontFamily:FONT }}/>
            </div>
            {dropOpen && (
              <div style={{ position:"absolute", top:"calc(100% + 6px)", left:0, right:0, background:T.white, border:`1px solid ${T.border}`, borderRadius:T.radiusSm, boxShadow:T.shadowHover, zIndex:20, maxHeight:340, overflowY:"auto" }}>
                {BATCH_LEARNERS
                  .filter(l => !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.rollNo.toLowerCase().includes(search.toLowerCase()))
                  .map(l=>(
                    <div key={l.rollNo} onClick={()=>pickLearner(l)}
                      style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", cursor:"pointer", borderBottom:`1px solid ${T.borderLight}`, transition:"background 0.15s" }}
                      onMouseEnter={e=>e.currentTarget.style.background=T.borderLight}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <div style={{ width:32, height:32, borderRadius:8, background:T.borderLight, color:T.navyLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700 }}>{l.avatar}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ fontSize:13, fontWeight:600, color:T.navy }}>{l.name}</p>
                        <p style={{ fontSize:11, color:T.textSec }}>{l.rollNo}</p>
                      </div>
                      <span style={{ fontSize:12, fontWeight:700, color:l.attendancePct>=80?STATUS.P.fg:STATUS.A.fg }}>{l.attendancePct}%</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display:"flex", gap:12, marginBottom:14, flexWrap:"wrap" }}>
        <KPI label="Attendance %"    value={activeLearner.attendancePct+"%"}                  sub="vs 80% placement threshold"            accent={STATUS.P.fg}/>
        <KPI label="Days Present"    value={`${activeLearner.present}/${activeLearner.total}`} sub="this month · cancelled excluded"/>
        <KPI label="Avg Study Hrs"   value={activeLearner.avgStudyHrs}                         sub="per class day"/>
        <KPI label="Below Threshold" value={activeLearner.belowThreshold}                      sub="weeks under 75%"/>
        <KPI label="+3 Insights"     value="View"                                              sub="Click to expand →" accent={T.kraft} onClick={()=>setInsightsOpen(true)} highlight/>
      </div>

      {/* Main area: calendar + day detail OR table */}
      {view==="calendar" ? (
        <div style={{ display:"grid", gridTemplateColumns:"1.35fr 1fr", gap:14, marginBottom:14 }}>
          <CalendarGrid data={LEARNER_MAY_2026} selected={selected} onSelect={setSelected} today={TODAY}/>
          <DayDetailPanel day={selectedDay} onSwipeClick={setSwipeOpen}/>
        </div>
      ) : (
        <TableView data={LEARNER_MAY_2026} onSelectDay={(d)=>{ setSelected(d); setView("calendar"); }}/>
      )}

      <AttendanceLegend/>

      <SwipeDetailsModal swipe={swipeOpen} learner={activeLearner} onClose={()=>setSwipeOpen(null)}/>
      <InsightsModal     open={insightsOpen} learner={activeLearner} onClose={()=>setInsightsOpen(false)}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MY ATTENDANCE PAGE (instructor's own)
// ═══════════════════════════════════════════════════════════════
function MyAttendancePage() {
  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      <div style={{ marginBottom:18 }}>
        <h2 style={{ fontSize:22, fontWeight:700, color:T.navy }}>My Attendance</h2>
        <p style={{ fontSize:14, color:T.textSec, marginTop:4 }}>
          Your own sign-in record · May 2026 · same scheme as your batch
        </p>
      </div>

      {/* Identity card */}
      <div style={{ background:T.white, borderRadius:T.radius, border:`1px solid ${T.border}`, boxShadow:T.shadow, padding:"18px 22px", marginBottom:14, display:"flex", alignItems:"center", gap:16 }}>
        <div style={{ width:54, height:54, borderRadius:14, background:`linear-gradient(135deg,${T.kraft},#FF6B4A)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:800, color:"#fff" }}>{INSTRUCTOR.avatar}</div>
        <div style={{ flex:1 }}>
          <p style={{ fontSize:16, fontWeight:700, color:T.navy }}>{INSTRUCTOR.name}</p>
          <p style={{ fontSize:12, color:T.textSec, marginTop:2 }}>{INSTRUCTOR.empId} · {INSTRUCTOR.role} · {INSTRUCTOR.subject}</p>
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:14 }}>
        {[
          { l:"Attendance %",   v:"98%",   sub:"vs 95% target", c:T.green },
          { l:"Days Present",   v:"13/13", sub:"this month",     c:T.navy },
          { l:"Avg Sign-In",    v:"08:34", sub:"08:30 expected", c:T.green },
          { l:"On-time Rate",   v:"96%",   sub:"this month",     c:T.green },
        ].map((k,i)=>(
          <div key={i} style={{ padding:"14px 16px", background:T.white, borderRadius:T.radius, border:`1px solid ${T.border}`, boxShadow:T.shadow }}>
            <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:0.8 }}>{k.l}</p>
            <p style={{ fontSize:24, fontWeight:800, color:k.c, marginTop:5, lineHeight:1 }}>{k.v}</p>
            <p style={{ fontSize:11, color:T.textSec, marginTop:3 }}>{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Calendar + details */}
      <div style={{ display:"grid", gridTemplateColumns:"1.35fr 1fr", gap:14, marginBottom:14 }}>
        <SimpleCalendar/>
        <SimpleDayCard/>
      </div>

      {/* Legend */}
      <div style={{ background:T.white, borderRadius:T.radius, border:`1px solid ${T.border}`, padding:"14px 20px", boxShadow:T.shadow }}>
        <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>Legend</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:14 }}>
          {["P","H","W","C","IP"].map(k => (
            <span key={k} style={{ display:"inline-flex", alignItems:"center", gap:7 }}>
              <span style={{ width:22, height:22, borderRadius:5, background:STATUS[k].bg, border:`1px solid ${STATUS[k].border}`, color:STATUS[k].fg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800 }}>{STATUS[k].code}</span>
              <span style={{ fontSize:12, fontWeight:600, color:T.navyLight }}>{STATUS[k].label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SimpleCalendar() {
  const map = Object.fromEntries(MAY_2026.map(x=>[x.d,x]));
  const cells = [];
  for (let i=0;i<5;i++) cells.push(null);
  for (let d=1;d<=31;d++) cells.push(d);
  while (cells.length%7!==0) cells.push(null);

  return (
    <div style={{ background:T.white, borderRadius:T.radius, border:`1px solid ${T.border}`, boxShadow:T.shadow, overflow:"hidden" }}>
      <div style={{ padding:"14px 18px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:T.navy }}>May 2026</h3>
        <span style={{ fontSize:11, color:T.textMuted }}>13 sessions taught · 1 cancelled</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", borderBottom:`1px solid ${T.border}`, background:T.bg }}>
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(w=>(
          <div key={w} style={{ padding:"8px 0", textAlign:"center", fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1 }}>{w}</div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)" }}>
        {cells.map((d,i)=>{
          if (d===null) return <div key={i} style={{ height:60, background:T.borderLight, borderRight:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}` }}/>;
          const info = map[d];
          const cfg = info?STATUS[info.s]:null;
          const isToday = d===16;
          return (
            <div key={i} style={{
              height:60, padding:6, position:"relative",
              borderRight:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`,
              background:cfg?cfg.bg:T.white,
              opacity:d>16?0.4:1,
              ...(cfg?.stripe ? { backgroundImage:"repeating-linear-gradient(45deg,rgba(130,143,176,0.18),rgba(130,143,176,0.18) 3px,transparent 3px,transparent 7px)" } : {}),
              ...(isToday ? { boxShadow:`inset 0 0 0 2px ${T.kraft}` } : {}),
            }}>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontSize:11, fontWeight:isToday?800:600, color:isToday?T.kraft:T.navy }}>{String(d).padStart(2,"0")}</span>
                {isToday && <span style={{ fontSize:7, fontWeight:800, color:"#fff", background:T.kraft, padding:"1px 4px", borderRadius:3 }}>TODAY</span>}
              </div>
              {cfg && info.s !== "W" && (
                <div style={{ fontSize:14, fontWeight:800, color:cfg.fg, marginTop:2, lineHeight:1 }}>{cfg.code}</div>
              )}
              {cfg?.pulse && (
                <span style={{ position:"absolute", bottom:4, right:4, width:6, height:6, borderRadius:"50%", background:cfg.fg, animation:"pulse 1.5s ease infinite" }}/>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SimpleDayCard() {
  return (
    <div style={{ background:T.white, borderRadius:T.radius, border:`1px solid ${T.border}`, boxShadow:T.shadow, overflow:"hidden" }}>
      <div style={{ padding:"14px 18px", borderBottom:`1px solid ${T.border}`, background:`linear-gradient(180deg,${T.bg},${T.white})` }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:5 }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:T.navy }}>16 May 2026</h3>
          <StatusChip code="IP"/>
        </div>
        <p style={{ fontSize:11, color:T.textMuted }}>Saturday · Live · Session 2 in progress</p>
      </div>
      <div style={{ padding:"14px 18px", borderBottom:`1px solid ${T.border}` }}>
        <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>Attendance Scheme</p>
        <p style={{ fontSize:13, fontWeight:600, color:T.navy, lineHeight:1.35 }}>{SCHEME}</p>
        <p style={{ fontSize:11, color:T.textSec, marginTop:5 }}>↳ {SCHEDULE}</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
        {[
          { l:"Arrived at",   v:"08:34 AM" },
          { l:"Status",       v:"On time (4 min before)" },
          { l:"Sessions taught", v:"1 done · 1 live" },
          { l:"Departure",    v:"Pending" },
        ].map((m,i)=>(
          <div key={i} style={{ padding:"11px 18px", borderBottom:i<2?`1px solid ${T.borderLight}`:"none", borderRight:i%2===0?`1px solid ${T.borderLight}`:"none" }}>
            <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:0.8 }}>{m.l}</p>
            <p style={{ fontSize:13, fontWeight:600, color:T.navy, marginTop:3, fontFamily:"ui-monospace, SFMono-Regular, monospace" }}>{m.v}</p>
          </div>
        ))}
      </div>
      <div style={{ padding:"12px 18px", display:"flex", alignItems:"center", gap:10, background:T.kraftPale }}>
        <span style={{ color:T.kraft }}>{I.shield}</span>
        <p style={{ fontSize:11, color:T.navy, fontWeight:500, lineHeight:1.4 }}>
          As instructor, your attendance is logged at campus check-in. Sessions taught are inferred from the approval timeline.
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// REGULARIZATION PAGE (L1 review + own apply)
// ═══════════════════════════════════════════════════════════════
function RegPage() {
  const [requests, setRequests] = useState(REVIEW_QUEUE_INITIAL);
  const [myReqs, setMyReqs]     = useState(MY_REGS_INITIAL);
  const [tab, setTab]           = useState("review");
  const [detail, setDetail]     = useState(null);
  const [confirm, setConfirm]   = useState(null);
  const [toast, setToast]       = useState(null);
  const [applyOpen, setApplyOpen] = useState(false);

  const active = requests.filter(r => r.status === "pending");
  const closed = requests.filter(r => r.status !== "pending");

  const review = (id, action, note) => {
    setRequests(rs => rs.map(r => r.id === id ? {
      ...r, status:action,
      reviewer:"Priya Kothari (Instructor · L1)",
      reviewedAt:"Just now",
      reviewNote: note || (action==="approved" ? "Approved based on classroom observation." : "Rejected."),
    } : r));
    setConfirm(null); setDetail(null);
    setToast({ msg: action==="approved" ? "Request approved ✓ Learner notified." : "Request rejected. Learner notified.", kind:action });
    setTimeout(()=>setToast(null), 3500);
  };

  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:18, flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:700, color:T.navy }}>Regularization</h2>
          <p style={{ fontSize:14, color:T.textSec, marginTop:4 }}>
            {active.length} from your batch awaiting L1 review · {myReqs.length} own request{myReqs.length===1?"":"s"}
          </p>
        </div>
        <Btn variant="primary" onClick={()=>setApplyOpen(true)} icon={I.plus}>
          File my own request
        </Btn>
      </div>

      {/* Tabs */}
      <div style={{ display:"inline-flex", gap:0, marginBottom:14, background:T.white, padding:4, borderRadius:T.radiusSm, border:`1px solid ${T.border}` }}>
        {[
          { id:"review", label:"To Review", count:active.length },
          { id:"closed", label:"Closed",    count:closed.length },
          { id:"mine",   label:"My Requests", count:myReqs.length },
        ].map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            padding:"7px 16px", borderRadius:6, border:"none",
            background:tab===t.id?T.kraftLight:"transparent",
            color:tab===t.id?T.kraft:T.textSec,
            fontSize:13, fontWeight:tab===t.id?700:600,
            cursor:"pointer", fontFamily:FONT,
            display:"inline-flex", alignItems:"center", gap:7,
          }}>
            {t.label}
            <span style={{ padding:"1px 8px", borderRadius:10, fontSize:11, fontWeight:700,
              background:tab===t.id?T.kraft:T.borderLight, color:tab===t.id?"#fff":T.textSec }}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* L1 banner */}
      {tab !== "mine" && (
        <div style={{ padding:"12px 16px", background:T.kraftPale, borderRadius:T.radiusSm, border:`1px solid ${T.kraft}30`, marginBottom:14 }}>
          <p style={{ fontSize:12, color:T.kraftDark, lineHeight:1.55 }}>
            <strong>You're reviewing as L1 (Instructor).</strong> If rejected, the learner can escalate to L2 (Program Coordinator).
            SLA: 24 hours from filing. Data-integrity rule: original timestamps are preserved.
          </p>
        </div>
      )}

      {/* List */}
      {tab === "review" && active.map(r => (
        <ReviewCard key={r.id} r={r}
          onView={()=>setDetail(r)}
          onApprove={()=>setConfirm({ id:r.id, action:"approved", request:r })}
          onReject={()=>setConfirm({ id:r.id, action:"rejected", request:r })}/>
      ))}
      {tab === "review" && active.length === 0 && <Empty icon="✅" title="All caught up" sub="No regularization requests waiting on your review."/>}

      {tab === "closed" && closed.map(r => <ReviewCard key={r.id} r={r} onView={()=>setDetail(r)}/>)}
      {tab === "closed" && closed.length === 0 && <Empty icon="📋" title="No closed requests yet" sub="Approved and rejected requests will land here."/>}

      {tab === "mine" && myReqs.length === 0 && (
        <Empty icon="📝" title="You haven't filed any" sub={`Hit "File my own request" if you need to correct your attendance record.`}/>
      )}
      {tab === "mine" && myReqs.map(r => <MyReqCard key={r.id} r={r}/>)}

      {detail && <ReviewDetailsModal r={detail} onClose={()=>setDetail(null)}
        onApprove={()=>setConfirm({ id:detail.id, action:"approved", request:detail })}
        onReject={()=>setConfirm({ id:detail.id, action:"rejected", request:detail })}/>}

      {confirm && <ReviewConfirm {...confirm}
        onCancel={()=>setConfirm(null)}
        onConfirm={(note)=>review(confirm.id, confirm.action, note)}/>}

      {applyOpen && <OwnApplyModal onClose={()=>setApplyOpen(false)} onSubmit={(data)=>{
        const id = `REG-2026-I${String(myReqs.length+1).padStart(3,"0")}`;
        setMyReqs([{ id, status:"pending", appliedOn:"Just now", ...data }, ...myReqs]);
        setApplyOpen(false);
        setTab("mine");
        setToast({ msg:"Your request was filed. The Program Coordinator will review.", kind:"approved" });
        setTimeout(()=>setToast(null), 3500);
      }}/>}

      {toast && <Toast {...toast}/>}
    </div>
  );
}

// ─── Review card ──────────────────────────────────
function ReviewCard({ r, onView, onApprove, onReject }) {
  const isPending = r.status === "pending";
  const cfg = {
    pending:  { bg:T.amberLight, fg:T.amber, border:T.amberBorder, label:"Pending Review" },
    approved: { bg:T.greenLight, fg:T.green, border:T.greenBorder, label:"Approved" },
    rejected: { bg:T.roseLight,  fg:T.kraftDark, border:T.roseBorder, label:"Rejected" },
  }[r.status];

  return (
    <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:T.radius, boxShadow:T.shadow, marginBottom:12, overflow:"hidden" }}>
      <div style={{ padding:"14px 20px", borderBottom:`1px solid ${T.borderLight}`, display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, minWidth:0, flex:1 }}>
          <div style={{ width:40, height:40, borderRadius:11, background:T.borderLight, color:T.navyLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800 }}>{r.learner.avatar}</div>
          <div style={{ minWidth:0 }}>
            <p style={{ fontSize:14, fontWeight:700, color:T.navy }}>{r.learner.name}</p>
            <p style={{ fontSize:11, color:T.textSec, marginTop:1 }}>{r.learner.rollNo} · {r.sessions}</p>
          </div>
        </div>
        <div style={{ textAlign:"right", flexShrink:0 }}>
          <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:700, background:cfg.bg, color:cfg.fg, border:`1px solid ${cfg.border}`, display:"inline-block", marginBottom:5 }}>{cfg.label}</span>
          <p style={{ fontSize:10, color:T.textMuted, fontFamily:"ui-monospace, SFMono-Regular, monospace" }}>{r.id}</p>
        </div>
      </div>

      <div style={{ padding:"14px 20px", display:"grid", gridTemplateColumns:"160px 1fr", gap:"7px 16px", fontSize:12 }}>
        <span style={{ color:T.textSec, fontWeight:600 }}>Date</span>
        <span style={{ color:T.navy, display:"inline-flex", alignItems:"center", gap:8 }}>{r.forDateLabel} <StatusChip code={r.forStatus}/></span>
        <span style={{ color:T.textSec, fontWeight:600 }}>Applied</span>
        <span style={{ color:T.navy }}>{r.appliedOn}{isPending && r.daysAgo ? <span style={{ color:T.textMuted }}> · {r.daysAgo}</span> : null}</span>
        <span style={{ color:T.textSec, fontWeight:600 }}>Reason</span>
        <span style={{ color:T.navy, fontWeight:600 }}>{r.reasonType}</span>
        <span style={{ color:T.textSec, fontWeight:600, alignSelf:"flex-start" }}>Details</span>
        <span style={{ color:T.navyLight, lineHeight:1.5 }}>"{r.details}"</span>
        {r.evidence && <><span style={{ color:T.textSec, fontWeight:600 }}>Evidence</span><a href="#" onClick={e=>e.preventDefault()} style={{ color:T.blue, textDecoration:"underline" }}>📎 {r.evidence}</a></>}
      </div>

      {isPending ? (
        <div style={{ padding:"12px 20px", borderTop:`1px solid ${T.borderLight}`, background:T.bg, display:"flex", justifyContent:"flex-end", gap:8 }}>
          <Btn variant="ghost" sm onClick={onView}>View Details</Btn>
          <Btn variant="ghost" sm onClick={onReject}>Reject</Btn>
          <Btn variant="success" sm onClick={onApprove}>Approve</Btn>
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

// ─── My request card ──────────────────────────────
function MyReqCard({ r }) {
  return (
    <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:T.radius, padding:"14px 20px", marginBottom:12, boxShadow:T.shadow }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
        <div>
          <p style={{ fontSize:14, fontWeight:700, color:T.navy }}>{r.forDateLabel}</p>
          <p style={{ fontSize:11, color:T.textSec, marginTop:1 }}>{r.id} · Applied {r.appliedOn}</p>
        </div>
        <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:700, background:T.amberLight, color:T.amber, border:`1px solid ${T.amberBorder}` }}>
          Pending L2 Review
        </span>
      </div>
      <p style={{ fontSize:12, color:T.navy, fontWeight:600 }}>{r.reasonType}</p>
      <p style={{ fontSize:12, color:T.textSec, marginTop:4, lineHeight:1.5 }}>"{r.details}"</p>
    </div>
  );
}

// ─── Details modal (for review) ──────────────────────────
function ReviewDetailsModal({ r, onClose, onApprove, onReject }) {
  const isPending = r.status === "pending";
  return (
    <Modal onClose={onClose} title="Request Details" subtitle={r.id} wide>
      <Section title="Learner">
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:48, height:48, borderRadius:12, background:T.borderLight, color:T.navyLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800 }}>{r.learner.avatar}</div>
          <div>
            <p style={{ fontSize:14, fontWeight:700, color:T.navy }}>{r.learner.name}</p>
            <p style={{ fontSize:12, color:T.textSec, marginTop:1 }}>{r.learner.rollNo} · PGP AI-Led Marketing · Batch 1</p>
          </div>
        </div>
      </Section>

      <Section title="Date in question">
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:14, fontWeight:600, color:T.navy }}>{r.forDateLabel}</span>
          <StatusChip code={r.forStatus}/>
        </div>
      </Section>

      <Section title="Request">
        <div style={{ display:"grid", gridTemplateColumns:"160px 1fr", gap:"8px 14px", fontSize:13 }}>
          <span style={{ color:T.textSec }}>Filed on</span>
          <span style={{ color:T.navy }}>{r.appliedOn}{r.daysAgo ? <span style={{ color:T.textMuted }}> · {r.daysAgo}</span> : null}</span>
          <span style={{ color:T.textSec }}>Sessions affected</span>
          <span style={{ color:T.navy }}>{r.sessions}</span>
          <span style={{ color:T.textSec }}>Reason</span>
          <span style={{ color:T.navy, fontWeight:600 }}>{r.reasonType}</span>
          <span style={{ color:T.textSec, alignSelf:"flex-start" }}>Details</span>
          <p style={{ color:T.navyLight, lineHeight:1.55 }}>"{r.details}"</p>
          {r.evidence && <><span style={{ color:T.textSec }}>Evidence</span><a href="#" onClick={e=>e.preventDefault()} style={{ color:T.blue, textDecoration:"underline" }}>📎 {r.evidence}</a></>}
        </div>
      </Section>

      <Section title="Approval ladder">
        <div style={{ display:"flex", flexDirection:"column", gap:10, padding:"12px 14px", background:T.bg, borderRadius:T.radiusSm, border:`1px solid ${T.border}` }}>
          <Step n={1} label="Learner files request" done meta={r.appliedOn}/>
          <Step n={2} label="Instructor (L1) reviews ← that's you" done={!isPending} active={isPending}
            meta={isPending ? "Pending · SLA 24h from filing" : `${r.reviewedAt} · ${r.status==="approved" ? "Approved" : "Rejected"}`}/>
          <Step n={3} label="Program Coordinator (L2)"
            meta={isPending ? "Only invoked if learner escalates after rejection" : (r.status==="approved" ? "Not required" : "Available if learner escalates")}/>
        </div>
      </Section>

      {!isPending && r.reviewer && (
        <Section title="Decision">
          <div style={{ padding:"14px 16px", borderRadius:10, background:r.status==="approved" ? "#F0FCF7" : "#FFF6F4", border:`1px solid ${r.status==="approved" ? T.greenBorder : T.roseBorder}` }}>
            <p style={{ fontSize:13, color:T.navyLight, lineHeight:1.55 }}>{r.reviewNote}</p>
            <p style={{ fontSize:11, color:T.textSec, marginTop:8 }}>— {r.reviewer} · {r.reviewedAt}</p>
          </div>
        </Section>
      )}

      <div style={{ padding:"12px 14px", background:T.kraftPale, borderRadius:T.radiusSm, border:`1px solid ${T.kraft}30` }}>
        <p style={{ fontSize:11, color:T.kraftDark, lineHeight:1.55 }}>
          <strong>Data integrity:</strong> the learner's original sign-in/out
          timestamps are never deleted. Approval adds a verification overlay
          and your note; the audit trail stays intact.
        </p>
      </div>

      {isPending && (
        <div style={{ display:"flex", gap:10, marginTop:18, justifyContent:"flex-end" }}>
          <Btn variant="ghost" onClick={onClose}>Close</Btn>
          <Btn variant="ghost" onClick={onReject}>Reject</Btn>
          <Btn variant="success" onClick={onApprove}>Approve</Btn>
        </div>
      )}
    </Modal>
  );
}

function ReviewConfirm({ action, request, onCancel, onConfirm }) {
  const [note, setNote] = useState("");
  const isApprove = action === "approved";
  const canSubmit = isApprove || note.trim().length >= 5;
  return (
    <Modal onClose={onCancel} title={isApprove ? "Approve request?" : "Reject request?"} subtitle={`${request.learner.name} · ${request.forDateLabel}`}>
      <p style={{ fontSize:12, color:T.navyLight, lineHeight:1.55, marginBottom:14 }}>
        {isApprove
          ? "Marking as Regularized will update the attendance record. Original timestamps are preserved."
          : "The learner will be notified with your reason. They can escalate to the Program Coordinator (L2)."}
      </p>
      <p style={{ fontSize:11, fontWeight:700, color:T.navyLight, marginBottom:6 }}>
        Add a note ({isApprove ? "optional" : "required, min 5 chars"})
      </p>
      <textarea value={note} onChange={e=>setNote(e.target.value)} rows={4}
        placeholder={isApprove ? "e.g. Confirmed presence via session recording." : "e.g. Filed beyond 48-hour window. Per policy, escalate to coordinator if needed."}
        style={{ width:"100%", padding:"10px 12px", borderRadius:10, border:`1px solid ${T.border}`, background:T.bg, fontSize:13, color:T.text, resize:"none", lineHeight:1.4, fontFamily:FONT }}/>
      <div style={{ display:"flex", gap:10, marginTop:18, justifyContent:"flex-end" }}>
        <Btn variant="ghost" onClick={onCancel}>Cancel</Btn>
        <Btn variant={isApprove?"success":"primary"} disabled={!canSubmit} onClick={()=>onConfirm(note)}>
          {isApprove ? "Approve" : "Reject"}
        </Btn>
      </div>
    </Modal>
  );
}

// ─── Instructor's own apply form ─────────────────
function OwnApplyModal({ onClose, onSubmit }) {
  const [forDate, setForDate] = useState("");
  const [reason, setReason]   = useState("I was late but had a valid reason");
  const [details, setDetails] = useState("");
  const canSubmit = forDate && details.trim().length >= 10;

  const submit = () => {
    if (!canSubmit) return;
    onSubmit({
      forDate, forDateLabel: forDate,
      reasonType: reason, details, sessions:"Full day",
    });
  };

  return (
    <Modal onClose={onClose} title="File a regularization (yours)" subtitle="Routed to L2 — Program Coordinator">
      <FormGroup label="Date in question">
        <input type="date" value={forDate} onChange={e=>setForDate(e.target.value)}
          style={{ width:"100%", padding:"10px 12px", borderRadius:10, border:`1px solid ${T.border}`, background:T.bg, fontSize:13, fontFamily:FONT }}/>
      </FormGroup>
      <FormGroup label="Reason">
        <select value={reason} onChange={e=>setReason(e.target.value)}
          style={{ width:"100%", padding:"10px 12px", borderRadius:10, border:`1px solid ${T.border}`, background:T.bg, fontSize:13, color:T.text, fontFamily:FONT, cursor:"pointer" }}>
          <option>I was late but had a valid reason</option>
          <option>I had to leave early for a valid reason</option>
          <option>Session was held off-campus (geofence didn't apply)</option>
          <option>I covered for another instructor</option>
        </select>
      </FormGroup>
      <FormGroup label={`Details (${details.length}/500)`}>
        <textarea value={details} onChange={e=>setDetails(e.target.value.slice(0,500))} rows={4}
          placeholder="e.g. Reached campus at 09:18 due to metro delay; class started on time at 09:15 because Anika opened the room."
          style={{ width:"100%", padding:"10px 12px", borderRadius:10, border:`1px solid ${T.border}`, background:T.bg, fontSize:13, color:T.text, resize:"none", lineHeight:1.4, fontFamily:FONT }}/>
      </FormGroup>
      <div style={{ padding:"10px 12px", background:T.kraftPale, borderRadius:10, marginTop:6 }}>
        <p style={{ fontSize:11, color:T.kraftDark, lineHeight:1.5 }}>
          <strong>Note:</strong> as an instructor, your regularization goes
          directly to L2 (Program Coordinator). The original campus check-in
          timestamp is preserved.
        </p>
      </div>
      <div style={{ display:"flex", gap:10, marginTop:18, justifyContent:"flex-end" }}>
        <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
        <Btn variant="primary" disabled={!canSubmit} onClick={submit}>Submit request</Btn>
      </div>
    </Modal>
  );
}

// ═══════════════════════════════════════════════════════════════
// SHARED MODAL/SECTION/STEP/FORM HELPERS
// ═══════════════════════════════════════════════════════════════
function Modal({ children, onClose, title, subtitle, wide }) {
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(27,37,89,0.5)", backdropFilter:"blur(2px)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:20, animation:"fadeIn 0.2s ease" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:T.white, borderRadius:T.radius, maxWidth:wide?720:480, width:"100%", maxHeight:"92vh", overflowY:"auto", boxShadow:"0 20px 60px rgba(27,37,89,0.3)", animation:"scaleIn 0.25s ease" }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"18px 24px", borderBottom:`1px solid ${T.border}`, gap:12, position:"sticky", top:0, background:T.white, zIndex:1 }}>
          <div>
            <h3 style={{ fontSize:17, fontWeight:700, color:T.navy }}>{title}</h3>
            {subtitle && <p style={{ fontSize:12, color:T.textSec, marginTop:2 }}>{subtitle}</p>}
          </div>
          <div onClick={onClose} style={{ width:32, height:32, borderRadius:8, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:T.textSec }}>{I.close}</div>
        </div>
        <div style={{ padding:"22px 24px" }}>{children}</div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom:18 }}>
      <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>{title}</p>
      {children}
    </div>
  );
}

function Step({ n, label, done, active, meta }) {
  const color = done ? T.green : active ? T.kraft : T.textMuted;
  const bg    = done ? T.greenLight : active ? T.kraftLight : T.borderLight;
  return (
    <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
      <div style={{ width:26, height:26, borderRadius:"50%", background:bg, color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, flexShrink:0, marginTop:1 }}>{done ? "✓" : n}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <p style={{ fontSize:13, fontWeight:600, color: done || active ? T.navy : T.textSec }}>{label}</p>
        {meta && <p style={{ fontSize:11, color:T.textSec, marginTop:2 }}>{meta}</p>}
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

function Empty({ icon, title, sub }) {
  return (
    <div style={{ padding:"60px 30px", textAlign:"center", background:T.white, borderRadius:T.radius, border:`1px solid ${T.border}` }}>
      <div style={{ fontSize:42, marginBottom:12 }}>{icon}</div>
      <h4 style={{ fontSize:16, fontWeight:700, color:T.navy }}>{title}</h4>
      <p style={{ fontSize:13, color:T.textSec, marginTop:6, maxWidth:380, margin:"6px auto 0" }}>{sub}</p>
    </div>
  );
}

function Toast({ kind, msg }) {
  return (
    <div style={{
      position:"fixed", top:80, right:24,
      padding:"12px 20px", borderRadius:12,
      background:kind==="approved" || kind==="success" ? T.green : T.kraft, color:"#fff",
      fontSize:13, fontWeight:700, zIndex:400,
      boxShadow:"0 8px 24px rgba(0,0,0,0.18)",
      animation:"slideUp 0.3s ease",
    }}>{msg}</div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN INSTRUCTOR APP
// ═══════════════════════════════════════════════════════════════
export default function InstructorApp() {
  const [page, setPage] = useState("approval");
  const [attendance, setAttendance] = useState(SESSION_2_INITIAL);

  const sessionCounts = {
    selfReported: attendance.filter(a=>a.status==="self-reported").length,
    verified:     attendance.filter(a=>a.status==="verified").length,
    notYet:       attendance.filter(a=>a.status==="not-yet").length,
  };

  const breadcrumb = {
    home:     null,
    approval: "Take Attendance · Session 2",
    batch:    "Batch Attendance",
    "my-att": "My Attendance",
    reg:      "Regularization",
  }[page];

  return (
    <InstructorShell currentPage={page} onPage={setPage} breadcrumb={breadcrumb}>
      {page === "home"     && <HomePage onPage={setPage} sessionCounts={sessionCounts}/>}
      {page === "approval" && <ApprovalPage attendance={attendance} setAttendance={setAttendance}/>}
      {page === "batch"    && <BatchPage/>}
      {page === "my-att"   && <MyAttendancePage/>}
      {page === "reg"      && <RegPage/>}
    </InstructorShell>
  );
}
