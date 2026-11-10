# Project A.S.H.A. Awareness Toolkits

Two complete educational presentations built with React, TypeScript and Vite:

- **School Edition:** 20 teacher-led scenes, approximately 40 minutes plus discussion.
- **Volunteer Edition:** 20 facilitator-led stages with 30, 45 and 60 minute plans.

## Start locally

Use Node.js 22 or newer and npm:

```sh
npm ci
npm run dev
```

The development preview is printed in the terminal. No environment variables,
backend, account, Supabase project or Vercel connection is required.

## Validate and build

```sh
npm run build
npm run lint
npm run test
npm run test:browser
npm run package
```

Browser tests use the installed Microsoft Edge browser. Change `channel` in
`playwright.config.ts` for another supported installed browser. Browser tests
start and stop a production preview at port 4173. Avoid changing the build while
those tests run. Screenshots are saved in `evidence/`.

`npm run package` uses Windows’ bundled archive utility (or `zip` on other
systems). The build creates:

- `dist/`: the static web application, manifest and service worker.
- `dist/offline-toolkit.html`: both editions in a single self-contained file.
- `portable/index.html`: the original single-file build.
- `release/ASHA-school-and-volunteer-toolkit.zip`: shareable HTML and instructions.

Open the packaged HTML directly in a modern browser. Hash navigation allows all
routes to work from a file URL. Every educational asset is embedded. External
reference pages require internet. The hosted app must be served at the origin
root with SPA navigation fallback; use HTTPS outside localhost. Wait for
**Offline ready** on Resources before disconnecting.

## Present

Choose an edition, read its overview and presenter guide, then begin. Use arrow
keys or Previous/Next. F toggles fullscreen, R replays the scene visual and N
toggles volunteer tools. Home/End jump to the first/last scene. These shortcuts
pause while dialogs or interactive controls have focus. All controls support
Tab and Enter. Notes are visible on the current screen: collapse them before
projecting.

Quizzes and activities can be reset from presenter tools. Volunteer group
tallies are optional and disabled by default. The app stores only aggregate
counts, activity answers, presentation progress and elapsed time in browser-tab
session storage. Reduced-motion preference uses local storage. No participant
names, contacts or disclosure fields exist. No analytics or network submission
is included. A summary is exported only on request.

## Content and design

`src/content.ts` contains all 40 scenes, notes, timings, questions and sources.
`src/SceneView.tsx` selects reusable educational compositions.
`src/Presentation.tsx` owns navigation and facilitator state.
`src/components.tsx` and `src/visuals.tsx` contain shared controls and SVGs.
All visual tokens live in `src/styles.css`.

The original public A.S.H.A. logo is bundled locally. The reference website and
repository were inspected read-only. The deployed palette, typography and soft,
rounded visual language govern this implementation. See
`research/BRAND_REFERENCE.md` for the comparison.

## Before external distribution

Project A.S.H.A. leadership and the host’s safeguarding personnel should review
content, audience suitability and local procedures. School content recommends
ages 13+ with educator discretion; this is not a certified curriculum. Verify
the host safeguarding lead and appropriate local support before every session.
Do not invite public disclosures, promise secrecy, investigate independently
or enter identifying safeguarding records in this toolkit.

See `BUILD_REPORT.md` for actual verification results and remaining limitations.
