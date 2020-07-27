async function up (knex){
    return knex.schema.createTable('zaplistitems', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('list_id').notNullable()
                                .references('id')
                                .inTable('zaplists')
                                .onDelete('CASCADE');

    });
}

async function down (knex){
    return knex.schema.dropTable('zaplistitems');
}

module.exports = {up, down}