const CACHE = "repodrive-0.1.5.1";
self.addEventListener("install", event => {
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  // Network-first: do not cache HTML/JS aggressively during development/deploys.
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
