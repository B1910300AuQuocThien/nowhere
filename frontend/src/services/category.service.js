import CreateApiClient from "./api.service"

class CategoryService {
    constructor(baseUrl = "/bikeshop/danhmuc") {
        this.category = CreateApiClient(baseUrl)
    }

    async getAll() {
        return (await this.category.get("/")).data
    }
}

export default new CategoryService