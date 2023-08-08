/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: '7050e949-2404-452d-b007-cc8e9919ae67', 
      name: 'Rina Pratama', 
      email: 'amelkahandayani@gmail.com',
      username: 'amelkahandayani',
      password: '$2a$10$71E7uabAajQeX5l9c1AjV.BZF3ZX6/mbl4bUcncgpvUi8Fjkn7pAC',
      user_status: 'ACTIVE',
    },
  ]);

  await knex('user_role').del()
  await knex('user_role').insert([
    {
      id: 'b4691e6a-6329-45d3-8e82-17bf2f46ca34',
      user_id: '7050e949-2404-452d-b007-cc8e9919ae67',
      role: 'ADMIN'
    }
  ])
};
