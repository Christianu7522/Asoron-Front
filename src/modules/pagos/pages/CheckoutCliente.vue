<template>
    <div v-if="!isLoading"></div>
    <div v-else class="box">
        <div class="datos-cliente">
            <h1 class="titulo">Asoron</h1>
            <h1 class="subtitulo">Checkout</h1>
            <div v-if="listaTarjetas.length === 0" class="tarjetas-box">
                No posee tarjetas registradas
            </div>
            <div v-else class="tarjetas-box">
                <h2>Seleccionar Tarjetas</h2>
                <div class="tarjetas-container">
                    <ul class="borde">
                        <li class="tarjeta" v-for="tarjeta in listaTarjetas" :key="tarjeta.id">
                            <input type="radio" name="tarjeta" v-model="tarjetaId" :id="tarjeta.id" :value="tarjeta.id">
                            <label for="tarjeta1">{{ tarjeta.numeroTarjeta }}</label>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="botones">
                <!-- <button class="button-18 eliminar">Eliminar Tarjeta</button> -->
                <button class="button-18" @click="openAddCard">Añadir Tarjeta</button>
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

            <div class="puntos-container">
                <h2>Puntos</h2>
                <div class="puntos-border">
                    <div class="puntos">
                        <span>Puntos a pagar:</span>
                        <input type="number" v-model="puntos" min="0" :max="maxPuntos" />
                        <span class="acumulados">Puntos Acumulados: {{ this.maxPuntos }}</span>
                    </div>
                </div>
            </div>
            <AddCard v-if="active" @on-close="closeAddCard"></AddCard>
        </div>
        <div class="datos-compra">
            <div class="productos-box">
                <div class="producto" v-for="(item, ) in items" :key="item.id">
                    <div class="producto-nombre">
                        <span v-if="item.afiliado">{{ item.afiliado.nombre }}</span>
                        <span v-if="item.botella">{{ item.botella.nombre }}</span>
                        <span v-if="item.evento">{{ item.evento.nombre }} | {{ item.evento.entradaNombre }}</span>
                    </div>
                    <div class="producto-precio">
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
                    <h3>Puntos ({{ puntosPrecio }}$ c/u)</h3>
                    <span class="substract">- ${{ montoPuntos }}</span>
                </div>
                <hr>
                <div class="monto-total-container">
                    <h2>Total</h2>
                    <span>${{ (montoTotal - montoPuntos).toFixed(2) }}</span>
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
import AddCard from '../components/AddCard.vue'
import getTarjetas from '../helpers/getTarjetas'
import Lugar from '@/modules/auth/components/Lugar'
import getPrecioPuntos from '../helpers/getPrecioPuntos'
import getPuntosInfo from '../helpers/getPuntosInfo'
import getValorDolar from '../helpers/getValorDolar'
import postVenta from '../helpers/postVenta'
import BackToHome from '@/modules/auth/components/BackToHome'


