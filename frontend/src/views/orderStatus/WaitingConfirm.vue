<template>
    <div>
        <table class="table ml-5 border">
            <thead class="text-center bg-light">
                <tr class="">
                    <td class="">STT</td>
                    <td class="">Ngày</td>
                    <td class="">Số lượng sản phẩm</td>
                    <td class="">Tổng tiền</td>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr class="" v-for="(order, index) in orders" :key="order.user">
                    <td class="">{{ index + 1 }}</td>
                    <td class="">{{ order.ngay }}</td>
                    <td class="">{{ order.sanpham.length }} sản phẩm</td>
                    <td class="">{{ order.tongtien }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import orderService from '../../services/order.service';
export default {

    components: {
    },
    data() {
        return {
            orders: {}
        }
    },

    methods: {
        async getOrderItem() {
            var userId = this.$cookies.get('user')[0].makh
            console.log(userId)
            this.orders = await orderService.orderStatus(userId, { status: 'CXN' })
            console.log(this.orders)
        }
    },
    mounted() {
        this.getOrderItem()
    }
}
</script>