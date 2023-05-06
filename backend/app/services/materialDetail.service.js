const { ObjectId } = require('mongodb')
const MongoDB = require('../utils/mongodb.util')
const ProductService = require('./product.service')

class MaterialDetailService {
    constructor(client) {
        this.MaterialDetailService = client.db().collection("chitietchatlieu")
    }

    extractConnactData(payload) {
        const materialDetail = {
            masp: payload.masp,
            tenchatlieu: payload.tenchatlieu,
            giahientai: payload.giahientai,
            soluong: payload.soluong,
            trongluong: payload.trongluong,
            mau: payload.mau,
            phanloai: payload.phanloai,
        }

        Object.keys(materialDetail).forEach((key) => {
            materialDetail[key] === undefined && delete materialDetail[key]
        })
        return materialDetail
    }

    async productKey() {
        const productService = new ProductService(MongoDB.client)
        const count = await productService.countRecord({})
        return `product_${count}`
    }

    async create(payload) {
        const productKey = await this.productKey()
        const materialDetail = this.extractConnactData(payload)
        const result = await this.MaterialDetailService.findOneAndUpdate(
            materialDetail,
            {
                $set: {
                    machitiet: `detail_${Date.now()}`,
                    masp: productKey
                }
            },
            { returnDocument: "after", upsert: true }
        )
        return result.value
    }

    async getDetail(id) {

        const cursor = await this.MaterialDetailService.a
    }
}

module.exports = MaterialDetailService