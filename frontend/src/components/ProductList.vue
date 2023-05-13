<script>
import Footer from './Footer.vue'
export default {
    components: {
        Footer
    },
    props: {
        product: { type: Array, default: [] },
    },
    emits: ["delete:productId"],
    methods: {
        deleteProduct(_id) {
            this.$emit("delete:productId", { id: _id })
        },
        getProductQuantity(index) {
            var quantity = 0
            var temp = this.product[index]
            temp.chitiet.forEach((e) => {
                quantity = quantity + e.soluong
            })
            return quantity
        }
    },
    data() {
        return {
            quantity: 0
        }
    },

    mounted() {
        this.getProductQuantity
    }

}

</script>

<template>
    <div>
        <table class="table ml-5 border">
            <thead class="text-center bg-light">
                <tr class="">
                    <td class="">STT</td>
                    <td class="">Hình Ảnh</td>
                    <td class="">Tên</td>
                    <td class="">Trạng Thái</td>
                    <td class="">Số lượng</td>
                    <td>Chỉnh sửa</td>
                    <td> Xóa</td>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr class="" v-for="(product, index) in product" :key="product._id">
                    <td class="">{{ index + 1 }}</td>
                    <td class="col-2">
                        <img :src="`data:jpg;base64,${product.hinhanh[0].data}`" alt="" class="img-fluid"
                            style="height: 50px; width: 100%;">
                        <!-- <img :src="`${product.hinhanh}`"> -->
                        <!-- {{ product.hinhanh[0].data }} -->
                    </td>
                    <td class="">{{ product.ten }}</td>
                    <td v-if="product.trangthai === 'true'">hiện</td>
                    <td v-else>ẩn</td>
                    <td>{{ getProductQuantity(index) }}</td>

                    <td>
                        <button class="btn btn-primary">SỬA</button>
                    </td>
                    <td>
                        <button class="btn btn-danger" @click="deleteProduct(product._id)">XÓA</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="adminpanel text-center">
            <hr>
            <div class="col-5 mx-auto d-flex justify-content-around tool-bar mb-5">
                <button class="btn btn-dark" @click="refreshList()">LÀM MỚI</button>
                <router-link :to="{
                    name: 'themmoi'
                }">
                    <button class="btn btn-dark">THÊM MỚI</button>
                </router-link>
                <button class="btn btn-dark" @click="removeAllProducts">XÓA TẤT CẢ</button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>