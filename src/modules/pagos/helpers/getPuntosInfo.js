import api from "@/lib/api";

export default async function getPuntosInfo() {
    const { data } = await api.get("/store/punto/");
    return data[0];
}