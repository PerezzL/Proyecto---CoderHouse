let botonScore = document.querySelector('#contenedor');
let botonVuelta = document.querySelector('.BackToMain');

//FUNCION PARA MOSTRAR LOS PUNTOS EN FORMA DE LISTA, SE SUMAN LOS PUNTOS DEL USUSARIO CON MISMO NOMBRE
function mostrarPuntos() {
    const puntosGuardados = JSON.parse(localStorage.getItem('puntos')) || [];
    const contenedorPuntos = document.getElementById('scoresLista');
    const puntosPorNombre = {};

    puntosGuardados.forEach(punto => {
        if (puntosPorNombre[punto.nombre]) {
            puntosPorNombre[punto.nombre] += punto.puntos;
        } else {
            puntosPorNombre[punto.nombre] = punto.puntos;
        }
    });

    Object.keys(puntosPorNombre).forEach(nombre => {
        const elementoPuntos = document.createElement('li');
        elementoPuntos.textContent = `El jugador ${nombre} tiene => ${puntosPorNombre[nombre]} puntos`;
        contenedorPuntos.appendChild(elementoPuntos);
    });

    let divBotonesScore = document.createElement('div');
    divBotonesScore.className = 'divBotonesScore';
    contenedor.appendChild(divBotonesScore);

    let botonChangeName = document.createElement('button');
    botonChangeName.className = 'buttonChangeName';
    botonChangeName.textContent = 'Cambiar Nombre';
    botonChangeName.addEventListener('click', () => {
        botonChangeName.style.display = 'none';
        botonBorrar.style.display = 'none';
        changeName();
    });
    divBotonesScore.appendChild(botonChangeName);

    let botonBorrar = document.createElement('button');
    botonBorrar.className = 'buttonDelete';
    botonBorrar.textContent = 'Borrar Puntos';
    botonBorrar.addEventListener('click', borrarPuntos);
    divBotonesScore.appendChild(botonBorrar);
}


function borrarPuntos() {
    localStorage.removeItem('puntos');
    const contenedorPuntos = document.getElementById('scoresLista');
    contenedorPuntos.innerHTML = '';
}

//SE BORRA LOSD ATOS DEL LOCAL.STORAGE
function changeName() {
    let inputNombreAnterior = document.createElement('input');
    inputNombreAnterior.type = 'text';
    inputNombreAnterior.placeholder = 'Nombre a Cambiar';
    contenedor.appendChild(inputNombreAnterior);

    let inputNuevoNombre = document.createElement('input');
    inputNuevoNombre.type = 'text';
    inputNuevoNombre.placeholder = 'Nuevo nombre';
    contenedor.appendChild(inputNuevoNombre);

    let divBotonesChange = document.createElement('div');
    divBotonesChange.className = ('divChange');
    contenedor.appendChild(divBotonesChange);

    let botonAceptar = document.createElement('button');
    botonAceptar.className = 'buttonAceptar';
    botonAceptar.textContent = 'Confirmar Cambios';
    botonAceptar.addEventListener('click', () => {
        const nombreAnterior = inputNombreAnterior.value.trim();
        const nuevoNombre = inputNuevoNombre.value.trim();
        if (nombreAnterior === '' || nuevoNombre === '') {
          showToast(ingresarNombre);
          return;
        }

        actualizarNombre(nombreAnterior, nuevoNombre);
        location.reload();
    });
    divBotonesChange.appendChild(botonAceptar);

    let botonCancelar = document.createElement('button');
    botonCancelar.className = 'buttonCancelar';
    botonCancelar.textContent = 'Cancelar Cambios';
    botonCancelar.addEventListener('click', () => {
        location.reload();
    });
    divBotonesChange.appendChild(botonCancelar);
}

//FUNCION PARA PODER CAMBIAR DE NOMBRES DENTRO DEL LOCALSTORAGE
function actualizarNombre(nombreAnterior, nuevoNombre) {
    let puntosGuardados = JSON.parse(localStorage.getItem('puntos')) || [];

    puntosGuardados.forEach(registro => {
        if (registro.nombre === nombreAnterior) {
            registro.nombre = nuevoNombre;
        }
    });

    localStorage.setItem('puntos', JSON.stringify(puntosGuardados));

}

mostrarPuntos();