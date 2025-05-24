import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gp from 'App/Models/Gp';
import GpValidator from 'App/Validators/GpValidator';

export default class GpsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theGp: Gp = await Gp.findOrFail(params.id)
            return theGp;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Gp.query().paginate(page, perPage)
            } else {
                return await Gp.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(GpValidator);
        // Asegúrate de que payload.latitud y payload.longitud sean strings
        const theGp: Gp = await Gp.create({
            maquina_id: payload.maquina_id,
            latitud: String(payload.latitud),
            longitud: String(payload.longitud),
        });
        return theGp;
    }

    public async update({ params, request }: HttpContextContract) {
        const theGp: Gp = await Gp.findOrFail(params.id);
        const payload = await request.validate(GpValidator);
        // Asegúrate de asignar strings a theGp.latitud y theGp.longitud
        theGp.latitud = String(payload.latitud);
        theGp.longitud = String(payload.longitud);
        theGp.maquina_id = payload.maquina_id;
        return await theGp.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theGp: Gp = await Gp.findOrFail(params.id);
        response.status(204);
        return await theGp.delete();
    }
}