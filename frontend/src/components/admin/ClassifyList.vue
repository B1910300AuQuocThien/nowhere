<template>
    <div class="w-75 mx-auto">
        <p class="h3 text-center mb-3">{{ name }}</p>
        <table class="table">
            <thead class="text-center bg-light border">
                <tr>
                    <td>Mã {{ name.toLowerCase() }}</td>
                    <td>Tên {{ name.toLowerCase() }}</td>
                    <td>Sửa</td>
                    <td>Xóa</td>
                </tr>
            </thead>
            <tbody class="text-center border">
                <tr class="" v-for="val in values ">
                    <td class=""> {{ val.ma }}</td>
                    <td class="">{{ val.ten }}</td>
                    <td>
                        <button class="btn btn-primary">SỬA</button>
                    </td>
                    <td>
                        <button class="btn btn-danger" @click="deleteClassify(val._id)">XÓA</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="w-75 mx-auto">
        <form class="form-inline  " @submit="addClassify">
            <input type="text" class="form-control col-3 mr-2" :placeholder="`Mã ${name.toLowerCase()}`"
                v-model="classifyLocal.ma">
            <input type="text" class="form-control col-3 mr-2" :placeholder="`Tên ${name.toLowerCase()}`"
                v-model="classifyLocal.ten">
            <button @click="addClassify" class="btn btn-primary col-3 mr-2">Thêm {{ name.toLowerCase() }}</button>
        </form>
    </div>
</template>

<script>
export default {
    components: {
    },
    props: {
        values: { type: Object, require: true },
        name: { type: String, require: true },
        classify: { type: Object, require: true }
    },
    data() {
        return {
            classifyLocal: this.classify
        }
    },
    emits: ["submit:classify", "delete:classifyId"],
    methods: {
        addClassify() {
            this.$emit("submit:classify", { something: this.classifyLocal })
        },

        deleteClassify(id) {
            this.$emit("delete:classifyId", { id: id })
        },

    }
}
</script>