<template>
    <CDropdown>
        <CDropdownToggle>{{ estadoNombre }}</CDropdownToggle>
        <CDropdownMenu>
            <CDropdownItem v-for="item in estado" :key="item.id" @click="getMunicipio(item)">{{ item.lugar_nombre
            }}</CDropdownItem>
        </CDropdownMenu>
    </CDropdown>
    <CDropdown>
        <CDropdownToggle>{{ municipioNombre }}</CDropdownToggle>
        <CDropdownMenu>
            <CDropdownItem v-if="municipio.length === 0">Seleccione un estado primero</CDropdownItem>
            <CDropdownItem v-else v-for="item in municipio" :key="item.id" @click="getParroquia(item)">
                {{ item.lugar_nombre }}</CDropdownItem>
        </CDropdownMenu>
    </CDropdown>
    <CDropdown>
        <CDropdownToggle>{{ parroquiaNombre }}</CDropdownToggle>
        <CDropdownMenu>
            <CDropdownItem v-if="parroquia.length === 0">Seleccione un municipio primero</CDropdownItem>
            <CDropdownItem v-else v-for="item in parroquia" :key="item.id" @click="setParroquia(item)">
                {{ item.lugar_nombre }}</CDropdownItem>
        </CDropdownMenu>
    </CDropdown>
</template>

<script>

import { getLugarEstado, getLugarMunicipio, getLugarParroquia } from '../helpers/getLugar'

export default {
    emits: ['on-click'],
    data() {
        return {
            estadoNombre: 'Estado',
            municipioNombre: 'Municipio',
            parroquiaNombre: 'Parroquia',
            estado: [],
            municipio: [],
            parroquia: []
        }
    },
    methods: {
        async getEstado() {
            const estado = await getLugarEstado()
            this.estado = estado
        },
        async getMunicipio(item) {
            this.municipio = []
            this.estadoNombre = item.lugar_nombre
            this.municipioNombre = 'Municipio'
            this.parroquiaNombre = 'Parroquia'
            this.$emit('on-click', '')

            const municipio = await getLugarMunicipio(item.lugar_id)
            this.municipio = municipio
        },
        async getParroquia(item) {
            this.parroquia = []
            this.municipioNombre = item.lugar_nombre
            this.parroquiaNombre = 'Parroquia'
            this.$emit('on-click', '')
            const parroquia = await getLugarParroquia(item.lugar_id)
            this.parroquia = parroquia
        },
        setParroquia(item) {
            this.parroquiaNombre = item.lugar_nombre
            this.$emit('on-click', item.lugar_id)
        }
    },
    mounted() {
        this.getEstado()
    }
}


</script>

<style></style>