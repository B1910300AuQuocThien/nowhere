import { createRouter, createWebHistory } from 'vue-router'
import adminview from '../views/admin/Adminview.vue'
import addProduct from '../views/admin/AddProduct.vue'
import classify from '../views/admin/ClassifyView.vue'
import signup from '../views/SignupView.vue'
import home from '../views/HomeView.vue'
import productdetail from '../views/ProductDetailView.vue'
import signin from '../views/SigninView.vue'
import productFilter from '../views/ProductFilterView.vue'
import cart from '../views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: "/",
      name: "",
      component: signin
    },

    {
      path: "/nowhere/trangchu",
      name: "trangchu",
      component: home
    },
    {
      path: "/giohang",
      name: "giohang",
      component: cart
    },
    {
      path: "/nowhere/trangchu/sanpham/:id",
      name: "sanphamtheodanhmuc",
      component: productFilter,
      props: true
    },
    {
      path: "/nowhere/trangchu/:id",
      name: 'chitietsanpham',
      component: productdetail,
      props: true
    },
    {
      path: "/admin",
      name: "productlist",
      component: adminview
    },
    {
      path: "/sanpham/danhmuc/:id",
      name: "sanpham",
      component: adminview,
      props: true,
    },
    {
      path: "/sanpham/tuychinh",
      name: "tuychinh",
      component: adminview
    },
    {
      path: "/dangki",
      name: "dangki",
      component: signup
    },
    {
      path: "/dangnhap",
      name: "dangnhap",
      component: signin
    },
    {
      path: "/sanpham/themmoi/:id",
      name: "themmoi",
      component: addProduct,
      props: true
    },
    {
      path: "/sanpham/themmoi/danhmuc",
      name: "themoidanhmuc",
      component: classify
    },
    {
      path: "/danhmuc/themmoi/:id",
      name: "themmoidanhmuc",
      component: classify,
      props: true
    },

  ]
})

export default router
