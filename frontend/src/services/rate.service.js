import CreateApiClient from './api.service'

class RateService {
    constructor(baseUrl = "/bikeshop/danhgia") {
        this.Rate = CreateApiClient(baseUrl)
    }

    async create(data) {
        return (await this.Rate.post('/', data)).data
    }

    async delete(id) {
        return (await this.Rate.delete(`/${id}`)).data
    }
}
export default new RateService