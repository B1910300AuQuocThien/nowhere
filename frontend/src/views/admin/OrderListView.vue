<template>
    <div class="h4 text-center">QUẢN LÍ ĐƠN HÀNG</div>
    <div v-for="(order, index) in orders">
        <OrderList :order="order" :index="index" />
    </div>
</template>

<script>
import OrderList from '../../components/admin/OrderList.vue';
import orderService from '../../services/order.service'

export default {
    components: {
        OrderList
    },
    data() {
        return {
            orders: {},
            status: {},
        }
    },
    methods: {
        async getOrder() {
            this.orders = await orderService.get()

        }
    },
    mounted() {
        this.getOrder()
    }
}
</script>