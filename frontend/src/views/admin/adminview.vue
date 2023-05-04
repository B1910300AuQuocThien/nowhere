<template>
    <ProductList :product="filteredProduct" @delete:productId="deleteProduct" />
    <div class="adminpanel text-center">
        <hr>
        <div class="col-4 mx-auto d-flex justify-content-around tool-bar">
            <button class="btn btn-dark" @click="refreshList()">LÀM MỚI</button>
            <router-link :to="{
                    name: 'themmoi'
                }">
                <button class="btn btn-dark">THÊM MỚI</button>
            </router-link>
            <button class="btn btn-dark" @click="removeAllProducts">XÓA TẤT CẢ</button>
        </div>
    </div>
</template>

<style>
.adminpanel {
    position: fixed;
    bottom: 0px;
    width: 100%;
}
</style>

<script>
import Header from '../../components/Header.vue';
import ProductList from '../../components/ProductList.vue';
import ProductService from '../../services/product.service'
export default {
    components: {
        ProductList,
        Header
    },

    props: {
        id: { type: String, required: true }
    },

    data() {
        return {
            product: [],
            activeIndex: ''
        }
    },
    methods: {
        async retrieveProduct() {
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

