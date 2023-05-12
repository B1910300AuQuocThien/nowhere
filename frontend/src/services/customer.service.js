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

    async delete(id) {
        return (await this.customer.delete(`/${id}`)).data
    }

    async updateStatus(data) {
        return (await this.customer.post('/capnhat', data)).data
    }

    async getById(id) {
        return (await this.customer.get(`/nguoidung/${id}`)).data
    }

    async updateUser(id, data) {
        console.log(data)
        return (await this.customer.post(`/capnhatnguoidung/${id}`, data)).data
    }
}

export default new CustomerService()