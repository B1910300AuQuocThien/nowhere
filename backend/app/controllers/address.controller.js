const ApiError = require("../api-error")
const MongoDB = require("../utils/mongodb.util")
const AddressService = require("../services/address.service")

exports.create = async (req, res, next) => {
    if (!req.body?.tinh || !req.body?.huyen || !req.body?.xa) {
        return next(new ApiError(400, "nhap day du thong tin"))
    }
    try {
        const addressService = new AddressService(MongoDB.client)
        const document = await addressService.create(req.body)
        return res.send(document)
    } catch (error) {
        return next(new ApiError(500, "co loi xa ra khi them dia chi"))
    }
}
exports.lastRecord = async (req, res, next) => {
    try {
        const addressService = new AddressService(MongoDB.client)
        const document = await addressService.lastRecord()
        return res.send(document[0].madiachi)
    } catch (error) {
        return next(new ApiError(500, "loi rui"))
    }
}