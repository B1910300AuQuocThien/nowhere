const { ObjectId } = require("mongodb")

class ProductService {
    constructor(client) {
        this.Product = client.db().collection("sanpham")
    }

    async createID() {
        const result = await this.Product.find().sort({ _id: 1 })
        return result.value
    }

    extractConactData(payload) {

        const product = {
            ten: payload.ten,
            giahientai: payload.giahientai,
            mota: payload.mota,
            soluong: payload.soluong,
            maphanloai: payload.maphanloai,
            trongluong: payload.trongluong,
            yeuthich: payload.yeuthich,
            trangthai: payload.trangthai,
            ngaycapnhat: payload.ngaycapnhat,
            hinhanh: payload.hinhanh
        }
        Object.keys(product).forEach((key) => { product[key] === undefined && delete product[key] })
        return product
    }

    async create(payload) {
        const product = this.extractConactData(payload)
        const result = await this.Product.findOneAndUpdate(
            product, {
            $set: {
                yeuthich: product.yeuthich === true,
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

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        }
        const update = this.extractConactData(payload)
        const result = await this.Product.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        )
        return result.value
    }

    async delete(id) {
        const result = await this.Product.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        })
        return result.value
    }

    async findFavorite() {
        return await this.find({ yeuthich: true })
    }
}

module.exports = ProductService