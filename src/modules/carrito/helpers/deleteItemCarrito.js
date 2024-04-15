import api from "@/lib/api";

async function deleteItemCarrito(id) {
    try {
        const response = await api.delete(`/store/carrito-detail/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default deleteItemCarrito;