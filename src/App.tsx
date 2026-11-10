import { useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import {
  AshaButton,
  AshaCard,
  AshaHeader,
  Footer,
  Icon,
  ResourceCard,
  SectionHeading,
  downloadText,
} from "./components";
import {
  schoolScenes,
  volunteerScenes,
  references,
  knowledgeQuestions,
  fictionalMessages,
} from "./content";
import { Presentation } from "./Presentation";
import { AudienceIllustration } from "./visuals";
import { loadConfig, writeSession } from "./storage";
import type { Edition, Scene } from "./types";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AshaHeader />
      {children}
      <Footer />
    </>
  );
}
function Home() {
  return (
    <Layout>
      <main className="home-main" id="main">
        <div className="home-intro">
          <p className="eyebrow">PROJECT A.S.H.A. / AWARENESS RESOURCES</p>
          <h1>
            Awareness that
            <br />
            leads to <span>action.</span>
          </h1>
          <p>
            Interactive educational experiences designed to help schools,
            volunteers, and communities understand human trafficking, recognize
            potential risks, and encourage safer decisions.
          </p>
        </div>
        <div className="toolkit-grid">
          {(
            [
              {
                edition: "school",
                title: "School Toolkit",
                subtitle: "LEARN TOGETHER",
                text: "A guided awareness presentation for classrooms and school communities.",
                meta: "20 scenes · ~40 minutes",
                button: "Open School Toolkit",
              },
              {
                edition: "volunteer",
                title: "Volunteer Toolkit",
                subtitle: "FACILITATE CHANGE",
                text: "A facilitator-led workshop experience for Project A.S.H.A. volunteers.",
                meta: "20 stages · 30–60 minutes",
                button: "Open Volunteer Toolkit",
              },
            ] as const
          ).map((t, i) => (
            <AshaCard className="toolkit-card" key={t.edition}>
              <div className="product-topline">
                <p className="eyebrow">{t.subtitle}</p>
                <span>0{i + 1}</span>
              </div>
              <div className="product-body">
                <div>
                  <h2>{t.title}</h2>
                  <p>{t.text}</p>
                  <span className="product-meta">
                    <Icon name="clock" size={16} />
                    {t.meta}
                  </span>
                </div>
                <AudienceIllustration type={t.edition} />
              </div>
              <AshaButton
                to={`/${t.edition}`}
                variant={i === 0 ? "primary" : "secondary"}
              >
                {t.button}
                <Icon name="arrow" />
              </AshaButton>
            </AshaCard>
          ))}
        </div>
        <div className="home-footnote">
          <span>
            <Icon name="shield" size={17} /> Age-aware. Supportive. Designed for
            conversation.
          </span>
          <Link to="/resources#offline">
            Present anywhere. Learn how <Icon name="arrow" size={16} />
          </Link>
        </div>
      </main>
    </Layout>
  );
}

