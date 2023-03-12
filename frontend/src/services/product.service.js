import CreateApiClient from "./api.service";

class ProductService {
    constructor(baseUrl = "/bikeshop") {
        this.product = CreateApiClient(baseUrl)
    }

    async getAll() {
        return (await this.product.get("/")).data
    }

    async create(data) {
        return (await this.product.post("/", data)).data
    }

    async deleteAll() {
        return (await this.product.delete("/")).data
    }

    async get(id) {
        return (await this.product.get(`/${id}`)).data
    }

    async update(id, data) {
        return (await this.product.put(`/${id}`, data)).data
    }

    async delete(id) {
        return (await this.product.delete(`/${id}`)).data
    }
}

export default new ProductService()