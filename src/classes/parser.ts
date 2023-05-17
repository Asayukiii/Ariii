import { Builders, CreateMessageOptions, EmbedOptions } from 'erine';

export class EmbedParser {
    public content: string;
    public embeds: EmbedOptions[];
    constructor () {
        this.content = '';
        this.embeds = [];
    }

    /**
     * Parses Embed Parser code.
     * @param code 
     * @returns 
     */
    public parse(code: string): CreateMessageOptions {
        this.clear();
        if (!code.includes('$newEmbed[')) return { content: code, embeds: this.embeds };
        const embedData = code.split('$newEmbed[').slice(1);
        for (const data of embedData) {
            const embed = new Builders.EmbedBuilder();
            if (this.check(data, 'setTitle')) {
                embed.setTitle(this.unpack(data, 'setTitle'));
            };
            if (this.check(data, 'setThumbnail')) {
                embed.setThumbnail(this.unpack(data, 'setThumbnail'));
            };
            if (this.check(data, 'setDescription')) {
                embed.setDescription(this.unpack(data, 'setDescription'));
            };
            if (this.check(data, 'setImage')) {
                embed.setImage(this.unpack(data, 'setImage'));
            };
            if (this.check(data, 'setColor')) {
                embed.setColor(parseInt(this.unpack(data, 'setColor'), 16));
            };
            if (this.check(data, 'setFooter')) {
                const splits = this.splits(this.unpack(data, 'setFooter'));
                splits.length > 1 
                    ? embed.setFooter(splits[0])
                    : embed.setFooter(splits[0], splits[1]);
            };
            if (this.check(data, 'addField')) {
                const splits = this.splits(this.unpack(data, 'addField'));
                embed.addField(splits[0], splits[1], Boolean(splits[2]) ?? false);
            };
            this.embeds.push(embed.toJSON());
        }
        return { content: this.content, embeds: this.embeds };
    }

    /**
     * Checks if the code contains a function.
     * @param src Source code.
     * @param sample Function match.
     * @returns {boolean}
     */
    private check(src: string, sample: EmbedFunction): boolean {
        return src.includes(sample);
    }

    /**
     * Unpacks the function inside.
     * @param src Source code.
     * @param sample Function match.
     * @returns {string}
     */
    private unpack(src: string, sample: EmbedFunction): string {
        return src.split(`$${sample}[`).slice(1).join('').split(']').slice(0, 1).join('').trim();
    }

    /**
     * Returns the inside splits.
     * @param src Function inside.
     * @returns {string[]}
     */
    private splits(src: string): string[] {
        return src.split(';').map(split => split.trim());
    }

    /**
     * Re-starts the embeds array.
     */
    private clear(): void {
        this.content = '';
        this.embeds = [];
    }
}

interface PartialMessageObject {
    content: string;
    embeds: Builders.EmbedBuilder[];
}
declare type EmbedFunction = 'setTitle' | 'setThumbnail' | 'setDescription' | 'setImage' | 'setFooter' | 'setColor' | 'addField';