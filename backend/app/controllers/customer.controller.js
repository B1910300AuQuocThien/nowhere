const ApiError = require("../api-error")
const MongoDB = require("../utils/mongodb.util")
const CustomerService = require("../services/customer.service")


exports.findByEmail = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client)
        const document = await customerService.existCustomer(req.params.email)
        if (!document) {
            return res.send({ exitsAcc: true })
        } else {
            return res.send({ exitsAcc: false })
        }
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