import type { ActivityState, SessionConfig, Tally } from "./types";

export const defaultConfig: SessionConfig = {
  duration: 60,
  format: "In-person workshop",
  tally: false,
};
export function readSession<T>(key: string, fallback: T): T {
  try {
    const value = sessionStorage.getItem(`asha.${key}`);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}
export function writeSession(key: string, value: unknown) {
  try {
    sessionStorage.setItem(`asha.${key}`, JSON.stringify(value));
  } catch {
    /* Private browsers may restrict storage; the presentation still works in memory. */
  }
}
export function loadConfig(): SessionConfig {
  const v = readSession<Partial<SessionConfig>>("config", {});
  return {
    duration: [30, 45, 60].includes(Number(v.duration))
      ? Number(v.duration)
      : 60,
    format: [
      "In-person workshop",
      "Online workshop",
      "Community session",
    ].includes(String(v.format))
      ? String(v.format)
      : defaultConfig.format,
    tally: v.tally === true,
  };
}
export function adjustTally(
  tally: Tally,
  scene: string,
  index: number,
  delta: number,
  optionCount: number,
): Tally {
  const counts = Array.from({ length: optionCount }, (_, i) =>
    Math.min(999, Math.max(0, Number(tally[scene]?.[i]) || 0)),
  );
  counts[index] = Math.min(999, Math.max(0, counts[index] + delta));
  return { ...tally, [scene]: counts };
}
export function loadTallies(): Tally {
  const value = readSession<Tally>("tallies", {});
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter(
      ([id, counts]) =>
        /^v\d\d$/.test(id) &&
        Array.isArray(counts) &&
        counts.length <= 3 &&
        counts.every((n) => Number.isInteger(n) && n >= 0 && n <= 999),
    ),
  );
}
export function loadActivities(key: string): Record<string, ActivityState> {
  const value = readSession<Record<string, ActivityState>>(key, {});
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter(
      ([id, v]) =>
        /^[sv]\d\d$/.test(id) &&
        v &&
        typeof v === "object" &&
        (v.choice === undefined ||
          (Number.isInteger(v.choice) && v.choice >= 0 && v.choice <= 2)) &&
        (v.carousel === undefined ||
          (Number.isInteger(v.carousel) &&
            v.carousel >= 0 &&
            v.carousel <= 2)) &&
        (v.message === undefined ||
          (Number.isInteger(v.message) && v.message >= 0 && v.message <= 4)),
    ),
  );
}
export function clampScene(input: string | null) {
  const n = Number(input);
  return Number.isInteger(n) ? Math.min(20, Math.max(1, n || 1)) : 1;
}
