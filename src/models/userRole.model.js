const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../../knexfile');

const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);
Model.knex(knex);

class UserRole extends Model {
  static get tableName () {
    return 'user_role';
  }

  static column = {
    id: `${this.tableName}.id`,
    user_id: `${this.tableName}.user_id`,
    role: `${this.tableName}.role`,
  }
}

module.exports = UserRole;