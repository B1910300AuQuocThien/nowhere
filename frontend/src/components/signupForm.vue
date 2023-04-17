<template>
    <div class="row">
        <div class="ml-2 col-4">
            <Form class=" border p-3 w-75 rounded shadow" @submit="checkAcc">
                <div class="form-group">
                    <label for="username" class="form-label">Gmail: </label>
                    <input type="text" class="form-control" v-model="accountLocal.gmail">
                </div>

                <div class="form-group">
                    <label for="password" class="form-label">Mật khẩu: </label>
                    <input type="password" name="password" class="form-control" v-model="accountLocal.password">
                </div>

                <div class="form-group">
                    <label for="re_password" class="form-label">Nhập lại mật khẩu: </label>
                    <input type="password" name="re_password" class="form-control" v-model="accountLocal.retryPassword">
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-dark form-control" @click="checkAcc">Tiếp</button>
                </div>
                <div class="text-center my-3">HOẶC</div>
                <div class="form-group row d-flex justify-content-around">
                    <button class="btn btn-primary  col-5" style="background-color: #3b5998;" href="#!" role="button">
                        <i class="fab fa-facebook me-2 mt-1"></i>
                        Facebook
                    </button>
                    <button class="btn btn-primary col-5" style="background-color: #dd4b39;" href="#!" role="button">
                        <i class="fab fa-google me-2 mt-1"></i>
                        Gmail
                    </button>
                </div>
            </Form>
        </div>

        <div class="col-5">
            <Form class="p-3 border rounded shadow" @submit="submitCus">
                <div class="row">
                    <div class="form-group col-4">
                        <label class="form-label">Số điện thoại</label>
                        <input class="form-control" type="text" v-model="customerLocal.numberphone">
                    </div>

                    <div class="form-group col-4">
                        <label class="form-label">Giới tính</label>
                        <select class="form-select form-select-lg form-control" v-model="customerLocal.genders">
                            <option class="form-control" value="Nam">Nam</option>
                            <option class="form-control" value="Nữ">Nữ</option>
                        </select>
                    </div>

                    <div class="form-group col-4">
                        <label class="form-label">Ngày sinh</label>
                        <input class="form-control" type="text" v-model="customerLocal.birthdays">
                    </div>
                </div>


                <div class="form-group">
                    <div class="row">
                        <div class="form-group col-4">
                            <label class="form-label">Thành Phố</label>
                            <input class="form-control" type="text">
                        </div>

                        <div class="form-group col-4">
                            <label class="form-label">Quận / Huyện</label>
                            <input class="form-control" type="text">
                        </div>

                        <div class="form-group col-4">
                            <label class="form-label">Xã / Phường</label>
                            <input class="form-control" type="text">
                        </div>
                    </div>
                </div>

                <div class="form-group d-flex justify-content-around">
                    <button class="btn btn-dark form-control col-5">Quay lại</button>
                    <button type="submit" class="btn btn-dark form-control col-5" @click="submitCus">Tiếp</button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import { Form } from 'vee-validate'
import CustomerService from '../services/customer.service'
export default {
    components: {
        Form
    },

    props: {
        customer: { type: Object, require: true },
        address: { type: Object, require: true },
        account: { type: Object, require: true }
    },

    data() {
        return {
            customerLocal: this.customer,
            addressLocal: this.address,
            accountLocal: this.account
        }
    },

    emits: ["submit:account", "submit:customer"],

    methods: {
        async checkAcc() {
            if (this.accountLocal.password === this.accountLocal.retryPassword) {
                this.$emit("submit:account", this.accountLocal)
            }
        },

        async submitCus() {
            this.$emit("submit:customer", { account: this.accountLocal, customerDetail: this.customerLocal, address: this.addressLocal })
        }
    }

}
</script>