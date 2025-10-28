export async function up(knex) {
  await knex.raw(`
    CREATE TYPE conference_status AS ENUM ('upcoming', 'ongoing', 'completed');
  `);

  await knex.schema.createTable('conferences', (table) => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('user_id').notNullable().references('id').inTable('identities').onDelete('CASCADE');
    table.string('name').notNullable();
    table.string('acronym').notNullable();
    table.text('description');
    table.string('location');
    table.timestamp('conference_date');
    table.jsonb('topics');
    table.timestamp('submission_deadline');
    table.timestamp('review_deadline');
    table.specificType('status', 'conference_status').notNullable().defaultTo('upcoming');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at');

    table.index('user_id');
    table.index('status');
  });
}

export async function down(knex) {
  await knex.schema.dropTable('conferences');
  await knex.raw('DROP TYPE conference_status;');
}
