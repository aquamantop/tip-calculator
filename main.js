/* Esperamos la carga de la pagina */
window.addEventListener('load', () => {

    /* Expresion regular */
    const regex = /^[0-9]*(\.[0-9]{0,2})?$/
    const regex2 = /^[0-9]+$/

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
    const maxPersonas = []
    let eleccion = ""

    /* Logica para que al apretar la tecla de retroceso se puedan seguir añadiendo numeros */
    /* (problema al ingresar un punto, borrarlo y luego querer añadir numeros) */
    montoTotal.addEventListener("keydown", (e) => {
        if (e.code === "Backspace" && arrayConPunto.includes(".") && arraySinPunto.length === 0) {
            arrayConPunto.pop()
        } 
        if (e.code === "Backspace" && !arrayConPunto.includes(".")) {
            arrayConPunto.pop()
        } 
        if (e.code === "Backspace" && arraySinPunto.length > 0) {
            arraySinPunto.pop()
        }
    })
    /* Validacion para aceptar solo numero y decimales en los input */
    montoTotal.addEventListener("keypress", (e) => {
            if (!validarTotal(e.key)) {
                e.preventDefault()
            }
    })
    
    /* Validacion para el ingreso de la cantidad de personas */
    /* No permitiendo ser 0 y maximo de 2 digitos */
    cantidadPersonas.addEventListener("keydown", (e) => {
        if (e.code === "Backspace") {
            maxPersonas.pop()
        } 
    })
    cantidadPersonas.addEventListener("keypress", (e) => {
        if (!validarPersonas(e.key)) {
            e.preventDefault()
        }
    })
    
    /* Cambio de estilo para la propina elegida */
    propinas.forEach((e) => {
        e.addEventListener('click', () => {
            propinas.forEach(e=>e.classList.remove("propinaElegida"));
            e.classList.add("propinaElegida")
            eleccion = e.innerHTML
        })
    })

    /* Logica del boton de custom de la propina */
    custom.addEventListener("change", (e) => {
        e.preventDefault()
    })

    /* Prevenir enviado del form */
    form.addEventListener('submit', (e) => {
        e.preventDefault()
    })

    /* Trabajar con el boton de reset */
    reset.addEventListener("click", (e) => {
        e.preventDefault()
        !validarReset()
    })

    /* Funcion de validacion de numero en monto total */
    function validarTotal (num) {
        let n = num.match(regex)
        let punto = 0

        if (arrayConPunto.includes(".")){
            punto = 1
        } else punto = 0

        if (n && punto === 0){
            arrayConPunto.push(num)
            return true
        } else if (punto === 1 && (arraySinPunto.length < 2) && num !== "."){
            arraySinPunto.push(num)
            return true
        } else false
    }

    /* Funcion para validar cantidad de personas */
    function validarPersonas (cant) {
        let p = cant.match(regex2)

        if (p && maxPersonas.length < 2) {
            maxPersonas.push(cant)
            return true
        } else false 
    }

    /* Funcion para manejar los errores */
    function error () {
        
    }

    /* Funcion para obtener el porcentaje de la propina */
    /* y cantidad a pagar segun cantidad de personas */
    function valorPropina (eleccion) {
        let propina = 0
        let porcentajeAPagar = propina / cantidadPersonas.value

        // MONTO SOLO DE LAS PROPINAS
        if (eleccion === "5%") {
            propina = 5 * montoTotal / 100 
        }
        else if (eleccion === "10%") {
            propina = 10 * montoTotal / 100
        }
        else if (eleccion === "15%") {
            propina = 15 * montoTotal / 100
        }
        else if (eleccion === "25%") {
            propina = 25 * montoTotal / 100
        }
        else if (eleccion === "50%") {
            propina = 50 * montoTotal / 100
        }
        else {
            propina = eleccion * montoTotal / 100
        }
        return porcentajeAPagar
    }
    
    /* Funcion para  */

    function validarReset () {
        montoAPagar.forEach(e => {
            if(e.innerHTML === "$0.00"){
                reset.innerHTML = `<button type="reset" id="reset" disabled>RESET</button>`
            } 
            if (!e.innerHTML === "$0.00"){
                reset.innerHTML = `<button type="reset" id="reset">RESET</button>`
            }
        })
    }



    
})