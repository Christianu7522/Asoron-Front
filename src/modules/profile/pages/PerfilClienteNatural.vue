<template>
    <div v-if="isLoading"></div>

    <div class="main-container" v-else>
        <div class="encabezado">
            <div class="encabezado-upper">
                <h1>Mi perfil</h1>
                <Logout></Logout>
            </div>
            <h2 class="hola">Hola, {{ user.data.nombre }}!</h2>
        </div>
        <div class="cuerpo-container">
            <div class="left-side">
                <div class="element-container">
                    <h2>Informacion de la cuenta</h2>
                    <ul class="info element-box">
                        <li><b> Nombres:</b> <span>{{ user.data.nombre }}</span> <span>{{ user.data.segundoNombre }}</span></li>
                        <li><b>Apellidos: </b><span>{{ user.data.apellido }}</span> <span>{{ user.data.segundoApellido }}</span></li>
                        <li><b>Cedula: </b>{{ user.data.cedula }}</li>
                        <li><b>Correo Electronico:</b> {{ user.email }}</li>
                        <li><b>Rif: </b>{{ user.data.rif }}</li>
                        <li>
                            <b>Direccion:</b>
                            {{ (user.data.lugar.estado).toLocaleLowerCase() }},
                            {{ (user.data.lugar.municipio).toLocaleLowerCase() }},
                            {{ (user.data.lugar.parroquia).toLocaleLowerCase() }},
                            {{ user.data.direccion }}
                        </li>
                        <li> <b>Afiliacion: </b> <span v-if="user.data.afiliado === true">Activa</span> <span v-else>No activa</span></li>
                    </ul>
                </div>
            </div>

            <div class="right-side">
                <div class=" element-container">
                    <h2>Telefono</h2>
                    <div class="element-box spacer">
                        <ul class="telefono-list">
                            <li v-for="telefono in user.data.telefono" :key="telefono.id">{{ telefono.codigo }} - {{ telefono.telefono }}</li>
                        </ul>
                    </div>
                </div>
                <div class="element-container">
                    <h2>Compras</h2>
                    <div class="element-box spacer">
                        <p> Puede ver sus compras aqui </p>
                        <button class="button-18-mod" @click="changeShowVentas()">Ver mis Compras</button>
                        <Ventas v-if="showVentas" @on-close="changeShowVentas" />
                    </div>
                </div>
                <div class="element-container">
                    <h2>Afiliacion</h2>
                    <div class="afiliacion element-box spacer">
                        <p> Puede descargar su Carnet o Pagar su Afiliacion </p>
                        <Afiliado></Afiliado>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import Logout from '../components/Logout'
import Afiliado from '../components/Afiliado'
import Ventas from '../components/Ventas'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            showVentas: false
        }
    },
    components: {
        Logout,
        Afiliado,
        Ventas
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
    methods: {
        changeShowVentas() {
            this.showVentas = !this.showVentas
        },
    }
}
</script>

<style lang="scss" scoped>

.main-container {
    padding: 60px 126px 0 126px;
    display: flex;
    flex-direction: column;
}

.encabezado {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & h2 {
        font-size: 24px;
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        color: #000000;
    }
}

.encabezado-upper {
    display: flex;
    justify-content: space-between;
    width: 100%;

    & h1 {
        font-size: 48px;
        font-family: 'Inter', sans-serif;
        font-weight: 800;
        color: #000000;
    }
}

.cuerpo-container {
    display :flex ;
    width: 100%;
    padding-top: 63px ;
}

.left-side {
    display: flex;
    flex-direction: column;
    width: 50%;
    padding-right: 10%;
}

.element-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 43px;

    & h2 {
        font-size: 24px;
        font-family: 'Inter', sans-serif;
        font-weight: 800;
        color: #000000;
    }
}

.element-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    padding: 0;
    border-left: 8px solid #31212B;
    padding-left: 32px;
}

.info li {
    padding: 0;
    font-size: 24px;
    font-family: 'Inter', sans-serif;
    color: #000000;
}

.telefono-list {
    padding: 0;
}

.telefono-list li {
    padding: 0;
    font-size: 24px;
    font-family: 'Inter', sans-serif;
    color: #000000;
}

.right-side {
    display: flex;
    flex-direction: column;
    width: 50%;
    padding-left: 100px;
}


.spacer {
    min-height: 100px;
    justify-content: center;
    font-size: 24px;
    font-family: 'Inter', sans-serif;
    color: #000000;
}

.button-18-mod {
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
    min-width: 0;
    overflow: hidden;
    padding: 0px;
    padding-left: 30px;
    padding-right: 30px;
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
</style>