const ApiError = require("../api-error")
const MongoDB = require("../utils/mongodb.util")
const ClassifyService = require("../services/classify.service")

exports.findAll = async (req, res, next) => {
    let documents = []
    try {
        const classifyService = new ClassifyService(MongoDB.client)
        const { name } = req.query
        if (name) {
            documents = await classifyService.findByName(name)
        }
        else {
            documents = await classifyService.find({})
        }
    } catch (error) {
        return next(new ApiError(500, "loi"))
    }
    return res.send(documents)
}