<template>
    <div v-if="isLoading">Cargando</div>
    <div class="main-container" v-else>
        <h1 class="titulo">Dashboard</h1>
        <div class="header-container">
            <div class="filtrado-container">
                <div class="busqueda">
                    <div class="titulo-barras">Fecha Inicial</div>
                    <input class="barra-busqueda" type="text" placeholder="aaaa-mm-dd" v-model="fechaInicio">
                </div>
                <div class="busqueda">
                    <div class="titulo-barras">Fecha Final</div>
                    <input class="barra-busqueda" type="text" placeholder="aaaa-mm-dd" v-model="fechaFin">
                </div>
                <button class="button-18" @click="getInfo">Filtrar</button>
            </div>
            <Logout></Logout>
        </div>

        <div class="dashboard-container">
            <div class="left-side">
                <div class="top-parroquias">
                    <h2><b>Top 10 Parroquias</b> - Ventas Online</h2>
                    <ul v-if="topParroquias.length === 0">
                        <li style="border:none; font-size:20px">
                            No hay ventas online en este rango de fechas
                        </li>
                    </ul>
                    <ul v-else>
                        <li v-for="parroquia in topParroquias" :key="parroquia.id">
                            <b>{{ parroquia.parroquia }}</b>
                            <span>{{ parroquia.cantidad }}</span>
                        </li>
                    </ul>
                </div>
                <!-- <hr> -->
                <div class="ordenes-status">
                    <h2>Ordenes por status</h2>
                    <ul
                        v-if="ordenesStatus.ordenRecibida !== 0 || ordenesStatus.ordenAprovada !== 0 || ordenesStatus.ordenEnCamino !== 0 || ordenesStatus.ordenEntregada !== 0">
                        <li>
                            <b>Orden Recibida</b><span>{{ ordenesStatus.ordenRecibida }}</span>
                        </li>
                        <li>
                            <b>Orden Aprobada</b><span>{{ ordenesStatus.ordenAprovada }}</span>
                        </li>
                        <li>
                            <b>Orden En Camino</b><span>{{ ordenesStatus.ordenEnCamino }}</span>
                        </li>
                        <li>
                            <b>Orden Entregada</b><span>{{ ordenesStatus.ordenEntregada }}</span>
                        </li>
                    </ul>
                    <ul v-else>
                        <li style="border:none; font-size: 20px;">
                            No hay Ordenes con estatus en este rango de fechas
                        </li>
                    </ul>
                </div>

            </div>
            <div class="right-side">
                <div class="top-producto">
                    <h2>Producto mas vendido</h2>
                    <span v-if="productoMasVendido.nombre">{{ productoMasVendido.nombre }} ==> {{
                        productoMasVendido.cantidad }}U.</span>
                    <div class="top-producto-placehold" v-else>
                        <span>No hay un producto mas vendido en este rango de fechas</span>
                    </div>
                </div>
                <!-- <hr> -->
                <div class="top-rones">
                    <h2><b>Rones mas vendidos </b> - Tienda Física</h2>
                    <div class="canvas-box">
                        <canvas id="chart"></canvas>
                    </div>
                </div>
                <!-- <hr> -->
                <div class="info-restante">
                    <h2 v-if="ventasEsteMes"><b>Ventas realizadas : </b>{{ ventasEsteMes }}</h2>
                    <h2 v-if="puntosCanjeados"><b>Puntos canjeados : </b>{{ puntosCanjeados }}</h2>
                    <h2 v-if="puntosOtorgados"><b>Puntos otorgados : </b>{{ puntosOtorgados }}</h2>
                    <h2 v-if="ordenesAtrasadas"><b>Ordenes atrasadas : </b>{{ ordenesAtrasadas }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Logout from '../components/Logout'
import Chart from 'chart.js/auto';
import {
    getTop10Parroquias, getProductoMasVendido, getTotalVentas, getNumeroStatus,
    getPuntosCanjeados, getPuntosOtorgados, getOrdenesAtrasadas, getTop10Productos
} from '../helpers/getDashboardData'
import { mapState } from 'vuex';
import Swal from 'sweetalert2'


export default {
    components: {
        Logout
    },
    data() {
        return {
            fechaInicio: '2024-01-01',
            fechaFin: '2024-01-31',

            topParroquias: [],
            productoMasVendido: {},
            ventasEsteMes: null,
            ordenesStatus: { ordenEntregada: 0, ordenRecibida: 0, ordenEnCamino: 0, ordenAprovada: 0 },
            puntosCanjeados: null,
            puntosOtorgados: null,
            ordenesAtrasadas: null,
            productosTop: null,
            chart: null
        }
    },
    methods: {
        async getParroquiasTop() {
            this.topParroquias = await getTop10Parroquias(this.fechaInicio, this.fechaFin)
        },
        async getProducto() {
            this.productoMasVendido = await getProductoMasVendido(this.fechaInicio, this.fechaFin)
        },
        async getVentasEsteMes() {
            this.ventasEsteMes = await getTotalVentas(this.fechaInicio, this.fechaFin)
        },
        async getOrdenesStatus() {
            this.ordenesStatus = await getNumeroStatus(this.fechaInicio, this.fechaFin)
        },
        async getCanjeados() {
            this.puntosCanjeados = await getPuntosCanjeados(this.fechaInicio, this.fechaFin)
        },
        async getOtorgados() {
            this.puntosOtorgados = await getPuntosOtorgados(this.fechaInicio, this.fechaFin)
        },
        async getAtrasadas() {
            this.ordenesAtrasadas = await getOrdenesAtrasadas(this.fechaInicio, this.fechaFin)
        },
        async getProductosTop() {
            this.productosTop = await getTop10Productos(this.fechaInicio, this.fechaFin)
            this.getChart()
        },
        getProductosArray() {
            let array = []
            this.productosTop.forEach(producto => {
                array.push(producto.nombre)
            });
            console.log(array)
            return array
        },
        getProductoCantidad() {
            let array = []
            this.productosTop.forEach(producto => {
                array.push(producto.cantidad)
            });
            return array
        },
        getChart() {
            const ctx = document.getElementById('chart')
            if (this.chart) {
                this.chart.destroy()
            }
            this.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.getProductosArray(),
                    datasets: [{
                        label: 'Cantidad de Productos',
                        data: this.getProductoCantidad(),
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            })
        },
        getInfo() {
            if (!this.validarFechas()) return
            this.getParroquiasTop()
            this.getProducto()
            this.getVentasEsteMes()
            this.getOrdenesStatus()
            this.getCanjeados()
            this.getOtorgados()
            this.getAtrasadas()
            this.getProductosTop()
        },
        validarFechas() {
            if (this.validarFormatoFecha(this.fechaInicio) && this.validarFormatoFecha(this.fechaFin)) {
                if (this.fechaFin >= this.fechaInicio) {
                    return true
                } else {
                    Swal.fire({
                        position: "bottom-end",
                        title: "La fecha final no puede ser menor que la fecha inicial",
                        background: "#F94646",
                        color: "#fff",
                        showConfirmButton: false,
                        timer: 1500,
                        backdrop: false
                    });
                }
            } else {
                Swal.fire({
                    position: "bottom-end",
                    title: "Formato de fecha inválido",
                    background: "#F94646",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
            }
            return false
        },
        validarFormatoFecha(fecha) {
            const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
            return regexFecha.test(fecha);
        }
    },
    computed: {
        ...mapState('auth', ['user']),
        isLoading() {
            if (this.user) {
                return false
            } else {
                return true
            }
        }
    },
    watch: {
        user(value) {
            if (value) this.getInfo()
        }
    },
    mounted() {
        if (this.user) {
            this.getInfo()
        }
    }
}
</script>

<style lang="scss" scoped>
.head {
    background-color: #31212B;
    color: white;
    padding: 10px;
}

.head-element {
    padding: 10px 20px;
}

.titulo {
    color: #31212B;
    text-align: center;
    font-family: 'Brothers', sans-serif;
    font-size: 40px;
    font-weight: 800;
    margin: 150px 0 20px 0;

}

.header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right: 40px;
}

.filtrado-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    margin-bottom: 20px;
    padding: 20px 40px;
}

.busqueda {
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    width: 200px;
}

.titulo-barras {
    color: #31212B;
    width: 100%;
    text-align: left;
    font-size: 24px;
    font-weight: bold;
}

.barra-busqueda {
    height: 56px;
    border: 3px solid #31212B;
    border-radius: 16px;
    padding-left: 20px;
}

.dashboard-container {
    display: flex;

}

.left-side {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    padding: 20px 0 20px 40px;
}

.left-side hr {
    width: 80%;
}

.top-parroquias {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;

}

.top-parroquias ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: #000;
    gap: 0;

}

