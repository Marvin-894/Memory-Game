// Array con 18 pares de vehículos para un total de 36 tarjetas
const autos = ['🚗', '🚕', '🚓', '🚑', '🚒', '🚚', '🚛', '🚌', '🚜', '🏎️', '🏍️', '🚲', '🚁', '🚢', '🚀', '🚂', '🛸', '🛰️']; 

// Referencias a elementos del DOM
const gameBoard = document.getElementById('game-board');
const matchDiv = document.getElementById('celebration-match');
const winDiv = document.getElementById('celebration-win');
const finalMovesP = document.getElementById('final-moves');

// Variables de estado del juego
let tarjetaVolteada = null; 
let bloqueoTablero = false; 
let movimientos = 0;
let paresEncontrados = 0;

// Mensajes y emojis para el par encontrado
const mensajesMatch = [
    { text: '¡Genial!', emoji: '👍' },
    { text: '¡Súper!', emoji: '🥳' },
    { text: '¡Crack!', emoji: '🌟' },
    { text: '¡Vamos!', emoji: '🤩' }
]; 

// Función principal para inicializar o reiniciar el juego
function iniciarJuego() {
    // Ocultar celebraciones
    if (matchDiv) matchDiv.classList.add('hidden');
    if (winDiv) winDiv.classList.add('hidden');
    
    // Reiniciar variables
    movimientos = 0;
    paresEncontrados = 0;
    if (document.getElementById('moves')) {
        document.getElementById('moves').textContent = `Movimientos: ${movimientos}`;
    }
    
    if (gameBoard) {
        gameBoard.innerHTML = ''; // Limpiar el tablero
        
        // Duplicar y mezclar los autos
        const gameCards = [...autos, ...autos]; // 18 pares = 36 tarjetas
        mezclarCartas(gameCards); 

        // Crear elementos HTML para cada tarjeta
        gameCards.forEach(auto => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.auto = auto;

            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-face">${auto}</div>
                    <div class="card-back">JIM</div> 
                </div>
            `;
            
            card.addEventListener('click', voltearTarjeta);
            gameBoard.appendChild(card);
        });
    }
}

// Lógica al hacer clic en una tarjeta
function voltearTarjeta() {
    if (bloqueoTablero || this === tarjetaVolteada || this.classList.contains('match')) return;
    this.classList.add('flip');

    if (!tarjetaVolteada) {
        tarjetaVolteada = this;
        return;
    }
    
    movimientos++;
    document.getElementById('moves').textContent = `Movimientos: ${movimientos}`;
    
    bloqueoTablero = true;

    if (this.dataset.auto === tarjetaVolteada.dataset.auto) {
        tarjetaEncontrada(this);
    } else {
        desvoltearTarjetas(this);
    }
}

// Lógica de pares encontrados
function tarjetaEncontrada(segundaTarjeta) {
    tarjetaVolteada.removeEventListener('click', voltearTarjeta);
    segundaTarjeta.removeEventListener('click', voltearTarjeta);
    
    tarjetaVolteada.classList.add('match');
    segundaTarjeta.classList.add('match');
    
    paresEncontrados++;

    celebrarMatch();

    reiniciarTurno();

    if (paresEncontrados === autos.length) {
        setTimeout(() => celebrarVictoria(), 500); 
    }
}

// Lógica de tarjetas que no coinciden
function desvoltearTarjetas(segundaTarjeta) {
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

// === FUNCIONES DE CELEBRACIÓN ===
function celebrarMatch() {
    if (!matchDiv) return;
    const randomMessage = mensajesMatch[Math.floor(Math.random() * mensajesMatch.length)];
    document.getElementById('match-text').textContent = `${randomMessage.text} ${randomMessage.emoji}`;

    matchDiv.classList.remove('hidden');
    // Reinicia la animación
    matchDiv.style.animation = 'none';
    matchDiv.offsetHeight; 
    matchDiv.style.animation = null; 

    setTimeout(() => {
        matchDiv.classList.add('hidden');
    }, 1000); 
}

function celebrarVictoria() {
    if (!winDiv || !finalMovesP) return;
    winDiv.classList.remove('hidden');
    finalMovesP.textContent = `Lo hiciste en ${movimientos} movimientos.`;
}

// Función auxiliar para mezclar
function mezclarCartas(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// CORRECCIÓN CRÍTICA: Asegura que el juego se inicie SOLAMENTE cuando el HTML se haya cargado
// Esto soluciona el problema de que las tarjetas no aparezcan al inicio.
document.addEventListener('DOMContentLoaded', iniciarJuego);
