import { createRouter, createWebHistory } from 'vue-router'
import adminview from '../views/admin/adminview.vue'
import signup from '../components/signupForm.vue'
import addProduct from '../views/admin/addProduct.vue'
import Classify from '../views/admin/classifyView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      component: Classify,
      props: true
    }
  ]
})

export default router
