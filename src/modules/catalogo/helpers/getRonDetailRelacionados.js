
import api from '@/lib/api'

function nuevaLista(ronList, id) {
    let ronListNueva = []
    for (const ron of ronList) {
        if (ron.id !== id) {
            ronListNueva.push(ron)
        }
    }
    return ronListNueva
}

function arreglarLista(ronList) {
    let ronListArreglado = []
    for (const item of ronList) {
        let obj = {
            //Elementos del ron
            id: item.fk_inve_tiend_bote.bote_id,
            nombre: item.fk_inve_tiend_bote.bote_nombre,
            descripcion: item.fk_inve_tiend_bote.bote_descripcion,
            images: item.fk_inve_tiend_bote.imagen,
            precio: item.precio.hist_ron_precio,
            // Elementos de la tienda
            cantidad: item.inve_tiend_cantidad,
        }
        ronListArreglado.push(obj)
    }
    return ronListArreglado
}


async function getRonList(marca = '', precio = 1 , id ,busqueda = '', page = '1') {
    let peticion = ""
    if (precio > 200) {
        peticion = `/store/inventario-tienda/?search=${busqueda}&page=${page}&order_by=-precio&proveedor=${marca}`
    } else {
        peticion = `/store/inventario-tienda/?search=${busqueda}&page=${page}&order_by=precio&proveedor=${marca}`
    }
    const { data } = await api.get(peticion)
    let { results } = data
    let listaArreglada = nuevaLista(arreglarLista(results), id)
    if (listaArreglada.length > 3) {
        listaArreglada = listaArreglada.splice(0, 3)
    }
    if (data) return listaArreglada
    else return []
}

export default getRonList