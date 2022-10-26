import { ActivityType, Client } from "discord.js";

export default async function updateStatus(client: Client) {
  client.user?.setPresence({
    activities: [{ name: "Codify community", type: ActivityType.Watching }],
    status: "dnd",
  });
}
