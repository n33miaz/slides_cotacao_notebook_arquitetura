document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DE AUTO-SCALE ---
    function scaleSlide() {
        const container = document.querySelector('.slide-container');
        if (!container) return;

        // Dimensões originais do seu slide
        const baseWidth = 920;
        const baseHeight = 780;
        
        // Dimensões da janela atual
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calcula a proporção necessária para largura e altura
        const scaleX = windowWidth / baseWidth;
        const scaleY = windowHeight / baseHeight;

        const scale = Math.min(scaleX, scaleY);

        // Aplica o zoom
        container.style.transform = `scale(${scale})`;
    }

    // Executa ao carregar e sempre que redimensionar a janela
    scaleSlide();
    window.addEventListener('resize', scaleSlide);


    // --- LÓGICA DE NAVEGAÇÃO ---
    const path = window.location.pathname;
    let currentPage = 1; 

    const filename = path.split('/').pop() || '1.html';
    const match = filename.match(/(\d+)\.html/);
    
    if (match) {
        currentPage = parseInt(match[1]);
    }

    const totalSlides = 7; 

    function goToSlide(direction) {
        let nextPage = currentPage + direction;

        if (nextPage < 1) return;
        if (nextPage > totalSlides) return;

        window.location.href = `${nextPage}.html`;
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') goToSlide(1);
        if (e.key === 'ArrowLeft' || e.key === 'Backspace') goToSlide(-1);
    });

    if (currentPage > 1) {
        const leftZone = document.createElement('div');
        leftZone.className = 'nav-zone nav-left';
        leftZone.onclick = () => goToSlide(-1);
        leftZone.innerHTML = '<i class="fas fa-chevron-left"></i>';
        document.body.appendChild(leftZone);
    }

    if (currentPage < totalSlides) {
        const rightZone = document.createElement('div');
        rightZone.className = 'nav-zone nav-right';
        rightZone.onclick = () => goToSlide(1);
        rightZone.innerHTML = '<i class="fas fa-chevron-right"></i>';
        document.body.appendChild(rightZone);
    }
});