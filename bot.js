const Discord = require('discord.js');
const client = new Discord.Client();
const toaq = require('./toaq_dict.js')
const camxes = require('./toaqlanguage.js')
const camxes_preproc = require('./camxes_preproc.js')
const camxes_postproc = require('./camxes_postproc.js')

const authorized_channels = ["general","chiejo","off-topic"] //personnal info
client.login('your-discord-token'); //personnal info

const eskptel = "[*A-Za-z0-9\\(\\)]*:? ?"
const receskptel = new RegExp(eskptel)
const coha_cmd = "^" + eskptel
const cmd = ["\\.m","\\.s","\\.p","\\.help","\\.channels","\\.g"]
const recmd = [new RegExp(coha_cmd+cmd[0]+" "),new RegExp("^"+cmd[1]+" "),new RegExp(coha_cmd+cmd[2]+" "),new RegExp(coha_cmd+cmd[3]+"$"),new RegExp(coha_cmd+cmd[4]+"$"),new RegExp(coha_cmd+cmd[5]+" ")]
const gochiaitao = {"shea":"_fỏa ji/ shẻa tỏatōa. go kuì bû dải tủa jí_","sia":"_tỉduāshaō go tu dó_","buo":"go bủo ka"}

client.on('ready', () => {
  console.log(gochiaitao.buo);
});

client.on('message', msg => {
  if (authorized_channels.includes(msg.channel.name) || msg.channel.name == undefined) {
    let toatoa = msg.content;

    if (recmd[0].test(toatoa)) {
      var tao = toatoa.replace(receskptel,"").replace(/\s+/," ").slice(cmd[0].length); var opt = tao.substring(0,tao.indexOf(" "));
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
        if (!found_match) { msg.channel.send(gochiaitao.sia) }
      } else {
        msg.channel.send(gochiaitao.shea)
      }
      return;
    }

    if (recmd[1].test(toatoa)) {
      var tao = toatoa.replace(receskptel,"").replace(/\s+/," ").slice(cmd[1].length); var opt = tao.substring(0,tao.indexOf(" "));
      if (opt.indexOf("+")+1) {
        var untonecz = opt.indexOf("t")+1;
        var toa = tao.slice(tao.indexOf(" ")+1);
      } else {
        var toa = tao;
      }
      if (toa) {
        var found_match = 0;
        if (!untonecz) { toa = undiak(toa); }
        for (i in data) {
          if ((!untonecz?data[i].toaq_undia:data[i].toaq)==toa) {
            sendtoaq(msg,i); found_match++;
          }
        }
        if (!found_match) { msg.channel.send(gochiaitao.sia) }
      } else { msg.channel.send(gochiaitao.shea) }
      return;
    }

    if (recmd[2].test(toatoa)) {
      var toa = toatoa.replace(receskptel,"").slice(cmd[2].length)
      if (toa) {
        msg.channel.send(pretty_parse(camxit(toa)));
      } else {
        msg.channel.send(gochiaitao.shea)
      }
      return;
    }

    if (recmd[3].test(toatoa)) {
      [deskx(cmd[0],"return the matchs for word/phrase for the fields: toaq ⦅option `o`⦆, english type ⦅option `y`⦆, or english description ⦅option `e`⦆. The letteral `+` is required to indicate options. To search in multiple fields at one time, options _must_ be stringed, .e.g as it: `.m +oy nao`.")
      ,deskx(cmd[1],"return a description of the first toaq word/phrase that _exactly_ matches. Only in english currently.")
      ,"By default, both .m and .s don't care about the diacritics when performing a search. But the option `t` inverses this behavior."
      ,deskx(cmd[2],"return a prettified parse of a toaq text.")
      ,deskx(cmd[3],"return the description of the bot " + client.user.username + " and its options.")
      ,deskx(cmd[4],"return the channels where " + client.user.username + " is active.")
      ,deskx(cmd[5],"return the gloss of the text. Like `.p` and unlike `.s` and `.m`, it supports both the so-called \"tone marks\" and diacritics.")
      ,"This bot also works in Private Messages."
      ].map(function(x){msg.channel.send(x);});
      return;
    }

    if (recmd[4].test(toatoa)) {
      msg.channel.send(client.user.username + " is currently active in the channels: " + "#" + authorized_channels.join(", #") + "; and in PM.");
      return;
    }

    if (recmd[5].test(toatoa)) {
      var toa = toatoa.replace(receskptel,"").replace(/\s+/," ").slice(cmd[5].length)
      if (toa) {
        res = [];
        taotao = camxes_preproc.preprocessing(toa).split(' ').filter(function(x){return !(x==='')})
        for (t in taotao) {
          res.push(glosser(taotao[t]))
        }
        msg.channel.send(res.join(" "));
      } else {
        msg.channel.send(gochiaitao.shea)
      }
      return;
    }
}});

function sendtoaq(msg,i) {msg.channel.send(data[i].toaq + ", _" + data[i].t_en + "_: " + rivbiroda(data[i].d_en));}
function rivbiroda(str) { return str.split('').map(function(x) { if (["_","*","\\"].includes(x)) {return "\\"+x } else {return x}}).join('') } // escape markdown tokens, since toaq's dict' use some of them
function deskx(it,as) {return "`"+it+"`"+": "+as}
function undiak(toa) { return toa.replace(/[áàâāãǎả]/g,"a").replace(/[éèêēẽěẻ]/g,"e").replace(/[íìîīĩǐỉ]/g,"i").replace(/[óòôōõǒỏ]/g,"o").replace(/[úùûūũǔủ]/g,"u");}
function camxit(str) {
	try {	res = camxes.parse(camxes_preproc.preprocessing(str)); } catch (e) { return JSON.stringify(e); }
	return camxes_postproc.postprocessing(JSON.stringify(res, undefined, 2), 1)
}

ttf = {"?":function(d){return "do."+d}
      ,"-":function(d){return "do."+d}
      ,"\/":function(d){return "that.which."+d}
      ,"~":function(d){return d+"-ly"}
      ,"\^":function(d){return "which."+d}
      ,"V":function(d){return "that."+d}
      ,"\\":function(d){return "on."+d}}
tone_marks = Object.keys(ttf)

function glosser(w) {
  var dahitonw = w[w.length-1]; var notow = camxes_preproc.toaq_tone_marks_to_diacritics(w.replace(new RegExp("[/\\\\~^?V]","g"),"").toLowerCase()); var found_match=0; var ceres;
  for (i in data) {
    if (data[i].toaq==notow) {
      ceres=i; found_match++;
    }
  }
  if (!found_match) { return "_bủdūa_" }
  if (!tone_marks.includes(dahitonw)) {
    return "\\*\\*λ"+data[ceres].toaq+"λ\\*\\*"
  } else {
    return (ttf[dahitonw])("λ"+data[ceres].toaq+"λ")
  }
}

function pretty_parse(str) {
  return camxes_postproc.prettify(str
    .replace(/\[([A-Za-z0-9_\(\)'])+ /g, "[")
    .replace(/\[ +/g, "[").replace(/ +\]/g, "]")
    .replace(/([A-Z] )\[/g, "$1[")
    )
    .replace(/ +/gm, " ");
}
