const { Model } = require('objection')
const Knex = require('knex')
const knexConfig = require('../../knexfile')

const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])
Model.knex(knex)

class UserLoginInfo extends Model {
  static get tableName () {
    return 'user_login_info'
  }

  static column = {
    id: `${this.tableName}.id`,
    user_id: `${this.tableName}.user_id`,
    otp: `${this.tableName}.otp`,
    otp_count: `${this.tableName}.otp_count`,
    forgot_password_token: `${this.tableName}.forgot_password_token`,
    last_login: `${this.tableName}.last_login`
  }
}

module.exports = UserLoginInfo
