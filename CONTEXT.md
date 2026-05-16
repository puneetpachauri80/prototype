# Kraftshala LMS — Offline Attendance System (PRD)

> **Context for this prototype.** This file is the source of truth for the
> attendance system being built into the Kraftshala LMS for offline batches of
> the **PGP in AI-Led Marketing**. Offline sessions begin in **6 weeks**.
> Refer back to this file whenever scope or behavior is unclear.

---

## Part 1 — Attendance

### Problem
Attendance in online scenarios is measured by Zoom sessions. There is **no way
to manage attendance in an offline classroom**, and no defined path for that
data to be reflected in the LMS.

### Constraint
- Offline sessions start in **6 weeks**.

### Assumptions
- Every learner has a smartphone with GPS capability and a mobile browser.
- **No investment in physical devices** for attendance capture — this model has
  not generated revenue yet (cost-benefit call).
- LMS is web-based, runs on laptops and mobiles, and can be extended with new
  API endpoints and UI components.
- Campus WiFi is available most of the time but is unreliable.
- Classroom facilities are unknown (projectors, whiteboards, speakers, HDMI…).
- Instructors will spend ~**60 seconds per session** on attendance verification.
- 9-month program; learners attend a physical classroom within the same city.
- Today the LMS shows Zoom links to join classes; for offline classes this is
  removed (it defeats the purpose of an offline class).
- Classes take place at a **defined physical location**.

### Goal
Make the LMS ready within **6 weeks** to capture offline attendance. Deliver an
MVP quickly so users are unblocked.

---

## User Personas & Pain Points

### Learner
Fresh graduate or early-career professional, 23–28, tech-savvy, always carries a
smartphone. Paying for a premium 9-month program; expects a polished experience.
- **No visibility offline:** no way to mark/see their attendance record;
  disputes become he-said-she-said.
- **No missed-session policy:** unlike online (auto recordings), no clear
  consequence or makeup path for missing a physical session.
- **No data availability:** no daily/weekly/monthly record or swipe data.
- **Clueless:** about attendance policies, penalties, constraints.
- **Fixing records:** unsure what actions they can take to fix records.

### Instructor
External or internal faculty. Domain/subject experts, **not** operations
managers. Expected to deliver curriculum to an offline batch.
- **Role overload:** previously just clicked "Start Zoom"; now expected to
  manage attendance AND teach, with no guaranteed coordinator.
- **Not tech-savvy:** not every instructor is from the modern generation.
- **No data availability:** no daily/weekly/monthly record per student.
- **Clueless:** can they correct records? what if they make mistakes? what are
  the marking policies?

### Program Coordinator
Program manager / academic operations lead. Responsible for program health,
reporting, and stakeholder communication.
- **Policy control:** create and manage program policies for offline programs.
- **Data analysis:** needs reports/dashboards on student performance and
  discrepancies.
- **Manage workflows:** create and maintain attendance workflows.

### Parents / Guardians
Parents of young learners, often paying or co-investing. This is Kraftshala's
first offline batch — trust hasn't been built yet.
- **No transparency:** cannot confirm whether their child is attending; no
  communication about safety, campus infrastructure, or daily schedule.

---

## Scope of Project

### Step 1 — Configuration Layer (Program Coordinator)

| Capability | Persona | Scope | Notes |
|---|---|---|---|
| Create Attendance Scheme | Program Coordinator | MVP | Ties everything together: 1) scheme name, 2) swipe capturing method, 3) weekend policy, 4) attendance policy, 5) session schedule, 6) batch filter (batch of 30), 7) save |
| Setup Guide | Program Coordinator | MVP | Setup geofence capability |
| Attendance Policy | Program Coordinator | MVP | Define the attendance rules |
| Holiday/Weekend Calendar | Program Coordinator | MVP | Define holidays and weekend calendar |
| Session Schedule | Program Coordinator | MVP | Session = date + start/end time. Feeds the attendance computation. |

### Step 2 — Operational Layer

**Learner**

| Capability | Persona | Scope | Notes |
|---|---|---|---|
| Sign In / Sign Out Flow | Learner | MVP | Sign in/out with geofence |
| Attendance Self View | Learner | MVP | Calendar view with attendance details |
| Regularization Request | Learner | MVP | Request regularization of attendance |

**Instructor**

