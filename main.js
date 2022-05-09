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
    const totalPorPersona = document.querySelector("#totalPorPersona")
    const propinaPorPersona= document.querySelector("#propinaPorPersona")
    const errorMonto = document.querySelector("#errorMonto")
    const errorPersonas = document.querySelector("#errorPersonas")
    const arrayConPunto = []
    const arraySinPunto = []
    const maxPersonas = []
    const maxPropina = []
    let valorMontoTotal = 0
    let valorCantidadDePersonas = 0
    let propinaAPagar = 0
    let porcentaje = 0

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
        renderizar()
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
        renderizar()
    })
    
    /* Cambio de estilo para la propina elegida */
    /* Y enviar valor de la propina a la funcion encargada */
    propinas.forEach((e) => {
        e.addEventListener("click", () => {
            propinas.forEach(e=>e.classList.remove("propinaElegida"));
            e.classList.add("propinaElegida")
            valorPropina(e.innerHTML)
            renderizar()
        })
    })
    
    /* Logica del boton de custom de la propina */
    /* Y validaciones */
    custom.addEventListener("keydown", (e) => {
        if (e.code === "Backspace") {
            maxPropina.pop()
        } 
    })
    custom.addEventListener("keypress", (e) => {
        if (!validarCustom(e.key)) {
            e.preventDefault()
        }
    })
    custom.addEventListener("blur", () => {
        if (custom.value == 0){
            alert("Custom tip can't be zero")
        } else {
            let valor = custom.value * valorMontoTotal / 100
            propinaAPagar = valor / valorCantidadDePersonas
            renderizar()
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

    /* Validar propina personalizada */
    function validarCustom (cant) {
        let p = cant.match(regex2)

        if (p && maxPropina.length < 2) {
            maxPropina.push(cant)
            return true
        } else false 
    }

    /* Funcion para obtener el porcentaje de la propina */
    /* y cantidad a pagar segun cantidad de personas */
    function valorPropina (eleccion) {
        let valor = eleccion.trim()
        let num = valor.slice(0, -1)
        porcentaje = num
        propinaAPagar = num * valorMontoTotal / 100
    }

    /* Envia el valor de la nueva propina al cambiar el monto */
    function nuevaPropina () {
        propinaAPagar = porcentaje * valorMontoTotal / 100
    }

    /* Funcion para renderizar los montos de propina y total */
    function renderizar () {
        nuevaPropina ()
        if (valorMontoTotal !== 0 && valorCantidadDePersonas !== 0 && propinaAPagar !== 0) {
            validarReset()
            propinaPorPersona.innerHTML = `$${propinaAPagar / valorCantidadDePersonas}`
            totalPorPersona.innerHTML = `$${(valorMontoTotal + propinaAPagar) / valorCantidadDePersonas}`
        }
    }
    
    /* Funcion para validar el boton de reset */
    function validarReset () {
        montoAPagar.forEach(e => {
            let monto = e.innerHTML
            let recorte = monto.slice(1)
            let valor = parseInt(recorte)
            if(valor !== 0.00){
                reset.removeAttribute("disabled")
            } else if (valor === 0.00){
                reset.setAttribute("disabled", true)
            }
        })
    }
    
    /* Errores */

    /* Visualizar error en el monto */
    /* Mas borde de error */
    function validarMonto () {
        if (montoTotal.value === 0){
            errorMonto.classList.remove("hide")
            errorMonto.classList.add("errorPropina")
            montoTotal.classList.add("errorBorde")
        } else {
            errorMonto.classList.remove("errorPropina")
            errorMonto.classList.add("hide")
            montoTotal.classList.remove("errorBorde")
            valorMontoTotal = parseInt(montoTotal.value)
        }
    }

    /* Visualizar error en las personas */
    /* Mas borde de error */
    function validarTotalPersonas () {
        if (cantidadPersonas.value == 0){
            errorPersonas.classList.remove("hide")
            errorPersonas.classList.add("errorPersona")
            cantidadPersonas.classList.add("errorBorde")
         } else {
            errorPersonas.classList.remove("errorPersona")
            errorPersonas.classList.add("hide")
            cantidadPersonas.classList.remove("errorBorde")
            valorCantidadDePersonas = cantidadPersonas.value
        }
    }
    
})