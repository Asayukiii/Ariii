import { CommandInteraction, Context, Erine, Message } from 'erine';
import { EmbedParser } from './parser';
import { Database } from 'midb';
import { CustomEvents, ErisaOptions } from '../typing';
import { client } from '../index';
import { Timeouts } from 'midou.ts';

export class Erisa<CustomEvents> extends Erine {
    public readonly embedParser: EmbedParser;
    public readonly database: Database;
    public readonly timeouts: Timeouts;
    constructor(options: ErisaOptions) {
        super(options);
        this.database = new Database(options.database);
        this.embedParser = new EmbedParser();
        this.timeouts = new Timeouts({ restore: true });
        this._init();
    }
    private _init(): void {
        this.database.on('ready', () => console.log('Database connected!'));
        this.timeouts.on('ready', () => console.log('Timeouts restored!'));
        this.database.start();
        this.timeouts.start();
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