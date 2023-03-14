import { Listener } from '@sapphire/framework';
import type { Message, TextChannel } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

const LOGS_CHANNEL_ID = '1081727656086732911';

export class ReadyListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            event: 'messageCreate'
        });
    }

    public async run(message: Message) {
        // Check if admin sent a url in the logs channel
        const channel = message.channel as TextChannel;
        if (!message.member?.permissions.has('Administrator')) return;
        if (channel.id !== LOGS_CHANNEL_ID) return;

        // Check url is valid 
        const url = message.content.match(/https:\/\/www\.warcraftlogs\.com\/reports\/[a-zA-Z0-9]+/g);
        if (!url) return;

        // Extract report ID from url
        const reportId = url[0].split('/').pop();
        if (!reportId) return;

        // Extract the date from warcraft logs
        const logData = await this.container.client.warcraftLogs.getReportImportant(reportId!);
        const startDate = new Date(logData.data.reportData.report.startTime);
        const title = logData.data.reportData.report.title;
        const owner = logData.data.reportData.report.owner.name;

        // Get all fights that matter
        const fightsKills = logData.data.reportData.report.fights.filter((fight: any) => fight.encounterID > 0 && fight.kill);
        const fightsWipes = logData.data.reportData.report.fights.filter((fight: any) => fight.encounterID > 0 && !fight.kill);
        const kills = fightsKills.map((fight: any) => fight.name);
        const averageIlvl = fightsKills.map((fight: any) => fight.averageItemLevel).reduce((a: number, b: number) => a + b, 0) / fightsKills.length;

        // Convert message to embed
        this.container.logger.info('Converting log message to embed');
        channel.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Strife - ${startDate.toDateString()}`)
                    .addFields([
                        { name: 'Kills', value: kills.length.toString(), inline: true },
                        { name: 'Wipes', value: fightsWipes.length.toString(), inline: true },
                        { name: 'Average ilvl', value: averageIlvl.toFixed(2).toString(), inline: true },
                        { name: 'Encounters', value: kills.join('\n') }
                    ])
                    .setURL(message.content)
                    .setColor(this.container.client.brandColor)
                    .setFooter({ text: title })
            ]
        });

        // Delete original message
        message.delete();
    }
}