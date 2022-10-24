const selectPropiedad = document.querySelector("#propiedad")
const selectUbicacion = document.querySelector("#ubicacion")
const inputMetros2 = document.querySelector("#metros2")
const btnCotizar = document.querySelector("button.button.button-outline")
const valorPoliza = document.querySelector("#valorPoliza")
const btnEnviar = document.querySelector("span.guardar")

const cargarCombo = (array, select) => { //DRY - KISS - YAGNI
    array.forEach(elemento => select.innerHTML += `<option value="${elemento.factor}">${elemento.tipo}</option>`)
}

cargarCombo(datosPropiedad, selectPropiedad)
cargarCombo(datosUbicacion, selectUbicacion)

const datosCompletos = ()=> (selectPropiedad.value !== "..." && selectUbicacion.value !== "..." && inputMetros2.value >= 20) ? true : false 

// const datosCompletos = () => {
//     if (selectPropiedad.value !== "..." && selectUbicacion.value !== "..." && inputMetros2.value >= 20) {
//         return true
//     } else {
//         return false
//     }
// }

const realizarCotizacion = () => {
    if (datosCompletos()) {
        const coti = new Cotizador(costoM2, selectPropiedad.value, selectUbicacion.value, inputMetros2.value)
        valorPoliza.innerText = coti.cotizarPoliza()
        btnEnviar.classList.remove("ocultar")
    } else {
        alert("⛔️ Debes completar todos los datos en pantalla.")
    }
}

const enviarPorEmail = ()=> {
    const cotizacion = {
        fechaCotizacion: new Date().toLocaleString(),
        propiedad: selectPropiedad[selectPropiedad.selectedIndex].text,
        ubicacion: selectUbicacion[selectUbicacion.selectedIndex].text,
        metrosCuadrados: inputMetros2.value,
        poliza: valorPoliza.innerText
    }
    localStorage.setItem("UltimaCotizacion", JSON.stringify(cotizacion))
    alert("✅ Cotización enviada. ¡Muchas gracias por elegirnos!")
    btnEnviar.classList.add("ocultar")
}


btnCotizar.addEventListener("click", realizarCotizacion)
btnEnviar.addEventListener("click", enviarPorEmail)