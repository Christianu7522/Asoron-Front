import api from '@/lib/api'

function arreglarLista(lista) {
    let diarioRonero = []
    for (const e of lista) {
        let obj = {
            botella: {
                id: e.fk_ofer_bote_bote.bote_id,
                nombre: e.fk_ofer_bote_bote.bote_nombre,
                descripcion: e.fk_ofer_bote_bote.bote_descripcion,
                images: e.fk_ofer_bote_bote.imagen,
            },
            oferta: {
                id: e.fk_ofer_bote_ofer.ofer_id,
                nombre: e.fk_ofer_bote_ofer.ofer_nombre,
                descripcion: e.fk_ofer_bote_ofer.ofer_descripcion,
                fechaInicio: e.fk_ofer_bote_ofer.ofer_fecha_inicio,
                fechaFin: e.fk_ofer_bote_ofer.ofer_fecha_fin,
                descuento: e.ofer_bote_porcentaje
            }
        }
        diarioRonero.push(obj)
    }
    return diarioRonero
}

async function getDiarioRonero() {
    const { data } = await api.get(`/store/diario-ronero/`)
    console.log('Data arreglada', arreglarLista(data))
    if (data) return arreglarLista(data)
    else return []
}

export default getDiarioRonero