<template>
    <div class="modal-background fade-in" @click.self="$emit('on-close')">
        <!-- El click.self permite que la emision sea solo en el componente padre y no en los hijos -->
        <div class="modal-container">
            <div class="box">
                <div class="encabezado">
                    <h2 class="asoron">ASORON</h2>
                    <div v-if="user === null">
                        <h3 class="enc-tit">Bienvenido! Guest</h3>
                    </div>
                    <div v-else>
                        <h3 v-if="user.fk_usua_clie_natu" class="enc-tit">Bienvenido! {{ user.data.nombre }} </h3>
                        <h3 v-if="user.fk_usua_clie_juri" class="enc-tit">Bienvenido! {{ user.data.razonSocial }} </h3>
                        <h3 v-if="user.fk_usua_clie_juri === null && user.fk_usua_clie_natu === null" class="enc-tit">
                            Bienvenido! {{ user.data.nombre }} </h3>
                    </div>
                </div>
                <div v-if="user && items.length > 0" class="items-container">
                    <li v-for="(item, index) in items" :key="item.id">
                        <item @on-calcularTotal="addTotal" :item="item" :index="index"></item>
                    </li>
                </div>
                <div v-else class="items-container-placeholder">
                    <h3> ¡Aun no has agregado nada a tu Carrito! </h3>
                    <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#"
                        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" x="0px" y="0px"
                        viewBox="0 0 100 125">
                        <g transform="translate(0,-952.36218)">
                            <path
                                style="font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-indent:0;text-align:start;text-decoration:none;line-height:normal;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;text-anchor:start;baseline-shift:baseline;opacity:1;color:#000000;fill-opacity:1;stroke:none;stroke-width:3.99999976000000010;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate;font-family:Sans;-inkscape-font-specification:Sans"
                                d="M 44.25 6 A 2.0001999 2.0001999 0 0 0 42.46875 8 L 42.46875 28.46875 C 42.46875 34.33619 40.512003 37.22912 38.3125 40.09375 C 36.112997 42.95838 33.34375 45.90882 33.34375 50.6875 L 33.34375 92 A 2.0001999 2.0001999 0 0 0 35.34375 94 L 64.65625 94 A 2.0001999 2.0001999 0 0 0 66.65625 92 L 66.65625 50.6875 C 66.65625 45.90882 63.887002 42.95838 61.6875 40.09375 C 59.487998 37.22912 57.53125 34.33619 57.53125 28.46875 L 57.53125 8 A 2.0001999 2.0001999 0 0 0 55.53125 6 L 44.46875 6 A 2.0001999 2.0001999 0 0 0 44.25 6 z M 46.46875 10 L 53.53125 10 L 53.53125 28.46875 C 53.53125 35.29276 56.146946 39.46664 58.5 42.53125 C 60.853054 45.59586 62.65625 47.41709 62.65625 50.6875 L 62.65625 90 L 37.34375 90 L 37.34375 75.28125 L 58.3125 75.28125 A 2.0001999 2.0001999 0 1 0 58.3125 71.28125 L 37.34375 71.28125 L 37.34375 63.53125 L 58.3125 63.53125 A 2.0001999 2.0001999 0 1 0 58.3125 59.53125 L 37.34375 59.53125 L 37.34375 50.6875 C 37.34375 47.41709 39.146945 45.59586 41.5 42.53125 C 43.853055 39.46664 46.46875 35.29276 46.46875 28.46875 L 46.46875 18.8125 L 48.25 18.8125 A 2.0001999 2.0001999 0 1 0 48.25 14.8125 L 46.46875 14.8125 L 46.46875 10 z M 20.40625 12.34375 A 2.0001999 2.0001999 0 0 0 18.625 14.34375 L 18.625 31.71875 C 18.625 36.63391 17.04701 38.98992 15.21875 41.40625 C 13.39049 43.82258 11 46.43437 11 50.59375 L 11 85.625 A 2.0001999 2.0001999 0 0 0 13 87.625 L 28.59375 87.625 A 2.0001999 2.0001999 0 1 0 28.59375 83.625 L 15 83.625 L 15 50.59375 C 15 47.92065 16.42645 46.46037 18.40625 43.84375 C 20.38605 41.22713 22.625 37.57653 22.625 31.71875 L 22.625 23.84375 L 23.78125 23.84375 A 2.0001999 2.0001999 0 1 0 23.78125 19.84375 L 22.625 19.84375 L 22.625 16.34375 L 27.875 16.34375 L 27.875 31.71875 C 27.875 35.04869 28.566435 37.66462 29.5625 39.78125 A 2.0001999 2.0001999 0 1 0 33.1875 38.09375 C 32.421943 36.46694 31.875 34.51285 31.875 31.71875 L 31.875 14.34375 A 2.0001999 2.0001999 0 0 0 29.875 12.34375 L 20.625 12.34375 A 2.0001999 2.0001999 0 0 0 20.40625 12.34375 z M 69.90625 12.34375 A 2.0001999 2.0001999 0 0 0 68.125 14.34375 L 68.125 31.71875 C 68.125 34.51285 67.578057 36.46694 66.8125 38.09375 A 2.0001999 2.0001999 0 1 0 70.4375 39.78125 C 71.433565 37.66462 72.125 35.04869 72.125 31.71875 L 72.125 23.84375 L 73.3125 23.84375 A 2.0001999 2.0001999 0 1 0 73.3125 19.84375 L 72.125 19.84375 L 72.125 16.34375 L 77.375 16.34375 L 77.375 31.71875 C 77.375 37.57653 79.61395 41.22713 81.59375 43.84375 C 83.57355 46.46037 85 47.92065 85 50.59375 L 85 83.625 L 71.40625 83.625 A 2.0001999 2.0001999 0 1 0 71.40625 87.625 L 87 87.625 A 2.0001999 2.0001999 0 0 0 89 85.625 L 89 50.59375 C 89 46.43437 86.60951 43.82258 84.78125 41.40625 C 82.95299 38.98992 81.375 36.63391 81.375 31.71875 L 81.375 14.34375 A 2.0001999 2.0001999 0 0 0 79.375 12.34375 L 70.125 12.34375 A 2.0001999 2.0001999 0 0 0 69.90625 12.34375 z "
                                transform="translate(0,952.36218)" />
                        </g>
                    </svg>
                </div>
                <div class="total-container border-on" v-if="user && items.length > 0">
                    <div class="monto"><span>Monto total:</span><span>${{ TotalFinal }}</span></div>
                    <button class="button-18 " @click="pushToCheckout">CHECKOUT</button>
                </div>
                <div v-else class="total-container"></div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

