# Design Notes — Admin Prototype

> Companion to `CONTEXT.md` (the PRD). This file captures **design decisions**,
> **what's been built so far**, and **feedback already applied** — so a future
> session can pick up without re-litigating choices.

---

## Tech & visual direction

- **Stack:** Vite + React 18 (single-file `src/App.jsx`, inline styles).
  Tailwind was scaffolded initially but **removed** — the chosen design uses
  inline styles driven by a small theme token object (`const T = {...}`).
- **Font:** Outfit (Google Fonts), loaded via `@import` inside the `<Styles>` component.
- **Palette (Kraftshala brand):**
  - Primary accent (`T.kraft`): `#E8390E` (with `kraftDark`, `kraftLight`, `kraftPale` variants)
  - Text/Navy (`T.navy`): `#1B2559` / `T.navyLight #2B3674`
  - Secondary text: `T.textSec #707EAE`, muted: `T.textMuted #A3AED0`
  - Borders: `T.border #E9EDF7`, `T.borderLight #F4F7FE`
  - Status: `T.green #05CD99`, `T.orange #FFB547`, `T.blue #4318FF`
- **Shape:** `radius:16`, `radiusSm:10`. Generous shadows (`T.shadow`, `T.shadowHover`).
- **Layout pattern:** sticky top navbar → optional breadcrumb → page content,
  capped at `maxWidth: 1140`. Settings/Attendance use a two-pane layout
  (left rail nav 240px + right content card).

If iterating, **stay in the single-file inline-style pattern** — splitting into
modules is fine later but unnecessary at prototype stage.

---

## Information architecture

```
Home (HomePage)
└── Settings
    └── Attendance  (left-rail with 6 pages)
        ├── Attendance Scheme       ← primary list + Add form
        ├── Setup Guide             ← geofence config
        ├── Attendance Policy       ← empty state → create form
        ├── Holiday Calendar
        ├── Weekend Policy
        └── Session Schedule
```

State is held in `App` (`view`, `attPage`) and inside each page (e.g.
`schemeView: "list" | "form"`, `creating` for the policy page).

---

## Feedback applied (round 1 — 16 May 2026)

All items below are **already reflected** in `src/App.jsx`:

| # | Feedback | Where in code |
|---|---|---|
| 1 | Scheme cards show only the program name + Edit/Delete (icon buttons, no `onClick` — gimmicks) | `SchemeList` → mapped over `SCHEME_NAMES` |
| 2 | "Export Config" button removed from top | Header in `SchemeList` has only Show Help + Add CTA |
| 3 | "12 learners not covered" line removed | Subtitle reads `7 schemes · 198 learners covered` |
| 4 | Keep page title + "7 schemes, 198 learners" | Same as above |
| 5 | "? Show Help" is a gimmick (no action on click) | `SmallBtn` has no `onClick` |
| 6 | "Add Attendance Scheme" placed on **right** end of header | `display:flex; justify-content:space-between` |
| 7 | Add Scheme form has exactly these fields with these dropdowns: Name (text); Session Policy (Morning / Afternoon / Evening / Night / Full Day); Weekend Policy (PGP AI-Led Marketing Weekend Policy, …); Swipe Capturing Method (Geo-fencing / Geo-tracking / Geo-fencing + Instructor Approval / Manual Instructor Marking); Attendance Policy (PGP AI-Led Marketing Attendance Policy, …); Batch Filter (PGP AI-Led Marketing Batch 1 (30 learners), …). Bottom CTAs: **Save** + **Close** | `SchemeForm` → `fields` array |
| + | Setup Guide → top-right CTA "View Geofence Locations" (gimmick) | `SetupGuidePage` |
| + | Weekend Policy → top-right CTA "View All Weekend Policies" (gimmick) | `WeekendPage` |
| + | Attendance Policy → single centered "Create New Attendance Policy" CTA → opens form with Policy Name + Rules dropdown (Attendance Status Criteria / Penalty Rules / Regularization Rules) + **Finish** + **Cancel** | `AttendancePolicyPage` |
| + | Attendance Policy → top-right CTA "View All Attendance Policies" (gimmick) | `AttendancePolicyPage` (both states) |

