const Discord = require('discord.js');
const client = new Discord.Client();
const toaq = require('./toaq_dict.js')
const camxes = require('./toaqlanguage.js')
const camxes_preproc = require('./camxes_preproc.js')
const camxes_postproc = require('./camxes_postproc.js')

const authorized_channels = ["some","channels","you","want","the","bot","to","be","active"] //personnal info
client.login('the-bot-discord-token'); //personnal info

const cmd = [".m",".s",".p",".h mietoa"]
const recmd = [new RegExp("^"+cmd[0]+" "),new RegExp("^"+cmd[1]+" "),new RegExp("^"+cmd[2]+" "),new RegExp("^"+cmd[3]+"$")]
const gochiaitao = {"shea":"_fỏa ji/ shẻa tỏatōa. go kuì bû dải tủa jí_","sia":"_tỉduāshaō go tu dó_","buo":"go bủo ka"}

client.on('ready', () => {
  console.log(gochiaitao.buo);
});

client.on('message', msg => {
  if (authorized_channels.includes(msg.channel.name) || msg.channel.name == undefined) {
    let toatoa = msg.content;
    if (recmd[0].test(toatoa)) {
      var tao = toatoa.replace(/\s+/," ").slice(cmd[0].length+1);; var opt = tao.substring(0,tao.indexOf(" "));
      if (!(opt.indexOf("+")+1)) { msg.channel.send("The " + cmd[0] + " command needs at least one option."); return; }
      var toaqcz = opt.indexOf("o")+1; var typecz = opt.indexOf("y")+1; var encz = opt.indexOf("e")+1; var untonecz = opt.indexOf("t")+1;
      var toa = tao.slice(tao.indexOf(" ")+1);
      if (toa) {
        var found_match = 0;
        if (!untonecz) { toa = undiak(toa); }
        for (i in data) {
          if ((toaqcz && ((!untonecz?data[i].toaq_undia:data[i].toaq).indexOf(toa)+1)) || (encz && (data[i].d_en.indexOf(toa)+1)) || (typecz && (data[i].t_en.indexOf(toa)+1))) {
            sendtoaq(msg,i); found_match++;
          }
        }
      } else {
        msg.channel.send(gochiaitao.shea)
      }
      if (!found_match) {msg.channel.send(gochiaitao.sia)}
      return;
    }

    if (recmd[1].test(toatoa)) {
      var tao = toatoa.slice(cmd[0].length+1);
      var opt = tao.substring(0,tao.indexOf(" "));
      if (opt.indexOf("+")+1) {
        var untonecz = opt.indexOf("t")+1;
      }
      var toa = toatoa.slice(cmd[1].length+1)
      if (toa) {
        var found_match = 0;
        if (!untonecz) { toa = undiak(toa); }
        for (i in data) {
          if ((!untonecz?data[i].toaq_undia:data[i].toaq)==toa) {
            sendtoaq(msg,i); found_match++;
          }
        }
      } else { msg.channel.send(gochiaitao.shea) }
      if (!found_match) { msg.channel.send(gochiaitao.sia) }
      return;
    }

    if (recmd[2].test(toatoa)) {
      var toa = toatoa.slice(cmd[2].length+1)
      if (toa) {
        msg.channel.send(pretty_parse(camxit(toa)));
      } else {
        msg.channel.send(gochiaitao.shea)
      }
      return;
    }

    if (recmd[3].test(toatoa)) {
      var toa = toatoa.slice(cmd[3].length+1);
      [deskx(cmd[0],"return the matchs for word/phrase for the fields: toaq ⦅option o⦆, english type ⦅option y⦆, or english description ⦅option e⦆. The letteral + is required to indicate options. To search in multiple fields at one time, options _must_ be stringed, .e.g as it: .m +oy nao")
      ,deskx(cmd[1],"return a description of the first toaq word/phrase that _exactly_ matches. Only in english currently.")
      ,"By default, both .m and .s don't care about the diacritics when performing a search. But the option t inverses this behavior."
      ,deskx(cmd[2],"return a prettified parse of a toaq text")
      ,deskx(cmd[3],"return the description of the bot mietoa and its options.")
      ,"This bot also works in Private Messages."
      ].map(function(x){msg.channel.send(x);});
      return;
    }
  }
});

function sendtoaq(msg,i) {msg.channel.send(data[i].toaq + ", _" + data[i].t_en + "_: " + rivbiroda(data[i].d_en));}
function rivbiroda(str) { return str.split('').map(function(x) { if (["_","*","\\"].includes(x)) {return "\\"+x } else {return x}}).join('') } // escape markdown tokens, since toaq's dict' use some of them
function deskx(it,as) {return it + ": " + as}
function undiak(toa) { return toa.replace(/[áàâāãǎả]/g,"a").replace(/[éèêēẽěẻ]/g,"e").replace(/[íìîīĩǐỉ]/g,"i").replace(/[óòôōõǒỏ]/g,"o").replace(/[úùûūũǔủ]/g,"u");}
function camxit(str) {
	try {	res = camxes.parse(camxes_preproc.preprocessing(str)); } catch (e) { return JSON.stringify(e); }
	return camxes_postproc.postprocessing(JSON.stringify(res, undefined, 2), 1)
}
function pretty_parse(str) {
  return camxes_postproc.prettify(str
    .replace(/\[([A-Za-z0-9_\(\)'])+ /g, "[")
    .replace(/\[ +/g, "[").replace(/ +\]/g, "]")
    .replace(/([A-Z] )\[/g, "$1[")
    )
    .replace(/ +/gm, " ");
}
