<template>
    <div class="">
        <Cart :carts="carts" @delete:product="deleteProduct" @add:product="addProduct" :order="order"
            :almount="totalAlmount" @add:order="addOrder" />
    </div>
</template>
<script>
import Cart from '../components/Cart.vue';
export default {
    components: {
        Cart
    },
    data() {
        return {
            carts: [],
            user: {},
            order: [],
            totalAlmount: 0
        }
    },
    methods: {
        async getCart() {
            this.user = this.$cookies.get('user')
            this.carts = this.$cookies.get(`cart_${this.user[0].makh}`)
            this.order = this.$cookies.get(`order_${this.user[0].makh}`)
            console.log(this.order)
        },

        refersh() {
            this.getCart()
            this.resetOrder()
            // this.computeAlmount()
        },

        deleteProduct(id) {
            var indexCart = 0
            this.carts.forEach((cart, index) => {
                if (cart.detail.machitiet == id) {
                    indexCart = index
                }
            })

            var indexOrder
            this.order.forEach((order, index) => {
                if (order.detail.machitiet == id) {
                    indexOrder = index
                }
            })

            this.order.splice(indexOrder, 1)
            this.carts.splice(indexCart, 1)
            this.$cookies.set(`cart_${this.user[0].makh}`, this.carts)
            this.$cookies.set(`order_${this.user[0].makh}`, this.order)


            this.refersh()
        },

        exitsProduct(productId, orderKey) {
            var order = this.$cookies.get(orderKey)
            var flag = false
            order.map((e) => {
                if (e.detail.machitiet == productId) {
                    flag = true
                }
            })
            return flag

        },

        async addProduct(cart) {
            var orderKey = `order_${this.user[0].makh}`
            var orderItem = this.$cookies.get(orderKey)
            if (!orderItem) {
                var orderItem = []
                orderItem.push(cart)
                this.$cookies.set(orderKey, orderItem)
                this.order = this.$cookies.get(`order_${this.user[0].makh}`)
                this.computeAlmount(this.order)

                console.log(this.$cookies.get(orderKey))
            }
            else {
                const idDetail = cart.detail.machitiet
                const quantityDetail = cart.quantity.quanity
                if (this.exitsProduct(cart.detail.machitiet, orderKey)) {
                    var removeIndex = 0
                    orderItem.forEach((e, index) => {
                        if (idDetail == e.detail.machitiet && quantityDetail == e.quantity.quanity) {
                            removeIndex = index
                        }
                        if (idDetail == e.detail.machitiet) {
                            e.quantity.quanity = quantityDetail
                        }
                    })
                    orderItem.splice(removeIndex, 1)
                    this.$cookies.set(orderKey, orderItem)
                    this.order = this.$cookies.get(`order_${this.user[0].makh}`)
                    this.computeAlmount(this.order)


                }
                else {
                    orderItem.push(cart)
                    this.$cookies.set(orderKey, orderItem)
                    this.order = this.$cookies.get(`order_${this.user[0].makh}`)
                    this.computeAlmount(this.order)


                }
            }
            this.order = this.$cookies.get(`order_${this.user[0].makh}`)
            this.computeAlmount(this.order)
        },
        computeAlmount(order) {
            var totalAlmount = 0
            order.forEach((e) => {
                var almount = e.detail.giahientai * e.quantity.quanity
                totalAlmount = totalAlmount + almount
            })
            this.totalAlmount = totalAlmount
        },
        resetOrder() {
            var orderKey = `order_${this.user[0].makh}`
            this.order = []
            this.$cookies.set(orderKey, this.order)
        },
        addOrder(emitPayload) {
            var orderKey = `order_${this.user[0].makh}`
            if (emitPayload.flag == true) {
                var orderProduct = this.$cookies.get(orderKey)
                this.$router.push({ name: 'xacnhan' })
            }
        },

    },

    mounted() {
        this.refersh()
    }
}
</script>