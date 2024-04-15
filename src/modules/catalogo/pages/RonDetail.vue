<template>
    <h1 class="container" v-if="!ronDetallado">Cargando... Por favor Espere</h1>
    <div v-else>
        <div class="ron-container">
            <img :src="ronDetallado.images[0].url" />
            <div class="info">
                <h1>{{ ronDetallado.nombre }}</h1>
                <p>{{ ronDetallado.ron.descripcion }}</p>
                <div class="comprar">
                    <span> ${{ ronDetallado.inventario.precio }} </span>
                    <PlusMinusInput :Max="ronDetallado.inventario.cantidad" @update:modelValue="changeCantidad" />
                    <button class="button-18" @click="anadirAlCarrito">Añadir al Carrito</button>
                </div>
            </div>
        </div>
        <div class="desplegables-contenedor">
            <div class="desplegables-container">
                <div class="collapsible ficha-tecnica">
                    <input class="collapsible-input" type="checkbox" id="collapsible-head-ficha">
                    <label class="collapsible-label external-label" for="collapsible-head-ficha">FICHA TECNICA</label>
                    <div class="collapsible-text scrollable">
                        <ul class="collapsible-text-list external-list">
                            <li>
                                <b>Proveedor : </b>{{ ronDetallado.ron.proveedor.razonSocial }} , <a id="link-proveedor"
                                    :href="ronDetallado.ron.proveedor.web">Pagina Web</a>
                            </li>
                            <li>
                                <b>Clasificación : </b>{{ ronDetallado.ron.clasificacion }}
                            </li>
                            <li>
                                <b>Tipo : </b>{{ ronDetallado.ron.tipo }}
                            </li>
                            <li>
                                <b>Materia Prima : </b>
                                <span v-for="materia in ronDetallado.ron.matePrima" :key="materia.id">
                                    {{ materia }},
                                </span>
                            </li>
                            <li>
                                <b>Origen : </b>{{ ronDetallado.ron.lugar.estado }}, {{ ronDetallado.ron.lugar.municipio }},
                                Pqa.{{ ronDetallado.ron.lugar.parroquia }}
                            </li>
                            <!-- Colapsable interno de Añejamiento -->
                            <div class="collapsible mini-collapsible">
                                <input class="collapsible-input" type="checkbox" id="collapsible-head-anejamiento">
                                <label class="collapsible-label internal-label"
                                    for="collapsible-head-anejamiento">Añejamiento</label>
                                <div class="collapsible-text">
                                    <ul class="collapsible-text-list internal-list">
                                        <li>
                                            <b>Cantidad de Años : </b>{{ ronDetallado.ron.anejamiento.cantidadAnos }} años
                                        </li>
                                        <li>
                                            <b>Calidad del Agua : </b>{{ ronDetallado.ron.anejamiento.calidadAgua }}
                                        </li>
                                        <li>
                                            <b>Metodo de Destilación : </b>{{
                                                ronDetallado.ron.anejamiento.metodoDestilacion }}
                                        </li>
                                        <li>
                                            <b>Metodo de Fermentación : </b>{{
                                                ronDetallado.ron.anejamiento.metodoFermentacion }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <li>
                                <b>Grado Alcoholico : </b>{{ ronDetallado.ron.grad_alcohol }}°
                            </li>
                            <div class="collapsible mini-collapsible">
                                <input class="collapsible-input" type="checkbox" id="collapsible-head-botella">
                                <label class="collapsible-label internal-label"
                                    for="collapsible-head-botella">Botella</label>
                                <div class="collapsible-text">
                                    <ul class="collapsible-text-list internal-list">
                                        <li>
                                            <b>Material : </b>{{ ronDetallado.material.nombre }}
                                        </li>
                                        <li>
                                            <b>Capacidad : </b>{{ ronDetallado.material.capacidad }} mlts.
                                        </li>
                                        <li>
                                            <b>Altura : </b>{{ ronDetallado.material.altura }} cm.
                                        </li>
                                        <li>
                                            <b>Ancho : </b>{{ ronDetallado.material.ancho }} cm.
                                        </li>
                                        <li>
                                            <b>Tapa : </b>{{ ronDetallado.tapa.tipo }} de {{ ronDetallado.tapa.material }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <li>
                                <b>Color : </b>{{ ronDetallado.ron.color.nombre }}, {{ ronDetallado.ron.color.descripcion }}
                            </li>
                            <li>
                                <b>Sensaciones : </b>
                                <span v-for="sensacion in ronDetallado.ron.sensacion" :key="sensacion.id">
                                    {{ sensacion }},
                                </span>
                            </li>
                            <!-- Colapsable de Barril-->
                            <div class="collapsible mini-collapsible">
                                <input class="collapsible-input" type="checkbox" id="collapsible-head-barriles">
                                <label class="collapsible-label internal-label"
                                    for="collapsible-head-barriles">Barril</label>
                                <div class="collapsible-text internal-list">
                                    <ul class="collapsible-text-list internal-list">
                                        <div v-for="barril in ronDetallado.ron.anejamiento.barril" :key="barril.id"
                                            class="collapsible mini-collapsible">
                                            <input class="collapsible-input" type="radio" name="barriles"
                                                :id=ronDetallado.ron.anejamiento.barril.indexOf(barril)>
                                            <label class="collapsible-label internal-label add-label-padding"
                                                :for=ronDetallado.ron.anejamiento.barril.indexOf(barril)>
                                                Barril {{ ronDetallado.ron.anejamiento.barril.indexOf(barril) + 1}}
                                            </label>
                                            <div class="collapsible-text internal-list">
                                                <ul class="collapsible-text-list internal-list add-list-padding">
                                                    <li>
                                                        <b>Cantidad de Años : </b>{{ barril.anos }} años
                                                    </li>
                                                    <li>
                                                        <b>Calidad del Barril : </b>{{ barril.calidad }}
                                                    </li>
                                                    <li>
                                                        <b>Madera : </b>{{ barril.madera }}
                                                    </li>
                                                    <li>
                                                        <b>Capacidad : </b>{{ barril.tamano }} Lts.
                                                    </li>
                                                    <li>
                                                        <b>Tipo : </b>{{ barril.tipo }}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            <div class="collapsible mini-collapsible">
                                <input class="collapsible-input" type="checkbox" id="collapsible-head-caja">
                                <label class="collapsible-label internal-label" for="collapsible-head-caja">Caja</label>
                                <div class="collapsible-text">
                                    <ul class="collapsible-text-list internal-list">
                                        <li>
                                            <b>Paleta : </b>{{ ronDetallado.caja.paleta }}, {{
                                                ronDetallado.caja.cantidad_paleta }} UND.
                                        </li>
                                        <li>
                                            <b>Bulto: </b>{{ ronDetallado.caja.bulto }}, {{
                                                ronDetallado.caja.cantidad_bulto }} UND.
                                        </li>
                                        <li>
                                            <b>Caja : </b>{{ ronDetallado.caja.caja }}, {{ ronDetallado.caja.cantidad_caja
                                            }}
                                            UND.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
                <div class="collapsible como-servir">
                    <input class="collapsible-input" type="checkbox" id="collapsible-head-servir">
                    <label class="collapsible-label external-label" for="collapsible-head-servir">COMO SERVIR</label>
                    <div class="collapsible-text">
                        <ul class="collapsible-text-list external-list">
                            <li class="collapsible-text-list-como-servir" v-for="servir in ronDetallado.ron.comoServir"
                                :key="servir.coctel">
                                <h4>{{ servir.coctel.toUpperCase() }}</h4>
                                <p>{{ servir.como_preparar }}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-show="ronDetallado.ron.premio.length !== 0" class="collapsible premios">
                <input class="collapsible-input" type="checkbox" id="collapsible-head-premios">
                <label class="collapsible-label external-label" for="collapsible-head-premios">PREMIOS</label>
                <div class="collapsible-text scrollable">
                    <ul class="collapsible-text-list external-list">
                        <li class="collapsible-text-list-premios" v-for="premio in ronDetallado.ron.premio"
                            :key="premio.id">
                            <div class="premio-left">
                                <h3 v-if="premio.premio.nombre">{{ premio.premio.nombre }}</h3>
                                <h3 v-else>Premio del Evento</h3>
                                <h4>{{ premio.evento.nombre }}</h4>
                                <div class="location">
                                    <svg xmlns:dc="http://purl.org/dc/elements/1.1/"
                                        xmlns:cc="http://creativecommons.org/ns#"
                                        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                                        xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                                        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" x="0px"
                                        y="0px" viewBox="0 0 100 125">
                                        <g transform="translate(0,-952.36218)">
                                            <path
                                                style="text-indent:0;text-transform:none;direction:ltr;block-progression:tb;baseline-shift:baseline;color:#000000;enable-background:accumulate;"
                                                d="m 50.00015,957.56521 c -16.7931,0 -30.4375,13.8052 -30.4375,30.7187 0,5.4508 1.4321,10.5606 3.9063,14.99999 0.016,0.028 0.015,0.066 0.031,0.094 a 2.80028,2.80028 0 0 0 0.1562,0.3438 c 0.01,0.012 0.024,0.019 0.031,0.031 l 24.0313,42 a 2.80028,2.80028 0 0 0 4.875,-0.031 l 23.6874,-42 0.063,-0.125 c 0.01,-0.012 0.024,-0.019 0.031,-0.031 a 2.80028,2.80028 0 0 0 0.2188,-0.5 c 2.4045,-4.39189 3.8437,-9.41329 3.8437,-14.78129 0,-16.7276 -13.3648,-30.3609 -29.9063,-30.6563 -0.033,-6e-4 -0.061,-0.031 -0.094,-0.031 a 2.80028,2.80028 0 0 0 -0.2813,-0.031 c -0.053,-3e-4 -0.1032,0 -0.1562,0 z m 0,12.0937 c 9.6622,0 17.5625,7.9899 17.5625,17.75 0,9.7603 -7.9003,17.71869 -17.5625,17.71869 -9.6622,0 -17.5625,-7.95849 -17.5625,-17.71869 0,-9.7602 7.9003,-17.75 17.5625,-17.75 z"
                                                fill="#5E5E5E" fill-opacity="1" stroke="none" marker="none"
                                                visibility="visible" display="inline" overflow="visible" />
                                        </g>
                                    </svg>
                                    <span>{{ premio.evento.direccion }}</span>
                                </div>
                            </div>
                            <div class="premio-center">
                                <span v-if="premio.premio.descripcion">{{ premio.premio.descripcion }}</span>
                                <span v-else>Este premio es unico en su especie y para nada repetido</span>
                                <blockquote v-if="premio.notaCata[0]">" {{ premio.notaCata[0].descripcion }} "</blockquote>
                                <blockquote v-else>" Muy buen Ron, que se repita, 100% real No autogenerado "</blockquote>
                            </div>
                            <div class="premio-right">
                                <span>{{ premio.evento.fechaFin }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-if="rones.length !== 0" class="relacionados-contenedor">
            <div class="relacionados-container">
                <h1 class="titulo-catalogo">Rones Relacionados</h1>
                <div v-if="isLoading">
                    <div class="wait-text alert-info text-center mt-5">
                        Espere por favor
                        <h3 class="mt-2">
                            <i class="fa fa-spin fa-sync"></i>
                        </h3>
                    </div>
                </div>
                <div v-else>
                    <ul class="relacionados-catologo">
                        <li v-for="ron in rones" :key="ron.id">
                            <RonMinimal :clickeable="true" :ron="ron" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="separator"></div>
    </div>
</template>

<script>

import getRonDetail from '@/modules/catalogo/helpers/getRonDetail'
import PlusMinusInput from '@/modules/shared/components/PlusMinusInput.vue'
import RonMinimal from '@/modules/catalogo/components/RonMinimal.vue'
import getRonesRelacionado from '@/modules/catalogo/helpers/getRonDetailRelacionados'
import { mapActions, mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
    components: {
        PlusMinusInput,
        RonMinimal,
    },
    props: {
        id: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            ronDetallado: null,
            cantidad: 1,
            isLoading: true,
            rones: []
        }
    },
    computed: {
        ...mapState('auth', ['user']),
        ...mapState('carrito', ['uuid', 'items']),
    },
    methods: {
        async getRonRelacionados() {
            this.rones = await getRonesRelacionado(this.ronDetallado.ron.proveedor.denominacionComercial, this.ronDetallado.inventario.precio, this.ronDetallado.id)
            this.isLoading = false
        },
        async getRonDetail(id) {
            this.ronDetallado = null
            try {
                this.ronDetallado = await getRonDetail(id)
                this.getRonRelacionados()
                // console.log(this.ronDetallado)
            } catch (error) {
                // this.$router.push({ name: 'catalogo' })
            }
        },
        changeCantidad(value) {
            this.cantidad = value
        },
        ...mapActions('carrito', ['addProductoCarrito']),
        async anadirAlCarrito() {
            if (!this.user) {
                this.$router.push({ name: 'login' })
            } else {
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
                    fk_carri_item_inve_tiend: this.ronDetallado.inventario.idTienda,
                    carri_item_cantidad: this.cantidad,
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
                if (!item.botella) return
                console.log('Items', item.botella.idBotella, this.ronDetallado.inventario.idTienda)
                if (item.botella.idBotella === this.ronDetallado.id) {
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
    mounted() {
        this.getRonDetail(this.id)
    },
    watch: {
        id(value) {
            this.getRonDetail(value)
        },
    },
}

</script>

<style lang="scss" scoped>
.separator {
    height: 10vh;
}


.ron-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 100px;
    margin-bottom: 4vh;
}

.desplegables-contenedor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 3vh;
}

.relacionados-contenedor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 3vh;
}

.ron-container img {
    width: 500px;
    height: 500px;
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

}

.info h1 {
    width: 564px;
    font-size: 36px;
    font-weight: 700;
    font-family: 'Brothers';
    margin-bottom: 20px;
    text-align: left;
}

.info p {
    width: 564px;
    text-align: left;
}

.comprar {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 75%;
}


// colapsables 

.desplegables-container {
    width: 70vw;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.collapsible-input {
    display: none;

}

.collapsible {
    max-width: 70vw;
    overflow: hidden;
    font-weight: 500;
    margin-bottom: 20px;
}

.mini-collapsible {
    margin-bottom: 0;
}

.collapsible .collapsible-label {
    position: relative;
    display: block;
    cursor: pointer;
    z-index: 1;
}

.external-label {
    border-radius: 4px;
    padding: 15px;
    color: black;
    font-size: 22px;
    font-weight: 800;
    font-family: 'Brothers', sans-serif;
    background: #FDD08D;
    text-align: left;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, .1), 0 4px 11px 0 rgba(0, 0, 0, .08);
    margin-bottom: 10px;
}

.collapsible .external-label:after {
    content: "+";
    position: absolute;
    right: 15px;
    top: 15px;
    transition: all 0.3s ease;
}

.collapsible .collapsible-input:checked+.collapsible-label:after {
    transform: rotate(45deg);
    transition: all 0.3s ease;
}


.collapsible-text {
    max-height: 1px;
    overflow: hidden;
    border-radius: 4px;
    line-height: 1.4;
    position: relative;
    top: -100%;
    opacity: 0.5;
    transition: all 0.3s ease;
}

.collapsible .collapsible-input:checked~.collapsible-text {
    max-height: 550px;
    background: whitesmoke;
    border-radius: 4px;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, .1), 0 4px 11px 0 rgba(0, 0, 0, .08);
    opacity: 1;
    top: 0;
}

.collapsible .collapsible-input:checked~.scrollable {
    overflow-y: scroll;

}

.scrollable::-webkit-scrollbar {
    width: 8px;
}

.scrollable::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
}

.scrollable::-webkit-scrollbar-thumb {
    background-color: #FDD08D;
    border-radius: 100px;
}

.collapsible-text .collapsible-text-list {
    padding: 0;
    margin: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 0;
}

.external-list li {
    font-size: 16px;
    font-weight: 400;
    font-family: 'Inter', sans-serif;
    color: black;
    padding: 10px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    width: 100%;
    margin: 0;
}

.internal-list li {
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    color: black;
    padding: 10px 20px 10px 40px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    width: 100%;
    margin: 0;
}

.add-list-padding li {
    padding-left: 60px;
}

.collapsible-text .collapsible-text-list .collapsible-text-list-como-servir h4 {
    font-size: 18px;
    font-weight: 800;
    font-family: 'Brothers', sans-serif;
}

.collapsible-text .collapsible-text-list .collapsible-text-list-como-servir p {
    margin-left: 10px;
}

#link-proveedor {
    font-weight: 600;
    color: #31212b
}

