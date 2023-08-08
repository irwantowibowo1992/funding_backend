const router = require('express-promise-router')()
const AuthController = require('../controllers/auth.controller');
const ValidationMiddleware = require('../middlewares/validation.middleware');
const authValidationSchema = require('../validations/auth.validation');

router.post(
  '/api/register',
  ValidationMiddleware.validateBody(
    authValidationSchema.register
  ),
  AuthController.register
);

router.patch(
  '/api/validate-otp',
  ValidationMiddleware.validateBody(
    authValidationSchema.validateOtp
  ),
  AuthController.validateOtp
);

router.post(
  '/api/login',
  ValidationMiddleware.validateBody(
    authValidationSchema.login
  ),
  AuthController.login
);

router.post(
  '/api/forgot-password',
  ValidationMiddleware.validateBody(
    authValidationSchema.forgotPassword
  ),
  AuthController.forgotPasswod
)

router.patch(
  '/api/reset-password',
  ValidationMiddleware.validateBody(
    authValidationSchema.resetPassword
  ),
  AuthController.resetPassword
)

module.exports = router
