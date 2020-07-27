async function up (knex){
    return knex.schema.createTable('zaplists', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description', 500).notNullable();
        table.string('hash').notNullable();
        table.integer('amount').notNullable();
        table.boolean('crowded').defaultTo(false);
        table.date('date').notNullable();

        table.unique('hash')
    });
}

async function down (knex){
    return knex.schema.dropTable('zaplists');
}

module.exports = {up, down}