### Open clarification
- In feedback #7 the user wrote *"Batch Filter — display PGP AI Led marketing **attendance policy** in dropdown"*. Treated as a typo (Batch Filter logically lists **batch names**, not policy names). Implemented as batch names; revisit if user wants policy names instead.

---

## Feedback applied (round 2 — 16 May 2026)

| # | Feedback | Where in code |
|---|---|---|
| 1 | Add a **Session Schedule** field in the Add Attendance Scheme form (similar to selecting a shift the scheme applies to). | `SchemeForm` → inserted between Attendance Policy and Batch Filter, matching PRD step order. Dropdown options are named schedules (e.g. "PGP AI-Led Marketing — Weekday Schedule (Mon–Fri, 9 AM – 1 PM)"). |
| 2 | Add a non-responsive top-right CTA on the **Session Schedule** page to view other schedules, matching the pattern on other pages. | `SchedulePage` → header restructured into a flex row with `View All Session Schedules` `SmallBtn` on the right. |

---

## Feedback applied (round 3 — 16 May 2026)

| # | Feedback | Where in code |
|---|---|---|
| 1 | Add a **left-side drawer** accessible from the home page (and the rest of the shell), with an `Attendance` item that reveals sub-options on hover: `Learner Swipes`, `Regularization`, `Attendance Muster`, `Attendance Info`. | New `SidePanel` component. Trigger is a hamburger icon (`I.menu`) added to the far left of the navbar. State held on `App` (`sideOpen`). Backdrop click closes the drawer. Sub-items expand inline below `Attendance` (max-height transition) when the row is hovered. `Attendance Info` is live (`OPEN` badge, routes to `view=attendanceInfo`); the other three are still gimmicks. |

---

## Feedback applied (round 4 — 16 May 2026) — Attendance Info page

