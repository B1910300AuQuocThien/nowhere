<script>
export default {
    props: {
        product: { type: Array, default: [] },
        // activeIndex: { type: Number, default: -1 }
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index)
        }
    }
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
                    <td class="">Số Lượng</td>
                    <td class="">Giá Hiện Tại</td>
                    <td class="">Giá cũ</td>
                    <td class="">Ngày Cập Nhật</td>
                    <td class="">Tên Nhà Sản Xuất</td>
                    <td class="">Yêu Thích</td>
                    <td>Trạng Thái</td>
                    <td>Chỉnh sửa</td>
                    <td> Xóa</td>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr class="" v-for="(product, index) in product" :key="product._id">
                    <td class="">{{ index + 1 }}</td>
                    <td class="">
                        <img src="{{ product.img }}" alt="">
                    </td>
                    <td class="">{{ product.ten }}</td>
                    <td class="">{{ product.soluong }}</td>
                    <td class="">{{ product.giahientai }}</td>
                    <td class="">{{ product.giacu }}</td>
                    <td class="">{{ product.ngaycapnhat }}</td>
                    <td class="">{{ product.tensx }}</td>
                    <td v-if="product.yeuthich == true">
                        <i class="fas fa-heart text-danger"></i>
                    </td>
                    <td v-else>
                        <i class=""></i>
                    </td>
                    <td v-if="product.trangthai === true">hiện</td>
                    <td v-else>ẩn</td>
                    <td>
                        <i class="fas fa-edit"></i>
                    </td>
                    <td>
                        <i class="fas fa-trash text-danger"></i>
                    </td>
                </tr>
            </tbody>
        </table>


    </div>
</template>

<style scoped></style>