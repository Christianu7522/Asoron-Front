
// export const myAction = async ({ commit }) => {

// }

import getEventList from "../../helpers/getEventList";
import getOldEventList from "../../helpers/getOldEventList";


export const cargarEventos = async ({ commit, getters }) => {
    commit('vaciarEventList')
    const { paginacion, eventosList } = await getEventList(getters.getActualPage)
    if (getters.getEventList.length === 0) {
        commit('setEventList', eventosList)
        commit('setPages', paginacion)
    }
}

export const cargarEventosViejos = async ({ commit, getters }) => {
    commit('vaciarOldEventList')
    const { paginacion, oldEventosList } = await getOldEventList(getters.getActualPage)
    if (getters.getOldEventosList.length === 0) {
        commit('setOldEventList', oldEventosList)
        commit('setPages', paginacion)
    }
}
