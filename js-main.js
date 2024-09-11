document.addEventListener('DOMContentLoaded', () => {
    // Menú responsive
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('show');
    });

    // Smooth scrolling para los enlaces de navegación
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Animación de aparición para las características
    const features = document.querySelectorAll('.feature');
    window.addEventListener('scroll', () => {
        features.forEach(feature => {
            if (isElementInViewport(feature)) {
                feature.classList.add('visible');
            }
        });
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('formulario-contacto');
    contactForm.addEventListener('submit', handleSubmit);
});

function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const headerOffset = document.querySelector('header').offsetHeight;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });

    // Cerrar el menú móvil después de hacer clic en un enlace
    document.querySelector('nav').classList.remove('show');
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const mensaje = formData.get('mensaje');

    
    alert(`Gracias ${nombre}! Tu mensaje ha sido enviado. Te contactaremos pronto en ${email}.`);
    e.target.reset();
}

// Añadir clase 'visible' a las características cuando están en el viewport
function handleFeatureAnimation() {
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        if (isElementInViewport(feature)) {
            feature.classList.add('visible');
        }
    });
}

// Llamar a la función de animación cuando se carga la página y en cada scroll
window.addEventListener('load', handleFeatureAnimation);
window.addEventListener('scroll', handleFeatureAnimation);