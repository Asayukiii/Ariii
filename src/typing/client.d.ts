import { SetupOptions } from 'erine/sand/classes/Bot';
import { DatabaseOptions } from 'midb';

export interface ErisaOptions extends SetupOptions {
    database: DatabaseOptions;
}