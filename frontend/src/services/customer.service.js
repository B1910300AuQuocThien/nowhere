import CreateApiClient from "./api.service"

class CustomerService {
    constructor(baseUrl = "/bikeshop/khachhang") {
        this.customer = CreateApiClient(baseUrl)
    }

    async checkExitsAcc(email) {
        return (await this.customer.get(`/${email}`)).data
    }

    async create(account, customer, address) {

        return (await this.customer.post("/", data)).data
    }
}

export default new CustomerService()