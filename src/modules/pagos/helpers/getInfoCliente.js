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

function arreglarNatural(item) {
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

function arreglarJuridico(item) {
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

async function getInfoNatural(credential) {
  const { data } = await api.get(`/store/cliente-natural-empleado/?cedula=${credential}`);
  if (data.length === 0) {
    throw 'No se encontro el cliente';
  }
  return arreglarNatural(data);
}

async function getInfoJuridico(credential) {
  const { data } = await api.get(`/store/cliente-juridico-empleado/?rif=${credential}`);
  if (data.length === 0) {
    throw 'No se encontro el cliente';
  }
  return arreglarJuridico(data);
}

export { getInfoNatural, getInfoJuridico }