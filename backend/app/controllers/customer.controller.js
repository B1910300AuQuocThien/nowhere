const ApiError = require("../api-error")
const MongoDB = require("../utils/mongodb.util")
const CustomerService = require("../services/customer.service")
const session = require('express-session')

exports.findByEmail = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client)
        const document = await customerService.existCustomer(req.params.email)
        // document[0] ? res.send({ exitsAcc: true }) : res.send({ exitsAcc: false })
        res.send(document)
    }
    catch (error) {
        return next(new ApiError(500, "loai"))
    }
}

exports.create = async (req, res, next) => {
    if (!req.body?.email) {
        return res.send({ message: "email cannot be empty" })
    }
    try {
        const customerService = new CustomerService(MongoDB.client)
        const document = await customerService.create(req.body)
        return res.send(document)
    } catch (error) {
        return next(new ApiError(400, "loi roi"))
    }
}

exports.login = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client)
        const document = await customerService.login(req.body.email, req.body.pass)
        const session = req.session
        session.userid = document[0].makh
        session.username = document[0].tenkh
        // console.log(req.session)
        return res.send(document)
    } catch (error) {
        return next(new ApiError(500, "loi rui kia"))
    }
}

exports.lastRe = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client)
        const document = await customerService.lastRecord()
        return res.send(document)
    } catch (e) { return next(new ApiError(500, "loi")) }
}


exports.lastRe_2 = async () => {
    try {
        const customerService = new CustomerService(MongoDB.client)
        const document = await customerService.lastRecord()
        return document
    } catch (e) { return next(new ApiError(500, "loi")) }
}

exports.findAll = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client)
        const document = await customerService.getAll()
        return res.send(document)
    } catch (e) {
        return next(new ApiError(500, 'loi'))
    }
}