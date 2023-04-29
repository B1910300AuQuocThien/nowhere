import CreateApiClient from './api.service'

class MaterialDetailService {
    constructor(baseUrl = '/bikeshop/chitietchatlieu') {
        this.materialDetail = CreateApiClient(baseUrl)
    }

    async create(data) {
        return (await this.materialDetail.post("/", data)).data
    }
}
export default new MaterialDetailService()