<template>
    <div class="border pt-2 px-3 pb-1">
        <div class="text-primary h5">{{ product.ten }}</div>
        <div v-if="rate" class="ml-3">
            <table class="table">
                <thead>
                    <tr>
                        <td class="col-3 h6">Tên người dùng</td>
                        <td class="col-3 h6 ">Ngày</td>
                        <td class="col-5 h6 ">Nội dung</td>
                        <td class="col-2 h6 text-center">Xóa</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rate in rate">
                        <td class="col-3">{{ rate.tenkh }}</td>
                        <td class="col-2 ">{{ rate.ngay }}</td>
                        <td class="col-5">{{ rate.noidung }}</td>
                        <td class="col-2 text-center">
                            <button class="btn btn-danger" @click="deleteRate(rate._id)">Xóa</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template >
<script>
export default {
    props: {
        product: { type: Object, required: true }
    },
    data() {
        return {
            rate: this.product.danhgia
        }
    },
    emits: ['delete:rate'],
    methods: {
        deleteRate(id) {
            console.log(id)
            this.$emit("delete:rate", id)
        }
    }

}
</script>
