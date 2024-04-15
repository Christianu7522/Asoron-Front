import api from "@/lib/api";

export default async function getValorDolar() {
    const { data } = await api.get("/store/valor-dolar/");
    return data[0].hist_dolar_valor;
}