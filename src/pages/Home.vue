<template>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap" rel="stylesheet">
    <Navbar />

    <div class="banner">
        <div>
            <button id="banner-button" class="button-18" @click="goToSpaySide()">COMPRAR</button>
        </div>
    </div>
    <div id="spacer">
        <h1>ASORON, LO MEJOR EN RON</h1>
    </div>
    <div id="diario-ronero">
        <h1 class="diario-ronero-text">Disponible Ya! <br /> el <span style="color:#FDD08D">DiarioRonero</span> </h1>
        <button id="diario-ronero-button" class="button-18" @click="getDiario()">Click aqui</button>
    </div>
    <div id="catalog-wrapper">
        <h1 class="titulo-catalogo d-flex">Los Rones Mas Exquisitos</h1>
        <div class="mini-catalog">
            <div v-if="isLoading">
                <div class="wait-text alert-info text-center mt-5">
                    Espere por favor
                    <h3 class="mt-2">
                        <i class="fa fa-spin fa-sync"></i>
                    </h3>
                </div>
            </div>
            <div v-else>
                <div class="d-flex">
                    <li v-for="ron in rones" :key="ron.id">
                        <RonMinimal :ron="ron" />
                    </li>
                </div>
            </div>
        </div>
        <router-link :to="{ name: 'catalogo' }"><button class="button-18 catalogo">VER MAS</button></router-link>
    </div>
    <Footer/>
</template>

<script>

import Navbar from '@/modules/shared/components/Navbar.vue'
import Footer from '@/modules/shared/components/Footer.vue'
import RonMinimal from '@/modules/catalogo/components/RonMinimal'
import getRones from '@/modules/catalogo/helpers/getRonesHome'
import { mapMutations, mapState } from 'vuex'

export default {
    components: {
        Navbar,
        Footer,
        RonMinimal
    },
    data() {
        return {
            isLoading: true,
            rones: []
        }
    },
    methods: {
        ...mapMutations('catalogo', ['setBusqueda']),
        goToSpaySide() {
            this.setBusqueda('Santa Teresa 1796 Speyside')
            this.$router.push({
                name: 'catalogo'
            })
        },
        getDiario() {
            this.$router.push({
                name: 'diario-ronero'
            })
        }
    },
    async created() {
        this.rones = await getRones()
        this.isLoading = false
    }
}
</script>

<style lang="scss" scoped>
.banner {
    margin-top: 92px;
    overflow-x: hidden;
    width: 100%;
    height: 100vh;
    background-image: url(@/assets/banner_text.jpg);
    background-size: cover;
    background-position: center;
    display: flex;
    background-color: #c9c9c9;
}

.banner div {
    width: 50%;
    float: right;
    margin-left: auto;
    position: relative;
    text-align: end;

}

#banner-button {
    position: absolute;
    width: 284px;
    height: 82px;
    margin: 0;
    top: 70%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    text-align: center;
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
    font-size: 32px;
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

#spacer {
    position: relative;
    width: 100%;
    height: 169px;

    & h1 {
        position: absolute;
        font-family: 'Brothers', sans-serif;
        color: #000;
        text-align: center;
        font-weight: 800;
        margin: 0;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
}

#diario-ronero {
    display: flex;
    position: relative;
    width: 100%;
    height: 545px;
    background-color: #31212b;
    justify-content: space-around;
    align-items: center;
}

.diario-ronero-text {
    position: relative;
    color: #fff;
    font-family: 'Inter', sans-serif;
    text-align: center;
    font-size: 96px;
    font-weight: 800;
    margin: 0;
}

#diario-ronero-button {
    position: relative;
    width: 402px;
    height: 116px;
    margin: 0;
    text-align: center;
    font-size: 48px;

}

#catalog-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;
    height: 820px;
    background-color: #fff;
    padding: 82px;
}

.wait-text {
    font-family: 'Inter', sans-serif;
    font-size: 32px;
}

.titulo-catalogo {
    font-family: 'Brothers', sans-serif;
    color: #31212b;
    font-weight: bold;
    width: 1185px;
    text-align: left
}

li {
    list-style: none;
}

footer {
    position: relative;
    width: 100%;
    height: 241px;
    background-color: #31212b;
}
</style>