import item from './ItemCarrito'

export default {
    emits: ['on-close'],             // defino las emisiones que puede hacer el componente
    props: {

    },
    components:
    {
        item
    },
    data() {
        return {
            TotalFinal: 0,
        };
    },
    computed: {
        ...mapState('carrito', ['items', 'montoTotal', 'uuid']),
        ...mapState('auth', ['user']),
    },
    methods: {
        ...mapActions('carrito', ['modifyItemCarrito']),
        ...mapMutations('carrito', ['changeMontoTotal', 'vaciarCarrito']),
        addTotal(total) {
            if (total[1]) {
                this.TotalFinal = this.TotalFinal - parseFloat(total[1])
            }
            if (total[0]) {
                this.TotalFinal = this.TotalFinal + parseFloat(total[0])
            }
            this.TotalFinal = Math.round(this.TotalFinal * 100) / 100;
            this.changeMontoTotal(this.TotalFinal)
        },
        pushToCheckout() {
            if (this.user.is_staff === true) {
                this.$router.push({ name: 'checkout-empleado' })
            }
            if (this.user.is_staff === false) {

                this.$router.push({ name: 'checkout-cliente' })
            }
        }

    },
    unmounted() {
        this.vaciarCarrito()
        for (const item of this.items) {
            let data = {}
            if (item.botella) {
                if (item.oferta) {
                    data = {
                        carri_item_cantidad: item.cantidad,
                        fk_carri_item_inve_tiend: item.botella.idTienda,
                        fk_carri_item_ofer_ron: item.oferta.id,
                        fk_carri_item_entr_evento: item.evento,
                        fk_carri_item_afil: item.afiliado,
                        carri_item_id: item.id
                    }
                } else {
                    data = {
                        carri_item_cantidad: item.cantidad,
                        fk_carri_item_inve_tiend: item.botella.idTienda,
                        fk_carri_item_ofer_ron: item.oferta,
                        fk_carri_item_entr_evento: item.evento,
                        fk_carri_item_afil: item.afiliado,
                        carri_item_id: item.id
                    }
                }
            }
            if (item.evento) {
                data = {
                    carri_item_cantidad: item.cantidad,
                    fk_carri_item_inve_tiend: item.botella,
                    fk_carri_item_ofer_ron: item.oferta,
                    fk_carri_item_entr_evento: item.evento.idEntrada,
                    fk_carri_item_afil: item.afiliado,
                    carri_item_id: item.id
                }
            }
            if (item.afiliado) {
                data = {
                    carri_item_cantidad: item.cantidad,
                    fk_carri_item_inve_tiend: item.botella,
                    fk_carri_item_ofer_ron: item.oferta,
                    fk_carri_item_entr_evento: item.evento,
                    fk_carri_item_afil: item.afiliado.id,
                    carri_item_id: item.id
                }
            }
            this.modifyItemCarrito({ id: item.id, dataToSave: data })
        }
        console.log('carritoActualizado')
    }

}
</script>

