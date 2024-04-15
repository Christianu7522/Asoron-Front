<template>
    <div v-if="!isLoading"></div>
    <div v-else class="box">
        <div class="datos-cliente">
            <h1 class="titulo">Asoron</h1>
            <div class="encabezado-container">
                <div class="encabezado-border">
                    <div class="encabezado">
                        <div class="data-cliente" v-if="cliente.info.nombre">
                            <span class="left-data"><b>Nombre : </b>{{ cliente.info.nombre }}</span>
                            <span><b>Cedula : </b>{{ cliente.info.cedula }}</span>
                        </div>
                        <div class="data-cliente" v-if="cliente.info.denominacionComercial">
                            <span class="left-data"><b>Razon Social : </b>{{ cliente.info.denominacionComercial }}</span>
                            <span><b>RIF. :</b>{{ cliente.info.rif }}</span>
                        </div>
                        <div class="buscador-box">
                            <CDropdown>
                                <CDropdownToggle>{{ cliente.nombre }}</CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem @click="changeTipoCliente('natural')">Cliente Natural</CDropdownItem>
                                    <CDropdownItem @click="changeTipoCliente('juridico')">Cliente Juridico</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                            <input type="text" v-model="credencialCliente" @keypress.enter="getInfo" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="botones">
                <Afiliado />
                <div class="add-botones">
                    <AddClienteNatural v-if="activeClienteNatural" @on-register="registerNatural"
                        @on-close="closeAniadirClienteNatural" />
                    <button class="button-18" @click="openAniadirClienteNatural">Añadir Cliente Natural</button>
                    <AddClienteJuridico v-if="activeClienteJuridico" @on-register="registerJuridico"
                        @on-close="closeAniadirClienteJuridico" />
                    <button class="button-18" @click="openAniadirClienteJuridico">Añadir Cliente Juridico</button>
                </div>
            </div>


            <div class="direccion-container">
                <h2>Dirección</h2>
                <div class="direccion-border">
                    <div class="direccion">
                        <Lugar @on-click="setFkDireccion"></lugar>
                        <input type="text" v-model="direccion" placeholder="Dirección" />
                    </div>
                </div>
            </div>

            <div class="metodo-pago-container">
                <h2>Efectivo</h2>
                <div class="metodo-pago-border">
                    <div class="metodo-pago-box">
                        <div class="metodo-pago ">
                            <span>Monto en Efectivo $</span>
                            <input type="number" v-model="montoEfectivo" @keypress.enter="changeMontoEfectivo$" />
                        </div>
                        <div class="metodo-pago right">
                            <span>Monto en Efectivo Bs.</span>
                            <input type="number" v-model="montoEfectivoBs" @keypress.enter="changeMontoEfectivoBs" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="metodo-pago-container">
                <h2>Tarjeta</h2>
                <div class="metodo-pago-border">
                    <div class="metodo-pago-box">
                        <div class="metodo-pago">
                            <span>Monto en Tarjeta $</span>
                            <input type="number" pattern="^\d+(?:\.\d{1,2})?$" v-model="montoTarjeta" step="0.01"
                                @keypress.enter="changeMontoTarjeta$" />
                        </div>
                        <div class="metodo-pago">
                            <span>Monto en Tarjeta Bs</span>
                            <input type="number" v-model="montoTarjetaBs" @keypress.enter="changeMontoTarjetaBs" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="metodo-pago-container">
                <h2>Puntos</h2>
                <div class="metodo-pago-border">
                    <div class="metodo-pago-box">
                        <div class="metodo-pago">
                            <span>Puntos Acumulados</span>
                            <input type="number" v-model="cantidadPuntos" min="0" :max="maxPuntos" />
                        </div>
                        <span>Puntos Acumulados: {{ this.maxPuntos }}</span>
                    </div>
                </div>
            </div>
            <div class="metodo-pago-container">
                <h2>Cheque</h2>
                <div class="metodo-pago-border">
                    <div class="metodo-pago-box">
                        <div class="metodo-pago">
                            <span>Monto en cheques $</span>
                            <input type="number" v-model="montoCheque" @keypress.enter="changeMontoCheque$" />
                        </div>
                        <div class="metodo-pago">
                            <span>Monto en cheques Bs</span>
                            <input type="number" v-model="montoChequeBs" @keypress.enter="changeMontoChequeBs" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="datos-compra">
            <div>
                <div class="productos-box">
                    <div class="producto" v-for="(item, index) in items" :key="item.id">
                        <div>
                            <span>{{ index + 1 }}.- </span>
                            <span v-if="item.afiliado">{{ item.afiliado.nombre }}</span>
                            <span v-if="item.botella">{{ item.botella.nombre }}</span>
                            <span v-if="item.evento">{{ item.evento.nombre }}</span>
                        </div>
                        <div>
                            <span v-if="item.afiliado">${{ item.afiliado.precio }}</span>
                            <span v-if="item.botella && !item.oferta">${{ item.botella.precio }}</span>
                            <span v-if="item.botella && item.oferta">
                                <span class="precio-sin-desc">${{ item.botella.precio }}</span>
                                ${{ (item.botella.precio - (item.botella.precio * item.oferta.descuento / 100)).toFixed(2)
                                }}
                            </span>
                            <span v-if="item.evento">${{ item.evento.precio }}</span>
                            <span> x{{ item.cantidad }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pie-productos">
                <hr>
                <div class="subtotal-container">
                    <h3>Subtotal Bs.</h3>
                    <span>Bs. {{ (montoTotal * valorDolar).toFixed(2) }}</span>
                </div>
                <div class="subtotal-container">
                    <h3>Tasa de cambio</h3>
                    <span>÷ {{ valorDolar }}</span>
                </div>
                <hr>
                <div class="subtotal-container">
                    <h3>Subtotal $</h3>
                    <span>$ {{ montoTotal.toFixed(2) }}</span>
                </div>
                <div class="subtotal-container">
                    <h3>Efectivo:</h3>
                    <span class="substract">- ${{ montoEfectivo }}</span>
                </div>
                <div class="subtotal-container">
                    <h3>Tarjeta:</h3>
                    <span class="substract">- ${{ montoTarjeta }}</span>
                </div>
                <div class="subtotal-container">
                    <h3>Puntos ({{ puntosPrecio }}$ c/u)</h3>
                    <span class="substract">- ${{ montoPuntos }}</span>
                </div>
                <div class="subtotal-container">
                    <h3>Cheque:</h3>
                    <span class="substract">- ${{ montoCheque }}</span>
                </div>
                <hr>
                <div class="monto-total-container">
                    <h2>Total</h2>
                    <span>${{ (montoTotal - this.montoSumado).toFixed(2) }}</span>
                </div>
                <button @click="vender()" class="button-18 pagar-btn">Pagar</button>
            </div>
        </div>
        <BackToHome />
    </div>
</template>

<script>

import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import Swal from 'sweetalert2'
import { CDropdown } from '@coreui/vue';

import Lugar from '@/modules/auth/components/Lugar'
import AddClienteNatural from '../components/AddClienteNatural'
import AddClienteJuridico from '../components/AddClienteJuridico';
import BackToHome from '@/modules/auth/components/BackToHome'
import Afiliado from '@/modules/profile/components/Afiliado';

import postVenta from '../helpers/postVenta'
import { getInfoNatural, getInfoJuridico } from '../helpers/getInfoCliente'
import getValorDolar from '../helpers/getValorDolar'
import getPrecioPuntos from '../helpers/getPrecioPuntos'

export default {
    components: {
        Lugar,
        CDropdown,
        AddClienteNatural,
        AddClienteJuridico,
        BackToHome,
        Afiliado
    },
    data() {
        return {
            // Datos del cliente
            cliente: {
                tipo: null,
                nombre: 'Tipo de cliente',
                info: {}
            },

            // Datos de la compra $
            direccion: '',
            fkDireccion: '',
            cantidadPuntos: 0,
            montoTarjeta: 0,
            montoCheque: 0,
            montoEfectivo: 0,

            // Datos de la compra en bs
            montoEfectivoBs: 0,
            montoTarjetaBs: 0,
            montoChequeBs: 0,

            // Abrir componentes
            activeClienteNatural: false,
            activeClienteJuridico: false,

            // Credenciales a Buscar
            credencialCliente: '',


            // Datos fuera de la compra
            puntosPrecio: 0,
            maxPuntos: 0,
            valorDolar: 0,
            pagado: false,
        };
    },
    computed: {
        ...mapState('carrito', ['items', 'uuid']),
        ...mapState('auth', ['user']),
        isLoading() {
            if ((!this.user || !this.items || this.items.length === 0) && this.pagado === false) {
                new Swal({
                    title: 'Espere por favor',
                    allowOutsideClick: false,
                })
                Swal.showLoading()
                return false
            } else {
                Swal.close()
                return true
            }
        },
        montoTotal() {
            let montoFinal = 0
            for (const item of this.items) {
                if (item.botella) {
                    if (item.oferta) montoFinal += (item.botella.precio - (item.botella.precio * item.oferta.descuento / 100)) * item.cantidad
                    else montoFinal += item.botella.precio * item.cantidad
                }
                if (item.evento) montoFinal += item.evento.precio * item.cantidad
                if (item.afiliado) montoFinal += item.afiliado.precio * item.cantidad
            }
            return Math.round(montoFinal * 100) / 100
        },
        montoPuntos() {
            let monto = 0
            monto = this.cantidadPuntos * this.puntosPrecio
            return monto
        },
        montoSumado() {
            let monto = 0
            console.log(this.montoTarjeta, this.montoCheque, this.montoEfectivo, this.montoPuntos)
            monto = this.montoPuntos + this.montoTarjeta + this.montoCheque + this.montoEfectivo
            return monto
        }
        // montoTarjeta() {
        //     let monto = 0
        //     monto = this.montoTotal - this.montoPuntos
        //     return Number.parseFloat(monto.toFixed(2))
        // }
    },
    methods: {
        ...mapMutations('carrito', ['endCarrito']),
        ...mapActions('carrito', ['getCarritoCliente']),
        async getInfo() {
            new Swal({
                title: 'Espere por favor',
                allowOutsideClick: false,
            })
            Swal.showLoading()
            if (this.cliente.tipo === null) {
                Swal.fire({
                    position: "bottom-end",
                    title: "Debe seleccionar el tipo de cliente",
                    background: "#F94646",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
                return
            }
            if (this.cliente.tipo === 'natural') {
                try {
                    this.cliente.info = await getInfoNatural(this.credencialCliente)
                    Swal.fire({
                        position: "bottom-end",
                        title: "Cliente Encontrado",
                        background: "#42FF00",
                        color: "#fff",
                        showConfirmButton: false,
                        timer: 1500,
                        backdrop: false
                    });
                } catch (error) {
                    Swal.fire('Error', `${error}`, 'error')

                    console.log(error)
                }
            }
            if (this.cliente.tipo === 'juridico') {
                try {
                    this.cliente.info = await getInfoJuridico(this.credencialCliente)
                    Swal.fire({
                        position: "bottom-end",
                        title: "Cliente Encontrado",
                        background: "#42FF00",
                        color: "#fff",
                        showConfirmButton: false,
                        timer: 1500,
                        backdrop: false
                    });
                } catch (error) {
                    Swal.fire('Error', `${error}`, 'error')

                    console.log(error)
                }

            }
            this.maxPuntos = this.cliente.info.puntos
        },
        changeTipoCliente(tipo) {
            this.cliente.tipo = tipo
            if (tipo === 'natural') {
                this.cliente.nombre = 'Cliente Natural'
            }
            else {
                this.cliente.nombre = 'Cliente Juridico'
            }
        },
        openAniadirClienteNatural() {
            this.activeClienteNatural = true
        },
        closeAniadirClienteNatural() {
            this.activeClienteNatural = false
        },
        openAniadirClienteJuridico() {
            this.activeClienteJuridico = true
        },
        closeAniadirClienteJuridico() {
            this.activeClienteJuridico = false
        },
        setFkDireccion(value) {
            this.fkDireccion = value
        },
        registerJuridico(credential) {
            this.credencialCliente = credential
            this.cliente.tipo = 'juridico'
            this.getInfo()
            this.closeAniadirClienteJuridico()
        },
        registerNatural(credential) {
            this.credencialCliente = credential
            this.cliente.tipo = 'natural'
            this.getInfo()
            this.closeAniadirClienteNatural()
        },
        async vender() {
            if (this.validar()) {
                new Swal({
                    title: 'Espere por favor',
                    allowOutsideClick: false,
                })
                Swal.showLoading()
                const data = {
                    venta_direccion: this.direccion,
                    fk_vent_direccion: this.fkDireccion,
                    uuid_carrito: this.uuid,
                    cantidad_tarjeta: this.montoTarjeta,
                    cantidad_puntos: this.cantidadPuntos,
                    cantidad_cheque: this.montoCheque,
                    cantidad_efectivo: this.montoEfectivo,
                    usuario_natu: '',
                    usuario_juri: ''
                }
                if (this.cliente.tipo === 'natural') {
                    data.usuario_natu = this.cliente.info.id
                }
                if (this.cliente.tipo === 'juridico') {
                    data.usuario_juri = this.cliente.info.id
                }
                try {
                    console.log(data)
                    this.pagado = true
                    await postVenta(data)
                    Swal.fire('Success', 'Pago realizado con exito', 'success').then((result) => {
                        if (result.isConfirmed) {
                            this.endCarrito()
                            this.getCarritoCliente()
                            this.$router.push({ name: 'catalogo' });
                            Swal.close()
                        }
                    });
                } catch (error) {
                    console.log(error)
                    Swal.fire('Error', `Problema al registrar el pago\n${error.response.data.error}`, 'error')
                }
            }
        },
        validarTodosLosCampos() {
            if (this.cantidadPuntos === 0 && this.montoTarjeta === 0 && this.montoCheque === 0 && this.montoEfectivo === 0) {
                Swal.fire({
                    position: "bottom-end",
                    title: "Debe llenar al menos un campo",
                    background: "#F94646",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
                return false
            }
            return true
        },
        validar() {
            if (this.direccion === '' || !this.cliente.info.id || this.fkDireccion === '') {
                Swal.fire({
                    position: "bottom-end",
                    title: "Debe llenar todos los campos",
                    background: "#F94646",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
                return false
            }
            if (!this.validarTodosLosCampos()) {
                return false
            }
            if (this.montoSumado > this.montoTotal) {
                Swal.fire({
                    position: "bottom-end",
                    title: "El monto sumado es mayor al monto total",
                    background: "#F94646",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
                return false
            }
            if (this.montoSumado < this.montoTotal) {
                Swal.fire({
                    position: "bottom-end",
                    title: "El monto sumado es menor al monto total",
                    background: "#F94646",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
                return false
            }
            return true
        },
        changeMontoTarjetaBs() {
            this.montoTarjeta = Math.round(this.montoTarjetaBs / this.valorDolar * 100) / 100;
        },
        changeMontoTarjeta$() {
            this.montoTarjetaBs = Math.round(this.montoTarjeta * this.valorDolar * 100) / 100;
        },
        changeMontoChequeBs() {
            this.montoCheque = Math.round(this.montoChequeBs / this.valorDolar * 100) / 100;
        },
        changeMontoCheque$() {
            this.montoChequeBs = Math.round(this.montoCheque * this.valorDolar * 100) / 100;
        },
        changeMontoEfectivoBs() {
            this.montoEfectivo = Math.round(this.montoEfectivoBs / this.valorDolar * 100) / 100;
        },
        changeMontoEfectivo$() {
            this.montoEfectivoBs = Math.round(this.montoEfectivo * this.valorDolar * 100) / 100;
        }
    },
    async mounted() {
        this.puntosPrecio = await getPrecioPuntos()
        this.valorDolar = await getValorDolar()
    },
    watch: {
        montoTarjeta(value) {
            if (value < 0 || value === '') {
                this.montoTarjeta = 0
            }
            this.montoTarjeta = Math.round(this.montoTarjeta * 100) / 100;
        },
        montoCheque(value) {
            if (value < 0 || value === '') {
                this.montoCheque = 0
            }
            this.montoCheque = Math.round(this.montoCheque * 100) / 100;
        },
        montoEfectivo(value) {
            if (value < 0 || value === '') {
                this.montoEfectivo = 0
            }
            this.montoEfectivo = Math.round(this.montoEfectivo * 100) / 100;
        },
        cantidadPuntos(value) {
            if (value < 0 || value === '') {
                this.cantidadPuntos = 0
            }
            if (value > this.maxPuntos) {
                this.cantidadPuntos = this.maxPuntos
            }
            this.cantidadPuntos = Math.round(this.cantidadPuntos);
        }
    }
    // mounted() {
    //     if (!this.user) {
    //         this.$router.push({ name: 'login' })
    //     }
    // },

}
</script>

<style lang="scss" scoped>
.precio-sin-desc {
    text-decoration: line-through;
    color: red;
}

.box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    color: #000;
}

.datos-cliente {
    width: 60dvw;
    height: 100dvh;
    padding: 3dvw 1dvw 0 7dvw;
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: flex-start;
}

.datos-compra {
    width: 40dvw;
    height: 100dvh;
    padding: 3dvw 7dvw 0 1dvw;
    display: flex;
    flex-direction: column;
    background-color: #F8F9FD;
    padding: 135;

}

.titulo {
    color: #02021D;
    font-family: Brothers;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
    margin-bottom: 2dvh;
}

.productos-box {
    width: 100%;
    max-height: 35dvh;
    overflow-y: scroll;

}

.producto {
    margin: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.tarjetas-box {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: flex-start;
    width: 100%;

    & p {
        font-size: 16px;
        font-style: normal;
        line-height: 16px;
        margin-left: 0;
    }


}

.encabezado {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.encabezado-container {
    width: 100%;
    padding-right: 24px;
    margin-bottom: 2dvh;
}

.encabezado-border {
    width: 100%;
    border: 1px solid #E3E5ED;
    border-radius: 8px;
    padding: 18px 24px 18px 12px;
    align-self: flex-start;

}

.buscador-box input {
    width: 68%;
    border: none;
    border-bottom: 1px solid #cccccc;
    color: #2c384af2;
    padding: 0;
    margin: 0;
}

.buscador-box input:focus {
    outline: none;
}

.buscador-box {
    display: flex;

}

.data-cliente {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 12px;
}

.left-data {
    margin-right: 20px;
}

.tarjetas {
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 20px;
    padding: 24px;
}

.borde {
    width: 100%;
    border-radius: 8px;
    border: 1px solid #E3E5ED;
}


.botones {
    width: 100%;
    margin-bottom: 2dvh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}


.monto-total {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-right: 30px;
    font-size: 16px;
    font-style: normal;
    line-height: 16px;
    font-weight: 700;
    margin-bottom: 10px;
}

.direccion-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 3dvh;
    padding: 0 24px 0 0;
}

.direccion-border {
    width: 100%;
    border: 1px solid #E3E5ED;
    border-radius: 8px;
    padding: 18px 24px 18px 12px;
    align-self: flex-start;
}

.direccion {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.direccion input {
    width: 68%;
    border: none;
    border-bottom: 1px solid #cccccc;
    color: #2c384af2;
    padding: 0;
    margin: 0;
}

.direccion input:focus {
    outline: none;
}

.direccion-container h2 {
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 600;
}

.metodo-pago-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 3dvh;
    padding: 0 24px 0 0;
}

.metodo-pago-border {
    width: 100%;
    border: 1px solid #E3E5ED;
    border-radius: 8px;
    padding: 24px;
    align-self: flex-start;
}

.metodo-pago-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.metodo-pago {
    display: flex;
    align-items: center;
}

.metodo-pago span {
    padding-right: 1dvw;
}

.metodo-pago .right {
    margin-left: auto;

}

.metodo-pago input {
    text-align: center;
    border: none;
    border-bottom: 1px solid #cccccc;
    color: #2c384af2;
    margin: 0;
    padding: 0;
}

.metodo-pago input:focus {
    outline: none;
}

.metodo-pago-container h2 {
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 600;
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
    margin-right: 20px;

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

    &.eliminar {
        background-color: #fff;
        color: #000;
        margin-right: 0;
        border: 1px solid #31212B;
        margin-right: 10px;
    }
}

.monto-total-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 10px;

    & h2 {
        font-family: 'Inter', sans-serif;
        font-size: 24px;
        font-weight: 600;
        margin: 0;
    }

    & span {
        font-family: 'Inter', sans-serif;
        font-size: 24px;
        font-weight: 600;
    }
}

.subtotal-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    & h3 {
        font-family: 'Inter', sans-serif;
        font-size: 18px;
        font-weight: 400;
        margin: 0;
    }

    & span {
        font-family: 'Inter', sans-serif;
        font-size: 18px;
        font-weight: 400;
    }

    & .substract {
        color: #F94646;
    }
}

.pagar-btn {
    margin-top: 4dvh;
}
</style>