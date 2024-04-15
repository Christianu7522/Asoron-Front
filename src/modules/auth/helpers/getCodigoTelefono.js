import api from '@/lib/api'

function arreglar(lista) {
    let listaArreglada = []
    for (const e of lista) {
        let obj = {
            id: e.telf_cod_id,
            codigo: e.telf_cod_codigo,
        }
        listaArreglada.push(obj)
    }
    return listaArreglada
}


async function getCodigoTelefono() {
    const { data } = await api.get('/store/codigoTelefono/')
    return arreglar(data)
}

export default getCodigoTelefono