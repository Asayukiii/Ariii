import { Context, Command, Group, Maker, Param, ParamType } from 'erine';
import { Interpreter } from '../../classes/interpreter';

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
        const text = d.get<string>('script'),
        // @ts-ignore
        res = await Interpreter.interprete(text!, { client: d.bot, data: {}, context: d });
        await d.send(res.code);
    }
}

export const data = Util