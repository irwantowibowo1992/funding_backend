/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw('DROP TYPE IF EXISTS "userrole";');
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.createTable(
    'user_role',
    (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('cascade')
        .onDelete('cascade')
        .notNullable();
      table.enu(
        'role',
        [
          'ADMIN',
          'USER',
        ],
        {
          useNative: true,
          enumName: 'userrole',
        },
      ).notNullable()
        .defaultTo('USER');
    },
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('user_role');
};
