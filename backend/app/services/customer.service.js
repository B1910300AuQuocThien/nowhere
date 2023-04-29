const { ObjectId } = require("mongodb")
const AddressService = require("../services/address.service")
const MongoDB = require("../utils/mongodb.util")
class CustomerService {
    constructor(client) {
        this.Customer = client.db().collection("khachhang")
    }

    extracConnactData(payload) {
        const customer = {
            email: payload.email,
            makh: payload.sub,
            tenkh: payload.name,
            gioitinh: payload.genders,
            ngaysinh: payload.birthdays,
            sdt: payload.numberphone,
            madiachi: payload.addressCode,
            tennguoidung: payload.username,
            matkhau: payload.password
        }

        Object.keys(customer).forEach((key) => {
            customer[key] === undefined && delete customer[key]
        })

        return customer
    }

    async addCode() {
        const addService = new AddressService(MongoDB.client)
        const document = await addService.lastRecord()
        return document[0].madiachi
    }

    async create(payload) {
        const customer = this.extracConnactData(payload)
        const add = await this.addCode()
        const result = await this.Customer.findOneAndUpdate(
            customer,
            {
                $set: {
                    trangthai: "kich hoat",
                    admin: false,
                    madiachi: add
                }
            },
            { returnDocument: "after", upsert: true })

        return result.value
    }

    async existCustomer(filter) {
        const cursor = await this.Customer.aggregate([
            {
                $match: { email: filter }
            }
        ])
        return await cursor.toArray()
    }

    async login(email, pass) {
        const result = await this.Customer.aggregate([
            {
                $match: { $and: [{ email: email }, { matkhau: pass }] }
            }
        ])

        return await result.toArray()
    }
}

module.exports = CustomerService