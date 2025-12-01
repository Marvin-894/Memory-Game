// Array con 17 pares de vehículos para un total de 34 tarjetas
const autos = ['🚗', '🚕', '🚓', '🚑', '🚒', '🚚', '🚛', '🚌', '🚜', '🏎️', '🏍️', '🚲', '🚁', '🚢', '🚀', '🚂', '🛸']; 

// El tablero del juego
const gameBoard = document.getElementById('game-board');
const matchDiv = document.getElementById('celebration-match');
const winDiv = document.getElementById('celebration-win');
const finalMovesP = document.getElementById('final-moves');

// Variables de estado del juego
let tarjetaVolteada = null; 
let bloqueoTablero = false; 
let movimientos = 0;
let paresEncontrados = 0;

// Emojis de celebración para el par encontrado
const emojisMatch = ['🎉', '👍', '🥳', '🌟', '🤩']; 

// Función para inicializar o reiniciar el juego
function iniciarJuego() {
    // Ocultar celebraciones
    matchDiv.classList.add('hidden');
    winDiv.classList.add('hidden');
    
    // Reiniciar variables
    movimientos = 0;
    paresEncontrados = 0;
    document.getElementById('moves').textContent = `Movimientos: ${movimientos}`;
    gameBoard.innerHTML = ''; // Limpiar el tablero

    // Duplicar y mezclar los autos
    const gameCards = [...autos, ...autos];
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

// ... (mezclarCartas, voltearTarjeta se mantienen igual)

// Lógica de pares encontrados (AÑADIMOS LA CELEBRACIÓN DE PAR)
function tarjetaEncontrada(segundaTarjeta) {
    // Desactivar el clic en ambas tarjetas
    tarjetaVolteada.removeEventListener('click', voltearTarjeta);
    segundaTarjeta.removeEventListener('click', voltearTarjeta);
    
    tarjetaVolteada.classList.add('match');
    segundaTarjeta.classList.add('match');
    
    paresEncontrados++;

    // 🏆 NUEVO: Mostrar el mensaje de "Genial!"
    celebrarMatch();

    reiniciarTurno();

    // Revisar si el juego terminó (AÑADIMOS LA CELEBRACIÓN FINAL)
    if (paresEncontrados === autos.length) {
        // En lugar de alert, llamamos a la función de victoria
        setTimeout(() => celebrarVictoria(), 500); 
    }
}

// Lógica de tarjetas que no coinciden (se mantiene igual)
function desvoltearTarjetas(segundaTarjeta) {
    setTimeout(() => {
        tarjetaVolteada.classList.remove('flip');
        segundaTarjeta.classList.remove('flip');
        reiniciarTurno();
    }, 1500);
}

// Resetear las variables de control para un nuevo turno (se mantiene igual)
function reiniciarTurno() {
    tarjetaVolteada = null;
    bloqueoTablero = false;
}

// === NUEVAS FUNCIONES DE CELEBRACIÓN ===

function celebrarMatch() {
    // Seleccionar un emoji y texto aleatorio
    const randomEmoji = emojisMatch[Math.floor(Math.random() * emojisMatch.length)];
    document.getElementById('match-text').textContent = `¡Genial! ${randomEmoji}`;

    // Mostrar el mensaje
    matchDiv.classList.remove('hidden');

    // Ocultar el mensaje después de 1 segundo
    setTimeout(() => {
        matchDiv.classList.add('hidden');
    }, 1000); 
}

function celebrarVictoria() {
    // Mostrar la celebración de ganar
    winDiv.classList.remove('hidden');
    
    // Actualizar el texto con los movimientos
    finalMovesP.textContent = `Lo hiciste en ${movimientos} movimientos.`;
    
    // NOTA: Para reiniciar, el jugador debe hacer clic en el botón "Reiniciar"
}

// Función auxiliar para mezclar (se mantiene igual)
function mezclarCartas(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Iniciar el juego automáticamente al cargar la página
iniciarJuego();
