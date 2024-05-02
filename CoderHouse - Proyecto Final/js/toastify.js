let toastBox = document.querySelector('.toastBox');
let ingresarNombre = '<i class="fa-solid fa-circle-exclamation"></i> Ingresar un Nombre';
let rango = '<i class="fa-solid fa-circle-exclamation"></i> Ingrese un número en el rango especificado';

function showToast(msg) {
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = msg;
    toastBox.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 6000);
}