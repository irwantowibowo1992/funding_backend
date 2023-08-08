const router = require('express-promise-router')()
const AuthController = require('../controllers/auth.controller')

router.post(
  '/api/register',
  AuthController.register
);

router.patch(
  '/api/validate-otp',
  AuthController.validateOtp
);

router.post(
  '/api/login',
  AuthController.login
);

router.post(
  '/api/forgot-password',
  AuthController.forgotPasswod
)

router.patch(
  '/api/reset-password',
  AuthController.resetPassword
)

module.exports = router
