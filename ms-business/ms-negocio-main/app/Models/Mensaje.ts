import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Chat from './Chat'

export default class Mensaje extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public contenido: string

  @column()
  public fecha: DateTime

  @column()
  public chat_id: number

  @column()
  public user_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Chat, {
    foreignKey: 'chat_id',
  })
  public chat: BelongsTo<typeof Chat>
}
