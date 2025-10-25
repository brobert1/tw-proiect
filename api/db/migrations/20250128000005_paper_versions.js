export async function up(knex) {
  await knex.schema.createTable('paper_versions', (table) => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('paper_id').notNullable().references('id').inTable('papers').onDelete('CASCADE');
    table.string('file_url').notNullable();
    table.integer('version_number').notNullable();
    table.bool('is_final_version').defaultTo(false);
    table.timestamp('submission_date').notNullable().defaultTo(knex.fn.now());
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at');

    table.index('paper_id');
    table.index(['paper_id', 'version_number']);
  });
}

export async function down(knex) {
  await knex.schema.dropTable('paper_versions');
}
