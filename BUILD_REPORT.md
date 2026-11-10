# Project A.S.H.A. toolkit rebuild

Completed locally on **7 November 2026** in `C:\project\asha-toolkit`.

## Safe replacement

The working path was resolved and verified before deletion. The rejected source,
assets, configuration, tests and reports were archived to
`.rebuild-backup/rejected-implementation-2026-11-07.zip` (3,581,830 bytes, 116
entries verified). Generated dependencies and build output were excluded from
the backup. Old source, Motion Lab, galleries, registry, styling, public assets,
experiments and build output were then removed. The archive is excluded from
Git and from distribution.

The existing `.git` directory was preserved. This checkout had no commits, so a
recoverable archive was used instead of creating a Git commit. No root `.env`
files were present. The reset preserved any `.env*` files and protected local
instruction/configuration directories by name. No changes were made to
`C:\project\asha-clone`, the original repository, production website, Vercel or
Supabase. Nothing was pushed, merged or deployed.

## Implemented product

All required routes are implemented: `/`, `/school`, `/school/present`,
`/volunteer`, `/volunteer/present` and `/resources`. Each edition also has a
printable/downloadable presenter guide at its `/guide` route.

The School Edition contains 20 authored scenes with the requested concepts,
two myth activities, a controlled fictional chat, job-offer verification,
branching decisions, support networks and a five-question knowledge check.
Every scene has substantive teaching content and presenter guidance.

The Volunteer Edition contains 20 distinct facilitation stages. It adds group
agreements, discussion prompts, a three-setting situation carousel, privacy and
disclosure protocols, verified local-pathway preparation, timing guidance,
collapsible notes, elapsed/session and activity timers, optional aggregate
response counts, reset and summary export/clear controls. Format selection
changes preparation guidance; duration selection scales suggested scene timings.

React, TypeScript, React Router and Vite provide a shared presentation engine.
The required reusable component system is in `src/components.tsx` and
`src/visuals.tsx`. Layouts are authored as reusable compositions rather than
separate duplicated scene files. CSS handles the small amount of motion without
animation-library dependencies. No backend is required.

## Brand and motion

The live website, deployed CSS and original repository styling were read-only
references. Exact approved palette values and font stacks are centralized in
`src/styles.css`; the official logo is bundled. Primary, secondary, ghost and
destructive buttons use one component and consistent dimensions/focus states.
Cards share one system. See `research/BRAND_REFERENCE.md` for the deployed/repo
comparison.

Only purposeful identity, reveal, message, path and network motion is present.
There is no continuous ambient effect, particle background, audio autoplay or
motion gallery. Replay, skip-animation and reduced-motion controls work. CSS
also respects the operating system’s reduced-motion preference. Educational
explanations never depend on waiting for animation completion.

## Offline distribution

`dist/offline-toolkit.html` is a self-contained build with both editions, all
styling, the official logo and all SVG illustrations embedded. It uses hash
routing and works directly from a file URL without installation or a server.
The build is approximately 429 KB before ZIP compression.

`release/ASHA-school-and-volunteer-toolkit.zip` contains that file and plain
opening/preparation instructions. Presenter guides and a host preparation
checklist can be downloaded from inside the app. Source reference pages require
internet; essential educational text and guidance remain available offline.

The web build also precaches all six local application assets. Its service
worker uses a versioned app shell for direct offline routes. Known static cache
matches ignore the preview server’s Origin-varying response header, which was
found and corrected during actual disconnected-browser testing. Resources
shows **Offline ready** only when caching and control are active.

## Actual validation

| Check | Result |
| --- | --- |
| `npm run build` | Passed: TypeScript, standard Vite build, single-file build and offline manifest generation |
| `npm run lint` | Passed with zero errors or warnings |
| `npm run test` | 8 tests passed |
| `npm run test:browser` | 8 browser tests passed in installed Microsoft Edge; final run 34.3 seconds |
| `npm run package` | Passed; ZIP entries verified and packaged HTML is byte-identical to the tested build by SHA-256 |
| Runtime dependency audit | `npm audit --omit=dev --json`: zero reported vulnerabilities |

Browser checks exercised:

- All 40 scenes and required routes, including both complete presenter guides.
- Canvas containment and visible navigation controls at 1280 × 720 projector
  dimensions; no document/canvas overflow.
- All routes and all 40 scene layouts at 390 × 844 mobile dimensions; no
  horizontal document overflow.
- Keyboard progression and boundaries, scene selection, fullscreen entry/exit,
  modal Escape handling and shortcut suppression while a dialog is active.
- Both myth reveals/resets, all four chat messages, scenario feedback, both
  decision paths and all five quiz explanations, including preserved answers.
- Session format/duration setup, notes, session timer start/pause, activity timer,
  anonymous tally increment/reset, carousel selection, summary export and clear.
- Production offline direct navigation, interaction and reload in both editions.
- Single HTML file opened with the browser disconnected; both editions and
  activities worked with **zero HTTP/HTTPS requests**.
- OS reduced motion and the manual setting; actual computed animation disabled.
- Actual shared ink, muted, primary and secondary text colors meet at least
  4.5:1 contrast for their tested backgrounds.
- Expanded scenario/quiz feedback remains within the projector canvas; sampled
  presentation buttons have accessible names.

Representative screenshots of the rendered application are in `evidence/`.
Desktop home, presentation/fullscreen views, conceptual diagrams, the fictional
chat, and mobile layouts were visually inspected. Screenshots are real browser
captures, not mockups. Initial test findings were corrected before the final
passing run. Browser testing used Edge; it does not establish cross-browser or
assistive-technology certification.

Vite reports React Router’s harmless ignored `use client` module directives
during bundling. These do not prevent either build. The full development-tool
audit reports nine moderate findings propagated from a minimatch glob-amplification
advisory through ESLint/TypeScript-ESLint. Those packages are not shipped in the
static application. The audit recommends disruptive toolchain version changes;
they were not applied blindly. Runtime audit is clean.

## Content, privacy and review limits

Educational references link to UNODC, ILO, UNICEF and the UN child-safeguarding
policy. International concepts are distinguished from local legal definitions.
Scenarios are fictional and non-graphic. No statistics, survivor stories,
partnership claims, emergency numbers or organizational affiliations were
invented.

Group-response recording is optional and disabled by default. It stores aggregate
counts in browser-tab session storage. Other saved session state is limited to
activity choices, visited scenes, setup and elapsed time. Reduced-motion
preference is saved locally. There are no fields for participant names, phone
numbers, contacts or identifiable disclosures. Nothing is sent to a backend;
export occurs only on request. This is not a safeguarding record system.

Before external school distribution, Project A.S.H.A. leadership and relevant
school/host safeguarding personnel still need to approve content, age suitability
and local procedures. The School Edition recommends ages 13+ with educator
discretion; no curriculum certification or safeguarding expert approval is claimed.
Local support contacts must be verified and supplied by the host.

Installed fonts vary by device. The exact approved fallback stacks are preserved,
and no network font dependency exists. Private browsing/file URLs may limit state
persistence. Fullscreen and PWA installation support vary by browser. Hosted
offline installation requires HTTPS outside localhost and origin-root hosting
with SPA navigation fallback. Session timings are suggested pacing, not enforced
cutoffs. Screen readers, 200% zoom and browsers beyond Edge have not undergone
formal certification testing.
