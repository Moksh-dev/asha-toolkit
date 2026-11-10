import { mkdir, copyFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const release = resolve(root, "release");
await mkdir(release, { recursive: true });
await copyFile(
  resolve(root, "dist/offline-toolkit.html"),
  resolve(release, "offline-toolkit.html"),
);
await copyFile(
  resolve(root, "OFFLINE_README.txt"),
  resolve(release, "READ-ME-FIRST.txt"),
);
const archive = resolve(release, "ASHA-school-and-volunteer-toolkit.zip");
if (process.platform === "win32") {
  execFileSync(
    "tar.exe",
    [
      "-a",
      "-c",
      "-f",
      archive,
      "-C",
      release,
      "offline-toolkit.html",
      "READ-ME-FIRST.txt",
    ],
    { stdio: "inherit", windowsHide: true },
  );
} else {
  execFileSync(
    "zip",
    [
      "-j",
      archive,
      resolve(release, "offline-toolkit.html"),
      resolve(release, "READ-ME-FIRST.txt"),
    ],
    { stdio: "inherit" },
  );
}
console.log("Packaged both editions for offline sharing.");
