const jwt = require('jsonwebtoken')

const productauthCheking = (req,res,next) => {
    const auth = req.headers['authorization']
    if(!auth) {
        return res.status(401)
            .json({
                message : "unAuthorized jwt token"
            })
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET)
        req.body = decoded

        next();
    } catch(err) {
        return res.status(401)
            .json({
                message : "unAuthorized, jwt token is wrong or expired"
            })
    }
}

module.exports = productauthCheking