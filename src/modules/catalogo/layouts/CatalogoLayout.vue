<template>
    <Navbar />
    <router-view />
    <Footer/>
    
</template>

<script>

import { mapActions, mapState } from 'vuex'
import Navbar from '@/modules/shared/components/Navbar.vue'
import Footer from '@/modules/shared/components/Footer.vue'

export default {
    components: {
        Navbar,
        Footer
    },
    methods: {
        ...mapActions('catalogo', ['cargarRones']),
        ...mapActions('auth', ['findUser'])
    },
    async created() {
        this.cargarRones()
    }
}
</script>

<style>

</style>