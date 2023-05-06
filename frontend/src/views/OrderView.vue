<style>
@import '../assets/admin/adminlte.min.css';
</style>
<template>
    <div class="row">
        <nav class="mt-2 col-2 ml-3">
            <ul class="nav nav-treeview nav-item menu-open nav nav-pills nav-sidebar flex-column">
                <li class="nav-item">
                    <router-link to="/donhang/choxacnhan" class=" btn btn-dark mb-2" style="width: 200px;">
                        <p>Chờ Xác Nhận</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/donhang/cholayhang" class=" btn btn-dark mb-2" style="width: 200px;">
                        <p>Chờ Lấy Hàng</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/donhang/dangvanchuyen" class=" btn btn-dark mb-2" style="width: 200px;">
                        <p>Đang Vận Chuyển</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/donhang/thanhcong" class=" btn btn-dark mb-2" style="width: 200px;">
                        <p>Giao Thành Công</p>
                    </router-link>
                </li>
            </ul>
        </nav>
        <div class="col-9 mt-2">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import '../assets/admin/jquery.min.js';
import '../assets/admin/adminlte.js';
export default {
}
</script>