import { Command } from '@sapphire/framework';
import type { Message, TextChannel } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

export class SpecMsgCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'spec_msg',
            description: 'Output a embed for the spec channel',
            requiredUserPermissions: ['Administrator']
        });
    }

    public async messageRun(message: Message) {
        const channel = message.channel as TextChannel;
        channel.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Spec Roles')
                    .setDescription('Please react (click) the icon that corresponds with the role you play ingame.')
                    .addFields([
                        { name: ' ', value: `<:tank:1081727745941323836> Tank
                        <:heal:1081727751251308624> Healer
                        <:dps:1081727748386607225> Damage`, inline: true }
                    ])
                    .setColor(this.container.client.brandColor)
            ]
        });
    }
}