import api from '@/lib/api';

export const getRonTipoList = async () => {
    const { data } = await api.get(`/store/tipo-ron/`)
    const lista = []
    for (const tipo of data) {
        lista.push(tipo.tipo_ron_nombre)
    }
    return lista
}

export const getRonMarcaList = async () => {
    const { data } = await api.get(`/store/provedores/`)
    const lista = []
    for (const marca of data) {
        lista.push(marca.prov_denominacion_comercial)
    }
    return lista
}
