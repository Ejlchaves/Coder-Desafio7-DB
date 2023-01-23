import knex from 'knex'
import config from '../src/config.js'

//------------------------------------------
// productos en MariaDb

try {
    const mariaDbClient = knex(config.mariaDb)

    //Implementar creación de tabla
    await mariaDbClient.schema.dropTableIfExists('productos')

    await mariaDbClient.schema.createTable('productos', table => {
        table.increments('id').primary();
        table.string('tittle', 15).notNullable();
        table.string('thumbnail').notNullable();
        table.float('price');
        table.integer('stock')
    });

    console.log('tabla productos en mariaDb creada con éxito')
} catch (error) {
    console.log('error al crear tabla productos en mariaDb')
    console.log(error)
}

//------------------------------------------
// mensajes en SQLite3
try {
    const sqliteClient = knex(config.sqlite3)

    //Implementar creación de tabla
    await sqliteClient.schema.dropTableIfExists('messages')

    console.log('Creamos tabla')
    await sqliteClient.schema.createTable('messages', table => {
        table.increments('id').primary();
        table.string('tittle', 15).notNullable();
    });

    console.log('tabla mensajes en sqlite3 creada con éxito')
} catch (error) {
    console.log(error)
}