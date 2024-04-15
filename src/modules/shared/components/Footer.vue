<template>
    <footer>
        <span class="derechos">© 2024 - Todos los derechos reservados</span>
        <div class="footer-container">
            <span>Elaborado por:</span>
            <a href="https://www.instagram.com/gustavoff7/" target=”_blank” class="Gustavo link"> Gustavo Freitas</a>
            <a href="https://www.instagram.com/sandrovalsania/" target=”_blank” class="Valsania link">Alessandro Valsania</a>
            <a href="https://www.instagram.com/christiangomesp/" target=”_blank” class="Christian link">Christian Gomes</a>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer'

}
</script>

<style scoped>
footer {
    width: 100%;
    height: 180px;
    background-color: #31212b;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 30px;
    padding-left: 30px;
}

.footer-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: #e6bd7f;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
}

.derechos {
    margin-right: auto;
    color: #e6bd7f;
    margin-left: 10px;
    font-weight: 600;
}

.link {
    color: #e6bd7f;
    margin-left: 10px;
    font-weight: 400;
}

</style>