function ChapterList({
  edition,
  scenes,
}: {
  edition: Edition;
  scenes: Scene[];
}) {
  return (
    <details className="chapter-details">
      <summary>
        Explore all 20 {edition === "school" ? "scenes" : "workshop stages"}{" "}
        <Icon name="list" size={18} />
      </summary>
      <ol className="chapter-list">
        {scenes.map((scene, i) => (
          <li key={scene.id}>
            <Link to={`/${edition}/present?scene=${i + 1}`}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {scene.title}
              <Icon name="arrow" size={16} />
            </Link>
          </li>
        ))}
      </ol>
    </details>
  );
}
function EditionIntro({ edition }: { edition: Edition }) {
  const volunteer = edition === "volunteer";
  const scenes = volunteer ? volunteerScenes : schoolScenes;
  const [config, setConfig] = useState(loadConfig);
  const [query] = useSearchParams();
  useEffect(() => {
    if (volunteer) writeSession("config", config);
  }, [config, volunteer]);
  return (
    <Layout>
      <main className="overview-main" id="main">
        <Link to="/" className="breadcrumb">
          <Icon name="back" size={16} /> All toolkits
        </Link>
        {query.has("completed") && (
          <div className="completion-callout" role="status">
            <Icon name="check" />
            Presentation complete. Keep the conversation open and repeat your
            school’s support pathway.
          </div>
        )}
        <div className="overview-hero">
          <div>
            <SectionHeading
              eyebrow={`${volunteer ? "VOLUNTEER" : "SCHOOL"} EDITION / PRESENTER OVERVIEW`}
              title={
                volunteer
                  ? "A conversation that creates change."
                  : "Bring awareness into the classroom."
              }
              description={
                volunteer
                  ? "A thoughtful, facilitator-led workshop for schools, community spaces, nonprofit events and online groups."
                  : "A complete, teacher-led presentation. Clear explanations, thoughtful interactions and practical steps toward safety."
              }
            />
            <div className="overview-meta">
              <span>
                <Icon name="people" size={18} />
                {volunteer
                  ? "Volunteer-led · adaptable audiences"
                  : "Recommended ages 13+ · educator discretion"}
              </span>
              <span>
                <Icon name="clock" size={18} />
                {volunteer
                  ? "30, 45 or 60 minutes"
                  : "20 scenes · ~40 minutes + discussion"}
              </span>
            </div>
          </div>
          <div className="overview-art">
            <AudienceIllustration type={edition} />
            <span className="hand-label">
              {volunteer ? "Guide the conversation." : "Learn. Reflect. Ask."}
            </span>
          </div>
        </div>
        <div className="overview-content">
          <div className="overview-left">
            <section>
              <p className="eyebrow">A CLEAR PURPOSE</p>
              <h2>What participants will take away</h2>
              <ul className="check-list">
                {[
                  "Understand exploitation beyond common stereotypes.",
                  "Recognize concerning patterns without making accusations.",
                  "Practice pausing and verifying unfamiliar opportunities.",
                  "Identify trusted support and safer next steps.",
                ].map((s) => (
                  <li key={s}>
                    <Icon name="check" size={19} />
                    {s}
                  </li>
                ))}
              </ul>
            </section>
            <section className="preparation-section">
              <p className="eyebrow">BEFORE YOU BEGIN</p>
              <h2>
                {volunteer
                  ? "Prepare the space. Know the pathway."
                  : "You can present this independently."}
              </h2>
              <ol className="preparation-list">
                <li>
                  <strong>Read the presenter guide.</strong>
                  <p>
                    Review the scenes, notes and language for your audience.
                    Arrange leadership and safeguarding review before external
                    use.
                  </p>
                </li>
                <li>
                  <strong>Confirm support in advance.</strong>
                  <p>
                    Know the host’s safeguarding lead, a quiet space and the
                    verified local response procedure.
                  </p>
                </li>
                <li>
                  <strong>Set a supportive tone.</strong>
                  <p>
                    Participation is optional. No personal disclosures,
                    real-case role-play or identifying information in group
                    activities.
                  </p>
                </li>
                {!volunteer && (
                  <li>
                    <strong>Present at your pace.</strong>
                    <p>
                      Use arrows to move through scenes, reveal activities
                      together, and open presenter notes when you need guidance.
                    </p>
                  </li>
                )}
              </ol>
            </section>
            <ChapterList edition={edition} scenes={scenes} />
          </div>
          <AshaCard className="session-setup">
            <p className="eyebrow">
              {volunteer ? "WORKSHOP SETUP" : "READY WHEN YOU ARE"}
            </p>
            <h2>
              {volunteer
                ? "Shape your session."
                : "A small step toward a safer community."}
            </h2>
            {volunteer ? (
              <>
                <label className="field-label" htmlFor="format">
                  Session format
                </label>
                <select
                  id="format"
                  value={config.format}
                  onChange={(e) =>
                    setConfig((c) => ({ ...c, format: e.target.value }))
                  }
                >
                  <option>In-person workshop</option>
                  <option>Online workshop</option>
                  <option>Community session</option>
                </select>
                <label className="field-label" htmlFor="duration">
                  Session duration
                </label>
                <select
                  id="duration"
                  value={config.duration}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      duration: Number(e.target.value),
                    }))
                  }
                >
                  <option value={30}>30 minutes · focused</option>
                  <option value={45}>45 minutes · balanced</option>
                  <option value={60}>60 minutes · full discussion</option>
                </select>
                <p className="setup-format">
                  {config.format === "Online workshop"
                    ? "Use verbal responses or a show of hands on camera. Avoid recording or saving chat disclosures."
                    : config.format === "Community session"
                      ? "Adapt vocabulary and examples to the group. Arrange an accessible, private support route."
                      : "Use a projector, optional pair discussion and a visible, verified support pathway."}
                </p>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={config.tally}
                    onChange={(e) =>
                      setConfig((c) => ({ ...c, tally: e.target.checked }))
                    }
                  />
                  <span>Enable anonymous group tallies</span>
                </label>
                <p className="small">
                  Optional counts only, stored in this browser tab. No personal
                  data.
                </p>
              </>
            ) : (
              <p>
                Open the presentation, introduce the right to pass, and work
                through the scenes together. No sign-in or student devices
                needed.
              </p>
            )}
            <AshaButton to={`/${edition}/present`} icon="arrow">
              {volunteer ? "Start Presentation" : "Begin Presentation"}
            </AshaButton>
            <AshaButton
              to={`/${edition}/guide`}
              variant="secondary"
              icon="download"
            >
              Presenter guide
            </AshaButton>
            <div className="materials">
              <strong>
                {volunteer ? "Recommended materials" : "What you’ll need"}
              </strong>
              <p>
                {volunteer
                  ? "A screen or projector, a timekeeper, optional paper for general reflections, and the host’s approved local-support handout."
                  : "A screen or projector, this toolkit, and your school’s approved local-support information."}
              </p>
            </div>
            <Link to="/resources#offline" className="text-link">
              Need to present offline? <Icon name="arrow" size={16} />
            </Link>
          </AshaCard>
        </div>
      </main>
    </Layout>
  );
}

