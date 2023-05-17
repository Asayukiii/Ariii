import { CommandInteraction, Context, Erine, Message } from 'erine';
import { EmbedParser } from './parser';
import { Database } from 'midb';
import { ErisaOptions } from '../typing';
import { client } from '../index';

export class Erisa extends Erine {
    public readonly embedParser: EmbedParser;
    public readonly database: Database;
    constructor(options: ErisaOptions) {
        super(options);
        this.database = new Database(options.database);
        this.embedParser = new EmbedParser();
        this._init();
    }
    private _init(): void {
        this.database.on('ready', () => console.log('Database connected!'));
        this.database.start();
    }
}

export class CustomContext extends Context {
    get db() {
        return client.database
    }
    get embedParser() {
        return client.embedParser
    }
}