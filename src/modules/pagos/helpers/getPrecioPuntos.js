import api from "@/lib/api";

export default async function getPrecioPuntos() {
    const { data } = await api.get("/store/valor-punto/");
    return data[0].hist_punt_valor;
}