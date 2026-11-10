import {
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import logo from "./assets/asha-logo.png";
import type { Choice, Question, Scene, Tally } from "./types";

export type IconName =
  | "arrow"
  | "back"
  | "book"
  | "people"
  | "clock"
  | "expand"
  | "collapse"
  | "replay"
  | "settings"
  | "close"
  | "check"
  | "download"
  | "shield"
  | "notes"
  | "pause"
  | "play"
  | "list"
  | "help"
  | "external"
  | "eye";
const paths: Record<IconName, ReactNode> = {
  arrow: (
    <>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </>
  ),
  back: <path d="M19 12H5m6-6-6 6 6 6" />,
  book: (
    <>
      <path d="M12 6v14M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2Z" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 20v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5v1" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  expand: <path d="M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5" />,
  collapse: <path d="M3 8h5V3m8 0v5h5M8 21v-5H3m18 0h-5v5" />,
  replay: (
    <>
      <path d="M4 9a8 8 0 1 1 1 9M4 3v6h6" />
    </>
  ),
  settings: (
    <>
      <path d="M3 7h18M3 17h18" />
      <circle cx="8" cy="7" r="3" />
      <circle cx="16" cy="17" r="3" />
    </>
  ),
  close: <path d="m6 6 12 12M6 18 18 6" />,
  check: <path d="m5 12 4 4L19 6" />,
  download: <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />,
  shield: (
    <>
      <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  notes: (
    <>
      <path d="M5 3h14v18H5zM8 7h8M8 11h8M8 15h5" />
    </>
  ),
  pause: <path d="M8 5v14M16 5v14" />,
  play: <path d="m7 4 13 8-13 8Z" />,
  list: <path d="M9 6h12M9 12h12M9 18h12M3 6h1M3 12h1M3 18h1" />,
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9a3 3 0 1 1 4 3c-1 0-1 1-1 2m0 3h.01" />
    </>
  ),
  external: <path d="M14 3h7v7m0-7L10 14M10 3H3v18h18v-7" />,
  eye: (
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
};
export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  to?: string;
  href?: string;
  download?: string;
  icon?: IconName;
}
export function AshaButton({
  variant = "primary",
  to,
  href,
  download,
  children,
  className = "",
  icon,
  ...props
}: ButtonProps) {
  const classes = `asha-button button-${variant} ${className}`;
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} />}
    </>
  );
  if (to)
    return (
      <Link to={to} className={classes} aria-label={props["aria-label"]}>
        {content}
      </Link>
    );
  if (href)
    return (
      <a
        href={href}
        download={download}
        className={classes}
        aria-label={props["aria-label"]}
      >
        {content}
      </a>
    );
  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}
export function AshaLogo({ large = false }: { large?: boolean }) {
  return (
    <span className={`asha-logo ${large ? "logo-large" : ""}`}>
      <img src={logo} alt="" />
      <span>
        <strong>A.S.H.A.</strong>
        <small>PROJECT</small>
      </span>
    </span>
  );
}
export function AshaCard({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`asha-card ${className}`} {...props}>
      {children}
    </div>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {description && <p className="lede">{description}</p>}
    </div>
  );
}

export function Modal({
  title,
  children,
  onClose,
  className = "",
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-labelledby={id}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const bounds = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < bounds.left ||
            e.clientX > bounds.right ||
            e.clientY < bounds.top ||
            e.clientY > bounds.bottom
          )
            onClose();
        }
      }}
    >
      <div className="modal-heading">
        <h2 id={id}>{title}</h2>
        <AshaButton
          variant="ghost"
          onClick={onClose}
          aria-label="Close dialog"
          className="icon-button"
        >
          <Icon name="close" />
        </AshaButton>
      </div>
      {children}
    </dialog>
  );
}
export function AshaHeader() {
  const [about, setAbout] = useState(false);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <Link to="/" aria-label="Project A.S.H.A. toolkit home">
          <AshaLogo />
        </Link>
        <nav aria-label="Main navigation">
          <AshaButton variant="ghost" onClick={() => setAbout(true)}>
            About this toolkit
          </AshaButton>
          <Link className="header-resource" to="/resources">
            Resources <Icon name="external" size={15} />
          </Link>
        </nav>
      </header>
      {about && (
        <Modal title="Awareness, with care." onClose={() => setAbout(false)}>
          <p>
            Two educational experiences from Project A.S.H.A.’s awareness
            mission: an independently presentable School Edition and a
            facilitator-led Volunteer Edition.
          </p>
          <p>
            Both use fictional scenarios, non-graphic explanations and optional
            participation. You can pause, pass or seek private support at any
            time.
          </p>
          <div className="callout">
            <strong>Prepared for review</strong>
            <p>
              Project A.S.H.A. leadership and the host’s safeguarding personnel
              should review the content, age suitability and local support
              pathway before external use.
            </p>
          </div>
          <p className="small">
            No accounts, tracking or backend. Optional aggregate session counts
            stay in this browser tab unless exported.
          </p>
          <AshaButton to="/resources" variant="secondary">
            Read guidance <Icon name="arrow" />
          </AshaButton>
        </Modal>
      )}
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <p>Awareness. Safety. Hope. Action.</p>
      <div>
        <span>Project A.S.H.A. · Educational resources</span>
        <Link to="/resources">
          Sources & safeguarding <Icon name="arrow" size={15} />
        </Link>
      </div>
    </footer>
  );
}
export function AccessibleTooltip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <span className="tooltip-wrap" aria-describedby={id}>
      {children}
      <span className="tooltip" id={id} role="tooltip">
        {label}
      </span>
    </span>
  );
}

