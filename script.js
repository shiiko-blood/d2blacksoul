function showPage(pageId) {
    let paginas = document.querySelectorAll('.pagina'); 
    paginas.forEach(pagina => pagina.classList.remove('activa'));
    document.getElementById(pageId).classList.add('activa'); 
}

document.addEventListener("DOMContentLoaded", function() {
    showPage('inicio'); 

    // Asegurar que el modal funcione en todas las páginas
    configurarModal();

    // Evento para el buscador
    const searchLabel = document.querySelector('.search-label');
    const buscador = document.getElementById('buscador');
    
    if (searchLabel) {
        searchLabel.addEventListener('click', () => buscador.focus());
    }

    // Inicializar secciones colapsables
    document.querySelectorAll('.content').forEach(section => section.style.display = 'block');
    document.querySelectorAll('.arrow').forEach(arrow => arrow.style.transform = 'rotate(180deg)');

    // Evento para navegación suave
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mostrar u ocultar botón de inicio
    window.onscroll = function() {
        const botonInicio = document.getElementById("boton-inicio");
        botonInicio.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
    };

    // Evento para volver al inicio
    document.getElementById("boton-inicio")?.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('change', function() {
        if (menuToggle.checked) {
            menu.style.display = 'flex';
        } else {
            menu.style.display = 'none';
        }
    });
});

