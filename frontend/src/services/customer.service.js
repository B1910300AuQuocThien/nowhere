import CreateApiClient from "./api.service"

class CustomerService {
    constructor(baseUrl = "/bikeshop/khachhang") {
        this.customer = CreateApiClient(baseUrl)
    }

    async checkExitsAcc(email) {
        return (await this.customer.get(`/${email}`)).data
    }

    async create(account, detail) {
        const data = Object.assign(account, detail)
        console.log(data)
        return (await this.customer.post("/", data)).data
    }

    async login(email, pass) {
        const data = { 'email': email, 'pass': pass }
        return (await this.customer.post("/dangnhap", data)).data
    }
}

export default new CustomerService()