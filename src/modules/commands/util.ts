import { Context, Command, Group, Maker, Param, ParamType } from 'erine';

class Util extends Maker {
    @Group({ name: 'util', fallback: true })
    @Command({
        name: 'say',
        aliases: ['repeat'],
        description: 'Repite tu mensaje.'
    })
    @Param(ParamType.String, {
        name: 'script',
        description: 'Escribe el mensaje aquí.',
        required: true,
        ellipsis: true
    })
    async ping(d: Context) {
        const text = d.get<string>('script');
        await d.send(text!);
    }
}

export const data = Util