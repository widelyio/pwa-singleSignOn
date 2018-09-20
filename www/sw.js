'use strict';

var cacheVersion = 1;
var currentCache = {
    offline: 'offline-cache' + cacheVersion
};

this.addEventListener('install', event => {
    event.waitUntil(
        caches.open(currentCache.offline).then(function (cache) {
            return cache.addAll([
                'https://pwa-single-signon.appspot.com/',
                'https://pwa-single-signon.appspot.com/manifest.json',
                'https://fonts.googleapis.com/css?family=Quicksand',
                'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
                'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'
            ]);
        })
    );
});

this.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
        .then(function (response) {
            return response || fetch(event.request);
        })
    );

});