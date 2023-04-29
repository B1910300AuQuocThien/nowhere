<template>
    <div>
        <div v-if="cart">
            <div class="shopping-cart">
                <div class="item">
                    <div class="row">
                        <div class="col-6">
                            <img src="../assets/8d0233044585f2992e20e012e15e4aaf.jpg" alt="" class="img-fluid h-75" />
                        </div>
                        <div>
                            <div class="row">
                                <div class="col-10">
                                    <div class="h5">Common Projects</div>
                                    <div class="h5">Bball High</div>
                                    <div class="h5">White</div>
                                </div>
                                <div class="button col-2 text-end">
                                    <i class="fa-solid fa-trash"></i>
                                </div>
                            </div>
                            <div class="row mt-5">
                                <div class="quantity col-9">
                                    <button class="plus-btn" type="button" name="button">
                                        <i class="fa-solid fa-plus"></i>
                                    </button>
                                    <input type="text" name="name" :value="`${cart.quantity.quanity}`">
                                    <button class="minus-btn" type="button" name="button">
                                        <i class="fa-solid fa-minus"></i>
                                    </button>
                                </div>

                                <div class="total-price col-2 h6">$549</div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    </div>
</template>
<style scoped>
.shopping-cart {
    width: 450px;
    height: 200px;
    margin: 10px 15px;
    padding: 10px;
    background: #fdfdfd;
    box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.10);
    border-radius: 6px;
}


.is-active {
    animation-name: animate;
    animation-duration: .8s;
    animation-iteration-count: 1;
    animation-timing-function: steps(28);
    animation-fill-mode: forwards;
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


.quantity input {
    -webkit-appearance: none;
    border: none;
    text-align: center;
    width: 50px;
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
    width: 83px;
    text-align: center;
    font-size: 16px;
    color: #43484D;
    font-weight: 300;
}
</style>

<script>
export default {
    props: {
        cart: { type: Object, required: true }
    }
}
</script>