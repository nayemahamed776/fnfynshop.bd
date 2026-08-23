const CACHE_NAME = "fnfy-cache-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./assets/fnfy-logo.png",
  "./fnfy-logo.png",
  "./assets/facebook.png",
  "./assets/instagram.png",
  "./assets/whatsapp.svg"
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch Event — Cache First Strategy
self.addEventListener("fetch", (event) => {
  // Skip Firebase requests (they need to be live)
  if (event.request.url.includes("firebase") || event.request.url.includes("gstatic")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(event.request)
        .then((response) => {
          // Cache successful GET requests
          if (response.ok && event.request.method === "GET") {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline fallback
          return caches.match("./index.html");
        });
    })
  );
});