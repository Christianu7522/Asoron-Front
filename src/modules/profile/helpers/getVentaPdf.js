import api from "@/lib/api";

export default async function getVentaPdf(id) {
    const { data } = await api.get(`/store/venta/${id}/pdf`, { responseType: 'blob' });
    return data;
}