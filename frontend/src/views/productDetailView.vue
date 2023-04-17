<template>
    <div>
        <ProductDetail :product="product" />
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
            product: null
        }
    },
    methods: {
        addToCart(id) {
            this.$emit("addtocart:productId", { id: id })
        },

        async getProduct() {
            try {
                this.product = await productService.get(this.$route.params.id)
                console.log(this.$route.params.id)
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
    }
}
</script>