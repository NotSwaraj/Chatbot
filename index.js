const Discord = require('discord.js')
//Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android" 
const client = new Discord.Client();
const fetch = require("node-fetch")
client.on('ready', () => {
  console.log(`Ready`);

});
client.on('message', async message => {
  if (message.channel.name == 'chatbot') {
    if (message.author.bot) return;
    message.content = message.content
      .replace(/@(everyone)/gi, 'everyone')
      .replace(/@(here)/gi, 'here');
    if (message.content.includes(`@`)) {
      return message.channel.send(
        `Hey! I can't listen to mentions sadly :frowning:`
      );
    }
    message.channel.startTyping();
    if (!message.content) return message.channel.send('Please say something.');
    fetch(
      `https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(
        message.content
      )}&botname=${client.user.username}&ownername=noob`
    )
      .then(res => res.json())
      .then(data => {
        message.channel.send(`${data.message}`);
      });
    message.channel.stopTyping();
  }
});
client.login("TOKEN");
