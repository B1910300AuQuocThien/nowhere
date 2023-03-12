import CreateApiClient from "./api.service"

class MaterialService {
    constructor(baseUrl = "/bikeshop/chatlieu") {
        this.material = CreateApiClient(baseUrl)
    }

    async getAll() {
        return (await this.material.get("/")).data
    }
}

export default new MaterialService