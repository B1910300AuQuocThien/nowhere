import CreateApiClient from "./api.service"

class AddressService {
    constructor(baseUrl = "/bikeshop/diachi") {
        this.address = CreateApiClient(baseUrl)
    }

    async create(data) {
        return (await this.address.post("/", data)).data
    }
}

export default new AddressService()