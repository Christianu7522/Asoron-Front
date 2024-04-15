import api from "@/lib/api";

function listaBarriles(lista) {
    let listaA = []
    for (const e of lista) {
        let obj = {
            anos: e.barr_anej_anos_barril,
            calidad: e.fk_barr_anej_barr.barr_calidad,
            tamano: e.fk_barr_anej_barr.barr_tamano,
            tipo: e.fk_barr_anej_barr.barr_tipo,
            madera: e.fk_barr_anej_barr.barr_tipo_madera
        }
        listaA.push(obj)
    }
    return listaA
}

function listaMateria(lista) {
    let listaA = []
    for (const e of lista) {
        listaA.push(e.mateprima)
    }
    return listaA
}

function listaSensacion(lista) {
    let listaA = []
    for (const e of lista) {
        listaA.push(e.sensacion)
    }
    return listaA
}

function listaNotaCata(lista) {
    let listaA = []
    for (const e of lista) {
        let obj = {
            nombre: e.nota_cata_nombre,
            descripcion: e.nota_cata_descripcion,
        }
        listaA.push(obj)
    }
    return listaA
}

function listaImages(lista) {
    let listaA = []
    for (const e of lista) {
        let obj = {
            id: e.img_id,
            url: e.img_url,
        }
        listaA.push(obj)
    }
    return listaA
}

//! Por que es un array?

// function listaInventario(lista) {
//     let listaA = []
//     for (const e of lista) {
//         let obj = {
//             id: e.img_id,
//             url: e.img_url,
//         }
//         listaA.push(obj)
//     }
//     return listaA
// }

function arreglarPremio(e) {
    if (e.fk_cata_even_premio_ron_premio === null) return {}
    else {
        return {
            nombre: e.fk_cata_even_premio_ron_premio.prem_nombre,
            descripcion: e.fk_cata_even_premio_ron_premio.prem_descripcion,
            direccion: e.fk_cata_even_premio_ron_premio.prem_direccion,
            lugar: {
                estado: e.fk_cata_even_premio_ron_premio.fk_prem_lugar.estado,
                municipio: e.fk_cata_even_premio_ron_premio.fk_prem_lugar.municipio,
                parroquia: e.fk_cata_even_premio_ron_premio.fk_prem_lugar.parroquia,
            }
        }
    }
}

function listaPremio(lista) {
    let listaA = []
    for (const e of lista) {
        let obj = {
            premio: arreglarPremio(e),
            fechaPremiacion: e.cata_even_premio_ron_fecha_premiacion,
            evento: {
                nombre: e.fk_cata_even_premio_ron_evento.event_nombre,
                descripcion: e.fk_cata_even_premio_ron_evento.event_descripcion,
                direccion: e.fk_cata_even_premio_ron_evento.event_direccion,
                fechaInicio: e.fk_cata_even_premio_ron_evento.event_fecha_ini,
                fechaFin: e.fk_cata_even_premio_ron_evento.event_fecha_fin,
                lugar: {
                    estado: e.fk_cata_even_premio_ron_evento.fk_event_lugar.estado,
                    municipio: e.fk_cata_even_premio_ron_evento.fk_event_lugar.municipio,
                    parroquia: e.fk_cata_even_premio_ron_evento.fk_event_lugar.parroquia,
                }
            },
            notaCata: listaNotaCata(e.notaCata)
        }
        listaA.push(obj)
    }
    return listaA
}

function arreglar(item) {
    const obj = {
        id: item.bote_id,
        nombre: item.bote_nombre,
        descripcion: item.bote_descripcion,
        caja: item.fk_bote_caja,
        material: {
            nombre: item.fk_bote_mate_tipo_bote.fk_mate_tipo_bote_mate.mate_nombre,
            altura: item.fk_bote_mate_tipo_bote.fk_mate_tipo_bote_tipo_bote.tipo_bote_altura,
            ancho: item.fk_bote_mate_tipo_bote.fk_mate_tipo_bote_tipo_bote.tipo_bote_ancho,
            capacidad: item.fk_bote_mate_tipo_bote.fk_mate_tipo_bote_tipo_bote.tipo_bote_capacidad,
        },
        ron: {
            id: item.fk_bote_ron.ron_id,
            nombre: item.fk_bote_ron.ron_nombre,
            descripcion: item.fk_bote_ron.ron_descripcion,
            comoServir: item.fk_bote_ron.comoservir,
            anejamiento: {
                calidadAgua: item.fk_bote_ron.fk_ron_anej.anej_calidad_agua,
                cantidadAnos: item.fk_bote_ron.fk_ron_anej.anej_cantidad_anos,
                metodoDestilacion: item.fk_bote_ron.fk_ron_anej.fk_anej_meto_dest.meto_dest_nombre,
                metodoFermentacion: item.fk_bote_ron.fk_ron_anej.fk_anej_meto_ferm.meto_ferm_nombre,
                barril: listaBarriles(item.fk_bote_ron.fk_ron_anej.barr_anej_anej)
            },
            clasificacion: item.fk_bote_ron.fk_ron_clasi_tipo.fk_clasi_tipo_clasi_ron.clasi_ron_nombre,
            tipo: item.fk_bote_ron.fk_ron_clasi_tipo.fk_clasi_tipo_tipo_ron.tipo_ron_nombre,
            color: {
                nombre: item.fk_bote_ron.fk_ron_color.color_nombre,
                descripcion: item.fk_bote_ron.fk_ron_color.color_descripcion
            },
            grad_alcohol: item.fk_bote_ron.fk_ron_grado_alco.grad_alco_porcentaje_alcohol,
            lugar: {
                estado: item.fk_bote_ron.fk_ron_lugar.estado,
                municipio: item.fk_bote_ron.fk_ron_lugar.municipio,
                parroquia: item.fk_bote_ron.fk_ron_lugar.parroquia,
            },
            proveedor: {
                rif: item.fk_bote_ron.fk_ron_prove.prov_rif,
                razonSocial: item.fk_bote_ron.fk_ron_prove.prov_razon_social,
                web: item.fk_bote_ron.fk_ron_prove.prov_pagina_web,
                denominacionComercial: item.fk_bote_ron.fk_ron_prove.prov_denominacion_comercial
            },
            matePrima: listaMateria(item.fk_bote_ron.mateprima),
            sensacion: listaSensacion(item.fk_bote_ron.sensancion),
            premio: listaPremio(item.fk_bote_ron.premios)
        },
        tapa: {
            material: item.fk_bote_tapa_mate.fk_tapa_mate_mate.mate_nombre,
            tipo: item.fk_bote_tapa_mate.fk_tapa_mate_tapa.tapa_nombre,
        },
        images: listaImages(item.imagen),
        // inven: listaInventario(item.inventariotienda)
        inventario: {
            idTienda: item.inventariotienda[0].inve_tiend_id,
            cantidad: item.inventariotienda[0].inve_tiend_cantidad,
            precio: item.inventariotienda[0].precio.hist_ron_precio,
        }
    }
    return obj
}

async function getRonDetail(idRon) {
    const { data } = await api.get(`/store/botella-detail/${idRon}`)
    console.log('Data arreglada', arreglar(data))
    return arreglar(data)
}

export default getRonDetail