import api from "@/lib/api";

export default async function postTarjeta(dataToSave) {
    const { data } = await api.post("/store/tdc/", dataToSave);
    return data
}