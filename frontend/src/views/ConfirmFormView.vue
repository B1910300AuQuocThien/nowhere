<template>
    <ConfirmForm :address="address" :orders="order" :almount="almount" :user="user" :addressDetail="addressDetail"
        @add:order="addOrder" />
</template>

<script>
import ConfirmForm from '../components/ConfirmForm.vue';
import addressService from '../services/address.service';
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
            this.getAddress()
        },
        computeAlmount() {
            var orderKey = `order_${this.user[0].makh}`
            var order = this.$cookies.get(orderKey)
            order.forEach((e) => {
                this.almount = this.almount + e.price
            })
        },

        async getAddress() {
            var address = this.user[0].diachi
            var city = address[0].capmot
            var district = address[0].caphai
            var ward = address[0].capba

            var addressDetail = await addressService.get(city, district, ward)
            this.addressDetail = addressDetail.ward + ' ' + addressDetail.district + ' ' + addressDetail.city
            // console.log(this.addressDetail)
        },

        async addOrder(emitPayload) {
            const date = new Date()

            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            let currentDate = `${day}-${month}-${year}`
            console.log(currentDate)
            var order = {
                makh: emitPayload.user,
                ngay: currentDate,
                tongtien: emitPayload.almount,
                diachi: emitPayload.diachi
            }
            await orderService.createOrder(order)

            emitPayload.orderList.forEach(async (orderItem) => {
                var orderDetail = {
                    machitiet: orderItem.detail.machitiet,
                    soluong: orderItem.quantity.quanity,
                    gia: orderItem.price
                }
                await orderService.createOrderDetail(orderDetail)
            })
            console.log(emitPayload.orderList)
            console.log(emitPayload)
        }

    },
    mounted() {
        this.refersh()
    }
}
</script>