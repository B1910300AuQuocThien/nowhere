const productRoute = require("./product.routes")
const categoryRoute = require("./category.routes")
const uploadRoute = require("./upload.route")
const classifyRoute = require("./classify.route")
const materialRoute = require("./material.route")
const customerRoute = require("./customer.route")
const auth = require("./auth.routes")

function route(app) {
    app.use('/bikeshop/sanpham', productRoute)
    app.use('/bikeshop/danhmuc', categoryRoute)
    app.use('/bikeshop/upload', uploadRoute)
    app.use('/bikeshop/phanloai', classifyRoute)
    app.use('/bikeshop/chatlieu', materialRoute)
    app.use('/bikeshop/auth', auth.router)
    app.use('/auth', auth.callbackRouter)
    app.use('/bikeshop/khachhang', customerRoute)
}
module.exports = route
