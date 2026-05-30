---
name: warm-comedy-quiz
description: >
  Build a personalized, humor-driven micro-learning quiz app (Duolingo-style)
  that doubles as an emotional gift for a specific person. Use when someone
  asks for a small learning/quiz app about a real person or family, a
  "joke app" for someone they love, a deadpan-but-heartfelt quiz, or
  "make X a fun app to study Y". Dependency-free static site (HTML/CSS/
  vanilla JS), deployable on Vercel/GitHub Pages. Encodes the recipe:
  straight-faced lessons + silly wrong answers + a recurring named cast +
  an escalating gag that lands on a tear-jerker interactive finale.
---

# Warm Comedy Quiz — あたたかいコメディ学習アプリの作り方

A repeatable recipe for a tiny learning app that is **funny on the surface
and moving underneath**. The learner is usually a real person; the content
is an inside-joke love letter to them and the people around them.

The magic is a contrast: it *looks* like an ordinary study app, but every
question is secretly about the learner's own life, and the whole thing
builds to a finale that turns the running joke into something they feel.

## When to use this

- "Make my mom/partner/friend a little app to study <subject>."
- "A joke quiz about our family / our office / our band."
- Any request for a personal, humorous micro-app where *who it's for*
  matters more than the subject being taught.

If the request is a serious/general learning tool with no specific person,
this skill is overkill — build a plain quiz instead.

## Step 0 — Interview for the cast (do this first)

The app is only as good as the character bible. Before writing code, gather:

- **The learner** (the person playing). They are the protagonist and may be
  referred to in 1st *or* 3rd person.
- **3–6 recurring characters** (family/friends/colleagues) with **real,
  specific, slightly absurd details**: jobs, habits, quirks, running jokes,
  one embarrassing-but-fond fact each. Specifics are what make it land —
  "uses a CPAP mask", "works at the McDonald's in Shinjuku", "secretly eats
  chocolate puffs" beat generic traits every time.
- **One emotional truth** to end on (e.g. "she holds the family together",
  "he loves her despite everything"). Everything builds toward this.

Write all of this into a **character bible** comment block at the top of the
data file, plus the project `CLAUDE.md`, so future edits stay consistent.

## The humor formula (strict rules)

1. **Deadpan packaging.** Unit and lesson titles look like a real textbook
   ("自己紹介 / Introductions", "家族の紹介 / Family", "健康について /
   Health"). The joke is the gap between the serious title and the silly
   content.
2. **Almost every question names a cast member** by name.
3. **The correct answer is real & grammatically correct.** Teach for real.
4. **The jokes live in the wrong answers** — and they stand on their own.
   No explanatory annotations next to choices; let the absurd option be
   delivered straight-faced.
5. **Naming convention.** Pick fixed names per role and never deviate
   (e.g. adult-woman = one name, boy = another). Document it.
6. **Recurring callbacks.** Reuse the same props (the CPAP mask, the
   secret-veggie hamburgers) across lessons so they become in-jokes.
7. Keep the learner lovable. Tease, never mock.

## The emotional arc (this is what makes it more than a gag)

Structure lessons as an escalation, not a flat list:

1. **Intro/About-the-learner** → warm, establishes the voice.
2. **Each character gets a lesson** → builds the cast and the running gags.
3. **A "meta" lesson** where the joke compounds (e.g. *every* answer,
   regardless of the question, turns out to be the emotional truth — "no
   matter what the question is, the answer is the person she loves").
4. **Final boss** — a goofy set-piece (a dragon fight, a game-show, etc.)
   that weaponizes *every* established gag, then quietly turns heartfelt in
   its last beats.
5. **Interactive finale** (the payoff): fade from the credits back into the
   quiz UI for **one last question with a single answer** that the learner
   chooses themselves ("What does she treasure most?" → "Family"). Choosing
   it completes the sentence on screen and dissolves into the closing
   message. *Letting them pick the answer is what makes it land.*

## The tech recipe (dependency-free, no build)

```
index.html   screen scaffold + status bar
styles.css   Duolingo-ish flat green styling
data.js      UNIT + LESSONS data — THIS is where 95% of editing happens
app.js       screen flow, scoring, state, credits
assets/      images (commission separately; provide an emoji fallback)
CLAUDE.md    character bible + the rules above, so edits stay consistent
```

Question types (keep it to two):
- `choice` — 4 options, **shuffle their display order** so the answer
  isn't always first; store the original index for grading. Best for
  proper-noun-heavy or apostrophe sentences.
- `arrange` — tap word tiles to build a sentence; include 1–2 distractor
  tiles. Keep all tiles unique (no duplicate words).

Engagement systems, all persisted to `localStorage` under one key:
- Hearts/lives ❤️ (lose one per wrong answer; refill modal at zero)
- XP ⚡ and a day-based streak 🔥
- A skill "path" home screen with locked/current/done nodes
- **Mid-lesson resume**: persist `{lessonId, index, mistakes}`; restore on
  return; mark the in-progress node. Add only an *extra* field so existing
  saves stay compatible; clamp corrupt indexes.

Polish that pays off:
- **Image fallback**: a global `error` listener swaps any failed `<img>`
  for an emoji, so the app works before art arrives and never shows broken
  icons.
- **Cinematic end-credits** on final clear: fullscreen black theater,
  vignette, slow scrolling staff-roll with joke credits (cast, "costume:
  jeans", "catering: secret vegetables"), a **memory montage** of curated
  best lines drifting in the background (hand-pick the most evocative ones,
  filter to what's unlocked, shuffle, and space them across vertical bands
  so they never overlap), and a **synthesized solemn pad chord progression
  via the Web Audio API** (no audio file, royalty-free, loop it to cover
  the full roll, start on a click to satisfy autoplay rules).
- Make the credits **replayable** from home after the first clear (hidden
  before then, to avoid spoiling the surprise).

## Authoring workflow & validation

- Treat a shorthand like "add material/ネタ追加で" as: append questions to
  `data.js` following the rules, validate, commit, push.
- After each edit, validate before pushing. A node check that loads the
  data and asserts structure catches the common mistakes:
  ```bash
  node --check data.js && node --check app.js
  ```
  Then verify: every `choice` has exactly 4 unique options, no
  parenthetical annotations remain inside options, `arrange` tiles are
  unique, and only the approved names appear. Encode the result in an exit
  code so a flaky terminal can't hide a failure.
- **Verify the UI for real** (don't just unit-check): serve the static
  files and drive a headless browser (Playwright) to the changed surface —
  especially the credits/finale, which only appear after clearing the
  boss. Reach them fast by writing all lessons `completed` into
  `localStorage`, or by exposing a replay button. Screenshot it.

## Deployment

Static site → import the GitHub repo on Vercel (Framework Preset: Other,
no build command, output `.`), or GitHub Pages via Actions. Commit & push
to the working branch; the platform auto-deploys.

## Pitfalls learned the hard way

- Commissioned art can arrive as a pile of duplicate/garbled files —
  dedupe by content hash down to the canonical set; verify each image's
  real dimensions before trusting it.
- The player *is* the protagonist, so don't sign messages "from <them>" —
  speak *to* them (2nd person) or narrate neutrally.
- "End on laughter" and "make me cry" aren't opposites: the line *"let's
  always be a family that laughs"* is funniest and most moving precisely
  because the whole app earned it. Let the theme become the tear-jerker.
- Don't telegraph surprises: the button before the credits should just say
  "つづける / Continue", not "Watch the credits".
