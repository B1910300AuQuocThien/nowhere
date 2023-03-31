const { ObjectId } = require("mongodb")
class ClassifyService {
    constructor(client) {
        this.Classify = client.db().collection("phanloai")
    }

    extractConnactData(payload) {
        const classify = {
            ten: payload.ten,
            ma: payload.ma
        }
        Object.keys(classify).forEach(element => {
            classify[element] === undefined && delete classify[element]
        });
        return classify
    }

    async create(payload) {
        const classify = this.extractConnactData(payload)
        const result = await this.Classify.findOneAndUpdate(
            classify, { $set: {} }, { returnDocument: "after", upsert: true })
        return result.value
    }

    async find(filter) {
        const cursor = await this.Classify.find(filter)
        return await cursor.toArray()
    }

    async findByName(name) {
        return await this.find({
            name: {
                $regex: new RegExp(name), $option: "i"
            }
        })
    }

    async findById(id) {
        return await this.Classify.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        })
    }

    async delete(id) {
        const result = await this.Classify.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        })
        return result.value
    }
}

module.exports = ClassifyService