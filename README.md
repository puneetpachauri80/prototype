# Kraftshala LMS · Offline Attendance Prototype

> An interactive React prototype of an **offline-classroom attendance system**
> for Kraftshala's *PGP in AI-Led Marketing* — covering setup (geofence,
> policy, schedule, scheme), the Program Coordinator's daily console, and a
> rich per-learner **Attendance Info** view with calendar, swipe trail, and
> geofence proofs.

**Status:** prototype · React + Vite · single-file `src/App.jsx` with inline styles, Kraftshala brand palette.

---

## Live demo

🔗 **<https://prototype-gamma-rouge.vercel.app/>**

Deployed via Vercel · auto-builds from `main`. No login required — reviewers
can click straight through.

### Try this flow
1. Click the **☰** hamburger (top-left of the navbar) → hover **Attendance** →
   click **Attendance Info** (orange "OPEN" badge).
2. On the calendar, click different status types to see how the right-side
   panel adapts: **1 May** (🎉 Holiday) · **11 May** (⚠️ Absent + Raise
   Regularization CTA) · **14 May** (🚫 Cancelled) · **15 May** (Half-Day) ·
   **12 May** (Regularized) · **16 May** (today's live view).
3. On 16 May's Swipes table, click **Info ›** on an IN swipe vs an OUT swipe
   to see the modal differ (instructor visual check vs. geofence auto-revalidation).
4. Toggle to **Table** view and use **View ›** to jump to any day.
5. Click **+3 Insights · View** on the KPI strip → distribution bar across
   all statuses.

---

## What's in the prototype

### Home
Greeting hero, "My Favourites" tiles, My Tasks, Latest Updates, Help Links.

### Settings → Attendance (Program Coordinator)
Left-rail navigation across 6 configuration pages:
- **Attendance Scheme** — list of schemes + Add Scheme form (7 fields: Name, Session Policy, Weekend Policy, Swipe Method, Attendance Policy, **Session Schedule**, Batch Filter)
- **Setup Guide** — geofence config (campus name, lat/lng, radius)
- **Attendance Policy** — empty-state → create form with rules dropdown
- **Holiday Calendar** — year selector, CSV upload, India 2026 holiday list
- **Weekend Policy** — 7-day toggles
- **Session Schedule** — schedule name + session timings

### Side drawer (☰ in navbar)
Hover the **Attendance** item to reveal sub-options: Learner Swipes, Regularization, Attendance Muster, **Attendance Info** *(live)*.

### Attendance Info (the showcase page)
- Top filter bar — Batch pill, Month pill, **Calendar ⇄ Table** toggle
- Learner header card with **switch-learner search** (autocomplete)
- KPI strip: Attendance %, Days Present, Avg Study Hrs, Below Threshold, **+3 Insights** modal
- **Calendar view** — Sun–Sat May 2026 grid with color-coded statuses (P / A / L / HD / R / H / W / C / IP) and a pulsing "in progress" indicator on today
- **Day Detail panel** — per-day mode-aware rendering:
  - **Event days** (Holiday / Weekend / Cancelled / Absent) → banner card + optional "Raise Regularization" CTA
  - **Summary days** (historical class days) → scheme, 4-cell metrics, verification banner, contextual note
  - **Today** → all of the above + **Session Details** mini-table per session + **Swipes table** with type / time / location / Info link
- **Swipe Details modal** — learner, roll number, swipe date/time, lat/lng (monospace), **✓ Inside geofence (12 m from center)**, Google Maps link, device, app version, instructor verification (IN swipes only; OUT swipes show "geofence revalidated · no instructor check needed")
- **Insights modal** — 6-card KPI deep-dive + proportional status-distribution bar
- **Legend bar** with all 8 status swatches

---

## Run locally

```bash
git clone <repo-url>
cd kraftshala-prototype
npm install
npm run dev
```

Open <http://localhost:5173>. Vite hot-reloads on save.

```bash
npm run build      # production bundle into dist/
npm run preview    # serve the built bundle
```

---

## Tech

- **React 18** + **Vite 6**
- Inline styles driven by a small theme token object (`const T = {...}`) — no
  CSS framework
- Single file: `src/App.jsx` (everything in one place by design — easy to scan
  and iterate at prototype stage)
- Google Fonts: **Outfit** (loaded via `@import` in a `<Styles>` component)
- Kraftshala palette: `#E8390E` primary, `#1B2559` text/navy

---

## Project files

```
.
├── CONTEXT.md           ← The PRD (source of truth for scope and behavior)
├── DESIGN_NOTES.md      ← Per-round design decisions + feedback log
├── README.md            ← This file
├── src/
│   ├── App.jsx          ← The entire prototype
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── Attendance info screens/   ← Reference screenshots (greytHR — design inspiration)
```

---

## Not implemented (intentional)

This is a prototype — most "save" buttons close the form, "View All …" links
are gimmicks, and only one learner has rich data. Items not built yet that
appear in the PRD:

- Instructor view (Attendance Approval Page)
- Learner view (Sign-In / Sign-Out flow on mobile)
- Real persistence / backend
- Multi-month calendar navigation
- Real prev/next month or learner switching

See `CONTEXT.md` for the full PRD and `DESIGN_NOTES.md` for what's been built,
what's a gimmick, and what's planned.

---

🤖 Built with [Claude Code](https://claude.com/claude-code)
