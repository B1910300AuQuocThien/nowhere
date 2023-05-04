<template>
    <div class="cart">
        <h3 class="text-center h2">GIỎ HÀNG</h3>

        <div v-if="carts" class="row mx-auto">
            <div v-for="cart in carts" class="">
                <CartTitle :cart="cart" @delete:product="deleteProduct" @add:product="addProduct" />
            </div>
        </div>
        <div class="bottom-bar rounded" v-if="carts.length != 0">
            <div class="row w-75 mx-auto bg-dark">
                <div class="col-8 h6 mt-2">Thành tiền: {{ almount }}VND</div>
                <button class="col-4 text-end btn btn-primary" @click="order">Đặt Hàng</button>
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
    position: fixed;
    bottom: 0px;
    width: 100%;
}
</style>