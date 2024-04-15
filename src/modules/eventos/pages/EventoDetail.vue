<template>
    <div>Soy un detalle de Evento</div>
    <h1 class="container" v-if="!evento">Cargando... Por favor Espere</h1>
    <div v-else>
        <div class="evento-container">
            <div v-if="hasImage" class="test-image" :style="{ backgroundImage: `url(${evento.images[0].img_url})` }">
            </div>
            <div v-else class="test-random-image">
                <h1> {{ "EVENTO " + evento.nombre.toUpperCase() }} </h1>
            </div>
            <div class="info">
                <h1>{{ evento.nombre }}</h1>
                <p>{{ evento.descripcion }}</p>
                <div class="location">
                    <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#"
                        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" x="0px" y="0px"
                        viewBox="0 0 100 125">
                        <g transform="translate(0,-952.36218)">
                            <path
                                style="text-indent:0;text-transform:none;direction:ltr;block-progression:tb;baseline-shift:baseline;color:#000000;enable-background:accumulate;"
                                d="m 50.00015,957.56521 c -16.7931,0 -30.4375,13.8052 -30.4375,30.7187 0,5.4508 1.4321,10.5606 3.9063,14.99999 0.016,0.028 0.015,0.066 0.031,0.094 a 2.80028,2.80028 0 0 0 0.1562,0.3438 c 0.01,0.012 0.024,0.019 0.031,0.031 l 24.0313,42 a 2.80028,2.80028 0 0 0 4.875,-0.031 l 23.6874,-42 0.063,-0.125 c 0.01,-0.012 0.024,-0.019 0.031,-0.031 a 2.80028,2.80028 0 0 0 0.2188,-0.5 c 2.4045,-4.39189 3.8437,-9.41329 3.8437,-14.78129 0,-16.7276 -13.3648,-30.3609 -29.9063,-30.6563 -0.033,-6e-4 -0.061,-0.031 -0.094,-0.031 a 2.80028,2.80028 0 0 0 -0.2813,-0.031 c -0.053,-3e-4 -0.1032,0 -0.1562,0 z m 0,12.0937 c 9.6622,0 17.5625,7.9899 17.5625,17.75 0,9.7603 -7.9003,17.71869 -17.5625,17.71869 -9.6622,0 -17.5625,-7.95849 -17.5625,-17.71869 0,-9.7602 7.9003,-17.75 17.5625,-17.75 z"
                                fill="#5E5E5E" fill-opacity="1" stroke="none" marker="none" visibility="visible"
                                display="inline" overflow="visible" />
                        </g>
                    </svg>
                    <span>{{ evento.lugar.estado }}, {{ evento.lugar.municipio }}, {{ evento.lugar.parroquia }}, {{
                        evento.direccion }}</span>
                </div>
                <span class="fecha">{{ evento.fechaInicio }} ~ {{ evento.fechaFin }}</span>
                <div class="entradas-container" v-if="evento.entradas.length > 0">
                    <span class="entradas-title">ENTRADAS DISPONIBLES</span>
                    <ul class="entradas-lista">
                        <li class="entrada" v-for="entrada in evento.entradas" :key="entrada.id">
                            <input v-model="entradaId" type="radio" name="entrada" :id="entrada.id" :value="entrada.id">
                            <div class="entradas-tipo">
                                <label :for="entrada.id">{{ entrada.nombre }}</label>
                                <span>${{ entrada.precio }}</span>
                            </div>
                        </li>
                    </ul>
                    <button class="button-18" @click="anadirAlCarrito">Comprar Entrada</button>
                </div>
            </div>
        </div>
        <div class="box">
            <h1> Lista de rones a presentar</h1>
            <div class="rones-container">
                <li v-for="ron in evento.rones" :key="ron.id">
                    <ron-minimal :ron="ron" :clickeable="false"></ron-minimal>
                </li>
            </div>
        </div>
    </div>
</template>

