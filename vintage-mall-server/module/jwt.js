const jwt = require('jsonwebtoken');
const secretOrPrivateKey = "tmakdlfrpdlxm19!";
const responseMessage = require('../module/utils/responseMessage');
const statusCode = require('../module/utils/statusCode');
const utils = require('../module/utils/utils');

module.exports = {
    sign: function (user) {
        const options = {
            algorithm: 'HS256',
            expiresIn: "7 days",
            issuer: "vintage_mall"
        };
        const payload = {
            id: user
        };
        let token = jwt.sign(payload, secretOrPrivateKey, options);
        return token;
    },
    verify: function (token) {
        let decoded;
        try {
            decoded = jwt.verify(token, secretOrPrivateKey);
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return -3;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                return -2;
            } else {
                console.log("invalid token")
                return -2;
            }
        }
        return decoded;
    },
    middleAuthChecker : async(token)=>{
        const parsedToken = request.headers.authorization.split('Bearer ')[1];
        const verifiedTokenResult = jwt.verify(parsedToken,secretOrPrivateKey,(err)=>{
            if(err){
                response.status(statusCode.UNAUTHORIZED).send(utils.successFalse(statusCode.UNAUTHORIZED,responseMessage.UNAUTHORIZED));
                return;
            }
        });
        return verifiedTokenResult;
    }
};