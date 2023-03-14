import { Command } from '@sapphire/framework';
import type { Message, TextChannel } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

export class RolesMsgCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'roles_msg',
            description: 'Output a embed for the roles channel',
            requiredUserPermissions: ['Administrator']
        });
    }

    public async messageRun(message: Message) {
        const channel = message.channel as TextChannel;
        channel.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Class Roles')
                    .setDescription('Please react (click) the icon that corresponds with your ingame main class.')
                    .addFields([
                        { name: ' ', value: `<:warrior:1081727771627237387> Warrior
                        <:mage:1081727782419177502> Mage
                        <:priest:1081727776626856026> Priest
                        <:paladin:1081727766468235334> Paladin
                        <:shaman:1081727753855975605> Shaman
                        <:dh:1081727761586069625> Demon Hunter
                        <:evoker:1082435599237128313> Evoker`, inline: true },
                        { name: ' ', value: `<:hunter:1081727759073689730> Hunter
                        <:rogue:1081727785267101767> Rogue
                        <:warlock:1081727764006174800> Warlock
                        <:druid:1081727774047354880> Druid
                        <:monk:1081727756246732840> Monk
                        <:dk:1081727768833835008> Death Knight`, inline: true },
                    ])
                    .setColor(this.container.client.brandColor)
            ]
        });
    }
}