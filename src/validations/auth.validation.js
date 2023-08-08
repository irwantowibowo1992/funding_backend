const Joi = require('joi');

const authValidationSchema = {
    register: Joi.object({
        name: Joi.string().required().min(3).max(100),
        email: Joi.string().email().required(),
        username: Joi.string().min(6).max(50).required(),
        password: Joi.string().min(6).max(30).required
    }),

    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required(),
        isRemember: Joi.boolean().optional()
    }),

    forgotPassword: Joi.object({
        email: Joi.string().email().required()
    }),

    validateOtp: Joi.object({
        otp: Joi.string().required()
    }),

    resetPassword: Joi.object({
        password: Joi.string().min(6).max(30).required(),
        token_forgot: Joi.string().required()
    })
}

module.exports = authValidationSchema;