<template>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap" rel="stylesheet">
    <router-link :to="{ name: 'evento-detail', params: { id: evento.id } }" class="cuadro d-flex tarjeta">

        <!-- <img :src="evento.images[0].url"> -->

        <!-- aqui -->

        <div v-if="evento.images[0]" class="test-image" :style="{ backgroundImage: `url(${evento.images[0].url})`}"></div>
        
        <!-- ESTE ES EL AUTOGENERADO DE IMAGEN DE EVENTO -->
        
        <div v-else class="test-random-image">
            <h1> {{ "EVENTO " + evento.nombre.toUpperCase() }} </h1>
        </div>

        <!-- termina aqui -->

        <div class="d-flex flex-column mx-3 my-2 tarjeta-right">
            <h1>{{ evento.nombre.toUpperCase() }}</h1>
            <div class="content">
                <p>{{ evento.descripcion }}</p>
                <!-- <span>Direccion: {{ evento.direccion }}</span>
                    <h4>{{ evento.fechaIni }} - {{ evento.fechaFin }}</h4> -->
            </div>
            <button class="button-18">RESERVAR</button>

            <div class="content-extra">
                <span>{{ evento.direccion }}</span>
                <h4>{{ evento.fechaInicio }} - {{ evento.fechaFin }}</h4>
            </div>
        </div>

    </router-link>
</template>

<script>
export default {
    props: {
        evento: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped >
.cuadro {
    text-align: left;
    line-height: 100%;
    width: 1080px;
    height: 480px;
}

img {
    width: 480px;
}

// aqui

.test-image {
    width: 480px;
    height: 480px;
    background-size: cover;
    background-position: center;
}

.test-random-image {
    width: 480px;
    height: 480px;
    background: rgb(2,0,36);
    background: linear-gradient(137deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
}

.test-random-image h1 {
    color: #fff;
    font-family: 'Brothers', sans-serif;
    font-weight: 800;
    text-align: center;
    
}

// termina aqui

.tarjeta {
    background-color: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    margin: 10px;
    text-decoration: none;
    color: black;
    transition: transform 0.5s;
}

.tarjeta:hover {
    transform: scale(1.05);
}

.tarjeta-right {
    justify-content: center;
    align-content: center;
    align-items: center;
    
}

.tarjeta-right h1 {
    color: #31212b;
    font-family: 'Brothers', sans-serif;
    font-weight: 800;
    text-align: center;
    margin-top: auto;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin: 30px;
}

.content p {
    font-family: Inter;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    padding: 0 1px;
    width: 508px;
}

.content-extra {
    color: gray;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-content: left;
    width: 100%;
}

.content-extra h4 {
    font-family: Inter;
    font-size: 12px;
    font-weight: 200;

    margin-bottom: 8px;
    width: 70%
}

.content-extra span {
    font-size: 14px;
    font-family: Inter;
    font-weight: 400;
    margin-bottom: 2px;
    width: 50%;
}

.tarjeta-right button {
    width: 120px;
    margin-top: 10px;
    margin-bottom: auto;
}

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

    &:hover,
    &:focus {
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
}
</style>