// Función para configurar el modal en todas las páginas
function configurarModal() {
    const modal = document.getElementById("miModal");
    const modalImg = document.getElementById("imagenModal");

    if (!modal || !modalImg) {
        console.warn("Modal no encontrado en esta página.");
        return;
    }

    // Función para abrir el modal
    window.abrirModal = function(imagenSrc) {
        modal.style.display = "block";
        modalImg.src = imagenSrc;
    };

    // Función para cerrar el modal
    window.cerrarModal = function() {
        modal.style.display = "none";
    };

    // Cerrar modal si se hace clic fuera de él
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

// Función para alternar secciones colapsables
function toggleSection(element) {
    const content = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');
    
    content.classList.toggle('activo'); 
    arrow.style.transform = content.classList.contains('activo') ? 'rotate(180deg)' : 'rotate(0deg)';
}

// Función de búsqueda
function buscarEscudos() {
    let filter = document.getElementById("buscador")?.value.toLowerCase();
    document.querySelectorAll(".runeword-box").forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(filter) ? "" : "none";
        item.classList.toggle("oculto", !item.textContent.toLowerCase().includes(filter));
    });
}
function openCarousel() {
    document.querySelector(".carousel-container").classList.toggle("active");
}
function moveCarousel(direction) {
    index = (index + direction + images.length) % images.length;
    carousel.style.transition = "transform 0.5s ease-in-out";
    carousel.style.transform = `translateX(${-index * 100}px)`;
}

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const menuCarrusel = document.getElementById("menuCarrusel");
    const gifButton = document.getElementById("gifButton");

    const centerX = menuCarrusel.offsetWidth / 2;
    const centerY = menuCarrusel.offsetHeight / 2;
    const radius = 100; // Distancia al GIF
    let angleOffset = 0; // Control del ángulo basado en el mouse

    menuCarrusel.addEventListener("mousemove", (event) => {
        let mouseX = event.clientX - menuCarrusel.getBoundingClientRect().left;
        let mouseY = event.clientY - menuCarrusel.getBoundingClientRect().top;

        // Determinar la dirección del movimiento
        angleOffset = (mouseX - centerX) * 0.01; // Ajusta la velocidad de giro

        slides.forEach((slide, index) => {
            let angle = ((index / slides.length) * 2 * Math.PI) + angleOffset;
            let x = centerX + radius * Math.cos(angle) - slide.offsetWidth / 2;
            let y = centerY + radius * Math.sin(angle) - slide.offsetHeight / 2;

            slide.style.left = `${x}px`;
            slide.style.top = `${y}px`;

            // Cambiar z-index para que las imágenes pasen por detrás o delante
            slide.style.zIndex = y > centerY ? 5 : 15;
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const openSlider = document.getElementById("openSlider");
    const closeSlider = document.getElementById("closeSlider");
    const sliderOverlay = document.getElementById("sliderOverlay");

    // Mostrar slider
    openSlider.addEventListener("click", function() {
        sliderOverlay.style.display = "flex";
    });

    // Cerrar slider al hacer clic en el botón de cerrar
    closeSlider.addEventListener("click", function() {
        sliderOverlay.style.display = "none";
    });

    // Cerrar slider al hacer clic en cualquier parte del overlay
    sliderOverlay.addEventListener("click", function(event) {
        // Verifica si el clic fue fuera del slider (no dentro de .container)
        if (!event.target.closest(".container")) {
            sliderOverlay.style.display = "none";
        }
    });

    // Inicializar Swiper
    const swiper = new Swiper(".swiper", {
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    let currentContent = null;
    let isSliderOpen = true;

    // Detectar clic en cada slide y mostrar el contenido
    document.querySelectorAll(".swiper-slide").forEach(slide => {
        slide.addEventListener("click", function(event) {
            let contentId = this.getAttribute("data-content");

            // Ocultar slider
            sliderOverlay.style.display = "none";
            isSliderOpen = false;

            // Mostrar contenido seleccionado
            currentContent = document.getElementById(contentId);
            currentContent.style.display = "block";

            // Evitar que el clic inicial cierre el contenido
            event.stopPropagation();
        });
    });

    // Cerrar contenido o slider al hacer clic fuera
    document.addEventListener("click", function(event) {
        if (currentContent && !currentContent.contains(event.target)) {
            // Si hay contenido abierto, ciérralo
            currentContent.style.display = "none";
            currentContent = null;
        } else if (isSliderOpen && !sliderOverlay.contains(event.target)) {
            // Si el slider está abierto, ciérralo
            sliderOverlay.style.display = "none";
            isSliderOpen = false;
        }
    });

    // Configuración del menú
    const menuToggle = document.getElementById("menu-toggle");
    const iconoMenu = document.getElementById("icono-menu");
    const menu = document.querySelector(".menu");

    menuToggle.addEventListener("change", function() {
        if (this.checked) {
            menu.style.display = "block";
            iconoMenu.src = "imagenes/menu-close.png"; // Icono de cerrar
        } else {
            menu.style.display = "none";
            iconoMenu.src = "imagenes/menu-open.png"; // Icono de abrir
        }
    });
});
function showPage(pageId) {
    let paginas = document.querySelectorAll('.pagina'); 
    paginas.forEach(pagina => pagina.classList.remove('activa'));
    document.getElementById(pageId).classList.add('activa'); 
}

document.addEventListener("DOMContentLoaded", function() {
    showPage('inicio'); 

    // Asegurar que el modal funcione en todas las páginas
    configurarModal();

    // Evento para el buscador
    const searchLabel = document.querySelector('.search-label');
    const buscador = document.getElementById('buscador');
    
    if (searchLabel) {
        searchLabel.addEventListener('click', () => buscador.focus());
    }

    // Inicializar secciones colapsables
    document.querySelectorAll('.content').forEach(section => section.style.display = 'block');
    document.querySelectorAll('.arrow').forEach(arrow => arrow.style.transform = 'rotate(180deg)');

    // Evento para navegación suave
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mostrar u ocultar botón de inicio
    window.onscroll = function() {
        const botonInicio = document.getElementById("boton-inicio");
        botonInicio.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
    };

    // Evento para volver al inicio
    document.getElementById("boton-inicio")?.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('change', function() {
        if (menuToggle.checked) {
            menu.style.display = 'flex';
        } else {
            menu.style.display = 'none';
        }
    });
});

// Función para configurar el modal en todas las páginas
function configurarModal() {
    const modal = document.getElementById("miModal");
    const modalImg = document.getElementById("imagenModal");

    if (!modal || !modalImg) {
        console.warn("Modal no encontrado en esta página.");
        return;
    }

    // Función para abrir el modal
    window.abrirModal = function(imagenSrc) {
        modal.style.display = "block";
        modalImg.src = imagenSrc;
    };

    // Función para cerrar el modal
    window.cerrarModal = function() {
        modal.style.display = "none";
    };

    // Cerrar modal si se hace clic fuera de él
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

// Función para alternar secciones colapsables
function toggleSection(element) {
    const content = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');
    
    content.classList.toggle('activo'); 
    arrow.style.transform = content.classList.contains('activo') ? 'rotate(180deg)' : 'rotate(0deg)';
}

// Función de búsqueda
function buscarEscudos() {
    let filter = document.getElementById("buscador")?.value.toLowerCase();
    document.querySelectorAll(".runeword-box").forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(filter) ? "" : "none";
        item.classList.toggle("oculto", !item.textContent.toLowerCase().includes(filter));
    });
}
function openCarousel() {
    document.querySelector(".carousel-container").classList.toggle("active");
}
function moveCarousel(direction) {
    index = (index + direction + images.length) % images.length;
    carousel.style.transition = "transform 0.5s ease-in-out";
    carousel.style.transform = `translateX(${-index * 100}px)`;
}

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const menuCarrusel = document.getElementById("menuCarrusel");
    const gifButton = document.getElementById("gifButton");

    const centerX = menuCarrusel.offsetWidth / 2;
    const centerY = menuCarrusel.offsetHeight / 2;
    const radius = 100; // Distancia al GIF
    let angleOffset = 0; // Control del ángulo basado en el mouse

    menuCarrusel.addEventListener("mousemove", (event) => {
        let mouseX = event.clientX - menuCarrusel.getBoundingClientRect().left;
        let mouseY = event.clientY - menuCarrusel.getBoundingClientRect().top;

        // Determinar la dirección del movimiento
        angleOffset = (mouseX - centerX) * 0.01; // Ajusta la velocidad de giro

        slides.forEach((slide, index) => {
            let angle = ((index / slides.length) * 2 * Math.PI) + angleOffset;
            let x = centerX + radius * Math.cos(angle) - slide.offsetWidth / 2;
            let y = centerY + radius * Math.sin(angle) - slide.offsetHeight / 2;

            slide.style.left = `${x}px`;
            slide.style.top = `${y}px`;

            // Cambiar z-index para que las imágenes pasen por detrás o delante
            slide.style.zIndex = y > centerY ? 5 : 15;
        });
    });
});
