<template>
    <button @click="afiliacion()" class="button-18">{{ texto }}</button>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import Swal from 'sweetalert2'
import getCarnetAfiliado from '../helpers/getCarnetAfiliado'

export default {
    computed: {
        ...mapState('auth', ['user']),
        ...mapState('carrito', ['uuid', 'items']),
        texto() {
            if (this.user.data.afiliado === false) {
                return 'Afiliarse'
            } else {
                return 'Descargar Carnet'
            }
        }
    },
    methods: {
        ...mapActions('carrito', ['addAfiliadoCarrito']),
        async afiliacion() {
            if (this.revisarEnCarrito()) {
                Swal.fire({
                    position: "bottom-end",
                    title: "Ya tiene una afiliacion en el carrito",
                    background: "#0085FF",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
                return
            }
            if (this.user.data.afiliado === false) {
                Swal.fire({
                    title: 'No esta afiliado',
                    text: 'Necesita agregar una afiliacion para poder comprar',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#31212b',
                    showDenyButton: true,
                    denyButtonText: `No kelo`
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const data = {
                            carri_item_cantidad: 1,
                            carr_uuid: this.uuid,
                            fk_carri_item_afil: null
                        }
                        try {
                            await this.addAfiliadoCarrito(data)
                            Swal.fire({
                                position: "bottom-end",
                                title: "Añadido al carrito",
                                background: "#42FF00",
                                color: "#fff",
                                showConfirmButton: false,
                                timer: 1500,
                                backdrop: false
                            });
                        } catch (error) {
                            console.log(error)
                            Swal.fire({
                                position: "bottom-end",
                                title: "Error al añadir al carrito",
                                background: "#F94646",
                                color: "#fff",
                                showConfirmButton: false,
                                timer: 1500,
                                backdrop: false
                            });
                        }
                    } else if (result.isDenied) {
                        Swal.fire('No afiliado', '', 'info')
                    }
                });
            } else {
                Swal.fire({
                    position: "bottom-end",
                    title: "Descargando Carnet de Afiliación",
                    background: "#0085FF",
                    color: "#fff",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });
                const pdf = await getCarnetAfiliado()
                const url = window.URL.createObjectURL(new Blob([pdf]));
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Carnet de Asociacion.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }
        },
        revisarEnCarrito() {
            const item = this.items.find((item) => {
                console.log(item)
                if (!item.afiliado) return
                if (item.afiliado.id == 2) {
                    return item
                }
            })
            if (item) {
                return true
            } else {
                return false
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.button-18 {
    align-items: center;
    background-color: #FDD08D;
    border: 0;
    border-radius: 100px;
    box-sizing: border-box;
    color: #000;
    cursor: pointer;
    display: inline-flex;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 800;
    justify-content: center;
    line-height: 20px;
    max-width: 480px;
    min-height: 40px;
    min-width: 0px;
    overflow: hidden;
    padding: 0px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    touch-action: manipulation;
    transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s;
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
    margin-right: 20px;

    &:hover,
    :focus {
        background-color: #e6bd7f;
        color: #000;
    }

    &:active {
        background: #c09e6a;
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