import api from "@/lib/api";

function arreglarData(data) {
    if (data) {
        const obj = {
            id: data[0].afil_id,
            nombre: data[0].afil_nombre,
            precio: data[0].afil_precio,
        }
        return obj
    }
}

export default async function getAfiliadoItem() {
    const { data } = await api.get(`/store/afiliado/`);
    console.log(data)
    return arreglarData(data)
}