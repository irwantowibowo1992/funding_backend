const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET_KEY
class JwtToken {
  setToken (paramToken, { duration, shorthandUnit }) {
    return jwt.sign(paramToken, jwtSecret, duration ? { expiresIn: `${duration + shorthandUnit}` } : '')
  }

  decodeToken (token) {
    const strToken = token.split(' ')[1]
    return jwt.verify(strToken, jwtSecret)
  }
}

module.exports = new JwtToken()
