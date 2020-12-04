const express = require('express')
const bodyParser = require('body-parser');
const Discord = require('discord.js');
const app = express()
const port = process.env.PORT || 3000;

const discordServer = new Discord.WebhookClient(
  process.env.DISCORD_WEBHOOK_ID,
  process.env.DISCORD_WEBHOOK_TOKEN,
);

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  console.log(req.body);
  console.log(req.body.app);
  console.log(req.body.release);
  const app = req.body.app;
  const user = req.body.user;
  const release = req.body.release;
  hook.send(`**${app}** has been promoted to **${release}** by **${user}**.`);
  res.send('Success.');

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
