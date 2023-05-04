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
        console.log(document)
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

exports.findByUser = async (req, res, next) => {
    try {

        address = {
            city: '',
            district: '',
            ward: ''
        }
        const addressService = new AddressService(MongoDB.client)
        const document = await addressService.toString(req.body.tinh, req.body.huyen, req.body.xa)
        address.city = document[0].Name
        document[0].Districts.forEach(element => {
            if (element.Id == req.body.huyen) {
                address.district = element.Name
                element.Wards.forEach(el => {
                    if (el.Id == req.body.xa) {
                        address.ward = el.Name
                        // console.log(el.Id)
                    }
                })
            }
        });
        // console.log(address.ward + ' ' + address.district + ' ' + address.city)
        return res.send(address)
    } catch (e) {
        return next(new ApiError(500, "loi rui"))
    }
}

