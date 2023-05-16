import { CommandInteraction, Context, Erine, Message } from 'erine';
import { Database } from 'midb';
import { ErisaOptions } from '../typing';

export class Erisa extends Erine {
    public readonly _options_: ErisaOptions;
    constructor(options: ErisaOptions) {
        super(options);
        this._options_ = options
    }
}

export class CustomContext extends Context {
    public readonly database: Database;
    constructor (client: Erisa, data: CommandInteraction | Message) {
        super(client, data);
        this.database = new Database(client._options_.database);
    }
}