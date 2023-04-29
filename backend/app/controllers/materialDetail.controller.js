const ApiError = require('../api-error')
const MongoDB = require('../utils/mongodb.util')
const MaterialDetailService = require('../services/materialDetail.service')

exports.create = async (req, res, next) => {
    if (!req.body?.tenchatlieu) {
        return next(new ApiError(400, 'khong the trong ten chat lieu'))
    }
    try {
        const materialDetail = new MaterialDetailService(MongoDB.client)
        const document = await materialDetail.create(req.body)
        return res.send(document)
    } catch (error) {
        return next(new ApiError(500, 'loi rui'))
    }
}