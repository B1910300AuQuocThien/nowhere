<script>
import Rate from './Rate.vue'
export default {
    components: {
        Rate
    },
    props: {
        products: { type: Object },
        rate: { type: Array }
    },
    data() {
        return {
            quantity: 0,
            detail: {},
            index: 0,
            content: '',
            user: this.$cookies.get('user'),

        }
    },
    emits: ["addtoCard:productID", "addRate:rate"],
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
            this.$emit("addtoCard:productID", { id: this.products.masp, ten: this.products.ten, detail: this.detail, quantity: this.quantity, })
        },
        plus() {
            if (this.quantity == this.detail.soluong) {
                this.quantity = this.detail.soluong
            }
            else {
                this.quantity++
            }
        },
        minus() {
            if (this.quantity <= 1) {
                this.quantity = 1
            } else {
                this.quantity--
            }
        },
        addRate() {
            const date = new Date();
            let currentDay = String(date.getDate()).padStart(2, '0');
            let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
            let currentYear = date.getFullYear();
            let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
            console.log(currentDate)

            this.$emit("addRate:rate", { tenkh: this.user[0].tenkh, noidung: this.content, masp: this.products.masp, ngay: currentDate })
        }
    },
}
</script>


<template>
    <div>
        <div v-if="products" class="mx-5 row border shadow-sm rounded p-3">
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
                <div>Mô tả: {{ products.mota }}</div>
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
                            <button class="minus-btn btn border mr-1" type="button" @click="minus">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            <input type="text" class="form-control col-3" :value="quantity" min="1" :max="detail.soluong">
                            <button class="plus-btn btn border ml-1" type="button" @click="plus">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="ml-2 h4">Còn {{ detail.soluong }} sản phẩm</div>
                    <button class="col-4 btn btn-dark ml-2" @click="addToCart">Thêm vào giỏ hàng</button>
                </div>
            </div>
        </div>

        <div class="mx-5 mt-3 border shadow-sm rounded p-3" v-if="products">
            <div class="h4 text-center">ĐÁNH GIÁ SẢN PHẨM</div>
            <div>
                <Rate :rates="products.danhgia" />
            </div>
            <div class="row mt-3 ml-2">
                <input type="text" class="form-control col-6" v-model="content">
                <button class="btn btn-primary px-4 ml-2 " @click="addRate">Gửi</button>
            </div>
        </div>

    </div>
</template>

<style scoped>
.minus-btn img {
    margin-bottom: 3px;
}

.plus-btn img {
    margin-top: 2px;
}

.classActive {
    background: black;
    color: white;
}

button:focus,
input:focus {
    outline: 0;
}
</style>
