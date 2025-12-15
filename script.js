document.addEventListener('DOMContentLoaded', () => {
    
    // --- КАСТОМНЫЙ КУРСОР ---
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

    // --- ЛАЙТБОКС (СКОУП ПО КЕЙСУ) ---
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    // Переменные для хранения текущего набора картинок
    let currentGalleryGroup = []; 
    let currentIndex = 0;

    // Функция открытия лайтбокса
    function openLightbox(index) {
        currentIndex = index;
        updateImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    // Обновление картинки src
    function updateImage() {
        if (currentGalleryGroup.length > 0) {
            lightboxImg.src = currentGalleryGroup[currentIndex].src;
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        currentGalleryGroup = []; // Очищаем группу при закрытии
    }

    // ЛОГИКА ЗАЦИКЛЕННОСТИ ВНУТРИ ГРУППЫ
    function showNext() {
        if (currentGalleryGroup.length === 0) return;
        // % позволяет вернуться к 0, когда доходим до конца
        currentIndex = (currentIndex + 1) % currentGalleryGroup.length;
        updateImage();
    }

    function showPrev() {
        if (currentGalleryGroup.length === 0) return;
        // + length позволяет корректно уходить с 0 на последний элемент
        currentIndex = (currentIndex - 1 + currentGalleryGroup.length) % currentGalleryGroup.length;
        updateImage();
    }

    // Находим все картинки
    const allImages = document.querySelectorAll('.gallery-img');

    allImages.forEach(img => {
        img.addEventListener('click', (e) => {
            // 1. Находим контейнер (родителя), в котором лежит эта картинка
            const parentContainer = e.target.closest('.left-gallery-side');
            
            // 2. Если родитель найден, собираем ВСЕ картинки только внутри него
            if (parentContainer) {
                currentGalleryGroup = Array.from(parentContainer.querySelectorAll('.gallery-img'));
                
                // 3. Определяем номер нажатой картинки внутри этой группы
                const indexClicked = currentGalleryGroup.indexOf(e.target);
                
                // 4. Открываем
                openLightbox(indexClicked);
            }
        });
    });

    // Управление кнопками
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