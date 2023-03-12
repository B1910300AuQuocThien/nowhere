const ApiError = require("../api-error")
const MongoDB = require("../utils/mongodb.util")
const MaterialService = require('../services/material.service')

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