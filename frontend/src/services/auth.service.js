import CreateApiClient from './api.service'

class AuthService {
    constructor(baseUrl = '/bikeshop/auth') {
        this.auth = CreateApiClient(baseUrl)
    }

    async create() {
        return (await this.auth.get("/google")).data
    }

    async callback() {
        return (await this.auth.get("/google/calback")).data
    }
}

export default new AuthService