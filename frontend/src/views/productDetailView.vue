<template>
    <div>
        <ProductDetail :products="returnProduct" :quantity="quantity" @addtoCard:productID="addToCart" />
    </div>
</template>

<script>
import ProductDetail from '../components/ProductDetail.vue';
import productService from '../services/product.service';
export default {
    components: {
        ProductDetail
    },
    data() {
        return {
            product: {},
            quantity: {}
        }
    },
    methods: {
        addToCart(emitPayload) {

            var user = this.$cookies.get('user')

            if (user == null) {
                this.$router.push({ name: 'dangnhap' })
            }
            var cartKey = `cart_${user[0].makh}`
            var carItem = this.$cookies.get(cartKey)
            if (!carItem) {
                var carItem = []
                carItem.push(emitPayload)
                this.$cookies.set(cartKey, carItem)
            } else {
                const idDetail = emitPayload.detail.machitiet
                const quantityDetail = emitPayload.quantity.quanity

                if (this.exitsProduct(idDetail, cartKey)) {
                    carItem.map((e) => {
                        if (idDetail == e.detail.machitiet) {
                            e.quantity.quanity = e.quantity.quanity + quantityDetail
                        }
                    })
                    this.$cookies.set(cartKey, carItem)
                }
                else {
                    carItem.push(emitPayload)
                    this.$cookies.set(cartKey, carItem)
                }
            }
            console.log(this.$cookies.get(cartKey))
        },

        exitsProduct(idDetail, cartKey) {
            var carItem = this.$cookies.get(cartKey)
            var flag = false
            carItem.map((cart) => {
                if (cart.detail.machitiet == idDetail) {
                    flag = true
                }
            })
            return flag
        },

        async getProduct() {
            try {
                this.product = await productService.get(this.$route.params.id)
            }
            catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.getProduct()
        }
    },
    mounted() {
        this.refreshList()
    },
    computed: {
        returnProduct() {
            return this.product[0]
        }
    }
}
</script>