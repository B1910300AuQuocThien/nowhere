<template>
    <div class="">
        <Cart :carts="carts" />
    </div>
</template>
<script>
import Cart from '../components/Cart.vue';
export default {
    components: {
        Cart
    },
    data() {
        return {
            carts: [],
            user: {}
        }
    },
    methods: {
        async getCart() {
            this.user = this.$cookies.get('user')
            this.carts = this.$cookies.get(`cart_${this.user[0].makh}`)
            console.log(this.user)
            console.log(this.carts)
        },

        refersh() {
            this.getCart()
        }
    },

    mounted() {
        this.refersh()
    }
}
</script>