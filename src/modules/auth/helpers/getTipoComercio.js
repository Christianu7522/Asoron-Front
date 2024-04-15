import api from '@/lib/api'

function arreglar(lista) {
    let listaArreglada = []
    for (const e of lista) {
        let obj = {
            id: e.tipo_comer_id,
            nombre: e.tipo_comer_nombre
        }
        listaArreglada.push(obj)
    }
    return listaArreglada
}


async function getCodigoTelefono() {
    const { data } = await api.get('/store/tipo-comercio/')
    return arreglar(data)
}

export default getCodigoTelefono