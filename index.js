const express = require('express')
const bodyParser = require('body-parser');
const Discord = require('discord.js');
const app = express()
const port = process.env.PORT || 3000;

const discordServer = new Discord.WebhookClient(
  process.env.DISCORD_WEBHOOK_ID,
  process.env.DISCORD_WEBHOOK_TOKEN,
);

const githubMap = {};
process.env['GITHUB_MAP'].split(';').forEach(m => {
  const item = m.split(':');
  githubMap[item[0]] = item[1];
  console.log(`Registered GitHub mapping [${item[0]}] = ${item[1]}`);
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  console.log(req.body);
  const app = req.body.app;
  const user = req.body.user;
  const release = req.body.release;
  const head = req.body.head;
  let commitBase = '';
  if(githubMap.hasOwnProperty(app)) {
    commitBase = 'https://github.com/' + githubMap[app] + '/commit';
  }
  discordServer.send(
    `**${app}** has been promoted to **${release}** ([${head}](${commitBase}/${head}))!`
  );
  res.send('Success.');

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
