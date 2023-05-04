<template>
    <div class="row mt-2 order-cart">
        <div class="col-3">
            <img :src="`data:jpg;base64, ${image}`" alt="" class="img-fluid">
        </div>
        <div class="col-8 ml-3">
            <p class="h4">{{ order.ten }}x{{ order.quantity.quanity }}</p>
            <div class="row">
                <div class="col-3 tag">{{ tag.danhmuc }}</div>
                <div class="col-3 tag">{{ tag.mau }}</div>
                <div class="col-3 tag">{{ tag.chatlieu }}</div>
            </div>
            <p class="h5 price">Giá: {{ order.price }}VND</p>
        </div>
    </div>
</template>
<style scoped>
.order-cart {
    position: relative;
}

img {
    position: absolute;
    top: 12.5%;
    border-radius: 10px;
}

.tag {
    border: 1px solid black;
    margin-left: 10px;
    text-align: center;
    border-radius: 10px;
    color: white;
    background-color: darkslategray;
    cursor: pointer;
}
</style>
<script>
import productService from '../services/product.service';
export default {
    props: {
        order: { type: Object, required: true }
    },
    data() {
        return {
            image: '',
            tag: {}
        }
    },
    methods: {
        async getOrderItem() {
            var product = await productService.get(this.order.id)
            product = product[0]
            this.image = product.hinhanh[0].data
            this.tag.danhmuc = product.danhmuc[0].ten
            this.tag.mau = this.order.detail.mau
            this.tag.chatlieu = this.order.detail.chatlieu[0].ten
        },
        refersh() {
            this.getOrderItem()
        }
    },
    mounted() {
        this.refersh()
    }
}
</script>