Reference screenshots in `Attendance info screens/` (greytHR's attendance info / calendar / swipe-modal flow). Translated their HR vocab → Kraftshala vocab.

| Source concept | Kraftshala translation |
|---|---|
| Employee | Learner |
| Shift (GEN/FS/NS) | Session Schedule (named) |
| Swipe IN/OUT | Sign-In / Sign-Out (geofence-validated) |
| Work Hours | Study Hours |
| Penalty Days | Below-threshold days |
| Access Card Number | Removed (no cards at Kraftshala) |
| Permissions | Regularization (related, separate page) |
| Late In / Early Out | Late Sign-In / Early Sign-Out (Half-Day if <50%) |

### Page anatomy (`AttendanceInfoPage`)
1. **Filter bar** — Page title + 3 right-side controls: Batch pill, Month pill, Calendar/Table toggle.
2. **Learner header card** — avatar gradient, name, roll number, batch + **switch-learner search** (autocomplete on `ALT_LEARNERS`).
3. **KPI strip** (5 cards) — Attendance %, Days Present, Avg Study Hrs, Below Threshold, **+3 Insights** (highlighted card → opens `InsightsModal`).
4. **Main area** (toggled):
   - **Calendar view** — `CalendarGrid` (Sun–Sat, May 2026 mock data with mix of P/A/L/HD/R/H/W/C plus an in-progress today badge with pulsing dot) ⟂ `DayDetailPanel` (16 May selected by default).
   - **Table view** — `TableView` with columns Date / Scheme / First In / Last Out / Work Hrs / Status / Swipes (Info link) / Exception. Footer with TOTAL.
5. **Legend bar** at the bottom — status-code chips with the same swatches the calendar uses.
6. Two modals:
   - **`SwipeDetailsModal`** — Learner, Roll No, Date/Time, Type (Sign-In/Out), Session, Lat/Lng (mono), **Geofence proof** (✓ Inside · Xm from center · Kraftshala Campus, Gurugram), Google Maps link (real URL with lat,lng but a non-actionable target in the prototype), Device + App version, Network, Verified by instructor, Location address. "Got it" button.
   - **`InsightsModal`** — deeper KPI grid (Total Sessions, Attendance %, Late Days, Absent Days, Avg First Sign-In, Avg Sign-Out) + a **horizontal status-distribution bar** (proportional segments coloured by status fg).

### Status config (`STATUS`)
Codes: **P** Present (green), **A** Absent (rose), **L** Late (amber), **HD** Half Day (orange), **R** Regularized (purple), **H** Holiday (slate), **W** Weekend (very light), **C** Cancelled (slate + diagonal stripe pattern), **IP** In Progress (green + pulse). Each has `{ bg, fg, border }` + optional `stripe`/`pulse` flags.

### Mock data
- `MOCK_LEARNER` = Aarav Sharma, L-2026-0143, PGP AILM Batch 1, 87% attendance.
- `ALT_LEARNERS` = 7 learners with different roll numbers + attendance %.
- `MAY_2026` = 16 days of statuses (1–16); days 17–31 are auto-rendered as faint future cells.
- `DAY_16` = full day detail for "today" (16 May 2026, Saturday) with 2 sessions, 4 swipes (one still pending = Awaiting sign-out).

### Navigation wiring
- `SidePanel` now takes an `onSelect` callback. The `Attendance Info` sub-item is the only `live:true` item; it dispatches `onSelect("info")`.
- App handles that by setting `view="attendanceInfo"` and closing the drawer.
- Breadcrumb branches: `Home › Attendance › Attendance Info` when `view==="attendanceInfo"`, vs. `Home › Settings › …` for the existing Settings flows.
- Other 3 sub-items (Learner Swipes, Regularization, Attendance Muster) remain gimmicks — flagged as such with no `OPEN` badge.

### Conventions added this round
- Status colors live in one place (`STATUS`) — re-use it whenever a status chip/dot is rendered anywhere in the app.
- Sign-In/Sign-Out times are always rendered in **monospace** (`ui-monospace`) for visual alignment.
- All "Info" links open the `SwipeDetailsModal` and feed it a `swipe` object.

---

## Feedback applied (round 5 — 16 May 2026) — Attendance Info polish + anomaly sweep

### Visual upgrades (matching the user's reference screenshots)
- **Session Details** → each session is now a self-contained sub-card: header row (number pill, name, timing, status pill) above a **4-cell metric grid** (Sign-In, Sign-Out, Late In, Verified). Replaces the previous one-line layout. New component `SessionsTable`.
- **Swipes** → restructured as a **proper table** with column headers (Type / Swipe Time / Location / Action) and an "Actual Hours" footer line, mirroring the reference. Type is a coloured badge, time uses two lines (`HH:MM:SS` + `DD Mmm YYYY`), location shows geofence distance + session number. New component `SwipesTable`.

### Data anomalies fixed
| # | Anomaly | Fix |
|---|---|---|
| 1 | Top metric `Late By: 0 min` contradicted Session 2's `Late 2 min` | `lateBy` now = `"2 min"` (day total) and matches Session 2's row |
| 2 | Top metric `Verified By: Priya Kothari (Instructor)` shown when Session 2 isn't verified yet | Replaced the top "Verified By" cell with a single **verification banner** under the metrics: `Session 1 verified · Session 2 verification pending` |
| 3 | KPI strip `Days Present: 11/13` vs Insights modal `13 of 17` | All reconciled to **11 / 12** class days (cancelled excluded), **92%** attendance |
| 4 | `Attendance %: 87%` didn't match either denominator | Now `92%` (11/12) |
| 5 | Calendar header counts were incomplete | Now reads `13 scheduled · 11 attended · 1 absent · 1 cancelled` |
| 6 | Clicking any date other than 16 May still showed today's data | New `DAYS` map with one entry per day. `DayDetailPanel` reads `selectedDay` from the map and renders one of three modes: `event` (Holiday/Weekend/Cancelled/Absent banner), `summary` (historical metrics, no swipe trail), `full` (today with live sessions + swipes). |
| 7 | Table view's `Info` link always opened `swipe[0]` | Replaced with `View ›` that calls `onSelectDay(d)` → sets calendar selection + switches view back to calendar |
| 8 | Swipe Details modal showed `Verified by Priya Kothari` for OUT swipes | Field is now conditional: `Instructor Verification` (with verifier name) for IN swipes, `Sign-Out Validation: Auto-recorded · geofence revalidated (no instructor check needed)` for OUT swipes |

### Data model changes
- **`SCHEME` + `SCHEDULE` constants** factored out so the same scheme name appears consistently across all days.
- **`TODAY_DETAIL`** replaces the old `DAY_16` constant — added `verification`, `verifiedBy` per session, `verifiedBy` per swipe, and `time: null` (was `"—"`) for the pending OUT swipe.
- **`DAYS` map** — keyed by day number, each entry has `kind: "event" | "summary" | "full"` to drive panel rendering. Includes plausible mock metrics for each day.
- **`MOCK_LEARNER`** updated: `attendancePct: 92`, `present: 11`, `total: 12`, `avgStudyHrs: "3h 35m"`.
- **`ALT_LEARNERS`** percentages adjusted to be plausible alongside the headline 92%.
- **Insights modal** segs now derived from real day-by-day counts (`P: 7`, `IP: 1`, `L: 1`, `R: 1`, `HD: 1`, `A: 1`, `C: 1`, `H: 1` = 13 days). Bar uses `flex: count` for proportional widths. Card grid reconciled (Class Days = 12, Attendance = 92%, Late = 1 with date, Absent = 1 with date).

### New panel modes (DayDetailPanel)
- **`event` (H / W / C / A)** — Centered card: big emoji icon, title (`Labour Day` / `Weekend` / `Session Cancelled` / `Absent — no sign-in received`), explanatory note. Absent shows a `+ Raise Regularization Request` button (gimmick).
- **`summary` (historical class days)** — Scheme + 4 metric cells + verification banner + optional note + small "Detailed log archived — open today's view" placeholder where the swipes/sessions would be.
- **`full` (today, 16 May)** — Everything above + `SessionsTable` + `SwipesTable`.

Try clicking each calendar day type — every status now resolves to a meaningful panel instead of silently showing today's data.

---

## Feedback applied (round 6 — 16 May 2026) — Learner mobile app

New file: `src/Learner.jsx` — completely self-contained learner-side mobile
experience. Lives alongside `src/App.jsx` (the admin console). The two are
intentionally **not** coupled: each has its own theme/icon/data setup so they
can evolve independently. A new top-level `App` in `src/App.jsx` picks which
one to render based on the `persona` state + URL hash (`#learner`).

### Files & navigation
- **`src/Learner.jsx`** — single-file mobile app with phone-frame wrapper
- **`src/App.jsx`** — now exports a top-level `App` that:
  - Maintains `persona: "admin" | "learner"` state
  - Reads/writes URL hash (`#learner` deep-links to the learner view)
  - Listens to `hashchange` (back/forward survives)
  - Renders `<AdminApp/>` (was the old `App`) or `<LearnerApp/>`
  - Always overlays a `PersonaSwitcher` (floating pill bottom-right, `🖥 Admin · 📱 Learner`)

### Phone frame
- `PhoneFrame` component wraps content. On desktop (≥ 540px viewport) it
  renders an iPhone-style bezel: 414×830px shell with dark frame, dynamic
  island at top, status bar (mock 11:25 time + signal/wifi/battery icons),
  rounded screen, home indicator pill at bottom. On mobile it disappears so
  the LMS goes full-screen.

### Screens (state machine on `LearnerApp.screen`)
- **`home`** — Greeting hero + **Today's Class card** with two `SessionRow`s
  (Session 1 already complete, Session 2 ready for Sign-In). Plus 2×2 KPI
  grid, Quick Links (My Attendance live, others gimmicks), Announcements feed.
- **`signin`** — Sign-In screen with `MiniMap` (geofence ring with pulsing
  center pin), green/red status banner, Session card, sign-in details table
  (date / live time / lat / lng / "session starts in 5 min"), optional
  Remarks textarea, sticky bottom Confirm button. **Demo toggle** at top
  ("Simulate Outside") lets reviewers see the outside-geofence error state
  with the disabled CTA + amber instructor-help banner.
- **`signout`** — Same component (`SignInScreen` with `mode="out"`), shows
  elapsed time instead of "starts in", dark Confirm Sign-Out button.
- **`success-in` / `success-out`** — Big green check, time/location/session
  card, optional "Awaiting instructor verification" tip.
- **`attendance` (My Attendance)** — Mobile-adapted version of admin's
  Attendance Info: identity strip (orange gradient), 2×2 KPI grid,
  `MobileCalendar` (compact 7-col grid, single-letter weekday headers, square
  cells with date + status code), `MobileDayDetail` (date + status, 2×2
  metric grid, verification banner, sessions cards with 4-col mini-metric
  grid, swipes table with type badge / 2-line time / location / Info link),
  legend strip. Tap any swipe's "Info" → `MobileSwipeModal` (bottom-sheet
  style with handle bar, all the geofence/device/verification fields).

