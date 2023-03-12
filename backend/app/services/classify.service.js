const { ObjectId } = require("mongodb")
class ClassifyService {
    constructor(client) {
        this.classify = client.db().collection("phanloai")
    }

    extractConnactData(payload) {
        const classify = {
            tenphanloai: payload.tenphanloai
        }
        Object.keys[classify].forEach(element => {
            classify[element] === undefined && delete classify[element]
        });
        return classify
    }

    async find(filter) {
        const cursor = await this.classify.find(filter)
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

module.exports = ClassifyService