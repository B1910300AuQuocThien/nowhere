const ApiError = require("../api-error")
const MongoDB = require("../utils/mongodb.util")
const ProductService = require("../services/product.service")

exports.create = async (req, res, next) => {
    if (!req.body?.ten) {
        // console.log()
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
    return res.send(documents)
}
exports.findOne = (req, res) => {
    res.send({ message: "findOne handler" })
}
exports.delete = (req, res) => {
    res.send({ message: "delete" })
}
exports.deleteAll = (req, res) => {
    res.send({ message: "deleteAll handler" })
}
exports.findAllFavorite = (req, res) => {
    res.send({ message: "findAllFavorite handler" })
}
exports.update = (req, res) => {
    res.send({ message: "update handler" })
}