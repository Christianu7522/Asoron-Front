<template>
    <div class="filtros">
        <div class="title-container">
            <h1>Filtros</h1>
            <div class="buttons-container">
                <button class="title-btn apply-btn" @click="filtrar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
                        stroke="#FDD08D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-check">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </button>
                <button class="title-btn cancel-btn" @click="unfilter()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
                        stroke="#31212b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-x">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>
        <div class="filtro-container filtro-marca">
            <input class="collapsible-input" type="checkbox" id="marca-desplegable">
            <label for="marca-desplegable" class="filtro-label">Marca</label>
            <div class="collapsible-container">
                <ul class="filtro-lista">
                    <li v-for="proveedor in marca_list" :key="proveedor.id" class="filtro_item">
                        <input v-model="marca" class="boton-radio" name="marca" type="radio" :value=proveedor>
                        <label>{{ proveedor }}</label>
                    </li>
                </ul>
            </div>
        </div>
        <div class="filtro-container filtro-tipo-ron">
            <input class="collapsible-input" type="checkbox" id="tipo-desplegable">
            <label for="tipo-desplegable" class="filtro-label">Tipo de Ron</label>
            <div class="collapsible-container">
                <ul class="filtro-lista">
                    <li v-for="tipoRon in tipo_ron_list" class="filtro_item" :key="tipoRon.id">
                        <input v-model="tipo_ron" name="tipo_ron" type="radio" :value=tipoRon>
                        <label>{{ tipoRon }}</label>
                    </li>
                </ul>
            </div>
        </div>
        <div class="filtro-container filtro-clasificacion">
            <input class="collapsible-input" type="checkbox" id="clasificacion-desplegable">
            <label for="clasificacion-desplegable" class="filtro-label">Clasificacion</label>
            <div class="collapsible-container">
                <ul class="filtro-lista">
                    <li class="filtro_item">
                        <input v-model="clasificacion" name="clasificacion" type="radio" value="Industrial">
                        <label>Industrial</label>
                    </li>
                    <li class="filtro_item">
                        <input v-model="clasificacion" name="clasificacion" type="radio" value="Agricola">
                        <label>Agricola</label>
                    </li>
                </ul>
            </div>
        </div>
        <div class="filtro-container filtro-desplazables filtro-precio">
            <h2 class="filtro-titulo">Precio Max: {{ this.valorPrecioMax }}$</h2>
            <div class="slider-container">
                <input v-model="valorPrecioMax" type="range" min="10" max="1300" class="slider" step="10" />
            </div>
        </div>
        <div class="filtro-container filtro-desplazables filtro-precio">
            <h2 class="filtro-titulo">Precio Min: {{ this.valorPrecioMin }}$</h2>
            <div class="slider-container">
                <input v-model="valorPrecioMin" type="range" min="0" :max="valorPrecioMax-10" class="slider" step="10" />
            </div>
        </div>
        <div class="filtro-container filtro-desplazables filtro-anejamiento">
            <h2 class="filtro-titulo">Añejamiento : {{ this.valorAnejamiento }} años</h2>
            <div class="slider-container">
                <input v-model="valorAnejamiento" type="range" min="0" max="35" class="slider" step="1" />
            </div>
        </div>
        <div class="filtro-container filtro-desplazables filtro-grado">
            <h2 class="filtro-titulo">Grado : {{ this.valorGrado }}°</h2>
            <div class="slider-container">
                <input v-model="valorGrado" type="range" min="0" max="70" class="slider" step="10" />
            </div>
        </div>
    </div>
</template>

<script>

import { ref } from "vue";
import { getRonTipoList, getRonMarcaList } from '../helpers/getRonFiltros';

