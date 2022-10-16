import {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  MessageContextMenuCommandInteraction,
  EmbedBuilder,
} from "discord.js";
import Command, { Context } from "../Command";

export default class DontAskForAsk extends Command {
  data = new ContextMenuCommandBuilder()
    .setType(ApplicationCommandType.Message)
    .setName("Enviar NPPP");

  async execute({
    interaction,
  }: Context<MessageContextMenuCommandInteraction>): Promise<void> {
    await interaction.deferReply({ ephemeral: true });
    await interaction.targetMessage.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Random")
          .setDescription(
            `Olá ${interaction.targetMessage.author}! Me desculpe incomodar, mas você não precisa perguntar para perguntar.

Em vez disso envie sua duvida de forma clara, detalhada e com objetiva.
Assim você ajuda a ser ajudado (a).

Exemplos:
\t:x: **-** Errado: Olá alguém pode me ajudar com JavaScript (Next.js)?

\t\t\t✅ **-** Certo (No forúm da sua categoria como por exemplo o <#1019636543486439585>):
`.replaceAll("\t", " ")
          )
          .addFields([
            {
              name: "Titulo",
              value: "Como usar uma api externa no Next.JS?",
              inline: true,
            },
            { name: "Tags", value: "Javascript", inline: true },
            {
              name: "Corpo",
              value: `Olá, eu tava querendo saber como usar uma api externa no Next.JS, mas eu não sei como. Eu tentei usar fetch na pagina usando o seguinte código:
\`\`\`js
<script>
  fetch("https://minhaapi.com").then(resultado => resultado.text())
    .then(resultado => {
      document.getElementById('#Texto').innerText = resultado
    });
</script>\`\`\`
Mas isso está jogando um erro, alguém sabe o porquê? Obrigado.
`,
            },
          ]),
      ],
    });
    await interaction.followUp({ ephemeral: true, content: "Enviado." });
  }
}
