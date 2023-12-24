const { Errors, EventBuilder, Events } = require('erine')
const { Ariii } = require('../../structures/Ariii')
const { Utils } = require('../../auxiliar/Utils')

const data = new EventBuilder({
    name: Events.Error,
    description: 'Fired when something goes wrong.',
    once: false
})

/**
 * Event function.
 * @param {Ariii} bot - Ariii client instance.
 * @param {Error} error - Error that was emitted.
 */
async function code(bot, error) {
    if (error instanceof Errors.InvalidParamMember) {
        const message = await error.ctx.send({
            embeds: [Utils.getAriiEmbed(error.ctx, 'Invalid member provided!', error.message)],
            fetchReply: true
        })
        if (message) await message.react('❌')
    } else if (error instanceof Errors.MissingBotPermission) {
        const message = await error.ctx.send({
            embeds: [Utils.getAriiEmbed(error.ctx, 'Missing bot permissions!')],
            fetchReply: true
        })
        if (message) await message.react('❌')
    } else if (error instanceof Errors.MissingPermission) {
        const message = await error.ctx.send({
            embeds: [Utils.getAriiEmbed(error.ctx, 'Missing permissions!')],
            fetchReply: true
        })
        if (message) await message.react('❌')
    } else if (error instanceof Errors.MissingRequiredParam) {
        const message = await error.ctx.send({
            embeds: [Utils.getAriiEmbed(error.ctx, 'Missing required parameter!')],
            fetchReply: true
        })
        if (message) await message.react('❌')
    } else console.log(error)
}

module.exports['data'] = { data, code }
