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

### Two views in one site
Bottom-right of every page is a floating **🖥 Admin · 📱 Learner** pill — flip
between the Program Coordinator desktop console and the Learner mobile LMS.
URL hashes work too: `…/` for Admin, `…/#learner` for the mobile view.

### Try this flow (Admin)
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

### Try this flow (Learner — mobile)
1. Hit the **📱 Learner** pill (or open `…/#learner`). On desktop the LMS
   renders inside an iPhone-style phone frame so you see the real mobile
   layout; on a phone it's full-screen.
2. From the Home screen, tap **Sign In** on *Session 2 — AI in Performance
   Marketing*.
3. On the Sign-In screen, hit the **"Toggle to Outside"** demo button at the
   top to see the geofence error state (red banner + disabled Confirm). Toggle
   back to Inside → tap **Confirm Sign-In** → success screen.
4. Back on Home, tap **Sign Out** on Session 2 → same flow with elapsed time.
5. Tap the **☰** menu → hover **Attendance** → tap **My Attendance** to see
   the mobile-adapted calendar/swipes view (same data as Admin's
   Attendance Info, adapted for a 390px screen).

### Try this flow (Regularization — both sides)
1. **As learner:** ☰ → **Attendance → Regularization**. You'll see 3 tabs
   (Apply / Pending / History). On **Apply**, tap a day (try **11 May ·
   Absent**), fill the form (reason dropdown, sessions, details ≥ 10 chars),
   Submit → toast confirms and the request lands in **Pending**.
2. **Same flow but from My Attendance:** ☰ → My Attendance → tap **11 May**
   in the calendar → tap **+ Raise Regularization Request** → opens the
   same form pre-filled with that day.
3. **As admin:** flip the persona pill to 🖥 Admin → ☰ menu → hover
   **Attendance** → click **Regularization**. You'll see the **Active** tab
   with 2 pending requests (Vikram Joshi, Rahul Iyer) and **Closed** with 2
   historical entries.
4. Click **View Details** on any pending one → see the full request + the
   3-step approval ladder (Learner → Instructor L1 → Coordinator L2). Hit
   **Approve** or **Reject** → ConfirmModal asks for a note (required for
   reject) → the request moves from Active to Closed with your note attached.

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
