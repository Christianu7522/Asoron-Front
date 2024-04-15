import api from '@/lib/api'

function arreglarLista(lista) {
    let ofertasArreglado = []
    for (const item of lista) {
        let obj = {
            id: item.ofer_bote_id,
            descuento: item.ofer_bote_porcentaje,
            nombre: item.fk_ofer_bote_ofer.ofer_nombre,
        }
        ofertasArreglado.push(obj)
    }
    return ofertasArreglado
}

async function getOfertasList(botellaId) {
    const { data } = await api.get(`/store/oferta-carrito/?botella=${botellaId}`)
    return arreglarLista(data)
}

export default getOfertasList