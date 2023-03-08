import { SapphireClient } from '@sapphire/framework';
import { WarcraftLogsClient } from './warcraft_logs';
import { GatewayIntentBits } from 'discord.js';
import type { ColorResolvable } from 'discord.js';

export class StrifeClient extends SapphireClient {
    brandColor: ColorResolvable;

    public constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ],
            defaultPrefix: '.',
            loadMessageCommandListeners: true
        });

        // Set our properties
        this.brandColor = '#fbb81c';
        this.warcraftLogs = new WarcraftLogsClient();
    }
}