### Side drawer
- `MobileDrawer` slides in from left, backdrop blur. Orange gradient header
  with learner avatar + roll number + batch. **Attendance** item expands on
  hover/click to reveal: My Attendance *(live, "OPEN" badge)*, My Swipes
  (gimmick), Regularization (gimmick). Other items: Home / Schedule /
  Resources / Profile (all gimmicks).

### Mock state
- Initial: Session 1 = `completed`, Session 2 = `signed-in` (in progress)
- Tapping Sign-In on Session 2 (after toggling back to `pending`) → walk the
  flow → success → state becomes `signed-in` → home shows Sign-Out option
- All other learner data (calendar, swipes, KPIs) mirrors the admin's view of
  Aarav Sharma's record for visual consistency

### Vocabulary translation maintained
- "Employee" → **Learner**; "Shift" → **Session Schedule**; "Swipe" →
  **Sign-In / Sign-Out**; "Penalty" → **Below threshold**; OUT swipes are
  geofence-validated only (no instructor check — same nuance as admin).

### Navigation flows
1. **Sign-In demo:** Home → Sign In on Session 2 → demo toggle to "Outside"
   to see error state → toggle back to "Inside" → Confirm → success → Home.
2. **Sign-Out demo:** Home → Sign Out on Session 2 → Confirm → success → Home.
3. **My Attendance:** Home → tap My Attendance OR ☰ menu → Attendance →
   My Attendance.

