import CreateApiClient from "./api.service"

class MaterialService {
    constructor(baseUrl = "/bikeshop/chatlieu") {
        this.material = CreateApiClient(baseUrl)
    }

    async getAll() {
        return (await this.material.get("/")).data
    }
    async create(data) {
        return (await this.material.post("/", data)).data
    }
    async delete(id) {
        return (await this.material.delete(`/${id}`)).data
    }
}

export default new MaterialService