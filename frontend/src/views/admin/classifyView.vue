<template>
    <div class="">
        <div class="row col-9 mx-auto ">
            <button class="btn btn-primary mr-2" @click="get($event)" value="danhmuc">Danh mục</button>
            <button class="btn btn-primary mr-2" @click="get($event)" value="chatlieu">Chất liệu</button>
            <button class="btn btn-primary" @click="get($event)" value="phanloai">Phân loại</button>
        </div>
        <div class="ml-3">
            <ClassifyList :values="values" :name="names" @submit:classify="addClassify" :classify="classify"
                @delete:classifyId="deleteClassify" />
        </div>
    </div>
</template>
<script>
import ClassifyList from '../../components/admin/ClassifyList.vue';
import categoryService from '../../services/category.service';
import materialService from '../../services/material.service';
import classifyService from '../../services/classify.service';
export default {
    components: {
        ClassifyList
    },
    data() {
        return {
            values: {},
            names: '',
            classify: {}
        }
    },
    methods: {
        async get(e) {
            const value = e.target.value
            console.log(value)

            if (value == "danhmuc") {
                this.values = await categoryService.getAll()
                this.names = "DANH MỤC"
            }
            else {
                if (value == "chatlieu") {
                    this.values = await materialService.getAll()
                    this.names = "CHẤT LIỆU"
                }
                else {
                    if (value == "phanloai") {
                        this.values = await classifyService.getAll()
                        this.names = "PHÂN LOẠI"
                    }
                }
            }

        },

        async addClassify(emitPayload) {
            console.log(emitPayload.something)
            // alert('thien')
            const value = this.$route.params.id
            try {
                if (value == "danhmuc") {
                    await categoryService.create(emitPayload.something)
                }
                else {
                    if (value == "chatlieu") {
                        await materialService.create(emitPayload.something)
                    }
                    else {
                        if (value == "phanloai") {
                            await classifyService.create(emitPayload.something)
                        }
                    }
                }
            }
            catch (error) {
                console.log(error)
            }
            this.get()
        },

        async deleteClassify(emitPayload) {
            try {
                const value = this.$route.params.id
                const id = emitPayload.id
                if (value == "danhmuc") {
                    await categoryService.delete(id)
                }
                else {
                    if (value == "phanloai") {
                        await classifyService.delete(id)
                    }
                    else {
                        if (value == "chatlieu") {
                            await materialService.delete(id)
                        }
                    }
                }
            }
            catch (error) {
                console.log(error)
            }
            this.get()
        }
    },
    mounted() {
        this.get()
    }

}
</script>