---

## Feedback applied (round 7 — 16 May 2026) — Regularization flow

Built both ends of the regularization workflow per the PRD's approval ladder.

### Learner (mobile) — `RegularizationScreen` + `ApplyForm`
- New `RegularizationScreen` (in `src/Learner.jsx`) with three tabs:
  - **Apply** — intro card explaining the flow + a list of `ELIGIBLE_DAYS`
    (Aarav's Absent 11 May, Late 5 May, Half-Day 15 May). Tap → opens
    `ApplyForm` bottom sheet.
  - **Pending** — empty by default; new submissions land here with a yellow
    "Pending Review" pill.
  - **History** — Aarav's existing approved request (12 May).
- `ApplyForm` (bottom sheet): day card at top, **Reason** dropdown with PRD's
  4 reason types, **Sessions affected** segmented control (S1 / S2 / Both),
  **Details** textarea with live char count (min 10 chars to enable Submit) and
  500-char cap, **Supporting evidence** gimmick button, data-integrity notice,
  Cancel / Submit actions.
- `RequestCard` renders both pending and closed requests with status pill +
  reviewer's note appended at the bottom for closed entries.
- Two new entry points to the screen:
  1. Side drawer → Attendance → **Regularization** (sub-item now `live:true`)
  2. My Attendance → tap an Absent/Cancelled day's banner → **+ Raise
     Regularization Request** (was a gimmick; now wired via `onRegularize`
     prop threaded through `MyAttendanceScreen` → `MobileDayDetail` →
     `LearnerApp`). Pre-selects the tapped day in the apply form.
- After Submit, a green `Toast` appears at the top, the new request moves into
  the Pending tab, and the tab switches to Pending automatically.

### Admin (desktop) — `RegularizationsReviewPage` + modals
- New page in `src/App.jsx`, reachable via the side drawer (☰ → Attendance →
  **Regularization**, now `live:true`).
- Layout matches the greytHR reference: title + subtitle, **Active | Closed**
  tab pills with count badges, two gimmick filter chips on the right.
- `ReviewRequestCard` shows learner identity + roll no + sessions, the day in
  question with a `StatusChip`, applied-on date with a "23 hours ago"
  relative-time hint, reason + details, optional evidence link. Pending cards
  end with **View Details · Reject · Approve**; closed cards end with the
  reviewer's note + signature.
- **`DetailsModal`** (opened by View Details) — full request card with five
  sections: Learner, Date in question, Request meta, **Approval Ladder**
  visualization (3-step with done/active/idle states reflecting the PRD's
  Learner → Instructor L1 → Coordinator L2 flow), and Decision (if closed) +
  a data-integrity reminder banner.
- **`ConfirmModal`** opens on Approve or Reject from either the card or the
  details modal. Note is required (min 5 chars) for Reject; optional for
  Approve. Submitting promotes the request from Active → Closed with the
  reviewer + timestamp + note attached.
- **`AdminToast`** (top-right) confirms the action.
- Mock data: `REVIEW_QUEUE_INITIAL` has 2 active (Vikram Joshi · forgot to
  check in; Rahul Iyer · late due to metro delay, with attached evidence) and
  2 closed (Sneha Gupta approved; Karan Khanna rejected for missing the
  48-hour window — example of L1 rejection that could escalate to L2).

### Navigation map updated
```
Admin (☰ → Attendance):
  ├── Attendance Info        [OPEN — live]
  ├── Regularization         [OPEN — live ★ new]
  ├── Learner Swipes         (gimmick)
  └── Attendance Muster      (gimmick)

Learner (☰ → Attendance):
  ├── My Attendance          [OPEN — live]
  ├── Regularization         [OPEN — live ★ new]
  └── My Swipes              (gimmick)
```

### Data integrity in the UI
Both modals reiterate the PRD rule: **original sign-in/out timestamps are
never deleted**. Approval adds a verification overlay + instructor note. The
audit trail stays intact.

---

## Conventions for future edits

- **Don't add real persistence yet.** Forms reset on cancel/save; no localStorage,
  no backend. Save buttons act as Close.
- **Gimmick CTAs are intentional.** Buttons like "Show Help", "View All …", and
  card Edit/Delete icons are visual placeholders — no `onClick` needed.
- **One CTA on right, the rest on left.** Page headers follow the
  title-on-left, primary-CTA-on-right rule.
- **Empty state → single centered CTA → form** is the pattern for
  zero-state pages (see `AttendancePolicyPage`).

---

## Run

```bash
npm install
npm run dev    # http://localhost:5173
```

## Deploy

- **Repo:** <https://github.com/puneetpachauri80/prototype>
- **Live:** <https://prototype-gamma-rouge.vercel.app/>
- **Host:** Vercel (auto-deploy on push to `main`)
- **Build:** `npm run build` → `dist/` (auto-detected by Vercel's Vite preset)

To rename the URL slug, go to Vercel → Project → Settings → General →
Project Name. A name change updates the public URL (the old random one
keeps redirecting for a while, but new traffic should use the new slug).
