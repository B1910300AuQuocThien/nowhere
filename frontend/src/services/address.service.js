import CreateApiClient from "./api.service"

class AddressService {
    constructor(baseUrl = "/bikeshop/diachi") {
        this.address = CreateApiClient(baseUrl)
    }

    async create(data) {
        return (await this.address.post("/", data)).data
    }

    async get(city, district, ward) {
        const data = {
            'tinh': city,
            'huyen': district,
            'xa': ward
        }
        return (await this.address.post("/loc", data)).data
    }
}

export default new AddressService()