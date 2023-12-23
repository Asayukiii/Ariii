const { GatewayIntentBits: I } = require('erine')
const { Ariii } = require('./structures/Ariii')
const { Scope } = require('./structures/Scope')
const { config } = require('dotenv')

const client = new Ariii({
    context: Scope,
    intents: [
        I.Guilds,
        I.GuildMessages,
        I.MessageContent,
        I.GuildMembers
    ],
    /**
     * @param {Scope} ctx - Command context.
     */
    prefix: async (ctx) => {
        /** @type {string} */
        const prefix = await ctx.db.get(
            `PREFIX_${ctx.guild?.id}`,
            'guilds'
        ) ?? 'ai+'
        return prefix
    }
})

client.setDatabase({
    path: './internal',
    tables: [
        'guilds',
        'main'
    ]
})

client.load('./src/modules').then(async (loaded) => {
    await client.login(config().parsed?.token)
})