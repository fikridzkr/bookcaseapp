if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((reg) => console.log('Service Worker resigistered'))
    .catch((err) => console.log('sw register error', err));
}
