export async function up(knex) {
  await knex.schema.createTable('invitation_tokens', (table) => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('token').notNullable().unique();
    table
      .uuid('invitation_id')
      .notNullable()
      .references('id')
      .inTable('reviewer_invitations')
      .onDelete('CASCADE');
    table.timestamp('expires_at').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    table.index('token');
  });
}

export async function down(knex) {
  await knex.schema.dropTable('invitation_tokens');
}
