// --- 0. Confirmacion de fecha
document.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.getElementById("fecha-reserva");

    // 1. Obtener la fecha minima y maxima de reserva
    const minFecha = new Date();
    const maxFecha = new Date();
    maxFecha.setMonth(minFecha.getMonth() + 1);
    minFecha.setDate(minFecha.getDate() + 1);

    // 2. Función para formatear fechas a 'YYYY-MM-DD' sin perder la zona horaria local
    const formatearFecha = (fecha) => {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
    };

    // 3. Aplicar los límites mínimos y máximos al input
    dateInput.min = formatearFecha(minFecha);
    dateInput.max = formatearFecha(maxFecha);
});


// --- 1. FORMULARIO DE RESERVA DE WHATSAPP ---
const formulario = document.getElementById('reservaForm');
if (formulario) {
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const servicio = document.getElementById('servicio').value;
        // Obtener fecha por dia-mes-año
        const fechaBase = document.getElementById('fecha-reserva').value;
        const [year, month, day] = fechaBase.split('-');
        const fecha = `${day}-${month}-${year}`;

        const hora = document.getElementById('hora').value;

        const mensaje = `Hola, mi nombre es ${nombre} y deseo agendar una hora para ${servicio} el día ${fecha} a las ${hora} hrs. ¿Está disponible?`;
        window.open(`https://wa.me/56912345678?text=${encodeURIComponent(mensaje)}`, '_blank');
    });
}

// --- 2. MOTOR DE REVELADO DE TEXTOS ---
function iniciarAnimaciones() {
    const elementos = document.querySelectorAll('.animar-elemento');
    if (!('IntersectionObserver' in window)) {
        elementos.forEach(el => el.classList.add('visible'));
        return;
    }
    const opciones = { root: null, rootMargin: "0px 0px -80px 0px", threshold: 0.05 };
    const observador = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, opciones);
    elementos.forEach(el => observador.observe(el));
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarAnimaciones);
} else { iniciarAnimaciones(); }
