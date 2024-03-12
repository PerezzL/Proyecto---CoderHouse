//Generar numero random
const generarNumero = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Ver si la respuesta es correcta
const verRespuesta = (numAdivinado, numCorrecto, intentos) => {
    if(numAdivinado == numCorrecto){
        alert('Felicidades! Ganaste el juego!');
        console.log('Felicidades! Ganaste el juego!');
        return true;
    } else {
        return alert('Numero incorrecto, vas ' + intentos + ' intentos');
    }
}

//Pedirle un número al usuario 
const pedirNum = (min, max, intentosRestantes) => {
    let numero = parseInt(prompt('Ingrese un número entre el ' + min + ' y el ' + max + '\nTienes: ' + intentosRestantes + ' intentos restantes'));
    while (numero < min || numero > max) {
        alert('Por favor, ingrese un número válido dentro del rango especificado.');
        numero = parseInt(prompt('Ingrese un número entre el ' + min + ' y el ' + max + '\nTienes: ' + intentosRestantes + ' intentos restantes'));
    }
    return numero;
} 

//Configuración del juego
const adivinarElNumero = (min, max, numIntentos) => {
    const numAleatorio = generarNumero(min, max);
    let intentosRestantes = numIntentos;
    let intentos = 0;

    while(intentosRestantes > 0){
        let numeroAdivinado = pedirNum(min, max, intentosRestantes);

        intentosRestantes--;
        intentos++;

        if (verRespuesta(numeroAdivinado, numAleatorio, intentos) == true){
            return;
        } 
        if (intentosRestantes == 0) {
            alert('Te quedaste sin intentos. El numero correcto era: ' + numAleatorio);
            console.warn('Te quedaste sin intentos. El numero correcto era: ' + numAleatorio);
            return;
        }

    }

}

//Iniciar el juego
const cargarJuego = () => {
    let nombreJugador = prompt('Cual es tu nombre?');
    let dificultad = prompt('Bienvenid@ ' + nombreJugador + ' a Adivinar el numero \nPara Nivel Facil escribir: 1 \nPara Nivel Intermedio escribir: 2 \nPara Nivel Dificil escribir: 3');

    switch(dificultad){
        case '1':
            adivinarElNumero(1, 10, 7);
            console.log('Nivel Facil');
            break;
        case '2':
            adivinarElNumero(1, 20, 5);
            console.log('Nivel Intermedio');
            break;
        case '3':
            adivinarElNumero(1, 30, 3);
            console.log('Nivel Dificil');
            break;
        default:
            alert('Ingresar opcion válida');
            console.warn('Ingresar una opción válida');
            cargarJuego();
            break;
    }
    
}

//Cargar el juego
cargarJuego();