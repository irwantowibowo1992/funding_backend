const AuthService = require('../services/auth.service');
const SuccessResult = require('../utils/response.util');

class AuthController {
  async register(req, res) {
    const { body } = req;
    await AuthService.registerUser(body);
    SuccessResult.make(res).sendMessage(
      'We send OTP to your email, check your email and verify your account',
    );
  }

  async validateOtp(req, res) {
    const { body } = req;
    await AuthService.validateOTP(body);
    SuccessResult.make(res)
      .sendMessage('Your account is active now');
  }

  async login(req, res) {
    const { email, password, isRemember } = req.body;

    const data = await AuthService.loginEmail(email, password, isRemember);

    SuccessResult.make(res).sendWithHumps(data);
  }

  async forgotPasswod(req, res) {
    const body = req.body;

    await AuthService.forgotPassword(body);

    SuccessResult.make(res).sendMessage('Check your email to reset your password');
  }

  async resetPassword(req, res) {
    const body = req.body;

    await AuthService.resetPassword(body);
    SuccessResult.make(res).sendMessage('Reset password successfully');
  }
}

module.exports = new AuthController();
