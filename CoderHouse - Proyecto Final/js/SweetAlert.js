function sweetAlertWin() {
    Swal.fire({
      icon: "success",
      title: "FELICIDADES!",
      text: "Adivinaste el número!",
    });
  }

function sweetAlertLose() {
  Swal.fire({
    icon: "error",
    title: "Perdiste",
    text: "El numero correcto era: " + numeroRandom,
  });
}