import { test, expect } from "@playwright/test";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

test("all routes, both full journeys, projector fit and shared visual system", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Awareness that leads to action/i }),
  ).toBeVisible();
  await expect(page.locator(".toolkit-card")).toHaveCount(2);
  await page.screenshot({ path: "evidence/desktop-home.png", fullPage: true });
  for (const edition of ["school", "volunteer"]) {
    await page.goto(`/${edition}`);
    await expect(
      page.getByRole("link", {
        name:
          edition === "school" ? "Begin Presentation" : "Start Presentation",
        exact: true,
      }),
    ).toBeVisible();
    await page.screenshot({
      path: `evidence/desktop-${edition}-overview.png`,
      fullPage: true,
    });
    for (let scene = 1; scene <= 20; scene++) {
      await page.goto(`/${edition}/present?scene=${scene}`);
      await expect(page.locator("#scene-title")).toBeVisible();
      await expect(page.getByRole("progressbar")).toHaveAttribute(
        "aria-valuenow",
        String(scene),
      );
      const fit = await page.locator(".scene-stage").evaluate((el) => ({
        height: el.clientHeight,
        scroll: el.scrollHeight,
        width: el.clientWidth,
        scrollWidth: el.scrollWidth,
      }));
      expect(
        fit.scroll,
        `${edition} scene ${scene} vertical fit`,
      ).toBeLessThanOrEqual(fit.height + 2);
      expect(
        fit.scrollWidth,
        `${edition} scene ${scene} horizontal fit`,
      ).toBeLessThanOrEqual(fit.width + 2);
      expect(
        await page.evaluate(() => document.documentElement.scrollHeight),
        `${edition} scene ${scene} projector controls fit`,
      ).toBeLessThanOrEqual(722);
      if (
        ([1, 3, 6, 9, 13, 16, 18, 20].includes(scene) &&
          edition === "school") ||
        (edition === "volunteer" && [13, 17].includes(scene))
      )
        await page.screenshot({
          path: `evidence/projector-${edition}-${scene}.png`,
        });
    }
  }
  await page.goto("/resources");
  await expect(page.locator(".resource-card")).toHaveCount(4);
  await page.goto("/school/guide");
  await expect(page.locator(".guide-scenes section")).toHaveCount(20);
  await page.goto("/volunteer/guide");
  await expect(page.locator(".guide-scenes section")).toHaveCount(20);
  expect(errors).toEqual([]);
});

test("keyboard, fullscreen, accessibility settings and navigation boundaries", async ({
  page,
}) => {
  await page.goto("/school/present");
  await page.locator("#scene-title").press("ArrowRight");
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "2",
  );
  await page.locator("#scene-title").press("End");
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "20",
  );
  await page.locator("#scene-title").press("Home");
  await expect(
    page.getByRole("button", { name: "Previous scene", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Enter fullscreen" }).click();
  await expect
    .poll(() => page.evaluate(() => !!document.fullscreenElement))
    .toBe(true);
  await page.getByRole("button", { name: "Exit fullscreen" }).click();
  await expect
    .poll(() => page.evaluate(() => !!document.fullscreenElement))
    .toBe(false);
  await page
    .getByRole("button", { name: "Accessibility and presentation settings" })
    .click();
  await page.getByRole("checkbox", { name: /Reduce motion/ }).check();
  await expect(page.locator("html")).toHaveAttribute(
    "data-reduced-motion",
    "true",
  );
  await page.getByRole("dialog").press("ArrowRight");
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "1",
  );
  await page.getByRole("dialog").press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Accessibility and presentation settings" })
    .click();
  await page.getByRole("checkbox", { name: /Reduce motion/ }).uncheck();
  await page.getByRole("button", { name: "Skip current animation" }).click();
  await expect(page.locator(".presentation-canvas")).toHaveClass(/reduced/);
  await page.locator("#scene-title").press("r");
  await expect(page.locator(".presentation-canvas")).not.toHaveClass(/reduced/);
  await page.getByRole("button", { name: "Choose a scene" }).click();
  await page
    .getByRole("button", { name: /06 Let’s question an assumption/ })
    .click();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "6",
  );
});

