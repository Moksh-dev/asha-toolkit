import { readdir, readFile, writeFile, copyFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";

await copyFile("portable/index.html", "dist/offline-toolkit.html");
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((e) =>
      e.isDirectory() ? files(join(dir, e.name)) : join(dir, e.name),
    ),
  );
  return nested.flat();
}
const paths = (await files("dist")).filter((p) => !p.endsWith("sw.js")).sort();
const hash = createHash("sha256");
for (const path of paths) hash.update(await readFile(path));
const version = hash.digest("hex").slice(0, 12);
const urls = paths.map(
  (path) => "/" + path.replaceAll("\\", "/").replace(/^dist\//, ""),
);
const worker = `const CACHE='asha-toolkit-${version}';
const ASSETS=${JSON.stringify(urls)};
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('asha-toolkit-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(caches.open(CACHE).then(async cache => (await cache.match(event.request, {ignoreSearch:true,ignoreVary:true})) || (await cache.match('/index.html')) || fetch(event.request)));
  } else {
    event.respondWith(caches.open(CACHE).then(cache => cache.match(event.request, {ignoreSearch:true,ignoreVary:true})).then(hit => hit || fetch(event.request)));
  }
});`;
await writeFile("dist/sw.js", worker);
console.log(
  `Offline build: ${urls.length} local assets precached; single-file edition included (${version}).`,
);
