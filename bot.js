// My first discord bot :  
//                                     -------- JACOBOT --------
// made by yannis-mlgrn the 05/04/21 

// import the discord lib and config
const Discord = require('discord.js');
const config = require('./config.json');

// create the client
var bot = new Discord.Client();

// type info
console.log("my github : https://github.com/yannis-mlgrn/bot-lph/ \nmade by yannis-mlglrn")
console.log("[!] bot starting...")

// check all message
bot.on('ready', () =>{

	bot.user.setActivity('sors sors sors !')
	console.log('[!] Connected!')
    console.log(`[!] Logged in as ${bot.user.tag}!`);

})
bot.on("message", message => {

    if (message.author.bot) return;
    // when message begin by a !
    //if (message.content.indexOf("!") !== 0) return;

    // cut the command for take all arguments
    const args = message.content.slice(config.prefix).trim().split(/ +/s);
     // take the command 
    const command = args.shift().toLowerCase()
    // take the username of message author
    const author = message.author.username;
    const authorId = message.author;

    if (command == '!atelier') {
        // send message with all important link
        message.channel.send("\n lien visio : https://mdl29.net/visio \nlien framapad : https://annuel.framapad.org/p/LPH");
        console.log("[*] "+author+" send !atelier command");
    } 
    // simple ping pong
    if (command == '!ping') {
        message.channel.send('pong')
        console.log("[*] "+author+" send !ping command");
    }
    // Send the user's avatar URL
    if (command == '!avatar') {
        message.reply(message.author.displayAvatarURL());
        console.log("[*] "+author+" send !avatar command");
    }
    if (command == '!help') {
        // send all command and explain how to use it
        message.channel.send("les commandes :\n- !atelier : renvoi les liens importants (visio,pad...)\n- !random max : renvoi un nombre aléatoir entre 1 et le nombre inscrit\n- !avatar : renvoi l'image de ton avatar\n- !ping : le bot te répond pong\n- !yesno : créer un sondage de type yesno, ne pas oublier de mettre la question entre deux doubles cote\n- !activity : change l'activitée du bot, ne pas oublier de mettre l'activitée entre les deux doubles cote\n");
        console.log("[*] "+author+" send !help command");
    }
    // random command 
    if (command === "!random") {
        let i = args[0]; // get the first argument  
        const random = Math.floor((Math.random() * i) + 1); // random command and return a int
        message.reply('le résultat est : '+random);
        console.log("[*] "+author+" send !random command");
    }
    if (message.content.match(/quoi\s*[?!.,]*\s*$/i)) { // if the message finish by quoi the bot reply "feur !". I use a regular expression
        message.channel.send("feur !"); // then send "feur !"
    }
    if (command === "!yesno") {
        // er --> "\"(.+?)\""g
        const mess = message.content.slice(config.prefix).trim();
        const q = mess.match(/"(.+?)"/g).map(v => v.replace(/^"(.+)"$/, "$1"));// get the content between "" 
        const question = q[0] ;
        message.channel.send("nouveau sondage :");
        message.channel.send("- "+question).then(sentMessage => { // create content with user react
            sentMessage.react('👍');
            sentMessage.react('👎');
            sentMessage.react('🍺');
            console.log("[*] "+author+" send !yesno command");
        }
        );   
      }
      if (command === "!activity") {
        // er --> "\"(.+?)\""g
        const mess = message.content.slice(config.prefix).trim();
        const z = mess.match(/"(.+?)"/g).map(v => v.replace(/^"(.+)"$/, "$1"));// get the content between "" 
        const new_activity = z[0] ;
        bot.user.setActivity(new_activity)
        message.channel.send('<@'+authorId+'>'+" à mis à jour l'activité du bot\n- Nouvelle activitée --> "+new_activity);
        console.log("[*] "+author+" send !activity command\n    -> New activity : "+new_activity);
      }
});

// connect the bot ( YOU MUST HAVE A TOKEN )
bot.login(config.token);