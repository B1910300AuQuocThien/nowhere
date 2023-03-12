const upload = require("../middleware/uploadImg.middleware")
const config = require("../config")
const ApiError = require("../api-error")
const MongoClient = require("mongodb").MongoClient
const GridFSBucket = require("mongodb").GridFSBucket

const url = config.db.uri

const baseUrl = "http://localhost:3000/bikeshop/"

const mongoClient = new MongoClient(url)


const uploadFiles = async (req, res) => {
    try {
        // console.log(req.body)
        await upload(req, res)
        if (req.file == undefined) {
            return res.send({ message: "you must select a file" })
        }
        return res.send({
            message: "file has been upload"
        })
    }
    catch (error) {
        console.log(error)
        return res.send({
            message: `error when trying upload imge: ${error}`
        })
    }
}

const getListFiles = async (req, res, next) => {
    try {
        await mongoClient.connect()
        const database = mongoClient.db(config.db)
        const images = database.collection(config.imgBucket + ".files")
        const cursor = images.find({})

        if ((await cursor.count()) === 0) {
            return next(new ApiError(500, "No  file found"))
        }

        let fileInfor = [];
        await cursor.forEach((doc) => {
            fileInfor.push({
                name: doc.filename,
                url: baseUrl + doc.filename
            })
        })
        return next(new ApiError(200, fileInfor))
    }
    catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const download = async (req, res, next) => {
    try {
        await mongoClient.connect()
        const database = mongoClient.db(config.db)
        const bucket = new GridFSBucket(database, {
            bucketName: config.imgBucket
        })

        let downloadStream = bucket.openDownloadStreamByName(req.params)

        downloadStream.on("data", function (data) {
            return next(new ApiError(200, data))
        })

        downloadStream.on("error", function (err) {
            return next(new ApiError(404, "cannot download the image"))
        })

        downloadStream.on("end", () => {
            return res.send()
        })
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

module.exports = {
    uploadFiles, getListFiles, download
}
