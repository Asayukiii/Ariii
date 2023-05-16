import { Context, Command, Group, Maker } from 'erine';
import { cpus } from 'os';

class Bot extends Maker {
    @Group({ name: 'bot', fallback: true })
    @Command({
        name: 'ping',
        aliases: ['latency'],
        description: 'Regresa la latencia del shard actual.'
    })
    async ping(d: Context) {
        await d.send({
            embeds: [{
                title: 'Latencia en el shard actual',
                thumbnail: {
                    url: d.guild?.iconURL('png', 512) ?? d.bot.user.avatarURL('png', 512)
                },
                description: `Mi latencia es \`${d.guild?.shard.latency} ms\``,
                footer: {
                    text: d.guild!.name
                },
                color: 0xCCE5FF
            }]
        });
    }

    @Group({ name: 'bot' })
    @Command({
        name: 'info',
        description: 'Muestra información técnica de Erisa.',
        aliases: ['about']
    })
    async info(d: Context) {
        await d.send({
            embeds: [{
                title: 'Acerca de '.concat(d.bot.user.tag),
                thumbnail: {
                    url: d.bot.user.avatarURL('png', 512)
                },
                description: 'Llena de utilidad y productividad.',
                fields: [{
                    name: 'Dependencias',
                    value: [
                        `TypeScript:${require('typescript').version}`,
                        `Node.JS:${require('process').version.replace('v', '')}`,
                        `Erine:${require('erine/package.json').version}`
                    ].map((str: string) => `**${str.split(':')[0]}**: ${str.split(':')[1]}`).join('\n')
                },{
                    name: 'Estadísticas',
                    value: [
                        `Servidores:${d.bot.guilds.size ?? 0} servidores`,
                        `Usuarios totales:${d.bot.users.size ?? 0} usuarios`
                    ].map((str: string) => `**${str.split(':')[0]}**: ${str.split(':')[1]}`).join('\n')
                },{
                    name: 'Sistema',
                    value: [
                        `Uso de CPU:${await cpu()} %`,
                        `Uso de RAM:${(process.memoryUsage()['heapUsed'] / 1024 / 1024).toFixed(2)} MB`
                    ].map((str: string) => `**${str.split(':')[0]}**: ${str.split(':')[1]}`).join('\n')
                }],
                footer: {
                    text: d.guild!.name
                },
                color: 0xCCE5FF
            }]
        })
    }
}

export const data = Bot

async function cpu() {
    // @ts-ignore
    const avgs = cpus().map(cpu => {
        const total: any = Object.values(cpu.times).reduce((a: any, b: any) => a + b);
        const nonIdle = total - cpu.times.idle;
        return nonIdle / total
    })
    return (avgs.reduce((a: number, b: number) => a + b) / cpus().length).toFixed(2);
}