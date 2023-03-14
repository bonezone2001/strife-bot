import { Command } from '@sapphire/framework';
import type { Message, TextChannel } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

export class InfoMsgCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'info_msg',
            description: 'Output a embed for the info channel',
            requiredUserPermissions: ['Administrator']
        });
    }

    public async messageRun(message: Message) {
        const channel = message.channel as TextChannel;
        channel.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Guild Information')
                    .addFields([
                        { name: 'Name', value: 'Strife', inline: true },
                        { name: 'Server', value: 'Silvermoon', inline: true },
                        { name: 'Faction', value: 'Alliance', inline: true },
                        { name: 'Guild Master', value: 'Nevaadk', inline: true },
                        { name: 'Officers', value: 'Krosa', inline: true },
                        { name: 'Progression', value: '7/8 HC 2/8 M', inline: true }
                    ])
                    .setColor(this.container.client.brandColor)
                    .setFooter({ text: `Last updated: ${new Date().toLocaleDateString('en-GB')}` })
                    .setImage('https://images-ext-1.discordapp.net/external/XoJ3B56-6dnZjRz4qUwTwg6C5dk81JoObN88suB7uJ8/https/i.imgur.com/V7fwtnH.png')
            ]
        });
    }
}