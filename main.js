
/* Esperamos la carga de la pagina */
window.addEventListener('load', () => {
    /* Expresion regular */
    const regex = /^[0-9]*(\.[0-9]{0,2})?$/
    /* Constantes */
    const form = document.forms[0];
    const montoTotal = document.querySelector("#montoTotal")
    const cantidadPersonas = document.querySelector("#cantidadPersonas")
    const propinas = document.querySelectorAll(".boton")
    let eleccion = 0;

    console.log(montoTotal);
    console.log(cantidadPersonas);
    console.log(propinas);
    console.log(form);

    montoTotal.addEventListener("keypress", (e) => {
        if (!validarNum(e.key)){
            e.preventDefault()
        }
    })
    cantidadPersonas.addEventListener("keypress", (e) => {
        if (!validarNum(e.key)){
            e.preventDefault()
        }
    })


    
    propinas.forEach((e) => {
        e.addEventListener('click', () => {
            propinas.forEach(e=>e.classList.remove("propinaElegida"));
            e.classList.add("propinaElegida");
            console.log(e);
            eleccion = e.innerHTML;
            console.log(eleccion);
        });
    });
    


    form.addEventListener('submit', (e) => {
        e.preventDefault();



    })

function validarNum (num) {
    let n = num.match(regex)
    if (n){
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
        5 * montoTotal / 100
    }
    else if (eleccion === "15%") {
        5 * montoTotal / 100
    }
    else if (eleccion === "25%") {
        5 * montoTotal / 100
    }
    else if (eleccion === "50%") {
        5 * montoTotal / 100
    }
    else {
        eleccion * montoTotal / 100
    }
}












    
});