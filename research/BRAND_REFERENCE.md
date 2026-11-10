# Read-only brand review — 7 November 2026

Reviewed the deployed [Project A.S.H.A. website](https://www.project-asha.com/)
and the public [source repository](https://github.com/Moksh-dev/project-asha).
No source repository or production configuration was modified.

Read through GitHub’s contents API:

- `app/globals.css`
- `components/ui/Button.tsx`
- `components/ui/Card.tsx`
- `components/layout/navbar/Logo.tsx`

The global CSS is recorded in `reference-global-css.txt` strictly as a research
reference. It is not imported or bundled. All toolkit UI and educational
illustrations were newly authored.

The deployed global stylesheet confirmed the exact approved color values and
the Inter/Poppins/Segoe UI body stack, Impact/Haettenschweiler condensed display
stack, and Segoe Script/Segoe Print handwritten stack. The repository uses older
semantic names such as `--asha-green` for the blue value `#1f5eff`; the toolkit
uses the requested, descriptive token names. Values remain exact.

Repository Button/Card/Logo files contain older blue gradients, dark secondary
buttons and different logo text. Those component details are inconsistent with
the deployed header. A browser screenshot of the deployed home confirmed the
condensed uppercase display headings, generous pale-blue space, a pill-shaped
white header, rounded blue controls and compact A.S.H.A. wordmark. These observed
traits and the user’s explicit button specifications take precedence.

The official `public/project-asha-logo.png` is bundled in `src/assets/asha-logo.png`.
The live site’s image markup points to that same asset. The image was inspected
and is the blue two-person A.S.H.A. symbol. Original book and conversation SVGs
illustrate the two toolkit cards; connected diagrams explain educational ideas.

No externally loaded fonts are required. Installed system families follow the
exact approved fallback order. Typography retains condensed, uppercase display
behavior and readable sans-serif functional text.
