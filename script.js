// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Initialize EmailJS
(function() {
    emailjs.init("a09-BzfnUpPAMr2_4");
})();

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // Get form data
            const formData = {
                to_name: "Canvus Graphics",
                from_name: document.getElementById('from_name').value,
                from_email: document.getElementById('from_email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Send email using EmailJS
            const response = await emailjs.send('service_aovcw1s', 'template_su8h5dc', formData);
            
            if (response.status === 200) {
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                throw new Error('Failed to send email');
            }
        } catch (error) {
            console.error('EmailJS error:', error);
            alert('Oops! Something went wrong. Please try again later.');
        } finally {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// Portfolio Item Hover Effect
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.portfolio-overlay').style.opacity = '1';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('.portfolio-overlay').style.opacity = '0';
    });
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Portfolio Modal Functionality
const modal = document.querySelector('.portfolio-modal');
const modalImg = modal.querySelector('img');
const modalTitle = modal.querySelector('.project-info h3');
const modalDesc = modal.querySelector('.project-info p');
const modalCategory = modal.querySelector('.category');
const modalTools = modal.querySelector('.tools');
const closeModal = modal.querySelector('.close-modal');

// Project data
const projects = {
    'Sweet Crumbs': {
        category: 'Brand Identity',
        tools: 'Adobe Illustrator, Photoshop',
        description: 'Complete brand identity design for a local bakery, including logo, color palette, and marketing materials.'
    },
    'Burger King': {
        category: 'Menu Design',
        tools: 'Adobe InDesign, Photoshop',
        description: 'Modern menu redesign focusing on visual hierarchy and appetizing food photography.'
    },
    'KFC': {
        category: 'Menu Design',
        tools: 'Adobe InDesign, Photoshop',
        description: 'Strategic menu redesign to highlight signature items and improve customer experience.'
    },
    'NUDE': {
        category: 'Luxury Branding',
        tools: 'Adobe Illustrator, Photoshop',
        description: 'Sophisticated brand identity for a high-end fashion label, emphasizing minimalism and elegance.'
    },
    'PREDATOR': {
        category: 'Event Branding',
        tools: 'Adobe Illustrator, Photoshop',
        description: 'Dynamic branding for a major esports event, capturing the energy and excitement of competitive gaming.'
    },
    'Haunted Mug': {
        category: 'Promotional Design',
        tools: 'Adobe Photoshop, Illustrator',
        description: 'Thematic promotional materials for a café\'s Halloween event, creating an engaging and spooky atmosphere.'
    },
    'FIFA Pepsi': {
        category: 'Ad Campaign',
        tools: 'Adobe Photoshop, Illustrator',
        description: 'Energetic promotional campaign combining sports and beverage branding for maximum impact.'
    },
    'Street Store': {
        category: 'Sale Promotion',
        tools: 'Adobe Photoshop, Illustrator',
        description: 'Eye-catching promotional materials for a summer sale event, driving foot traffic and sales.'
    },
    'Salon': {
        category: 'Brand Identity',
        tools: 'Adobe Illustrator, Photoshop',
        description: 'Elegant and modern brand identity design for a luxury salon, featuring sophisticated typography and color palette.'
    },
    'MTING': {
        category: 'Coming Soon',
        tools: 'Adobe Creative Suite',
        description: 'An exciting new project coming soon. Stay tuned for updates!'
    }
};

