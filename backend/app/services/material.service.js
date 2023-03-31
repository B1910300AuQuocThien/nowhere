const { ObjectId } = require('mongodb')
class MaterialService {
    constructor(client) {
        this.Material = client.db().collection("chatlieu")
    }

    extractConnactData(payload) {
        const material = {
            ma: payload.ma,
            ten: payload.ten
        }
        Object.keys(material).forEach(key => {
            material[key] === undefined && delete material[key]
        })
        return material
    }

    async create(payload) {
        const material = this.extractConnactData(payload)
        console.log(material)
        const result = await this.Material.findOneAndUpdate(
            material, { $set: {} }, { returnDocument: "after", upsert: true })
        return result.value
    }

    async find(filter) {
        const cursor = await this.Material.find(filter)
        return await cursor.toArray()
    }

    async findByName(name) {
        return this.find({
            name: {
                $regex: new RegExp(name), $option: "i"
            }
        })
    }

    async findById(id) {
        return await this.Material.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        })
    }

    async delete(id) {
        const result = await this.Material.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        })
        return result.value
    }
}

module.exports = MaterialService