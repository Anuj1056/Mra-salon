// Full fixed script.js - WhatsApp booking fixed

// WhatsApp Booking Function
function sendWhatsAppBooking() {
    if (validateForm()) {
        const name = document.getElementById('name').value;
        const phoneNum = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const message = document.getElementById('message').value || 'None';
        
        const whatsappPhone = '8923568275'; // +91 8923568275
        const text = `🚀 MRA SALON - New Booking Request\n\n👤 Name: ${name}\n📞 Phone: ${phoneNum}\n✉️ Email: ${email}\n✂️ Service: ${service}\n📅 Date: ${date}\n🕐 Time: ${time}\n💬 Notes: ${message}`;
        
        window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`, '_blank');
        
        // Local save
        saveBooking();
        showThanks('Booking sent to WhatsApp! Check your WhatsApp.');
        document.getElementById('bookingForm').reset();
    }
}

// Form validation
function validateForm() {
const required = ['name', 'phone', 'service', 'date', 'time'];

    for (let field of required) {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            input.style.borderColor = '#ff4444';
            input.style.boxShadow = '0 0 10px rgba(255,68,68,0.3)';
            setTimeout(() => {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            }, 3000);
            alert(`Please fill ${field}`);
            input.focus();
            return false;
        }
    }
    return true;
}

// Local storage save
function saveBooking() {
    const booking = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value || '',
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toLocaleString('en-IN')
    };

    let bookings = JSON.parse(localStorage.getItem('mraBookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('mraBookings', JSON.stringify(bookings));
}

// Thanks modal
function showThanks(msg) {
    document.getElementById('thanksMessage').textContent = msg;
    document.getElementById('thanksModal').style.display = 'block';
}

// Modal close
document.querySelectorAll('.close, .close-modal').forEach(close => {
    close.addEventListener('click', () => {

        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

// Navbar functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar active state
// Navbar active state - moved to load

// Lightbox functionality for photo popups
function openLightbox(imgSrc, imgAlt) {
    const modal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    if (modal && lightboxImg) {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = imgAlt;
        modal.style.display = 'block';
    }
}

// ===== Gallery Upload (Add Photo) =====
const MRA_GALLERY_UPLOAD_KEY = 'mraGalleryUploads';

function safeParseJSON(str, fallback) {
    try {
        return JSON.parse(str);
    } catch {
        return fallback;
    }
}

function getStoredGalleryUploads() {
    const arr = safeParseJSON(localStorage.getItem(MRA_GALLERY_UPLOAD_KEY) || '[]', []);
    return Array.isArray(arr) ? arr : [];
}

function saveGalleryUploads(images) {
    localStorage.setItem(MRA_GALLERY_UPLOAD_KEY, JSON.stringify(images));
}

function createGalleryItem({ src, alt }) {
    const item = document.createElement('div');
    item.className = 'gallery-item fade-in';
    item.setAttribute('data-lightbox', 'gallery');

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || 'Gallery Photo';

    // Remove button for uploaded images
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-photo-btn';
    removeBtn.setAttribute('data-src', src);
    removeBtn.setAttribute('aria-label', 'Remove Photo');
    removeBtn.textContent = '×';

    item.appendChild(img);
    item.appendChild(removeBtn);
    return item;
}

function loadUploadedGalleryPhotos() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    const uploads = getStoredGalleryUploads();
    uploads.forEach((src) => {
        // Avoid duplicates: if same dataUrl exists already, skip
        const existing = Array.from(grid.querySelectorAll('img')).some(i => i.src === src);
        if (existing) return;
        grid.appendChild(createGalleryItem({ src, alt: 'Uploaded Gallery Photo' }));
    });
}

function handleGalleryFileChange(file) {
    if (!file) return;
    if (!file.type || !file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
    }

    // Basic size guard (localStorage limit). You can adjust.
    const maxBytes = 2.5 * 1024 * 1024; // ~2.5MB
    if (file.size > maxBytes) {
        alert('Image is too large for local storage. Please choose a smaller image (recommended < 2.5MB).');
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        const src = String(reader.result);
        const grid = document.getElementById('galleryGrid');
        if (!grid) return;

        // Prevent duplicate adds
        const uploads = getStoredGalleryUploads();
        if (uploads.includes(src)) return;

        grid.appendChild(createGalleryItem({ src, alt: file.name || 'Uploaded Gallery Photo' }));
        uploads.push(src);
        saveGalleryUploads(uploads);
    };
    reader.readAsDataURL(file);
}

function initGalleryUploads() {
    const addBtn = document.getElementById('addPhotoBtn');
    const fileInput = document.getElementById('galleryFileInput');

    if (!addBtn || !fileInput) return;

    addBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        handleGalleryFileChange(file);
        // allow re-uploading same file
        fileInput.value = '';
    });
}

// Initialize gallery upload + load saved photos on page load
window.addEventListener('load', () => {
    initGalleryUploads();
    loadUploadedGalleryPhotos();
});

// Event delegation for gallery items (lightbox + remove uploaded photos)
document.addEventListener('click', function(e) {
    // Remove button (only for uploaded photos)
    const removeBtn = e.target.closest('.remove-photo-btn');
    if (removeBtn) {
        e.preventDefault();
        const srcToRemove = removeBtn.getAttribute('data-src');
        if (!srcToRemove) return;

        const uploads = getStoredGalleryUploads();
        const next = uploads.filter(u => u !== srcToRemove);
        saveGalleryUploads(next);

        // Remove from DOM
        const item = e.target.closest('.gallery-item');
        if (item) item.remove();
        return;
    }

    // Lightbox
    if (e.target.closest('.gallery-item') || e.target.closest('.style-card img')) {
        e.preventDefault();
        const img = e.target.closest('.gallery-item, .style-card')?.querySelector('img') || e.target;
        if (img && img.src) {
            openLightbox(img.src, img.alt);
        }
    }
});




// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Service Modal (for other pages) - Fixed with logs
window.addEventListener('load', function() {


    document.querySelectorAll('.view-btn, .book-btn').forEach(btn => {

        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const card = btn.closest('.style-card, .service-card');
            const serviceName = btn.dataset.service || card?.dataset.service;
            if (!serviceName) return;

            const services = {
                'Haircut': { desc: 'Premium haircut with styling consultation.', price: '₹50-150' },
                'Beard Trim': { desc: 'Expert beard shaping and grooming.', price: '₹30-80' },
                'Hair Dye': { desc: 'Professional color application with aftercare.', price: '₹100-250' },
                'Facial': { desc: 'Luxury facial treatment for deep cleansing.', price: '₹250-1200' },
                'Style Consultation': { desc: 'Personalized style advice session.', price: 'free' },
                'Curly Hairstyle': { desc: 'Perfect curls with premium styling.', price: '₹200-500' },
                'Long Wavy': { desc: 'Elegant long wavy haircut.', price: '₹200-500' },
                'Man Bun': { desc: 'Modern man bun styling.', price: '₹200-500' },
                'Pompadour': { desc: 'Classic pompadour with volume.', price: '₹200-600' },
                'Medium Curls': { desc: 'Medium length curls maintenance.', price: '₹200-500' },
                'Messy Quiff': { desc: 'Trendy messy quiff look.', price: '₹200-400' },
                'Ponytail': { desc: 'Sophisticated ponytail styling.', price: '₹200-900' },
                'Short Quiff': { desc: 'Clean short quiff fade.', price: '₹200-500' }
            };
            const data = services[serviceName] || { desc: 'Premium service.', price: 'Contact Us' };

            document.getElementById('modalTitle').textContent = serviceName;
            document.getElementById('modalDesc').textContent = data.desc;
            document.getElementById('modalPrice').textContent = data.price;
            document.getElementById('serviceModal').style.display = 'block';

        });
    });
    
    // Modal Book button handler
    const modalBookBtn = document.getElementById('modalBookBtn');
    if (modalBookBtn) {

        modalBookBtn.addEventListener('click', () => {
            const serviceName = document.getElementById('modalTitle').textContent;

            localStorage.setItem('selectedService', serviceName);
            window.location.href = 'book.html';
        });
    }
    
});