// colapsables internos

.internal-label {
    font-size: 16px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    color: black;
    padding: 10px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    text-align: left;
    transition: background-color 0.3s ease;
}

.add-label-padding {
    padding-left: 40px;
}

.internal-label:hover {
    background-color: rgb(230, 230, 230);
}

.collapsible .internal-label:after {
    content: "+";
    position: absolute;
    right: 20px;
    top: 10px;
    transition: all 0.3s ease;
}

// Premios

.premios {
    max-width: 70vw;
    width: 100%;
}

.collapsible-text-list-premios {
    display: flex;
    width: 100%;
}


.collapsible-text-list-premios .premio-left {
    font-family: 'Inter', sans-serif;
    width: 30%;
}

.collapsible-text-list-premios .premio-left h3 {
    font-size: 20px;
    font-weight: 800;
    font-family: 'Brothers', sans-serif;
}

.collapsible-text-list-premios .premio-left h4 {
    font-size: 16px;
    font-weight: 600;
}

.collapsible-text-list-premios .premio-left .location svg {
    width: 16px;
    height: 16px;
}

.collapsible-text-list-premios .premio-left .location span {
    font-size: 14px;
    color: #5E5E5E
}

.collapsible-text-list-premios .premio-center {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    width: 45%;
    margin-right: auto;
}

.collapsible-text-list-premios .premio-center span {
    margin-bottom: 1vh;
    font-size: 14px;
    color: #949494;
}

.collapsible-text-list-premios .premio-center blockquote {
    font-style: italic;
}

.collapsible-text-list-premios .premio-right {
    width: 10%;
    font-size: 14px;
    align-self: flex-end;
    text-align: right;
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

.relacionados-container {
    width: 70vw;
    display: flex;
    flex-direction: column;
    align-items: center
}

.relacionados-catalogo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.relacionados-catalogo li {
    list-style-type: none
}

.wait-text {
    font-family: 'Inter', sans-serif;
    font-size: 32px;
}

.titulo-catalogo {
    font-family: 'Brothers', sans-serif;
    color: #31212b;
    font-weight: bold;
    align-self: flex-start;
    padding-bottom: 3vh;
}
</style>