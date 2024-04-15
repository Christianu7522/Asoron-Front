<template>
    <div class="cotenedor">
        <div class="box">
            <img src="../assets/Logo.svg" class="my-4" />
            <div class="box2">
                <div class="d-flex flex-column">
                    <p class="titulo">Iniciar Sesion</p>
                    <input type="text" placeholder="Nombre de Usuario" class="form" v-model="username" />
                    <input type="password" placeholder="Contraseña" class="form" @keypress.enter="sendLogin"
                        v-model="password" />
                    <button class="boton" @click="sendLogin">Inicar Sesion</button>
                    <p class="left">Nuevo en Asoron? <router-link :to="{ name: 'register' }">Crear una cuenta</router-link>
                    </p>
                    <p class="left">Se olvidó de su contraseña? <span class="link" @click="submitCorreo()">Click
                            Aqui!</span></p>
                </div>
            </div>
        </div>
    </div>
    <back-to-home />
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Swal from 'sweetalert2'
import BackToHome from '../components/BackToHome.vue'
import api from '@/lib/api'

export default {
    components: {
        BackToHome
    },
    data() {
        return {
            username: '',
            password: ''
        }
    },
    computed: {
        ...mapState('auth', ['user'])
    },
    methods: {
        ...mapActions('auth', ['login']),
        ...mapActions('carrito', ['getCarritoCliente']),
        async sendLogin() {
            console.log(this.username, this.password)
            new Swal({
                title: 'Espere por favor',
                allowOutsideClick: false,
            })
            Swal.showLoading()
            try {
                await this.login({ username: this.username, password: this.password })
                await this.getCarritoCliente()
                Swal.fire('Success', 'Inicio Sesion con exito', 'success').then((result) => {
                    if (result.isConfirmed) {
                        this.$router.push({ name: 'home' });
                    }
                });
            } catch (error) {
                Swal.fire('Error', 'Sesion no encontrada', 'error', this.username = '', this.password = '')
            }
        },
        submitCorreo() {
            Swal.fire({
                title: "Escriba el correo asociado a su cuenta",
                input: "text",
                inputAttributes: {
                    autocapitalize: "off"
                },
                showCancelButton: true,
                confirmButtonText: "Enviar",
                showLoaderOnConfirm: true,
                confirmButtonColor: "#31212b",
                preConfirm: async (login) => {
                    const dataToSave = {
                        email: login
                    }
                    try {
                        const { data } = await api.post('/auth/users/reset_password/', dataToSave)
                        return data;
                    } catch (error) {
                        Swal.showValidationMessage(`Correo no encontrado`);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: `Correo Enviado`,
                        imageUrl: 'Revise su correo y siga los pasos'
                    });
                }
            });
        }
    },
}
</script>

<style lang="scss" scoped>
.cotenedor {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 120px;
    border-radius: 50px;
    justify-content: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.box2 {
    align-items: center;
    width: 470px;
    justify-content: center;
}

img {
    width: 260px;
    height: 60px;
}

.titulo {
    font-weight: bold;
    text-align: left;
    font-size: 48px;
    color: #31212B;
}

.form {
    margin-top: 12px;
    margin-bottom: 12px;
    height: 56px;
    border: 2px solid;
    border-color: lightgray;
    border-radius: 16px;
}

.boton {
    border: 2px solid;
    background-color: #31212B;
    color: white;
    height: 56px;
    border-radius: 32px;
    margin-top: 6px;
    margin-bottom: 6px;

    &:hover {
        background-color: #46303d;
    }
}

.left {
    text-align: left;
    margin-bottom: 0;
    margin-top: 5px;
}

.link {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
    margin-top: 0px;
}

input {
    text-indent: 20px;
}
</style>