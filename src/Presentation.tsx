import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  AccessibleTooltip,
  AshaButton,
  AshaLogo,
  Icon,
  Modal,
  PresentationCanvas,
  PresentationControls,
  PresenterNotes,
  SessionSummary,
  SessionTimer,
  formatTime,
} from "./components";
import { SceneView } from "./SceneView";
import { references, schoolScenes, volunteerScenes } from "./content";
import {
  adjustTally,
  clampScene,
  loadActivities,
  loadConfig,
  loadTallies,
  readSession,
  writeSession,
} from "./storage";
import type { ActivityState, Edition, Tally } from "./types";

export function Presentation({
  edition,
  reduced,
  setReduced,
}: {
  edition: Edition;
  reduced: boolean;
  setReduced: (v: boolean) => void;
}) {
  const volunteer = edition === "volunteer";
  const scenes = volunteer ? volunteerScenes : schoolScenes;
  const [search, setSearch] = useSearchParams();
  const current = clampScene(search.get("scene"));
  const scene = scenes[current - 1];
  const navigate = useNavigate();
  const [activities, setActivities] = useState(() =>
    loadActivities(`${edition}.activities`),
  );
  const [config, setConfig] = useState(loadConfig);
  const [tallies, setTallies] = useState<Tally>(loadTallies);
  const [visited, setVisited] = useState<number[]>(() => {
    const value = readSession<number[]>(`${edition}.visited`, []);
    return Array.isArray(value)
      ? value.filter((n) => Number.isInteger(n) && n >= 1 && n <= 20)
      : [];
  });
  const [seconds, setSeconds] = useState(() => {
    const n = Number(readSession(`${edition}.elapsed`, 0));
    return Number.isFinite(n) && n >= 0 ? Math.min(n, 86400) : 0;
  });
  const [running, setRunning] = useState(false);
  const [activityEnd, setActivityEnd] = useState<number | null>(null);
  const [activityRemaining, setActivityRemaining] = useState(0);
  const [tools, setTools] = useState(false);
  const [contents, setContents] = useState(false);
  const [settings, setSettings] = useState(false);
  const [summary, setSummary] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [replay, setReplay] = useState(0);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [full, setFull] = useState(!!document.fullscreenElement);
  const [notice, setNotice] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const state = activities[scene.id] ?? {};
  const source = references.find((r) => r.id === scene.source);
  const totalMinutes = scenes.reduce((n, s) => n + s.minutes, 0);
  const suggestedMinutes = volunteer
    ? Math.max(1, Math.round((scene.minutes * config.duration) / totalMinutes))
    : scene.minutes;
  const activityChoices =
    scene.kind === "myth"
      ? ["Myth", "Reality"]
      : (scene.choices?.map((c) => c.text) ?? []);

  useEffect(() => {
    setVisited((v) => (v.includes(current) ? v : [...v, current]));
    document.getElementById("scene-title")?.focus({ preventScroll: true });
  }, [current]);
  useEffect(() => {
    writeSession(`${edition}.activities`, activities);
  }, [activities, edition]);
  useEffect(() => {
    writeSession("tallies", tallies);
  }, [tallies]);
  useEffect(() => {
    writeSession("config", config);
  }, [config]);
  useEffect(() => {
    writeSession(`${edition}.visited`, visited);
  }, [visited, edition]);
  useEffect(() => {
    writeSession(`${edition}.elapsed`, seconds);
  }, [seconds, edition]);
  useEffect(() => {
    if (!running) return;
    const started = Date.now();
    const initial = seconds;
    const interval = setInterval(
      () => setSeconds(initial + Math.floor((Date.now() - started) / 1000)),
      250,
    );
    return () =>
      clearInterval(
        interval,
      ); /* A single wall-clock anchor prevents drift while the tab is inactive. */
  }, [running]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!activityEnd) return;
    const tick = () => {
      const remaining = Math.max(
        0,
        Math.ceil((activityEnd - Date.now()) / 1000),
      );
      setActivityRemaining(remaining);
      if (!remaining) setActivityEnd(null);
    };
    tick();
    const interval = setInterval(tick, 500);
    return () => clearInterval(interval);
  }, [activityEnd]);
  useEffect(() => {
    const changed = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", changed);
    return () => document.removeEventListener("fullscreenchange", changed);
  }, []);
  const go = useCallback(
    (n: number) => {
      setSearch({ scene: String(Math.min(20, Math.max(1, n))) });
      setQuizIndex(0);
      setSkipAnimation(false);
      setNotice("");
    },
    [setSearch],
  );
  const fullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (root.current?.requestFullscreen)
        await root.current.requestFullscreen();
      else
        setNotice(
          "Fullscreen is unavailable in this browser. Use your browser’s fullscreen or presentation mode.",
        );
    } catch {
      setNotice(
        "Fullscreen was unavailable. Use your browser’s fullscreen or presentation mode.",
      );
    }
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.ctrlKey ||
        e.altKey ||
        e.metaKey ||
        document.querySelector("dialog[open]") ||
        (e.target as HTMLElement).closest(
          'input,select,textarea,button,a,[contenteditable="true"]',
        )
      )
        return;
      if (
        [
          "ArrowRight",
          "PageDown",
          " ",
          "ArrowLeft",
          "PageUp",
          "Home",
          "End",
          "f",
          "r",
          "n",
        ].includes(e.key)
      )
        e.preventDefault();
      if (["ArrowRight", "PageDown", " "].includes(e.key)) go(current + 1);
      if (["ArrowLeft", "PageUp"].includes(e.key)) go(current - 1);
      if (e.key === "Home") go(1);
      if (e.key === "End") go(20);
      if (e.key === "f") void fullscreen();
      if (e.key === "r") {
        setSkipAnimation(false);
        setReplay((v) => v + 1);
      }
      if (e.key === "n" && volunteer) setTools((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go, fullscreen, volunteer]);
  const update = (patch: Partial<ActivityState>) =>
    setActivities((v) => ({ ...v, [scene.id]: { ...v[scene.id], ...patch } }));
  const resetActivity = () => {
    setActivities((v) => ({ ...v, [scene.id]: {} }));
    setTallies((v) => {
      const next = { ...v };
      delete next[scene.id];
      return next;
    });
    setQuizIndex(0);
    setActivityEnd(null);
    setActivityRemaining(0);
    setSkipAnimation(false);
    setReplay((v) => v + 1);
    setNotice("Current activity reset.");
  };
  const clearSession = () => {
    setActivities({});
    setTallies({});
    setVisited([current]);
    setRunning(false);
    setSeconds(0);
    setActivityEnd(null);
    setActivityRemaining(0);
    setQuizIndex(0);
    setConfirmClear(false);
    setSummary(false);
    setNotice("Local activity data and session totals cleared.");
  };

  return (
    <div
      className={`presentation-shell ${tools ? "with-tools" : ""} ${reduced ? "reduced" : ""}`}
      ref={root}
    >
      <a href="#scene-title" className="skip-link">
        Skip to scene
      </a>
      <header className="presentation-header">
        <Link to={`/${edition}`} className="overview-link">
          <Icon name="back" size={18} />
          <span>Overview</span>
        </Link>
        <Link
          to="/"
          className="presentation-brand"
          aria-label="A.S.H.A. toolkit home"
        >
          <AshaLogo />
        </Link>
        <div className="presentation-edition">
          <span className="edition-dot" />
          {volunteer ? "VOLUNTEER EDITION" : "SCHOOL EDITION"}
        </div>
        <div className="presentation-toolbar">
          <AccessibleTooltip label="Replay scene animation · R">
            <AshaButton
              variant="ghost"
              className="icon-button"
              aria-label="Replay current animation"
              onClick={() => {
                setSkipAnimation(false);
                setReplay((v) => v + 1);
                setNotice("Scene animation replayed.");
              }}
            >
              <Icon name="replay" />
            </AshaButton>
          </AccessibleTooltip>
          <AccessibleTooltip label="Accessibility & keyboard help">
            <AshaButton
              variant="ghost"
              className="icon-button"
              aria-label="Accessibility and presentation settings"
              onClick={() => setSettings(true)}
            >
              <Icon name="settings" />
            </AshaButton>
          </AccessibleTooltip>
          <AccessibleTooltip label="Fullscreen · F">
            <AshaButton
              variant="ghost"
              className="icon-button"
              aria-label={full ? "Exit fullscreen" : "Enter fullscreen"}
              onClick={() => void fullscreen()}
            >
              <Icon name={full ? "collapse" : "expand"} />
            </AshaButton>
          </AccessibleTooltip>
          <AshaButton
            variant={tools ? "primary" : "secondary"}
            className="tools-toggle"
            onClick={() => setTools((v) => !v)}
            aria-expanded={tools}
            aria-controls="presenter-tools"
          >
            <Icon name="notes" />
            <span>{volunteer ? "Facilitator tools" : "Presenter notes"}</span>
          </AshaButton>
        </div>
      </header>
      <main className="presentation-main" id="main">
        <div className="canvas-region">
          <div className="canvas-meta">
            <span>
              PROJECT A.S.H.A. /{" "}
              {volunteer ? "FACILITATED WORKSHOP" : "CLASSROOM PRESENTATION"}
            </span>
            <span>{String(current).padStart(2, "0")} / 20</span>
          </div>
          <PresentationCanvas
            reduced={reduced || skipAnimation}
            replay={replay}
            title={`Scene ${current}: ${scene.title}`}
          >
            <SceneView
              scene={scene}
              state={state}
              update={update}
              quizIndex={quizIndex}
              setQuizIndex={setQuizIndex}
            />
          </PresentationCanvas>
          <div className="canvas-caption">
            <span>
              <Icon name="shield" size={14} /> Learn at your pace. Passing is
              always welcome.
            </span>
            {source ? (
              <Link to="/resources">
                Source: {source.org.split(" · ")[0]}{" "}
                <Icon name="external" size={12} />
              </Link>
            ) : (
              <span>Fictional examples · Support without blame</span>
            )}
          </div>
        </div>
        {tools && (
          <aside id="presenter-tools" className="presenter-tools">
            <div className="tools-heading">
              <h2>{volunteer ? "Facilitator tools" : "Presenter notes"}</h2>
              <AshaButton
                variant="ghost"
                className="icon-button"
                aria-label="Hide presenter tools"
                onClick={() => setTools(false)}
              >
                <Icon name="close" />
              </AshaButton>
            </div>
            <p className="projection-hint">
              <Icon name="eye" size={16} /> Visible on this screen. Collapse
              before projecting.
            </p>
            <PresenterNotes scene={scene} timing={suggestedMinutes} />
            {volunteer && (
              <>
                <SessionTimer
                  seconds={seconds}
                  running={running}
                  target={config.duration}
                  onToggle={() => setRunning((v) => !v)}
                  onReset={() => {
                    setRunning(false);
                    setSeconds(0);
                  }}
                />
                <section className="activity-timer">
                  <p className="eyebrow">ACTIVITY PACING</p>
                  <p>
                    {activityEnd
                      ? `Time remaining: ${formatTime(activityRemaining)}`
                      : activityRemaining === 0 && activityEnd === null
                        ? `Suggested discussion: ~${suggestedMinutes} min`
                        : "Activity paused"}
                  </p>
                  <div className="button-row">
                    <AshaButton
                      variant="secondary"
                      onClick={() => {
                        if (activityEnd) {
                          setActivityEnd(null);
                          setActivityRemaining(0);
                        } else {
                          setActivityRemaining(suggestedMinutes * 60);
                          setActivityEnd(Date.now() + suggestedMinutes * 60000);
                        }
                      }}
                    >
                      {activityEnd
                        ? "Stop activity timer"
                        : "Start activity timer"}
                    </AshaButton>
                  </div>
                </section>
                <section className="tally-section">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={config.tally}
                      onChange={(e) =>
                        setConfig((c) => ({ ...c, tally: e.target.checked }))
                      }
                    />
                    <span>Record anonymous group tallies</span>
                  </label>
                  <p className="small">
                    Counts only. One volunteer enters the group totals. Nothing
                    is sent online.
                  </p>
                  {config.tally &&
                    (activityChoices.length ? (
                      <div className="tally-controls">
                        {activityChoices.map((label, i) => (
                          <div className="tally-row" key={label}>
                            <span>{label}</span>
                            <div>
                              <AshaButton
                                variant="ghost"
                                className="icon-button"
                                aria-label={`Remove one from ${label}`}
                                disabled={!tallies[scene.id]?.[i]}
                                onClick={() =>
                                  setTallies((t) =>
                                    adjustTally(
                                      t,
                                      scene.id,
                                      i,
                                      -1,
                                      activityChoices.length,
                                    ),
                                  )
                                }
                              >
                                −
                              </AshaButton>
                              <output aria-label={`${label} tally`}>
                                {tallies[scene.id]?.[i] ?? 0}
                              </output>
                              <AshaButton
                                variant="secondary"
                                className="icon-button"
                                aria-label={`Add one to ${label}`}
                                onClick={() =>
                                  setTallies((t) =>
                                    adjustTally(
                                      t,
                                      scene.id,
                                      i,
                                      1,
                                      activityChoices.length,
                                    ),
                                  )
                                }
                              >
                                +
                              </AshaButton>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="small">
                        Group tallies are available on the myth activity and
                        decision pathway. Quiz answers are individual teaching
                        interactions.
                      </p>
                    ))}
                </section>
                <AshaButton
                  variant="secondary"
                  onClick={() => setSummary(true)}
                >
                  Session summary <Icon name="arrow" />
                </AshaButton>
              </>
            )}
            <AshaButton variant="ghost" onClick={resetActivity} icon="replay">
              Reset current activity
            </AshaButton>
          </aside>
        )}
      </main>
      <div className="presentation-status" role="status">
        {notice}
      </div>
      <PresentationControls
        current={current}
        total={20}
        title={scene.title}
        previous={() => go(current - 1)}
        next={() => go(current + 1)}
        openContents={() => setContents(true)}
        finish={() => {
          setRunning(false);
          if (volunteer) setSummary(true);
          else navigate("/school?completed=1");
        }}
      />
      {contents && (
        <Modal
          title="Your presentation journey"
          onClose={() => setContents(false)}
          className="contents-modal"
        >
          <p className="small">
            Choose any scene. Activity choices are kept as you navigate.
          </p>
          <ol className="scene-picker">
            {scenes.map((s, i) => (
              <li key={s.id}>
                <button
                  onClick={() => {
                    go(i + 1);
                    setContents(false);
                  }}
                  aria-current={current === i + 1 ? "step" : undefined}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                  {visited.includes(i + 1) && <Icon name="check" size={16} />}
                </button>
              </li>
            ))}
          </ol>
        </Modal>
      )}
      {settings && (
        <Modal
          title="Make this presentation yours"
          onClose={() => setSettings(false)}
        >
          <label className="checkbox-label setting-label">
            <input
              type="checkbox"
              checked={reduced}
              onChange={(e) => setReduced(e.target.checked)}
            />
            <span>
              <strong>Reduce motion</strong>
              <small>Show the same content with immediate transitions.</small>
            </span>
          </label>
          <AshaButton
            variant="secondary"
            onClick={() => {
              setSkipAnimation(true);
              setSettings(false);
            }}
          >
            Skip current animation
          </AshaButton>
          <h3 className="shortcut-title">Keyboard controls</h3>
          <dl className="shortcut-list">
            <div>
              <dt>
                <kbd>←</kbd> <kbd>→</kbd>
              </dt>
              <dd>Previous / next scene</dd>
            </div>
            <div>
              <dt>
                <kbd>Space</kbd> / <kbd>PgDn</kbd>
              </dt>
              <dd>Next scene</dd>
            </div>
            <div>
              <dt>
                <kbd>Home</kbd> / <kbd>End</kbd>
              </dt>
              <dd>First / last scene</dd>
            </div>
            <div>
              <dt>
                <kbd>F</kbd> / <kbd>R</kbd>
              </dt>
              <dd>Fullscreen / replay animation</dd>
            </div>
            {volunteer && (
              <div>
                <dt>
                  <kbd>N</kbd>
                </dt>
                <dd>Toggle facilitator tools</dd>
              </div>
            )}
          </dl>
          <p className="small">
            Shortcuts pause while a dialog or interactive control has focus. Use
            Tab and Enter for all controls. No audio plays automatically.
          </p>
        </Modal>
      )}
      {summary && (
        <Modal
          title="Your anonymous session summary"
          onClose={() => setSummary(false)}
        >
          <SessionSummary
            tally={tallies}
            scenes={scenes}
            seconds={seconds}
            visited={visited}
            onDelete={() => setConfirmClear(true)}
          />
          <div className="summary-exit">
            <AshaButton to="/volunteer" variant="ghost">
              Return to workshop overview <Icon name="arrow" />
            </AshaButton>
          </div>
        </Modal>
      )}
      {confirmClear && (
        <Modal
          title="Clear this local session?"
          onClose={() => setConfirmClear(false)}
        >
          <p>
            This clears activity answers, anonymous tallies, elapsed time and
            visit history for this session. Export a summary first if you need
            it.
          </p>
          <div className="button-row">
            <AshaButton
              variant="secondary"
              onClick={() => setConfirmClear(false)}
            >
              Keep session
            </AshaButton>
            <AshaButton variant="destructive" onClick={clearSession}>
              Clear session
            </AshaButton>
          </div>
        </Modal>
      )}
    </div>
  );
}
