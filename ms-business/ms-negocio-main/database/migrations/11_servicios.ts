import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'servicios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('costo').notNullable(),
      table.date('f_inicio').notNullable(),
      table.date('f_fin').notNullable(),
      table.string('prioridad').notNullable(),
      table.string('tipo').notNullable(),
      table.string('estado').notNullable(),
      table.string('ubicacion').notNullable(),
      table.string('resumen').notNullable(),
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
