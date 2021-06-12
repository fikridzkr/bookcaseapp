const staticCache = 'static-cache';
const dynamicCache = 'dynamic-cache';
const assets = [
  '/',
  '/index.html',
  '/js/config.js',
  '/js/data.js',
  '/js/main.js',
  '/js/script.js',
  'css/style.css',
  'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,800;1,300&display=swap',
];
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(staticCache).then((cache) => {
      cache.addAll(assets);
    }),
  );
});

self.addEventListener('activate', (e) => {
  console.log('sw is active!');
});

self.addEventListener('fetch', (e) => {
  if (!(e.request.url.indexOf('http') === 0)) return;
  e.respondWith(
    caches.match(e.request).then((staticRes) => {
      return (
        staticRes ||
        fetch(e.request).then((dynamicRes) => {
          return caches.open(dynamicCache).then((cache) => {
            cache.put(e.request.url, dynamicRes.clone());
            limitCacheSize(dynamicCache, 75);
            return dynamicRes;
          });
        })
      );
    }),
  );
});

const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};
