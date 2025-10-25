export async function up(knex) {
  await knex.schema.createTable('reviewer_invitations', (table) => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('conference_id').notNullable().references('id').inTable('conferences').onDelete('CASCADE');
    table.string('email').notNullable();
    table.string('invitation_token').notNullable().unique();
    table.enum('status', ['pending', 'accepted', 'declined']).notNullable().defaultTo('pending');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at');

    table.index('conference_id');
    table.index('email');
    table.index('invitation_token');
  });
}

export async function down(knex) {
  await knex.schema.dropTable('reviewer_invitations');
}
