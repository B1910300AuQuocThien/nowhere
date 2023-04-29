const { ObjectId } = require("mongodb")
const passport = require('passport')
const GoogleStratery = require("passport-google-oauth20").Strategy
const keys = require("../../key")
const MongoDB = require('../utils/mongodb.util')
const CustomerService = require("../services/customer.service")
const session = require('express-session')
const CustomerController = require('../controllers/customer.controller')
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
    callbackURL: 'http://localhost:3002/auth/google/callback',
},
    async function (accessToken, refreshToken, profile, done) {
        const userProfile = profile

        // console.log(profile._json)
        const google = require('googleapis').google
        const OAuth2 = google.auth.OAuth2
        const oauthClient = new OAuth2()
        oauthClient.setCredentials({ access_token: accessToken })
        const service = google.people({ version: 'v1', auth: oauthClient })
        const info = await service.people.get({
            resourceName: `people/${userProfile._json.sub}`,
            personFields: 'genders,birthdays,phoneNumbers',
            sources: 'READ_SOURCE_TYPE_PROFILE'
        })
        delete info.data.resourceName
        delete info.data.etag
        birthdays = ""
        if (info.data.birthdays) {
            Object.values(info.data.birthdays[0].date).forEach((value) => {
                birthdays += value + "-"
            })
            birthdays = birthdays.slice(0, -1)

            // console.log(birthdays)   
            profile._json.genders = info.data.genders[0].value
            profile._json.birthdays = birthdays
        }

        if (userProfile._json.sub) {
            try {
                const customerService = new CustomerService(MongoDB.client)
                // const check = await customerService.existCustomer()
                const document = await customerService.create(userProfile._json)
                // return document
            }
            catch (error) {
                console.log(error)
            }
        }
        session.userId = userProfile.id
        // console.log(userProfile)
        // console.log(session)

        return done(null, userProfile)
    })
)


