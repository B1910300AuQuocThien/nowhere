const ApiError = require("../api-error")
const MongoDB = require("../utils/mongodb.util")
const RateService = require("../services/rate.service")

exports.create = async (req, res, next) => {
    try {
        const rateService = new RateService(MongoDB.client)
        const document = await rateService.create(req.body)
        return res.send(document)
    }
    catch (e) {
        return next(new ApiError(500, 'loi'))
    }
}

exports.delete = async (req, res, next) => {
    try {
        const rateService = new RateService(MongoDB.client)
        const document = await rateService.delete(req.params.id)
        console.log(req.params.id)
        if (!document) {
            return res.send({ message: 'cannot find rate' })
        }
        return res.send({ message: 'rate was delete successfuly' })
    } catch (e) {
        return next(new ApiError(500, 'loi'))
    }
}