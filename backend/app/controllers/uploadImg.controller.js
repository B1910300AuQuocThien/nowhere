const upload = require("../middleware/uploadImg.middleware")
const UploadService = require("../services/upload.service")
const config = require("../config")
const ApiError = require("../api-error")
// const MongoClient = require("mongodb").MongoClient
const Mongodb = require('../utils/mongodb.util')
const GridFSBucket = require("mongodb").GridFSBucket

// const url = config.db.uri

const baseUrl = "http://localhost:3000/bikeshop/"

// // const mongoClient = new MongoClient(url)


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
        // await mongoClient.connect()
        const database = await Mongodb.client.db()
        const images = database.collection(config.imgBucket + ".files")
        const cursor = images.find({})

        if ((await cursor.countDocuments) === 0) {
            return next(new ApiError(500, "No  file found"))
        }

        let fileInfor = [];
        await cursor.forEach((doc) => {
            fileInfor.push({
                name: doc.filename,
                url: baseUrl + "upload/hinhsp/" + doc.filename
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
        const database = await Mongodb.client.db()
        const bucket = new GridFSBucket(database, {
            bucketName: config.imgBucket
        })
        // console.log(bucket)
        let downloadStream = bucket.openDownloadStreamByName(req.params.name)

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

const getImgData = async (req, res, next) => {
    try {
        const uploadService = new UploadService(Mongodb.client)
        // console.log(uploadService)
        const document = await uploadService.getImageData()
        return res.send(document)
    } catch (error) {
        return next(new ApiError(500, "loi roi kia"))
    }
}

const deleteAllImg = async (req, res, next) => {
    try {
        const uploadService = new UploadService(Mongodb.client)
        const document = await uploadService.deleteAllImg()
        return res.send(document)
    }
    catch (error) {
        return next(new ApiError(500, "loi kia"))
    }
}

const lastImage = async (req, res, next) => {
    try {
        const uploadService = new UploadService(Mongodb.client)
        const document = await uploadService.getLastestImg()
        return res.send(document)
    }
    catch (error) {
        return next(new ApiError(500, "sai qua sai"))
    }
}

module.exports = {
    uploadFiles, getListFiles, download, getImgData, deleteAllImg, lastImage
}
