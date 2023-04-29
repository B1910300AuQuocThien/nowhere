<template>
    <div class="row">
        <div class="col-3 d-flex flex-column mt-5">
            <button class="btn btn-primary w-50 mx-auto my-2">Phân Loại</button>
            <button class="btn btn-primary w-50 mx-auto my-2">Danh mục</button>
            <button class="btn btn-primary w-50 mx-auto my-2">Chất Liệu</button>
            <button class="btn btn-primary w-50 mx-auto my-2" @click="goBack">Quay về</button>

        </div>
        <div class="col-9">
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
        async refeshList() {
            const value = this.$route.params.id
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
            this.refeshList()
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
            this.refeshList()
        }
    },
    mounted() {
        this.refeshList()
    }

}
</script>