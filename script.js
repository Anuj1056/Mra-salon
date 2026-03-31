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
        
        const whatsappPhone = '918923568275'; // +91 8923568275
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

// Event delegation for gallery items (works on current and dynamic content)
document.addEventListener('click', function(e) {
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
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Service Modal (for other pages) - Fixed with logs
window.addEventListener('load', function() {


    document.querySelectorAll('.view-btn, .book-btn').forEach(btn => {

        btn.addEventListener('click', (e) => {
            // First open photo lightbox for style card
            e.preventDefault();
            
            const card = btn.closest('.style-card');
            if (card) {
                const img = card.querySelector('img');
                if (img) {
                    openLightbox(img.src, img.alt);
                    return;
                }
            }
            
            const serviceName = btn.dataset.service;

            const services = {
                'Haircut': { desc: 'Premium haircut with styling consultation.', price: '₹500-1500' },
                'Beard Trim': { desc: 'Expert beard shaping and grooming.', price: '₹300-800' },    
                'Hair Dye': { desc: 'Professional color application with aftercare.', price: '₹1000-2500' },
                'Facial': { desc: 'Luxury facial treatment for deep cleansing.', price: '₹600-1200' },
'Style Consultation': { desc: 'Personalized style advice session.', price: '₹300' },        
                'Curly Hairstyle': { desc: 'Perfect curls with premium styling.', price: '₹800-1500' },
                'Long Wavy': { desc: 'Elegant long wavy haircut.', price: '₹1000-2000' },
                'Man Bun': { desc: 'Modern man bun styling.', price: '₹700-1200' },
                'Pompadour': { desc: 'Classic pompadour with volume.', price: '₹900-1600' },
                'Medium Curls': { desc: 'Medium length curls maintenance.', price: '₹600-1100' },
                'Messy Quiff': { desc: 'Trendy messy quiff look.', price: '₹800-1400' },
                'Ponytail': { desc: 'Sophisticated ponytail styling.', price: '₹500-1000' },
                'Short Quiff': { desc: 'Clean short quiff fade.', price: '₹500-900' }
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
