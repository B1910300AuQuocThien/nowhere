<template>
    <ConfirmForm :address="address" :orders="order" :almount="almount" :user="user" :addressDetail="addressDetail"
        @add:order="addOrder" />
</template>

<script>
import ConfirmForm from '../components/ConfirmForm.vue';
import addressService from '../services/address.service';
import materialDetailService from '../services/materialDetail.service';
import orderService from '../services/order.service'
export default {
    components: {
        ConfirmForm
    },
    data() {
        return {
            address: {},
            order: {},
            user: this.$cookies.get('user'),
            almount: 0,
            addressDetail: ''
        }
    },
    methods: {
        getOrder() {
            var orderKey = `order_${this.user[0].makh}`
            this.order = this.$cookies.get(orderKey)
            console.log(this.user)
        },
        refersh() {
            this.getOrder()
            this.computeAlmount()
        },
        computeAlmount() {
            var orderKey = `order_${this.user[0].makh}`
            var order = this.$cookies.get(orderKey)
            order.forEach((e) => {
                this.almount = this.almount + e.price
            })
        },

        async addOrder(emitPayload) {
            const date = new Date()

            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            let currentDate = `${day}-${month}-${year}`
            console.log(emitPayload)
            var order = {
                makh: emitPayload.user,
                ngay: currentDate,
                tongtien: emitPayload.almount,
                diachi: emitPayload.address,
                sdt: emitPayload.numberphone
            }
            await orderService.createOrder(order)

            emitPayload.orderList.forEach(async (orderItem) => {
                var orderDetail = {
                    machitiet: orderItem.detail.machitiet,
                    soluong: orderItem.quantity,
                    gia: orderItem.price
                }
                console.log(orderDetail)
                var materialDetail = await materialDetailService.getById({ id: orderDetail.machitiet })
                var new_quantity = parseInt(materialDetail[0].soluong) - parseInt(orderDetail.soluong)
                console.log(materialDetail)
                var data = {
                    soluong: new_quantity,
                    id: materialDetail._id
                }
                console.log(data)
                await orderService.createOrderDetail(orderDetail)
                await materialDetailService.updateQuantity(data)
            })
            this.reset()

        },
        reset() {
            var orderKey = `order_${this.user[0].makh}`
            this.order = []
            this.$cookies.set(orderKey, this.order)
            var cartKey = `cart_${this.user[0].makh}`
            var cart = []
            this.$cookies.set(cartKey, cart)
        }
    },
    mounted() {
        this.refersh()
    }
}
</script>