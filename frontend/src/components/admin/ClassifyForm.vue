<template>
    <div class="col-4">
        <form @submit="addClassify">
            <p class="h3 text-center mb-3"> THÊM {{ name }}</p>
            <div class="form-group">
                <label for="ma" class="form-label">Mã {{ name.toLowerCase() }}</label>
                <input type="text" class="form-control w-75" v-model="classify.ma">
            </div>

            <div class="form-group">
                <label for="ten" class="form-label">Tên {{ name.toLowerCase() }}</label>
                <input type="text" class="form-control w-75" v-model="classify.ten">
            </div>

            <div class="form-group">
                <button class="btn btn-primary">THÊM</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        name: { type: String, require: true },
        classify: { type: Object, require: true }
    },

    emits: ["submit:classify"],

    methods: {
        addClassify() {
            this.$emit("submit:classify", this.classify)
        }
    }
}
</script>