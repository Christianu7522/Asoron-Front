import api from "@/lib/api";

function listaTelefonos(lista) {
    let listaA = []
    for (const e of lista) {
        let obj = {
            id: e.fk_telf_empl,
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
        id: i.empl_id,
        nombre: i.empl_nombre,
        segundoNombre: i.empl_nombre_segundo,
        apellido: i.empl_apellido,
        segundoApellido: i.empl_apellido_segundo,
        cedula: i.empl_cedula_identidad,
        telefono: listaTelefonos(i.telefono),
        tienda: {
            nombre: i.tienda[0].fk_empl_tiend_tiend.tiend_nombre,
            tipo: i.tienda[0].fk_empl_tiend_tiend.fk_tiend_tipo_tiend.tipo_tiend_nombre,
        }
    }

    return obj
}

const getEmpleado = async () => {
    try {
        const { data } = await api.get('/store/empleado/')
        const { results } = data
        return arreglar(results)
    } catch (error) {
        console.log('error', error)
    }
}

export default getEmpleado