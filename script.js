// Array con 16 pares de autos/vehículos para un total de 32 tarjetas
const autos = ['🚗', '🚕', '🚓', '🚑', '🚒', '🚚', '🚛', '🚌', '🚜', '🏎️', '🏍️', '🚲', '🚁', '🚢', '🚀', '🚂'];

// El tablero del juego
const gameBoard = document.getElementById('game-board');

// Variables de estado del juego
let tarjetaVolteada = null; 
let bloqueoTablero = false; 
let movimientos = 0;
let paresEncontrados = 0;

// Función para inicializar o reiniciar el juego
function iniciarJuego() {
    // Reiniciar variables
    movimientos = 0;
    paresEncontrados = 0;
    document.getElementById('moves').textContent = `Movimientos: ${movimientos}`;
    gameBoard.innerHTML = ''; // Limpiar el tablero

    // Duplicar y mezclar los autos
    const gameCards = [...autos, ...autos]; // Duplicar los 16 elementos a 32
    mezclarCartas(gameCards); // Mezclar

    // Crear elementos HTML para cada tarjeta
    gameCards.forEach(auto => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.auto = auto; // Almacena el valor del auto

        // Estructura interna (Cara y Dorso)
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-face">${auto}</div>
                <div class="card-back">Memoria</div>
            </div>
        `;
        
        // Asignar el evento de clic
        card.addEventListener('click', voltearTarjeta);
        
        gameBoard.appendChild(card);
    });
}

// Función para mezclar un array (Algoritmo Fisher-Yates)
function mezclarCartas(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Lógica al hacer clic en una tarjeta
function voltearTarjeta() {
    // 1. Si el tablero está bloqueado, o ya está volteada, ignora el clic
    if (bloqueoTablero || this === tarjetaVolteada) return;

    this.classList.add('flip'); // Añade la clase 'flip' para voltear

    if (!tarjetaVolteada) {
        // Primera tarjeta volteada
        tarjetaVolteada = this;
        return;
    }

    // Segunda tarjeta volteada:
    
    // Aumentar contador de movimientos
    movimientos++;
    document.getElementById('moves').textContent = `Movimientos: ${movimientos}`;
    
    // Bloquear el tablero temporalmente
    bloqueoTablero = true;

    // Verificar si hay coincidencia
    if (this.dataset.auto === tarjetaVolteada.dataset.auto) {
        // ¡Coincidencia encontrada!
        tarjetaEncontrada(this);
    } else {
        // No hay coincidencia
        desvoltearTarjetas(this);
    }
}

// Lógica de pares encontrados
function tarjetaEncontrada(segundaTarjeta) {
    // Desactivar el clic en ambas tarjetas
    tarjetaVolteada.removeEventListener('click', voltearTarjeta);
    segundaTarjeta.removeEventListener('click', voltearTarjeta);
    
    // Añadir clase 'match' para un estilo visual
    tarjetaVolteada.classList.add('match');
    segundaTarjeta.classList.add('match');
    
    paresEncontrados++;

    // Desbloquear el tablero para el siguiente turno
    reiniciarTurno();

    // Revisar si el juego terminó
    if (paresEncontrados === autos.length) {
        setTimeout(() => alert(`🎉 ¡Felicidades! Terminaste el juego de 32 tarjetas en ${movimientos} movimientos.`), 500);
    }
}

// Lógica de tarjetas que no coinciden
function desvoltearTarjetas(segundaTarjeta) {
    // Esperar 1.5 segundos (1500ms) para que el niño vea las tarjetas
    setTimeout(() => {
        tarjetaVolteada.classList.remove('flip');
        segundaTarjeta.classList.remove('flip');
        reiniciarTurno();
    }, 1500);
}

// Resetear las variables de control para un nuevo turno
function reiniciarTurno() {
    tarjetaVolteada = null;
    bloqueoTablero = false;
}

// Iniciar el juego automáticamente al cargar la página
iniciarJuego();
