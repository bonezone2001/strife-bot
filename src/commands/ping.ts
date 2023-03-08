import { Command } from '@sapphire/framework';
import type { Message, TextChannel } from 'discord.js';

export class PingCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'ping',
            aliases: ['pong'],
            description: 'ping pong'
        });
    }

    public async messageRun(message: Message) {
        const msg = await (message.channel as TextChannel).send('pong');
        return msg.edit(`pong! (took: ${msg.createdTimestamp - message.createdTimestamp}ms)`);
    }
}