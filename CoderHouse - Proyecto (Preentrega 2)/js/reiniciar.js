function reiniciarJuego() {
    const button = document.createElement('button');
    button.innerHTML = 'Reiniciar juego';
    button.className = 'button2';
  
    button.addEventListener("click", () => {
      let eleccion = 0;
      let intentos = 0;
      let acierto = false;
  
      location.reload();
    });
    document.body.appendChild(button);
  }