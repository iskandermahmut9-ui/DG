const cursor = document.getElementById('cursor');
// Находим все элементы, у которых есть эффект при наведении (класс hover-target)
const hoverTargets = document.querySelectorAll('.hover-target, a, .gallery-img, .project-item, .marquee-container, .hero');

// 1. Логика курсора (только для ПК)
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
    });
    target.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
    });
});

// 2. Логика "Оживления" при скролле (для мобильных)
function checkScrollAnimation() {
    // Определяем центр экрана
    const windowHeight = window.innerHeight;
    const triggerTop = windowHeight * 0.3;    // 30% от верха
    const triggerBottom = windowHeight * 0.7; // 70% от верха (ниже этой линии эффект гаснет)
    
    // Проходим по всем активным элементам
    hoverTargets.forEach(target => {
        const box = target.getBoundingClientRect();
        
        // Вычисляем центр элемента
        const elementCenter = box.top + (box.height / 2);

        // Если центр элемента находится в "активной зоне" экрана
        if (elementCenter > triggerTop && elementCenter < triggerBottom) {
            target.classList.add('mobile-active');
        } else {
            target.classList.remove('mobile-active');
        }
    });
}

// Запускаем проверку при скролле
window.addEventListener('scroll', checkScrollAnimation);
// И один раз при загрузке (чтобы верхние элементы сразу загорелись)
checkScrollAnimation();