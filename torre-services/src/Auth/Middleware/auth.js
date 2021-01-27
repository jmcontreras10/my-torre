const jwt = require('jsonwebtoken')
const UserModel = require('../Models/User.model')

//-> Based on the article: 
//  https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122

/**
 * Middleware that able the security and token validation as an @anotation pattern
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextMiddlewareFunction} next /**TODO, OJO 
 */
const auth = async(req, res, next) => {
    //  Using the Barrier token for auth
    const token = req.header('Authorization').replace('Bearer ', '')
    //  The main JWT HEY
    const data = jwt.verify(token, process.env.JWT_KEY)
    try {
        const user = await UserModel.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth;