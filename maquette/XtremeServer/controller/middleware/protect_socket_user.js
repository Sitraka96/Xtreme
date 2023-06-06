const jwt = require('jsonwebtoken');

const secretKey = process.env.secretKey_user;

const authSocketMiddleware = (client, next) => {
    const token = "";
    if(client.handshake.headers['authorization'])
        token = client.handshake.headers['authorization'].split(' ')[1];
    if(token) {
        jwt.verify(token, secretKey, async ( err, decoded ) => {
                    
            if(client.request.session.adminToken && client.request.session.adminToken === token)
                next();

        })
    }

}

module.exports = authSocketMiddleware;