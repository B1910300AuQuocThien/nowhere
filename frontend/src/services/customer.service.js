import CreateApiClient from "./api.service"

class CustomerService {
    constructor(baseUrl = "/bikeshop/khachhang") {
        this.customer = CreateApiClient(baseUrl)
    }

    async checkExitsAcc(email) {
        return (await this.customer.get(`/${email}`)).data
    }

    async create(account) {
        const data = Object.assign(account)
        return (await this.customer.post("/", data)).data
    }

    async login(email, pass) {
        const data = { 'email': email, 'pass': pass }
        return (await this.customer.post("/dangnhap", data)).data
    }

    async getAll() {
        return (await this.customer.get("/")).data
    }
}

export default new CustomerService()