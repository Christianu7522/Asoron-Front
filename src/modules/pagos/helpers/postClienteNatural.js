import api from "@/lib/api";

export default async function postClienteJuridico(dataToSave) {
    try {
        const { data } = await api.post("/store/cliente-natural-empleado/", dataToSave);
        return data.clie_natu_cedula_identidad;
    } catch (error) {
        throw error;
    }
}