document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. МОБИЛЬНАЯ ПОДСВЕТКА (УЗКАЯ ПОЛОСА ПО ЦЕНТРУ) ---
    // rootMargin: '-40% 0px -40% 0px' означает, что мы "обрезаем" 
    // область видимости на 40% сверху и 40% снизу. 
    // Остается 20% в центре. Срабатывает только там.
    
    const observerOptions = {
        root: null, // следим относительно окна браузера
        rootMargin: '-40% 0px -40% 0px', // АКТИВНАЯ ЗОНА ТОЛЬКО ПО ЦЕНТРУ
        threshold: 0 // срабатывать сразу, как только коснулся этой зоны
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Если элемент попал в центральную полосу — включаем
                entry.target.classList.add('mobile-active');
            } else {
                // Если ушел выше или ниже — выключаем (чтобы не горело всё подряд)
                entry.target.classList.remove('mobile-active');
            }
        });
    }, observerOptions);

    // Список элементов, за которыми следим
    const targets = document.querySelectorAll(
        '.hover-target, .project-item, .hero h1, .gallery-img, .sub-project, .project-link-btn, .zoom-effect, .nav-link, .footer-cta, .social-icon, .footer-btn, .about-photo-frame, .hero, .marquee-container'
    );

    targets.forEach(el => {
        observer.observe(el);
    });


    // --- 2. КАСТОМНЫЙ КУРСОР (ТОЛЬКО ДЛЯ ПК) ---
    // Проверка на устройство с мышью, чтобы не мешал на тачскринах
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const cursor = document.getElementById('cursor');

    if (!isTouchDevice && cursor) {
        const hoverTargets = document.querySelectorAll('.hover-target');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            target.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    } else if (cursor) {
        // Если это тач-устройство, скрываем курсор от греха подальше
        cursor.style.display = 'none';
    }


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