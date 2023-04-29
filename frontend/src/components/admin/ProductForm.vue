<template>
    <Form @submit="addProduct" :validation-schema="ProductFormSchema" class="w-50 p-3 mx-auto border rounded shadow"
        enctype="multipart/form-data">
        <div class="row ">
            <div class="form-group col-4">
                <label for="ten">Tên sản phẩm</label>
                <input name="ten" type="text" class="form-control" v-model="productLocal.ten" />
            </div>
            <div class="form-group col-3">
                <label for="tt">Trạng thái</label>
                <select name="tt" class="form-select form-select-lg form-control" v-model="productLocal.trangthai">
                    <option value="true">Hiện</option>
                    <option value="false">Ẩn</option>
                </select>
            </div>
            <div class="form-group col-4">
                <label for="img">Ảnh sản phẩm</label>
                <input name="img" type="file" @change="handlUploadImg" />
            </div>
        </div>
        <div class="form-group">
            <label for="" class="form-label">Mô tả sản phẩm</label>
            <input type="textarea" class="form-control" v-model="productLocal.mota">
        </div>

        <div v-if="materialDetails">
            <div v-for="materialDetail in materialDetails">
                <div class="row" id="chatlieu">
                    <div class="form-group col-3">
                        <label for="cl">Chất Liệu</label>
                        <select name="cl" class="form-select form-select-lg form-control" v-on:change="changeRoute($event)"
                            v-model="materialDetail.tenchatlieu">
                            <option v-for="material in materials" :value="material.ma">{{ material.ten }}</option>
                            <option value="chatlieu">Thêm... </option>
                        </select>
                    </div>
                    <div class="form-group col-3">
                        <label for="cl">Giá</label>
                        <input type="number" class="form-control" v-model="materialDetail.giahientai">
                    </div>
                    <div class="form-group col-3">
                        <label for="sl">Số Lượng</label>
                        <input name="sl" type="number" class="form-control" min="0" v-model="materialDetail.soluong" />
                    </div>
                    <div class="form-group col-3">
                        <label for="tl">Trọng Lượng</label>
                        <input name="tl" type="number" class="form-control" min="0.1" v-model="materialDetail.trongluong" />
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-3">
                        <label for="ms">Màu Sắc</label>
                        <input name="ms" type="text" class="form-control" v-model="materialDetail.mau" />
                    </div>
                    <div class="form-group col-3">
                        <label for="plxe">Phân loại xe</label>
                        <select name="plxe" class="form-select form-select-lg form-control"
                            v-on:change="changeRoute($event)" v-model="materialDetail.phanloai">
                            <option v-for="classify in classifys" :value="classify.ma">{{ classify.ten }}</option>
                            <option value="phanloai">
                                Thêm...
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">

            <div class="form-group col-3">
                <button class="btn btn-primary form-control" @click="addCategory">THÊM CHI TIẾT</button>
            </div>
            <div class=" form-group col-4">
                <button class="btn btn-primary" @click="addProduct">THÊM SẢN PHẨM</button>
            </div>
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
        ErrorMessage,
    },

    emits: ["submit:product"],
    props: {
        product: { type: Object, require: true },
        categorys: { type: Object, require: true },
        classifys: { type: Object, require: true },
        materials: { type: Object, require: true },
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
            image: {},
            elements: [1],
            materialDetails: []
        }
    },
    methods: {

        async addProduct() {
            this.productLocal.danhmuc = this.$route.params.id
            this.$emit("submit:product", { product: this.productLocal, image: this.image, productDetail: this.materialDetails })

        },
        handlUploadImg(event) {
            if (!event.target.files[0]) {
                alert('them hinh vo')
            }
            this.image = event.target.files[0]
            // console.log(this.image)
        },
        changeRoute(e) {
            if (e.target.value == "danhmuc" || e.target.value == "chatlieu" || e.target.value == "phanloai") {
                this.$router.push({
                    name: "themmoidanhmuc",
                    params: { id: e.target.value }
                })
            }
        },
        addCategory() {
            this.materialDetails.push({
                tenchatlieu: '',
                giahientai: '',
                soluong: '',
                trongluong: '',
                mausac: '',
                phanloai: ''

            })
        }

    },
}
</script>