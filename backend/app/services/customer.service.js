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
            tenkh: payload.name,
            matkhau: payload.password
        }

        Object.keys(customer).forEach((key) => {
            customer[key] === undefined && delete customer[key]
        })

        return customer
    }

    async create(payload) {
        const customer = this.extracConnactData(payload)
        const result = await this.Customer.findOneAndUpdate(
            customer,
            {
                $set: {
                    trangthai: "kich hoat",
                    admin: false,
                    makh: `user_${Date.now()}`
                }
            },
            { returnDocument: "after", upsert: true })

        return result.value
    }

    async existCustomer(filter) {
        const cursor = await this.Customer.aggregate([
            {
                $match: { email: filter }
            },
        ])
        return await cursor.toArray()
    }

    async login(email, pass) {
        const result = await this.Customer.aggregate([
            {
                $match: { $and: [{ email: email }, { matkhau: pass }] }
            },
        ])

        return await result.toArray()
    }

    async lastRecord() {
        const cursor = await this.Customer.find().sort({ _id: -1 }).limit(1)
        return await cursor.toArray()
    }

    async getAll() {
        const cursor = await this.Customer.find({})
        return await cursor.toArray()
    }
}

module.exports = CustomerService