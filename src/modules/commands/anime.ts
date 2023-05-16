import { Context, Command, Group, Maker, Member, Param, ParamType } from 'erine';
import { CustomContext } from '../../classes/client';
import axios, { AxiosResponse } from 'axios';

class Anime extends Maker {
    @Group({ name: 'anime', fallback: false })
    @Command({
        name: 'banghead',
        description: 'Golpea tu cabeza.'
    })
    async banghead(d: CustomContext) {
        await d.defer();
        const response = await axios.get<APIResponse>('https://api.daimon-bot.ga/animegif?type=sfw&subtype=banghead'),
            { data } = response;
        if (response.status !== 200) return await d.followUp({ content: 'Respuesta inválida del servidor.' });
        await d.followUp({
            embeds: [{
                author: {
                    name: d.author.username.concat(' se está golpeando la cabeza.'),
                    iconURL: d.author.avatarURL('png', 256)
                },
                image: {
                    url: data['data'].url
                },
                footer: { text: 'Anime: '.concat(data['data'].name) },
                color: 0xCCE5FF
            }]
        })
    }

    @Group({ name: 'anime' })
    @Command({
        name: 'boom',
        description: 'BOOM BABY!'
    })
    async boom(d: CustomContext) {
        await d.defer();
        const response = await axios.get<APIResponse>('https://api.daimon-bot.ga/animegif?type=sfw&subtype=boom'),
            { data } = response;
        if (response.status !== 200) return await d.followUp({ content: 'Respuesta inválida del servidor.' });
        await d.followUp({
            embeds: [{
                author: {
                    name: 'BOOM!',
                    iconURL: d.author.avatarURL('png', 256)
                },
                image: {
                    url: data['data'].url
                },
                footer: { text: 'Anime: '.concat(data['data'].name) },
                color: 0xCCE5FF
            }]
        })
    }

    @Group({ name: 'anime' })
    @Command({
        name: 'claps',
        description: '¡Aplaude!'
    })
    @Param(ParamType.Member, {
        name: 'miembro',
        description: 'Selecciona al miembro al que le quieres aplaudir.',
        required: false
    })
    async claps(d: CustomContext) {
        await d.defer();
        const response = await axios.get<APIResponse>('https://api.daimon-bot.ga/animegif?type=sfw&subtype=claps'),
            { data } = response,
            target = d.get<Member>('miembro');
        if (response.status !== 200) return await d.followUp({ content: 'Respuesta inválida del servidor.' });
        if (target && target.id == d.author.id) return await d.followUp({ content: 'No te puedes aplaudir a ti mism@.' });
        if (target && target.id == d.bot.user.id) return await d.followUp({ content: 'No me puedes aplaudir.' });
        await d.followUp({
            embeds: [{
                author: {
                    name: target 
                        ? `${d.author.username} le aplaude a ${target.username}` 
                        : d.author.username.concat(' está aplaudiendo.'),
                    iconURL: d.author.avatarURL('png', 256)
                },
                image: {
                    url: data['data'].url
                },
                footer: { text: 'Anime: '.concat(data['data'].name) },
                color: 0xCCE5FF
            }]
        })
    }

    @Group({ name: 'anime' })
    @Command({
        name: 'cook',
        description: 'Cocina algo delicioso, ...o desastroso.'
    })
    @Param(ParamType.Member, {
        name: 'miembro',
        description: 'Selecciona al miembro al que le quieres cocinar.',
        required: false
    })
    async cook(d: CustomContext) {
        await d.defer();
        const response = await axios.get<APIResponse>('https://api.daimon-bot.ga/animegif?type=sfw&subtype=cook'),
            { data } = response,
            target = d.get<Member>('miembro');
        if (response.status !== 200) return await d.followUp({ content: 'Respuesta inválida del servidor.' });
        if (target && target.id == d.author.id) return await d.followUp({ content: 'No te puedes cocinar a ti mism@.' });
        if (target && target.bot) return await d.followUp({ content: 'No le puedes cocinar a bots.' });
        await d.followUp({
            embeds: [{
                author: {
                    name: target 
                        ? `${d.author.username} le cocina algo delicioso a ${target.username}` 
                        : d.author.username.concat(' está cocinando.'),
                    iconURL: d.author.avatarURL('png', 256)
                },
                image: {
                    url: data['data'].url
                },
                footer: { text: 'Anime: '.concat(data['data'].name) },
                color: 0xCCE5FF
            }]
        })
    }

    @Group({ name: 'anime' })
    @Command({
        name: 'cry',
        description: 'Desahoga tus penas.'
    })
    async cry(d: CustomContext) {
        await d.defer();
        const response = await axios.get<APIResponse>('https://api.daimon-bot.ga/animegif?type=sfw&subtype=cry'),
            { data } = response;
        if (response.status !== 200) return await d.followUp({ content: 'Respuesta inválida del servidor.' });
        await d.followUp({
            embeds: [{
                author: {
                    name: d.author.username.concat(' está llorando. :c'),
                    iconURL: d.author.avatarURL('png', 256)
                },
                image: {
                    url: data['data'].url
                },
                footer: { text: 'Anime: '.concat(data['data'].name) },
                color: 0xCCE5FF
            }]
        })
    }

