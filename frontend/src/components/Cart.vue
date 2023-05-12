<template>
    <div class="cart">
        <h3 class="text-center h2">GIỎ HÀNG</h3>

        <div class="row">

            <div v-if="carts" class="row mx-auto col-9">
                <div v-for="cart in carts" class="">
                    <CartTitle :cart="cart" @delete:product="deleteProduct" @add:product="addProduct" />
                </div>
            </div>
            <div class="bottom-bar rounded col-3" v-if="carts.length != 0">
                <div class="">
                    <div class="h6">Thành tiền: {{ almount }}VND</div>
                    <button class="text-end btn btn-primary" @click="order">Đặt Hàng</button>
                </div>
            </div>
        </div>

        <div v-if="carts.length == 0" class="h5 text-center">CHƯA CÓ SẢN PHẨM TRONG GIỎ HÀNG</div>
    </div>
</template>

<script>
import CartTitle from './CartTitle.vue';

export default {
    data() {
        return {
            products: [],
        };
    },
    props: {
        carts: { type: Array, required: true },
        order: { type: Array, required: true },
        almount: { type: Number }
    },
    emits: ["delete:product", "add:product", "add:order"],
    methods: {
        deleteProduct(id) {
            this.$emit("delete:product", id)
        },

        async addProduct(cart) {
            // console.log(this.$cookies.get('order_116654519084252082602'))
            this.$emit("add:product", cart)
            // console.log(cart)
        },

        order() {
            this.$emit("add:order", { flag: true })
        }
    },
    components: { CartTitle }
}
</script>

<style>
.cart {
    position: relative;
}

.bottom-bar {
    position: static;
    top: 0px;
    left: 0px;
    width: 100%;
}
</style>