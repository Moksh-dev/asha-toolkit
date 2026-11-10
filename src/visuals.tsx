import type { Choice } from "./types";
import { AshaButton } from "./components";

export function AudienceIllustration({
  type,
}: {
  type: "school" | "volunteer";
}) {
  return (
    <svg
      className="audience-illustration"
      viewBox="0 0 240 156"
      role="img"
      aria-label={
        type === "school"
          ? "An open book and a classroom window"
          : "People connected through a shared conversation"
      }
    >
      <circle cx="124" cy="79" r="66" fill="var(--asha-cloud)" />
      {type === "school" ? (
        <g
          fill="none"
          stroke="var(--asha-primary)"
          strokeWidth="2.4"
          strokeLinejoin="round"
        >
          <path
            fill="var(--asha-paper)"
            d="M50 64c26-5 49 0 71 12 22-12 45-17 71-12v63c-26-5-49 0-71 12-22-12-45-17-71-12Z"
          />
          <path d="M121 76v63M63 82c16-1 29 2 43 8M63 96c16-1 29 2 43 8m29-14c14-6 27-9 43-8m-43 22c14-6 27-9 43-8" />
          <path fill="var(--asha-pale-blue)" d="M133 32h50v27h-50z" />
          <path d="M158 32v27M133 45h50M83 43l7-12 7 12m-14 0h14m-7 0v10" />
        </g>
      ) : (
        <g fill="none" stroke="var(--asha-primary)" strokeWidth="2.4">
          <path
            d="M74 87q46-24 92 0M76 103l41 22 46-22"
            strokeDasharray="4 5"
          />
          <circle fill="var(--asha-paper)" cx="74" cy="72" r="13" />
          <path fill="var(--asha-paper)" d="M53 112V99a21 21 0 0 1 42 0v13Z" />
          <circle fill="var(--asha-paper)" cx="168" cy="72" r="13" />
          <path fill="var(--asha-paper)" d="M147 112V99a21 21 0 0 1 42 0v13Z" />
          <path
            fill="var(--asha-pale-blue)"
            d="M99 27h46v29h-15l-10 9v-9H99Z"
          />
          <path d="M109 38h26m-26 9h15" />
        </g>
      )}
      <path d="M31 140h178" stroke="var(--asha-border)" strokeWidth="2" />
    </svg>
  );
}

export function SupportNetwork({ closing = false }: { closing?: boolean }) {
  return (
    <svg
      viewBox="0 0 560 310"
      className={`support-network ${closing ? "community-network" : ""}`}
      role="img"
      aria-label={
        closing
          ? "Individuals connected as a supportive community"
          : "You connected to trusted adults, school safeguarding and appropriate local services"
      }
    >
      <g
        className="network-lines"
        fill="none"
        stroke="var(--asha-light-blue)"
        strokeWidth="2"
      >
        <path d="M280 148 116 77M280 148l164-71M280 148v117M116 77l328 0M116 77l164 188L444 77" />
      </g>
      {[
        { x: 116, y: 77, name: closing ? "Awareness" : "Trusted adults" },
        { x: 444, y: 77, name: closing ? "Respect" : "School team" },
        { x: 280, y: 253, name: closing ? "Action" : "Local services" },
      ].map(({ x, y, name }) => (
        <g key={name} className="network-node">
          <circle
            cx={x}
            cy={y}
            r="36"
            fill="var(--asha-feature)"
            stroke="var(--asha-border)"
          />
          <circle
            cx={x}
            cy={y - 7}
            r="8"
            fill="none"
            stroke="var(--asha-primary)"
            strokeWidth="2"
          />
          <path
            d={`M${x - 14} ${y + 15}a14 14 0 0 1 28 0`}
            fill="none"
            stroke="var(--asha-primary)"
            strokeWidth="2"
          />
          <text x={x} y={y + 57} textAnchor="middle">
            {name}
          </text>
        </g>
      ))}
      <g className="network-center">
        <circle cx="280" cy="145" r="44" fill="var(--asha-primary)" />
        <text x="280" y="151" textAnchor="middle" className="network-you">
          {closing ? "Together" : "You"}
        </text>
      </g>
    </svg>
  );
}

export function DecisionTree({
  choices,
  selected,
  onSelect,
}: {
  choices: Choice[];
  selected?: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="decision-tree">
      <svg
        viewBox="0 0 600 158"
        role="img"
        aria-label={
          selected === undefined
            ? "An unfamiliar offer branches into two choices, both connected to support"
            : `Selected pathway: ${choices[selected].text}. Support remains available.`
        }
      >
        <g fill="none" strokeWidth="3">
          <path
            d="M300 38v25Q300 83 160 83v44"
            stroke={
              selected === 0 ? "var(--asha-primary)" : "var(--asha-border)"
            }
            className={selected === 0 ? "chosen-path" : ""}
          />
          <path
            d="M300 38v25q0 20 140 20v44"
            stroke={
              selected === 1 ? "var(--asha-primary)" : "var(--asha-border)"
            }
            className={selected === 1 ? "chosen-path" : ""}
          />
        </g>
        <rect
          x="192"
          y="5"
          width="216"
          height="42"
          rx="21"
          fill="var(--asha-cloud)"
        />
        <text x="300" y="32" textAnchor="middle">
          An unfamiliar offer
        </text>
        <circle
          cx="160"
          cy="128"
          r="8"
          fill={selected === 0 ? "var(--asha-primary)" : "var(--asha-border)"}
        />
        <circle
          cx="440"
          cy="128"
          r="8"
          fill={selected === 1 ? "var(--asha-primary)" : "var(--asha-border)"}
        />
      </svg>
      <div className="branch-choices">
        {choices.map((choice, i) => (
          <AshaButton
            key={choice.text}
            variant={selected === i ? "primary" : "secondary"}
            onClick={() => onSelect(i)}
            aria-pressed={selected === i}
          >
            {choice.text}
          </AshaButton>
        ))}
      </div>
      <div className="branch-result" aria-live="polite">
        {selected !== undefined ? (
          <>
            <strong>
              {selected === 0
                ? "More information. More support."
                : "You can still change direction."}
            </strong>
            <p>{choices[selected].feedback}</p>
          </>
        ) : (
          <p>Choose a path to explore what comes next.</p>
        )}
      </div>
      <div className="support-end">
        <span />
        Trusted support remains available
        <span />
      </div>
    </div>
  );
}
