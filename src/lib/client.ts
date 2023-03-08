import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';

export class BotClient extends SapphireClient {
    public constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages
            ],
            defaultPrefix: ''
        });
    }
}