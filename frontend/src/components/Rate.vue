<template>
    <div v-if="rates">
        <div v-for="(rate, index) in rates">
            <div class="">
                <div class="ml-1 border p-2 rounded mb-2 shadow-sm">
                    <div class="row">
                        <h5 class="mb-0 ml-3"><a href="#">{{ rate.tenkh }}:</a></h5>
                    </div>
                    <h6 class="ml-2 mt-1">{{ rate.noidung }}</h6>
                    <div class="h6 ml-2 mt-3">
                        <i class="fa-solid fa-heart" style="color: #ff0000;" v-if="heart" @click="switchHeart(index)"></i>
                        <i class="fa-solid fa-heart" v-else @click="switchHeart(index)"></i>
                        Thích
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        rates: { type: Object }
    },
    data() {
        return {
            heart: false
        }
    },
    methods: {
        switchHeart() {
            this.heart ? this.heart = false : this.heart = true
        }
    }
}
</script>