export function PresentationCanvas({
  children,
  reduced,
  replay,
  title,
}: {
  children: ReactNode;
  reduced: boolean;
  replay: number;
  title: string;
}) {
  return (
    <article
      className={`presentation-canvas ${reduced ? "reduced" : ""}`}
      aria-label={title}
    >
      <div className="scene-stage" key={replay}>
        {children}
      </div>
    </article>
  );
}
export function SlideProgress({
  current,
  total,
  title,
}: {
  current: number;
  total: number;
  title: string;
}) {
  return (
    <div className="slide-progress">
      <span className="progress-numbers">
        <strong>{String(current).padStart(2, "0")}</strong>
        <span>/ {total}</span>
      </span>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="Presentation progress"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
      >
        <span style={{ width: `${(current / total) * 100}%` }} />
      </div>
      <span className="progress-title">{title}</span>
    </div>
  );
}
export function PresentationControls({
  current,
  total,
  title,
  previous,
  next,
  openContents,
  finish,
}: {
  current: number;
  total: number;
  title: string;
  previous: () => void;
  next: () => void;
  openContents: () => void;
  finish: () => void;
}) {
  return (
    <footer className="presentation-controls">
      <AshaButton
        variant="ghost"
        onClick={openContents}
        className="icon-button"
        aria-label="Choose a scene"
      >
        <Icon name="list" />
      </AshaButton>
      <SlideProgress current={current} total={total} title={title} />
      <div className="step-buttons">
        <AshaButton
          variant="secondary"
          onClick={previous}
          disabled={current === 1}
          aria-label="Previous scene"
          className="previous-button"
        >
          <Icon name="back" />
          <span>Previous</span>
        </AshaButton>
        <AshaButton
          onClick={current === total ? finish : next}
          aria-label={current === total ? "Finish presentation" : "Next scene"}
        >
          {current === total ? "Finish" : "Next"}
          <Icon name="arrow" />
        </AshaButton>
      </div>
    </footer>
  );
}
export function PresenterNotes({
  scene,
  timing,
}: {
  scene: Scene;
  timing: number;
}) {
  return (
    <section className="presenter-notes">
      <p className="eyebrow">PRESENTER NOTES · ~{timing} MIN</p>
      <h3>{scene.title}</h3>
      <ul>
        {scene.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  );
}

export function MythRealityCard({
  statement,
  explanation,
  reality,
  revealed,
  onReveal,
}: {
  statement: string;
  explanation: string;
  reality: boolean;
  revealed: boolean;
  onReveal: () => void;
}) {
  return (
    <div className="myth-area">
      <button
        className={`myth-card ${revealed ? "is-revealed" : ""}`}
        onClick={onReveal}
        aria-expanded={revealed}
      >
        <span className="myth-inner">
          <span className="myth-prompt">
            {revealed ? (reality ? "REALITY" : "MYTH") : "WHAT DO YOU THINK?"}
          </span>
          <span className="myth-statement">{statement}</span>
          <span className="myth-action">
            {revealed ? "Reset the card" : "Reveal the answer"}{" "}
            <Icon name={revealed ? "replay" : "arrow"} />
          </span>
        </span>
      </button>
      <div className="myth-feedback" aria-live="polite">
        {revealed ? (
          <p>{explanation}</p>
        ) : (
          <p>Take a moment. Discuss it together. Passing is welcome.</p>
        )}
      </div>
    </div>
  );
}
export function ScenarioChoice({
  choices,
  selected,
  onSelect,
}: {
  choices: Choice[];
  selected?: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="scenario-options">
      <div className="choice-list" role="group" aria-label="Scenario choices">
        {choices.map((choice, i) => (
          <button
            key={choice.text}
            className={`choice ${selected === i ? "selected" : ""}`}
            onClick={() => onSelect(i)}
            aria-pressed={selected === i}
          >
            <span className="choice-letter">{String.fromCharCode(65 + i)}</span>
            <span>{choice.text}</span>
            <Icon name={selected === i ? "check" : "arrow"} />
          </button>
        ))}
      </div>
      <div aria-live="polite">
        {selected !== undefined && (
          <div className="choice-feedback">
            <strong>
              {choices[selected].preferred
                ? "A safer next step"
                : "There is still a way to seek support"}
            </strong>
            <p>{choices[selected].feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export function QuizQuestion({
  question,
  number,
  selected,
  onSelect,
}: {
  question: Question;
  number: number;
  selected?: number;
  onSelect: (choice: number) => void;
}) {
  return (
    <section className="quiz-question">
      <p className="eyebrow">QUESTION {number} OF 5</p>
      <h3>{question.prompt}</h3>
      <div
        className="quiz-options"
        role="group"
        aria-label={`Question ${number} answers`}
      >
        {question.options.map((option, i) => (
          <button
            key={option}
            className={`choice ${selected === i ? "selected" : ""}`}
            onClick={() => onSelect(i)}
            aria-pressed={selected === i}
          >
            <span className="choice-letter">{String.fromCharCode(65 + i)}</span>
            <span>{option}</span>
            {selected === i && <Icon name="check" />}
          </button>
        ))}
      </div>
      {selected !== undefined && (
        <div className="choice-feedback" aria-live="polite">
          <strong>
            {selected === question.correct
              ? "That’s the key idea."
              : "Let’s revisit this together."}
          </strong>
          <p>{question.explanation}</p>
        </div>
      )}
    </section>
  );
}

export function ResourceCard({
  org,
  title,
  description,
  url,
}: {
  org: string;
  title: string;
  description: string;
  url: string;
}) {
  return (
    <AshaCard className="resource-card">
      <p className="eyebrow">{org}</p>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={url} target="_blank" rel="noreferrer" className="text-link">
        Read the source <Icon name="external" size={16} />
      </a>
    </AshaCard>
  );
}
export function formatTime(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}
export function SessionTimer({
  seconds,
  running,
  target,
  onToggle,
  onReset,
}: {
  seconds: number;
  running: boolean;
  target: number;
  onToggle: () => void;
  onReset: () => void;
}) {
  return (
    <section className="timer-section">
      <div>
        <p className="eyebrow">SESSION TIMER</p>
        <output className="timer-value" aria-label="Session elapsed time">
          {formatTime(seconds)}
        </output>
        <span className="small"> / {target} min plan</span>
      </div>
      <div className="button-row">
        <AshaButton
          variant="secondary"
          onClick={onToggle}
          icon={running ? "pause" : "play"}
        >
          {running ? "Pause timer" : "Start timer"}
        </AshaButton>
        <AshaButton
          variant="ghost"
          onClick={onReset}
          aria-label="Reset session timer"
          className="icon-button"
        >
          <Icon name="replay" />
        </AshaButton>
      </div>
    </section>
  );
}

export function downloadText(
  filename: string,
  text: string,
  type = "text/plain",
) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function SessionSummary({
  tally,
  scenes,
  seconds,
  visited,
  onDelete,
}: {
  tally: Tally;
  scenes: Scene[];
  seconds: number;
  visited: number[];
  onDelete: () => void;
}) {
  const rows = Object.entries(tally).filter(([, counts]) =>
    counts.some(Boolean),
  );
  const exportSummary = () =>
    downloadText(
      "asha-anonymous-session-summary.json",
      JSON.stringify(
        {
          edition: "volunteer",
          elapsedSeconds: seconds,
          scenesVisited: visited.length,
          totals: rows.map(([id, counts]) => ({
            scene: scenes.find((s) => s.id === id)?.title,
            options:
              scenes.find((s) => s.id === id)?.kind === "myth"
                ? ["Myth", "Reality"]
                : scenes.find((s) => s.id === id)?.choices?.map((c) => c.text),
            counts,
          })),
          note: "Anonymous aggregate counts only. Not a safeguarding record or a measure of audience safety.",
        },
        null,
        2,
      ),
      "application/json",
    );
  return (
    <div className="session-summary">
      <p>
        Only activity totals are recorded. No names, contact details or personal
        experiences are collected.
      </p>
      <div className="summary-facts">
        <span>
          <strong>{visited.length} / 20</strong> scenes visited
        </span>
        <span>
          <strong>{formatTime(seconds)}</strong> elapsed
        </span>
      </div>
      {rows.length ? (
        <div className="summary-rows">
          {rows.map(([id, counts]) => {
            const scene = scenes.find((s) => s.id === id);
            return (
              <div key={id}>
                <strong>{scene?.title}</strong>
                <p>
                  {counts
                    .map(
                      (n, i) =>
                        `${scene?.kind === "myth" ? ["Myth", "Reality"][i] : `Choice ${String.fromCharCode(65 + i)}`}: ${n}`,
                    )
                    .join(" · ")}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="callout">
          No group-response totals recorded. You can enable them in facilitator
          tools.
        </div>
      )}
      <p className="small">
        Stored in this browser tab’s session storage when available. Closing the
        tab ends the session. Export only if useful and follow your host’s
        retention policy.
      </p>
      <div className="button-row">
        <AshaButton onClick={exportSummary} icon="download">
          Export summary
        </AshaButton>
        <AshaButton variant="destructive" onClick={onDelete}>
          Clear session data
        </AshaButton>
      </div>
    </div>
  );
}
