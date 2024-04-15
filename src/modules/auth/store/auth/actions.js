
// export const myAction = async ({ commit }) => {

// }

import postLogin from "../../helpers/postLogin";
import getUser from "../../helpers/getUser";
import { setHeader, getHeader } from "@/lib/api"
import { getCookie, setCookie } from "@/lib/cookies"
import { emptyHeader } from "@/lib/api";
import postClienteNatural from '../../helpers/postClienteNatural'
import postClienteJuridico from "../../helpers/postClienteJuridico";

export const login = async ({ commit }, { username, password }) => {
    console.log('header antes del post Login', getHeader())
    const data = await postLogin(username, password)
    commit('setToken', data)
    commit('setUser', await getUser())
}

export const findUser = async ({ commit }) => {
    const data = getCookie('access')
    if (data) {
        setHeader(data)
        commit('setToken', { access: data })
        commit('setUser', await getUser())
    }
}

export const logout = async ({ commit }) => {
    commit('setTokenNull')
    commit('setUser', null)
    setCookie('access', '')
    emptyHeader()
}

export const registerClienteNatural = async ({ commit }, dataToSave) => {
    const data = await postClienteNatural(dataToSave)
    commit('setToken', data)
    commit('setUser', await getUser())
}

export const registerClienteJuridico = async ({ commit }, dataToSave) => {
    const data = await postClienteJuridico(dataToSave)
    commit('setToken', data)
    commit('setUser', await getUser())
}