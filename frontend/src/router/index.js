import { createRouter, createWebHistory } from 'vue-router'
import adminview from '../views/admin/adminview.vue'
import signup from '../components/signupForm.vue'
import addProduct from '../views/admin/addProduct.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      name: "productlist",
      component: adminview
    },
    {
      path: "/sanpham/xedap",
      name: "xedap",
      component: adminview
    },
    {
      path: "/sanpham/phutung",
      name: "phutung",
      component: adminview
    },
    {
      path: "/sanpham/khungsuon",
      name: "khungsuon",
      component: adminview
    },
    {
      path: "/sanpham/phukien",
      name: "phukien",
      component: adminview
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
      component: addProduct
    }
  ]
})

export default router
