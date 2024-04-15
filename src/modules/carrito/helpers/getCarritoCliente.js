import api from '@/lib/api'

function isAfiliado(e) {
    if (e) {
        return {
            id: e.afil_id,
            nombre: e.afil_nombre,
            precio: e.afil_precio
        }
    } else return null
}

function isEvento(e) {
    if (e) {
        return {
            idEntrada: e.entr_envt_id,
            nombre: e.fk_entr_envt_evento,
            entradaNombre: e.entr_envt_nombre,
            precio: e.entr_envt_precio,
            cantidadMaxima: e.entr_evnt_cantidad
        }
    } else return null
}

function isBotella(e) {
    if (e) {
        return {
            idBotella: e.fk_inve_tiend_bote.bote_id,
            nombre: e.fk_inve_tiend_bote.bote_nombre,
            images: e.fk_inve_tiend_bote.imagen,
            precio: e.precio.hist_ron_precio,
            cantidadMaxima: e.inve_tiend_cantidad,
            idTienda: e.inve_tiend_id
        }
    } else return null
}

function isOferta(e) {
    if (e) {
        return {
            id: e.ofer_bote_id,
            nombre: e.fk_ofer_bote_ofer.ofer_nombre,
            descuento: e.ofer_bote_porcentaje
        }
    } else return null
}

function listaItems(lista) {
    let listaA = []
    for (const e of lista) {
        let obj = {
            id: e.carri_item_id,
            cantidad: e.carri_item_cantidad,
            afiliado: isAfiliado(e.fk_carri_item_afil),
            evento: isEvento(e.fk_carri_item_entr_evento),
            botella: isBotella(e.fk_carri_item_inve_tiend),
            oferta: isOferta(e.fk_carri_item_ofer_ron)
        }
        listaA.push(obj)
    }
    return listaA
}



function arreglarLista(lista) {
    let carritoArreglado = []
    for (const item of lista) {
        let obj = {
            uuid: item.carr_uuid,
            items: listaItems(item.items)
        }
        carritoArreglado.push(obj)
    }
    return carritoArreglado[0]
}

async function getCarritoCliente() {
    const { data } = await api.get(`/store/carrito/`)
    if (data) return arreglarLista(data)
    else throw new Error('No se pudo obtener el carrito')
}

export default getCarritoCliente