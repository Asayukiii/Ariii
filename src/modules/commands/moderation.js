const {
    Utils
} = require('../../auxiliar/Utils')

const {
    CommandBuilder,
    GroupBuilder,
    ParamsBuilder,
    Plugins,
    PermissionFlagsBits,
    Errors
} = require('erine')

const BAN_MESSAGES = Object.freeze([
    'You\'ve been banned faster than a cat video spreads on the internet. Meow you know.',
    'Looks like your membership just got downgraded from \'VIP\' to \'Virtually Inaccessible Person.\' 🚫',
    'You\'ve been banned for violating the laws of physics. Time to find a server in another dimension!',
    'Banned for attempting to smuggle in excessive puns. We have a strict pun control policy here.',
    'Congratulations! You\'ve won a free ban from our exclusive Ban Club. Membership: 0. Enjoy your solitude.',
    'Banned for trying to breakdance in a text-based world. Your moves were too pixelated for us to handle.',
    'Sorry, but your subscription to this server has been canceled. Please contact our customer disservice for more information.',
    'Banned for trying to out-meme the meme lord. Nice try, but we\'re keeping the meme balance intact.',
    'Looks like you\'ve just been voted off the server\'s island. Better luck next reality show!',
    'Breaking News: User banned for attempting to bring chaos to our utopian server. Order has been restored.'
])

/**
 * @type {import('erine').FileModule[]}
 */
const DATA = [
    {
        data: new GroupBuilder({
            name: 'mod',
            description: 'Swiftly enforce rules and maintain order with powerful Discord moderation commands.',
            aliases: ['moderation'],
            as_prefix: false
        })
        .addCommand({
            data: new CommandBuilder({
                name: 'ban',
                description: 'Permanently removes a user from the server.',
                aliases: ['b', 'yeet', 'gtfo', 'bean', 'thanos-snap'],
                defaultMemberPermissions: PermissionFlagsBits.BanMembers,
                dmPermission: false
            }),
            plugins: [
                Plugins.hasBotPerms('BanMembers'),
                Plugins.hasPerms('BanMembers')
            ],
            params: new ParamsBuilder()
            .addMember({
                name: 'member',
                description: 'Guild member to be banned.',
                required: true
            })
            .addString({
                name: 'reason',
                description: 'The reason of the ban.',
                required: false,
                ellipsis: true
            }),
            code: async (ctx) => {
                /** @type {import('erine').GuildMember | null} */
                const member = ctx.get('member')
                /** @type {string} */
                const reason = ctx.get('reason') ?? 'No reason provided.'
                if (member === null) throw new Errors.InvalidParamMember(
                    ctx, ctx.params?.[0],
                    `Expected a valid member in position 1, provided: "${member ?? ctx.params?.[0].value ?? ctx.args?.[0]}"`
                )
                if (!member.bannable) throw new Errors.InvalidParamMember(
                    ctx, ctx.params?.[0],
                    `"${member.displayName ?? member.user.username}" is not bannable.`
                )

                member.ban({ reason })
                    .then(async (guildMember) => {
                        await ctx.send({
                            embeds: [
                                Utils.getAriiEmbed(
                                    ctx,
                                    `${guildMember.user.displayName ?? guildMember.user.username} was banned.`,
                                    BAN_MESSAGES.at(Math.floor(Math.random() * BAN_MESSAGES.length)),
                                    [
                                        {
                                            name: 'Reason',
                                            value: reason
                                        },
                                        {
                                            name: 'Moderator',
                                            value: `${ctx.author.displayName ?? ctx.author.username} [${ctx.author.id}]`
                                        }
                                    ]
                                )
                            ]
                        })
                    })
                    .catch((reject) => {
                        throw new Errors.InvalidParamMember(
                            ctx, ctx.params?.[0],
                            `Something went wrong when trying to ban "${member.displayName ?? member.user.username}".`
                        )
                    })
            }
        })
    }
]

module.exports['data'] = DATA