const Joi = require('joi')

class ValidationMiddleware {
    static validateBody(schema) {
        return (req, res, next) => {
            const {error} = schema.validate(req.body);

            if (error) {
                const err = new Error(error.details[0].message);
                err.statusCode = 422;
                throw err;
            }

            next();
        }
    }
}

module.exports = ValidationMiddleware;