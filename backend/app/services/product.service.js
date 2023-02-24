const { ObjectId } = require("mongodb")

class ProductService {
    constructor(client) {
        this.Product = client.db().collection("phanloai")
    }

    async createID() {
        const result = await this.Product.find().sort({ _id: 1 })
        return result.value
    }

    extractConactDate(payload) {
        const product = {
            ten: payload.ten,
            giahientai: payload.giahientai,
            mota: payload.mota,
            soluong: payload.soluong,
            maphanloai: payload.maphanloai,
            tennhasx: payload.tennhasx,
            trongluong: payload.trongluong,
            yeuthich: payload.yeuthich
        }
        Object.keys(product).forEach((key) => { product[key] === undefined && delete product[key] })
        return product
    }

    async create(payload) {
        const product = this.extractConactDate(payload)
        const result = await this.Product.findOneAndUpdate(
            product, {
            $set: {
                yeuthich: product.yeuthich === true
            },
        },
            { returnDocument: "after", upsert: true }
        )
        return result.value
    }

    async find(filter) {
        const cursor = await this.Product.find(filter)
        return await cursor.toArray()
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" }
        })
    }
}

module.exports = ProductService