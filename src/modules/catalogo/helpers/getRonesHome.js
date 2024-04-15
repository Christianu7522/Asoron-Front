
import api from '@/lib/api'

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


async function getRonList(busqueda = '', page = '1') {

    const { data } = await api.get(`/store/inventario-tienda/?search=${busqueda}&page=${page}&order_by=-precio`)
    let { results } = data
    if (results.length > 3) {
        results = results.splice(0, 3)
    }
    if (data) return arreglarLista(results)
    else return []
}

export default getRonList