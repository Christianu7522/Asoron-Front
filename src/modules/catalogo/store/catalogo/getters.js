
// export const myGetter =  ( state ) => {
//     return state
// }

export const getIsLoading = (state) => state.isLoading

export const getRonList = (state) => state.ronList

export const getBusqueda = (state) => state.busqueda

export const getPages = (state) => state.pages

export const getActualPage = (state) => state.pages.actual

export const getFiltros = (state) => state.filtros

export const getOrden = (state) => state.orden

const ronesEnCatalogo = (lista, begin, num) => {
    const listaAux = []
    let cont = 0
    for (let index = begin; index < begin + num; index++) {
        if (lista[index]) {
            listaAux[cont] = lista[index]
        }
        cont++
    }
    return listaAux
}

export const getRonesMinimal = (state) => {
    return ronesEnCatalogo(state.ronList, 0, 3)
}