| Capability | Persona | Scope | Notes |
|---|---|---|---|
| Attendance Approval Page | Instructor | MVP | Approve student attendance based on faces present in class |
| Attendance Self View | Instructor | MVP | View self attendance |
| Learner Attendance View | Instructor | MVP | View attendance details of all students |
| Regularization Request + Approval | Instructor | MVP | Raise own requests + approve learner regularization requests |

**Program Coordinator**

| Capability | Persona | Scope | Notes |
|---|---|---|---|
| Attendance Dashboard | Program Coordinator | MVP | View entire attendance overview |
| Manual Override | Program Coordinator | MVP | Override attendance records |
| Regularization Request | Program Coordinator | MVP | Approve escalated regularization requests |

### Step 3 — Workflow
Create the workflow for regularization of attendance.

---

## Solution

### Attendance Method: Geofence + Instructor Approval
- **Geofence** proves classroom-level proximity — the learner's device must be
  within a 50–100m radius of the configured classroom location.
- **Instructor Approval** proves room-level presence — the instructor visually
  confirms who is physically in the room.
- Neither alone is sufficient. Together they form a two-source system: the
  learner controls timestamp + location, the instructor controls verification.

### Rejected methods

| Method | Rejection Reason |
|---|---|
| QR Code | Can be screenshotted and shared instantly |
| Pin Code | Can be shared over WhatsApp |
| Pure Geofence (no instructor check) | Anyone within 100m can mark without being in room |
| Selfie Verification | Can be taken from anywhere on campus |
| Beacon/Kiosk etc. | Requires hardware investment before revenue |

### System Setup (Coordinator)
1. Configure geofence → capture lat/long, name the location, set 100m radius,
   name it "Kraftshala Campus", activate.
2. Create and define the attendance policy (rules).
3. Set holiday calendar (upload holiday list) and weekend policy (which weekdays
   are weekends).
4. Create the **Attendance Scheme**, which ties everything together:
   1. Define scheme name
   2. Select swipe capturing method = Geofence
   3. Select weekend policy
   4. Select attendance policy
   5. Select session schedule (shifts: day + timings)
   6. Select batch filter (batch of 30)
   7. Save the attendance scheme
5. Walkthrough of attendance policy for the new batch.

---

## Daily Flow

### Learner Flow
Arrive within geofence radius → tap **Sign In** → screen shows lat/long,
timestamp, day, scheme, and a timer; learner may add remarks → confirm Sign In →
attendance recorded. If outside the geofence radius → error shown.
Same flow for **Sign Out** at the end of the session. The system computes
session duration.

### Instructor Flow — Attendance Approval
- **When:** start of every session.
- **Where:** Attendance Approval Page (laptop and mobile browser).
- **Sees:** session header (name, date, time, venue); a real-time summary bar
  ("23 Self-Reported | 4 Not Yet | 3 Absent"); a list of all 30 learners with
  Name, Status, Timestamp, Action.

**Status meanings**
- **Self-Reported** (yellow) — learner tapped Sign In and geofence validated;
  awaiting instructor confirmation of physical presence.
- **Not Yet** (gray) — no check-in received.
- **Verified** (green) — instructor confirmed presence; final status computed by
  system from timestamp.
- **Rejected** (red) — instructor confirmed learner is NOT in the room despite
  self-reporting; status becomes Absent (Unverified).

**Instructor steps**
1. Wait for learners to settle (first 5–10 min); dashboard updates in real time.
2. Verify presence at a natural pause. If all present → tap **Verify All
   Self-Reported** → scan room → reject anyone marked green but not visible
   (~10–15s). If there are absences → go through the list individually.
3. Handle exceptions — learner physically present but "Not Yet" (dead phone,
   GPS fail) → **Mark Present Manually** (method = `instructor_manual_mark`,
   timestamp = current time).
4. Handle late arrivals — late learner taps "I'm Here", appears as
   Self-Reported with real arrival timestamp; instructor verifies at next pause;
   system auto-computes status from lateness.

**Final summary example**
```
Session: Digital Marketing Fundamentals | 16 May 2026 | 9:00 AM - 11:00 AM
✅ 27 Present  |  🟡 1 Late  |  ❌ 2 Absent
Total time spent on attendance: ~60 seconds
```

---

## Regularization Workflow

**When:** a learner sees an incorrect record and wants it corrected.

