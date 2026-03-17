// Full fixed script.js - copy this over original if edits fail
// Enhanced Mobile Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Custom Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

['a', 'button', '.gold-btn', '.view-btn', '.book-btn', '.gallery-item'].forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('glow'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('glow'));
    });
});

// Service Styles Data (Enhanced)
const styleServices = {
    'Curly Hairstyle': { desc: 'Perfect curls for volume and texture. Ideal for natural wave enhancement.', price: '₹800-1500' },
    'Long Wavy': { desc: 'Elegant waves for long hair lovers. Layered cut for movement.', price: '₹1000-1800' },
    'Man Bun': { desc: 'Modern man bun with precision fade. Beard styling included.', price: '₹700-1200' },
    'Medium Curls': { desc: 'Balanced medium length curls with defined shape.', price: '₹900-1600' },
    'Messy Quiff': { desc: 'Textured messy quiff with modern edge.', price: '₹600-1100' },
    'Pompadour': { desc: 'Classic pompadour with maximum volume.', price: '₹800-1400' },
    'Ponytail': { desc: 'Sleek high ponytail with beard trim combo.', price: '₹500-900' },
    'Short Quiff': { desc: 'Clean short quiff fade for daily styling.', price: '₹400-800' }
};

// Services Prices
const services = {
    'Haircut': { desc: 'Premium haircut with styling consultation.', price: '₹500-1500' },
    'Beard Trim': { desc: 'Expert beard shaping and grooming.', price: '₹300-800' },
    'Hair Dye': { desc: 'Professional color application with aftercare.', price: '₹1000-2500' },
    'Facial': { desc: 'Luxury facial treatment for deep cleansing.', price: '₹600-1200' },
    'Style Consultation': { desc: 'Personalized style advice session.', price: '₹300' }
};

// DOM Elements
const serviceModal = document.getElementById('serviceModal');
const lightboxModal = document.getElementById('lightboxModal');
const thanksModal = document.getElementById('thanksModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const modalBookBtn = document.getElementById('modalBookBtn');
const lightboxImg = document.getElementById('lightboxImg');
const form = document.getElementById('bookingForm');
const whatsappBtn = document.getElementById('whatsappBtn');
const emailBtn = document.getElementById('emailBtn');
const submitBtn = document.getElementById('submitBtn');

// FIXED Service Modal Event Listeners - View Details buttons now work
document.addEventListener('DOMContentLoaded', function() {
    console.log('Service buttons initialized - DOM fully loaded');
document.querySelectorAll('.view-btn, .book-btn').forEach((btn, index) => {
        console.log(`Button ${index + 1}:`, btn.dataset.service || 'NO DATA');
        btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const serviceName = btn.dataset.service;
        console.log('Clicked service:', serviceName);
        const data = styleServices[serviceName] || services[serviceName];
        console.log('Found data:', data);
        if (data) {
            modalTitle.textContent = serviceName;
            modalDesc.textContent = data.desc;
            modalPrice.textContent = data.price;
            serviceModal.style.display = 'block';
            serviceModal.style.zIndex = '10000';
            serviceModal.style.opacity = '1';
            serviceModal.style.visibility = 'visible';
            serviceModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Modal opened successfully');
        } else {
            console.error('No data for service:', serviceName);
            alert(`No details found for "${serviceName}". Check console.`);
        }
    });
})});

// Modal Management
document.querySelectorAll('.close, .close-modal').forEach(close => {
    close.addEventListener('click', closeModals);
});

function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
        modal.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
}

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModals();
    }
});

// Smooth Scroll to Book
document.querySelectorAll('.book-btn, .cta-btn, #modalBookBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.dataset.service) {
            document.getElementById('service').value = btn.dataset.service;
        }
        if (e.currentTarget.id !== 'modalBookBtn') {
            document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
        }
        closeModals();
    });
});

// Enhanced Form Handling with Loading States
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (validateForm()) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        saveBooking();
        showThanks('Your booking has been confirmed! We\'ll contact you within 24 hours.');
        form.reset();
    }
});

function validateForm() {
    const required = ['name', 'phone', 'service', 'date'];
    for (let field of required) {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            input.style.borderColor = '#ff4444';
            input.style.boxShadow = '0 0 10px rgba(255,68,68,0.3)';
            setTimeout(() => {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            }, 3000);
            alert(`Please fill ${input.placeholder || field}`);
            input.focus();
            return false;
        }
    }
    return true;
}

function saveBooking() {
    const booking = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value || '',
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    let bookings = JSON.parse(localStorage.getItem('mraBookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('mraBookings', JSON.stringify(bookings));
}

function showThanks(message = 'Your booking request has been saved and sent.') {
    document.getElementById('thanksMessage').textContent = message;
    thanksModal.style.display = 'block';
    submitBtn.innerHTML = 'Submit Booking';
    submitBtn.disabled = false;
}

// WhatsApp & Email Integration
const phone = '+91-8923568275';
const email = 'info@mrasalon.com';

whatsappBtn.addEventListener('click', () => {
    if (validateForm()) {
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const text = `🚀 New Booking Request\n\n👤 Name: ${document.getElementById('name').value}\n📞 Phone: ${document.getElementById('phone').value}\n✂️ Service: ${service}\n📅 Date: ${date}\n💬 Notes: ${document.getElementById('message').value || 'None'}`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    }
});

emailBtn.addEventListener('click', () => {
    if (validateForm()) {
        const subject = `New Booking: ${document.getElementById('service').value} - ${document.getElementById('name').value}`;
        const body = `Name: ${document.getElementById('name').value}\nPhone: ${document.getElementById('phone').value}\nEmail: ${document.getElementById('email').value || 'Not provided'}\nService: ${document.getElementById('service').value}\nDate: ${document.getElementById('date').value}\nMessage: ${document.getElementById('message').value}`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
});

// Lightbox Gallery
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightboxModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Enhanced Scroll Animations with Stagger
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${index * 0.1}s`;
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all animated elements with stagger
document.querySelectorAll('.fade-in').forEach((el, index) => {
    observer.observe(el);
});

// Hero elements auto-animate
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Parallax effect for style cards on hover
document.querySelectorAll('.style-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.transform = `translateY(-20px) rotateX(${(y / rect.height - 0.5) * 10}deg) rotateY(${(x / rect.width - 0.5) * 10}deg) scale(1.03)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-20px) scale(1.03)';
    });
});

// Form input focus effects
['input', 'select', 'textarea'].forEach(tag => {
    document.querySelectorAll(`#bookingForm ${tag}`).forEach(input => {
        input.addEventListener('focus', () => {
            input.parentNode.style.transform = 'scale(1.02)';
        });
        input.addEventListener('blur', () => {
            input.parentNode.style.transform = 'scale(1)';
        });
    });
});

// Page load stagger for sections
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease';
    sectionObserver.observe(section);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10,10,10,0.98)';
        navbar.style.backdropFilter = 'blur(30px)';
    } else {
        navbar.style.background = 'rgba(10,10,10,0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
});

// LocalStorage Bookings Viewer (Dev tool)
if (window.location.hash === '#bookings') {
    const bookings = JSON.parse(localStorage.getItem('mraBookings') || '[]');
    console.table(bookings);
    alert(`Total Bookings: ${bookings.length}\\nCheck console for details (F12)`);
}
