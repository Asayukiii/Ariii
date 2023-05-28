import { AnyError, Errors, Event, Maker, Guild, Member, TextChannel, AnyGuildChannelWithoutThreads, AnyGuildTextChannel, AnyGuildTextChannelWithoutThreads } from 'erine';
import type { Erisa } from '../../classes/client';
import { Timeout } from 'midou.ts';

class Listeners extends Maker {
    constructor(bot: Erisa) {
        super(bot);
        this.bot = bot
    }

    @Event
    async ready() {
        this.bot.fold.sync().then(() => console.log('[/] - Slash commands updated!'));
        console.log(this.bot.user.username.concat(' is successfully started!'));
    }

    @Event
    async guildCreate(guild: Guild) {
        console.log('New guild added:', guild.name);
    }

    @Event
    async guildDelete(guild: Guild) {
        console.log('Guild removed:', guild.name ?? 'Uncached guild');
    }

    @Event
    async guildMemberAdd(member: Member) {
        const bot: Erisa = this.bot,
            status: boolean = await bot.database?.get('wstatus_'.concat(member['guildID']), 'guilds') ?? false;
        if (status) {
            const message: string = await bot.database?.get('wmsg_'.concat(member['guildID']), 'guilds') ?? 'Un nuevo miembro llegó.',
                channelId: string = await bot.database?.get('wchannel_'.concat(member['guildID']), 'guilds') ?? '';
            if (!channelId) return;
            const channel = member.guild.channels.get(channelId);
            if (!channel) return;
            await (channel as AnyGuildTextChannel).createMessage(bot.embedParser!.parse(message));
        }
    }

    @Event
    async timeoutAdd(timeout: Timeout) {
        console.log('New timeout added:', timeout);
    }

    @Event
    async timeoutRemove(timeout: Timeout) {
        console.log('Timeout removed', timeout);
    }

    @Event
    async timeoutExpired(timeout: Timeout) {
        console.log('Timeout expired:', timeout);
    }

    @Event
    async error(error: AnyError | any) {
        console.log(error);
        if (error instanceof Errors.MissingRequiredParam) {
            await error.ctx.send({
                embeds: [{
                    title: "¡Parámetro faltante!",
                    description: `El parámetro: **${error.param.name}** debe ser provisto.`,
                    fields: [{
                        name: 'Información',
                        value: [
                            `Nombre:${error.param.name}`,
                            `Descripción:${error.param.description}`,
                            `Tipo:${error.param.required ? 'Requerido' : 'No requerido'}`,
                            `AppCmdType:${error.param.type}`
                        ].map((str: string) => `**${str.split(':')[0]}**: ${str.split(':')[1]}`).join('\n')
                    }],
                    color: 0xCCE5FF
                }]
            })
        } else if (error instanceof Errors.InvalidParamMember) {
            await error.ctx.send({
                embeds: [{
                    title: "¡Miembro inválido!",
                    description: `El parámetro: **${error.param.name}** debe ser un miembro real.`,
                    fields: [{
                        name: 'Información',
                        value: [
                            `Nombre:${error.param.name}`,
                            `Descripción:${error.param.description}`,
                            `Tipo:${error.param.required ? 'Requerido' : 'No requerido'}`,
                            `AppCmdType:${error.param.type}`
                        ].map((str: string) => `**${str.split(':')[0]}**: ${str.split(':')[1]}`).join('\n')
                    }],
                    color: 0xCCE5FF
                }]
            })
        }
    }
}

export const data = Listeners;