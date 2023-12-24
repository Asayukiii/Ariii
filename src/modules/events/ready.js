const { ActivityType, EventBuilder, Events } = require('erine')
const { Console } = require('../../auxiliar/Console')
const { Ariii } = require('../../structures/Ariii')

const data = new EventBuilder({
    name: Events.ClientReady,
    description: 'Fired when client user is ready.',
    once: true
})

/**
 * Event function.
 * @param {Ariii} bot - Ariii client instance.
 */
async function code(bot) {
    Console.Log('Successfully connected to the Discord Gateway!')
    Console.Log(`- > Connected as: "${bot.user?.username}" - [${bot.user?.id}]`)

    bot.sync()
        .then(() => Console.Success('- - > Commands successfully synced.'))
        .catch((reject) => {
            Console.Error('- - > Cannot sync commands!')
            console.error(reject)
        })
    
    bot.db
        .once('ready', () => Console.Success('- - > Database connected.'))
        .start()
    
    bot.user.setPresence({
        activities: [
            {
                name: 'Made with ♡ by Asayukiii. ☻',
                type: ActivityType.Custom
            }
        ],
        status: 'online',
        afk: false
    })
}

module.exports['data'] = { data, code }
