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
            masp: payload.masp
        }
        Object.keys(product).forEach((key) => { product[key] === undefined && delete product[key] })
        return product
    }

    async getImgId() {
        const uploadService = new UploadService(MongoDB.client)
        return await uploadService.getLastestImg()
    }


    async create(payload) {
        const materialDetailKey = await this.countRecord({})
        const product = this.extractConactData(payload)
        const idImg = await this.getImgId()
        console.log(idImg)
        const result = await this.Product.findOneAndUpdate(
            product,
            {
                $set: {
                    yeuthich: product.yeuthich === true,
                    hinhanh: idImg[0]._id,
                    ngaycapnhat: new Date().toJSON(),
                    machitiet: `product_${materialDetailKey + 1}`,
                    masp: `product_${Date.now()}`
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
                    from: "hinhsp.chunks",
                    localField: "hinhanh",
                    foreignField: "files_id",
                    as: "hinhanh"
                }
            },

            {
                $lookup: {
                    from: 'danhgia',
                    localField: 'masp',
                    foreignField: 'masp',
                    as: 'danhgia'
                }
            },

            {
                $lookup: {
                    from: 'chitietchatlieu',
                    let: { "ma_chitiet": "$machitiet" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$masp", "$$ma_chitiet"]
                                }
                            },
                        },
                        {
                            $lookup: {
                                from: 'phanloai',
                                let: { "ma_phanloai": "$phanloai" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$ma", "$$ma_phanloai"]
                                            }
                                        }
                                    }
                                ],
                                as: 'phanloai'
                            }
                        },
                        {
                            $lookup: {
                                from: 'chatlieu',
                                let: { "ma_chatlieu": "$tenchatlieu" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$ma", "$$ma_chatlieu"]
                                            }
                                        }
                                    }
                                ],
                                as: 'chatlieu'
                            }
                        }
                        // { $unwind: "$phanloai" }
                    ],
                    as: "chitiet"
                },
            },
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
                    from: 'danhgia',
                    localField: 'masp',
                    foreignField: 'masp',
                    as: 'danhgia'
                }
            },

            {
                $lookup: {
                    from: 'chitietchatlieu',
                    let: { "ma_chitiet": "$machitiet" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$masp", "$$ma_chitiet"]
                                }
                            },
                        },
                        {
                            $lookup: {
                                from: 'phanloai',
                                let: { "ma_phanloai": "$phanloai" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$ma", "$$ma_phanloai"]
                                            }
                                        }
                                    }
                                ],
                                as: 'phanloai'
                            }
                        }, {
                            $lookup: {
                                from: 'chatlieu',
                                let: { "ma_chatlieu": "$tenchatlieu" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$ma", "$$ma_chatlieu"]
                                            }
                                        }
                                    }
                                ],
                                as: 'chatlieu'
                            }
                        }
                        // { $unwind: "$phanloai" }
                    ],
                    as: "chitiet"
                },
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
        const cursor = await this.Product.aggregate([
            {
                $match: {
                    masp: id
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
                    from: "hinhsp.chunks",
                    localField: "hinhanh",
                    foreignField: "files_id",
                    as: "hinhanh"
                }
            },
            {
                $lookup: {
                    from: 'danhgia',
                    localField: 'masp',
                    foreignField: 'masp',
                    as: 'danhgia'
                }
            },
            {
                $lookup: {
                    from: 'chitietchatlieu',
                    let: { "ma_chitiet": "$machitiet" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$masp", "$$ma_chitiet"]
                                }
                            },
                        },
                        {
                            $lookup: {
                                from: 'phanloai',
                                let: { "ma_phanloai": "$phanloai" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$ma", "$$ma_phanloai"]
                                            }
                                        }
                                    },
                                ],
                                as: 'phanloai'
                            },
                        },
                        {
                            $lookup: {
                                from: 'chatlieu',
                                let: { "ma_chatlieu": "$tenchatlieu" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$ma", "$$ma_chatlieu"]
                                            }
                                        }
                                    }
                                ],
                                as: 'chatlieu'
                            }
                        }
                        // { $unwind: "$phanloai" }
                    ],
                    as: "chitiet"
                },
            },
        ])

        return await cursor.toArray()
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

    async countRecord() {
        return await this.Product.countDocuments({})
    }
}

module.exports = ProductService