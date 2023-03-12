import CreateApiClient from './api.service'

class Classify {
    constructor(baseUrl = "/bikeshop/phanloai") {
        this.classify = CreateApiClient(baseUrl)
    }
    async getAll() {
        return (await this.classify.get("/")).data
    }
}

export default new Classify