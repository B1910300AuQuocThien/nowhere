const { ObjectId } = require("mongodb")

class UploadService {
    constructor(client) {
        this.ImageChunks = client.db().collection("hinhsp.chunks")
        this.ImageFiles = client.db().collection("hinhsp.files")
    }

    async getImageData() {
        const result = await this.ImageFiles.aggregate([
            {
                $lookup: {
                    from: "hinhsp.chunks",
                    localField: "_id",
                    foreignField: "files_id",
                    as: "data"
                }
            }])
        return await result.toArray()
    }

    async getLastestImg() {
        const result = await this.ImageFiles.find().sort({ _id: -1 })
        return await result.toArray()
    }

    async deleteAllImg() {
        const result = await this.ImageChunks.deleteMany({})
        result = await this.ImageFiles.deleteMany({})
        return result.value
    }
}

module.exports = UploadService