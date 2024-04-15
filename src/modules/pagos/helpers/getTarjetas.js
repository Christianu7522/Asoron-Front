import api from "@/lib/api";

function arreglarLista(ronList) {
    let ronListArreglado = []
    for (const item of ronList) {
        let obj = {
            id: item.tdc_id,
            numeroTarjeta: item.tdc_numero_tarjeta,
            nombreTitular: item.tdc_nombre_titular,
            fechaVencimiento: item.tdc_fecha_vencimiento,
            cvv: item.tdc_cvv,
        }
        ronListArreglado.push(obj)
    }
    return ronListArreglado
}

export default async function getTarjetas() {
    const { data } = await api.get("/store/tdc/");
    return arreglarLista(data)
}