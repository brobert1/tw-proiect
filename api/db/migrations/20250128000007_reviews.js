export async function up(knex) {
  await knex.schema.createTable('reviews', (table) => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('paper_reviewer_id').notNullable().references('id').inTable('paper_reviewers').onDelete('CASCADE');
    table.enum('recommendation', ['strong_accept', 'accept', 'weak_accept', 'weak_reject', 'reject']).notNullable();
    table.text('feedback_for_author');
    table.text('confidential_comments');
    table.timestamp('submitted_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at');

    table.index('paper_reviewer_id');
  });
}

export async function down(knex) {
  await knex.schema.dropTable('reviews');
}
