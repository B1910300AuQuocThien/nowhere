<template>
    <div>
        <Home :products="returnProduct" />
    </div>
</template>

<script>
import Home from '../components/home.vue'
import productService from '../services/product.service';
export default {
    components: {
        Home
    },
    data() {
        return {
            product: [],
        }
    },
    methods: {
        async retrieveProduct() {
            try {
                this.product = await productService.getAll()
                // this.refreshList()
            }
            catch (error) {
                console.log(error)
            }
        },
        refreshList() {
            this.retrieveProduct()
        }
    },
    mounted() {
        this.refreshList()
    },
    computed: {
        returnProduct() {
            console.log(this.product)
            return this.product
        }
    }
}
</script>