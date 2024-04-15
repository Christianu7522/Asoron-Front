
// export const myMutation =  ( state ) => {
//
// }

export const vaciarEventList = (state) => {
    state.isLoading = true;
    state.eventosList = []
}

export const vaciarOldEventList = (state) => {
    state.isLoading = true;
    state.oldEventosList = []
}

export const setEventList = (state, eventosList) => {
    state.eventosList = [...state.eventosList, ...eventosList];
    state.isLoading = false;
}

export const setOldEventList = (state, oldEventosList) => {
    state.oldEventosList = [...state.oldEventosList, ...oldEventosList];
    state.isLoading = false;
}

export const setPages = (state, pages) => {
    state.pages.actual = pages.actual_page
    state.pages.totalPaginas = pages.total_pages
    state.pages.totalEventos = pages.count
}

export const setActualPage = (state, actualPage) => {
    state.pages.actual = actualPage
}