<style lang="scss" scoped>
.modal-background {
    position: fixed;
    margin-top: 92px;
    top: 0;
    left: 0;
    width: 100vw;
    height: 91dvh;
    z-index: 900;
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: flex-end;
}

.modal-container {
    width: 610px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    z-index: 900;
    padding: 20px;

}

.box {
    display: flex;
    flex-direction: column;
    color: #000;

}

.encabezado {
    height: 8dvh;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid lightgray;
}

.items-container {
    height: 70dvh;
    overflow-y: scroll;
    padding: 0 20px 0 10px;
}

.items-container-placeholder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70dvh;
    padding-top: 4dvh;
    overflow: hidden;

}

.items-container-placeholder svg {
    height: 30dvh;
    fill: #949494;
}

.items-container-placeholder h3 {
    font-family: 'Brothers', sans-serif;
    font-weight: bold;
    font-size: 24px;
    color: #949494;
    text-align: center;
    margin: 0;
    margin-bottom: 2dvh;
    width: 15vw;
}


.asoron {
    font-family: 'Brothers', sans-serif;
    font-weight: 800;
    font-size: 36px;
    color: #fdd08d;
    align-self: flex-start;
    margin: 0;
    height: fit-content;
}

.enc-tit {
    font-family: 'Brothers', sans-serif;
    font-weight: bold;
    font-size: 24px;
    color: #31212B;
    text-align: left;
    margin: 0;
}

.total-container {
    display: flex;
    padding-top: 1dvh;
    flex-direction: column;
    height: 9dvh;
    font-family: 'Brothers', sans-serif;
    font-weight: bold;
    font-size: 24px;
    color: #31212B;
    text-align: left;
    margin: 0;
}

.border-on {
    border-top: 1px solid lightgray;
}

.total-container button {
    width: 480px;
    align-self: center;
}

.monto {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 250px;
    color: red;
}


.fade-in {
    animation: fadeIn ease-out 0.2s;
    -webkit-animation: fadeIn ease-out 0.2s;
    -moz-animation: fadeIn ease-out 0.2s;
    -o-animation: fadeIn ease-out 0.2s;
    -ms-animation: fadeIn ease-out 0.2s;
}


.items-container li {
    width: 100%;
    list-style: none;
    margin: 0;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
}

.items-container li:first-child {
    border-top: none;
}

.items-container li:last-child {
    border-bottom: none;
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

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@-moz-keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@-webkit-keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@-o-keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@-ms-keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
