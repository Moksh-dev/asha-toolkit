import {
  AshaButton,
  AshaLogo,
  Icon,
  MythRealityCard,
  QuizQuestion,
  ScenarioChoice,
} from "./components";
import { fictionalMessages as messages, knowledgeQuestions } from "./content";
import { DecisionTree, SupportNetwork } from "./visuals";
import type { ActivityState, Scene } from "./types";

export function SceneView({
  scene,
  state,
  update,
  quizIndex,
  setQuizIndex,
}: {
  scene: Scene;
  state: ActivityState;
  update: (patch: Partial<ActivityState>) => void;
  quizIndex: number;
  setQuizIndex: (i: number) => void;
}) {
  const points = scene.points ?? [];
  const title = (
    <div className="scene-heading">
      <p className="eyebrow">{scene.label}</p>
      <h1 id="scene-title" tabIndex={-1}>
        {scene.title}
      </h1>
      <p className="scene-intro">{scene.intro}</p>
    </div>
  );
  const footnote = scene.explanation && (
    <p className="scene-footnote">{scene.explanation}</p>
  );

  if (scene.kind === "welcome")
    return (
      <div className="scene scene-welcome">
        <div>
          {title}
          <p className="welcome-mission">{points[0]?.text}</p>
          <div className="welcome-promise">
            <Icon name="shield" />
            <span>
              A space to learn. The choice to pass. Support without blame.
            </span>
          </div>
        </div>
        <div className="identity-entrance">
          <AshaLogo large />
          <span className="hand-label">Understanding is a first step.</span>
          <div className="identity-line" />
        </div>
      </div>
    );
  if (scene.kind === "closing")
    return (
      <div className="scene scene-closing">
        {title}
        <SupportNetwork closing />
        <p className="closing-note">{scene.explanation}</p>
      </div>
    );
  if (scene.kind === "myth")
    return (
      <div className="scene scene-myth">
        {title}
        <MythRealityCard
          statement={scene.statement!}
          explanation={scene.explanation!}
          reality={scene.reality!}
          revealed={!!state.revealed}
          onReveal={() => update({ revealed: !state.revealed })}
        />
      </div>
    );
  if (scene.kind === "choice")
    return (
      <div className="scene scene-choice">
        {title}
        <ScenarioChoice
          choices={scene.choices!}
          selected={state.choice}
          onSelect={(choice) => update({ choice })}
        />
      </div>
    );
  if (scene.kind === "decision")
    return (
      <div className="scene scene-decision">
        {title}
        <DecisionTree
          choices={scene.choices!}
          selected={state.choice}
          onSelect={(choice) => update({ choice })}
        />
      </div>
    );
  if (scene.kind === "messages") {
    const count = state.message ?? 1;
    return (
      <div className="scene scene-messages">
        <div>
          {title}
          {footnote}
          <div className="message-controls">
            <AshaButton
              variant="secondary"
              onClick={() => update({ message: Math.min(4, count + 1) })}
              disabled={count === 4}
              icon="arrow"
            >
              Next message
            </AshaButton>
            <AshaButton
              variant="ghost"
              onClick={() => update({ message: 1 })}
              disabled={count === 1}
            >
              Start again
            </AshaButton>
          </div>
        </div>
        <div className="message-demo">
          <div className="message-top">
            <span className="avatar">?</span>
            <div>
              <strong>New contact</strong>
              <small>Fictional conversation · {count} / 4</small>
            </div>
            <Icon name="shield" />
          </div>
          <div className="message-list" aria-live="polite">
            {messages.slice(0, count).map((m, i) => (
              <div className="message-bubble" key={i}>
                <p>{m.text}</p>
                <span>{m.from}</span>
              </div>
            ))}
          </div>
          <p className="message-caption">
            Example only · no real messages are collected
          </p>
        </div>
      </div>
    );
  }
  if (scene.kind === "quiz") {
    const question = knowledgeQuestions[quizIndex];
    return (
      <div className="scene scene-quiz">
        {title}
        <QuizQuestion
          question={question}
          number={quizIndex + 1}
          selected={state.answers?.[quizIndex]}
          onSelect={(answer) =>
            update({ answers: { ...state.answers, [quizIndex]: answer } })
          }
        />
        <div className="quiz-navigation">
          <AshaButton
            variant="ghost"
            disabled={quizIndex === 0}
            onClick={() => setQuizIndex(quizIndex - 1)}
          >
            <Icon name="back" /> Previous question
          </AshaButton>
          <div aria-label="Question progress" className="quiz-dots">
            {knowledgeQuestions.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to question ${i + 1}`}
                aria-current={quizIndex === i ? "step" : undefined}
                className={state.answers?.[i] !== undefined ? "answered" : ""}
                onClick={() => setQuizIndex(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <AshaButton
            variant="secondary"
            disabled={quizIndex === 4}
            onClick={() => setQuizIndex(quizIndex + 1)}
          >
            Next question <Icon name="arrow" />
          </AshaButton>
        </div>
        <p className="quiz-completion" aria-live="polite">
          {Object.keys(state.answers ?? {}).length === 5
            ? "All five questions explored. Revisit any explanation, or continue the presentation."
            : "Choose an answer to explore the explanation. You can change your answer."}
        </p>
      </div>
    );
  }
  if (scene.kind === "network")
    return (
      <div className="scene scene-network">
        <div>
          {title}
          <div className="network-copy">
            {points.map((p) => (
              <div key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
        <SupportNetwork />
      </div>
    );
  if (scene.kind === "definition")
    return (
      <div className="scene scene-definition">
        {title}
        <div className="definition-map">
          {points.map((p, i) => (
            <div key={p.title}>
              <span className="concept-index">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
        {footnote}
      </div>
    );
  if (scene.kind === "compare")
    return (
      <div className="scene scene-compare">
        {title}
        <div className="comparison-table">
          <div className="comparison-head">
            <span>ASSUMPTION</span>
            <span>REALITY</span>
          </div>
          {points.map((p) => (
            <div className="comparison-row" key={p.title}>
              <p>{p.title}</p>
              <p>
                <Icon name="arrow" size={18} />
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  if (scene.kind === "carousel") {
    const active = state.carousel ?? 0;
    return (
      <div className="scene scene-carousel">
        {title}
        <div
          className="situation-tabs"
          role="group"
          aria-label="Fictional situations"
        >
          {points.map((p, i) => (
            <AshaButton
              key={p.title}
              variant={active === i ? "primary" : "secondary"}
              onClick={() => update({ carousel: i })}
              aria-pressed={active === i}
            >
              {p.title}
            </AshaButton>
          ))}
        </div>
        <div className="situation-card" aria-live="polite">
          <span className="large-number">0{active + 1}</span>
          <div>
            <p className="eyebrow">FICTIONAL SITUATION</p>
            <h3>{points[active].title}</h3>
            <p>{points[active].text}</p>
          </div>
        </div>
        <div className="discussion-prompts">
          <span>What raises concern?</span>
          <span>What don’t we know?</span>
          <span>Who could help?</span>
        </div>
      </div>
    );
  }
  if (scene.kind === "job")
    return (
      <div className="scene scene-job">
        <div>
          {title}
          <div className="opportunity-note">
            <p className="eyebrow">FICTIONAL OFFER · UNVERIFIED</p>
            <h3>
              “Great pay.
              <br />
              Start tomorrow.”
            </h3>
            <div>
              <span>Employer details?</span>
              <span>Written terms?</span>
            </div>
          </div>
        </div>
        <div className="editorial-list">
          {points.map((p, i) => (
            <div key={p.title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  if (scene.kind === "discussion")
    return (
      <div className="scene scene-discussion">
        {title}
        <div className="discussion-sequence">
          {points.map((p, i) => (
            <div key={p.title}>
              <span className="concept-index">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
        {footnote}
      </div>
    );
  if (scene.kind === "recap")
    return (
      <div className="scene scene-recap">
        {title}
        <div className="recap-list">
          {points.map((p, i) => (
            <div key={p.title}>
              <span>0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  if (scene.kind === "objectives")
    return (
      <div className="scene scene-objectives">
        {title}
        <div className="objective-list">
          {points.map((p, i) => (
            <div key={p.title}>
              <span className="number-circle">0{i + 1}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
        {footnote}
      </div>
    );
  if (scene.kind === "steps" || scene.kind === "actions")
    return (
      <div className={`scene scene-${scene.kind}`}>
        {title}
        <div className="step-diagram">
          {points.map((p, i) => (
            <div key={p.title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
        {footnote}
      </div>
    );
  if (
    scene.kind === "privacy" ||
    scene.kind === "supporting" ||
    scene.kind === "local"
  )
    return (
      <div className={`scene scene-editorial scene-${scene.kind}`}>
        <div>
          {title}
          <div className="editorial-symbol">
            <Icon
              name={
                scene.kind === "privacy"
                  ? "shield"
                  : scene.kind === "local"
                    ? "people"
                    : "book"
              }
              size={92}
            />
          </div>
        </div>
        <div>
          <div className="editorial-list">
            {points.map((p, i) => (
              <div key={p.title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
          {footnote}
        </div>
      </div>
    );
  if (scene.kind === "protocol")
    return (
      <div className="scene scene-protocol">
        {title}
        <div className="protocol-grid">
          {points.map((p, i) => (
            <div key={p.title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
        {footnote}
      </div>
    );
  return (
    <div className={`scene scene-${scene.kind}`}>
      {title}
      <div
        className={`point-panels ${points.length === 4 ? "four-panels" : ""}`}
      >
        {points.map((p, i) => (
          <div key={p.title}>
            <span className="panel-icon">
              {scene.kind === "agreement" ? (
                <Icon name="check" />
              ) : (
                String(i + 1).padStart(2, "0")
              )}
            </span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </div>
        ))}
      </div>
      {footnote}
    </div>
  );
}
