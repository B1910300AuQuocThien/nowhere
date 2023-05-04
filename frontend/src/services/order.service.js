import CreateApiClient from './api.service'

class OrderService {
    constructor(baseUrl = '/bikeshop/donhang') {
        this.order = CreateApiClient(baseUrl)
    }

    async createOrder(data) {
        return (await this.order.post("/", data)).data
    }

    async createOrderDetail(data) {
        return (await this.order.post("/chitietdonhang", data)).data
    }
}

export default new OrderService