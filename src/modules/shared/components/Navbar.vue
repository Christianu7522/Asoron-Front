<template>
    <header>
        <div class="wrapper">
            <router-link :to="{ name: 'home' }">
                <svg width="145" height="40" viewBox="0 0 508 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M86.1999 89.9999H54.8399L56.1199 79.7599L54.1999 72.0799L52.9199 70.7999L46.5199 73.9999H38.1999L31.7999 70.7999L30.5199 72.0799L28.5999 79.7599L29.8799 89.9999H0.439941L5.55994 79.7599L23.4799 8.7199L21.5599 0.399902H65.0799L63.1599 8.7199L81.0799 79.7599L86.1999 89.9999ZM49.0799 49.0399L42.9359 22.7999L42.2959 18.3199L41.6559 22.7999L35.5119 49.0399L36.5359 51.5999L39.0959 52.8799H45.4959L48.0559 51.5999L49.0799 49.0399ZM152.105 73.3599L135.465 89.9999H100.265L91.3049 81.0399L87.4649 73.3599V68.2399L107.945 57.9999V65.0399L111.785 68.8799H120.745L124.585 66.9599L126.505 63.1199V57.3599L123.305 54.1599L103.465 49.6799L91.9449 38.1599V17.0399L108.585 0.399902H143.145L151.209 24.7199L140.201 20.8799H123.305L119.465 22.7999L117.545 26.6399V29.1999L120.105 31.7599L139.945 36.2399L152.105 48.3999V73.3599ZM239.14 73.3599L222.5 89.9999H182.82L166.18 73.3599V17.0399L182.82 0.399902H222.5L239.14 17.0399V73.3599ZM213.54 61.1999V27.9199L210.98 22.7999L205.86 20.2399H199.46L194.34 22.7999L191.78 27.9199V61.1999L194.34 66.3199L199.46 68.8799H205.86L210.98 66.3199L213.54 61.1999ZM331.995 71.4399L322.395 90.6399H308.955L296.155 77.8399V61.1999L294.875 59.9199H283.995L282.715 61.1999V79.7599L285.915 89.9999H255.195L258.395 79.7599V10.6399L255.195 0.399902H310.875L327.515 17.0399V40.7199L316.635 51.5999L319.835 54.7999V64.3999L324.315 68.8799L331.995 71.4399ZM302.555 31.7599V28.5599L299.995 23.4399L294.875 20.8799H283.995L282.715 22.1599V38.1599L283.995 39.4399H294.875L299.995 36.8799L302.555 31.7599ZM415.89 73.3599L399.25 89.9999H359.57L342.93 73.3599V17.0399L359.57 0.399902H399.25L415.89 17.0399V73.3599ZM390.29 61.1999V27.9199L387.73 22.7999L382.61 20.2399H376.21L371.09 22.7999L368.53 27.9199V61.1999L371.09 66.3199L376.21 68.8799H382.61L387.73 66.3199L390.29 61.1999ZM507.465 89.9999H480.585L483.145 79.7599V77.1999L458.825 40.7199L456.265 34.3199L456.905 40.7199V79.7599L460.105 89.9999H431.945L435.145 79.7599V10.6399L431.305 0.399902H458.825L481.225 34.0639L483.785 40.0799L483.145 33.9359V10.6399L479.945 0.399902H507.465L504.265 10.6399V79.7599L507.465 89.9999Z"
                        fill="#FDD08D" />
                </svg>
            </router-link>
            <nav class="center">
                <ul>
                    <li><router-link :to="{ name: 'home' }">Inicio</router-link></li>
                    <li><router-link :to="{ name: 'catalogo' }">Catalogo</router-link></li>
                    <li><router-link :to="{ name: 'eventos-list' }">Eventos</router-link></li>
                    <li><router-link :to="{ name: 'about' }">Sobre Nosotros</router-link></li>
                </ul>
            </nav>
            <nav class="right">
                <ul>
                    <li>
                        <img class="shopping-bag pointer" src="@/modules/shared/assets/navbar/shopping-bag.svg"
                            @click="openCarrito">
                    </li>
                    <li>
                        <img class="user pointer" src="@/modules/shared/assets/navbar/user.svg" @click="profile()">
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    <Carrito v-if="isOpen" @on-close="closeCarrito">
    </Carrito>
</template>

<script>
import Carrito from '@/modules/carrito/components/Carrito'
import { mapState } from 'vuex'
export default {
    components: {
        Carrito
    },
    data() {
        return {
            isOpen: false,
        }
    },
    computed: {
        ...mapState('auth', ['user'])
    },
    methods: {
        openCarrito() {
            if (this.isOpen) {
                this.isOpen = false
            } else {
                this.isOpen = true
            }
        },
        closeCarrito() {
            this.isOpen = false
        },
        profile() {
            if (!this.user) {
                this.$router.push({ name: 'login' })
                return
            }
            if (this.user.is_staff === true) {
                this.$router.push({ name: 'empleado' })
                return
            }
            if (this.user.fk_usua_clie_natu) {
                this.$router.push({ name: 'natural' })
                return
            }
            if (this.user.fk_usua_clie_juri) {
                this.$router.push({ name: 'juridico' })
                return
            }
        }
    }
}
</script>

<style>
header {
    width: 100%;
    height: 92px;
    position: fixed;
    padding: 10px;
    background-color: #31212b;
    color: white;
    overflow: hidden;
    z-index: 999;
    top: 0;
}

.wrapper {
    max-width: 1200px;
    margin: 0 auto;
}

header .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 1em 0;
}

nav {
    float: right;
}

li {
    float: left;
    padding: 0 20px;

}



ul {
    display: block;
    list-style: none;
    gap: 1em;

}

.logo {
    float: left;
    margin: 0 10px;
    display: flex;
    width: 145px;
    height: 40px;
    position: relative;
}


li a {
    text-decoration: none;
    color: #fdd08d;
    margin: 0;
}

a.router-link-exact-active {

    font-weight: bold;
}

.user {
    color: #31212b;
}
</style>