<template>
    <div class="row">
        <nav class="mt-2 col-2 ml-3">
            <ul class="nav nav-treeview nav-item menu-open nav nav-pills nav-sidebar flex-column">
                <!-- <li class="nav-item">
                    <router-link to="" class=" btn btn-dark mb-2" style="width: 200px;">
                        <p>Quản lí sản phẩm</p>
                    </router-link>
                </li> -->
                <li class="nav-item">
                    <router-link :to="{
                        name: 'quanlidonhang'
                    }" class=" btn btn-dark mb-2" style="width: 200px;">
                        <p>Quản lí đơn hàng</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'quanlidanhmuc' }" class=" btn btn-dark mb-2" style="width: 200px;">
                        <p>Quản lí danh mục</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'quanlinguoidung' }" class=" btn btn-dark mb-2" style="width: 200px;">
                        <p>Quản lí người dùng</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'quanlidanhgia' }" class=" btn btn-dark mb-2" style="width: 200px;">
                        <p>Quản lí đánh giá</p>
                    </router-link>
                </li>

            </ul>
        </nav>
        <div class="col-9 mt-2">
            <router-view></router-view>
        </div>
    </div>
    <!-- <ProductList :product="filteredProduct" @delete:productId="deleteProduct" /> -->
</template>

<style>
.adminpanel {
    position: fixed;
    bottom: 0px;
    width: 100%;
}
</style>

<script>
import Header from '../../components/admin/Header.vue';
import ProductList from '../../components/ProductList.vue';
import ProductService from '../../services/product.service'
export default {
    components: {
        ProductList,
        Header
    },

    // props: {
    //     id: { type: String, required: true }
    // },

    data() {
        return {
            product: [],
            activeIndex: ''
        }
    },

}
</script>

