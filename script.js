// ✅ WhatsApp Booking Function
function sendWhatsAppBooking() {
    if (validateForm()) {

        const name = document.getElementById('name').value;
        const phoneNum = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const message = document.getElementById('message').value || 'None';

        // ✅ Basic phone validation
        if (phoneNum.length < 10) {
            alert("Enter valid phone number");
            return;
        }

        const whatsappPhone = '918923568275';

        const text = `🚀 MRA SALON - New Booking Request

👤 Name: ${name}
📞 Phone: ${phoneNum}
✉️ Email: ${email}
✂️ Service: ${service}
📅 Date: ${date}
⏰ Time: ${time}
💬 Notes: ${message}`;

        // ✅ Open WhatsApp
        const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
window.location.href = `intent://${url.replace('https://', '')}#Intent;scheme=https;package=com.whatsapp;end`;
}

        // ✅ Save booking locally
        saveBooking();

        // ✅ Show success
        showThanks('Booking sent to WhatsApp! Check your WhatsApp.');

        // ✅ Reset form
        document.getElementById('bookingForm').reset();
    }
}

// ✅ Form Validation
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
            }, 2000);

            alert(`Please fill ${field}`);
            input.focus();
            return false;
        }
    }
    return true;
}

// ✅ Save to Local Storage
function saveBooking() {
    const booking = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value || '',
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        message: document.getElementById('message').value || '',
        timestamp: new Date().toLocaleString('en-IN')
    };

    let bookings = JSON.parse(localStorage.getItem('mraBookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('mraBookings', JSON.stringify(bookings));
}

// ✅ Thanks Modal
function showThanks(msg) {
    const modal = document.getElementById('thanksModal');
    const message = document.getElementById('thanksMessage');

    if (modal && message) {
        message.textContent = msg;
        modal.style.display = 'block';
    }
}

// ✅ Close Modal
document.querySelectorAll('.close, .close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
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

// ✅ Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// ✅ Close menu on click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// ✅ Lightbox
function openLightbox(imgSrc, imgAlt) {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImg');

    if (modal && img) {
        img.src = imgSrc;
        img.alt = imgAlt;
        modal.style.display = 'block';
    }
}

// ✅ Image click handler
document.addEventListener('click', function(e) {
    const item = e.target.closest('.gallery-item, .style-card');

    if (item) {
        const img = item.querySelector('img');
        if (img) {
            openLightbox(img.src, img.alt);
        }
    }
});


// ✅ Service Modal
window.addEventListener('load', function() {

    const services = {
        'Haircut': { desc: 'Premium haircut with styling consultation.', price: '₹500-1500' },
        'Beard Trim': { desc: 'Expert beard grooming.', price: '₹300-800' },
        'Hair Dye': { desc: 'Professional hair coloring.', price: '₹1000-2500' },
        'Facial': { desc: 'Deep cleansing facial.', price: '₹600-1200' },
        'Style Consultation': { desc: 'Personal styling advice.', price: '₹300' }
    };

    document.querySelectorAll('.view-btn, .book-btn').forEach(btn => {

        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const serviceName = btn.dataset.service;
            const data = services[serviceName] || { desc: 'Premium service', price: 'Contact Us' };

            const modal = document.getElementById('serviceModal');

            if (modal) {
                document.getElementById('modalTitle').textContent = serviceName;
                document.getElementById('modalDesc').textContent = data.desc;
                document.getElementById('modalPrice').textContent = data.price;

                modal.style.display = 'block';
            }
        });
    });

    const modalBookBtn = document.getElementById('modalBookBtn');

    if (modalBookBtn) {
        modalBookBtn.addEventListener('click', () => {
            const serviceName = document.getElementById('modalTitle').textContent;
            localStorage.setItem('selectedService', serviceName);
            window.location.href = 'book.html';
        });
    }
});
