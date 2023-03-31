const ApiError = require("../api-error")
const MongoDB = require("../utils/mongodb.util")
const CategoryService = require("../services/category.service")

exports.create = async (req, res, next) => {
    if (!req.body?.ma || !req.body?.ten) {
        return next(new ApiError(400, "ma va ten danh muc khong the trong"))
    }
    try {
        const categoryService = new CategoryService(MongoDB.client)
        const document = await categoryService.create(req.body)
        return res.send(document)
    }
    catch (error) {
        return next(new ApiError(500, "co loi xay ra khi them danh muc"))
    }
}

exports.findAll = async (req, res, next) => {
    let documents = []
    try {
        const categoryService = new CategoryService(MongoDB.client)
        const { name } = req.query
        if (name) {
            documents = await categoryService.findByName(name)
        }
        else {
            documents = await categoryService.find({})
        }
    }
    catch (error) {
        return next(new ApiError(500, "loi"))
    }
    return res.send(documents)
}

exports.delete = async (req, res, next) => {
    try {
        const categoryService = new CategoryService(MongoDB.client)
        const document = await categoryService.delete(req.params.id)
        if (!document) {
            return next(new ApiError(404, "category not found"))
        }
        return res.send({ message: "category was delete successfully" })
    } catch (error) {
        return next(new ApiError(500, 'could not delete category'))
    }
}

exports.findOne = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const categoryService = new CategoryService(MongoDB.client)
        const document = await categoryService.findById(req.params.id)
        if (!document) {
            return next(new ApiError(404, "category not found"))
        }
        return res.send(document)
    } catch (error) {
        return next(new ApiError(500, "error"))
    }
}