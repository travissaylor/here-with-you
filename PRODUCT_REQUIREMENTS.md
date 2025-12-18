# Product Requirements Document (PRD)

## Product Name

Here With You

## Version

v1 Web

## Owner

Travis Saylor

## Platform

Mobile-first web application  
Framework: **Next.js (App Router) + TypeScript**  
Deployment: Static site (Vercel)  
Storage: Bundled assets (Option A)

---

## 1. Problem Statement

On emotionally hard days, Maggie experiences nervous system dysregulation that makes it difficult to self-soothe, make decisions, or access a felt sense of support, even when support exists.

Most tools require too much thinking, feel generic, or push reflection and problem-solving too early. She needs a **simple, emotionally safe flow** that helps her calm her body first and then feel supported through real voices from people who love her.

---

## 2. Product Goals

- Help her feel calmer and less alone within 60–120 seconds
- Minimize cognitive load and decision-making
- Prioritize regulation before reflection
- Feel deeply personal rather than generic
- End cleanly without pressure to do more

Success is emotional, not behavioral.

---

## 3. Non-Goals (Explicitly Out of Scope for v1)

- User accounts or authentication
- Backend services or APIs
- Notifications or reminders
- Mood tracking or journaling
- AI-generated content
- Analytics or usage tracking
- Uploading or editing content within the app

---

## 4. Core User Flow

### Entry Point

User opens the app intentionally.  
No notifications, no auto-launch behavior.

---

### Screen 1: Grounding & Breath

**Purpose**  
Reduce nervous system activation before presenting emotional content.

**UI**

- Full-screen calm background
- Centered expanding/contracting circle animation
- Minimal supportive copy

**Copy**

- “Let’s slow things down together”
- “Start when you’re ready”

**Behavior**

- User taps to start animation
- Circle expands on inhale and contracts on exhale
- Fixed pacing (recommended: 4s inhale, 6s exhale)
- Runs for ~3 full breaths
- No countdown or progress indicator
- User can skip at any time

**Exit**

- Auto-advance after animation completes or skip is tapped

---

### Screen 2: Choose Support

**Purpose**  
Offer connection with minimal cognitive load.

**UI**

- Grid of 3–5 people max
- Each card includes:
  - Photo
  - First name only

**Primary Action**

- “Play one for me” (highlighted)
  - Randomly selects a message

**Secondary Action**

- Tap a specific person

**Copy**

- “Who would you like support from right now?”
- Subtext: “Everyone here wanted you to hear this”

---

### Screen 3: Message Playback

**Purpose**  
Deliver emotional support through real human connection.

**Content**

- Audio recordings only (20–45 seconds)
- No advice, no fixing

**UI**

- Photo and name of the person
- Text: “Someone who loves you wanted you to hear this”
- Controls: Play / Pause

**Behavior**

- Audio playback requires a user gesture (mobile browser constraint)
- Attempt autoplay if allowed, fallback to clear Play button
- No scrubbing required

---

### Screen 4: Soft Landing

**Purpose**  
Avoid abrupt emotional drop-off and signal completion.

**UI**

- Calm background
- Minimal copy

**Copy**

- “Take one more breath”
- Optional: “You’re not alone”

**Actions**

- Button: “Listen to another message”
- Button: “I’m done for now”

**Behavior**

- “Listen to another message” returns to Screen 2
- “I’m done for now” exits flow (returns to home or closes tab)

---

## 5. Content Requirements

### Contributor Guidance

When collecting recordings from friends and family:

- Speak calmly and naturally
- Keep messages short (20–45 seconds)
- No advice, problem-solving, or platitudes
- No pressure to feel better
- Speak as if sitting next to her on a hard day

Example tone:
“I just wanted you to know I’m thinking about you and I love you.”
“You don’t have to figure anything out right now.”

---

### Asset Specifications

- Audio format: mp3 or m4a
- Photos: square crop, optimized for mobile
- All assets bundled with the app build (Option A)

---

## 6. Technical Requirements

### Framework

- Next.js (App Router)
- TypeScript
- React

### Architecture

- Static site generation
- No backend
- No authentication
- No external APIs

### Asset Storage

- Audio and images stored in the repository
- Served from the app at runtime
- Content changes require redeploy

### Hosting

- Vercel static deployment

### Audio Constraints

- Must comply with mobile browser autoplay restrictions
- Clear user-initiated playback controls
- Graceful fallback if autoplay is blocked

---

## 7. Accessibility & UX Requirements

- Large tap targets
- High contrast text
- Minimal required reading
- Works in silent mode until user initiates audio
- Smooth animations (60fps target on mobile)

---

## 8. Edge Cases

- User skips breathing step entirely
- User exits mid-audio playback
- User listens to the same message repeatedly
- Audio fails to load
  - Show loading state and retry option
  - Provide grounding fallback text

All behaviors are valid and should not be restricted.

---

## 9. Success Criteria

Qualitative only.

- She chooses to open the app on hard days
- She reaches a supportive message within two taps
- She reports feeling calmer or less alone afterward
- The app never feels overwhelming, guilt-inducing, or obligatory

---

## 10. Open Questions (Post-v1)

- Should messages be tagged by emotional need
- Does video add value or increase emotional intensity
- Should breathing pace be adjustable

All deferred until after real-world usage.
