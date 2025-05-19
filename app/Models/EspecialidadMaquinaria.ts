import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Especialidad from './Especialidad'
import Maquina from './Maquina'

export default class EspecialidadMaquinaria extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tipo_servicio_id: number

  @column()
  public maquina_id: number

  @column()
  public especialidad_id: number // Nuevo atributo

  @column()
  public tipo_trabajo: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Especialidad, {
    foreignKey: 'especialidad_id',
  })
  public especialidad: BelongsTo<typeof Especialidad>

  @belongsTo(() => Maquina, {
    foreignKey: 'maquina_id',
  })
  public maquina: BelongsTo<typeof Maquina>
}
