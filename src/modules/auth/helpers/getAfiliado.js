import api from "@/lib/api";

export default async function getAfiliado(user) {
    const { data } = await api.get("/store/afiliado-boolean/");
    return data.afiliado;
}