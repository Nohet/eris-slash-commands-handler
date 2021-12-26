import Client, { CommandInteraction } from "eris"
import { readdirSync } from "fs"

import { config } from "dotenv"

config({path: "./config.env"})

const client = new Client(process.env.BOT_TOKEN, {intents: []})
const commands = []

client.on("ready", async () => {
    const commandFiles = readdirSync("./commands").filter(file => file.endsWith(".js"))

    for (let element of commandFiles) {
        const slashCommandObject = await import(`./commands/${element}`)

        await client.createGuildCommand(process.env.SLASH_COMMANDS_GUILD, slashCommandObject.default.data)
        // Use code underneath for global slash commands
        // await client.createCommand(slashCommandObject.default.data)
        commands.push({name: slashCommandObject.default.data.name, run: slashCommandObject.default.run})
    }
    console.info("Loaded application (/) commands!")
})

client.on("interactionCreate", async (interaction) => {
    if(interaction instanceof CommandInteraction) {
        for(let slashCommand of commands) {
            if (slashCommand.name === interaction.data.name) {
                await slashCommand.run(client, interaction)
                break
            }
        }
    }
})

client.connect()