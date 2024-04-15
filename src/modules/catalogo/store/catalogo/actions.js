
// export const myAction = async ({ commit }) => {

// }

import getRonList from "../../helpers/getRonList";


export const cargarRones = async ({ commit, getters }) => { // Funcion que carga los rones desde la bd  
    commit('vaciarRonList')
    const { paginacion, ronList } = await getRonList(getters.getBusqueda, getters.getActualPage, getters.getFiltros, getters.getOrden)
    if (getters.getRonList.length === 0) {
        commit('setPages', paginacion)
        commit('setRonList', ronList)
    }
}
