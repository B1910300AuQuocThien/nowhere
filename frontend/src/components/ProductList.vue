<script>
export default {
    props: {
        product: { type: Array, default: [] },
    },
    emits: ["delete:productId"],
    methods: {
        deleteProduct(_id) {
            this.$emit("delete:productId", { id: _id })
        },
        getProductQuantity() {
            console.log(this.product)
        }
    },
    data() {
        return {
            quantity: 0
        }
    },
    mounted() {
        this.getProductQuantity()
    }

}

</script>

<template>
    <div>
        <table class="table w-50 ml-5 border">
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
                        <!-- {{ product.hinhanh[0].data }} -->
                    </td>
                    <td class="">{{ product.ten }}</td>
                    <td v-if="product.trangthai === true">hiện</td>
                    <td v-else>ẩn</td>
                    <td>{{ quantity }}</td>

                    <td>
                        <button class="btn btn-primary">SỬA</button>
                    </td>
                    <td>
                        <button class="btn btn-danger" @click="deleteProduct(product._id)">XÓA</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped></style>