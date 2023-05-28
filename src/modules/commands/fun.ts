import { Command, Group, Maker, Param, ParamType } from 'erine';
import { CustomContext } from '../../classes/client';

class Fun extends Maker {
    @Group({ name: 'fun '})
    @Command({
        name: 'youtube',
        description: 'Genera una captura de YouTube.'
    })
    @Param(ParamType.String, {
        name: 'titulo',
        description: 'El titulo del video.',
        required: true
    })
    @Param(ParamType.String, {
        name: 'url',
        description: 'El enlace de la imagen.',
        required: true
    })
    async yt(d: CustomContext) {
        const IMAGE = d.get<string>('url'), TITLE = d.get<string>('titulo'),
            API = 'https://api.daimon-bot.ga/image/yttitle?title=' + TITLE + '&image=' + IMAGE;
        await d.send({
            embeds: [{
                image: {
                    url: API
                },
                color: 0xCCE5FF
            }]
        })
    }
}

export const data = Fun;