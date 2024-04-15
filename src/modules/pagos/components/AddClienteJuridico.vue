<template>
    <div class="cuadro">
        <!-- <img src="../assets/Logo.svg" class="my-4" /> -->
        <div class="box">
            <div class="encabezado">
                <h1 class="titulo">Crear cuenta</h1>
                <button class="cancel-btn" @click="deleteItem">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
                        stroke="#31212b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-x" @click="$emit('on-close')">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="box2">
                <div class="d-flex flex-column">
                    <div class="form-box">
                        <p>Username</p>
                        <input type="text" placeholder="Username" class="form" v-model="username" />
                    </div>
                    <div class="form-box">
                        <p>Correo Electronico</p>
                        <input type="text" placeholder="micorreo@gmail.com" class="form" v-model="email" />
                    </div>
                    <div class="form-box">
                        <p>RIF Juridico</p>
                        <input type="text" placeholder="2222666" class="form" v-model="rif" />
                    </div>
                    <div class="form-box">
                        <p>Denominacion Comercial</p>
                        <input type="text" placeholder="Deco muebles" class="form" v-model="denominacionComercial" />
                    </div>
                    <div class="form-box">
                        <p>Razon Social</p>
                        <input type="text" placeholder="Deco muebles C.A" class="form" v-model="razonSocial" />
                    </div>
                    <div class="form-box">
                        <p>Pagina Web</p>
                        <input type="text" placeholder="tupagina.com" class="form" v-model="paginaWeb" />
                    </div>
                    <div class="form-box">
                        <p>Capital Disponible (en dolares)</p>
                        <input type="text" placeholder="8556" class="form" v-model="capitalDisponible" />
                    </div>
                    <div class="form-box">
                        <p>Direccion Fiscal</p>
                        <input type="text" placeholder="Calle locura, Apt 3" class="form" v-model="direccionFiscal" />
                        <Lugar @on-click="setParroquiaFiscal"></Lugar>
                    </div>
                    <div class="form-box">
                        <p>Direccion Fisica</p>
                        <input type="text" placeholder="Calle locura, Apt 3" class="form" v-model="direccionFisica" />
                        <Lugar @on-click="setParroquiaFisica"></Lugar>
                    </div>
                    <div class="form-box">
                        <p>Tipo de Comercio</p>
                        <TipoComercio @on-click="setTipoComercio"></TipoComercio>
                    </div>
                    <div class="form-box">
                        <p>Telefono</p>
                        <div class="form-telefono">
                            <CodigoTelefono @on-click="setCodigoTelefono"></CodigoTelefono>
                            <input type="text" placeholder="1234567" class="form" v-model="telefono" />
                        </div>
                    </div>
                    <button class="boton" @click="registrarse()">Registrarse</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CodigoTelefono from '@/modules/auth/components/CodigoTelefono';
import Lugar from '@/modules/auth/components/Lugar'
import TipoComercio from '@/modules/auth/components/TipoComercio';
import Swal from 'sweetalert2';
import postClienteJuridico from '../helpers/postClienteJuridico'

export default {
    emits: ['on-register', 'on-close'],
    components: {
        Lugar,
        CodigoTelefono,
        TipoComercio
    },
    data() {
        return {
            // Datos de la cuenta
            username: '',
            email: '',
            rif: '',
            denominacionComercial: '',
            razonSocial: '',
            paginaWeb: '',
            capitalDisponible: '',
            direccionFisica: '',
            direccionFiscal: '',
            tipoComercio: '',
            parroquiaFisica: '',
            parroquiaFiscal: '',
            codigoTelefono: '',
            telefono: ''
        }
    },
    methods: {
        setCodigoTelefono(item) {
            this.codigoTelefono = item.id
        },
        setTipoComercio(item) {
            this.tipoComercio = item.id
        },
        setParroquiaFisica(item) {
            this.parroquiaFisica = item
        },
        setParroquiaFiscal(item) {
            this.parroquiaFiscal = item
        },

        // Validacion
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
            if (this.email === '') {
                alert('Debe ingresar un correo electronico')
                return false
            }
            if (!this.validarCorreoElectronico(this.email)) {
                alert('Debe ingresar un correo electronico valido')
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
            if (this.rif.length < 8) {
                alert('El rif debe tener al menos 8 caracteres')
                return false
            }
            if (this.rif.length > 9) {
                alert('El rif debe tener como maximo 9 caracteres')
                return false
            }
            if (this.denominacionComercial === '') {
                alert('Debe ingresar una denominacion comercial')
                return false
            }
            if (this.razonSocial === '') {
                alert('Debe ingresar una razon social')
                return false
            }
            if (this.paginaWeb === '') {
                alert('Debe ingresar una pagina web')
                return false
            }
            if (this.capitalDisponible === '') {
                alert('Debe ingresar un capital disponible')
                return false
            }
            if (!this.validarSoloNumeros(this.capitalDisponible)) {
                alert('El capital disponible debe contener solo numeros')
                return false
            }
            if (this.direccionFisica === '') {
                alert('Debe ingresar una direccion fisica')
                return false
            }
            if (this.parroquiaFisica === '') {
                alert('Debe ingresar una parroquia fisica')
                return false
            }
            if (this.direccionFiscal === '') {
                alert('Debe ingresar una direccion fiscal')
                return false
            }
            if (this.parroquiaFiscal === '') {
                alert('Debe ingresar una parroquia fiscal')
                return false
            }
            if (this.tipoComercio === '') {
                alert('Debe ingresar un tipo de comercio')
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
                email: this.email,
                clie_juri_rif: this.rif,
                clie_juri_denominacion_comercial: this.denominacionComercial,
                clie_juri_razon_social: this.razonSocial,
                clie_juri_pagina_web: this.paginaWeb,
                clie_juri_capital_disponible: this.capitalDisponible,
                clie_juri_direccion_fisica: this.direccionFisica,
                clie_juri_direccion_fiscal: this.direccionFiscal,
                fk_clie_juri_tipo_come: this.tipoComercio,
                fk_clie_juri_lugar_fisica: this.parroquiaFisica,
                fk_clie_juri_lugar_fiscal: this.parroquiaFiscal,
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
                const info = await postClienteJuridico(data, false)
                Swal.fire('Success', 'Registrado con exito', 'success').then((result) => {
                    if (result.isConfirmed) {
                        this.$emit('on-register', info)
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
.cuadro {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 850px;
    transform: translate(-50%, -50%);
    background-color: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    padding: 50px 120px;
    border-radius: 50px;
    margin: 20px;
    width: 800px;
    z-index: 99;
}

.box {
    display: flex;
    flex-direction: column;
    align-items: center;

    overflow-y: scroll;
    max-height: 750px;
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

.boton {
    border: 2px solid;
    background-color: #31212B;
    color: white;
    height: 56px;
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

input {
    text-indent: 20px;
}

.boxBotones {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.selectedNatural {
    border: 2px solid #FDD08D;
}

.selectedJuridico {
    border: 2px solid #FDD08D;
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

.form-telefono {
    display: flex;
    justify-content: space-between;
}

.encabezado {
    display: flex;
    width: 100%;
}

.cancel-btn {
    background: none;
    border: none;
    padding: 0;
    margin-right: 30px;
    margin-left: auto;

}
</style>