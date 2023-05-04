<template>
    <div class="row" id="body">
        <div class="part-1">
            <Form class=" border p-3 rounded shadow" @submit="checkAcc">
                <div class="form-group">
                    <label for="username" class="form-label">Gmail: </label>
                    <input type="text" class="form-control" v-model="accountLocal.email">
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
                    <button type="submit" class="btn btn-dark form-control" @click="checkAcc" id="continue">Tiếp</button>
                </div>
                <div class="text-center my-3">HOẶC</div>
                <div class="form-group row d-flex justify-content-around">
                    <a class="btn btn-primary  col-5" style="background-color: #3b5998;" role="button">
                        <i class="fab fa-facebook me-2 mt-1"></i>
                        Facebook
                    </a>
                    <a @click="signupGoogle" class="btn btn-primary col-5" style="background-color: #dd4b39;" role="button">
                        <i class="fab fa-google me-2 mt-1"></i>
                        Gmail
                    </a>
                </div>
            </Form>
        </div>

        <div class="part-2">
            <Form class="p-3 border rounded shadow" @submit="submitCus">
                <div class="form-group">
                    <label class="form-label">Họ và tên</label>
                    <input class="form-control" type="text" v-model="customerLocal.name">
                </div>
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
                        <input name="age" class="form-control" type="text" v-model="customerLocal.birthdays">
                    </div>
                </div>


                <div class="form-group">
                    <div class="row">
                        <div class="form-group col-4">
                            <select class="form-select form-select-lg form-control mb-3" id="city"
                                v-model="addressLocal.tinh">
                                <option value="">Tỉnh Thành</option>
                            </select>
                        </div>

                        <div class="form-group col-4">
                            <select class="form-select form-select-lg form-control mb-3" id="districts"
                                v-model="addressLocal.huyen">
                                <option value="">Quận Huyện</option>
                            </select>
                        </div>

                        <div class="form-group col-4">
                            <select class="form-select form-select-lg form-control mb-3" id="wards"
                                v-model="addressLocal.xa">
                                <option value="">Xã Phường</option>
                            </select>
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
<style scoped src="../assets/css/signup.css"></style>

<script >

import { Form } from 'vee-validate'
import axios from 'axios';

export default {
    components: {
        Form,
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
            accountLocal: this.account,
            google: true
        }
    },

    emits: ["submit:account", "submit:customer", "signup:google"],

    methods: {
        async checkAcc() {
            if (this.accountLocal.password === this.accountLocal.retryPassword) {
                this.$emit("submit:account", { account: this.accountLocal })
            }
        },

        async submitCus() {
            // console.log(this.addressLocal)
            this.$emit("submit:customer", { account: this.accountLocal, customerDetail: this.customerLocal, address: this.addressLocal })
        },

        signupGoogle() {
            console.log(this.google)
            this.$emit("signup:google", this.google)
        }
    },
    mounted() {

        var date = document.getElementsByName("age")[0];
        // console.log(date)
        function checkValue(str, max) {
            if (str.charAt(0) !== "0" || str == "00") {
                var num = parseInt(str);
                if (isNaN(num) || num <= 0 || num > max) num = 1;
                str =
                    num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
                        ? "0" + num
                        : num.toString();
            }
            return str;
        }

        function func_1() {
            this.type = "text";
            var input = this.value;
            if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
            // console.log(input)
            var values = input.split("/").map(function (v) {
                return v.replace(/\D/g, "");
            });
            if (values[0]) values[0] = checkValue(values[0], 31);
            if (values[1]) values[1] = checkValue(values[1], 12);
            var output = values.map(function (v, i) {
                return v.length == 2 && i < 2 ? v + " / " : v;
            });
            this.value = output.join("").substr(0, 14);
        }

        function func_2() {
            this.type = "text";
            var input = this.value;
            var values = input.split("/").map(function (v, i) {
                return v.replace(/\D/g, "");
            });
            var output = "";

            if (values.length == 3) {
                var year =
                    values[2].length !== 4 ? parseInt(values[2]) + 2000 : parseInt(values[2]);
                var month = parseInt(values[0]) - 1;
                var day = parseInt(values[1]);
                var d = new Date(year, month, day);
                if (!isNaN(d)) {
                    document.getElementById("result").innerText = d.toString();
                    var dates = [d.getMonth() + 1, d.getDate(), d.getFullYear()];
                    output = dates
                        .map(function (v) {
                            v = v.toString();
                            return v.length == 1 ? "0" + v : v;
                        })
                        .join(" / ");
                }
            }
            this.value = output;
        }

        date.addEventListener("input", func_1);
        date.addEventListener("blur", func_2);


        var citis = document.getElementById("city");
        var districts = document.getElementById("districts");
        var wards = document.getElementById("wards");
        var Parameter = {
            url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
            method: "GET",
            // responseType: "application/json",
        };
        var promise = axios(Parameter);
        promise.then(function (result) {
            // console.log(result)
            renderCity(result.data);
        });

        function renderCity(data) {
            for (const x of data) {
                citis.options[citis.options.length] = new Option(x.Name, x.Id);
            }

            citis.onchange = function () {
                districts.length = 1;
                wards.length = 1;
                if (this.value != "") {
                    const result = data.filter(n => n.Id === this.value);

                    for (const k of result[0].Districts) {
                        districts.options[districts.options.length] = new Option(k.Name, k.Id);
                    }
                }
            };

            districts.onchange = function () {
                wards.length = 1;
                const dataCity = data.filter((n) => n.Id === citis.value);
                if (this.value != "") {
                    const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;

                    for (const w of dataWards) {
                        wards.options[wards.options.length] = new Option(w.Name, w.Id);
                    }
                }
            };
        }
    }

}
</script>
