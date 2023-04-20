const jwt = require('jsonwebtoken'); 

const secretKey = process.env.secretKey_admin;
const origineAdmin = process.env.OriginAdmin;

// Routes protection 's middlware

module.exports = async ( req, res, next ) => {

    res.setHeader("Access-Control-Allow-Origin", origineAdmin);
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    let token = "";
    console.log(req.session);
    if(req.headers['authorization'])
        token = req.headers['authorization'].split(' ')[1];

    if(!token || req.session?.adminToken !== token){
        res.status(403).json({ msg: "Access denied !" });
        return;
    }

    jwt.verify(token, secretKey, async ( err, decoded ) => {

        if(err)
            res.status(403).json({ msg: "Access denied !" });

        else{

            if(req.session?.admin.id === decoded?.admin.id) {
                req.admin = decoded.admin;
                req.token = token;
                await next();   
            }
            
            else res.status(403).json({ msg: "Access denied: token invalid!" });
        }
    });
   
}