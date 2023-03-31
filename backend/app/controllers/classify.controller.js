const ApiError = require("../api-error")
const MongoDB = require("../utils/mongodb.util")
const ClassifyService = require("../services/classify.service")

exports.create = async (req, res, next) => {
    if (!req.body?.ma || !req.body?.ten) {
        return next(new ApiError(400, "ten va ma khong duoc de trong"))
    }
    try {
        const classifyService = new ClassifyService(MongoDB.client)
        const document = await classifyService.create(req.body)
        return res.send(document)
    } catch (error) {
        return next(new ApiError(500, "co loi roi"))
    }
}

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

exports.findOne = async (req, res, next) => {
    try {
        const classifyService = new ClassifyService(MongoDB.client)
        const documents = await classifyService.findById(req.params.id)
        if (!documents) {
            return next(new ApiError(500, "classify not found"))
        }
        return res.send(documents)
    } catch (error) {
        return next(new ApiError(500, "loi kia"))
    }
}

exports.delete = async (req, res, next) => {
    try {
        const classifyService = new ClassifyService(MongoDB.client)
        const document = await classifyService.delete(req.params.id)
        // console.log(classifyService)
        if (!document) {
            return next(new ApiError(404, "classify not found"))
        }
        return res.send({ message: "classify was delete successfuly" })
    } catch (error) {
        return next(new ApiError(500, 'could not delete'))
    }
}