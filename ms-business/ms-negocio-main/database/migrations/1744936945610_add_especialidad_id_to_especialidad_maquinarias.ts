import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddEspecialidadIdToEspecialidadMaquinarias extends BaseSchema {
    protected tableName = 'especialidad_maquinarias'

    public async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer('especialidad_id').unsigned().references('id').inTable('especialidads').onDelete('CASCADE')
        })
    }

    public async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('especialidad_id')
        })
    }
}