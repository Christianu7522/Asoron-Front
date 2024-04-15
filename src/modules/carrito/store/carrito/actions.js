import getCarrito from '../../helpers/getCarritoCliente'
import postItemCarrito from '../../helpers/postItemCarrito'
import { postAfiliadoCarrito } from '../../helpers/postItemCarrito'
import getAfiliadoItem from '../../helpers/getAfiliadoItem'
import deleteItemCarritoApi from '../../helpers/deleteItemCarrito'
import putItemCarrito from '../../helpers/putItemCarrito'

export const getCarritoCliente = async ({ commit }) => {
    const carrito = await getCarrito()
    console.log('carrito en actions', carrito)
    commit('setCarrito', carrito)
}

export const addProductoCarrito = async ({ commit }, data) => {
    const producto = await postItemCarrito(data)
    console.log(producto)
    commit('addItemCarrito', producto)
}

export const addAfiliadoCarrito = async ({ commit }, data) => {
    const afiliado = await getAfiliadoItem()
    data.fk_carri_item_afil = afiliado.id
    const item = await postAfiliadoCarrito(data)
    commit('addItemCarrito', item)
}

export const deleteItemCarrito = async ({ commit }, id) => {
    const { data } = await deleteItemCarritoApi(id)
    commit('deleteItemCarrito', id)
    return data
}

export const modifyItemCarrito = async ({ commit }, { id, dataToSave }) => {
    const item = await putItemCarrito(id, dataToSave)
    commit('addItemCarrito', item)
    return item
}