export async function up(knex) {
  await knex.schema.createTable('paper_reviewers', (table) => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('paper_id').notNullable().references('id').inTable('papers').onDelete('CASCADE');
    table.uuid('user_id').notNullable().references('id').inTable('identities').onDelete('CASCADE');
    table.enum('assignment_status', ['pending', 'accepted', 'declined', 'submitted']).notNullable().defaultTo('pending');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at');

    table.unique(['paper_id', 'user_id']);
    table.index('paper_id');
    table.index('user_id');
    table.index('assignment_status');
  });
}

export async function down(knex) {
  await knex.schema.dropTable('paper_reviewers');
}
