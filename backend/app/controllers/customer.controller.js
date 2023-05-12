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

exports.delete = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client)
        const document = await customerService.delete(req.params.id)
        console.log(req.params.id)
        if (!document) {
            return next(new ApiError(404, 'user not found'))
        }
        return res.send({ message: 'user was delete successfuly' })
    }
    catch (e) {
        return next(new ApiError(500, 'could not delete user'))
    }
}

exports.updateStatus = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client)
        const document = await customerService.updateStatus(req.body.id, req.body.newStatus)
        if (!document) {
            return next(new ApiError(404, 'user not found'))
        }
        return res.send({ message: 'success' })
    } catch (e) {
        return next(new ApiError(500, 'fail'))
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client)
        const document = await customerService.updateUser(req.params.id, req.body)
        if (!document) {
            return next(new ApiError(404, 'user not found'))
        }
        return res.send({ message: 'success' })
    } catch (e) {
        return next(new ApiError(500, 'loi'))
    }
}

exports.findById = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client)
        const document = await customerService.getById(req.params.id)
        console.log(document)
        return res.send(document)
    } catch (e) {
        return next(new ApiError(500, 'loi'))
    }
}