import api from "@/lib/api";

export default async function postVenta(dataToSave) {
    const { data } = await api.post("/store/venta/", dataToSave);
    return data;
}