const UserModel = require('../models/user.model')
const UserLoginModel = require('../models/userLogin.model')

class AuthRepository {
  async getUserByEmail (email) {
    return await UserModel.query()
      .select(
        'u.id',
        'u.name',
        'u.email',
        'u.username',
        'u.password',
        'u.user_status',
        'ur.role as user_role'
      )
      .alias('u')
      .leftJoin(
        { ur: 'user_role' },
        (join) => {
          join.on(
            'ur.user_id',
            'u.id'
          )
        }
      )
      .where({
        email
      })
      .first()
  }

  async register (data) {
    let dataUserRegistered
    await UserModel.transaction(async (trx) => {
      const dataUser = await UserModel.query(trx).insert(
        {
          name: data.name,
          email: data.email,
          username: data.username,
          password: data.password
        }
      )

      dataUserRegistered = await UserLoginModel.query(trx)
        .insert({
          otp: data.otpRegister,
          user_id: dataUser.id
        })
    })
    return dataUserRegistered
  }

  async getUserAndUserLoginInfo (data) {
    return await UserModel.query()
      .select(
        'u.id',
        'ul.otp'
      )
      .alias('u')
      .leftJoin(
        { ul: 'user_login_info' },
        (join) => {
          join.on(
            'ul.user_id',
            'u.id'
          )
        }
      )
      .where('ul.otp', data.otp)
      .first()
  }

  async getUserAndUserLoginInfoByEmail (email) {
    return UserModel.query().select(
      'u.id',
      'u.name',
      'u.email',
      'ul.id as user_login_id',
      'ul.otp',
      'ul.otp_count',
      'ul.forgot_password_token',
  )
      .alias('u')
      .leftJoin(
          {ul: 'user_login_info'},
          (join) => {
              join.on(
                  'u.id',
                  'ul.user_id'
              )
          }
      )
      .where(
          {
              email: email,
          }
      )
      .first();
  }

  async updateStatusUser (userId) {
    return await UserModel.query()
      .patch({
        user_status: 'ACTIVE'
      })
      .where({
        id: userId
      })
  }

  async updateLoginInfo(id, data) {
    return UserLoginModel.query()
      .patchAndFetchById(id, data)
  }

  async resetPassword(user, data) {
    return await UserModel.transaction(async (trx) => {
      await Promise.all([
        UserModel.query(trx).patchAndFetchById(
          user.user_id,
          {
            password: data.password
          }
        ),

        UserLoginModel.query(trx).patchAndFetchById(
          user.id,
          {
            forgot_password_token: null
          }
        )
      ])
    })
  }

  async getDataByToken(token) {
    return await UserLoginModel.query()
    .select(
      'ul.id',
      'u.id as user_id',
    )
    .alias('ul')
    .leftJoin(
      {u: 'users'},
      (join) => {
        join.on(
          'u.id',
          'ul.user_id'
        )
      }
    )
    .where('ul.forgot_password_token', token)
    .first();
  }
}

module.exports = new AuthRepository()
