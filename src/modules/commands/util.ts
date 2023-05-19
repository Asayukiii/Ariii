import { Command, Group, Maker, Param, ParamType } from 'erine';
import { CustomContext } from '../../classes/client';

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
    async say(d: CustomContext) {
        const text = d.get<string>('script'),
            data = d.embedParser.parse(text!);
        await d.send(data);
    }
}

export const data = Util