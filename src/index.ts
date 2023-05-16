import { ActivityTypes } from 'erine';
import { CustomContext, Erisa } from './classes/client';
import { data } from './modules/listeners/events';
import dotenv from 'dotenv';

const TOKEN: any = dotenv.config().parsed?.['TOKEN']
const redirect = (dir: string) => __dirname.replace(process.cwd(), '').concat(dir);

const client = new Erisa({
    auth: 'Bot ' + TOKEN,
    allowedMentions: {
        users: true,
        roles: false,
        everyone: false
    },
    gateway: {
        intents: [
            'GUILDS',
            'GUILD_MEMBERS',
            'GUILD_MESSAGES',
            'MESSAGE_CONTENT'
        ],
        presence: {
            activities: [{
                name: 'Erisa 2',
                type: ActivityTypes.WATCHING
            }],
            status: 'idle'
        }
    },
    database: {
        path: './src/db',
        tables: ['members', 'guilds', 'users']
    },
    prefix: 'e!',
    guildOnly: true,
    context: CustomContext
});

client.load(redirect('/modules')).then(() => console.log('Source loaded!'));

client.connect();

export { client }