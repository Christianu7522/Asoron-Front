<template>
    <div class="box">
        <img class="pointer" :src="ron.images[0].img_url" @click="sendToDetail()" />
        <div class="nombre">
            {{ ron.nombre }}
            <div class="precio d-flex justify-content-between"><span>${{ ron.precio }}</span></div>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        ron: {
            type: Object,
            Required: true,
        },
        clickeable: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        sendToDetail() {
            if (this.clickeable) {
                this.$router.push({
                    name: 'ron-detail',
                    params: {
                        id: this.ron.id
                    }
                })
            }
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 450px;
    width: 300px;
    padding: 30px 40px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    transition: transform 0.5s;

    &:hover {
        box-shadow: 0 0 20px rgba(253, 208, 141, 0.9);
        transform: scale(1.05);
    }
}

.nombre {
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    text-align: left;
}

.precio {
    color: #75869C;
    font-size: 14px;
    font-weight: normal;
    width: 100%;
    text-align: left;
}

img {
    height: 300px;
    width: 300px;
}
</style>