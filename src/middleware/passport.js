const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt

const Clients = require('../model/Clients.model')
const config = require('../config/keys/keys')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secretKeys.Clients
}

module.exports = new JwtStrategy(opts, (jwt_payload, done)=>{
    Clients.findById(jwt_payload.id, (err, client)=>{
        if(err)
            return done(err, false)
        if(client)
            return done(null, client)
        else
            return done(err, false)
    })
})