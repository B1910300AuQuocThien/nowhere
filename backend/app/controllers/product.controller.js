const ApiError = require("../api-error")
const MongoDB = require("../utils/mongodb.util")
const ProductService = require("../services/product.service")
const uploadImg = require("../controllers/uploadImg.controller")


exports.lastRecord = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client)
        const keyID = await productService.lastRecord()
        return res.send(JSON.stringify(keyID))
    }
    catch (error) {
        return next(new ApiError(500, "loai"))
    }
}

exports.create = async (req, res, next) => {
    if (!req.body?.ten) {
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

exports.findAll_1 = async (req, res, next) => {
    let document = []
    try {
        const productService = new ProductService(MongoDB.client)
        document = await productService.findRe({})
    } catch (error) {
        return next(new ApiError(500, "co loi roi"))
    }
    return res.send(document)
}

exports.findAll_2 = async (req, res, next) => {
    let documents = []
    try {
        const productService = new ProductService(MongoDB.client)
        const { name } = req.query
        if (name) {
            documents = await productService.findByName(name)
        }
        else {
            // documents = await productService.showProductInfor({})
            documents = await productService.showProductInforWthFilter(req.params.id)
            // console.log(documents)
        }

    } catch (error) {
        return next(new ApiError(500, "loi kia"))
    }
    // console.log(typeof (documents))
    return res.send(documents)
}

exports.deleteAll = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client)
        const document = await productService.deleteAll(req.params.id)
        return res.send({ message: "san pham da xoa" })
    }
    catch (error) {
        return next(new ApiError(500, "loi"))
    }
}

exports.delete = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client)
        const document = await productService.delete(req.params.id)
        if (!document) {
            return next(new ApiError(404, "product not found"))
        }
        return res.send({ message: "product was delete successfully" })
    } catch (error) {
        return next(new ApiError(500, 'could not delete product '))
    }
}

exports.findAllFavorite = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client)
        const documents = await productService.findFavorite()
        return res.send(documents)
    }
    catch (error) {
        return next(new ApiError(500, "loi"))
    }
}

exports.findOne = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client)
        const document = await productService.findById(req.params.id)
        if (!document) {
            return next(new ApiError(404, "product not found"))
        }
        return res.send(document)
    }
    catch (error) {
        return next(new ApiError(500, "error"))
    }
}

exports.update = (req, res) => {

}