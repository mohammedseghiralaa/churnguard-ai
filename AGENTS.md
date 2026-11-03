# Working rules for this project

## Project

ChurnGuard: frontend only (Next.js App Router + TypeScript + Tailwind).
No backend, model, or database code. Full spec: docs/SPEC.md. Design files: /design.

## How we work

- Work in very small steps. One step = one small, reviewable task
  (for example: "install and configure Tailwind", then "build the Navbar", then "build one form field component").
- Never do more than one step per message, even if the spec lists several.
- Before each step, tell me in 3-5 lines what you are about to do and which files you will create or change.
- After each step, STOP. Tell me what changed, how to check it (command or URL), and wait for my "ok" or my corrections.
- Do not start the next step until I say "next".

## Ask, don't assume

- If anything in the spec, the design, or my message is unclear, ambiguous, or has two possible readings, ASK me before writing code.
- Ask at most 3 short questions at a time. Propose a default answer for each, so I can just reply "yes".
- If the spec and the Stitch design disagree, tell me and ask which one to follow. The spec wins unless I say otherwise.
- Never invent text, numbers, or claims in the UI. If you need wording, ask me.

## Code rules

- Read /design/executive_predictive_suite/DESIGN.md and the screen.png files before any UI work.
- Build clean reusable components. Never paste the raw Stitch HTML.
- Keep files small. One component per file.

## Behavior rules

- Use texts only from docs/COPY.md, never invent text.
- Round both percentages first, then compute the difference.
- Pre-fill the simulator with the customer's current values.
- MonthlyCharges and TotalCharges accept 0.
- Hide the tech support toggle when InternetService = No.
