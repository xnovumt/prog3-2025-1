import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MensajeValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    contenido: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(1000)
    ]),
    user_from: schema.string({ trim: true }, [
      rules.required()
    ]),
    user_to: schema.string({ trim: true }, [
      rules.required()
    ]),
    fecha: schema.date(),
    hora: schema.string([], [
      rules.regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    ])
  })

  public messages: CustomMessages = {
    'contenido.required': 'El contenido del mensaje es obligatorio.',
    'contenido.maxLength': 'El contenido no puede exceder los 1000 caracteres.',
    'user_from.required': 'El ID del usuario emisor es obligatorio.',
    'user_to.required': 'El ID del usuario receptor es obligatorio.',
    'fecha.required': 'La fecha es obligatoria.',
    'fecha.date': 'La fecha debe ser una fecha válida.',
    'hora.required': 'La hora es obligatoria.',
    'hora.regex': 'La hora debe tener un formato válido (HH:MM:SS).'
  }
}