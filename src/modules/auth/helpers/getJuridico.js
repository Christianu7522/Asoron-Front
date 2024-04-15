import api from "@/lib/api";
function listaTelefonos(lista) {
    let listaA = []
    for (const e of lista) {
        let obj = {
            id: e.fk_telf_clie_juri,
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
        id: i.clie_juri_id,
        razonSocial: i.clie_juri_razon_social,
        denominacionComercial: i.clie_juri_denominacion_comercial,
        web: i.clie_juri_pagina_web,
        rif: i.clie_juri_rif,
        puntos: i.clie_juri_puntos,
        capital: i.clie_juri_capital_disponible,
        tipo: i.fk_clie_juri_tipo_come.tipo_comer_nombre,
        direccionFiscal: i.clie_juri_direccion_fiscal,
        direccionFisica: i.clie_juri_direccion_fisica,
        lugarFiscal: {
            estado: i.fk_clie_juri_lugar_fiscal.estado,
            municipio: i.fk_clie_juri_lugar_fiscal.municipio,
            parroquia: i.fk_clie_juri_lugar_fiscal.parroquia,
        },
        lugarFisico: {
            estado: i.fk_clie_juri_lugar_fisica.estado,
            municipio: i.fk_clie_juri_lugar_fisica.municipio,
            parroquia: i.fk_clie_juri_lugar_fisica.parroquia,
        },
        telefono: listaTelefonos(i.telefono),
        afiliado: false
    }

    return obj
}

const getClienteJuridico = async () => {
    try {
        const { data } = await api.get('/store/clienteJuridico/')
        const { results } = data
        return arreglar(results)
    } catch (error) {
        console.log('error', error)
    }
}

export default getClienteJuridico