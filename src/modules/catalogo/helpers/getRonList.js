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
            idTiendaBotella: item.inve_tiend_id
        }
        ronListArreglado.push(obj)
    }
    return ronListArreglado
}

async function getRonList(busqueda = '', page = '1', filtros, orden) {

    const { proveedor, grado, anejamiento, clasificacion, tipo, precioMax, precioMin } = filtros

    const { data } = await api.get(`/store/inventario-tienda/?page=${page}&nombre_ron=${busqueda}&proveedor=${proveedor}&grado_alcohol=${grado}&anejamiento=${anejamiento}`
        + `&clasificacion_ron=${clasificacion}&tipo_ron=${tipo}&max_price=${precioMax}&min_price=${precioMin}&order_by=${orden}`)
    const { Paginacion, results } = data
    if (data) return { paginacion: Paginacion, ronList: arreglarLista(results) }
    else return []
}

export default getRonList