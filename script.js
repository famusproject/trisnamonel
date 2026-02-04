// ===========================
// Smooth Scroll & Navigation
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinksContainer = document.getElementById('navLinks');

    mobileMenuToggle.addEventListener('click', function () {
        navLinksContainer.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinksContainer.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
});

// ===========================
// AOS (Animate On Scroll) Implementation
// ===========================
class AOS {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        this.observeElements();
        window.addEventListener('scroll', () => this.checkElements());
        this.checkElements(); // Initial check
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, delay);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        this.elements.forEach(element => {
            observer.observe(element);
        });
    }

    checkElements() {
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight && elementBottom > 0) {
                const delay = element.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, delay);
            }
        });
    }
}

// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    new AOS();
});

// ===========================
// Form Handling - WhatsApp Integration
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                interest: document.getElementById('interest').value,
                message: document.getElementById('message').value
            };

            // Format interest type in Indonesian
            const interestTypes = {
                'reseller': 'Reseller',
                'distributor': 'Distributor',
                'wholesale': 'Grosir',
                'other': 'Lainnya'
            };

            // Create WhatsApp message
            const waMessage = `*Halo, Saya Tertarik Untuk Kerja Sama!*

*Nama:* ${formData.name}
*Perusahaan:* ${formData.company}
*Email:* ${formData.email}
*No. Telepon:* ${formData.phone}
*Jenis Kerjasama:* ${interestTypes[formData.interest] || formData.interest}

*Pesan:*
${formData.message}

---
_Pesan ini dikirim melalui website Trisna Monel_`;

            // WhatsApp number (format: country code + number without +, -, or spaces)
            const waNumber = '6289524907552'; // Trisna Monel WhatsApp

            // Encode message for URL
            const encodedMessage = encodeURIComponent(waMessage);

            // Create WhatsApp URL
            const waURL = `https://wa.me/${waNumber}?text=${encodedMessage}`;

            // Open WhatsApp in new tab
            window.open(waURL, '_blank');

            // Show success notification
            showNotification('Mengarahkan ke WhatsApp...', 'success');

            // Reset form after a short delay
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    }
});

// ===========================
// Notification System
// ===========================
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                ${type === 'success' ? '✓' : '!'}
            </div>
            <p>${message}</p>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #F4C2C2 0%, #E8B4B8 100%)' : '#ff4444'};
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

    // Add to body
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-icon {
        width: 30px;
        height: 30px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
    }
    
    .notification-content p {
        margin: 0;
        line-height: 1.5;
    }
`;
document.head.appendChild(style);

// ===========================
// Product Card Interactions
// ===========================
// Product Card Interactions removed - using direct links now

// ===========================
// Parallax Effect for Hero
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        window.addEventListener('scroll', function () {
            const scrollPosition = window.scrollY;
            const heroBackground = document.querySelector('.hero-background');

            if (heroBackground && scrollPosition < window.innerHeight) {
                heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
            }
        });
    }
});

// ===========================
// Floating Cards Animation Enhancement
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    const floatingCards = document.querySelectorAll('.floating-card');

    floatingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.1) translateY(-10px)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
});

// ===========================
// Counter Animation for Stats
// ===========================
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = parseInt(target);
        this.duration = duration;
        this.hasAnimated = false;
    }

    animate() {
        if (this.hasAnimated) return;

        const start = 0;
        const increment = this.target / (this.duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= this.target) {
                current = this.target;
                clearInterval(timer);
                this.hasAnimated = true;
            }
            this.element.textContent = Math.floor(current) + '+';
        }, 16);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const statNumbers = document.querySelectorAll('.stat-number');
    const counters = [];

    statNumbers.forEach(stat => {
        const target = stat.textContent.replace('+', '');
        counters.push(new CounterAnimation(stat, target));
    });

    // Trigger animation when stats section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => counter.animate());
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// ===========================
// Lazy Loading for Images (if added later)
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// ===========================
// Cursor Effect (Premium Touch)
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid rgba(244, 194, 194, 0.5);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    // Only show on desktop
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Enlarge cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .product-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = 'rgba(212, 175, 55, 0.8)';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'rgba(244, 194, 194, 0.5)';
            });
        });
    }
});

// ===========================
// Performance Optimization
// ===========================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(function () {
    // Scroll-dependent functions here
}, 10));

// ===========================
// WhatsApp CTA Buttons
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    // WhatsApp number
    const waNumber = '6289524907552'; // Trisna Monel WhatsApp

    // Get all CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button-nav, .cta-button.primary');

    ctaButtons.forEach(button => {
        // Skip if button is inside form (form has its own handler)
        if (button.type === 'submit') return;

        button.addEventListener('click', function (e) {
            // Only handle if it's not an anchor link
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) return; // Let anchor links work normally

            e.preventDefault();

            // Create WhatsApp message based on button context
            let message = '';
            const buttonText = this.textContent.trim();

            if (buttonText.includes('Hubungi Kami') || buttonText.includes('Ayo Kerja Sama')) {
                message = `Halo Trisna Monel! 👋

