// Variables globales
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const fullpage = document.getElementById('fullpage');

// Función para actualizar slide activo
function updateActiveSlide(index) {
    currentSlide = index;
    
    // Actualizar dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    // Scroll suave al slide
    slides[index].scrollIntoView({ behavior: 'smooth' });
}

// Event listeners para dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        updateActiveSlide(index);
    });
});

// Event listeners para botones de navegación
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentSlide > 0) {
        updateActiveSlide(currentSlide - 1);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
        updateActiveSlide(currentSlide + 1);
    }
});

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && currentSlide > 0) {
        updateActiveSlide(currentSlide - 1);
    } else if (e.key === 'ArrowDown' && currentSlide < slides.length - 1) {
        updateActiveSlide(currentSlide + 1);
    }
});

// Detectar scroll para actualizar slide activo
let isScrolling;
fullpage.addEventListener('scroll', () => {
    clearTimeout(isScrolling);
    
    isScrolling = setTimeout(() => {
        const scrollPosition = fullpage.scrollTop;
        const viewportHeight = window.innerHeight;
        
        const activeIndex = Math.round(scrollPosition / viewportHeight);
        
        if (activeIndex !== currentSlide && activeIndex < slides.length) {
            currentSlide = activeIndex;
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === activeIndex);
            });
        }
    }, 100);
});

// Gráficos con Chart.js
document.addEventListener('DOMContentLoaded', () => {
    
    // Gráfico de KPIs por Proceso
    const kpiCtx = document.getElementById('kpiChart');
    if (kpiCtx) {
        new Chart(kpiCtx, {
            type: 'radar',
            data: {
                labels: ['Seguridad', 'Infraestructura', 'Aplicaciones', 'Proyectos', 'Innovación'],
                datasets: [{
                    label: 'Cumplimiento 2025',
                    data: [95, 92, 88, 90, 85],
                    backgroundColor: 'rgba(0, 168, 232, 0.2)',
                    borderColor: 'rgba(0, 168, 232, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(0, 168, 232, 1)'
                }, {
                    label: 'Meta 2026',
                    data: [98, 95, 93, 95, 90],
                    backgroundColor: 'rgba(39, 174, 96, 0.2)',
                    borderColor: 'rgba(39, 174, 96, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(39, 174, 96, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }
    
    // Gráfico de Impacto en Operación
    const impactCtx = document.getElementById('impactChart');
    if (impactCtx) {
        new Chart(impactCtx, {
            type: 'bar',
            data: {
                labels: ['Reducción Costos', 'Tiempo Respuesta', 'Satisfacción', 'Disponibilidad', 'Automatización'],
                datasets: [{
                    label: 'Mejora (%)',
                    data: [23, 35, 18, 12, 45],
                    backgroundColor: [
                        'rgba(231, 76, 60, 0.8)',
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(155, 89, 182, 0.8)',
                        'rgba(39, 174, 96, 0.8)',
                        'rgba(241, 196, 15, 0.8)'
                    ],
                    borderColor: [
                        'rgba(231, 76, 60, 1)',
                        'rgba(52, 152, 219, 1)',
                        'rgba(155, 89, 182, 1)',
                        'rgba(39, 174, 96, 1)',
                        'rgba(241, 196, 15, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 50,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Mejora: ' + context.parsed.y + '%';
                            }
                        }
                    }
                }
            }
        });
    }
});

// Animaciones al hacer scroll a cada slide
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in, .fade-in-delay-1, .fade-in-delay-2, .fade-in-delay-3, .fade-in-delay-4, .fade-in-delay-5, .fade-in-delay-6').forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    });
}, observerOptions);

slides.forEach(slide => {
    observer.observe(slide);
});

// Prevenir scroll accidental muy rápido
let scrollTimeout;
fullpage.addEventListener('wheel', (e) => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Permitir scroll después de un pequeño delay
    }, 50);
}, { passive: true });

console.log('Presentación Área de Procesos cargada correctamente');