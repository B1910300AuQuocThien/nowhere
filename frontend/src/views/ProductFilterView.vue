<template>
    <div>

        <div v-if="this.$route.params.id == 'XD'" class="h2 text-center">XE ĐẠP</div>
        <div v-if="this.$route.params.id == 'PT'" class="h2 text-center">PHỤ TÙNG</div>
        <div v-if="this.$route.params.id == 'KS'" class="h2 text-center">KHUNG SƯỜN</div>
        <div v-if="this.$route.params.id == 'PK'" class="h2 text-center">PHỤ KIỆN</div>
        <div class="row">
            <div v-for="product in products" class="col-3">
                <ProductCard :product="product" />
            </div>
        </div>
    </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue';
import productService from '../services/product.service';
export default {
    components: {
        ProductCard
    },
    data() {
        return {
            products: [],
            text: ''
        }
    },
    methods: {
        async retrieveProduct() {
            try {
                console.log(this.$route.params.id)
                this.products = await productService.getProductWithFilter(this.$route.params.id)
                this.refreshList()
                console.log(this.products)
            }
            catch (error) {
                console.log(error)
            }
        },
        refreshList() {
            this.retrieveProduct()
        },
    },
    mounted() {
        this.refreshList()
    },
    computed: {
        returnProduct() {
            // console.log(this.product)
            return this.product
        }
    }
}
</script>