const { Scope } = require("../structures/Scope");

class Utils {
    /**
     * Generates a stylish embed.
     * @param {Scope} context - Command scope.
     * @param {string} title - Embed title.
     * @param {string} description 
     * @param {?{ name: string, value: string, inline?: boolean }[]} fields 
     * @returns 
     */
    static getAriiEmbed(context, title, description, fields) {
        return {
            title, description, fields,
            footer: {
                text: `${context.bot.user?.username} by Asayukiii`,
                icon_url: context.bot.user?.displayAvatarURL()
            },
            color: parseInt('FF0000', 16),
            timestamp: (new Date).toISOString()
        }
    }
}

module.exports = { Utils }
