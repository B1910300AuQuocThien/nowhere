import CreateApiClient from './api.service'

class OrderService {
    constructor(baseUrl = '/bikeshop/donhang') {
        this.order = CreateApiClient(baseUrl)
    }

    async createOrder(data) {
        return (await this.order.post("/", data)).data
    }

    async get() {
        return (await this.order.get("/")).data
    }

    async getStatus() {
        return (await this.order.get("/trangthai")).data
    }

    async createOrderDetail(data) {
        return (await this.order.post("/chitietdonhang", data)).data
    }

    async orderStatus(status) {
        return (await this.order.get(`/${status}`)).data
    }

    async updateStatus(id, status) {
        var data = {
            id: id,
            status: status
        }
        console.log(data)
        return (await this.order.post(`/trangthai/capnhat`, data)).data
    }
}

export default new OrderService