const { ObjectId } = require("mongodb")
const OrderController = require('../controllers/order.controller')

class OrderService {
    constructor(client) {
        this.Order = client.db().collection('donhang')
        this.OrderDetail = client.db().collection('chitietdonhang')
    }


    async getOrderCode() {
        return OrderController.getOrderCode()
    }


    extractOrderDetail(payload) {
        const orderDetail = {
            machitiet: payload.machitiet,
            soluong: payload.soluong,
            gia: payload.gia,
        }
        Object.keys(orderDetail).forEach((key) => {
            orderDetail[key] === undefined && delete orderDetail[key]
        })

        return orderDetail
    }

    extractOrder(payload) {
        const order = {
            makh: payload.makh,
            ngay: payload.ngay,
            tongtien: payload.tongtien,
            diachi: payload.diachi
        }

        Object.keys(order).forEach((key) => {
            order[key] === undefined && delete order[key]
        })
        return order
    }

    async createOrderDetail(payload) {
        const code = await this.getOrderCode()
        const orderDetail = this.extractOrderDetail(payload)
        const result = await this.OrderDetail.findOneAndUpdate(
            orderDetail,
            {
                $set: {
                    mahoadon: code[0].madonhang
                }
            },
            { returnDocument: "after", upsert: true }
        )
        return result.value
    }

    async createOrder(payload) {
        const order = this.extractOrder(payload)
        const result = await this.Order.findOneAndUpdate(
            order,
            {
                $set: {
                    madonhang: `order_${Date.now()}`,
                    trangthai: "CXN"
                }
            },
            {
                returnDocument: "after", upsert: true
            }
        )

        return result.value
    }

    async lastRe() {
        const cursor = await this.Order.find().sort({ _id: -1 }).limit(1)
        return await cursor.toArray()
    }

    async getOrder() {
        const cursor = await this.Order.aggregate([
            {
                $lookup: {
                    from: 'chitietdonhang',
                    localField: "madonhang",
                    foreignField: 'mahoadon',
                    as: "sanpham"
                }
            }]
        )

        return await cursor.toArray()
    }
}

module.exports = OrderService