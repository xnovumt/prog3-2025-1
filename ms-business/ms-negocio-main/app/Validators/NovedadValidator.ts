import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NovedadValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    tipo: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    descripcion: schema.string({ trim: true }, [
      rules.maxLength(500)
    ]),
    gravedad: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    turno_id: schema.number([
      rules.exists({ table: 'turnos', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'tipo.required': 'El tipo de novedad es obligatorio.',
    'tipo.maxLength': 'El tipo no puede exceder los 255 caracteres.',
    'descripcion.required': 'La descripción de la novedad es obligatoria.',
    'descripcion.maxLength': 'La descripción no puede exceder los 500 caracteres.',
    'gravedad.required': 'La gravedad es obligatoria.',
    'gravedad.maxLength': 'La gravedad no puede exceder los 255 caracteres.',
    'turno_id.required': 'El ID del turno es obligatorio.',
    'turno_id.exists': 'El turno especificado no existe.'
  }
}