<template>
    <ProductList :product="product" @delete:productId="deleteProduct" />
</template>

<script>
import ProductList from '../../components/ProductList.vue'
import ProductService from '../../services/product.service'
export default {
    components: {
        ProductList
    },
    data() {
        return {
            product: []
        }
    },
    methods: {
        async retrieveProduct() {
            console.log(this.$route.params.id)
            try {
                this.product = await ProductService.getProductWithFilter(this.$route.params.id)
                this.refreshList()
            }
            catch (error) {
                console.log("loai")
            }
        },

        refreshList() {
            this.retrieveProduct()
        },

        async removeAllProducts() {
            try {
                await ProductService.deleteAll()
                this.refreshList()
            } catch (error) {
                console.log(error)
            }
        },
        async deleteProduct(emitPayload) {
            console.log(emitPayload)
            await ProductService.delete(emitPayload.id)
            this.refreshList()
        }

    },
    computed: {
        activeProduct() {
            console.log(this.activeIndex)
        },
        filteredProduct() {
            return this.product
        }
    },
    mounted() {
        this.refreshList()
    }

}
</script>