const { ObjectId } = require("mongodb")
class CategoryService {
    constructor(client) {
        this.category = client.db().collection("danhmuc")
    }

    extractConnactData(payload) {
        const category = {
            tendanhmuc: payload.tendanhmuc
        }

        Object.keys(category).forEach((key) => {
            category[key] === undefined && delete category[key]
        })
        return category
    }

    async find(filter) {
        const cursor = await this.category.find(filter)
        return await cursor.toArray()
    }

    async findByName(name) {
        return await this.find({
            name: {
                $regex: new RegExp(name), $option: "i"
            }
        })
    }
}

module.exports = CategoryService