import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, BelongsTo, belongsTo, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Obra from './Obra'
import Servicio from './Servicio'
import Maquina from './Maquina'

export default class Combo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public servicio_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Obra, {
    foreignKey: 'combo_id',
  })
  public obras: HasMany<typeof Obra>

  @belongsTo(() => Servicio, {
    foreignKey: 'servicio_id',
  })
  public servicio: BelongsTo<typeof Servicio>

  @manyToMany(() => Maquina, {
    pivotTable: 'maquina_combos',
    localKey: 'id',
    pivotForeignKey: 'combo_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'maquina_id',
  })
  public maquinas: ManyToMany<typeof Maquina>
}
