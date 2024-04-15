import api from "@/lib/api";
function listaImages(lista) {
    let listaA = []
    for (const e of lista) {
        let obj = {
            id: e.img_id,
            url: e.img_url,
        }
        listaA.push(obj)
    }
    return listaA
}


function arreglarLista(eventList) {
    let eventListArreglado = []
    for (const item of eventList) {
        let obj = {
            id: item.event_id,
            nombre: item.event_nombre,
            descripcion: item.event_descripcion,
            images: listaImages(item.imagenes),
            direccion: item.event_direccion,
            fechaInicio: item.event_fecha_ini,
            fechaFin: item.event_fecha_fin,
            lugar: {
                estado: item.fk_event_lugar.estado,
                municipio: item.fk_event_lugar.municipio,
                parroquia: item.fk_event_lugar.parroquia,
            }
        }
        eventListArreglado.push(obj)
    }
    console.log(eventListArreglado)
    return eventListArreglado
}

async function getEventList(page = '1') {
    const { data } = await api.get(`/store/evento/?page=${page}`)
    const { Paginacion, results } = data
    if (data) return { paginacion: Paginacion, eventosList: arreglarLista(results) }
    else return []
}

export default getEventList