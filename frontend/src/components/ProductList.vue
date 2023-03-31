<script>
export default {
    props: {
        product: { type: Array, default: [] },
        activeIndex: { type: String }
    },
    emits: ["delete:productId"],
    methods: {
        deleteProduct(_id) {
            this.$emit("delete:productId", { id: _id })
        },


    },
}
</script>

<template>
    <div>
        <table class="table">
            <thead class="text-center bg-light">
                <tr class="">
                    <td class="">STT</td>
                    <td class="">Hình Ảnh</td>
                    <td class="">Tên</td>
                    <td class="">Giá Hiện Tại</td>
                    <td class="">Số Lượng</td>
                    <td class="">Trọng Lượng</td>
                    <td class="">Màu</td>
                    <td class="">Danh Mục</td>
                    <td class="">Phân Loại</td>
                    <td class="">Chất Liệu</td>
                    <td class="">Yêu Thích</td>
                    <td class="">Trạng Thái</td>
                    <td>Chỉnh sửa</td>
                    <td> Xóa</td>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr class="" v-for="(product, index) in product" :key="product._id">
                    <td class="">{{ index + 1 }}</td>
                    <td class="col-1">
                        <img :src="`data:jpg;base64,${product.hinhanh[0].data}`" alt="" class="img-thumbnail img-fluid">
                        <!-- {{ product.hinhanh[0].data }} -->
                    </td>
                    <td class="">{{ product.ten }}</td>
                    <td class="">{{ product.giahientai }}</td>
                    <td class="">{{ product.soluong }}</td>
                    <td class="">{{ product.trongluong }}</td>
                    <td class="">{{ product.mau }}</td>
                    <td class="">{{ product.danhmuc[0].ten }}</td>
                    <td class="">{{ product.phanloai[0].ten }}</td>
                    <td class="">{{ product.chatlieu[0].ten }}</td>
                    <td v-if="product.yeuthich === true">
                        <i class="fas fa-heart text-danger"></i>
                    </td>
                    <td v-else><i class="fas fa-heart"></i></td>
                    <td v-if="product.trangthai === true">hiện</td>
                    <td v-else>ẩn</td>
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