import CreateApiClient from "./api.service"

class CategoryService {
    constructor(baseUrl = "/bikeshop/danhmuc") {
        this.category = CreateApiClient(baseUrl)
    }

    async getAll() {
        return (await this.category.get("/")).data
    }

    async create(data) {
        return (await this.category.post("/", data)).data
    }

    async delete(id) {
        return (await this.category.delete(`/${id}`)).data
    }
}

export default new CategoryService