import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TurnoValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    operario_id: schema.number([
      rules.exists({ table: 'operarios', column: 'id' }),
    ]),
    maquina_id: schema.number([
      rules.exists({ table: 'maquinas', column: 'id' }),
    ]),
    fecha_hora: schema.string({ trim: true }, [
      rules.regex(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?)$/),
    ]),
  })

  public messages: CustomMessages = {
    'operario_id.required': 'El ID del operario es obligatorio.',
    'operario_id.exists': 'El operario especificado no existe.',
    'maquina_id.required': 'El ID de la máquina es obligatorio.',
    'maquina_id.exists': 'La máquina especificada no existe.',
    'fecha_hora.required': 'La fecha y hora son obligatorias.',
  }
}