document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.slide-container');

    // --- LÓGICA DE AUTO-SCALE ---
    function scaleSlide() {
        if (!container) return;

        const baseWidth = 1280;
        const baseHeight = 720;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const scale = Math.min(
            windowWidth / baseWidth,
            windowHeight / baseHeight
        );

        container.style.width = `${baseWidth}px`;
        container.style.height = `${baseHeight}px`;
        container.style.position = 'absolute';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = `translate(-50%, -50%) scale(${scale})`;
        container.style.transformOrigin = 'center center';
    }

    scaleSlide();
    window.addEventListener('resize', scaleSlide);

    // --- ESTILOS ---
    const style = document.createElement('style');
    style.innerHTML = `
        body {
            background-color: #1d1d1f;
            margin: 0;
            overflow: hidden;
            width: 100vw;
            height: 100vh;
        }

        @keyframes slideEnter {
            0% { 
                opacity: 0; 
                filter: blur(10px);
                /* Pequeno zoom out para dar profundidade */
                transform: translate(-50%, -50%) scale(0.95); 
            }
            100% { 
                opacity: 1; 
                filter: blur(0);
            }
        }

        .slide-container {
            animation: slideEnter 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        /* ÁREAS DE NAVEGAÇÃO */
        .nav-zone {
            position: fixed;
            top: 0;
            bottom: 0;
            width: 15%;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0; /* Invisível por padrão */
            transition: all 0.3s ease;
            font-size: 40px;
            color: #86868b;
            -webkit-tap-highlight-color: transparent;
        }

        .nav-zone:hover {
            opacity: 1;
            background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.05) 100%);
        }
        
        .nav-left:hover {
            background: linear-gradient(-90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.05) 100%);
        }

        .nav-left { left: 0; }
        .nav-right { right: 0; }

        @keyframes pulse-hint {
            0% { opacity: 0; transform: translateX(0); }
            50% { opacity: 0.8; transform: translateX(10px); color: #0071e3; }
            100% { opacity: 0; transform: translateX(0); }
        }

        .nav-hint-active {
            animation: pulse-hint 2s infinite;
            background: rgba(255,255,255,0.02);
            border-left: 1px solid rgba(255,255,255,0.05);
        }
    `;
    document.head.appendChild(style);

    // --- LÓGICA DE NAVEGAÇÃO ---
    const path = window.location.pathname;
    let currentPage = 1;
    const filename = path.split('/').pop();
    const match = filename.match(/(\d+)\.html/);

    if (match) {
        currentPage = parseInt(match[1]);
    }

    const totalSlides = 7;

    function goToSlide(direction) {
        container.style.opacity = '0';
        container.style.transition = 'opacity 0.2s ease';
        
        setTimeout(() => {
            let nextPage = currentPage + direction;
            if (nextPage < 1) return;
            if (nextPage > totalSlides) return;
            window.location.href = `${nextPage}.html`;
        }, 100); 
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') goToSlide(1);
        if (e.key === 'ArrowLeft' || e.key === 'Backspace') goToSlide(-1);
    });

    // Botão Esquerdo
    if (currentPage > 1) {
        const leftZone = document.createElement('div');
        leftZone.className = 'nav-zone nav-left';
        leftZone.onclick = () => goToSlide(-1);
        leftZone.innerHTML = '<i class="fas fa-chevron-left"></i>';
        document.body.appendChild(leftZone);
    }

    // Botão Direito
    if (currentPage < totalSlides) {
        const rightZone = document.createElement('div');
        rightZone.className = 'nav-zone nav-right';
        
        if (currentPage === 1) {
            rightZone.classList.add('nav-hint-active');
            rightZone.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:10px;">
                    <i class="fas fa-chevron-right"></i>
                    <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Avançar</span>
                </div>
            `;
        } else {
            rightZone.innerHTML = '<i class="fas fa-chevron-right"></i>';
        }

        rightZone.onclick = () => goToSlide(1);
        document.body.appendChild(rightZone);
    }
});