**Learner raises request** → taps "Raise Request" on the session → selects
reason type:
- "I was present but forgot to check in"
- "I checked in but wasn't verified"
- "I was late but had a valid reason"

**Approval ladder** (per workflow settings):

| Step | Actor | Action | SLA | Next |
|---|---|---|---|---|
| 1 | Learner | Raises request with reason | Within 48h of session | Goes to L1 reviewer |
| 2 | Instructor (L1) | Reviews | 24h | Approved → record updated, done. Rejected → learner notified |
| 3 | Coordinator (L2) | Reviews escalated/disputed requests; has all session data + instructor remarks | — | Final decision. Record updated. Learner notified. |

**Data integrity rule:** regularization can **never delete the original
timestamp**. It can only: add verification to an unverified record; add an
"Excused" flag to a late record with an approved reason; or change Absent →
Present/Late with a manually entered timestamp and documented reason. Raw data
is always preserved.

---

## Fraud Prevention Model
- **Layer 1 — Detection:** instructor visual verification. For 30 learners the
  instructor can see every face. Self-reports from within geofence but outside
  the room get caught when the instructor doesn't verify.
- **Layer 2 — Deterrence:** attendance < 80% = no placement support; three
  consecutive unexcused absences = parent notification + academic intervention;
  attendance is part of final evaluation and certification. Policies are
  communicated clearly on Day 1.
- **Layer 3 — Audit:** session recording camera provides independent visual
  evidence. Selfie capture can be added in Phase 1. Anomaly detection in Phase 2
  flags suspicious patterns (e.g., 100% attendance for weeks; instructor never
  rejecting anyone).

---

## Edge Cases

### Sign-In Flow
- **1 — GPS inaccurate/not working:** learner is in class but shown outside
  geofence (indoor drift, battery saver, low-accuracy mode). Error: "Unable to
  verify your location." If it persists, learner tells the instructor →
  instructor taps **Mark Present Manually**.
- **2 — Phone dead or forgotten:** learner informs instructor verbally →
  instructor **Mark Present Manually** (timestamp = mark time, not arrival).
  Learner can raise a regularization request to adjust the timestamp.
- **4 — Checked in within geofence but not in the room** (canteen, parking):
  primary fraud scenario. Solved by instructor approval — instructor doesn't see
  them, doesn't verify; the attempt fails without explicit rejection.
- **5 — Checked in on time but instructor forgets to verify:** system nudges the
  instructor 15 min after session start ("24 self-reported learners pending
  verification"); instructor can finish the review even after class.
- **6 — Two sessions in one day:** each session is a separate record; learner
  signs in for each independently; calendar view must handle this.
- **7 — Checks in early, leaves, returns:** sign-in 8:58 = Present; if not in
  room when instructor scans, not verified; on return learner is asked to file a
  regularization request.
- **8 — Double-tap Sign-In:** only the first successful check-in per
  session/learner is accepted; later taps show "You've already signed in for
  this session at 9:02 AM." No duplicate records.

### Sign-Out Flow
- **9 — Forgets to sign out:** record marked "Incomplete Session — No Sign-Out."
  Learner must sign out, else the CTA changes to Sign In after midnight for the
  next day. With another session same day, learner must Sign-Out of the previous
  session to Sign-In to the next.
- **10 — Signs out early:** records actual sign-out; computes duration; flags
  "Early Departure." Policy should define a minimum session-duration threshold
  (e.g., < 50% of session = half-day absence).
- **11 — Signs out from outside geofence:** Sign-Out only allowed within the
  geofence radius.

### Session-Level
- **13 — Instructor late or absent:** learners self-report normally; instructor
  verifies when they arrive.
- **14 — Session cancelled after check-ins:** coordinator marks session
  "Cancelled"; all records voided (not Present/Absent); session excluded from
  attendance % total; learners see "Session Cancelled" (gray, like holiday);
  notification sent.
- **15 — Session time changes after scheme configured:** schedule changes must
  propagate to the attendance engine in real time; rules recalculate on new
  start time; if some already checked in, coordinator reviews and may manually
  override; system warns: "3 learners have already checked in for the original
  time. Review their records."

---

## Build Plan
Prototype the entire project in **React + Tailwind**, starting with the
**Admin (Program Coordinator) View**, then Instructor, then Learner.
