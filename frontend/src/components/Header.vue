<template>
    <div class="column px-2">
        <div class="navbar row">
            <div class=" text-center col-2">
                <img src="../assets/logo.svg" class="w-50" alt="">
            </div>
            <div class="form-group row col-6 text-center">
                <input type="text" name="search" class="form-control col-8">
                <button class="btn btn-dark col-3 ml-1">tìm kiếm</button>
            </div>
            <div class="col-4 cart text-center d-flex justify-content-end form-group">
                <i class="fas fa-cart-shopping h2" id="cart"></i>
                <router-link :to="{ name: 'dangki' }" tag="button" class="btn btn-dark ml-5">ĐĂNG KÍ</router-link>
                <button class="btn btn-dark  ml-2">Đăng nhập</button>
            </div>
        </div>
        <div class="mb-1 row">
            <div class="col-2"></div>
            <div class="col-6">
                <router-link :to="{ name: 'xedap' }" tag="button" class="btn btn-dark mr-2">XE ĐẠP</router-link>
                <router-link :to="{ name: 'phutung' }" tag="button" class="btn btn-dark mr-2">PHỤ TÙNG</router-link>
                <router-link :to="{ name: 'khungsuon' }" tag="button" class="btn btn-dark mr-2">KHUNG SƯỜN</router-link>
                <router-link :to="{ name: 'phukien' }" tag="button" class="btn btn-dark mr-2">PHỤ KIỆN</router-link>
                <router-link :to="{ name: 'tuychinh' }" tag="button" class="btn btn-dark mr-2">TÙY CHỌN</router-link>
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

