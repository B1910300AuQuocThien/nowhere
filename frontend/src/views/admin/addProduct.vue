<template>
    <div>
        <h1 class="text-center">THÊM SẢN PHẨM</h1>
        <ProductForm @submit:product="addProduct" :product="product" :categorys="categorys" :classifys="classifys"
            :materials="materials" :materialDetails="materialDetail" />
    </div>
</template>

<script>
import ProductForm from '../../components/admin/ProductForm.vue';
import ProductService from '../../services/product.service'
import UploadImgService from '../../services/uploadImg.service';
import CategoryService from "../../services/category.service"
import ClassifyService from "../../services/classify.service"
import MaterialService from '../../services/material.service';
import MaterialDetailService from '../../services/materialDetail.service'

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
            materials: {},
            materialDetail: [{
                tenchatlieu: '',
                giahientai: '',
                soluong: '',
                trongluong: '',
                mausac: '',
                phanloai: ''
            }]
        }
    },

    methods: {
        async addProduct(emitPayload) {
            console.log(emitPayload.productDetail)
            try {
                await UploadImgService.create(emitPayload.image)
                console.log("them hinh thanh cong")
                await ProductService.create(emitPayload.product)
                console.log("them san pham thanh cong")
                for (var i = 0; i < emitPayload.productDetail.length; i++) {
                    await MaterialDetailService.create(emitPayload.productDetail[i])
                }
                console.log("them chi tiet san pham thanh cong")
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