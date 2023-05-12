import { createRouter, createWebHistory } from 'vue-router'
import adminview from '../views/admin/Adminview.vue'
import addProduct from '../views/admin/AddProduct.vue'
import classify from '../views/admin/ClassifyView.vue'
import orderList from '../views/admin/OrderListView.vue'
import productList from '../views/admin/ProductListView.vue'
import userlist from '../views/admin/UserListView.vue'
import rateList from '../views/admin/RateListView.vue'
import userForm from '../views/admin/UserFormView.vue'

import signup from '../views/SignupView.vue'
import home from '../views/HomeView.vue'
import productdetail from '../views/ProductDetailView.vue'
import signin from '../views/SigninView.vue'
import productFilter from '../views/ProductFilterView.vue'
import cart from '../views/CartView.vue'
import order from '../views/OrderView.vue'
import confirm from '../views/orderStatus/WaitingConfirm.vue'
import waitingProduct from '../views/orderStatus/waitingProduct.vue'
import tranport from '../views/orderStatus/Delivery.vue'
import success from '../views/orderStatus/Success.vue'
import confirmForm from '../views/ConfirmFormView.vue'

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
      path: '/giohang/xacnhan',
      name: 'xacnhan',
      component: confirmForm
    },
    {
      path: "/donhang",
      name: "donhang",
      component: order,
      children: [
        {
          path: "/donhang/choxacnhan",
          name: 'choxacnhan',
          component: confirm
        },
        {
          path: "/donhang/cholayhang",
          component: waitingProduct
        },
        {
          path: "/donhang/dangvanchuyen",
          component: tranport
        },
        {
          path: "/donhang/thanhcong",
          component: success
        }
      ]
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
      name: "adminlogin",
      component: adminview,
      children: [
        {
          path: '/admin/donhang',
          component: orderList,
          name: 'quanlidonhang'
        },
        {
          path: '/admin/danhmuc',
          component: classify,
          name: 'quanlidanhmuc',
          children: [
            {
              path: '/admin/danhmuc/danhmuc',
              component: classify,
              props: true
            }
          ]
        },
        {
          path: '/admin/nguoidung',
          component: userlist,
          name: 'quanlinguoidung',
        },
        {
          path: '/admin/nguoidung/:id',
          component: userForm,
          name: 'capnhatnguoidung',
          props: true
        },
        {
          path: "/admin/sanpham/danhmuc/:id",
          name: "sanpham",
          component: productList,
          props: true,
        },
        {
          path: '/admin/danhgia',
          name: 'quanlidanhgia',
          component: rateList
        }
      ]
    },

    {
      path: "/admin/sanpham/tuychinh",
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
      path: "/admin/sanpham/themmoi/:id",
      name: "themmoi",
      component: addProduct,
      props: true
    },

    {
      path: "/admin/danhmuc/themmoi/:id",
      name: "themmoidanhmuc",
      component: classify,
      props: true
    },
    // {
    //   path: "/mai",
    //   component: mai
    // }
  ]
})

export default router
