<template>
    <div class="">
        <h3 class="text-center">Giỏ Hàng</h3>

        <div v-if="carts" class="row mx-auto">
            <div v-for="cart in carts">
                <CartTitle :cart="cart" />
            </div>
        </div>

        <div v-else class="h4 text-center">CHƯA CÓ SẢN PHẨM TRONG GIỎ HÀNG</div>
    </div>
</template>

<script>
import CartTitle from './CartTitle.vue';

export default {
    data() {
        return {
            products: []
        };
    },
    props: {
        carts: { type: Array, required: true }
    },
    methods: {},
    components: { CartTitle }
}
</script>