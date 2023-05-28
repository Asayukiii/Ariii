import { ButtonStyles, Command, ComponentTypes, Dispatch, GuildComponentButtonInteraction, Maker } from 'erine';
import { CustomContext } from '../../classes/client';

class Dev extends Maker {
    @Dispatch
    async buttonResponse(interaction: GuildComponentButtonInteraction) {
        await interaction.editParent({ content: 'edited', components: [] })
    }

    @Command({ name: 'button', slash: false })
    async button(d: CustomContext) {
        await d.send({
            content: 'original',
            components: [{
                type: ComponentTypes.ACTION_ROW,
                components: [{
                    type: ComponentTypes.BUTTON,
                    label: 'Hi uwu',
                    customID: 'buttonResponse',
                    style: ButtonStyles.PRIMARY
                }]
            }]
        })
    }
}

export const data = Dev;