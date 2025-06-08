import { column } from '@ioc:Adonis/Lucid/Orm';

export default class User {
    @column({ isPrimary: true })
    public id: string;
}
