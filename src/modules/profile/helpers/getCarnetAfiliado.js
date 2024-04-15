import api from "@/lib/api";

export default async function getCarnetAfiliado() {
    const { data } = await api.get("/store/carnet/pdf/", { responseType: 'blob' });
    return data;
}