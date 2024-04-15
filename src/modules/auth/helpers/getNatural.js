import api from "@/lib/api";

function listaTelefonos(lista) {
    let listaA = []
    for (const e of lista) {
        let obj = {
            id: e.fk_telf_clie_natu,
            codigo: e.fk_telf_telf_codi.telf_cod_codigo,
            telefono: e.telf_numero,
        }
        listaA.push(obj)
    }
    return listaA
}

function arreglar(item) {
    const i = item[0]
    const obj = {
        id: i.clie_natu_id,
        nombre: i.clie_natu_nombre,
        segundoNombre: i.clie_natu_segundo_nombre,
        apellido: i.clie_natu_apellido,
        segundoApellido: i.clie_natu_segundo_apellido,
        cedula: i.clie_natu_cedula_identidad,
        direccion: i.clie_natu_direccion_habitacion,
        puntos: i.clie_natu_puntos,
        rif: i.clie_natu_rif,
        lugar: {
            estado: i.fk_clie_natu_lugar.estado,
            municipio: i.fk_clie_natu_lugar.municipio,
            parroquia: i.fk_clie_natu_lugar.parroquia,
        },
        telefono: listaTelefonos(i.telefono),
        afiliado: false
    }

    return obj
}

const getClienteNatural = async () => {
    try {
        const { data } = await api.get('/store/clienteNatural/')
        const { results } = data
        return arreglar(results)
    } catch (error) {
        console.log('error', error)
    }
}

export default getClienteNatural