const { ObjectId } = require("mongodb")
const UploadService = require("./upload.service")
const MongoDB = require("../utils/mongodb.util")
class ProductService {
    constructor(client) {
        this.Product = client.db().collection("sanpham")
    }

    async lastRecord() {
        return await this.Product.count()
    }

    extractConactData(payload) {
        const product = {
            ten: payload.ten,
            giahientai: payload.giahientai,
            soluong: payload.soluong,
            trongluong: payload.trongluong,
            mau: payload.mau,
            trangthai: payload.trangthai,
            danhmuc: payload.danhmuc,
            phanloai: payload.phanloai,
            chatlieu: payload.chatlieu,
            mota: payload.mota,
            yeuthich: payload.yeuthich,
            ngaycapnhat: payload.ngaycapnhat,
        }
        Object.keys(product).forEach((key) => { product[key] === undefined && delete product[key] })
        return product
    }

    async getImgId() {
        const uploadService = new UploadService(MongoDB.client)
        return await uploadService.getLastestImg()

    }

    async create(payload) {
        // console.log(this.getImgId())
        const product = this.extractConactData(payload)
        const idImg = await this.getImgId()
        console.log(idImg)
        const result = await this.Product.findOneAndUpdate(
            product,
            {
                $set: {
                    yeuthich: product.yeuthich === true,
                    hinhanh: idImg[0]._id
                },
            },
            { returnDocument: "after", upsert: true }
        )
        return result.value
    }

    async findRe(filter) {
        const cursor = await this.Product.find(filter)
        return await cursor.toArray()
    }

    async showProductInfor() {
        const cursor = await this.Product.aggregate([
            {
                $lookup: {
                    from: "danhmuc",
                    localField: "danhmuc",
                    foreignField: "ma",
                    as: "danhmuc"
                }
            },

            {
                $lookup: {
                    from: "phanloai",
                    localField: "phanloai",
                    foreignField: "ma",
                    as: "phanloai"
                }
            },

            {
                $lookup: {
                    from: "chatlieu",
                    localField: "chatlieu",
                    foreignField: "ma",
                    as: "chatlieu"
                }
            },

            {
                $lookup: {
                    from: "hinhsp.files",
                    localField: "hinhanh",
                    foreignField: "_id",
                    as: "hinhanh"
                }
            }
        ])

        return cursor.toArray()
    }

    async showProductInforWthFilter(filter) {
        const cursor = await this.Product.aggregate([
            {
                $match: {
                    $and: [{ "danhmuc": filter }]
                }
            },

            {
                $lookup: {
                    from: "danhmuc",
                    localField: "danhmuc",
                    foreignField: "ma",
                    as: "danhmuc"
                },
            },

            {
                $lookup: {
                    from: "phanloai",
                    localField: "phanloai",
                    foreignField: "ma",
                    as: "phanloai"
                },
            },

            {
                $lookup: {
                    from: "chatlieu",
                    localField: "chatlieu",
                    foreignField: "ma",
                    as: "chatlieu"
                }
            },

            {
                $lookup: {
                    from: "hinhsp.chunks",
                    localField: "hinhanh",
                    foreignField: "files_id",
                    as: "hinhanh"
                }
            }
        ])

        return await cursor.toArray()
    }

    async findByName(name) {
        return await this.findRe({
            name: { $regex: new RegExp(name), $options: "i" }
        })
    }

    async findById(id) {
        return await this.Product.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
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

    async deleteAll() {
        const result = await this.Product.deleteMany({})
        return result.value
    }

    async findFavorite() {
        return await this.find({ yeuthich: true })
    }

    async delete(id) {
        const result = await this.Product.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        })
        return result.value
    }
}

module.exports = ProductService