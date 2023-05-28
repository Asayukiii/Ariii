import { Command, Group, Maker, Member, Param, ParamType } from 'erine';
import { CustomContext } from '../../classes/client';

class User extends Maker {
    @Group({ name: 'user' })
    @Command({
        name: 'info',
        aliases: ['about', 'information'],
        description: 'Regresa la información de un usuario.'
    })
    @Param(ParamType.Member, {
        name: 'usuario',
        description: 'El usuario del que quieres obtener la información.',
        required: false
    })
    async info(d: CustomContext) {
        await d.defer();
        const USER = d.get<Member>('usuario') ?? d.member;
        await d.followUp({
            embeds: [{
                title: 'Información de '.concat(USER!.username),
                thumbnail: {
                    url: USER!.avatarURL('png', 512)
                },
                description: [
                    `Fecha de creación%<t:${(USER?.createdAt.getTime()! / 1000).toFixed(0)}:R>`
                ].map((str: string) => `**${str.split('%')[0]}**: ${str.split('%')[1]}`).join('\n'),
                color: 0xCCE5FF
            }]
        })
    }
}

export const data = User;