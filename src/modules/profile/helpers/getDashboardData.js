import api from "@/lib/api";

function arreglarParroquias(data) {
    let parroquiasArregladas = []
    data.forEach(element => {
        parroquiasArregladas.push({ parroquia: element[0], cantidad: element[1] })
    });
    return parroquiasArregladas
}

export async function getTop10Parroquias(fechaInicio, fechaFin) {

    const dataToSave = {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
    }
    const { data } = await api.post(`/store/reporte_top_10_parroquias/`, dataToSave);
    return arreglarParroquias(data)

}

function getProductoMasvendido(data) {
    let producto = {}
    producto.nombre = data[0][1]
    producto.cantidad = data[0][0]
    return producto
}

export async function getProductoMasVendido(fechaInicio, fechaFin) {

    const dataToSave = {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
    }
    const { data } = await api.post(`/store/producto_mas_vendido/`, dataToSave);
    console.log(getProductoMasvendido(data))
    return getProductoMasvendido(data)

}

export async function getTotalVentas(fechaInicio, fechaFin) {

    const dataToSave = {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
    }
    const { data } = await api.post(`/store/total_compras/`, dataToSave);
    return data[0][0]

}

function arreglarOrdenes(data) {
    let ordenesArregladas = {}
    ordenesArregladas = { ordenEntregada: data[0][0], ordenRecibida: data[0][1], ordenEnCamino: data[0][2], ordenAprovada: data[0][3] }
    return ordenesArregladas
}

export async function getNumeroStatus(fechaInicio, fechaFin) {

    const dataToSave = {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
    }
    const { data } = await api.post(`/store/ordenes_status/`, dataToSave);
    return arreglarOrdenes(data)

}

export async function getPuntosCanjeados(fechaInicio, fechaFin) {
    const dataToSave = {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
    }
    const { data } = await api.post(`/store/puntos_canjeados/`, dataToSave);
    return data[0][0]
}

export async function getPuntosOtorgados(fechaInicio, fechaFin) {
    const dataToSave = {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
    }
    const { data } = await api.post(`/store/puntos_otorgados/`, dataToSave);
    return data[0][0]
}

export async function getOrdenesAtrasadas(fechaInicio, fechaFin) {
    const dataToSave = {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
    }
    const { data } = await api.post(`/store/ordenes_retrasadas/`, dataToSave);
    return data[0][0]
}

function arreglarProductos(data) {
    let productosArreglados = []
    data.forEach(element => {
        productosArreglados.push({ nombre: element[0], cantidad: element[1] })
    });
    return productosArreglados
}

export async function getTop10Productos(fechaInicio, fechaFin) {
    const dataToSave = {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
    }
    const { data } = await api.post(`/store/top_10_pro_vendidos_fisica/`, dataToSave);
    return arreglarProductos(data)
}