<template>
    <p>hi</p>
    <div v-if="product" class="row">
        <div>

        </div>
        <div>

        </div>
    </div>
</template>
<script>
import productService from '../services/product.service';

export default {
    props: {
        product: { type: Object, }
    },
    emits: ["addtoCard:productID"],

}
</script>