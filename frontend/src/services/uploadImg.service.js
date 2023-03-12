import CreateApiClient from "./api.service"

class UploadService {
    constructor(baseUrl = '/bikeshop/upload') {
        this.upload = CreateApiClient(baseUrl)
    }
    async create(data) {
        const formData = new FormData()
        formData.append("file", data)
        return (await this.upload.post("/", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })).data
    }
}

export default new UploadService