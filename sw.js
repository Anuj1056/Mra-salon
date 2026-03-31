const CACHE_NAME = 'mra-salon-v1';
const urlsToCache = [
  './',
  'index.html',
  'styles.html',
  'services.html',
  'gallery.html',
  'book.html',
  'styles.css',
  'script.js',
  'logo.jpeg',
  'manifest.json',
  'hair-dye-men-salon-800x534.webp',
  'cutting-beard-barber-salon.avif',
  'facial.webp',
  'Curly_Hairstyle_hannusaraf_480x480.webp',
  'Long_and_Wavy_Hairstyle_Bhuvan_Bam_480x480.webp',
  'Man_Bun_Hairstyle_480x480.webp',
  'Pompadour_Hairstyle_Ranveer_Singh_480x480.webp',
  'Long_and_Wavy_Haircut_with_Beard_2_480x480.webp',
  'Long_Layered_Hairstyles_Men_for_Oval_Face_480x480.webp',
  'Messy_Curls_for_Indian_Men_with_Round_Face_480x480.webp',
  'Side_Part_Pompadour_Haircut_without_Beard_0e46cf4f-73c6-49e9-972a-592de7f892fe_480x480.webp',
  'Slicked_Back_Hairstyle_480x480.webp',
  'Spiky_Haircut_for_Men_480x480.jpg',
  'Medium_Length_Curls_for_Indian_Men_480x480.webp',
  'Messy_Quiff_with_Moustache_for_Men_with_Oval_Face_480x480.webp',
  'Ponytail_Hairstyle_for_Men_with_Beard_480x480.webp',
  'Short_Quiff_Faded_Without_Beard_For_Indian_Men_480x480.webp',
  'golden-beard-logo.avif'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
