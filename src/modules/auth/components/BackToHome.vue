<template>
    <div class="button-container">
        <button class="button-18-custom" @click="backToHome()"><i class="fa fa-arrow-left"></i> <span>Ir a home</span></button>
    </div>
</template>

<script>
export default {
    methods: {
        backToHome() {
            this.$router.push({ name: 'home' })
        }
    }
}
</script>

<style lang="scss" scoped>
.button-container {
    position: fixed;
    left: 20px;
    bottom: 20px;
}

.button-18-custom {
    align-items: center;
    background: none;
    border: 0;
    border-radius: 100px;
    box-sizing: border-box;
    color: #31212b;
    cursor: pointer;
    display: absolute;
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

    &.catalogo {
        font-family: 'Inter', 'sans-serif';
        font-size: 16px;
        font-weight: 800;
    }

    &:hover,
    :focus {
        background-color:whitesmoke;
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
}
</style>