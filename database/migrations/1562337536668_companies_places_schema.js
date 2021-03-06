'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanyPlaceSchema extends Schema {
    up() {
        this.create('companies_places', (table) => {
            table.uuid('id').primary();
            table.uuid('company_id')
                .references('id')
                .inTable('companies')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.integer('status_id', 2).unsigned().notNullable().defaultTo(1);
            table.foreign('status_id')
                .references('id')
                .inTable('status')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.boolean('scheduling').defaultTo(false).notNullable();
            table.integer('trucks', 5).defaultTo(1).notNullable();
            table.string('price', 12).nullable();
            table.string('distance', 12).nullable();
            table.string('latitude', 30).nullable();
            table.string('longitude', 30).nullable();
            table.string('address', 200).nullable();
            table.json('data').nullable();
            table.timestamps()
        })
    }

    down() {
        this.drop('companies_places')
    }
}

module.exports = CompanyPlaceSchema