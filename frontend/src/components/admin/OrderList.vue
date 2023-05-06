<template>
    <div>
        <table class="table ml-5 border">
            <thead class="text-center bg-light">
                <tr class="">
                    <td class="">STT</td>
                    <td class="">Ngày</td>
                    <td class="">Số lượng sản phẩm</td>
                    <td class="">Tổng tiền</td>
                    <td class="">Trạng thái cũ</td>
                    <td class="">Trạng thái mới</td>
                    <td class="">Lưu</td>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr class="" :key="order.user">
                    <td class="">{{ index + 1 }}</td>
                    <td class="">{{ order.ngay }}</td>
                    <td class="">{{ order.sanpham.length }} sản phẩm</td>
                    <td class="">{{ order.tongtien }}</td>
                    <td class="">{{ order.trangthai[0].tentrangthai }}</td>
                    <td class="col-2">
                        <select class="form-select form-select-lg form-control" v-model="newStatus">
                            <option v-for="sta in status" :value="sta.matrangthai">{{ sta.tentrangthai }}</option>
                        </select>
                    </td>
                    <td class="">
                        <button class="btn btn-primary" @click="updateStatus">Lưu</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import orderService from '../../services/order.service'
export default {
    props: {
        order: { type: Object, required: true },
        index: { type: Number }
    },
    data() {
        return {
            status: {},
            newStatus: ''
        }
    },
    methods: {
        async getStatus() {
            this.status = await orderService.getStatus()
            var removeIndex = 0
            this.status.forEach((el, index) => {
                if (el.matrangthai == this.order.trangthai[0].matrangthai) {
                    removeIndex = index
                }
            })

            this.status.splice(removeIndex, 1)
        },

        async updateStatus() {
            console.log(this.newStatus)
            await orderService.updateStatus(this.order._id, this.newStatus)
            location.reload()
        },

        refersh() {
            this.getStatus()
        }
    },
    mounted() {
        this.refersh()
    }
}
</script>