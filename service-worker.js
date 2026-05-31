// ─── GONNIE SERVICE WORKER ───────────────────────────────────────────────────
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBau5bPYB4QHXnckeesmr7V4-EwnPxlFhQ",
  authDomain: "gonnie-26d43.firebaseapp.com",
  projectId: "gonnie-26d43",
  storageBucket: "gonnie-26d43.firebasestorage.app",
  messagingSenderId: "964100080332",
  appId: "1:964100080332:web:f869a37a5b070d2b47f869"
});

const messaging = firebase.messaging();

// Background notifications
messaging.onBackgroundMessage(function(payload) {
  const title = (payload.notification && payload.notification.title) || 'Gonnie';
  const body  = (payload.notification && payload.notification.body)  || 'Nueva notificación';
  self.registration.showNotification(title, {
    body:  body,
    icon:  '/icon.png',
    badge: '/icon.png',
    vibrate: [200, 100, 200],
  });
});

self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});

self.addEventListener('install',  function() { self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(clients.claim()); });
