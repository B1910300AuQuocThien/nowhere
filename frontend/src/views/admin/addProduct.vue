<template>
    <h1 class="text-center">THÊM SẢN PHẨM</h1>
    <ProductForm @submit:product="addProduct" :product="product" :categorys="categorys" :classifys="classifys"
        :materials="materials" />
</template>

<script>
import ProductForm from '../../components/admin/ProductForm.vue';
import ProductService from '../../services/product.service'
import UploadImgService from '../../services/uploadImg.service';
import CategoryService from "../../services/category.service"
import ClassifyService from "../../services/classify.service"
import MaterialService from '../../services/material.service';

export default {
    components: {
        ProductForm
    },
    data() {
        return {
            product: {},
            image: {},
            categorys: {},
            classifys: {},
            materials: {}
        }
    },

    methods: {
        async addProduct(emitPayload) {
            console.log(emitPayload)
            try {
                await ProductService.create(emitPayload.product)
                console.log("thanh cong")
            }
            catch (error) {
                console.log(error)
            }
            try {
                await UploadImgService.create(emitPayload.image)
                console.log("thanh cong")
            }
            catch (error) {
                console.log(error)
            }
        },

        async getSomeThing() {
            this.categorys = await CategoryService.getAll()
            this.classifys = await ClassifyService.getAll()
            this.materials = await MaterialService.getAll()
        }
    },

    mounted() {
        this.getSomeThing()
    }
}
</script>