
export default () => ({
    isLoading: true,
    ronList: [],
    busqueda: '',
    pages: {
        actual: 1,
        totalPaginas: null,
        totalRones: null,
    },
    filtros: {
        proveedor: '',
        grado: '',
        anejamiento: '',
        clasificacion: '',
        tipo: '',
        precioMin: '',
        precioMax: ''
    },
    orden: '-precio'
})