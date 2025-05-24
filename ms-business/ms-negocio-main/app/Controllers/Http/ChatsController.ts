import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat';
import ChatValidator from 'App/Validators/ChatValidator';

export default class ChatsController {
  public async index({ request }: HttpContextContract) {
    const data = request.all();
    if ("page" in data && "per_page" in data) {
      const page = request.input('page', 1);
      const perPage = request.input("per_page", 20);
      return await Chat.query().paginate(page, perPage);
    } else {
      return await Chat.query();
    }
  }

  public async find({ params, response }: HttpContextContract) {
    if (!params.id) {
      return response.status(400).json({
        error: 'El parámetro "id" es requerido.',
      });
    }

    try {
      const chat = await Chat.findOrFail(params.id);
      return response.json(chat);
    } catch (error) {
      return response.status(404).json({
        error: 'Chat no encontrado.',
      });
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(ChatValidator);
    const chat = await Chat.create(payload);
    return response.status(201).json(chat);
  }

  public async update({ params, request }: HttpContextContract) {
    const theChat: Chat = await Chat.findOrFail(params.id);
    const payload = await request.validate(ChatValidator);
    theChat.merge(payload);
    return await theChat.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theChat: Chat = await Chat.findOrFail(params.id);
    response.status(204);
    return await theChat.delete();
  }
}