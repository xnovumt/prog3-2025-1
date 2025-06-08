import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mensaje from 'App/Models/Mensaje'
import MensajeValidator from 'App/Validators/MensajeValidator'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import { Exception } from '@adonisjs/core/build/standalone'

interface User {
  _id: string
  name: string
  email: string
}

export default class MensajesController {
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar los datos de entrada usando MensajeValidator
      const payload = await request.validate(MensajeValidator)
      const { contenido, user_from, user_to, fecha, hora } = payload

      // Verificar si el usuario emisor existe en ms-security
      let userFrom: User
      try {
        const userFromResponse = await axios.get<User>(`${Env.get('MS_SECURITY')}/api/users/${user_from}`, {
          headers: {
            Authorization: request.header('Authorization'),
          },
        })
        userFrom = userFromResponse.data

        // Validar que los datos del usuario emisor estén completos
        if (!userFrom || !userFrom._id || !userFrom.name || !userFrom.email) {
          return response.status(400).json({
            status: 'error',
            message: 'Los datos del usuario emisor no son válidos o están incompletos'
          })
        }

      } catch (error) {
        return response.status(404).json({
          status: 'error',
          message: 'Usuario emisor no encontrado',
          error: 'El usuario emisor no existe en ms-security'
        })
      }

      // Verificar si el usuario receptor existe en ms-security
      let userTo: User
      try {
        const userToResponse = await axios.get<User>(`${Env.get('MS_SECURITY')}/api/users/${user_to}`, {
          headers: {
            Authorization: request.header('Authorization'),
          },
        })
        userTo = userToResponse.data

        // Validar que los datos del usuario receptor estén completos
        if (!userTo || !userTo._id || !userTo.name || !userTo.email) {
          return response.status(400).json({
            status: 'error',
            message: 'Los datos del usuario receptor no son válidos o están incompletos'
          })
        }

      } catch (error) {
        return response.status(404).json({
          status: 'error',
          message: 'Usuario receptor no encontrado',
          error: 'El usuario receptor no existe en ms-security'
        })
      }

      // Crear el mensaje
      const mensaje = await Mensaje.create({
        contenido,
        user_from: userFrom._id,
        user_to: userTo._id,
        fecha,
        hora,
      })

      return response.status(201).json({
        status: 'success',
        message: 'Mensaje creado exitosamente',
        data: {
          id: mensaje.id,
          contenido: mensaje.contenido,
          fecha: mensaje.fecha,
          hora: mensaje.hora,
          emisor: {
            id: userFrom._id,
            name: userFrom.name,
            email: userFrom.email,
          },
          receptor: {
            id: userTo._id,
            name: userTo.name,
            email: userTo.email,
          }
        }
      })

    } catch (error) {
      // Si es un error de validación, devolver el mensaje del validator
      if (error.messages) {
        return response.status(422).json({
          status: 'error',
          message: 'Error de validación',
          errors: error.messages
        })
      }

      // Para otros tipos de errores
      return response.status(400).json({
        status: 'error',
        message: error.message || 'Ha ocurrido un error al procesar la solicitud'
      })
    }
  }

  // Obtener mensajes
  public async find({ request, params }: HttpContextContract) {
    const token = request.header('Authorization')?.replace('Bearer ', '')

    if (params.id) {
      // Obtener un mensaje específico
      const mensaje = await Mensaje.findOrFail(params.id)

      // Obtener datos del usuario emisor desde ms-security
      let userFrom: User
      try {
        const userFromResponse = await axios.get<User>(`${Env.get('MS_SECURITY')}/api/users/${mensaje.user_from}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        userFrom = userFromResponse.data
      } catch (error) {
        return { message: 'Error al obtener el usuario emisor desde ms-security', error: error.response?.data || error.message }
      }

      // Obtener datos del usuario receptor desde ms-security
      let userTo: User
      try {
        const userToResponse = await axios.get<User>(`${Env.get('MS_SECURITY')}/api/users/${mensaje.user_to}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        userTo = userToResponse.data
      } catch (error) {
        return { message: 'Error al obtener el usuario receptor desde ms-security', error: error.response?.data || error.message }
      }

      return {
        id: mensaje.id,
        contenido: mensaje.contenido,
        fecha: mensaje.fecha,
        hora: mensaje.hora,
        emisor: {
          id: userFrom._id,
          name: userFrom.name,
          email: userFrom.email,
        },
        receptor: {
          id: userTo._id,
          name: userTo.name,
          email: userTo.email,
        }
      }
    } else {
      // Obtener todos los mensajes
      const data = request.all()
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1)
        const perPage = request.input("per_page", 20)
        return await Mensaje.query().paginate(page, perPage)
      } else {
        return await Mensaje.query()
      }
    }
  }

  // Actualizar un mensaje
  public async update({ params, request }: HttpContextContract) {
    const mensaje = await Mensaje.findOrFail(params.id)
    const payload = await request.validate(MensajeValidator)

    // Verificar que el usuario emisor exista en ms-security
    try {
      await axios.get(`${Env.get('MS_SECURITY')}/api/users/${payload.user_from}`, {
        headers: {
          Authorization: request.header('Authorization'),
        },
      })
    } catch (error) {
      return { message: 'El usuario emisor no existe en ms-security', error: error.response?.data || error.message }
    }

    // Verificar que el usuario receptor exista en ms-security
    try {
      await axios.get(`${Env.get('MS_SECURITY')}/api/users/${payload.user_to}`, {
        headers: {
          Authorization: request.header('Authorization'),
        },
      })
    } catch (error) {
      return { message: 'El usuario receptor no existe en ms-security', error: error.response?.data || error.message }
    }

    mensaje.merge(payload)
    return await mensaje.save()
  }

  // Eliminar un mensaje
  public async delete({ params, response }: HttpContextContract) {
    const mensaje = await Mensaje.findOrFail(params.id)
    await mensaje.delete()
    return response.status(204)
  }
}