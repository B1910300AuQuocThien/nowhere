const productRoute = require("./product.routes")
const categoryRoute = require("./category.routes")
const uploadRoute = require("./upload.route")
const classifyRoute = require("./classify.route")
const materialRoute = require("./material.route")

function route(app) {
    app.use('/bikeshop', productRoute)
    app.use('/bikeshop/danhmuc', categoryRoute)
    app.use('/bikeshop/upload', uploadRoute)
    app.use('/bikeshop/phanloai', classifyRoute)
    app.use('/bikeshop/chatlieu', materialRoute)
}
module.exports = route
