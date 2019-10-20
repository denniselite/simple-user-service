const jwt = require('jsonwebtoken');
const secret = require('../config/env.config').jwt_secret;

exports.validJWTNeeded = (req, res, next) =>  {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            }

            req.jwt = jwt.verify(authorization[1], secret);
            return next();

        } catch (err) {
            res.status(403).send();
        }
    } else {
        res.status(401).send();
    }
};