<template>
    <CDropdown>
        <CDropdownToggle>{{ tipoNombre }}</CDropdownToggle>
        <CDropdownMenu>
            <CDropdownItem v-for="item in tipoComercioList" :key="item.id" @click="setTipoComercio(item)">{{ item.nombre
            }}</CDropdownItem>
        </CDropdownMenu>
    </CDropdown>
</template>

<script>

import getTipoComercio from '../helpers/getTipoComercio'

export default {
    emits: ['on-click'],
    data() {
        return {
            tipoNombre: 'Tipo de Comercio',
            tipoComercioList: [],
        }
    },
    methods: {
        async getTipoComercio() {
            const tipoComercio = await getTipoComercio()
            this.tipoComercioList = tipoComercio
        },
        setTipoComercio(item) {
            this.tipoNombre = item.nombre
            this.$emit('on-click', item)
        }
    },
    mounted() {
        this.getTipoComercio()
    }
}


</script>

<style scoped>
.btn-group {
    width: 100%;
    border: 1px;
    border: 2px solid;
    border-color: lightgray;
    border-radius: 16px;
    height: 56px;

}

.dropdown-menu {
    text-align: center;
    width: 100%;
}
</style>