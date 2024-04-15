import api from '@/lib/api'

export async function getLugarEstado() {
    const { data } = await api.get('/store/lugar/?tipo_lugar=estado')
    return data
}

export async function getLugarMunicipio(idEstado) {
    const { data } = await api.get(`/store/lugar/?tipo_lugar=municipio&lugar_id=${idEstado}`)
    return data
}

export async function getLugarParroquia(idMunicipio) {
    const { data } = await api.get(`/store/lugar/?tipo_lugar=parroquia&lugar_id=${idMunicipio}`)
    return data
}