<script>
import getEventDetail from '../helpers/getEventDetail'
import RonMinimal from '@/modules/catalogo/components/RonMinimal.vue'
import { mapState, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
    components: {
        RonMinimal,
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            evento: null,
            entradaId: null,
        }
    },
    methods: {
        async getEventDetail(id) {
            this.evento = null
            this.evento = await getEventDetail(id)
        },
        ...mapActions('carrito', ['addProductoCarrito']),
        async anadirAlCarrito() {
            if (!this.user) {
                this.$router.push({ name: 'login' })
            } else {
                if (!this.entradaId) {
                    Swal.fire({
                        position: "bottom-end",
                        title: "Seleccione una Entrada primero",
                        background: "#0085FF",
                        color: "#fff",
                        showConfirmButton: false,
                        timer: 1500,
                        backdrop: false
                    });
                    return
                }
                if (this.revisarEnCarrito()) {
                    Swal.fire({
                        position: "bottom-end",
                        title: "Ya se encuentra en el carrito",
                        background: "#0085FF",
                        color: "#fff",
                        showConfirmButton: false,
                        timer: 1500,
                        backdrop: false
                    });
                    return
                }
                const data = {
                    fk_carri_item_entr_evento: this.entradaId,
                    carri_item_cantidad: 1,
                    carr_uuid: this.uuid
                }
                console.log(data)
                try {
                    await this.addProductoCarrito(data)
                    Swal.fire({
                        position: "bottom-end",
                        title: "Añadido al carrito",
                        background: "#42FF00",
                        color: "#fff",
                        showConfirmButton: false,
                        timer: 1500,
                        backdrop: false
                    });
                } catch (error) {
                    console.log(error)
                    Swal.fire({
                        position: "bottom-end",
                        title: "Error al añadir al carrito",
                        background: "#F94646",
                        color: "#fff",
                        showConfirmButton: false,
                        timer: 1500,
                        backdrop: false
                    });
                }
            }
        },
        revisarEnCarrito() {
            const item = this.items.find((item) => {
                console.log(item)
                if (!item.evento) return
                if (item.evento.idEntrada === this.entradaId) {
                    return item
                }
            })
            if (item) {
                return true
            } else {
                return false
            }
        },
    },
    computed: {
        hasImage() {
            if (this.evento.images[0]) return true
            else return false
        },
        ...mapState('carrito', ['uuid', 'items']),
        ...mapState('auth', ['user'])
    },
    mounted() {
        this.getEventDetail(this.id)
    }
}
</script>

<style lang="scss" scoped>
.evento-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 100px;
}

.test-image {
    width: 480px;
    height: 480px;
    background-size: cover;
    background-position: center;
}

.test-random-image {
    width: 480px;
    height: 480px;
    background: rgb(2, 0, 36);
    background: linear-gradient(137deg, rgba(2, 0, 36, 1) 0%, rgba(0, 212, 255, 1) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
}

.test-random-image h1 {
    color: #fff;
    font-family: 'Brothers', sans-serif;
    font-weight: 800;
    text-align: center;
}

.info {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-left: 50px;
    margin-right: 50px;
    color: black;
    padding-top: 40px;
    width: 564px;

    & h1 {
        font-size: 36px;
        font-weight: 700;
        font-family: 'Brothers';
        margin-bottom: 20px;
        text-align: left;
    }

    & p {
        width: 564px;
        text-align: left;
    }
}

.box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 60px;

    & h1 {
        width: 564px;
        font-size: 36px;
        font-weight: 700;
        font-family: 'Brothers';
        margin-bottom: 20px;
        text-align: left;
    }
}

.rones-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 1144px;
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

.rones-container li {
    list-style: none;
}

.location {
    align-self: flex-end;
}

.location svg {
    width: 16px;
    height: 16px;
}

.location span {
    font-size: 14px;
    color: #5E5E5E
}

.fecha {
    font-size: 14px;
    color: #5E5E5E;
    align-self: flex-end;
}

.entradas-container {
    width: 100%;
    margin-top: 3vh;
    display: flex;
    flex-direction: column;
}

.entradas-title {
    margin-bottom: 2vh;
    align-self: center;
    font-size: 24px;
    font-weight: 600;
    font-family: 'Brothers';
}

.entradas-lista {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
}

.entrada {
    padding: 0;
    display: flex;
    justify-content: flex-start;
}

.entrada input {
    margin-right: 10px;
}

.entradas-tipo {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    font-size: 18px;
}

.entradas-tipo label {
    margin-right: auto;
}

.entradas-tipo span {
    margin-right: 5px;
}

.entradas-container button {
    align-self: center;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>