.top-parroquias h2 {
    font-family: 'Inter', sans-serif;
    color: #31212B;
}

.top-parroquias ul li {
    display: flex;
    padding: 10px;
    width: 450px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #31212B;
}

.ordenes-status {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    margin-bottom: 20px;
}

.ordenes-status ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: #000;
    gap: 0;

}

.ordenes-status h2 {
    font-family: 'Inter', sans-serif;
    color: #31212B;
    font-weight: 800;
}

.ordenes-status ul li {
    display: flex;
    padding: 10px;
    width: 450px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #31212B;
}


.right-side {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    padding: 20px 0;
}

.right-side hr {
    width: 80%;
}

.top-rones {
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.top-rones h2 {
    font-family: 'Inter', sans-serif;
    color: #31212B;
}

.canvas-box {
    width: 80%;
    border-radius: 16px;
    margin-right: 40px;
}

.top-producto {
    margin-top: 20px;
    margin-bottom: 20px;
}

.top-producto h2 {
    font-family: 'Inter', sans-serif;
    color: #31212B;
    font-weight: 800;
    margin-bottom: 10px;
}

.top-producto span {
    font-family: 'Inter', sans-serif;
    font-size: 20px;
    color: #31212B;
    font-weight: 400;
}

.top-producto-placehold {
    height: 90px;
}

.info-restante {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    margin-bottom: 20px;
}

.info-restante h2 {
    font-family: 'Inter', sans-serif;
    color: #31212B;
    margin-bottom: 10px;
}


.button-18 {
    margin-left: 20px;
    align-items: center;
    background-color: #31212B;
    border: 0;
    border-radius: 100px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-flex;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 800;
    justify-content: center;
    line-height: 20px;
    height: 56px;
    max-width: 480px;
    min-height: 20px;
    min-width: 0px;
    overflow: hidden;
    padding: 0px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    touch-action: manipulation;
    transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s;
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;

    &.catalogo {
        font-family: 'Inter', 'sans-serif';
        font-size: 16px;
        font-weight: 800;
    }

    &:hover,
    :focus {
        background-color: #e6bd7f;
        color: #000;
    }

    &:active {
        background: #c09e6a;
        color: rgb(255, 255, 255, .7);
    }

    &:disabled {
        cursor: not-allowed;
        background: rgba(0, 0, 0, .08);
        color: rgba(0, 0, 0, .3);
    }
}
</style>