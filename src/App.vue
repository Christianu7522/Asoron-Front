<template>
  <!-- <Navbar /> -->
  <router-view />
</template>

<script>
import Navbar from '@/modules/shared/components/Navbar.vue'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    Navbar
  },
  methods: {
    ...mapActions('auth', ['findUser']),
    ...mapActions('carrito', ['getCarritoCliente'])

  },
  computed: {
    ...mapState('auth', ['user'])
  },
  async created() {
    if (!this.user) {
      await this.findUser()
      if (this.user) {
        await this.getCarritoCliente()
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Inter';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

body {
  margin: 0px;

}

.container {
  margin-top: 92px;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: none;

}

::-webkit-scrollbar-thumb {
  background-color: #31212b;
  border-radius: 100px;
}
</style>
