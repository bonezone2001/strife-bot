import type { SapphireClient } from "@sapphire/framework";
import type { StrifeClient } from "../lib/client";
import type { ColorResolvable } from 'discord.js';
import type { WarcraftLogsClient } from '../lib/warcraft_logs';

// Add color to the SapphireClient
declare module "@sapphire/framework" {
    interface SapphireClient {
        brandColor: ColorResolvable;
        warcraftLogs: WarcraftLogsClient;
    }
}