export function guideText(edition: Edition) {
  const scenes = edition === "school" ? schoolScenes : volunteerScenes;
  const sections = scenes.map((s, i) => {
    const activity =
      s.kind === "quiz"
        ? knowledgeQuestions
            .map(
              (q, n) =>
                `Question ${n + 1}: ${q.prompt}\n${q.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join("\n")}\nPreferred response: ${q.options[q.correct]}\n${q.explanation}`,
            )
            .join("\n\n")
        : s.kind === "messages"
          ? fictionalMessages.map((m, n) => `${n + 1}. ${m.text}`).join("\n")
          : "";
    return `${String(i + 1).padStart(2, "0")}. ${s.title} (~${s.minutes} min)\n${s.intro}\n${s.points?.map((p) => `- ${p.title}: ${p.text}`).join("\n") ?? ""}${s.statement ? `\nStatement: ${s.statement}` : ""}${s.explanation ? `\n${s.explanation}` : ""}${s.choices ? `\n${s.choices.map((c) => `- ${c.text} ${c.feedback}`).join("\n")}` : ""}${activity ? `\n${activity}` : ""}\nPresenter notes:\n${s.notes.map((n) => `- ${n}`).join("\n")}\n`;
  });
  return `PROJECT A.S.H.A. — ${edition.toUpperCase()} PRESENTER GUIDE\nPrepared for leadership and safeguarding review before external use.\n\nBEFORE PRESENTING\nReview age suitability, identify the host safeguarding lead, verify local support, and offer the option to pass. Never invite personal disclosures. If someone shares a concern, listen calmly, do not promise secrecy, follow host procedures and seek trained assistance. Do not investigate.\n\n${sections.join("\n")}\nSOURCES\n${references.map((r) => `${r.org}: ${r.title}\n${r.url}`).join("\n\n")}\n\nLocal support must be verified by the host. This guide does not provide legal advice or replace safeguarding procedures.`;
}

