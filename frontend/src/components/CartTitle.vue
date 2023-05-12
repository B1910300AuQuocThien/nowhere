<script>
import productService from '../services/product.service';
export default {
    props: {
        cart: { type: Object, required: true }
    },
    data() {
        return {
            quantity: this.cart.quantity,
            product: {},
            price: 0,
            image: '',
            tag: {},
            active: false,
            classActive: ''
        }
    },
    emits: ["delete:product", "add:product"],
    methods: {
        async getProduct() {
            this.product = await productService.get(this.cart.id)
            this.product = this.product[0]
            this.image = this.product.hinhanh[0].data
            this.tag.danhmuc = this.product.danhmuc[0].ten
            this.tag.mau = this.cart.detail.mau
            this.tag.chatlieu = this.cart.detail.chatlieu[0].ten
            console.log(this.product)
        },

        refresh() {
            this.getProduct()
        },

        getPrice() {
            this.price = this.quantity * this.cart.detail.giahientai
        },
        plus() {
            this.quantity++
            this.getPrice()
        },
        minus() {
            this.quantity--
            this.getPrice()
        },
        deleteProduct() {
            this.$emit("delete:product", this.cart.detail.machitiet)
        },
        addToPreOder() {
            if (this.active == false) {
                this.active = true
                this.classActive = 'active'
            }
            else {
                this.active = false
                this.classActive = ""
            }

            console.log(this.active)
            this.cart.quantity = this.quantity
            this.cart.price = this.price
            this.$emit("add:product", this.cart)
        },
        resetActive() {
            this.active = false
        }
    },

    mounted() {
        this.refresh()
        this.getPrice()
        this.resetActive()
    },




}
</script>
<template>
    <div>
        <div v-if="cart">
            <div class="shopping-cart" :class="classActive">
                <div class="item column">
                    <div class="row">
                        <div class="col-5">
                            <!-- <img src="../assets/8d0233044585f2992e20e012e15e4aaf.jpg" alt="" class="img-fluid w-75" /> -->
                            <img :src="`data:jpg;base64,${image}`" alt="" class="img-fluid">
                            <!-- <p>{{ product.hinhanh }}</p> -->
                        </div>
                        <div class="col-5">
                            <div class="h5 text">{{ product.ten }}</div>
                            <div class="">{{ tag.danhmuc }}</div>
                            <div class="">{{ tag.mau }}</div>
                            <div class="">{{ tag.chatlieu }}</div>
                        </div>
                        <div class="option column">
                            <div class="delete btn btn-danger" @click="deleteProduct">
                                Xóa
                            </div>
                            <div class="select btn btn-primary" @click="addToPreOder" v-if="!active">
                                Chọn
                            </div>
                            <div class="select btn btn-primary" @click="addToPreOder" v-else>
                                Bỏ
                            </div>
                        </div>
                    </div>
                    <div class="row ">
                        <div class="quantity col-6">
                            <button class="minus-btn" type="button" @click="minus">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            <input type="text" name="name" :value="`${quantity}`" class="border rounded-pill">
                            <button class="plus-btn" type="button" @click="plus">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        <div class="total-price text-end col-6 h5">Giá: {{ price }} VND</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.shopping-cart {
    width: 460px;
    height: 220px;
    margin: 10px 15px;
    padding: 10px;
    background: #ffffff;
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.5);
    border-radius: 6px;
}

.active {
    background-color: rgba(67, 180, 67, 0.87);
    color: white;
}

.is-active {
    animation-name: animate;
    animation-duration: .8s;
    animation-iteration-count: 1;
    animation-timing-function: steps(28);
    animation-fill-mode: forwards;
}

.text {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
}

@keyframes animate {
    0% {
        background-position: left;
    }

    50% {
        background-position: right;
    }

    100% {
        background-position: right;
    }
}

.option {
    position: relative;
}

.delete {
    position: absolute;
    width: 78.3281px;
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.5);
}

.select {
    position: absolute;
    top: 50px;
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.5);
    width: 78.3281px;
}

.quantity input {
    -webkit-appearance: none;
    border: none;
    text-align: center;
    width: 100px;
    font-size: 16px;
    color: #43484D;
    font-weight: 300;
    border-radius: 3px;
    margin: 0 5px;

}

button[class*=btn] {
    background-color: #E1E8EE;
    border-radius: 6px;
    border: none;
    cursor: pointer;
}

.minus-btn img {
    margin-bottom: 3px;
}

.plus-btn img {
    margin-top: 2px;
}

button:focus,
input:focus {
    outline: 0;
}

.total-price {
    text-align: center;
    color: #000000;
}
</style>