Saya tertarik untuk mengetahui lebih lanjut tentang peluang kerjasama dengan Trisna Monel.

Mohon informasi lebih lanjut mengenai:
- Program kemitraan yang tersedia
- Harga untuk mitra bisnis
- Syarat dan ketentuan kerjasama

Terima kasih! 🙏`;
            } else if (buttonText.includes('Lihat Koleksi')) {
                message = `Halo Trisna Monel! 👋

Saya tertarik untuk melihat koleksi produk aksesoris wanita Anda.

Mohon informasi tentang:
- Katalog produk terbaru
- Harga untuk mitra bisnis
- Minimum order

Terima kasih! 🙏`;
            } else {
                message = `Halo Trisna Monel! 👋

Saya tertarik untuk mengetahui lebih lanjut tentang produk dan kerjasama dengan Trisna Monel.

Terima kasih! 🙏`;
            }

            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);

            // Create WhatsApp URL
            const waURL = `https://wa.me/${waNumber}?text=${encodedMessage}`;

            // Open WhatsApp in new tab
            window.open(waURL, '_blank');
        });
    });
});

// ===========================
// Product Category Filter & Load More
// ===========================
// ===========================
// Product Category Redirect & Data
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    // 1. Category Filter Logic (Redirect to category page)
    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const category = this.getAttribute('data-category');
                if (category && category !== 'all') {
                    window.location.href = `category.html?category=${category}`;
                }
            });
        });
    }

    // Hide load more button if present
    if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }

    // 2. Product Database
    const productsData = [
        // Gelang
        {
            id: 'gelang-1',
            name: 'Gelang Monel Elegant 01',
            category: 'gelang',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Gelang monel premium dengan desain elegan dan kilau yang tahan lama. Anti karat dan aman untuk kulit.',
            image: 'images/gelang/1.jpeg',
            specs: { available: 'Ready Stock', weight: '12 gr' }
        },
        {
            id: 'gelang-2',
            name: 'Gelang Monel Elegant 02',
            category: 'gelang',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Desain minimalis modern yang cocok untuk melengkapi penampilan sehari-hari Anda.',
            image: 'images/gelang/2.jpeg',
            specs: { available: 'Ready Stock', weight: '10 gr' }
        },
        {
            id: 'gelang-3',
            name: 'Gelang Monel Elegant 03',
            category: 'gelang',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Gelang monel dengan detail pengerjaan yang halus dan mewah.',
            image: 'images/gelang/3.jpeg',
            specs: { available: 'Ready Stock', weight: '15 gr' }
        },
        {
            id: 'gelang-4',
            name: 'Gelang Monel Elegant 04',
            category: 'gelang',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Koleksi gelang eksklusif untuk kesan yang lebih profesional dan anggun.',
            image: 'images/gelang/4.jpeg',
            specs: { available: 'Ready Stock', weight: '11 gr' }
        },
        {
            id: 'gelang-5',
            name: 'Gelang Monel Elegant 05',
            category: 'gelang',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Gelang monel berkualitas tinggi dengan daya tahan maksimal.',
            image: 'images/gelang/5.jpeg',
            specs: { available: 'Ready Stock', weight: '14 gr' }
        },
        {
            id: 'gelang-6',
            name: 'Gelang Monel Elegant 06',
            category: 'gelang',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Tampil menawan dengan perhiasan monel yang dirancang khusus.',
            image: 'images/gelang/6.jpeg',
            specs: { available: 'Ready Stock', weight: '13 gr' }
        },
        {
            id: 'gelang-7',
            name: 'Gelang Monel Elegant 07',
            category: 'gelang',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Gelang dengan finishing high-polish untuk kilap yang memukau.',
            image: 'images/gelang/7.jpeg',
            specs: { available: 'Ready Stock', weight: '12 gr' }
        },
        {
            id: 'gelang-8',
            name: 'Gelang Monel Elegant 08',
            category: 'gelang',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Pilihan hadiah sempurna untuk orang terkasih atau koleksi pribadi.',
            image: 'images/gelang/8.jpeg',
            specs: { available: 'Ready Stock', weight: '11 gr' }
        },
        {
            id: 'gelang-9',
            name: 'Gelang Monel Elegant 09',
            category: 'gelang',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Desain timeless yang tidak pernah ketinggalan zaman.',
            image: 'images/gelang/9.jpeg',
            specs: { available: 'Ready Stock', weight: '16 gr' }
        },
        {
            id: 'gelang-10',
            name: 'Gelang Monel Elegant 10',
            category: 'gelang',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Kualitas material monel asli yang tahan terhadap korosi.',
            image: 'images/gelang/10.jpeg',
            specs: { available: 'Ready Stock', weight: '13 gr' }
        },
        {
            id: 'gelang-11',
            name: 'Gelang Monel Elegant 11',
            category: 'gelang',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Detail artistik yang membedakan produk kami dari yang lain.',
            image: 'images/gelang/11.jpeg',
            specs: { available: 'Ready Stock', weight: '14 gr' }
        },
        {
            id: 'gelang-12',
            name: 'Gelang Monel Elegant 12',
            category: 'gelang',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Gelang monel premium untuk melengkapi gaya berkelas Anda.',
            image: 'images/gelang/12.jpeg',
            specs: { available: 'Ready Stock', weight: '15 gr' }
        },

        // Kalung
        {
            id: 'kalung-1',
            name: 'Kalung Eksklusif',
            category: 'kalung',
            price: 'Rp 120.000',
            material: 'Gold Plated',
            description: 'Kalung eksklusif dengan lapisan emas yang memberikan kilau mewah. Desain modern yang timeless, sempurna untuk melengkapi penampilan anggun Anda.',
            image: 'images/hero-bg.jpg', // Placeholder
            specs: { available: 'Limited Stock', weight: '25 gr' }
        },
        {
            id: 'kalung-2',
            name: 'Kalung Mutiara',
            category: 'kalung',
            price: 'Rp 150.000',
            material: 'Mutiara Air Tawar',
            description: 'Keanggunan klasik dalam seuntai kalung mutiara air tawar asli. Dipadukan dengan pengait monel yang kuat dan elegan.',
            image: 'images/hero-bg.jpg', // Placeholder
            specs: { available: 'Ready Stock', weight: '30 gr' }
        },

        // Bros
        {
            id: 'bros-1',
            name: 'Bros Floral Elegance',
            category: 'bros',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Keindahan motif bunga yang diabadikan dalam kerajinan monel berkualitas tinggi. Memberikan sentuhan feminin yang anggun.',
            image: 'images/bros/1.jpeg',
            specs: { available: 'Ready Stock', weight: '12 gr' }
        },
        {
            id: 'bros-2',
            name: 'Bros Royal Butterfly',
            category: 'bros',
            price: 'Hubungi Admin',
            material: 'Monel & Kristal',
            description: 'Desain kupu-kupu yang menawan dengan detail ukiran halus, melambangkan transformasi dan keindahan.',
            image: 'images/bros/2.jpeg',
            specs: { available: 'Ready Stock', weight: '15 gr' }
        },
        {
            id: 'bros-3',
            name: 'Bros Classic Sunflower',
            category: 'bros',
            price: 'Hubungi Admin',
            material: 'Monel Premium',
            description: 'Bros bentuk bunga matahari yang memancarkan keceriaan dan kehangatan dalam desain yang timeless.',
            image: 'images/bros/3.jpeg',
            specs: { available: 'Ready Stock', weight: '14 gr' }
        },
        {
            id: 'bros-4',
            name: 'Bros Golden Leaf',
            category: 'bros',
            price: 'Hubungi Admin',
            material: 'Monel Gold Plated',
            description: 'Sentuhan alam dalam balutan kemewahan. Motif daun dengan lapisan emas yang elegan.',
            image: 'images/bros/4.jpeg',
            specs: { available: 'Ready Stock', weight: '10 gr' }
        },
        {
            id: 'bros-5',
            name: 'Bros Twin Butterfly',
            category: 'bros',
            price: 'Hubungi Admin',
            material: 'Monel',
            description: 'Kombinasi dua kupu-kupu yang harmonis, menciptakan siluet yang artistik pada busana Anda.',
            image: 'images/bros/5.jpeg',
            specs: { available: 'Ready Stock', weight: '16 gr' }
        },
        {
            id: 'bros-6',
            name: 'Bros Ribbon Charm',
            category: 'bros',
            price: 'Hubungi Admin',
            material: 'Monel',
            description: 'Simpel namun manis. Bros berbentuk pita ini cocok untuk mempercantik penampilan sehari-hari.',
            image: 'images/bros/6.jpeg',
            specs: { available: 'Ready Stock', weight: '8 gr' }
        },
        {
            id: 'bros-7',
            name: 'Bros Etnik Heritage',
            category: 'bros',
            price: 'Hubungi Admin',
            material: 'Monel Ukir Jepara',
            description: 'Karya seni ukir Jepara yang otentik dalam bentuk aksesoris modern. Sebuah warisan budaya yang bisa Anda kenakan.',
            image: 'images/bros/7.jpeg',
            specs: { available: 'Limited Stock', weight: '18 gr' }
        },
        {
            id: 'bros-8',
            name: 'Bros Minimalist Pearl',
            category: 'bros',
            price: 'Hubungi Admin',
            material: 'Monel & Mutiara',
            description: 'Perpaduan klasik antara kilau monel dan kelembutan mutiara. Pilihan tepat untuk gaya minimalis berkelas.',
            image: 'images/bros/8.jpeg',
            specs: { available: 'Ready Stock', weight: '10 gr' }
        },
        {
            id: 'bros-9',
            name: 'Bros Abstract Art',
            category: 'bros',
            price: 'Hubungi Admin',
            material: 'Monel',
            description: 'Bentuk abstrak yang unik dan artistik, cocok bagi Anda yang menyukai aksesoris statement.',
            image: 'images/bros/9.jpeg',
            specs: { available: 'Ready Stock', weight: '14 gr' }
        },
        {
            id: 'bros-10',
            name: 'Bros Vintage Star',
            category: 'bros',
            price: 'Hubungi Admin',
            material: 'Monel',
            description: 'Inspirasi desain vintage berbentuk bintang yang membawa nuansa nostalgia yang elegan.',
            image: 'images/bros/10.jpeg',
            specs: { available: 'Ready Stock', weight: '12 gr' }
        },
        {
            id: 'bros-11',
            name: 'Bros Luxury Curve',
            category: 'bros',
            price: 'Hubungi Admin',
            material: 'Monel High Polish',
            description: 'Lengkungan dinamis dengan finishing high-polish yang memantulkan cahaya dengan sempurna.',
            image: 'images/bros/11.jpeg',
            specs: { available: 'Ready Stock', weight: '16 gr' }
        },
        {
            id: 'bros-12',
            name: 'Bros Modern Geometry',
            category: 'bros',
            price: 'Hubungi Admin',
            material: 'Monel',
            description: 'Eksplorasi bentuk geometri modern yang tegas namun tetap luwes untuk berbagai gaya busana.',
            image: 'images/bros/12.jpeg',
            specs: { available: 'Ready Stock', weight: '13 gr' }
        },


        // Label Brand
        {
            id: 'label-1',
            name: 'Label Brand Custom 01',
            category: 'label',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Label brand custom eksklusif untuk meningkatkan nilai jual produk Anda. Bebas custom desain logo atau nama brand.',
            image: 'images/label_brand/1.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 2-5 gr' }
        },
        {
            id: 'label-2',
            name: 'Label Brand Custom 02',
            category: 'label',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Plat label berbahan monel anti karat. Cocok untuk hijab, tas, atau pakaian dengan finishing yang halus dan mewah.',
            image: 'images/label_brand/2.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 2-5 gr' }
        },
        {
            id: 'label-3',
            name: 'Label Brand Custom 03',
            category: 'label',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Identitas brand Anda tampil lebih profesional dengan label logam berkualitas. Tahan lama dan tidak berubah warna.',
            image: 'images/label_brand/3.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 2-5 gr' }
        },
        {
            id: 'label-4',
            name: 'Label Brand Custom 04',
            category: 'label',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Desain label yang elegan dan presisi. Pilihan tepat untuk branding produk fashion premium Anda.',
            image: 'images/label_brand/4.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 2-5 gr' }
        },
        {
            id: 'label-5',
            name: 'Label Brand Custom 05',
            category: 'label',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Label monel dengan teknik ukir atau etching yang detail. Memberikan kesan luxury pada setiap produk anda.',
            image: 'images/label_brand/5.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 2-5 gr' }
        },
        {
            id: 'label-6',
            name: 'Label Brand Custom 06',
            category: 'label',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Custom label untuk hijab dan busana muslim. Material aman, tidak tajam, dan menambah estetika produk.',
            image: 'images/label_brand/6.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 2-5 gr' }
        },
        {
            id: 'label-7',
            name: 'Label Brand Custom 07',
            category: 'label',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Tersedia berbagai bentuk dan ukuran sesuai kebutuhan branding Anda. Konsultasikan desain unik Anda bersama kami.',
            image: 'images/label_brand/7.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 2-5 gr' }
        },
        {
            id: 'label-8',
            name: 'Label Brand Custom 08',
            category: 'label',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Label logam finishing mengkilap yang awet. Investasi kecil untuk dampak branding yang besar.',
            image: 'images/label_brand/8.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 2-5 gr' }
        },
        {
            id: 'label-9',
            name: 'Label Brand Custom 09',
            category: 'label',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Solusi branding eksklusif untuk UMKM maupun brand besar. Kualitas material terjamin standar ekspor.',
            image: 'images/label_brand/9.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 2-5 gr' }
        },
        {
            id: 'label-10',
            name: 'Label Brand Custom 10',
            category: 'label',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Custom label brand premium untuk identitas produk yang kuat dan berkelas.',
            image: 'images/label_brand/10.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 2-5 gr' }
        },
        {
            id: 'label-11',
            name: 'Label Brand Custom 11',
            category: 'label',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Label monel kualitas tinggi dengan finishing presisi untuk brand fashion Anda.',
            image: 'images/label_brand/11.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 2-5 gr' }
        },
        {
            id: 'label-12',
            name: 'Label Brand Custom 12',
            category: 'label',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Solusi label brand custom anti karat dan tahan lama untuk kesan produk yang mewah.',
            image: 'images/label_brand/12.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 2-5 gr' }
        },

        // Souvenir & Gift
        {
            id: 'souvenir-1',
            name: 'Souvenir Monel Premium 01',
            category: 'souvenir',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Souvenir eksklusif berbahan monel yang awet dan mewah. Cocok untuk hadiah pernikahan, seminar, atau event perusahaan.',
            image: 'images/gift/1.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 10-20 gr' }
        },
        {
            id: 'souvenir-2',
            name: 'Souvenir Monel Premium 02',
            category: 'souvenir',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Produk gift monel dengan desain elegan dan finishing halus.',
            image: 'images/gift/2.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 10-20 gr' }
        },
        {
            id: 'souvenir-3',
            name: 'Souvenir Monel Premium 03',
            category: 'souvenir',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Pilihan hadiah spesial yang berkesan dan tahan lama.',
            image: 'images/gift/3.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 10-20 gr' }
        },
        {
            id: 'souvenir-4',
            name: 'Souvenir Monel Premium 04',
            category: 'souvenir',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Souvenir custom dengan kualitas pengerjaan terbaik.',
            image: 'images/gift/4.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 10-20 gr' }
        },
        {
            id: 'souvenir-5',
            name: 'Souvenir Monel Premium 05',
            category: 'souvenir',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Gift eksklusif untuk momen spesial Anda.',
            image: 'images/gift/5.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 10-20 gr' }
        },
        {
            id: 'souvenir-7',
            name: 'Souvenir Monel Premium 07',
            category: 'souvenir',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Souvenir monel dengan detail desain yang cantik.',
            image: 'images/gift/7.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 10-20 gr' }
        },
        {
            id: 'souvenir-8',
            name: 'Souvenir Monel Premium 08',
            category: 'souvenir',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Hadiah premium yang menonjolkan kualitas material monel.',
            image: 'images/gift/8.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 10-20 gr' }
        },
        {
            id: 'souvenir-9',
            name: 'Souvenir Monel Premium 09',
            category: 'souvenir',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Produk gift dengan tampilan mewah dan anti karat.',
            image: 'images/gift/9.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 10-20 gr' }
        },
        {
            id: 'souvenir-10',
            name: 'Souvenir Monel Premium 10',
            category: 'souvenir',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Pilihan souvenir terbaik untuk meningkatkan citra brand atau acara Anda.',
            image: 'images/gift/10.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 10-20 gr' }
        },
        {
            id: 'souvenir-11',
            name: 'Souvenir Monel Premium 11',
            category: 'souvenir',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Gift monel berkualitas tinggi, tahan lama dan elegan.',
            image: 'images/gift/11.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 10-20 gr' }
        },
        {
            id: 'souvenir-12',
            name: 'Souvenir Monel Premium 12',
            category: 'souvenir',
            price: 'Hubungi Admin',
            material: 'Monel High Quality',
            description: 'Souvenir custom monel untuk berbagai kebutuhan acara.',
            image: 'images/gift/12.jpeg',
            specs: { available: 'Custom Order', weight: 'Est. 10-20 gr' }
        },

        // Hijab
        {
            id: 'hijab-1',
            name: 'Aksesoris Hijab',
            category: 'hijab',
            price: 'Rp 25.000 / set',
            material: 'Mixed Metal',
            description: 'Koleksi aksesoris hijab yang terdiri dari berbagai model klip dan pin untuk mempercantik gaya berhijab Anda.',
            image: 'images/hero-bg.jpg', // Placeholder
            specs: { available: 'Ready Stock', weight: '50 gr' }
        },
        {
            id: 'hijab-2',
            name: 'Peniti Hijab Set',
            category: 'hijab',
            price: 'Rp 15.000 / pack',
            material: 'Stainless Steel',
            description: 'Pack peniti bohlam anti nyangkut berbagai warna yang aman untuk kain hijab kesayangan Anda.',
            image: 'images/hero-bg.jpg', // Placeholder
            specs: { available: 'Ready Stock', weight: '20 gr' }
        }
    ];

    // 3. Logic for Product Detail Page
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId && document.querySelector('.product-detail-section')) {
        const product = productsData.find(p => p.id === productId);

        if (product) {
            // Populate Data
            document.title = `${product.name} - Trisna Monel`;
            const pdImage = document.getElementById('pdImage');
            if (pdImage) pdImage.src = product.image;

            const pdCategory = document.getElementById('pdCategory');
            if (pdCategory) pdCategory.textContent = product.category;

            const pdTitle = document.getElementById('pdTitle');
            if (pdTitle) pdTitle.textContent = product.name;

            const pdPrice = document.getElementById('pdPrice');
            if (pdPrice) pdPrice.textContent = product.price;

            const pdDesc = document.getElementById('pdDescription');
            if (pdDesc) pdDesc.textContent = product.description;

            const pdMat = document.getElementById('pdMaterial');
            if (pdMat) pdMat.textContent = product.material;

            // WhatsApp Button Logic
            const waBtn = document.getElementById('pdWhatsappBtn');
            if (waBtn) {
                const waNumber = '6289524907552';
                const message = `Halo Trisna Monel, saya tertarik dengan produk *${product.name}* (ID: ${product.id}).\n\nHarga: ${product.price}\n\nApakah masih tersedia?`;
                waBtn.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
            }

            // Render Related Products (Filter by same category, exclude current)
            if (relatedContainer) {
                // Get related products (same category)
                let related = productsData.filter(p => p.category === product.category && p.id !== product.id);

                // Strictly show only related products (max 4)
                const displayRelated = related.slice(0, 4);

                relatedContainer.innerHTML = ''; // Clear existing
                displayRelated.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    card.innerHTML = `
                        <div class="product-image">
                            <img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;">
                            <div class="product-overlay">
                                <a href="product-detail.html?id=${item.id}" class="view-details">Lihat Detail</a>
                            </div>
                        </div>
                        <div class="product-content">
                            <h3 class="product-title" style="font-size:1.2rem;">${item.name}</h3>
                            <div class="product-features" style="justify-content: center; gap: 5px;">
                                <a href="product-detail.html?id=${item.id}" class="cta-button secondary" style="font-size:0.8rem">Detail</a>
                            </div>
                        </div>
                    `;
                    relatedContainer.appendChild(card);
                });
            }

            // Dynamic Back Button Logic
            const backLink = document.querySelector('.back-link');
            if (backLink) {
                if (product.category === 'bros') {
                    backLink.href = 'category.html?category=bros';
                    backLink.textContent = '← Kembali ke Koleksi Bros';
                } else if (product.category === 'kalung') {
                    backLink.href = 'category.html?category=kalung';
                    backLink.textContent = '← Kembali ke Koleksi Kalung';
                } else if (product.category === 'hijab') {
                    backLink.href = 'category.html?category=hijab';
                    backLink.textContent = '← Kembali ke Koleksi Hijab';
                } else {
                    backLink.href = 'index.html#products';
                    backLink.textContent = '← Kembali ke Katalog';
                }
            }

        } else {
            // Product not found case
            const container = document.querySelector('.product-detail-container');
            if (container) {
                container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 50px;"><h3>Produk tidak ditemukan</h3><a href="index.html" class="cta-button primary">Kembali ke Beranda</a></div>';
            }
        }
    }


    // 4. Logic for Category Page
    const categoryUrlParams = new URLSearchParams(window.location.search);
    const categoryParam = categoryUrlParams.get('category');

    // Check if we are on the category page
    const categoryGrid = document.getElementById('categoryProductGrid');

    if (categoryGrid) {
        // Determine which products to show
        let displayProducts = [];
        let categoryNameDisplay = 'Semua Produk';

        if (categoryParam && categoryParam !== 'all') {
            displayProducts = productsData.filter(p => p.category === categoryParam);

            // EMERGENCY FALLBACK: If filtering returns empty for 'bros', use hardcoded data
            // This ensures the user sees the images they uploaded even if the main data array has issues.
            if (categoryParam === 'bros' && displayProducts.length === 0) {
                const brosData = [
                    { id: 'bros-1', name: 'Bros Floral Elegance', category: 'bros', price: 'Hubungi Admin', material: 'Monel High Quality', image: 'images/bros/1.jpeg' },
                    { id: 'bros-2', name: 'Bros Royal Butterfly', category: 'bros', price: 'Hubungi Admin', material: 'Monel & Kristal', image: 'images/bros/2.jpeg' },
                    { id: 'bros-3', name: 'Bros Classic Sunflower', category: 'bros', price: 'Hubungi Admin', material: 'Monel Premium', image: 'images/bros/3.jpeg' },
                    { id: 'bros-4', name: 'Bros Golden Leaf', category: 'bros', price: 'Hubungi Admin', material: 'Monel Gold Plated', image: 'images/bros/4.jpeg' },
                    { id: 'bros-5', name: 'Bros Twin Butterfly', category: 'bros', price: 'Hubungi Admin', material: 'Monel', image: 'images/bros/5.jpeg' },
                    { id: 'bros-6', name: 'Bros Ribbon Charm', category: 'bros', price: 'Hubungi Admin', material: 'Monel', image: 'images/bros/6.jpeg' },
                    { id: 'bros-7', name: 'Bros Etnik Heritage', category: 'bros', price: 'Hubungi Admin', material: 'Monel Ukir Jepara', image: 'images/bros/7.jpeg' },
                    { id: 'bros-8', name: 'Bros Minimalist Pearl', category: 'bros', price: 'Hubungi Admin', material: 'Monel & Mutiara', image: 'images/bros/8.jpeg' },
                    { id: 'bros-9', name: 'Bros Abstract Art', category: 'bros', price: 'Hubungi Admin', material: 'Monel', image: 'images/bros/9.jpeg' },
                    { id: 'bros-10', name: 'Bros Vintage Star', category: 'bros', price: 'Hubungi Admin', material: 'Monel', image: 'images/bros/10.jpeg' },
                    { id: 'bros-11', name: 'Bros Luxury Curve', category: 'bros', price: 'Hubungi Admin', material: 'Monel High Polish', image: 'images/bros/11.jpeg' },
                    { id: 'bros-12', name: 'Bros Modern Geometry', category: 'bros', price: 'Hubungi Admin', material: 'Monel', image: 'images/bros/12.jpeg' }
                ];
                displayProducts = brosData;
            }

            categoryNameDisplay = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
        } else {
            // Show all products if no category specified
            displayProducts = productsData;
        }

        // Update Header UI
        const pageTitle = document.getElementById('pageTitle');
        const pageDesc = document.getElementById('pageDescription');
        if (pageTitle) pageTitle.innerHTML = `Koleksi <span class="gradient-text">${categoryNameDisplay}</span>`;
        if (pageDesc) pageDesc.textContent = `Menampilkan koleksi ${categoryNameDisplay} kami yang berkualitas premium.`;

        // Render Grid
        const noProductsMsg = document.getElementById('noProductsMessage');
        categoryGrid.innerHTML = ''; // Clear existing

        if (displayProducts.length > 0) {
            if (noProductsMsg) noProductsMsg.style.display = 'none';

            displayProducts.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.setAttribute('data-aos', 'fade-up');
                card.setAttribute('data-aos-delay', (index % 4) * 100); // Stagger animations

                card.innerHTML = `
                    <div class="product-image">
                        <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
                        <div class="product-overlay">
                            <a href="product-detail.html?id=${item.id}" class="view-details">Lihat Detail</a>
                        </div>
                    </div>
                    <div class="product-content">
                        <h3 class="product-title" style="font-size:1.2rem;">${item.name}</h3>
                        <p class="product-description" style="margin-bottom:0.5rem; font-size: 0.9rem;">${item.material}</p>
                        <div class="product-features" style="justify-content: space-between; margin-top: 10px;">
                             <a href="product-detail.html?id=${item.id}" class="cta-button secondary" style="padding: 8px 15px; font-size: 0.8rem;">Detail</a>
                             <a href="https://wa.me/6289524907552?text=Halo%20saya%20tertarik%20dengan%20${encodeURIComponent(item.name)}" target="_blank" class="cta-button primary" style="padding: 8px 15px; font-size: 0.8rem;">Pesan</a>
                        </div>
                    </div>
                `;
                categoryGrid.appendChild(card);
            });
        } else {
            if (noProductsMsg) noProductsMsg.style.display = 'block';
        }
    }



    // ===========================
    // Luxury Scroll Animation
    // ===========================
    setTimeout(() => {
        const revealSelectors = '.product-card, .section-title, .hero-content, .about-content';
        const revealElements = document.querySelectorAll(revealSelectors);

        // Add initial class for styling
        revealElements.forEach(el => el.classList.add('reveal-on-scroll'));

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => scrollObserver.observe(el));

        // Safety Fallback: Force reveal all after 1s if observer fails
        setTimeout(() => {
            revealElements.forEach(el => el.classList.add('visible'));
        }, 1000);

    }, 100); // Small delay to ensure DOM is ready

});
