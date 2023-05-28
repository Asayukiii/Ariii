import type { SetupOptions } from 'erine/sand/classes/Bot';
import type { ClientEvents } from 'erine';
import type { Database, DatabaseOptions } from 'midb';
import type { Timeout } from 'midou.ts';

export interface ErisaOptions extends SetupOptions {
    database: DatabaseOptions;
}

export interface CustomEvents extends ClientEvents {
    timeoutAdd: [timeoutData: Timeout];
    timeoutRemove: [timeoutData: Timeout];
    timeoutExpired: [timeoutData: Timeout];
}