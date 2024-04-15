<template>
    <Navbar />
    <router-view />
    <Footer />
</template>

<script>

import Navbar from '@/modules/shared/components/Navbar.vue'
import Footer from '@/modules/shared/components/Footer.vue'
import { mapState, mapActions } from 'vuex';

export default {
    components: {
        Navbar,
        Footer
    },
    methods: {
        ...mapActions('eventos', ['cargarEventos']),
    },
    created() {
        this.cargarEventos()
    }
}
</script>

<style>

</style>