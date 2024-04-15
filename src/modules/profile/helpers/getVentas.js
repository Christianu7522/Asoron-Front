import api from "@/lib/api";

function arreglarStatus(lista) {
    let listaArreglada = []
    lista.forEach(e => {
        listaArreglada.push({
            status: e.venta_stat_status,
            nombre: e.fk_venta_stat_stat_pedi,
            fechaInicio: e.fecha_inicio,
            horaInicio: e.hora_inicio,
            fechaFin: e.fecha_fin,
            horaFin: e.hora_fin,
        })
    });
    return listaArreglada
}

function arreglar(lista) {
    let listaArreglada = []
    lista.forEach(e => {
        listaArreglada.push({
            id: e.vent_id,
            fecha: e.vent_fecha_venta,
            montoTotal: e.vent_monto_total,
            puntos: e.venta_puntos,
            direccion: e.venta_direccion,
            status: arreglarStatus(e.status_venta),
        })
    });
    return listaArreglada

}

export default async function getVentas() {
    const { data } = await api.get("/store/venta/");
    return arreglar(data);
}