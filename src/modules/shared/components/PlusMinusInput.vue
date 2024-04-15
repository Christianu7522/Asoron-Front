<template>
    <div class="cantidad-container">
        <button @click="decrease" class="cantidad-button minus"><span>-</span></button>
        <input v-model="cantidad" type="number">
        <button @click="increase" class="cantidad-button plus"><span>+</span></button>
    </div>
</template>

<script>
export default {
    name: 'PlusMinusInput',
    emits: ['update:modelValue'],
    props: {
        Max: { // Valor máximo que puede tener el input
            type: Number,
            required: true,
            default: 100
        },
        inicial: { // Valor inicial del input
            type: Number,
            required: false,
            default: 1
        }
    },
    data() {
        return {
            cantidad: this.inicial,
        }
    },
    methods: {
        increase() {
            if (this.cantidad < this.Max)
                this.cantidad++
        },
        decrease() {
            if (this.cantidad > 1) {
                this.cantidad--
            }
        },
    },
    watch: {
        cantidad(val) { // Si el valor es mayor al máximo, se establece el máximo, si es menor a 1, se establece 1
            if (val > this.Max) {
                this.cantidad = this.Max
            } else if (val < 1) {
                this.cantidad = 1
            }
            this.$emit('update:modelValue', this.cantidad) // Emite el valor actualizado
        }
    }

}
</script>

<style scoped>
.cantidad-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border: #E3E5ED 1px solid;
    width: 150px;
    height: 40px;
    border-radius: 24px;
}

.cantidad-container input {
    border: 0px;
    width: 50px;
    border: #E3E5ED 1px solid;
    height: 40px;
    text-align: center;
}

.cantidad-container input[type=number]::-webkit-inner-spin-button,
.cantidad-container input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.cantidad-button {
    border: 0px;
    width: 50px;
    padding: 0;
    padding-bottom: 3px;
    font-size: 24px;
    color: #7c7c7c;
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    background-color: transparent;
    transition: background-color 0.167s, color 0.167s;
}

.cantidad-button:hover {
    background-color: #E3E5ED;
    color: #000;
}

.plus {
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
}

.minus {
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
}
</style>