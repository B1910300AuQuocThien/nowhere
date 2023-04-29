<script>
export default {
    props: {
        product: { type: Object },
    },
    emits: ["addtocart:productID"],
    methods: {
        addToCart(_id) {
            this.$emit("addtocart:productId", { id: _id })
        },
        printproduct() {
            console.log(this.product)
        }
    },
    data() {
        return {
            image: this.product
        }
    },
    mounted() {
        this.printproduct
    }
}
</script>

<template>
    <div>
        <div v-if="product">
            <section class="section-products">
                <div class="container">
                    <div class="">
                        <div class="single-product product-1">
                            <div class="part-1">
                                <!-- <img :src="`data:jpg;base64,${product.hinhanh[0].data}`" class="img-fluid"> -->
                                <img src="../assets/8d0233044585f2992e20e012e15e4aaf.jpg" class="img-fluid img-product">
                                <ul>
                                    <li><a href="#"><i class="fas fa-shopping-cart"></i></a></li>
                                    <li><a href="#"><i class="fas fa-heart"></i></a></li>
                                    <li><a href="#"><i class="fas fa-expand"></i></a></li>
                                </ul>
                            </div>
                            <div class="part-2">
                                <router-link :to="{
                                        name: 'chitietsanpham',
                                        params: { id: product.masp }
                                    }" class="product-title block">
                                    {{ product.ten }}
                                </router-link>
                                <h4 class="product-price mr-4">Giá: {{ product.chitiet[0].giahientai }} VND</h4>
                                <h4 class="product-title">Danh mục: {{ product.danhmuc[0].ten }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
a,
a:hover {
    text-decoration: none;
    color: inherit;
}

.section-products {
    padding: 30px 0 5px;
}


.section-products .single-product {
    margin-bottom: 20px;
}

.section-products .single-product .part-1 {
    position: relative;
    height: 250px;
    overflow: hidden;
}

.section-products .single-product .part-1::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: all 0.3s;
}

.section-products .single-product:hover .part-1::before {
    transform: scale(1.2, 1.2) rotate(5deg);
}


.section-products .single-product .part-1 .discount,
.section-products .single-product .part-1 .new {
    position: absolute;
    top: 15px;
    left: 20px;
    color: #ffffff;
    background-color: #fe302f;
    padding: 2px 8px;
    text-transform: uppercase;
    font-size: 0.85rem;
}

.section-products .single-product .part-1 .new {
    left: 0;
    background-color: #444444;
}

.section-products .single-product .part-1 ul {
    position: absolute;
    bottom: -30px;
    left: 20px;
    margin: 0;
    padding: 0;
    list-style: none;
    opacity: 0;
    transition: bottom 0.5s, opacity 0.5s;
}

.section-products .single-product:hover .part-1 ul {
    bottom: 30px;
    opacity: 1;
}

.section-products .single-product .part-1 ul li {
    display: inline-block;
    margin-right: 4px;
}

.section-products .single-product .part-1 ul li a {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    background-color: #ffffff;
    color: #444444;
    text-align: center;
    box-shadow: 0 2px 20px rgb(50 50 50 / 10%);
    transition: color 0.2s;
}

.section-products .single-product .part-1 ul li a:hover {
    color: #fe302f;
}

.section-products .single-product .part-2 .product-title {
    display: block;
    color: black;
    font-weight: bold;
}

.section-products .single-product .part-2 h4 {
    display: inline-block;
    font-size: 1rem;
}

.img-product:hover {
    transform: rotate(0.01turn);
    scale: 1.15;
    transition: 0.5s;
}
</style>