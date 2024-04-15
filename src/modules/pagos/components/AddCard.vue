<template>
    <div class="cotenedor">
        <div class=" box">
            <div class="box2">
                <div class="d-flex flex-column">
                    <div class="encabezado">
                        <h1 class="titulo">Añadir tarjeta</h1>
                        <button class="cancel-btn" @click="$emit('on-close')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
                                stroke="#31212b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="feather feather-x">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <label class="left">Numero de tarjeta</label>
                    <input type="text" placeholder="1111222233334444" class="form" v-model="numero" />
                    <label class="left">CVV</label>
                    <input type="text" placeholder="123" class="form" v-model="cvv" />
                    <label class="left">Nombre en la Tarjeta</label>
                    <input type="text" placeholder="Juanito Perez" class="form" v-model="nombre" />
                    <label class="left">Fecha</label>
                    <div class="fechas-input">
                        <!-- <input type="text" placeholder="dia" class="form fecha" v-model="dia" /> -->
                        <input type="text" placeholder="mes: 01" class="form fecha" v-model="mes" />
                        <input type="text" placeholder="año: 2024" class="form fecha" v-model="anio" />
                    </div>
                    <button class="boton" @click="addCard">Añadir tarjeta</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import postTarjeta from '../helpers/postTarjeta'
import Swal from 'sweetalert2'

export default {
    emits: ['on-close'],
    data() {
        return {
            numero: '',
            cvv: '',
            nombre: '',
            dia: '01',
            mes: '',
            anio: '',
        }
    },
    methods: {
        async addCard() {
            if (!this.validar()) {
                return
            }
            const data = {
                tdc_numero_tarjeta: this.numero,
                tdc_nombre_titular: this.nombre,
                tdc_cvv: this.cvv,
                tdc_fecha_vencimiento: `${this.anio}-${this.mes}-${this.dia}`,
            }
            console.log(data)
            try {
                await postTarjeta(data)
                Swal.fire({
                    position: "bottom-end",
                    title: "Tarjeta añadida",
                    background: "#42FF00",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });

                this.$emit('on-close')
            } catch (error) {
                console.log(error)
                Swal.fire({
                    position: "bottom-end",
                    title: "Error al añadir tarjeta",
                    background: "#F94646",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
            }
        },
        validarSoloNumeros(cadena) {
            const regexNumeros = /^\d+$/;
            return regexNumeros.test(cadena);
        },
        validar() {
            if (this.numero.length !== 16) {
                Swal.fire({
                    position: "bottom-end",
                    title: "Numero de tarjeta debe tener 16 caracteres",
                    background: "#F94646",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
                return false
            }
            if (this.validarSoloNumeros(this.numero) === false) {
                Swal.fire({
                    position: "bottom-end",
                    title: "Numero de tarjeta solo pueden ser numeros",
                    background: "#F94646",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
                return false
            }
            if (this.cvv.length !== 3) {
                Swal.fire({
                    position: "bottom-end",
                    title: "CVV debe tener solo 3 numeros",
                    background: "#F94646",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
                return false
            }
            if (this.validarSoloNumeros(this.cvv) === false) {
                Swal.fire({
                    position: "bottom-end",
                    title: "CVV solo pueden ser numeros",
                    background: "#F94646",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
                return false
            }
            if (this.nombre.length === 0) {
                Swal.fire({
                    position: "bottom-end",
                    title: "Nombre invalido",
                    background: "#F94646",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
                return false
            }
            if (this.dia.length !== 2) {
                Swal.fire({
                    position: "bottom-end",
                    title: "Dia invalido",
                    background: "#F94646",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
                return false
            }
            if (this.validarSoloNumeros(this.dia) === false) {
                Swal.fire({
                    position: "bottom-end",
                    title: "Dia invalido",
                    background: "#F94646",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
                return false
            }
            if (this.mes.length !== 2) {
                Swal.fire({
                    position: "bottom-end",
                    title: "Mes invalido",
                    background: "#F94646",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
                return false
            }
            if (this.validarSoloNumeros(this.mes) === false) {
                Swal.fire({
                    position: "bottom-end",
                    title: "Mes invalido",
                    background: "#F94646",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
                return false
            }
            if (this.anio.length !== 4) {
                Swal.fire({
                    position: "bottom-end",
                    title: "Año invalido",
                    background: "#F94646",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
                return false
            }
            if (this.validarSoloNumeros(this.anio) === false) {
                Swal.fire({
                    position: "bottom-end",
                    title: "Año invalido",
                    background: "#F94646",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
            }
            return true
        },
    }
}
</script>

<style lang="scss" scoped>
.modal-background {
    position: fixed;
    padding-top: 92px;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 900;
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: flex-end;
}

.fechas-input {
    display: flex;
    justify-content: space-between;
}

.cotenedor {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
}

.box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
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

    &.fecha {
        margin: 0px 5px;
        width: 20px;
        flex-grow: 1;
    }
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
}

input {
    text-indent: 20px;
}

.encabezado {
    display: flex;
    justify-content: space-between;
}

.cancel-btn {
    background: none;
    border: none;
    padding: 0;

}
</style>