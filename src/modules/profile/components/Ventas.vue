<template>
    <div class="box">
        <button class="cancel-btn" @click="$emit('on-close')">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#31212b"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
        <div v-if="isLoading">cargando</div>
        <div class="main-container" v-if="!isLoading && ventasList.length === 0">No ha realizado ninguna compra :C</div>
        <div class="main-container" v-if="!isLoading && ventasList.length > 0">
            <div class="table-container">
                <table>
                    <thead>
                        <tr class="fila titulares">
                            <th class="selectores"></th>
                            <th>Fecha</th>
                            <th>Monto</th>
                            <th>Direccion</th>
                            <th class="orden-header">Orden Recibida</th>
                            <th class="orden-header">Orden Aprobada</th>
                            <th class="orden-header">Orden En Camino</th>
                            <th class="orden-header">Orden Entregada</th>
                        </tr>
                    </thead>
                    <tbody class="body-table">
                        <tr class="fila" v-for="venta in ventasList" :key="venta.id">
                            <td><input type="radio" name="venta" v-model="seleccionVenta" :id="venta.id" :value="venta.id"></td>
                            <td>{{ venta.fecha }}</td>
                            <td>${{ venta.montoTotal }}</td>
                            <td>{{ venta.direccion }}</td>
                            <td class="orden">
                                <svg v-if="venta.status[0].status === true" xmlns="http://www.w3.org/2000/svg" width="36"
                                    height="36" viewBox="0 0 24 24" fill="none" stroke="#42FF00" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                                    fill="none" stroke="#31212b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    class="feather feather-x">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </td>
                            <td class="orden">
                                <svg v-if="venta.status[1].status === true" xmlns="http://www.w3.org/2000/svg" width="36"
                                    height="36" viewBox="0 0 24 24" fill="none" stroke="#42FF00" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                                    fill="none" stroke="#31212b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    class="feather feather-x">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </td>
                            <td class="orden">
                                <svg v-if="venta.status[2].status === true" xmlns="http://www.w3.org/2000/svg" width="36"
                                    height="36" viewBox="0 0 24 24" fill="none" stroke="#42FF00" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                                    fill="none" stroke="#31212b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    class="feather feather-x">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </td>
                            <td class="orden">
                                <svg v-if="venta.status[3].status === true" xmlns="http://www.w3.org/2000/svg" width="36"
                                    height="36" viewBox="0 0 24 24" fill="none" stroke="#42FF00" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                                    fill="none" stroke="#31212b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    class="feather feather-x">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button class="download-btn button-18" @click="descargarVenta()">Descargar Venta</button>
        </div>
    </div>
</template>

<script>

import getVentas from '../helpers/getVentas'
import getVentaPdf from '../helpers/getVentaPdf'
import Swal from 'sweetalert2'

export default {
    emits: ['on-close'],
    data() {
        return {
            isLoading: true,
            ventasList: [],
            seleccionVenta: null
        }
    },
    methods: {
        async getVentas() {
            this.isLoading = true
            this.ventasList = await getVentas()
            this.isLoading = false
        },
        async descargarVenta() {
            if (this.seleccionVenta === null) {
                Swal.fire({
                    position: "bottom-end",
                    title: "Debe seleccionar una venta",
                    background: "#0085FF",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
                return
            }
            Swal.fire({
                position: "bottom-end",
                title: "Descargando Factura",
                background: "#0085FF",
                color: "#fff",
                showConfirmButton: false,
                timer: 1500,
                backdrop: false
            });
            const pdf = await getVentaPdf(this.seleccionVenta)
            const url = window.URL.createObjectURL(new Blob([pdf]));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Factura.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }
    },
    mounted() {
        this.getVentas()
    }
}
</script>

<style scoped lang="scss">
.box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1280px;
    height: 750px;
    background: white;
    display: flex;
    flex-direction: column;
    padding: 50px 70px 70px 70px;
    border-radius: 50px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.cancel-btn {
    background: none;
    border: none;
    padding: 0;
    align-self: flex-end;
}

thead , tbody , table , .table-container , .main-container{
    width: 100%;
}

.table-container {
  height: 500px;
  overflow: auto;
  padding-right: 20px;
}

/* Set header to stick to the top of the container. */
thead tr th {
  position: sticky;
  top: 0;
    background-color: white;
}

td {
    text-align: center;
    border-bottom: 1px solid #ddd;
}


.titulares th {
    font-size: 18px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.fila {
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
}

.selectores {
    padding-right: 20px;
}

.orden {
    width: 50px;
    text-align: center;
    padding-left: 10px ;
}

.orden-header {
    width: 50px;
    text-align: center;
    padding-left: 20px ;
}


.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.download-btn {
    margin-top: 50px;
}

tbody {
    height: 100px;
    overflow-y: hidden ;
}

.button-18 {
    align-items: center;
    background-color: #FDD08D;
    border: 0;
    border-radius: 100px;
    box-sizing: border-box;
    color: #000;
    cursor: pointer;
    display: inline-flex;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 800;
    justify-content: center;
    line-height: 20px;
    max-width: 480px;
    min-height: 40px;
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