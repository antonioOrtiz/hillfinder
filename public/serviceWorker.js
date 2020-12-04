var currentCaches = {
  css: 'CSS',
  images: 'images'
};

const cacheFiles = {
  css: [
    'http://localhost:8016/semantic-ui-css/semantic.min.css',
    'http://localhost:8016/font-awesome/css/font-awesome.min.css',

    'http://localhost:8016/leaflet/dist/leaflet.css',
    'http://localhost:8016/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css',

    'http://localhost:8016/styles/styles.css',
    'http://localhost:8016/leaflet-routing-machine/dist/leaflet-routing-machine.css'
  ],
  images: [
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    'http://localhost:8016/public/static/media/search@2x.png',
    'http://localhost:8016/public/static/uploads/profile-avatars/placeholder.jpg'
  ]
};

self.addEventListener('install', function(event) {
  console.log('Hello world from the Service Worker 🤙');
  event.waitUntil(
    Promise.all([
      caches.open(currentCaches.css).then(cache => {
        return cache.addAll(cacheFiles.css);
      }),
      caches.open(currentCaches.images).then(cache => {
        return cache.addAll(cacheFiles.images);
      })
    ])
  );
});
