import { Command, Group, Maker, Param, ParamType } from 'erine';
import { CustomContext } from '../../classes/client';

class Giveaway extends Maker {

    @Group({ name: 'giveaway', aliases: ['sorteos'] })
    @Command({
        name: 'create',
        aliases: ['new'],
        description: 'Inicia un nuevo sorteo.'
    })
    @Param(ParamType.String, { name: 'tiempo', description: 'El tiempo del sorteo.', required: true })
    @Param(ParamType.String, { name: 'premio', description: 'El premio del sorteo.', required: true })
    @Param(ParamType.String, { name: 'ganadores', description: 'La cantidad de ganadores', required: false })
    async gCreate(d: CustomContext) {}

}

export const data = Giveaway;