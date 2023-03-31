const { ObjectId } = require("mongodb")
const passport = require('passport')
const GoogleStratery = require("passport-google-oauth20").Strategy
const keys = require("../../key")
const MongoDB = require('../utils/mongodb.util')
const CustomerService = require("../services/customer.service")
// import { google } from "googleapis"


passport.serializeUser(function (user, cb) {
    cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
    cb(null, user)
})

passport.use(new GoogleStratery({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: 'http://localhost:3000/auth/google/callback',
},
    async function (accessToken, refreshToken, profile, done) {
        const userProfile = profile

        console.log(profile._json)
        const google = require('googleapis').google
        const OAuth2 = google.auth.OAuth2
        const oauthClient = new OAuth2()
        oauthClient.setCredentials({ access_token: accessToken })

        var oauth2 = google.oauth2({
            auth: oauthClient,
            version: 'v2',
        })

        const data = await oauth2.userinfo.get()
        console.log(data.data)
        // const service = google.people({ version: 'v1', auth: oauthClient })
        // const info = await service.people.get({
        //     resourceName: `people/${userProfile._json.sub}`,
        //     personFields: 'genders,birthdays',
        //     sources: 'READ_SOURCE_TYPE_PROFILE'
        // })
        // console.log(info.data)
        // if (userProfile._json.sub) {
        //     try {
        //         const customerService = new CustomerService(MongoDB.client)
        //         // const document = await customerService.create(userProfile._json)
        //         console.log("thanh cong")
        //     }
        //     catch (error) {
        //         console.log(error)
        //     }
        // }
        return done(null, userProfile)
    })
)