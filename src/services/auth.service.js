const bcrypt = require('bcrypt')
const JwtToken = require('../utils/jwt.util')
const humps = require('humps')
const UserRepository = require('../repositories/auth.repository')
const { generateRandomString } = require('../utils/string.util')
const emailService = require('./email.service')

class UserService {
  async registerUser (data) {
    const checkUser = await UserRepository.getUserByEmail(data.email)

    if (checkUser) {
      const error = new Error('Data is exist')
      error.statusCode = 422
      throw error
    }

    const otpRegister = generateRandomString(6)

    const response = await UserRepository.register({
      ...data,
      otpRegister
    })

    await emailService.registerOTP(data.name, data.email, response.otp)
    return response
  }

  async validateOTP (data) {
    const checkUser = await UserRepository.getUserAndUserLoginInfoByEmail(data)

    if (!checkUser) {
      const error = new Error('User not exist')
      error.statusCode = 404
      throw error
    }

    if (data.otp === checkUser.otp) {
      return await UserRepository.updateStatusUser(checkUser.id)
    } else {
      const error = new Error('OTP not valid, please try with correct OTP')
      error.statusCode = 401
      throw error
    }
  }

  async loginEmail (email, password, isRemember = false) {
    const userData = await UserRepository.getUserByEmail(email)

    if (!userData || userData.status_user === 'ACTIVE') {
      const error = new Error('User not exists or account innactive')
      error.statusCode = 401
      throw error
    }

    // compare password
    const checkPassword = await bcrypt.compare(password, userData.password)
    if (!checkPassword) {
      const error = new Error('Email or password missmatch')
      error.statusCode = 401
      throw error
    }

    return await this.afterLogin(userData, isRemember)
  }

  async afterLogin (user, isRemember) {
    // create token
    const paramToken = {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role
    }

    const expiredIn = {
      duration: 1,
      shorthandUnit: 'd'
    }

    if (!isRemember) {
      expiredIn.duration = 3
      expiredIn.shorthandUnit = 'h'
    }

    const token = JwtToken.setToken(paramToken, expiredIn)

    const dataLogin = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role
      },
      token,
      isRemember
    }

    return humps.camelizeKeys(dataLogin)
  }

  async forgotPassword(param) {
    const userData = await UserRepository.getUserAndUserLoginInfoByEmail(param.email);
    
    if(!userData) {
      const error = new Error('Data not found');
      error.statusCode = 404;
      throw error;
    }

    const generateForgotToken = generateRandomString(20);
    const userLoginUpdate = await UserRepository.updateLoginInfo(
      userData.user_login_id,
      {forgot_password_token: generateForgotToken}
    );

    userData.forgot_password_token = userLoginUpdate.forgot_password_token;

    await emailService.forgotPassword(
      userData.name,
      userData.email,
      userData.forgot_password_token,
    );


    return 'success';

  }

  async resetPassword(data) {
    const checkUser = await UserRepository.getDataByToken(data.token_forgot);

    if (!checkUser) {
      const error = new Error('Data not found')
      error.statusCode = 404
      throw error;
    }

    data.password = await bcrypt.hash(data.password, 10);
    return await UserRepository.resetPassword(checkUser, data);
  }
}

module.exports = new UserService()
