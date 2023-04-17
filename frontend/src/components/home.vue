<template>
    <div class="panels">
        <div class="panel panel1">
            <p></p>
            <p>Life is</p>
            <p></p>
        </div>

        <div class="panel panel2">
            <p></p>
            <p>better</p>
            <p></p>
        </div>

        <div class="panel panel3">
            <p></p>
            <p>on</p>
            <p></p>
        </div>

        <div class="panel panel4">
            <p></p>
            <p>bike</p>
            <p></p>
        </div>
    </div>

    <h1 class="text-center"> Welcome to Nowhere shop</h1>


    <div class="row ">
        <div v-for="product in products" class="col-3">
            <ProductCard :product="product" />
        </div>
    </div>
    <ProductCard />
</template>

<script>
import ProductList from '../components/ProductList.vue'
import ProductCard from './ProductCard.vue'
const panels = document.querySelectorAll('.panel')

function toggleOpen() {
    this.classList.toggle('open')
}

function toggleActive(e) {
    if (e.propertyName.includes('flex'))
        this.classList.toggle('open-active')
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen))
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive))
export default {
    components: {
        ProductList,
        ProductCard,
    },
    props: {
        products: { type: Array, default: [] }
    }
}
</script>

<style scoped>
.panels {
    min-height: 100vh;
    overflow: hidden;
    display: flex;
}

.panel {
    background: #6B0F9C;
    box-shadow: inset 0 0 0 5px rgba(255, 255, 255, 0.1);
    color: white;
    text-align: center;
    align-items: center;
    /* Safari transitionend event.propertyName === flex */
    /* Chrome + FF transitionend event.propertyName === flex-grow */
    transition:
        font-size 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11),
        flex 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11),
        background 0.2s;
    font-size: 20px;
    background-size: cover;
    background-position: center;
    flex: 1;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
}

.panel1 {
    background-image: url(https://i.pinimg.com/564x/41/4d/68/414d689710f4cf85575c464ee8dfefc2.jpg);
}

.panel2 {
    background-image: url(https://i.pinimg.com/564x/90/74/a4/9074a480dbb225f6c4607b5744ba66a9.jpg);
}

.panel3 {
    background-image: url(https://i.pinimg.com/564x/28/32/56/28325659e7bb30800d8f524eb0e39b0d.jpg);
}

.panel4 {
    background-image: url(https://i.pinimg.com/564x/e4/b7/58/e4b758c4d9f894010dc500c8f58a69ae.jpg);
}



.panel>* {
    margin: 0;
    width: 100%;
    transition: transform 0.5s;
    flex: 1 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.panel>*:first-child {
    transform: translateY(-100%);
}

.panel>*:last-child {
    transform: translateY(100%);
}

.panel.open-active>*:first-child,
.panel.open-active>*:last-child {
    transform: translateY(0);
}

.panel p {
    text-transform: uppercase;
    font-family: 'Bitter', cursive;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.72), 0 0 14px rgba(0, 0, 0, 0.45);
    font-size: 2em;
}

.panel p:nth-child(2) {
    font-size: 4em;
}

.panel.open {
    flex: 5;
    font-size: 40px;
}

.cta {
    color: white;
    text-decoration: none;
}
</style>