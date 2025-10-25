export async function up(knex) {
  await knex.schema.createTable('conferences', (table) => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('user_id').notNullable().references('id').inTable('identities').onDelete('CASCADE');
    table.string('name').notNullable();
    table.string('acronym').notNullable();
    table.text('description');
    table.string('location');
    table.jsonb('topics');
    table.enum('status', ['draft', 'open_for_submission', 'in_review', 'completed']).notNullable().defaultTo('draft');
    table.timestamp('submission_deadline');
    table.timestamp('review_deadline');
    table.timestamp('notification_deadline');
    table.timestamp('final_version_deadline');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at');

    table.index('user_id');
    table.index('status');
  });
}

export async function down(knex) {
  await knex.schema.dropTable('conferences');
}
