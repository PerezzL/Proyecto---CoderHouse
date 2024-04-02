function mostrarPuntos() {
    const puntosGuardados = JSON.parse(localStorage.getItem('puntos')) || [];
    const contenedorPuntos = document.getElementById('scoresLista');

    puntosGuardados.forEach(punto => {
        const elementoPuntos = document.createElement('li');
        elementoPuntos.textContent = `El jugador ${punto.nombre} tiene => ${punto.puntos} puntos`;
        contenedorPuntos.appendChild(elementoPuntos);
    });
}

mostrarPuntos();