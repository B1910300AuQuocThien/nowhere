const ApiError = require('../api-error')
const MongoDB = require('../utils/mongodb.util')
const OrderService = require('../services/order.service')


exports.createOrder = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client)
        const document = await orderService.createOrder(req.body)
        console.log(document)
        return res.send(document)
    } catch (e) {
        return next(new ApiError(500, "loi"))
    }
}


exports.createOrderDetail = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client)
        const document = await orderService.createOrderDetail(req.body)
        console.log(document)
        return res.send(document)
    } catch (e) {
        return next(new ApiError(500, "loi rui"))
    }
}


exports.getOrderCode = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client)
        const document = await orderService.lastRe()
        return document
    }
    catch (e) {
        return next(new ApiError(500, "lui kia"))
    }

}

exports.getAll = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client)
        const document = await orderService.getOrder()
        return res.send(document)
    }
    catch (e) {
        return next(new ApiError(500, 'loi rui '))
    }
}