const { ObjectId } = require("mongodb")
const MongoDB = require("../utils/mongodb.util")

class AddressService {
    constructor(client) {
        this.Address = client.db().collection("diachi")
    }

    extractConactData(payload) {
        const address = {
            capmot: payload.tinh,
            caphai: payload.huyen,
            capba: payload.xa
        }

        Object.keys(address).forEach((key) => {
            address[key] === undefined && delete address[key]
        })

        return address
    }

    async create(payload) {
        const address = this.extractConactData(payload)
        const result = await this.Address.findOneAndUpdate(
            address,
            {
                $set: {
                    madiachi: `add_${Date.now()}`
                }
            },
            { returnDocument: "after", upsert: true }
        )
        return result.value
    }

    async lastRecord() {
        const cursor = await this.Address.find().sort({ _id: -1 }).limit(1)
        return await cursor.toArray()
    }
}

module.exports = AddressService