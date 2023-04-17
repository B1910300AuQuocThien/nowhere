const { ObjectId } = require("mongodb")

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

    async create(payload) {
        const customer = this.extracConnactData(payload)
        const result = await this.Customer.findOneAndUpdate(
            customer,
            {
                $set: {
                    trangthai: "kich hoat",
                    admin: customer === true
                }
            },
            { returnDocument: "after", upsert: true })

        return result.value
    }

    async existCustomer(filter) {
        return await this.Customer.findOne(
            { email: filter }
        )

    }
}

module.exports = CustomerService