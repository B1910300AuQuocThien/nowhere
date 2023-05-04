const { ObjectId } = require("mongodb")
const CustomerController = require('../controllers/customer.controller')
class AddressService {
    constructor(client) {
        this.AddressDetail = client.db().collection("chitietdiachi")
        this.Address = client.db().collection('diachi')

    }

    extractConactData(payload) {
        const address = {
            makh: payload.makh,
            capmot: payload.tinh,
            caphai: payload.huyen,
            capba: payload.xa
        }

        Object.keys(address).forEach((key) => {
            address[key] === undefined && delete address[key]
        })

        return address
    }

    async lastCustomer() {
        return CustomerController.lastRe_2()
    }

    async create(payload) {
        const address = this.extractConactData(payload)
        const user = await this.lastCustomer()
        console.log(user)
        const result = await this.AddressDetail.findOneAndUpdate(
            address,
            {
                $set: { makh: user[0].email }
            },
            { returnDocument: "after", upsert: true }
        )
        return result.value
    }

    async lastRecord() {
        const cursor = await this.AddressDetail.find().sort({ _id: -1 }).limit(1)
        return await cursor.toArray()
    }


    async findByUser(email) {
        const cursor = await this.AddressDetail.aggregate([
            {
                $match: {
                    $and: [{ makh: email }]
                }
            }]
        )

        return cursor.toArray()
    }

    async toString(a) {
        var cursor = await this.Address.aggregate([
            { $match: { $and: [{ Id: a }] } }
        ])

        return await cursor.toArray()
    }
}

module.exports = AddressService