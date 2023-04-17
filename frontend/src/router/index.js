import { createRouter, createWebHistory } from 'vue-router'
import adminview from '../views/admin/adminview.vue'
import addProduct from '../views/admin/addProduct.vue'
import classify from '../views/admin/classifyView.vue'
import signup from '../views/signupView.vue'
import home from '../views/homeView.vue'
import productdetail from '../views/productDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/nowhere/trangchu",
      name: "trangchu",
      component: home
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
      path: "/sanpham/themmoi",
      name: "themmoi",
      component: addProduct,
    },
    // {
    //   path: "/sanpham/themmoi/danhmuc",
    //   name: "themoidanhmuc",
    //   component: Classify
    // },
    {
      path: "/sanpham/themmoi/:id",
      name: "themmoidanhmuc",
      component: classify,
      props: true
    }
  ]
})

export default router
