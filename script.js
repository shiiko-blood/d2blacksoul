// Función para alternar el menú
function toggleMenu() {
    const menuItems = document.querySelector('.menu-items');
    menuItems.classList.toggle('show');
}

// WebSocket para manejar mensajes
const wsUrl = window.location.hostname === 'localhost' ? 'ws://localhost:8080' : 'wss://tu-servidor.com';
const ws = new WebSocket(wsUrl);

ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    const chat = document.getElementById("chat");
    const mensaje = `<p><strong>${data.username}:</strong> ${data.content}</p>`;
    chat.innerHTML += mensaje;
    chat.scrollTop = chat.scrollHeight;
};

// Función para manejar el botón del menú
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const menuContainer = document.querySelector(".menu-container");

    menuIcon.addEventListener("click", function () {
        menuContainer.classList.toggle("show"); // Alterna la clase 'show'
    });
});

// Función para copiar texto al portapapeles
function copiarTexto() {
    const texto = document.getElementById("textoACopiar").innerText;

    navigator.clipboard.writeText(texto).then(() => {
        const mensaje = document.createElement('div');
        mensaje.textContent = "Texto copiado al portapapeles";
        mensaje.style.position = 'fixed';
        mensaje.style.bottom = '20px';
        mensaje.style.right = '20px';
        mensaje.style.backgroundColor = '#4caf50';
        mensaje.style.color = 'white';
        mensaje.style.padding = '10px';
        mensaje.style.borderRadius = '5px';
        document.body.appendChild(mensaje);

        setTimeout(() => mensaje.remove(), 3000);
    }).catch(err => {
        console.error("Error al copiar el texto: ", err);
    });
}