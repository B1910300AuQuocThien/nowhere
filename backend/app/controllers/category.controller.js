const ApiError = require("../api-error")
const MongoDB = require("../utils/mongodb.util")
const CategoryService = require("../services/category.service")

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