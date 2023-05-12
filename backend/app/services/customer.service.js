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
                    trangthai: true,
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

    async delete(id) {
        const result = await this.Customer.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        })

        return result.value
    }

    async updateStatus(id, newStatus) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        }

        const result = await this.Customer.findOneAndUpdate(
            filter,
            { $set: { trangthai: newStatus } },
            { returnDocument: "after" }
        )

        return result.value
    }

    async updateUser(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        }
        const update = this.extracConnactData(payload)
        console.log(update)
        const result = await this.Customer.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        )

        return result.value
    }

    async getById(id) {
        console.log(id)
        return await this.Customer.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        })
    }
}

module.exports = CustomerService