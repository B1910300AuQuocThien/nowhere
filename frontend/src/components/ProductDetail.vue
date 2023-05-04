<script>

export default {
    props: {
        products: { type: Object },
        quantity: { type: Object, default: 0 }
    },
    data() {
        return {
            detail: {},
            index: 0,
            quantityLocal: this.quantity
        }
    },
    emits: ["addtoCard:productID"],
    methods: {
        updateIndex(index) {
            this.detail = this.products.chitiet[index]
            console.log(this.detail)
            return this.detail
        },
        refersh() {
            this.updateIndex()
        },
        addToCart() {
            this.$emit("addtoCard:productID", { id: this.products.masp, ten: this.products.ten, detail: this.detail, quantity: this.quantityLocal, })
        }
    },
}
</script>


<template>
    <div v-if="products" class="mx-5 row ">
        <div class="col-6">
            <img :src="`data:jpg;base64, ${products.hinhanh[0].data}`" alt="" class="img-fluid">
        </div>
        <div class="product-info col-6">
            <h3>{{ products.ten }}</h3>
            <i class="fa fa-star mr-1" style="color: yellow;"></i>
            <i class="fa fa-star mr-1" style="color: yellow;"></i>
            <i class="fa fa-star mr-1" style="color: yellow;"></i>
            <i class="fa fa-star mr-1" style="color: yellow;"></i>
            <i class="fa fa-star" style="color: yellow;"></i>
            <h4>Mô tả: {{ products.mota }}</h4>
            <div>
                <h4 class="mt-2">Chất liệu</h4>
                <div class="row" style="margin-left: 1px;">
                    <div v-for="(chitiet, index) in products.chitiet" class="mr-2">
                        <button class="btn btn-outline-dark" style="width: 90px;" @click="updateIndex(index)">
                            {{ chitiet.chatlieu[0].ten }}
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="detail">
                <div class="">
                    <div class="mt-2 ml-2 h4">Màu: {{ detail.mau }}</div>
                </div>
                <div class="">
                    <div class="ml-2 mt-2 h4">Trọng lượng: {{ detail.trongluong }} kg</div>
                </div>

                <div class="row my-3">
                    <h4 class="ml-2 col-5">Giá: {{ detail.giahientai }} VND</h4>
                    <div class="form-outline col-7 row">
                        <label class="form-label col-5 h4">Số lượng</label>
                        <input type="number" class="form-control col-6" v-model="quantityLocal.quanity" min="1" />
                    </div>
                </div>
                <button class="col-4 btn btn-dark ml-2" @click="addToCart">Thêm vào giỏ hàng</button>
            </div>

        </div>
    </div>
</template>
