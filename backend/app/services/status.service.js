const MongoDB = require('../utils/mongodb.util')

class StatusService {
    constructor(client) {
        this.Status = client.db().collection('trangthaidonhang')
    }

    async getAll() {
        const cursor = await this.Status.find()
        return await cursor.toArray()
    }

}

module.exports = StatusService