    @Group({ name: 'anime' })
    @Command({
        name: 'dab',
        description: 'Haces un dab.'
    })
    async dab(d: CustomContext) {
        await d.defer();
        const response = await axios.get<APIResponse>('https://api.daimon-bot.ga/animegif?type=sfw&subtype=dab'),
            { data } = response;
        if (response.status !== 200) return await d.followUp({ content: 'Respuesta inválida del servidor.' });
        await d.followUp({
            embeds: [{
                author: {
                    name: d.author.username.concat(` está haciendo un dab en pleno ${new Date().getFullYear()}, ¿qué estará pensando?`),
                    iconURL: d.author.avatarURL('png', 256)
                },
                image: {
                    url: data['data'].url
                },
                footer: { text: 'Anime: '.concat(data['data'].name) },
                color: 0xCCE5FF
            }]
        })
    }

    @Group({ name: 'anime' })
    @Command({
        name: 'dance',
        description: 'Baila, mueve tu cuerpo.'
    })
    @Param(ParamType.Member, {
        name: 'miembro',
        description: 'Selecciona al miembro con el que quieres bailar.',
        required: false
    })
    async dance(d: CustomContext) {
        await d.defer();
        const response = await axios.get<APIResponse>('https://api.daimon-bot.ga/animegif?type=sfw&subtype=dance'),
            { data } = response,
            target = d.get<Member>('miembro');
        if (response.status !== 200) return await d.followUp({ content: 'Respuesta inválida del servidor.' });
        if (target && target.id == d.author.id) return await d.followUp({ content: 'No te mencionar a ti mism@.' });
        if (target && target.bot) return await d.followUp({ content: 'No puedes bailar con bots.' });
        await d.followUp({
            embeds: [{
                author: {
                    name: target 
                        ? `${d.author.username} se puso a bailar con ${target.username}` 
                        : d.author.username.concat(' está bailando.'),
                    iconURL: d.author.avatarURL('png', 256)
                },
                image: {
                    url: data['data'].url
                },
                footer: { text: 'Anime: '.concat(data['data'].name) },
                color: 0xCCE5FF
            }]
        })
    }

    @Group({ name: 'anime' })
    @Command({
        name: 'facepalm',
        description: 'Choca tu mano contra tu frente.'
    })
    async facepalm(d: CustomContext) {
        await d.defer();
        const response = await axios.get<APIResponse>('https://api.daimon-bot.ga/animegif?type=sfw&subtype=facepalm'),
            { data } = response;
        if (response.status !== 200) return await d.followUp({ content: 'Respuesta inválida del servidor.' });
        await d.followUp({
            embeds: [{
                author: {
                    name: d.author.username.concat(' piensa que es absurdo.'),
                    iconURL: d.author.avatarURL('png', 256)
                },
                image: {
                    url: data['data'].url
                },
                footer: { text: 'Anime: '.concat(data['data'].name) },
                color: 0xCCE5FF
            }]
        })
    }

    @Group({ name: 'anime' })
    @Command({
        name: 'laugh',
        description: '¡Riete a carcajadas!'
    })
    @Param(ParamType.Member, {
        name: 'miembro',
        description: 'Selecciona al miembro del que te quieres burlar.',
        required: false
    })
    async laugh(d: CustomContext) {
        await d.defer();
        const response = await axios.get<APIResponse>('https://api.daimon-bot.ga/animegif?type=sfw&subtype=laugh'),
            { data } = response,
            target = d.get<Member>('miembro');
        if (response.status !== 200) return await d.followUp({ content: 'Respuesta inválida del servidor.' });
        if (target && target.id == d.author.id) return await d.followUp({ content: 'No te puedes reir de ti mism@.' });
        if (target && target.id == d.bot.user.id) return await d.followUp({ content: 'No lo hagas...' });
        await d.followUp({
            embeds: [{
                author: {
                    name: target 
                        ? `${d.author.username} se está burlando de ${target.username}` 
                        : d.author.username.concat(' se está riendo muy fuerte.'),
                    iconURL: d.author.avatarURL('png', 256)
                },
                image: {
                    url: data['data'].url
                },
                footer: { text: 'Anime: '.concat(data['data'].name) },
                color: 0xCCE5FF
            }]
        })
    }

    @Group({ name: 'anime' })
    @Command({
        name: 'like',
        description: 'Te parece bien.'
    })
    async like(d: CustomContext) {
        await d.defer();
        const response = await axios.get<APIResponse>('https://api.daimon-bot.ga/animegif?type=sfw&subtype=like'),
            { data } = response;
        if (response.status !== 200) return await d.followUp({ content: 'Respuesta inválida del servidor.' });
        await d.followUp({
            embeds: [{
                author: {
                    name: d.author.username.concat(' está de acuerdo.'),
                    iconURL: d.author.avatarURL('png', 256)
                },
                image: {
                    url: data['data'].url
                },
                footer: { text: 'Anime: '.concat(data['data'].name) },
                color: 0xCCE5FF
            }]
        })
    }
}

export const data = Anime;

interface APIResponse {
    status: number;
    success: boolean;
    data: {
        name: string;
        url: string;
    }
}