export default {
    emits: ['on-filter', 'on-unfilter'],
    data() {
        return {
            valorPrecioMax: 1300,
            valorPrecioMin: 0,
            valorAnejamiento: 0,
            valorGrado: 0,
            tipo_ron: '',
            marca: '',
            clasificacion: '',
            tipo_ron_list: [],
            marca_list: [],
        }
    },
    async mounted() {
        this.tipo_ron_list = await getRonTipoList();
        this.marca_list = await getRonMarcaList();
    },
    methods: {
        filtrar() {
            let filtros = {
                precioMax: this.valorPrecioMax !== '1300' ? this.valorPrecioMax : '',
                precioMin: this.valorPrecioMin !== '0' ? this.valorPrecioMin : '',
                anejamiento: this.valorAnejamiento !== 0 ? this.valorAnejamiento : '',
                grado: this.valorGrado !== 0 ? this.valorGrado : '',
                tipo: this.tipo_ron ? this.tipo_ron : '',
                proveedor: this.marca ? this.marca : '',
                clasificacion: this.clasificacion ? this.clasificacion : '',
            }
            console.log(filtros)
            this.$emit('on-filter', filtros)
        },
        unfilter() {
            this.valorPrecioMax = 1300;
            this.valorPrecioMin = 0;
            this.valorAnejamiento = 0;
            this.valorGrado = 0;
            this.tipo_ron = '';
            this.marca = '';
            this.clasificacion = '';
            this.$emit('on-unfilter')
        }
    },
    watch: {
        valorPrecioMax(valor) {
            if (Number.parseInt(valor) <= this.valorPrecioMin) {
                this.valorPrecioMin = this.valorPrecioMax - 10;
            }
        }
    },

}
</script>

<style scoped>
.title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-bottom: 30px;
}

.title-btn {
    padding: 0;
    background: none;
    border: none;
}

.filtros {
    padding-left: 2vw;
    padding-top: 3vh;
    width: 18vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: #000;
}

.title-container h1 {
    font-size: 36px;
    font-weight: 600;
}

.filtro-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

}

.filtro-desplazables {
    margin-bottom: 20px;
}

.filtro-titulo,
.filtro-label {

    width: 15vw;
    text-align: left;

    font-size: 24px;
    font-weight: 600;
}

.filtro-label {
    margin-bottom: 15px;
    position: relative;
    display: block;
    cursor: pointer;
    z-index: 1;
}

.collapsible-input {
    display: none;
}

.filtro-container .filtro-label:after {
    content: "+";
    position: absolute;
    right: 0;
    top: 0;
    transition: all 0.3s ease;
}

.filtro-container .collapsible-input:checked+.filtro-label:after {
    transform: rotate(45deg);
    transition: all 0.3s ease;
}

.filtro-lista {
    margin: 0;
    padding: 0;
    padding-left: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    list-style-type: none;
    width: 100%;
}

.filtro-lista li {
    display: flex;
    align-items: center;
    padding: 0;
    font-family: 'Inter', sans-serif;
    font-size: 20px;
}

.filtro-lista li input {
    margin-right: 10px;
    width: 20px;
    height: 20px;
}

.slider-container {
    display: flex;
    align-self: center;
    padding-top: 10px;
}

.collapsible-container {
    width: 100%;
    max-height: 0;
    top: -10;
    overflow: hidden;
    transition: all 0.3s ease;

}

.filtro-container .collapsible-input:checked~.collapsible-container {
    max-height: 500px;
    opacity: 1;
    top: 0;
    margin-bottom: 20px;
}




input[type="radio"] {
    accent-color: #232323;
}

input[type="range"] {
    /* removing default appearance */
    -webkit-appearance: none;
    appearance: none;
    /* creating a custom design */
    width: 13vw;
    cursor: pointer;
    outline: none;
    /*  slider progress trick  */
    overflow: hidden;
    border-radius: 16px;
}

/* Track: webkit browsers */
input[type="range"]::-webkit-slider-runnable-track {
    height: 15px;
    background: whitesmoke;
    border-radius: 16px;
}

/* Track: Mozilla Firefox */
input[type="range"]::-moz-range-track {
    height: 15px;
    background: whitesmoke;
    border-radius: 16px;
}

/* Thumb: webkit */
input[type="range"]::-webkit-slider-thumb {
    /* removing default appearance */
    -webkit-appearance: none;
    appearance: none;
    /* creating a custom design */
    height: 15px;
    width: 15px;
    background-color: #fff;
    border-radius: 50%;
    border: 2px solid #31212B;
    /*  slider progress trick  */
    box-shadow: -407px 0 0 400px #31212B;
}


/* Thumb: Firefox */
input[type="range"]::-moz-range-thumb {
    height: 15px;
    width: 15px;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid #31212B;
    /*  slider progress trick  */
    box-shadow: -407px 0 0 400px #31212B;
}
</style>