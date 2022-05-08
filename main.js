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
    const errorMonto = document.querySelector("#errorMonto")
    const arrayConPunto = []
    const arraySinPunto = []
    const maxPersonas = []
    const valorMontoTotal = 0
    let eleccionPropina = 0

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
    /* Valor del monto total */
    montoTotal.addEventListener("blur", () => {
        if (custom.value == 0){
            errorMonto.classList.remove("hide")
            
        } else eleccionPropina = custom.value
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
    /* Y enviar valor de la propina a la funcion encargada */
    propinas.forEach( (e) => {
        e.addEventListener("click", () => {
            propinas.forEach(e=>e.classList.remove("propinaElegida"));
            e.classList.add("propinaElegida")
            valorPropina(e.innerHTML)
        })
    })


    /* Logica del boton de custom de la propina */
    /* Y validacion */
    custom.addEventListener("keydown", (e) => {
        if (e.code === "Backspace") {
            maxPersonas.pop()
        } 
    })
    custom.addEventListener("keypress", (e) => {
        if (!validarPersonas(e.key)) {
            e.preventDefault()
        }
    })
    custom.addEventListener("blur", () => {
        if (custom.value == 0){
            alert("La propina customizada debe ser distinta de 0")
        } else eleccionPropina = custom.value
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
        let valor = eleccion.trim()
        let num = valor.slice(0, -1)
        let montoPropina = 0
        let porcentajeAPagar = montoPropina / cantidadPersonas.value

        montoPropina = num * montoTotal / 100

        console.log(porcentajeAPagar);

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