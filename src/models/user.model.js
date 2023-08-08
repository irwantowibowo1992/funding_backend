const { Model } = require('objection');
const objectionSoftDelete = require('objection-js-soft-delete');
const Knex = require('knex');
const bcrypt = require('bcrypt');
const knexConfig = require('../../knexfile');

const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);
Model.knex(knex);

const softDelete = objectionSoftDelete.default({
  columnName: 'deleted_at',
  deletedValue: new Date(),
  notDeletedValue: null,
});

class User extends softDelete(Model) {
  static get tableName () {
    return 'users'
  }

  async $beforeInsert () {
    this.password = await bcrypt.hash(this.password, 10)
    this.created_at = await new Date().toISOString()
  }

  async $beforeUpdate () {
    this.updated_at = await new Date().toISOString()
  }

  static column = {
    id: `${this.tableName}.id`,
    name: `${this.tableName}.name`,
    email: `${this.tableName}.email`,
    password: `${this.tableName}.password`,
    created_at: `${this.tableName}.created_at`,
    updated_at: `${this.tableName}.updated_at`,
    deleted_at: `${this.tableName}.deleted_at`
  }
}

module.exports = User
