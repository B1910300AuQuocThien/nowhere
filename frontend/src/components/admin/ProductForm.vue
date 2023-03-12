<template>
    <Form @submit="addProduct" :validation-schema="ProductFormSchema" class="w-50 p-3 mx-auto border rounded shadow"
        enctype="multipart/form-data">
        <div class="row ">
            <div class="form-group col-8">
                <label for="ten">Tên sản phẩm</label>
                <input name="ten" type="text" class="form-control" v-model="productLocal.ten" />
            </div>

            <div class="form-group col-4">
                <label for="img">Ảnh sản phẩm</label>
                <input name="img" type="file" @change="handlUploadImg" />
            </div>
        </div>
        <div class="row">
            <div class="form-group col-3">
                <label for="gia">Giá sản phẩm</label>
                <input name="gia" type="text" class="form-control" v-model="productLocal.giahientai" />
            </div>

            <div class="form-group col-3">
                <label for="sl">Số Lượng</label>
                <input name="sl" type="number" class="form-control" v-model="productLocal.soluong" />
            </div>

            <div class="form-group col-3">
                <label for="tl">Trọng Lượng</label>
                <input name="tl" type="number" class="form-control" v-model="productLocal.trongluong" />
            </div>

            <div class="form-group col-3">
                <label for="ms">Màu Sắc</label>
                <input name="ms" type="text" class="form-control" v-model="productLocal.mausac" />
            </div>
        </div>

        <div class="row">
            <div class="form-group col-3">
                <label for="tt">Trạng thái</label>
                <select name="tt" class="form-select form-select-lg form-control" v-model="productLocal.trangthai">
                    <option value="true">Hiện</option>
                    <option value="false">Ẩn</option>
                </select>
            </div>

            <div class="form-group col-3">
                <label for="dm" class="form-label">Danh mục</label>
                <select class="form-select form-select-lg form-control" name="dm" v-model="productLocal.danhmuc">
                    <option v-for="category in categorys" :value="category.madanhmuc">{{ category.tendanhmuc }}
                    </option>
                    <option value="">
                        <router-link :to="{
                            name: 'themmoi'
                        }">Thêm...</router-link>
                    </option>

                </select>
            </div>

            <div class="form-group col-3">
                <label for="plxe">Phân loại xe</label>
                <select name="plxe" class="form-select form-select-lg form-control" v-model="productLocal.maphanloai">
                    <option v-for="classify in classifys" :value="classify.maphanloai">{{ classify.tenphanloai }}</option>
                    <option value="">
                        <router-link :to="{
                            name: 'themmoi'
                        }">Thêm...</router-link>
                    </option>
                </select>
            </div>

            <div class="form-group col-3">
                <label for="cl">Chất Liệu</label>
                <select name="cl" class="form-select form-select-lg form-control" v-model="productLocal.chatlieu">
                    <option v-for="material in materials" :value="material.machatlieu">{{ material.tenchatlieu }}</option>
                    <option value="">
                        <router-link :to="{
                            name: 'themmoi'
                        }">Thêm...</router-link>
                    </option>
                </select>
            </div>
        </div>

        <div class="form-group">
            <label for="" class="form-label">Mô tả sản phẩm</label>
            <input type="textarea" class="form-control" v-model="productLocal.mota">
        </div>

        <div class=" form-group text-center">
            <button class="btn btn-primary" @click="addProduct">THÊM</button>
        </div>

        <div v-if="productLocal._id">
            <button class="btn btn-danger">XÓA</button>
        </div>
    </Form>
</template>

<script>
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'

export default {
    components: {
        Form,
        Field,
        ErrorMessage
    },

    emits: ["submit:product"],
    props: {
        product: { type: Object, require: true },
        categorys: { type: Object, require: true },
        classifys: { type: Object, require: true },
        materials: { type: Object, require: true }
    },
    data() {
        const ProductFormSchema = yup.object().shape({
            ten: yup
                .string()
                .required("tên phải có")
                .min(2, "tên phải có ít nhất hai kì tự")
                .max(50, "tên có nhiều nhất 50 kí tự"),

            gia: yup
                .number()
                .required("sản phẩm phải có giá")
                .min(1000, "giá thấp nhất là 1000 "),

            sl: yup
                .number()
                .required("sản phẩm phải có số lượng"),

            tt: yup
                .boolean()
                .required("sản bắt buộc ẩn hoặc hiện")
        })
        return {
            productLocal: this.product,
            ProductFormSchema,
            image: {}
        }
    },
    methods: {
        async addProduct() {
            this.$emit("submit:product", { product: this.productLocal, image: this.image })

        },
        handlUploadImg(event) {
            this.image = event.target.files[0]
            // console.log(this.image)
        }
    },
}
</script>