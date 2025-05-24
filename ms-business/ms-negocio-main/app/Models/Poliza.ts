import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Operario from 'App/Models/Operario'
import Maquina from 'App/Models/Maquina'
import Seguro from 'App/Models/Seguro'

export enum TipoPolizaOperario {
  ARL = 'ARL',
  SEGURO_VIDA = 'SEGURO_VIDA',
  SEGURO_ACCIDENTES = 'SEGURO_ACCIDENTES',
}

export enum TipoPolizaMaquinaria {
  TODO_RIESGO = 'TODO_RIESGO',
  RESPONSABILIDAD_CIVIL = 'RESPONSABILIDAD_CIVIL',
  DANOS_TERCEROS = 'DANOS_TERCEROS',
}

export type TipoPoliza = TipoPolizaOperario | TipoPolizaMaquinaria

export default class Poliza extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public maquina_id: number | null

  @column()
  public operario_id: number | null

  @column()
  public seguro_id: number

  @column()
  public tipo_poliza: TipoPoliza

  @column.dateTime()
  public fecha_inicio: DateTime

  @column.dateTime()
  public fecha_fin: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Operario,{
    foreignKey: 'operario_id',
  })
  public operario: BelongsTo<typeof Operario>

  @belongsTo(() => Maquina,{
    foreignKey: 'maquina_id',
  })
  public maquina: BelongsTo<typeof Maquina>

  @belongsTo(() => Seguro,{
    foreignKey: 'seguro_id',
  })
  public seguro: BelongsTo<typeof Seguro>
}
