const { ObjectId } = require("mongodb")
class CategoryService {
    constructor(client) {
        this.Category = client.db().collection("danhmuc")
    }

    extractConnactData(payload) {
        const category = {
            ma: payload.ma,
            ten: payload.ten
        }

        Object.keys(category).forEach((key) => {
            category[key] === undefined && delete category[key]
        })
        return category
    }

    async create(payload) {
        const category = this.extractConnactData(payload)
        const result = await this.Category.findOneAndUpdate(
            category,
            { $set: {} },
            { returnDocument: "after", upsert: true }
        )
        return result.value
    }

    async find(filter) {
        const cursor = await this.Category.find(filter)
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
        return await this.Category.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        })
    }

    async delete(id) {
        const result = await this.Category.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        })
        return result.value
    }
}

module.exports = CategoryService