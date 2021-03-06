var discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
//Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console,{
  colorize: true
});
logger.level = 'debug';

//Initialize Discord bot
var bot = new discord.Client({
  token: auth.token,
  autorun: true
});
bot.on('message', function(user, userID, channelID, message, evt){
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  if(message.substring(0,1) == '!'){
    var args = message.substring(1).split(' ');
    var cmd = args[0];

    args = args.splice(1);
    switch(cmd){
      case 'ping':
        bot.sendMessage({
          to: channelID,
          message: 'Pong!'
        });
        break;
      case 'commands':
        bot.sendMessage({
          to: channelID,
          message: '!ping: Returns "Pong!"\n!commands: Returns this list of commands\n'
        });
        break;
    }
  }
});
