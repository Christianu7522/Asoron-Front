<template>
    <CDropdown style="width: 100%">
        <CDropdownToggle>{{ titulo }}</CDropdownToggle>
        <CDropdownMenu>
            <CDropdownItem v-if="ofertaList.length === 0">No hay descuentos para esta botella</CDropdownItem>
            <CDropdownItem v-else v-for="item in ofertaList" :key="item.id" @click="cambiarOferta(item)">
                {{ item.descuento }}% de descuento</CDropdownItem>
            <CDropdownItem @click="quitarOferta()">Quitar oferta</CDropdownItem>
        </CDropdownMenu>
    </CDropdown>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    emits: ['on-cambiarOferta', 'on-quitarOferta'],
    props: {
        ofertaList: {
            type: Array,
            required: true
        },
        oferta: {
            required: true
        },
        selected: {
            type: Boolean,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data() {
        return {

        }
    },
    computed: {
        titulo() {
            if (this.selected) {
                return this.oferta.nombre
            } else {
                return 'Oferta'
            }
        }
    },
    methods: {
        ...mapMutations('carrito', ['agregarOfertaCarrito', 'quitarOfertaCarrito']),
        cambiarOferta(item) {
            this.agregarOfertaCarrito({ index: this.index, oferta: item })
            this.$emit('on-cambiarOferta', item)
        },
        quitarOferta() {
            this.quitarOfertaCarrito(this.index)
            this.$emit('on-quitarOferta')
        }
    }
}
</script>

<style></style>