<template>
    <div class="column px-2">
        <div class="navbar row">
            <div class=" text-center col-1">
                <router-link :to="{
                    name: 'trangchu'
                }">
                    <img src="../assets/logo.svg" class="img-fluid" alt="">
                </router-link>
            </div>
            <div class="form-group row col-6 text-center">
                <input type="text" name="search" class="form-control col-8">
                <button class="btn btn-dark col-3 ml-1">tìm kiếm</button>
            </div>

            <div class="col-3 text-center d-flex justify-content-end form-group" v-if="!userInfor">
                <router-link :to="{ name: 'dangki' }" tag="button" class="btn btn-dark ml-5">ĐĂNG KÍ</router-link>
                <router-link :to="{ name: 'dangnhap' }" tag="button" class="btn btn-dark ml-1">ĐĂNG NHẬP</router-link>
            </div>

            <div class="col-3  text-center d-flex justify-content-end form-group" v-else>
                <button class="btn btn-dark ml-1 py-1">
                    {{ user[0].tenkh }}
                </button>
                <button class="btn btn-dark ml-1" @click="logout">
                    ĐĂNG XUẤT
                </button>
            </div>
        </div>
        <div class="mb-1 row " v-if="user[0].admin == false">
            <div class="col-2"></div>
            <div class="ml-1 row">
                <div class="ml-3" v-for="category in categorys">
                    <router-link :to="{
                        name: 'sanphamtheodanhmuc',
                        params: { id: category.ma }
                    }" tag="button" class="btn btn-dark ">
                        {{ category.ten }}
                    </router-link>
                </div>
                <div class="">
                    <router-link :to="{ name: 'giohang' }" tag="button" class="btn btn-dark ml-3">
                        Giỏ Hàng
                    </router-link>
                    <router-link :to="{ name: 'donhang' }" tag="button" class="btn btn-dark ml-3">
                        Đơn Hàng
                    </router-link>
                </div>
            </div>
        </div>
        <div class="mb-1 row " v-if="user[0].admin == true">
            <div class="col-2"></div>
            <div class="ml-1 row">
                <div class="ml-3" v-for="category in categorys">
                    <router-link :to="{
                        name: 'sanpham',
                        params: { id: category.ma }
                    }" tag="button" class="btn btn-dark ">
                        {{ category.ten }}
                    </router-link>
                </div>
                <!-- <div class="">
                    <router-link :to="{ name: 'giohang' }" tag="button" class="btn btn-dark ml-3">
                        Giỏ Hàng
                    </router-link>
                    <router-link :to="{ name: 'donhang' }" tag="button" class="btn btn-dark ml-3">
                        Đơn Hàng
                    </router-link>
                </div> -->
            </div>
        </div>
        <hr>
    </div>
</template>

<style scoped>
.cart {
    position: relative;
}

.navbar {
    padding: 0 5px;
    margin-top: 10px;
}

.cart::before {
    position: absolute;
    left: 40%;
    bottom: 70%;
    content: "";
    height: 8px;
    border: 8px solid red;
    border-radius: 100%;
}
</style>

<script>
export default {
    props: {
        categorys: { type: Array, default: [] },
    },
    data() {
        return {
            user: ''
        }
    },
    methods: {
        async logout() {
            this.$cookies.remove('user')
            await this.$router.push({ name: 'dangnhap' })
            location.reload()
        },
        getUserInfo() {
            this.user = this.$cookies.get('user')
            console.log(this.user)
        }
    },
    computed: {
        userInfor() {
            this.getUserInfo()
            return this.user
        }
    },


}
</script>