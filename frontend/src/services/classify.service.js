import CreateApiClient from './api.service'

class Classify {
    constructor(baseUrl = "/bikeshop/phanloai") {
        this.classify = CreateApiClient(baseUrl)
    }
    async getAll() {
        return (await this.classify.get("/")).data
    }
    async create(data) {
        return (await this.classify.post("/", data)).data
    }
    async delete(id) {
        return (await this.classify.delete(`/${id}`)).data
    }
}

export default new Classify