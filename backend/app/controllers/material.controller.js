const ApiError = require("../api-error")
const MongoDB = require("../utils/mongodb.util")
const MaterialService = require('../services/material.service')

exports.create = async (req, res, next) => {
    if (!req.body?.ma || !req.body?.ten) {
        return next(new ApiError(400, "ten va ma khong the de trong"))
    }
    try {
        const materialService = new MaterialService(MongoDB.client)
        const document = await materialService.create(req.body)
        return res.send(document)
    } catch (error) {
        return next(new ApiError(500, "co loi kia"))
    }
}

exports.findAll = async (req, res, next) => {
    let documents = []
    try {
        const materialService = new MaterialService(MongoDB.client)
        const { name } = req.query
        if (name) {
            documents = await materialService.findByName(name)
        } else {
            documents = await materialService.find({})
        }
    } catch (error) {
        return next(new ApiError(500, 'loi'))
    }
    return res.send(documents)
}

exports.findOne = async (req, res, next) => {
    try {
        const materialService = new MaterialService(MongoDB.client)
        const documents = await materialService.findById(req.params.id)
        if (!documents) {
            return next(new ApiError(404, "material not found"))
        }
        return res.send(documents)
    } catch (error) {
        return next(new ApiError(500, "could not find material"))
    }
}

exports.delete = async (req, res, next) => {
    try {
        const materialService = new MaterialService(MongoDB.client)
        const document = await materialService.delete(req.params.id)
        if (!document) {
            return next(new ApiError(404, "material not found"))
        }
        return res.send({ message: "material was delete successfuly" })
    } catch (error) {
        return next(new ApiError(500, "could not delete material"))
    }
}