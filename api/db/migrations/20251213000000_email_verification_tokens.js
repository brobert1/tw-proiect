export async function up(knex) {
  await knex.schema.createTable('email_verification_tokens', (table) => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('token').notNullable().unique();
    table.uuid('user_id').notNullable().references('id').inTable('identities').onDelete('CASCADE');
    table.timestamp('expires_at').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    table.index('token');
  });
}

export async function down(knex) {
  await knex.schema.dropTable('email_verification_tokens');
}
