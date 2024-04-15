<template>
    <Navbar />
    <div class="container"></div>
    <router-view />
</template>

<script>
import Navbar from '@/modules/shared/components/Navbar.vue'

export default {
    components: {
        Navbar
    },
}
</script>

<style></style>