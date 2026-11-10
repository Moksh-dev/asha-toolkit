import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import {
  MythRealityCard,
  QuizQuestion,
  ScenarioChoice,
} from "../src/components";
import {
  knowledgeQuestions,
  schoolScenes,
  volunteerScenes,
} from "../src/content";
import {
  adjustTally,
  clampScene,
  loadConfig,
  loadTallies,
} from "../src/storage";

afterEach(() => {
  cleanup();
  sessionStorage.clear();
});
describe("complete educational journeys", () => {
  it("has 20 substantive scenes with notes and timings in each edition", () => {
    for (const scenes of [schoolScenes, volunteerScenes]) {
      expect(scenes).toHaveLength(20);
      expect(new Set(scenes.map((s) => s.id)).size).toBe(20);
      for (const scene of scenes) {
        expect(scene.intro.length).toBeGreaterThan(30);
        expect(scene.notes.join(" ").length).toBeGreaterThan(120);
        expect(scene.notes.length).toBeGreaterThanOrEqual(2);
        expect(scene.minutes).toBeGreaterThan(0);
      }
    }
  });
  it("teaches all five safety themes and a constructive explanation for every question", () => {
    expect(knowledgeQuestions).toHaveLength(5);
    for (const q of knowledgeQuestions) {
      expect(q.options[q.correct]).toBeTruthy();
      expect(q.explanation.length).toBeGreaterThan(70);
    }
    expect(volunteerScenes[16].notes.join(" ")).toMatch(
      /Do not invite disclosures/,
    );
    expect(volunteerScenes[16].points?.map((p) => p.text).join(" ")).toMatch(
      /Do not investigate independently/,
    );
  });
});
describe("safe local state", () => {
  it("cannot reduce a tally below zero or exceed the per-option limit", () => {
    expect(adjustTally({}, "v07", 0, -1, 2).v07).toEqual([0, 0]);
    expect(adjustTally({ v07: [999, 3] }, "v07", 0, 1, 2).v07).toEqual([
      999, 3,
    ]);
    expect(adjustTally({ v07: [2, 3] }, "v07", 1, -1, 2).v07).toEqual([2, 2]);
  });
  it("rejects malformed stored configuration and identifiable tally fields", () => {
    sessionStorage.setItem(
      "asha.config",
      JSON.stringify({ duration: -10, format: "unexpected", tally: "true" }),
    );
    expect(loadConfig()).toEqual({
      duration: 60,
      format: "In-person workshop",
      tally: false,
    });
    sessionStorage.setItem(
      "asha.tallies",
      JSON.stringify({ name: "someone", v07: [1, 3], v11: [-1, 4] }),
    );
    expect(loadTallies()).toEqual({ v07: [1, 3] });
  });
  it("keeps URL scene requests within the presentation bounds", () => {
    expect(clampScene("-2")).toBe(1);
    expect(clampScene("900")).toBe(20);
    expect(clampScene("NaN")).toBe(1);
    expect(clampScene("6")).toBe(6);
  });
});
describe("interactive teaching feedback", () => {
  it("reveals a myth explanation only on presenter request", () => {
    const reveal = vi.fn();
    const { rerender } = render(
      <MythRealityCard
        statement="A border is always required."
        explanation="Exploitation can happen locally."
        reality={false}
        revealed={false}
        onReveal={reveal}
      />,
    );
    expect(screen.queryByText("Exploitation can happen locally.")).toBeNull();
    fireEvent.click(screen.getByRole("button"));
    expect(reveal).toHaveBeenCalledOnce();
    rerender(
      <MythRealityCard
        statement="A border is always required."
        explanation="Exploitation can happen locally."
        reality={false}
        revealed
        onReveal={reveal}
      />,
    );
    expect(screen.getByText("Exploitation can happen locally.")).toBeTruthy();
    expect(screen.getByRole("button").getAttribute("aria-expanded")).toBe(
      "true",
    );
  });
  it("offers nonjudgmental feedback for the nonpreferred scenario path", () => {
    const choices = schoolScenes[9].choices!;
    render(
      <ScenarioChoice choices={choices} selected={0} onSelect={vi.fn()} />,
    );
    expect(
      screen.getByText("There is still a way to seek support"),
    ).toBeTruthy();
    expect(screen.getByText(choices[0].feedback)).toBeTruthy();
  });
  it("explains an incorrect quiz answer and permits changing it", () => {
    const select = vi.fn();
    render(
      <QuizQuestion
        question={knowledgeQuestions[0]}
        number={1}
        selected={0}
        onSelect={select}
      />,
    );
    expect(screen.getByText("Let’s revisit this together.")).toBeTruthy();
    expect(screen.getByText(knowledgeQuestions[0].explanation)).toBeTruthy();
    fireEvent.click(screen.getAllByRole("button")[1]);
    expect(select).toHaveBeenCalledWith(1);
  });
});
