const knex = require('knex')

const connection = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'postgres',
        database : 'zaplist'
    },
    useNullAsDefault: true
})

module.exports = connection