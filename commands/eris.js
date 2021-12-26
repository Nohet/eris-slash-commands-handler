import { Constants } from "eris"

export default {
    data: {
        name: "eris",
        description: "Basic slash command.",
        type: Constants.ApplicationCommandTypes.CHAT_INPUT
    },
    run: async (client, interaction) => {
        await interaction.createMessage("Interaction received!\nRespond send from eris slash command handler.")
    }
}