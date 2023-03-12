const ApiError = require("../api-error")
const MongoDB = require("../utils/mongodb.util")
const ProductService = require("../services/product.service")
const uploadImg = require("../controllers/uploadImg.controller")
exports.create = async (req, res, next) => {
    if (!req.body?.ten) {
        console.log(req)
        return next(new ApiError(400, "ten san pham khong the trong"))
    }
    try {
        const productService = new ProductService(MongoDB.client)
        const document = await productService.create(req.body)
        return res.send(document)
    }
    catch (error) {
        return next(new ApiError(500, "co loi xay ra khi them san pham"))
    }
}
exports.findAll = async (req, res, next) => {
    let documents = []
    try {
        const productService = new ProductService(MongoDB.client)
        const { name } = req.query
        if (name) {
            documents = await productService.findByName(name)
        }
        else {
            documents = await productService.find({})
        }

    } catch (error) {
        return next(new ApiError(500, "loi"))
    }
    // console.log(typeof (documents))
    return res.send(documents)
}

exports.delete = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client)
        const document = await productService.delete(req.params.id)
        if (!document) {
            return next(new ApiError(404, "san pham da bi xoa"))
        }
        return res.send({ message: "san pham da xoa" })
    }
    catch (error) {
        return next(new ApiError(500, "loi"))
    }
}

exports.findAllFavorite = async (req, res) => {
    try {
        const productService = new ProductService(MongoDB.client)
        const documents = await productService.findFavorite()
        return res.send(documents)
    }
    catch (error) {
        return next(new ApiError(500, "loi"))
    }
}
exports.update = (req, res) => {

}