// Open modal with project details
document.querySelectorAll('.view-project').forEach(button => {
    button.addEventListener('click', (e) => {
        const portfolioItem = e.target.closest('.portfolio-item');
        const projectTitle = portfolioItem.querySelector('h3').textContent;
        const project = projects[projectTitle];
        
        if (project) {
            modalImg.src = portfolioItem.querySelector('img').src;
            modalTitle.textContent = projectTitle;
            modalDesc.textContent = project.description;
            modalCategory.textContent = project.category;
            modalTools.textContent = project.tools;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Minimal Benefits Modal Functionality
const benefitData = {
    identity: {
        icon: 'fas fa-paint-brush',
        title: 'Identity',
        desc: 'Strong branding creates instant recognition and helps your business stand out.'
    },
    engage: {
        icon: 'fas fa-users',
        title: 'Engage',
        desc: 'Great design grabs attention and increases customer engagement.'
    },
    trust: {
        icon: 'fas fa-shield-alt',
        title: 'Trust',
        desc: 'Professional visuals build credibility and trust with your audience.'
    },
    clarity: {
        icon: 'fas fa-comments',
        title: 'Clarity',
        desc: 'Clear graphics make information easy to understand and act on.'
    }
};

const benefitModal = document.querySelector('.benefit-modal');
const benefitModalIcon = document.querySelector('.benefit-modal-body .modal-icon');
const benefitModalTitle = document.querySelector('.benefit-modal-body .modal-title');
const benefitModalDesc = document.querySelector('.benefit-modal-body .modal-desc');
const closeBenefitModal = document.querySelector('.close-benefit-modal');

document.querySelectorAll('.benefit-box').forEach(box => {
    box.addEventListener('click', () => {
        const key = box.getAttribute('data-benefit');
        const data = benefitData[key];
        if (data) {
            benefitModalIcon.className = `modal-icon ${data.icon}`;
            benefitModalTitle.textContent = data.title;
            benefitModalDesc.textContent = data.desc;
            benefitModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });
});

closeBenefitModal.addEventListener('click', () => {
    benefitModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});
benefitModal.addEventListener('click', (e) => {
    if (e.target === benefitModal) {
        benefitModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && benefitModal.style.display === 'flex') {
        benefitModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Tool Modal Functionality
const toolData = {
    photoshop: {
        icon: 'fas fa-image',
        title: 'Photoshop',
        desc: 'Professional image editing and manipulation for stunning visual effects.'
    },
    illustrator: {
        icon: 'fas fa-pen-nib',
        title: 'Illustrator',
        desc: 'Vector graphics creation for scalable and precise designs.'
    },
    indesign: {
        icon: 'fas fa-file-alt',
        title: 'InDesign',
        desc: 'Professional layout and publishing for print and digital media.'
    },
    canva: {
        icon: 'fas fa-palette',
        title: 'Canva',
        desc: 'User-friendly design platform for quick and effective graphics.'
    },
    figma: {
        icon: 'fab fa-figma',
        title: 'Figma',
        desc: 'Collaborative interface design tool for modern digital products.'
    },
    coreldraw: {
        icon: 'fas fa-draw-polygon',
        title: 'CorelDRAW',
        desc: 'Versatile vector graphics editor for professional design work.'
    }
};

const toolModal = document.querySelector('.tool-modal');
const toolModalIcon = document.querySelector('.tool-modal-body .tool-modal-icon');
const toolModalTitle = document.querySelector('.tool-modal-body .tool-modal-title');
const toolModalDesc = document.querySelector('.tool-modal-body .tool-modal-desc');
const closeToolModal = document.querySelector('.close-tool-modal');

document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-tool');
        const data = toolData[key];
        if (data) {
            toolModalIcon.className = `tool-modal-icon ${data.icon}`;
            toolModalTitle.textContent = data.title;
            toolModalDesc.textContent = data.desc;
            toolModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close tool modal
closeToolModal.addEventListener('click', () => {
    toolModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close tool modal when clicking outside
toolModal.addEventListener('click', (e) => {
    if (e.target === toolModal) {
        toolModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close tool modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toolModal.style.display === 'flex') {
        toolModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Hero Title Typewriter Effect
window.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.getElementById('heroTitle');
    if (!heroTitle) return;
    const fullText = 'Canvus Graphics';
    let idx = 0;
    heroTitle.textContent = '';
    function typeWriter() {
        heroTitle.textContent = fullText.slice(0, idx);
        idx++;
        if (idx <= fullText.length) {
            setTimeout(typeWriter, 120);
        }
    }
    setTimeout(typeWriter, 400);
}); 