<template>
    <div class="container">
        <div class="title">
            <h2>THÔNG TIN ĐƠN HÀNG</h2>
        </div>
        <div class=" d-flex justify-content-between">
            <form action="" method="" class="col-5">
                <div class="form-group">
                    <label class="form-label">Tên khách hàng</label>
                    <input class="form-control" type="text" v-model="user[0].tenkh">
                </div>

                <div class="row">
                    <div class="col-6 form-group">
                        <label class="form-label">Số điện thoại </label>
                        <input class="form-control" type="tel" v-model="user[0].sdt" required>
                    </div>
                    <div class="col-6 form-group">
                        <label class="form-label">Email</label>
                        <input class="form-control" type="email" v-model="user[0].email">
                    </div>
                </div>
                <div class="form-group row ml-2">
                    <input type="radio" class="col-1 form-check-input" name="address" v-on:change="useAnotherAddress"
                        checked>
                    <label class="form-label col-10 h6">
                        {{ addressDetail }}
                    </label>
                </div>
                <div class="form-group row ml-2">
                    <input type="radio" class="col-1 form-check-input" v-on:change="useAnotherAddress" name="address">
                    <label class="form-check-label col-10">
                        Sử dụng một địa chỉ khác
                    </label>
                </div>

                <div class="form-group" :hidden=another>
                    <div class="row">
                        <div class="form-group col-4">
                            <label class="form-label">Tỉnh</label>
                            <select class="form-select form-select form-control" id="city" v-model="addressLocal.tinh">
                                <option value="">Tỉnh Thành</option>
                            </select>
                        </div>

                        <div class="form-group col-4">
                            <label class="form-label">Quận Huyện</label>
                            <select class="form-select form-select form-control" id="districts"
                                v-model="addressLocal.huyen">
                                <option value="">Quận Huyện</option>
                            </select>
                        </div>

                        <div class="form-group col-4">
                            <label class="form-label">Xã Phường</label>
                            <select class="form-select form-select form-control" id="wards" v-model="addressLocal.xa">
                                <option value="">Xã Phường</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Tên đường</label>
                    <input class="form-control" type="text" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary" @click="orderNow">ĐẶT HÀNG</button>
                </div>
            </form>

            <div class="border col-7 ml-5 mt-4">
                <div v-for="order in orders">
                    <OrderTitle :order="order" />
                </div>
                <div class="h4 mt-2" style="position: fixed; bottom: 0px">Thành tiền: {{ almount }}VND</div>
            </div>
        </div>
    </div>
</template>

<style></style>

<script>
import axios from 'axios';
import OrderTitle from './OrderTitle.vue';
export default {
    components: {
        OrderTitle
    },
    props: {
        address: { type: Object, required: true },
        addressDetail: { type: String, required: true },
        orders: { type: Object, required: true },
        almount: { type: Number, required: true },
        user: { type: Object, required: true }
    },
    data() {
        return {
            addressLocal: this.address,
            another: false,
        }
    },
    emits: ["add:order"],
    methods: {
        useAnotherAddress() {
            this.another ? this.another = false : this.another = true
            // console.log(this.another)
        },
        resetValue() {
            this.another = true
        },
        orderNow() {
            var user = this.user[0]
            var order = this.orders
            var address = {}
            var almount = this.almount
            if (!this.another) {
                address = this.address
            }
            else {
                address = this.user[0].diachi
            }
            console.log(address)

            this.$emit("add:order", { user: user.makh, orderList: order, address: address, almount: almount })
        }
    },
    mounted() {
        this.resetValue()
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