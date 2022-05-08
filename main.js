/* Esperamos la carga de la pagina */
window.addEventListener('load', () => {

    /* Expresion regular */
    const regex = /^[0-9]*(\.[0-9]{0,2})?$/
    const regex2 = /^[0-9]+$/

    /* Constantes */
    const dos = document.querySelector("#dos")
    const form = document.forms[0]
    const montoTotal = document.querySelector("#montoTotal")
    const cantidadPersonas = document.querySelector("#cantidadPersonas")
    const propinas = document.querySelectorAll(".boton")
    const custom = document.querySelector("#custom")
    const reset = document.querySelector("#reset")
    const montoAPagar = document.querySelectorAll(".montoAPagar")
    const errorMonto = document.querySelector("#errorMonto")
    const errorPersonas = document.querySelector("#errorPersonas")
    const arrayConPunto = []
    const arraySinPunto = []
    const maxPersonas = []
    let valorMontoTotal = 0
    let valorCantidadDePersonas = 0
    let eleccionPropina = 0

    /* Prevenir enviado del form */
    form.addEventListener('submit', (e) => {
        e.preventDefault()
    })

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
    /* Valor del monto total y logica para */ 
    /* la visualizacion del error */
    montoTotal.addEventListener("blur", () => {
        validarMonto()
        validarReset()
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
    /* Valor del total de personas y logica */
    /* para la visualizacion del error */
    cantidadPersonas.addEventListener("blur", () => {
        validarTotalPersonas()
        validarReset()
     })
    
    /* Cambio de estilo para la propina elegida */
    /* Y enviar valor de la propina a la funcion encargada */
    propinas.forEach( (e) => {
        e.addEventListener("click", () => {
            propinas.forEach(e=>e.classList.remove("propinaElegida"));
            e.classList.add("propinaElegida")
            valorPropina(e.innerHTML)
            validarReset()
        })
    })

    /* Logica del boton de custom de la propina */
    /* Y validaciones */
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
            alert("Custom tip can't be zero")
        } else {
            eleccionPropina = custom.value
            validarReset()
        }
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

    /* Funcion para obtener el porcentaje de la propina */
    /* y cantidad a pagar segun cantidad de personas */
    function valorPropina (eleccion) {
        let valor = eleccion.trim()
        let num = valor.slice(0, -1)
        let montoPropina = num * valorMontoTotal / 100
        eleccionPropina = montoPropina / valorCantidadDePersonas
        console.log(eleccionPropina);
    }

    /* Errores */

    /* Validacion en los montos */
    function validarMonto () {
        if (montoTotal.value == 0){
            errorMonto.classList.remove("hide")
            errorMonto.classList.add("errorPropina")
        } else {
            errorMonto.classList.remove("errorPropina")
            errorMonto.classList.add("hide")
            valorMontoTotal = montoTotal.value
        }
    }

    /* Validacion en las personas */
    function validarTotalPersonas () {
        if (cantidadPersonas.value == 0){
            errorPersonas.classList.remove("hide")
            errorPersonas.classList.add("errorPersona")
         } else {
            errorPersonas.classList.remove("errorPersona")
            errorPersonas.classList.add("hide")
            valorCantidadDePersonas = cantidadPersonas.value
        }
    }

    /* Funcion para validar el boton de reset */
    function validarReset () {
        if (valorMontoTotal !== 0 && valorCantidadDePersonas !== 0 && eleccionPropina !== 0) {
            montoAPagar.forEach(e => {
                let monto = e.innerHTML
                let recorte = monto.slice(1)
                let valores = parseInt(recorte)
                if(valores !== 0.00){
                    reset.removeAttribute("disabled")
                } else if (valores === 0.00){
                    reset.setAttribute("disabled")
                }
            })
        }
    }



    
})