/* Expresion regular */
const regex = /^[0-9]*(\.[0-9]{0,2})?$/

/* Esperamos la carga de la pagina */
window.addEventListener('load', () => {
    /* Constantes */
    const form = document.forms[0]
    const montoTotal = document.querySelector("#montoTotal")
    const cantidadPersonas = document.querySelector("#cantidadPersonas")
    const propinas = document.querySelectorAll(".boton")
    const custom = document.querySelector("#custom")
    const reset = document.querySelector("#reset")
    const montoAPagar = document.querySelectorAll(".montoAPagar")
    const arrayConPunto = []
    const arraySinPunto = []
    let eleccion = 0

    console.log(reset);
    montoAPagar.forEach(e=>console.log(e.innerHTML))

    /* Validacion para aceptar solo numero y decimales en los input */
    montoTotal.addEventListener("keypress", (e) => {
        if (!validarNum(e.key)){
            e.preventDefault()
        }
    })
    cantidadPersonas.addEventListener("keypress", (e) => {
        if(!validarNum(e.key)){
            e.preventDefault()
        }
    })
    
    /* Cambio de estilo para la propina elegida */
    propinas.forEach((e) => {
        e.addEventListener('click', () => {
            propinas.forEach(e=>e.classList.remove("propinaElegida"));
            e.classList.add("propinaElegida")
            eleccion = e.innerHTML
        });
    });

    /* Logica del boton de custom de la propina */
    custom.addEventListener("keypress", (e) => {
        if (!validarNum(e.key)){
            e.preventDefault()
        }

    })
    /* Prevenir enviado del form y trabajar con el boton de reset */
    form.addEventListener('reset', (e) => {
        e.preventDefault()
        if(validarMontos()){
            location.reload()
        }
    })

function validarNum (num) {
    let n = num.match(regex)
    let punto = false;

    if (arrayConPunto.includes(".")){
        punto = true
    } else punto = false

    if (n && !arrayConPunto.includes(".")){
        arrayConPunto.push(num)
        return true
    } else if (punto && (arraySinPunto.length < 2)){
        arraySinPunto.push(num)
        return true
    } else false


}

function error () {
    
}


function porcentaje (eleccion) {
    if (eleccion === "5%") {
        5 * montoTotal / 100
    }
    else if (eleccion === "10%") {
        10 * montoTotal / 100
    }
    else if (eleccion === "15%") {
        15 * montoTotal / 100
    }
    else if (eleccion === "25%") {
        25 * montoTotal / 100
    }
    else if (eleccion === "50%") {
        50 * montoTotal / 100
    }
    else {
        eleccion * montoTotal / 100
    }
}

function validarMontos () {
    montoAPagar.forEach(e => {
        if(e.innerHTML === "$0.00"){
            reset.disabled = true
        } else reset.disabled = false
    });
}










    
});