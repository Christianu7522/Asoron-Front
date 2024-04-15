<template>
    <!--* Si son pocas Paginas -->
    <div v-if="pages.totalPaginas <= 3">
        <button class="button-18" @click="$emit('on-click', 'd')" :disabled="pages.actual === 1"> <i
                class=" fa fa-arrow-left"></i></button>
        <span v-for=" i in pages.totalPaginas" :key="i.id">
            <button class=" button-18" :class="activo(i)" @click="$emit('on-click', i)" :disabled="pages.actual === i">{{ i
            }}</button>
        </span>
        <button class="button-18" @click="$emit('on-click', 'u')" :disabled="pages.actual === pages.totalPaginas"><i
                class="fa fa-arrow-right"></i></button>
    </div>

    <!--* Si son muchas Paginas pero esta en el 1  -->
    <div v-if="pages.totalPaginas > 3 && (pages.actual === 1)">
        <button class="button-18" @click="$emit('on-click', 'd')" :disabled="pages.actual === 1"> <i
                class=" fa fa-arrow-left"></i></button>
        <span v-for=" i in 3" :key="i.id">
            <button class=" button-18" :class="activo(i)" @click="$emit('on-click', i)" :disabled="pages.actual === i">{{ i
            }}</button>
        </span>
        <span v-if="pages.actual + 2 != pages.totalPaginas"><button class=" button-18 extra">...</button></span>
        <span><button class=" button-18" :class="activo(pages.totalPaginas)"
                @click="$emit('on-click', pages.totalPaginas)">{{
                    pages.totalPaginas }}</button></span>
        <button class="button-18" @click="$emit('on-click', 'u')" :disabled="pages.actual === pages.totalPaginas"><i
                class="fa fa-arrow-right"></i></button>
    </div>

    <!--* Si son muchas Paginas y esta fuera del 1 -->
    <div v-if="pages.totalPaginas > 3 && (pages.actual !== 1)">
        <button class="button-18" @click="$emit('on-click', 'd')" :disabled="pages.actual === 1"> <i
                class=" fa fa-arrow-left"></i></button>

        <span name="botonAtras"><button class=" button-18" :class="activo(1)" @click="$emit('on-click', 1)">{{ 1
        }}</button></span>

        <span name="botonPuntosIzquierda" v-if="verificacionPuntosIzquierda"><button
                class=" button-18 extra">...</button></span>

        <span name="boton1" v-if="verificacionBoton1"><button class=" button-18" :class="activo(pages.actual - 2)"
                @click="$emit('on-click', pages.actual - 2)">{{
                    pages.actual - 2 }}</button>
        </span>

        <span name="boton2" v-if="verificacionBoton2"><button class=" button-18" :class="activo(pages.actual - 1)"
                @click="$emit('on-click', pages.actual - 1)">{{
                    pages.actual - 1 }}</button>
        </span>

        <span name="botonCentral" v-if="pages.actual !== pages.totalPaginas"><button class=" button-18"
                :class="activo(pages.actual)" @click="$emit('on-click', pages.actual)">{{
                    pages.actual
                }}</button>
        </span>

        <span name="boton3" v-if="verificacionBoton3"><button class=" button-18" :class="activo(pages.actual + 1)"
                @click="$emit('on-click', pages.actual + 1)">{{
                    pages.actual + 1 }}</button>
        </span>

        <span name="boton4" v-if="verificacionBoton4"><button class=" button-18" :class="activo(pages.actual + 2)"
                @click="$emit('on-click', pages.actual + 2)">{{
                    pages.actual + 2 }}</button>
        </span>

        <span v-if="verificacionPuntosDerecha"><button class=" button-18 extra">...</button></span>

        <span><button class=" button-18" :class="activo(pages.totalPaginas)"
                @click="$emit('on-click', pages.totalPaginas)">{{
                    pages.totalPaginas }}</button>
        </span>

        <button class="button-18" @click="$emit('on-click', 'u')" :disabled="pages.actual === pages.totalPaginas"><i
                class="fa fa-arrow-right"></i></button>

    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    emits: ['on-click'],
    data() {
        return {
            activated: 'active'
        }
    },
    methods: {
        activo(num) {
            if (num === this.pages.actual) return 'active'
            else return ''
        },

    },
    computed: {
        ...mapState('catalogo', ['pages']),
        verificacionPuntosIzquierda() {
            if (this.pages.actual === 2 || this.pages.actual === 3 || this.pages.actual === 4) return false
            else return true
        },
        verificacionBoton1() {
            if (this.pages.actual === 2 || this.pages.actual === 3) return false
            else return true
        },
        verificacionBoton2() {
            if (this.pages.actual === 2) return false
            else return true
        },
        verificacionBoton3() {
            if (this.pages.actual === this.pages.totalPaginas - 1 || this.pages.actual === this.pages.totalPaginas)
                return false
            else return true
        },
        verificacionBoton4() {
            if (this.pages.actual === this.pages.totalPaginas - 2 || this.pages.actual === this.pages.totalPaginas - 1 || this.pages.actual === this.pages.totalPaginas) return false
            else return true
        },
        verificacionPuntosDerecha() {
            if (this.pages.actual === this.pages.totalPaginas - 3 || this.pages.actual === this.pages.totalPaginas - 2 || this.pages.actual === this.pages.totalPaginas - 1 || this.pages.actual === this.pages.totalPaginas) return false
            else return true
        },
    }
}
</script>

<style lang="scss" scoped>
.button-18 {
    margin: 10px;
    align-items: center;
    background-color: #fff;
    border: 1px solid #31212B;
    border-radius: 100px;
    box-sizing: border-box;
    color: #000;
    cursor: pointer;
    display: inline-flex;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: normal;
    justify-content: center;
    line-height: 20px;
    max-width: 480px;
    min-height: 60px;
    min-width: 60px;
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
        background-color: #31212B;
        color: #e6bd7f;
    }

    &:active {
        background: #48323f;
    }

    &:disabled {
        cursor: not-allowed;
        background: rgba(0, 0, 0, .08);
        color: rgba(0, 0, 0, .3);
    }

    &.active {
        background-color: #31212B;
        color: #e6bd7f;
    }

    &.extra {
        border: none;
        margin: 0;
        min-height: 60px;
        min-width: 30px;

        &:hover,
        :focus {
            background-color: #fff;
            color: #000;
            cursor: default;
        }
    }


}
</style>