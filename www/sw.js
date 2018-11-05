self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('tfe').then(function (cache) {
      return cache.addAll([
        '/android-chrome-192x192.png',
        '/android-chrome-512x512.png',
        '/apple-touch-icon.png',
        '/favicon.ico',
        '/favicon-16x16.png',
        '/favicon-32x32.png',
        '/index.html',
        '/manifest.json',
        '/mstile-150x150.png',
        '/safari-pinned-tab.svg',
        '/assets/fonts/TFArrow.css',
        '/assets/fonts/TFArrow-Light.eot',
        '/assets/fonts/TFArrow-Light.html',
        '/assets/fonts/TFArrow-Light.svg',
        '/assets/fonts/TFArrow-Light.ttf',
        '/assets/fonts/TFArrow-Light.woff',
        '/assets/fonts/TFArrow-Light.woff2',
        '/assets/images/fb.png',
        '/assets/images/hotel1.jpg',
        '/assets/images/ig.png',
        '/assets/images/screen-detail_galaxys4_black_portrait.png',
        '/assets/images/screen-home_galaxys4_black_portrait.png',
        '/assets/images/screen-map_galaxys4_black_portrait.png',
        '/assets/images/screen-search_galaxys4_black_portrait.png',
        '/assets/images/tt.png',
        '/assets/images/userMarker.png',
        '/build/css/app.ios.css',
        '/build/css/app.md.css',
        '/build/css/app.wp.css',
        '/build/fonts/ionicons.ttf',
        '/build/fonts/ionicons.woff',
        '/build/fonts/ionicons.woff2',
        '/build/fonts/noto-sans-bold.ttf',
        '/build/fonts/noto-sans-regular.ttf',
        '/build/fonts/roboto-bold.ttf',
        '/build/fonts/roboto-bold.woff',
        '/build/fonts/roboto-light.ttf',
        '/build/fonts/roboto-light.woff',
        '/build/fonts/roboto-medium.ttf',
        '/build/fonts/roboto-medium.woff',
        '/build/fonts/roboto-regular.ttf',
        '/build/fonts/roboto-regular.woff',
        '/build/js/app.bundle.js',
        '/build/js/app.bundle.js.map',
        '/build/js/es6-shim.min.js',
        '/build/js/Reflect.js',
        '/build/js/zone.js',
        '/build/pages/detail/detail.html',
        '/build/pages/flights/list.html',
        '/build/pages/home/home.html',
        '/build/pages/hoteis/list.html',
        '/build/pages/intro/intro.html',
        '/build/pages/list/list.html',
        '/build/pages/places/places.html',
        '/build/pages/roteiro/list.html',
        '/build/pages/subway/list.html',
      ]);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});