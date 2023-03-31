const { ObjectId } = require("mongodb")

class CustomerService {
    constructor(client) {
        this.Customer = client.db().collection("khachhang")
    }

    extracConnactData(payload) {
        const customer = {
            email: payload.email,
            makh: payload.sub,
            tenkh: payload.name
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
                }
            },
            { returnDocument: "after", upsert: true })

        return result.value
    }
}

module.exports = CustomerService