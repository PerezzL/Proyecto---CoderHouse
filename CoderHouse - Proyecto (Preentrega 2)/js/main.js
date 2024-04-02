let contenedor = document.querySelector('#contenedor');
let botonComenzar = document.querySelector('button');

let playerName;
let dificultad;
let numeroMax;
let numeroIntentos;
let numeroRandom;
let intentoActual = 0;
let puntos;

function generarNumero(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function StartGame(){
    botonComenzar.style.display = 'none';
    let inputPlayerName = document.querySelector('input');
    playerName = inputPlayerName.value.trim();

    let opcionDificultad = document.querySelector('select');
    dificultad = parseInt(opcionDificultad.value);
    
    switch (dificultad) {
        case 1:
            numeroMax = 10;
            numeroIntentos = 7;
            puntos = 10;
            break;
        case 2:
            numeroMax = 20;
            numeroIntentos = 5;
            puntos = 25;
            break;
        case 3:
            numeroMax = 30;
            numeroIntentos = 3;
            puntos = 50;
            break;
        case 4:
            numeroMax = 100;
            numeroIntentos = 1;
            puntos = 150;
            break;
        default:
            alert("Selecciona una opción válida.");
            return;
    }

    numeroRandom = generarNumero(1, numeroMax); 

    let instrucciones = document.createElement('p');
    instrucciones.textContent = `Hola ${playerName}, adivina un número entre 1 y ${numeroMax}. Tienes ${numeroIntentos} intentos.`;
    contenedor.appendChild(instrucciones);


    let inputNumero = document.createElement('input');
    inputNumero.type="number";
    inputNumero.placeholder = 'Ingresar tu número';
    contenedor.appendChild(inputNumero);


    let botonAdivinar = document.createElement('button');
    botonAdivinar.textContent = 'Adivinar';
    contenedor.appendChild(botonAdivinar);


    let intentosRestantes = document.createElement('p');
    intentosRestantes.textContent = `Intentos restantes: ${numeroIntentos}`;
    contenedor.appendChild(intentosRestantes);
    

    botonAdivinar.addEventListener('click', function() {
        let numeroIngresado = parseInt(inputNumero.value);
        if (isNaN(numeroIngresado) || numeroIngresado < 1 || numeroIngresado > numeroMax) {
            alert('Por favor, ingrese un número válido dentro del rango especificado.');
            return;
        }
        intentoActual++;
        numeroIntentos--;

        intentosRestantes.textContent = `Intentos restantes: ${numeroIntentos}`;

        if (numeroIngresado == numeroRandom){
            let felicitación = document.createElement('p');
            felicitación.textContent = '!Ganaste el juego!';
            contenedor.appendChild(felicitación);

            inputNumero.disabled = true;
            botonAdivinar.disabled = true;

            let puntosGuardados = JSON.parse(localStorage.getItem('puntos')) || [];
            puntosGuardados.push({ nombre: playerName, puntos: puntos });
            localStorage.setItem('puntos', JSON.stringify(puntosGuardados));

            intentosRestantes.remove();
        } else {
            if (numeroIntentos === 0){
                inputNumero.disabled = true;
                botonAdivinar.disabled = true;
                EndGame();
            }
        }
    })
reiniciarJuego();
}
   
function EndGame(){
    let finJuego = document.createElement('p');
    finJuego.textContent = '¡Perdiste!  El número era ' + numeroRandom + '.';
    contenedor.appendChild(finJuego);
}


botonComenzar.addEventListener('click', StartGame);