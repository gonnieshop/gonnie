// ─── GONNIE SERVICE WORKER ───────────────────────────────────────────────────
const CACHE_NAME = 'gonnie-v1';

self.addEventListener('install', function(e) {
  console.log('Gonnie SW instalado');
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  console.log('Gonnie SW activo');
  e.waitUntil(clients.claim());
});

// ─── NOTIFICACIONES PUSH ─────────────────────────────────────────────────────
self.addEventListener('push', function(e) {
  var data = {};
  try { data = e.data ? e.data.json() : {}; } catch(err) {}

  var title   = data.title  || 'Gonnie';
  var body    = data.body   || 'Tienes una nueva notificación';
  var icon    = data.icon   || 'https://i.imgur.com/VCuWiBN.png';
  var url     = data.url    || '/';

  e.waitUntil(
    self.registration.showNotification(title, {
      body:  body,
      icon:  icon,
      badge: icon,
      data:  { url: url },
      vibrate: [200, 100, 200],
    })
  );
});

// ─── CLIC EN NOTIFICACIÓN ────────────────────────────────────────────────────
self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || '/';
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(windowClients) {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
