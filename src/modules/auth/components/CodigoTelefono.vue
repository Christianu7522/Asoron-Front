<template>
    <CDropdown>
        <CDropdownToggle>{{ codigoNombre }}</CDropdownToggle>
        <CDropdownMenu>
            <CDropdownItem v-for="item in codigoList" :key="item.id" @click="setTipoComercio(item)">{{ item.codigo
            }}</CDropdownItem>
        </CDropdownMenu>
    </CDropdown>
</template>

<script>

import getCodigoTelefono from '../helpers/getCodigoTelefono'

export default {
    emits: ['on-click'],
    data() {
        return {
            codigoNombre: 'Codigo',
            codigoList: [],
        }
    },
    methods: {
        async getCodigoTelefono() {
            const codigo = await getCodigoTelefono()
            this.codigoList = codigo
        },
        setTipoComercio(item) {
            this.codigoNombre = item.codigo
            this.$emit('on-click', item)
        }
    },
    mounted() {
        this.getCodigoTelefono()
    }
}


</script>


<style></style>