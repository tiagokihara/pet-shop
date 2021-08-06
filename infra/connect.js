const { Client } = require('pg')

const conn = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'pet-shop',
    password: 'kihara',
    port: 5432,
})

module.exports = conn