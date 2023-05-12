const { ObjectId } = require('mongodb')
const MongoDB = require('../utils/mongodb.util')

class RateService {
    constructor(client) {
        this.Rate = client.db().collection("danhgia")
    }

    extracConnactDate(payload) {
        const rate = {
            tenkh: payload.tenkh,
            masp: payload.masp,
            noidung: payload.noidung,
        }

        Object.keys(rate).forEach((key) => {
            rate[key] === undefined && delete rate[key]
        })

        return rate
    }

    async create(payload) {
        const rate = this.extracConnactDate(payload)
        const result = await this.Rate.findOneAndUpdate(
            rate,
            {
                $set: { ngay: new Date() }
            },
            { returnDocument: "after", upsert: true }
        )
        return result.value
    }

    async delete(id) {
        console.log(id)
        const result = await this.Rate.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        })
        return result.value
    }
}

module.exports = RateService