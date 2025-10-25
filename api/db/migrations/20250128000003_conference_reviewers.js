export async function up(knex) {
  await knex.schema.createTable('conference_reviewers', (table) => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('user_id').notNullable().references('id').inTable('identities').onDelete('CASCADE');
    table.uuid('conference_id').notNullable().references('id').inTable('conferences').onDelete('CASCADE');
    table.jsonb('expertise_topics');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at');

    table.unique(['user_id', 'conference_id']);
    table.index('user_id');
    table.index('conference_id');
  });
}

export async function down(knex) {
  await knex.schema.dropTable('conference_reviewers');
}
