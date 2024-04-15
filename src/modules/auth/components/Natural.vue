<template>
    <div>Enter Cliente Natural</div>

    <div class="d-flex flex-column">
        <div class="form-box">
            <p>Username</p>
            <input type="text" placeholder="Username" class="form" v-model="username" />
        </div>
        <div class="form-box">
            <p>Contraseña</p>
            <input type="text" placeholder="Contraseña" class="form" v-model="password" />
        </div>
        <div class="form-box">
            <p>Correo Electronico</p>
            <input type="text" placeholder="micorreo@gmail.com" class="form" v-model="email" />
        </div>
        <div class="form-box">
            <p>Cedula de Identidad</p>
            <input type="text" placeholder="2222226" class="form" v-model="cedula" />
        </div>
        <div class="form-box">
            <p>RIF Personal</p>
            <input type="text" placeholder="2222666-1" class="form" v-model="rif" />
        </div>
        <div class="form-box">
            <p>Nombre</p>
            <input type="text" placeholder="Nombre" class="form" v-model="nombre" />
        </div>
        <div class="form-box">
            <p>Segundo Nombre</p>
            <input type="text" placeholder="Nombre" class="form" v-model="segundoNombre" />
        </div>
        <div class="form-box">
            <p>Apellido</p>
            <input type="text" placeholder="Apellidos" class="form" v-model="apellido" />
        </div>
        <div class="form-box">
            <p>Segundo Apellido</p>
            <input type="text" placeholder="Apellidos" class="form" v-model="segundoApellido" />
        </div>
        <div class="form-box">
            <p>Direccion</p>
            <input type="text" placeholder="Calle locura, Apt 3" class="form" v-model="direccion" />
            <Lugar @on-click="setParroquia"></Lugar>
        </div>
        <div class="form-box">
            <p>Telefono</p>
            <div class="form-telefono">
                <CodigoTelefono @on-click="setCodigoTelefono"></CodigoTelefono>
                <input type="text" placeholder="1234567" class="form" v-model="telefono" />
            </div>
        </div>
        <button class="boton" @click="registrarse">Registrarse</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

import CodigoTelefono from './CodigoTelefono';
import Lugar from './Lugar.vue'
import Swal from 'sweetalert2'

export default {
    components: {
        Lugar,
        CodigoTelefono
    },
    data() {
        return {
            username: '',
            password: '',
            email: '',
            cedula: '',
            rif: '',
            nombre: '',
            segundoNombre: '',
            apellido: '',
            segundoApellido: '',
            direccion: '',
            parroquia: '',
            codigoTelefono: '',
            telefono: ''
        }
    },
    methods: {
        ...mapActions('auth', ['registerClienteNatural']),
        ...mapActions('carrito', ['getCarritoCliente']),
        setParroquia(item) {
            this.parroquia = item
        },
        setCodigoTelefono(item) {
            this.codigoTelefono = item.id
        },
        validateNumericCharacters(password) {
            const numericRegex = /\d/;
            return numericRegex.test(password);
        },
        validarCorreoElectronico(correo) {
            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            return regexCorreo.test(correo);
        },
        validarSoloNumeros(cadena) {
            const regexNumeros = /^\d+$/;
            return regexNumeros.test(cadena);
        },
        validar() {
            // USERNAME
            if (this.username === '') {
                alert('Debe ingresar un username')
                return false
            }
            if (this.username.length < 6) {
                alert('El username debe tener al menos 6 caracteres')
                return false
            }
            if (this.password === '') {
                alert('Debe ingresar una contraseña')
                return false
            }
            if (this.password.length < 9) {
                alert('La contraseña debe tener al menos 9 caracteres')
                return false
            }
            if (!this.validateNumericCharacters(this.password)) {
                alert('La contraseña debe tener al menos un caracter numerico')
                return false
            }
            if (this.email === '') {
                alert('Debe ingresar un correo electronico')
                return false
            }
            if (!this.validarCorreoElectronico(this.email)) {
                alert('Debe ingresar un correo electronico valido')
                return false
            }
            if (this.cedula === '') {
                alert('Debe ingresar una cedula de identidad')
                return false
            }
            if (!this.validarSoloNumeros(this.cedula)) {
                alert('La cedula de identidad debe contener solo numeros')
                return false
            }
            if (this.cedula.length < 7) {
                alert('La cedula de identidad debe tener al menos 7 caracteres')
                return false
            }
            if (this.cedula.length > 9) {
                alert('La cedula de identidad debe tener como maximo 8 caracteres')
                return false
            }
            if (this.rif === '') {
                alert('Debe ingresar un RIF')
                return false
            }
            if (!this.validarSoloNumeros(this.rif)) {
                alert('El rif debe contener solo numeros')
                return false
            }
            if (this.rif.length < 7) {
                alert('El rif debe tener al menos 7 caracteres')
                return false
            }
            if (this.rif.length > 10) {
                alert('El rif debe tener como maximo 10 caracteres')
                return false
            }
            if (this.nombre === '') {
                alert('Debe ingresar un nombre')
                return false
            }
            if (this.apellido === '') {
                alert('Debe ingresar un apellido')
                return false
            }
            if (this.direccion === '') {
                alert('Debe ingresar una direccion')
                return false
            }
            if (this.parroquia === '') {
                alert('Debe ingresar una parroquia')
                return false
            }
            if (this.codigoTelefono === '') {
                alert('Debe ingresar un codigo de telefono')
                return false
            }
            if (this.telefono === '') {
                alert('Debe ingresar un telefono')
                return false
            }
            if (!this.validarSoloNumeros(this.telefono)) {
                alert('El telefono debe contener solo numeros')
                return false
            }
            return true
        },
        async registrarse() {
            if (!this.validar()) return
            const data = {
                username: this.username,
                password: this.password,
                email: this.email,
                clie_natu_cedula_identidad: this.cedula,
                clie_natu_rif: this.rif,
                clie_natu_nombre: this.nombre,
                clie_natu_segundo_nombre: this.segundoNombre,
                clie_natu_apellido: this.apellido,
                clie_natu_segundo_apellido: this.segundoApellido,
                clie_natu_direccion_habitacion: this.direccion,
                fk_clie_natu_lugar: this.parroquia,
                codigo_telefono: this.codigoTelefono,
                telefono: this.telefono
            }
            console.log(data)
            new Swal({
                title: 'Espere por favor',
                allowOutsideClick: false,
            })
            Swal.showLoading()
            try {
                await this.registerClienteNatural(data)
                await this.getCarritoCliente()
                Swal.fire('Success', 'Registrado con exito', 'success').then((result) => {
                    if (result.isConfirmed) {
                        this.$router.push({ name: 'home' });
                    }
                });
            } catch (error) {
                console.log({ error })
                Swal.fire('Error', `Problemas al registrar: ${error.response.data.error}`, 'error')
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.form-telefono {
    display: flex;
    justify-content: space-between;

}

.boton {
    border: 2px solid;
    background-color: #31212B;
    color: white;
    height: 56px;
    width: 100%;
    border-radius: 32px;
    margin-top: 6px;
    margin-bottom: 6px;

    &.select {
        width: 200px;
    }

    &:hover {
        background-color: #46303d;
    }
}

p {
    margin-bottom: 0;
    font-size: 18px;
    font-weight: bold;
    color: #31212B;

}

img {
    width: 260px;
    height: 60px;
}

.form-box {
    margin-top: 12px;
    margin-bottom: 12px;
    text-align: left;
}

.form {
    width: 100%;
    height: 56px;
    border: 2px solid;
    border-color: lightgray;
    border-radius: 16px;
}

input {
    text-indent: 20px;
}
</style>