const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const route = require("./app/routes")
const app = express();
const bodyParser = require("body-parser")
const passport = require("passport")
const session = require('express-session')
const cookieParser = require("cookie-parser");

const oneDay = 1000 * 60 * 60 * 24
app.use(session({
    secret: "auquocthien@gmail.com",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))
app.use(passport.initialize())
app.use(bodyParser.json({ limit: '70mb' }));
app.use(bodyParser.urlencoded({ limit: '70mb', extended: true, parameterLimit: 50000 }));
// app.use(cors());
app.use(express.static(__dirname))
app.use(cookieParser())
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});
const corsOption = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOption))

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