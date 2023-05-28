import { CommandInteraction, Context, Erine, Message } from 'erine';
import { EmbedParser } from './parser';
import { Database } from 'midb';
import { CustomEvents, ErisaOptions } from '../typing';
import { client } from '../index';
import { Timeout, Timeouts } from 'midou.ts';

export class Erisa extends Erine<CustomEvents>{
    embedParser?: EmbedParser;
    database?: Database;
    timeouts?: Timeouts;
    constructor(options: ErisaOptions) {
        super(options);
        this.database = new Database(options.database);
        this.embedParser = new EmbedParser();
        this.timeouts = new Timeouts({ restore: true });
        this._init!();
    }
    private _init?(): void {
        // READY
        this.database?.on('ready', () => console.log('Database connected!'));
        this.timeouts?.on('ready', () => console.log('Timeouts restored!'));

        // RE-EMITING EVENTS
        this.timeouts?.on('create', (timeout: Timeout) => this.emit('timeoutAdd', timeout));
        this.timeouts?.on('deleted', (timeout: Timeout) => this.emit('timeoutRemove', timeout));
        this.timeouts?.on('expires', (timeout: Timeout) => this.emit('timeoutExpired', timeout));

        // STARTING SERVICES
        this.database?.start();
        this.timeouts?.start();
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