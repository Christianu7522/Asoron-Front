
// export const myMutation =  ( state ) => {
//
// }

export const setToken = (state, { access, refresh }) => {

    if (access) state.token.access = access
    if (refresh) state.token.refresh = refresh
}

export const setTokenNull = (state) => {
    state.token.access = null
    state.token.refresh = null

}

export const setUser = (state, payload) => {
    state.user = payload
}

export const setUserData = (state, payload) => {
    state.user.data = payload
}
