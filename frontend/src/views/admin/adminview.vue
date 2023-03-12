<template>
    <ProductList :product="filteredProduct" />
    <div class="adminpanel text-center">
        <hr>
        <div class="col-4 mx-auto d-flex justify-content-around tool-bar">
            <button class="btn btn-dark" @click="refeshList()">LÀM MỚI</button>
            <router-link :to="{
                name: 'themmoi'
            }">
                <button class="btn btn-dark">THÊM MỚI</button>
            </router-link>
            <button class="btn btn-dark">XÓA TẤT CẢ</button>
        </div>
    </div>
</template>

<script>
import Header from '../../components/Header.vue';
import ProductList from '../../components/ProductList.vue';
import ProductService from '../../services/product.service'
export default {
    components: {
        ProductList,
        Header
    },
    data() {
        return {
            product: [],
        }
    },
    methods: {
        async retrieveProduct() {
            try {
                this.product = await ProductService.getAll()
            }
            catch (error) {
                console.log(error)
            }
        },
        refreshList() {
            this.retrieveProduct()
        }

    },
    computed: {
        activeProduct() {
            if (this.activeIndex < 0) return null
            return this.filteredProduct
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

