import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder,
} from "discord.js";
import { GenerateInteractionID } from "../../../Utils/ID";
import { CodeBlock } from "../../../Utils/Markdown";
import Command, { Context } from "../../Command";

export default class ChangelogCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("criar-changelog")
    .setDescription("Cria uma nova changelog")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option
        .setName("canal")
        .setDescription("Canal para enviar a lista de alterações")
        .setRequired(true)
    ) as SlashCommandBuilder;

  async execute({ codify, interaction }: Context) {
    const modal = new ModalBuilder()
      .setCustomId(GenerateInteractionID(interaction))
      .setTitle("Criar nova lista de alteração");

    const changelogInput = new TextInputBuilder()
      .setCustomId("changelog")
      .setLabel("Lista de alterações")
      .setMinLength(2)
      .setMaxLength(1500)
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph);

    const ask = new ActionRowBuilder().addComponents(changelogInput);

    modal.addComponents(ask as ActionRowBuilder<TextInputBuilder>);

    await interaction.showModal(modal);
    const submit = await interaction
      .awaitModalSubmit({
        time: 10000000,
        filter: (i) => i.user.id == interaction.user.id,
      })
      .catch((err) => {
        this.logger.warn(`Failed to wait for a modal! error: ${err}`);
        return;
      });

    if (submit) {
      const changelog = submit.fields.getTextInputValue("changelog");
      await submit.deferReply();
      await submit.followUp(`:stopwatch: Enviando changelog...`);
      const changelogChannelId = interaction.options.getChannel("canal")?.id;

      if (changelogChannelId == null) {
        return;
      }

      const changelogChannel = await codify.client.channels.fetch(
        changelogChannelId,
        { cache: true }
      );

      if (changelogChannel?.isTextBased()) {
        const embed = new EmbedBuilder()
          .setDescription(
            `> ⚠️ Mudanças feitas em ${new Date().toTimeString()}\n${CodeBlock(
              "diff",
              changelog
            )}`
          )
          .setColor("Blurple")
          .setAuthor({
            name: interaction.user.tag,
            iconURL:
              interaction.user.avatarURL() || interaction.user.defaultAvatarURL,
          });

        await changelogChannel
          .send({ embeds: [embed] })
          .then(() => {
            this.logger.silly(`Changelog sent to ${changelogChannelId}`);
            submit.editReply("✅ Lista de mudanças enviada.");
          })
          .catch((err) => {
            this.logger.warn(
              `Failed to send message to the channel ${changelogChannelId}. error ${err}`
            );
            submit.editReply(
              "❌ Não tenho permissão de enviar mensagens nesse canal!"
            );
          });
      } else {
        await submit.editReply("❌ Canal inválido!");
      }
    }
  }
}
