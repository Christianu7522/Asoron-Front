import api from '@/lib/api';

//! Revisar que funcione

function listaEvento(lista) {
    if (lista === null) return []
    let listaA = []
    for (const e of lista) {
        let obj = {
            id: e.entr_envt_id,
            nombre: e.entr_envt_nombre,
            cantidad: e.entr_evnt_cantidad,
            precio: e.entr_envt_precio,
            fechaInicio: e.entr_envt_fecha_inicio,
            fechaFin: e.entr_envt_fecha_fin,
        }
        listaA.push(obj)
    }
    return listaA
}


function listaImages(lista) {
    let listaA = []
    for (const e of lista) {
        let obj = {
            img_id: e.img_id,
            img_url: e.img_url,
        }
        listaA.push(obj)
    }
    return listaA
}

function listaRones(lista) {
    let listaA = []
    for (let e of lista) {
        let obj = {
            id: e.fk_inve_tiend_bote.bote_id,
            nombre: e.fk_inve_tiend_bote.bote_nombre,
            descripcion: e.fk_inve_tiend_bote.bote_descripcion,
            images: listaImages(e.fk_inve_tiend_bote.imagen),
            cantidad: e.inve_tiend_cantidad,
            precio: e.precio.hist_ron_precio,
        }
        listaA.push(obj)
    }
    return listaA
}

function arreglar(data) {
    console.log({ data })
    let obj = {
        id: data.event_id,
        nombre: data.event_nombre,
        descripcion: data.event_descripcion,
        images: listaImages(data.images),
        direccion: data.event_direccion,
        fechaInicio: data.event_fecha_ini,
        fechaFin: data.event_fecha_fin,
        lugar: {
            estado: data.fk_event_lugar.estado,
            municipio: data.fk_event_lugar.municipio,
            parroquia: data.fk_event_lugar.parroquia,
        },
        rones: listaRones(data.fk_event_tien.inventario),
        tienda: data.fk_event_tien.tiend_nombre,
        entradas: listaEvento(data.entradas),
    }
    return obj
}

async function getEventDetail(id) {
    const { data } = await api.get(`/store/evento-detail/${id}`);
    console.log('data arreglada', arreglar(data))
    return arreglar(data);
}

export default getEventDetail;