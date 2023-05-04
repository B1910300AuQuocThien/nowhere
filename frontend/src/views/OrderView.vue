<style>
@import '../assets/admin/adminlte.min.css';
</style>
<template>
    <div class="row">
        <nav class="mt-2 col-2 ml-3">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-item menu-open">
                    <a href="#" class="nav-link active">
                        <i class="nav-icon fas fa-tachometer-alt"></i>
                        <p>
                            Trạng Thái
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <router-link to="/donhang/choxacnhan" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Chờ Xác Nhận</p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/donhang/cholayhang" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Chờ Lấy Hàng</p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/donhang/dangvanchuyen" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Đang Vận Chuyển</p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/donhang/thanhcong" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Giao Thành Công</p>
                            </router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        <div class="border col-9 rounded">
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