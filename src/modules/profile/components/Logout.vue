<template>
    <button class="button-18" @click="sendLogout()">Logout</button>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import Swal from 'sweetalert2'

export default {
    methods: {
        ...mapMutations('carrito', ['endCarrito']),
        ...mapActions('auth', ['logout']),
        async sendLogout() {
            new Swal({
                title: 'Espere por favor',
                allowOutsideClick: false,
            })
            Swal.showLoading()
            await this.logout()

            Swal.fire({
                title: 'Success',
                text: 'Cerró sesión con éxito',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#31212b',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$router.push({ name: 'home' });
                    this.endCarrito()
                }
            });
        }
    },
}
</script>

<style lang="scss" scoped>

.button-18 {
    align-items: center;
    background:none;
    border: 1px solid #31212B;
    border-radius: 100px;
    box-sizing: border-box;
    color: #31212B;
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
        color: #000;
        background-color: whitesmoke;
    }

    &:active {
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