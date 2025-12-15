document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. МОБИЛЬНАЯ ПОДСВЕТКА ПРИ СКРОЛЛЕ ---
    // Этот код добавляет класс .mobile-active, когда элемент появляется на экране.
    // CSS настроен так, что визуально это сработает ТОЛЬКО на ширине < 768px.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('mobile-active');
            } else {
                // Опционально: убираем подсветку, если элемент ушел с экрана
                entry.target.classList.remove('mobile-active');
            }
        });
    }, { threshold: 0.1 });

    // Элементы, за которыми следим
    document.querySelectorAll('.hover-target, .project-item, .hero h1, .gallery-img, .sub-project, .project-link-btn, .zoom-effect, .nav-link, .footer-cta, .social-icon, .footer-btn, .about-photo-frame, .hero, .marquee-container').forEach(el => {
        observer.observe(el);
    });

    // --- 2. КАСТОМНЫЙ КУРСОР (Работает на ПК) ---
    const cursor = document.getElementById('cursor');
    const hoverTargets = document.querySelectorAll('.hover-target');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        target.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    // --- 3. ЛАЙТБОКС (ГАЛЕРЕЯ) ---
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    let currentGalleryGroup = []; 
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        updateImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    function updateImage() {
        if (currentGalleryGroup.length > 0) {
            lightboxImg.src = currentGalleryGroup[currentIndex].src;
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        currentGalleryGroup = []; 
    }

    function showNext() {
        if (currentGalleryGroup.length === 0) return;
        currentIndex = (currentIndex + 1) % currentGalleryGroup.length;
        updateImage();
    }

    function showPrev() {
        if (currentGalleryGroup.length === 0) return;
        currentIndex = (currentIndex - 1 + currentGalleryGroup.length) % currentGalleryGroup.length;
        updateImage();
    }

    const allImages = document.querySelectorAll('.gallery-img');

    allImages.forEach(img => {
        img.addEventListener('click', (e) => {
            const parentContainer = e.target.closest('.left-gallery-side');
            if (parentContainer) {
                currentGalleryGroup = Array.from(parentContainer.querySelectorAll('.gallery-img'));
                const indexClicked = currentGalleryGroup.indexOf(e.target);
                openLightbox(indexClicked);
            }
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
});