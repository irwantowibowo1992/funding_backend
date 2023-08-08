const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET_KEY;

class Authorization {
    auth(roles) {
        return (req, res, next) => {
            try {
                let decodeThisToken;
                decodeThisToken = this.getToken(req);
                req.user = decodeThisToken;

                if (!roles.includes(req.user.role)) {
                    const error = new Error('You are not authorized');
                    error.statusCode = 401;
                    throw error;
                }

                return next();
            } catch (error) {
                const err = new Error(error)
                err.statusCode = 500;
                throw err; 
            }
        }
    }

    getToken(req) {
        const token = req.body.token || req.query.token || req.headers.authorization;

        if(!token) {
            const error = new Error('A token is required for authentication');
            error.statusCode = 422;
            throw error;
        }

        if(token.split(' ').length < 2) {
            const error = new Error('Wrong authentication token format');
            error.statusCode = 401;
            throw error;
        }

        return this.decodeToken(token);
    }

    decodeToken(token) {
        const strToken = token.split(' ')[1];
        return jwt.verify(strToken, jwtSecret);
    }
}

module.exports = new Authorization();