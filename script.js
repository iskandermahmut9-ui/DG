const cursor = document.getElementById('cursor');

// Собираем все элементы, на которые должен реагировать курсор
// (кнопки, ссылки, картинки галереи, логотип)
const hoverTargets = document.querySelectorAll('.hover-target, a, .gallery-img');

// 1. Движение курсора за мышкой
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 2. Эффект увеличения при наведении
hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
    });
    target.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
    });
});