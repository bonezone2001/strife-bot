import * as dotenv from "dotenv";
import { StrifeClient } from "./lib/client";

dotenv.config();

const client = new StrifeClient();
client.login(process.env.DISCORD_TOKEN);