export default {
    components: {
        AddCard,
        Lugar,
        BackToHome
    },
    data() {
        return {
            direccion: '',
            fkDireccion: '',
            puntos: 0,
            active: false,
            listaTarjetas: null,
            tarjetaId: null,
            puntosId: null,
            puntosPrecio: 15,
            maxPuntos: 0,
            valorDolar: 0,
            pagado: false
        };
    },
    computed: {
        ...mapState('carrito', ['items', 'uuid']),
        ...mapState('auth', ['user']),
        isLoading() {
            if ((!this.user || !this.items || this.items.length === 0 || this.listaTarjetas === null) && this.pagado === false) {
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
            return montoFinal
        },
        montoPuntos() {
            let monto = 0
            monto = this.puntos * this.puntosPrecio
            return monto
        },
        montoTarjeta() {
            let monto = 0
            monto = this.montoTotal - this.montoPuntos
            return Number.parseFloat(monto.toFixed(2))
        }
    },
    methods: {
        ...mapMutations('carrito', ['endCarrito']),
        ...mapActions('carrito', ['getCarritoCliente']),
        openAddCard() {
            this.active = true
        },
        async closeAddCard() {
            this.active = false
            this.listaTarjetas = await getTarjetas()
        },
        setFkDireccion(value) {
            this.fkDireccion = value
            console.log(value)
        },
        async vender() {
            if (this.validar()) {
                new Swal({
                    title: 'Espere por favor',
                    allowOutsideClick: false,
                })
                Swal.showLoading()
                if (this.puntos === '') {
                    this.puntos = 0
                }
                const data = {
                    venta_direccion: this.direccion,
                    fk_vent_direccion: this.fkDireccion,
                    uuid_carrito: this.uuid,
                    tarjeta_id: this.tarjetaId,
                    cantidad_tarjeta: Number.parseFloat(this.montoTarjeta.toFixed(2)),
                    puntos_id: this.puntosId,
                    cantidad_puntos: this.puntos
                }
                try {
                    console.log(data)
                    await postVenta(data)
                    this.pagado = true
                    Swal.fire('Success', 'Pago realizado con exito', 'success').then((result) => {
                        if (result.isConfirmed) {
                            this.endCarrito()
                            this.getCarritoCliente()
                            this.$router.push({ name: 'home' });
                            Swal.close()
                        }
                    });
                } catch (error) {
                    console.log(error)
                    Swal.fire('Error', `Problema al registrar el pago\n${error.response.data.error}`, 'error')
                }
            }
        },
        validar() {
            if (this.direccion === '' || this.tarjetaId === null || this.fkDireccion === '' || this.puntosId === null) {
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
            return true
        },
    },
    async mounted() {
        this.listaTarjetas = await getTarjetas()
        this.puntosPrecio = await getPrecioPuntos()
        this.valorDolar = await getValorDolar()
        const data = await getPuntosInfo()
        this.puntosId = data.punt_id
        this.maxPuntos = data.cantidad_puntos
    },
    watch: {
        puntos(value) {
            if (value > this.maxPuntos) {
                this.puntos = this.maxPuntos
            } else if (value < 0) {
                this.puntos = 0
            }
            this.puntos = Math.round(this.puntos)
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
    padding: 4dvw 1dvw 0 7dvw;
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: flex-start;
}



.datos-compra {
    width: 40dvw;
    height: 100dvh;
    padding: 4dvw 7dvw 0 1dvw;
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
}

.subtitulo {
    color: #535353;
    margin-top: 10px;
    font-size: 24px;
    font-family: 'Inter', sans-serif;
    font-weight: 200;
}

.productos-box {
    width: 100%;
    max-height: 45dvh;
    overflow-y: scroll;

}

.producto {
    margin: 1dvh 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.producto-nombre {
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 600;
}

.tarjetas-box {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: flex-start;
    width: 100%;
}

.tarjetas-box h2 {
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 600;
}

.tarjetas-container {
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: flex-start;
    width: 100%;
    padding: 0 24px 0 0;
}

.borde {
    width: 100%;
    border-radius: 8px;
    padding: 0 12px;
    border: 1px solid #E3E5ED;
    max-height: 240px;
    overflow-y: scroll;
    margin: 0;

}

.tarjeta {
    display: flex;
    flex-direction: row;
    justify-content: top;
    align-items: flex-start;
    padding: 24px 12px;
    width: 100%;
    margin: 5px 0;
    list-style-type: none;
    border-top: 1px solid #E3E5ED;

    & input {
        margin-right: 16px;
        width: 20px;
        height: 20px;
    }

    &:first-child {
        border-top: none;
    }
}

.botones {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin: 3dvh 0;
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
    padding: 24px 12px;
    align-self: flex-start;
}

.direccion {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.direccion input {
    width: 65%;
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

.puntos-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 3dvh;
    padding: 24px 24px 0 0;
}

.puntos-border {
    width: 100%;
    border: 1px solid #E3E5ED;
    border-radius: 8px;
    padding: 24px;
    align-self: flex-start;
}

.puntos {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.puntos span {
    padding-right: 1dvw;
}

.puntos .acumulados {
    margin-left: auto;
    color: #2c384af2;
    padding: 0;
}

.puntos input {
    text-align: center;
    border: none;
    border-bottom: 1px solid #cccccc;
    color: #2c384af2;
    margin: 0;
    padding: 0;
}

.puntos input:focus {
    outline: none;
}

.puntos-container h2 {
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