function PresenterGuide({ edition }: { edition: Edition }) {
  const scenes = edition === "school" ? schoolScenes : volunteerScenes;
  return (
    <Layout>
      <main className="guide-main" id="main">
        <div className="guide-actions">
          <AshaButton to={`/${edition}`} variant="ghost">
            <Icon name="back" />
            Overview
          </AshaButton>
          <AshaButton
            variant="secondary"
            onClick={() =>
              downloadText(
                `asha-${edition}-presenter-guide.txt`,
                guideText(edition),
              )
            }
            icon="download"
          >
            Download guide
          </AshaButton>
          <AshaButton onClick={() => window.print()} icon="notes">
            Print guide
          </AshaButton>
        </div>
        <SectionHeading
          eyebrow={`${edition.toUpperCase()} EDITION / PRESENTER GUIDE`}
          title="A little preparation. A better conversation."
          description="A printable companion with every scene, teaching point, suggested timing and presenter note. Keep it beside you during the session."
        />
        <div className="callout">
          <h2>Before you present</h2>
          <p>
            Obtain leadership and safeguarding review. Check audience age and
            local procedures. Confirm a designated safeguarding adult, a quiet
            support space and verified local contacts. Never invite public
            disclosures or promise absolute confidentiality.
          </p>
          <p>
            Suggested timings are flexible. The Volunteer Edition scales timings
            for the selected 30, 45 or 60 minute plan. Keep explanations and
            safeguarding guidance even when shortening discussions.
          </p>
        </div>
        <div className="guide-scenes">
          {scenes.map((s, i) => (
            <section key={s.id}>
              <p className="eyebrow">
                SCENE {String(i + 1).padStart(2, "0")} · ~{s.minutes} MIN BASE
                TIMING
              </p>
              <h2>{s.title}</h2>
              <p>{s.intro}</p>
              {s.points && (
                <ul>
                  {s.points.map((p) => (
                    <li key={p.title}>
                      <strong>{p.title}:</strong> {p.text}
                    </li>
                  ))}
                </ul>
              )}
              {s.statement && (
                <p>
                  <strong>Statement:</strong> {s.statement}
                </p>
              )}
              {s.explanation && <p>{s.explanation}</p>}
              {s.choices && (
                <ul>
                  {s.choices.map((c) => (
                    <li key={c.text}>
                      <strong>{c.text}</strong> {c.feedback}
                    </li>
                  ))}
                </ul>
              )}
              {s.kind === "quiz" && (
                <ol>
                  {knowledgeQuestions.map((q) => (
                    <li key={q.prompt}>
                      <strong>{q.prompt}</strong>
                      <p>
                        Preferred response: {q.options[q.correct]}{" "}
                        {q.explanation}
                      </p>
                    </li>
                  ))}
                </ol>
              )}
              {s.kind === "messages" && (
                <ol>
                  {fictionalMessages.map((m) => (
                    <li key={m.text}>{m.text}</li>
                  ))}
                </ol>
              )}
              <h3>Presenter guidance</h3>
              <ul>
                {s.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <h2>Reference sources</h2>
        <ul>
          {references.map((r) => (
            <li key={r.id}>
              <a href={r.url}>
                {r.org} · {r.title}
              </a>
            </li>
          ))}
        </ul>
        <p>
          Educational content for local review. Use verified support pathways;
          this toolkit does not diagnose situations or replace local legal or
          safeguarding advice.
        </p>
      </main>
    </Layout>
  );
}

const localChecklist =
  "PROJECT A.S.H.A. — HOST PREPARATION CHECKLIST\n\nComplete this through your institution’s approved process. Do not enter personal disclosures into the toolkit.\n\n[ ] Leadership and safeguarding content review completed.\n[ ] Audience age, language and accessibility needs reviewed.\n[ ] Designated host safeguarding lead confirmed and present.\n[ ] A quiet, private support space is available.\n[ ] Host reporting and secure recordkeeping procedure checked.\n[ ] Relevant local child-protection and specialist service details verified.\n[ ] Service eligibility, languages, hours and accessibility confirmed.\n[ ] Official local emergency route and procedure verified.\n[ ] Approved local support handout prepared.\n[ ] Offline toolkit opened and tested on the presentation device.\n\nFor an online workshop: agree a private, monitored support route and avoid recording or saving personal disclosures in group chat.\n\nNever promise absolute confidentiality, pressure someone to disclose, confront a suspected exploiter, or conduct an independent investigation. Follow the host’s safeguarding procedures and seek trained assistance.";

function Resources() {
  return (
    <Layout>
      <main className="resources-main" id="main">
        <Link to="/" className="breadcrumb">
          <Icon name="back" size={16} /> All toolkits
        </Link>
        <SectionHeading
          eyebrow="RESOURCES & GUIDANCE"
          title="Grounded in care. Guided by evidence."
          description="Reliable references, practical preparation and clear boundaries for supportive awareness sessions."
        />
        <section className="resource-section">
          <div className="section-title-row">
            <h2>Educational references</h2>
            <span className="small">
              Official sources · links require internet
            </span>
          </div>
          <div className="reference-grid">
            {references.map((r) => (
              <ResourceCard key={r.id} {...r} />
            ))}
          </div>
          <p className="small">
            These sources inform the educational material. Their inclusion does
            not imply affiliation or endorsement. International concepts do not
            replace jurisdiction-specific law.
          </p>
        </section>
        <section className="resource-section safeguarding-section">
          <div>
            <p className="eyebrow">SAFEGUARDING COMES FIRST</p>
            <h2>If someone shares a concern.</h2>
            <p>
              Do not invite personal disclosures. If a concern is shared,
              respond calmly and use the host institution’s safeguarding
              pathway.
            </p>
            <Link to="/volunteer/present?scene=17" className="text-link">
              Open the disclosure protocol <Icon name="arrow" size={17} />
            </Link>
          </div>
          <ol className="safeguarding-list">
            <li>Listen calmly, without blame or probing questions.</li>
            <li>Do not promise absolute confidentiality.</li>
            <li>Explain that appropriately trained people may need to help.</li>
            <li>
              Follow the host’s safeguarding and secure reporting procedures.
            </li>
            <li>Do not confront anyone or investigate independently.</li>
            <li>
              Use verified local emergency procedures for immediate danger.
            </li>
          </ol>
        </section>
        <section className="resource-section local-section" id="local-support">
          <p className="eyebrow">MAKE SUPPORT RELEVANT</p>
          <h2>Prepare your local pathway.</h2>
          <p>
            Ask the host to verify its safeguarding lead, appropriate specialist
            services, eligibility, availability, language support and emergency
            procedure. Share the approved information verbally and on a local
            handout.
          </p>
          <p>
            Contact details are intentionally not prefilled. Never use an
            unverified number or imply an organization’s affiliation. Do not put
            participant information in quiz activities or session summaries.
          </p>
          <div className="button-row">
            <AshaButton
              onClick={() =>
                downloadText(
                  "asha-host-preparation-checklist.txt",
                  localChecklist,
                )
              }
              variant="secondary"
              icon="download"
            >
              Download preparation checklist
            </AshaButton>
            <AshaButton
              onClick={() => window.print()}
              variant="ghost"
              icon="notes"
            >
              Print guidance
            </AshaButton>
          </div>
        </section>
        <section className="resource-section offline-section" id="offline">
          <div className="offline-symbol">
            <Icon name="book" size={44} />
          </div>
          <div>
            <p className="eyebrow">READY FOR THE ROOM</p>
            <h2>Present without a connection.</h2>
            <p>
              The packaged <strong>offline-toolkit.html</strong> contains both
              complete editions, all illustrations and styling in one file. Open
              it in a modern browser; no installation or internet is needed.
              Print or download presenter guides from inside it.
            </p>
            <p>
              For the hosted build, wait for the “Offline ready” status before
              disconnecting. A service worker stores the entire educational
              application. External source pages still need internet.
            </p>
            <OfflineStatus />
            {import.meta.env.PROD &&
              import.meta.env.VITE_PORTABLE !== "true" && (
                <AshaButton
                  href="/offline-toolkit.html"
                  download="offline-toolkit.html"
                  variant="secondary"
                  icon="download"
                >
                  Download offline toolkit
                </AshaButton>
              )}
            <p className="small">
              Local sessions stay in this browser tab. Private browsing may
              limit persistence. Fullscreen and installation support vary by
              browser.
            </p>
          </div>
        </section>
        <div className="review-note">
          <Icon name="shield" />
          <p>
            <strong>Prepared for review before distribution.</strong> Project
            A.S.H.A. leadership and the host’s safeguarding team should approve
            the language, audience suitability and local guidance. Review
            sources and local procedures before each delivery.
          </p>
        </div>
      </main>
    </Layout>
  );
}

function OfflineStatus() {
  const [status, setStatus] = useState(
    window.location.protocol === "file:" ||
      import.meta.env.VITE_PORTABLE === "true"
      ? "Offline package · all educational assets included"
      : "Checking offline availability…",
  );
  useEffect(() => {
    if (
      window.location.protocol === "file:" ||
      import.meta.env.VITE_PORTABLE === "true"
    )
      return;
    let active = true;
    const check = () => {
      if (!active) return;
      if (!("serviceWorker" in navigator)) {
        setStatus("Use the single-file package for offline presentation.");
        return;
      }
      navigator.serviceWorker
        .getRegistration()
        .then(async (reg) => {
          if (!active) return;
          if (!reg) {
            setStatus(
              import.meta.env.DEV
                ? "Development preview · offline cache is available in the production build"
                : "Offline cache unavailable · use the single-file package",
            );
            return;
          }
          const keys = await caches.keys();
          if (active)
            setStatus(
              keys.some((key) => key.startsWith("asha-toolkit-")) &&
                reg.active &&
                navigator.serviceWorker.controller
                ? "Offline ready · educational assets stored on this device"
                : "Preparing offline assets · keep this page open briefly",
            );
        })
        .catch(() =>
          setStatus("Offline cache unavailable · use the single-file package"),
        );
    };
    check();
    const interval = setInterval(check, 1500);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);
  return (
    <p className="offline-status" role="status">
      <Icon name="check" size={17} />
      {status}
    </p>
  );
}

function NotFound() {
  return (
    <Layout>
      <main className="not-found" id="main">
        <SectionHeading
          eyebrow="LET’S FIND YOUR WAY"
          title="Your next step starts here."
          description="This page isn’t part of the toolkit. Choose an edition to continue."
        />
        <AshaButton to="/">
          Explore the toolkits <Icon name="arrow" />
        </AshaButton>
      </main>
    </Layout>
  );
}

export default function App() {
  const location = useLocation();
  const [reduced, setReducedState] = useState(() => {
    try {
      const saved = localStorage.getItem("asha.reducedMotion");
      return saved === null
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : saved === "true";
    } catch {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  });
  const setReduced = (value: boolean) => {
    setReducedState(value);
    try {
      localStorage.setItem("asha.reducedMotion", String(value));
    } catch {
      /* Memory-only fallback. */
    }
  };
  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(reduced);
  }, [reduced]);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!location.pathname.includes("/present")) {
      document.title = `${location.pathname.includes("volunteer") ? "Volunteer Toolkit" : location.pathname.includes("school") ? "School Toolkit" : location.pathname.includes("resources") ? "Resources & Guidance" : "Awareness Toolkits"} · Project A.S.H.A.`;
    } else
      document.title = `${location.pathname.includes("volunteer") ? "Volunteer" : "School"} Presentation · Project A.S.H.A.`;
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/school" element={<EditionIntro edition="school" />} />
      <Route path="/volunteer" element={<EditionIntro edition="volunteer" />} />
      <Route
        path="/school/guide"
        element={<PresenterGuide edition="school" />}
      />
      <Route
        path="/volunteer/guide"
        element={<PresenterGuide edition="volunteer" />}
      />
      <Route
        path="/school/present"
        element={
          <Presentation
            key="school"
            edition="school"
            reduced={reduced}
            setReduced={setReduced}
          />
        }
      />
      <Route
        path="/volunteer/present"
        element={
          <Presentation
            key="volunteer"
            edition="volunteer"
            reduced={reduced}
            setReduced={setReduced}
          />
        }
      />
      <Route path="/resources" element={<Resources />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
