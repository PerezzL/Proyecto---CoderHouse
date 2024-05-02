let contenedor = document.querySelector('#contenedor');
let botonComenzar = document.querySelector('.botonComenzar');
let inputNombre = document.querySelector('input');
let seleccionarDificultad = document.querySelector('select');
let labelInput = document.querySelector('.label-input');
let labelselect = document.querySelector('.label-select');
let botonPuntos = document.querySelector('.BotonScoreBoard');
let botonProm = document.querySelector('.botonProm');
let contenedorJuego = document.querySelector('.contenedor-juego');
let botonShuffle = document.querySelector('.iconoAleatorio');

let nombresAleatorios = [
    { indice: 1, nombre: 'Vegetta777' },
    { indice: 2, nombre: 'Willyrex' },
    { indice: 3, nombre: 'ElRubiusOMG' },
    { indice: 4, nombre: 'TheGrefg' },
    { indice: 5, nombre: 'Markiplier' },
    { indice: 6, nombre: 'Fernanfloo' },
    { indice: 7, nombre: 'Luzu' },
    { indice: 8, nombre: 'PewDiePie' },
    { indice: 9, nombre: 'Staxx' },
    { indice: 10, nombre: 'Mangel' },
]

let playerName;
let dificultad;
let numeroMax;
let numeroIntentos;
let numeroRandom;
let intentoActual = 0;
let puntos;
let numeroIntentosInicial;

//FUNCION PARA COMPARAR UN NUMERO GENERADO AL AZAR Y DEVOLVER EL NOMBRE CORRESPONDIENTE
function obtenerNombreAleatorio() {
    const indiceAleatorio = generarNumero(1, 10);
    const nombreAleatorio = nombresAleatorios.find(nombre => nombre.indice === indiceAleatorio);
    if (nombreAleatorio) {
        inputNombre.value = nombreAleatorio.nombre;
        return nombreAleatorio.nombre;
    }
}

//FUNCION PARA GENERAR NUMERO AL AZAR
function generarNumero(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//FUNCION DEL JUEGO, SE VERIFICA LA DIFICULTAD Y DEPENDIENDO DE ESO SE PONEN LAS INTENTOS Y EL RANGO CORRESPONDIENTE
function StartGame(){
    contenedorJuego.style.display = 'none';

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
            return;
    }

    numeroRandom = generarNumero(1, numeroMax);

    numeroIntentosInicial = numeroIntentos;

    let instrucciones = document.createElement('p');
    instrucciones.textContent = `Hola ${playerName}, adivina un número entre 1 y ${numeroMax}. Tienes ${numeroIntentos} intentos.`;
    contenedor.appendChild(instrucciones);


    let inputNumero = document.createElement('input');
    inputNumero.type="number";
    inputNumero.placeholder = 'Ingresar tu número';
    contenedor.appendChild(inputNumero);

    let intentosRestantes = document.createElement('p');
    intentosRestantes.textContent = `Intentos restantes: ${numeroIntentos}`;
    contenedor.appendChild(intentosRestantes);

    let botonAdivinar = document.createElement('button');
    botonAdivinar.textContent = 'Adivinar';
    contenedor.appendChild(botonAdivinar);

    botonAdivinar.addEventListener('click', function() {
        let numeroIngresado = parseInt(inputNumero.value);

        if (isNaN(numeroIngresado) || numeroIngresado < 1 || numeroIngresado > numeroMax) {
            showToast(rango);
            return;
        }

        intentoActual++;
        numeroIntentos--;

        intentosRestantes.textContent = `Intentos restantes: ${numeroIntentos}`;

        if (numeroIngresado == numeroRandom){
            sweetAlertWin();

            inputNumero.disabled = true;
            botonAdivinar.disabled = true;


            let puntosGuardados = JSON.parse(localStorage.getItem('puntos')) || [];
            puntosGuardados.push({ nombre: playerName, puntos: puntos });
            localStorage.setItem('puntos', JSON.stringify(puntosGuardados));

        } else {
            if (numeroIntentos === 0){
                inputNumero.disabled = true;
                botonAdivinar.disabled = true;
                sweetAlertLose();
            }
        }
    })

    let divBotones = document.createElement('div');
    divBotones.className = 'divBotones';
    contenedor.appendChild(divBotones);

    const botonReiniciar = document.createElement('button');
    botonReiniciar.textContent = 'Reiniciar Partida';
    divBotones.appendChild(botonReiniciar);
    botonReiniciar.addEventListener('click', () => {
        intentoActual = 0;
        numeroRandom = generarNumero(1, numeroMax);
        numeroIntentos = numeroIntentosInicial;
        intentosRestantes.textContent = `Intentos restantes: ${numeroIntentos}`;
        inputNumero.disabled = false;
        botonAdivinar.disabled = false;
    });

    let botonSalida = document.createElement('button');
    botonSalida.textContent = 'Salir del Juego';
    divBotones.appendChild(botonSalida);
    botonSalida.addEventListener('click', function(){
        location.reload();
    });
}


//BOTON PARA EMPEZAR EL JUEGO
botonComenzar.addEventListener('click', function() {
    playerName = inputNombre.value.trim();
    if (playerName !== '') {
        StartGame();
    } else {
        showToast(ingresarNombre);
    }
});

//BOTON PARA PEDIR NOMBRE ALEATORIO
botonShuffle.addEventListener('click', function() {
    inputNombre.value = obtenerNombreAleatorio();
    playerName = inputNombre.value.trim();
});