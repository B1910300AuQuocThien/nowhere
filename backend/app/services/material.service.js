const { ObjectId } = require('mongodb')
class MaterialService {
    constructor(client) {
        this.material = client.db().collection("chatlieu")
    }

    extractConnactData(payload) {
        const material = {
            tenchatlieu: payload.tenchatlieu
        }
        Object.keys[this.material].forEach(key => {
            material[key] === undefined && delete material[key]
        })
    }

    async find(filter) {
        const cursor = await this.material.find(filter)
        return await cursor.toArray()
    }

    async findByName(name) {
        return this.find({
            name: {
                $regex: new RegExp(name), $option: "i"
            }
        })
    }
}

module.exports = MaterialService