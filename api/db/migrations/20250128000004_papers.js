export async function up(knex) {
  await knex.schema.createTable('papers', (table) => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('user_id').notNullable().references('id').inTable('identities').onDelete('CASCADE');
    table.uuid('conference_id').notNullable().references('id').inTable('conferences').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('abstract');
    table.jsonb('topics');
    table.enum('status', ['submitted', 'under_review', 'revisions_required', 'accepted', 'rejected', 'withdrawn']).notNullable().defaultTo('submitted');
    table.jsonb('co_authors');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at');

    table.index('user_id');
    table.index('conference_id');
    table.index('status');
  });
}

export async function down(knex) {
  await knex.schema.dropTable('papers');
}
