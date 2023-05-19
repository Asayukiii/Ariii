import { SetupOptions } from 'erine/sand/classes/Bot';
import { Events } from 'erine';
import { DatabaseOptions } from 'midb';
import { Timeout } from 'midou.ts';

export interface ErisaOptions extends SetupOptions {
    database: DatabaseOptions;
}

export interface CustomEvents extends Events {
    timeoutAdd: [timeoutData: Timeout];
    timeoutRemove: [timeoutData: Timeout];
}