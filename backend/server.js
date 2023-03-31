const MongoDB = require("./app/utils/mongodb.util");
const config = require("./app/config")
const app = require("./app")


async function startServer() {
    try {
        await MongoDB.connect(config.db.uri)
        console.log("connect to the database")
        console.log(config.db.uri)
        const PORT = config.app.port
        app.listen(PORT, () => {
            console.log(`server is running on ${PORT}`)
        })
        require("./app/services/auth.service")
    }
    catch (error) {
        console.log("cannot connect to database \n", error)
        process.exit()
    }
}


startServer()