
// export const myMutation =  ( state ) => {
//
// }

export const setRonList = (state, ronList) => {
    state.ronList = [...ronList, ...state.ronList];
    state.isLoading = false;
}

export const vaciarRonList = (state) => {
    state.isLoading = true;
    state.ronList = []
}

export const setBusqueda = (state, busqueda) => {
    state.busqueda = busqueda
}

export const setPages = (state, pages) => {
    state.pages.actual = pages.actual_page
    state.pages.totalPaginas = pages.total_pages
    state.pages.totalRones = pages.count
}

export const setActualPage = (state, actualPage) => {
    state.pages.actual = actualPage
}

export const setFiltros = (state, filtros) => {
    state.filtros = filtros
}

export const setOrden = (state, orden) => {
    state.orden = orden
}

export const vaciarFiltros = (state) => {
    state.filtros = {
        proveedor: '',
        grado: '',
        anejamiento: '',
        clasificacion: '',
        tipo: '',
        precioMin: '',
        precioMax: ''
    }
}