test("myths, messages, scenarios, branching and all five quiz explanations", async ({
  page,
}) => {
  await page.goto("/school/present?scene=6");
  await page.locator(".myth-card").click();
  await expect(page.locator(".myth-feedback")).toContainText("Myth.");
  await page.locator(".myth-card").click();
  await expect(page.locator(".myth-card")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await page.goto("/school/present?scene=7");
  await page.locator(".myth-card").click();
  await expect(page.locator(".myth-feedback")).toContainText("Reality.");
  await page.goto("/school/present?scene=9");
  for (let n = 2; n <= 4; n++) {
    await page.getByRole("button", { name: "Next message" }).click();
    await expect(page.locator(".message-bubble")).toHaveCount(n);
  }
  await expect(
    page.getByRole("button", { name: "Next message" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Start again", exact: true }).click();
  await expect(page.locator(".message-bubble")).toHaveCount(1);
  await page.goto("/school/present?scene=10");
  await page.locator(".choice").nth(0).click();
  await expect(page.locator(".choice-feedback")).toContainText(
    "There is still a way",
  );
  await page.locator(".choice").nth(2).click();
  await expect(page.locator(".choice-feedback")).toContainText(
    "A safer next step",
  );
  await page.goto("/school/present?scene=13");
  await page
    .getByRole("button", { name: "Proceed despite the missing details." })
    .click();
  await expect(page.locator(".branch-result")).toContainText(
    "You can still change direction",
  );
  await page
    .getByRole("button", { name: "Verify with a trusted adult." })
    .click();
  await expect(page.locator(".branch-result")).toContainText(
    "More information",
  );
  await page.goto("/school/present?scene=18");
  for (let n = 0; n < 5; n++) {
    await page.locator(".quiz-options .choice").nth(0).click();
    await expect(page.locator(".quiz-question .choice-feedback")).toBeVisible();
    if (n < 4)
      await page
        .getByRole("button", { name: "Next question", exact: true })
        .click();
  }
  await expect(page.locator(".quiz-completion")).toContainText(
    "All five questions explored",
  );
  await page.getByRole("button", { name: "Next scene", exact: true }).click();
  await page
    .getByRole("button", { name: "Previous scene", exact: true })
    .click();
  await expect(page.locator(".quiz-completion")).toContainText(
    "All five questions explored",
  );
});

test("volunteer setup, private local tallies, timers, reset, carousel and summary export", async ({
  page,
}) => {
  await page.goto("/volunteer");
  await page.getByLabel("Session duration").selectOption("30");
  await page.getByLabel("Session format").selectOption("Online workshop");
  await page
    .getByRole("checkbox", { name: "Enable anonymous group tallies" })
    .check();
  await page
    .getByRole("link", { name: "Start Presentation", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Facilitator tools", exact: true })
    .click();
  await page.getByRole("button", { name: "Start timer", exact: true }).click();
  await expect(page.getByLabel("Session elapsed time")).not.toHaveText("00:00");
  await page.getByRole("button", { name: "Pause timer", exact: true }).click();
  const elapsed = await page.getByLabel("Session elapsed time").textContent();
  await page
    .getByRole("button", { name: "Start activity timer", exact: true })
    .click();
  await expect(page.locator(".activity-timer")).toContainText("Time remaining");
  await page
    .getByRole("button", { name: "Stop activity timer", exact: true })
    .click();
  await page.getByRole("button", { name: "Choose a scene" }).click();
  await page
    .getByRole("button", { name: /07 Make room to change your mind/ })
    .click();
  await page
    .getByRole("button", { name: "Add one to Myth", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Add one to Myth", exact: true })
    .click();
  await expect(page.getByLabel("Myth tally", { exact: true })).toHaveText("2");
  await page
    .getByRole("button", { name: "Session summary", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toContainText("Myth: 2");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export summary" }).click();
  expect((await download).suggestedFilename()).toBe(
    "asha-anonymous-session-summary.json",
  );
  await page.getByRole("button", { name: "Close dialog" }).click();
  await expect(page.getByLabel("Session elapsed time")).toHaveText(elapsed!);
  await page.getByRole("button", { name: "Reset current activity" }).click();
  await expect(page.getByLabel("Myth tally", { exact: true })).toHaveText("0");
  await page.goto("/volunteer/present?scene=13");
  await page.getByRole("button", { name: "Workplace", exact: true }).click();
  await expect(page.locator(".situation-card")).toContainText("worker says");
  await page
    .getByRole("button", { name: "Facilitator tools", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Session summary", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Clear session data", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Clear session", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("production service worker supports direct offline routes and both editions", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/resources");
  await expect(page.getByRole("status")).toContainText("Offline ready", {
    timeout: 20000,
  });
  await context.setOffline(true);
  await page.goto("http://127.0.0.1:4173/school/present?scene=9");
  await expect(page.locator("#scene-title")).toContainText(
    "A message deserves",
  );
  await page.getByRole("button", { name: "Next message" }).click();
  await expect(page.locator(".message-bubble")).toHaveCount(2);
  await page.goto("http://127.0.0.1:4173/volunteer/present?scene=17");
  await expect(page.locator("#scene-title")).toContainText("Stay calm");
  await page.reload();
  await expect(page.locator(".asha-logo img")).toBeVisible();
  await page.screenshot({ path: "evidence/offline-volunteer-protocol.png" });
  await context.close();
});

test("packaged single HTML runs fully offline without any asset request", async ({
  browser,
}) => {
  const context = await browser.newContext({ offline: true });
  const page = await context.newPage();
  const remoteRequests: string[] = [];
  page.on("request", (req) => {
    if (/^https?:/.test(req.url())) remoteRequests.push(req.url());
  });
  await page.goto(pathToFileURL(resolve("dist/offline-toolkit.html")).href);
  await expect(page.locator(".toolkit-card")).toHaveCount(2);
  await page
    .getByRole("link", { name: "Open School Toolkit", exact: true })
    .click();
  await page
    .getByRole("link", { name: "Begin Presentation", exact: true })
    .click();
  await expect(page.locator("#scene-title")).toContainText("Awareness begins");
  await page.goto(
    pathToFileURL(resolve("dist/offline-toolkit.html")).href +
      "#/volunteer/present?scene=13",
  );
  await page.getByRole("button", { name: "Community", exact: true }).click();
  await expect(page.locator(".situation-card")).toContainText("young person");
  await page.screenshot({ path: "evidence/single-file-offline.png" });
  expect(remoteRequests).toEqual([]);
  await context.close();
});

test("mobile navigation and all 40 scene layouts stay within the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of [
    "/",
    "/school",
    "/volunteer",
    "/resources",
    "/school/guide",
    "/volunteer/guide",
  ]) {
    await page.goto(route);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(390);
    if (route === "/" || route === "/volunteer")
      await page.screenshot({
        path: `evidence/mobile-${route === "/" ? "home" : "volunteer-overview"}.png`,
        fullPage: true,
      });
  }
  for (const edition of ["school", "volunteer"])
    for (let scene = 1; scene <= 20; scene++) {
      await page.goto(`/${edition}/present?scene=${scene}`);
      await expect(page.locator("#scene-title")).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        `${edition} scene ${scene} mobile width`,
      ).toBeLessThanOrEqual(390);
      if (
        (edition === "school" && [6, 9, 18].includes(scene)) ||
        (edition === "volunteer" && scene === 17)
      )
        await page.screenshot({
          path: `evidence/mobile-${edition}-${scene}.png`,
          fullPage: true,
        });
    }
});

test("reduced motion, core text contrast, expanded activities and accessible control names", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/school/present");
  expect(
    await page
      .locator(".identity-entrance")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page
    .getByRole("button", { name: "Accessibility and presentation settings" })
    .click();
  await expect(
    page.getByRole("checkbox", { name: /Reduce motion/ }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Close dialog" }).click();
  const tokens = await page.evaluate(() => {
    const s = getComputedStyle(document.documentElement);
    return Object.fromEntries(
      ["paper", "surface", "ink", "muted", "primary", "primary-dark"].map(
        (key) => [key, s.getPropertyValue(`--asha-${key}`).trim()],
      ),
    );
  });
  const luminance = (hex: string) => {
    const channels = hex
      .replace("#", "")
      .match(/../g)!
      .map((c) => parseInt(c, 16) / 255)
      .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  for (const [fg, bg] of [
    ["ink", "paper"],
    ["muted", "surface"],
    ["paper", "primary"],
    ["primary-dark", "paper"],
  ]) {
    const values = [luminance(tokens[fg]), luminance(tokens[bg])].sort(
      (a, b) => b - a,
    );
    expect(
      (values[0] + 0.05) / (values[1] + 0.05),
      `${fg} on ${bg} contrast`,
    ).toBeGreaterThanOrEqual(4.5);
  }
  for (const scene of [10, 18]) {
    await page.goto(`/school/present?scene=${scene}`);
    await page
      .locator(scene === 10 ? ".choice-list .choice" : ".quiz-options .choice")
      .first()
      .click();
    const fit = await page
      .locator(".scene-stage")
      .evaluate((el) => el.scrollHeight <= el.clientHeight + 2);
    expect(fit, `expanded scene ${scene} stays on canvas`).toBe(true);
    await page.screenshot({
      path: `evidence/projector-school-${scene}-feedback.png`,
    });
  }
  const unnamed = await page
    .getByRole("button")
    .evaluateAll(
      (buttons) =>
        buttons.filter(
          (button) =>
            !button.getAttribute("aria-label") && !button.textContent?.trim(),
        ).length,
    );
  expect(unnamed).toBe(0);
});
