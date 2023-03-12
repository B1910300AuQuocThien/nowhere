const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const route = require("./app/routes")
const app = express();
const bodyParser = require("body-parser")


app.use(bodyParser.json({ limit: '70mb' }));
app.use(bodyParser.urlencoded({ limit: '70mb', extended: true, parameterLimit: 50000 }));
app.use(cors());
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

route(app)

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});



module.exports = app;