import api from "@/lib/api";

export default async function postClienteJuridico(dataToSave) {
    try {
        const { data } = await api.post("/store/cliente-juridico-empleado/", dataToSave);
        return data.clie_juri_rif;
    } catch (error) {
        throw error;
    }
}