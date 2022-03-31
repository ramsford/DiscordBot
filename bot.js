const { Client, Intents } = require("discord.js");
const config = require("./config.json");

global.bot = new Client({
    intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES], allowedMentions: {
        parse: ["users",
            "roles"], repliedUser: true
    }
});
bot.config = config;
if (!bot.config.prefix)
    bot.config.prefix = "";
bot.login(config.token);
bot.on("ready", async function () {
    try {
        console.log(`Logged in as ${bot.user.tag} !`);
        console.log("Servers :");
        await bot.guilds.fetch().then(guilds => {
            guilds.forEach(guild => {
                console.log(`- ${guild.name}`);
            });
        });
        console.log("\n");
    } catch (exception) {
        console.log(`ERREUR at ${new Date()}\nErreur lors du démarrage du
    bot.\n\nL\'erreur suivante s\'est produite :\n${exception.stack}`);
    }
});
bot.on("messageCreate", message => {
    try {
        if (!bot.config.prefix ||
            !message.content.startsWith(bot.config.prefix) || message.author.bot)
            return;
        if (message.content === `${bot.config.prefix}ping`)
            message.reply("ratio");
    } catch (exception) {
        message.channel.send(`__**ERREUR**__\n${exception.message}`);
    }
});
