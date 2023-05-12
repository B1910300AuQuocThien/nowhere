<template>
    <div v-for="product in products">
        <RateList :product="product" @delete:rate="deleteRate" />
    </div>
</template>

<script>
import RateList from '../../components/admin/RateList.vue';
import productService from '../../services/product.service';
import rateService from '../../services/rate.service';

export default {
    components: { RateList },
    data() {
        return {
            products: []
        }
    },
    methods: {
        async getProductRate() {
            this.products = await productService.getAll()
        },

        async deleteRate(id) {
            await rateService.delete(id)
            location.reload()
        },
        refersh() {
            this.getProductRate()
        }
    },
    mounted() {
        this.refersh()
    }

}
</script>