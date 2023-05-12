import CreateApiClient from './api.service'

class MaterialDetailService {
    constructor(baseUrl = '/bikeshop/chitietchatlieu') {
        this.materialDetail = CreateApiClient(baseUrl)
    }

    async create(data) {
        return (await this.materialDetail.post("/", data)).data
    }

    async updateQuantity(data) {
        return (await this.materialDetail.post("/capnhat", data)).data
    }

    async getById(data) {
        return (await this.materialDetail.post("/chatlieu", data)).data
    }
}
export default new MaterialDetailService()