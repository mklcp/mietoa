const Discord = require('discord.js');
const client = new Discord.Client();
const toaq = require('./toaq_dict.js')
const camxes = require('./toaqlanguage.js')
const camxes_preproc = require('./camxes_preproc.js')
const camxes_postproc = require('./camxes_postproc.js')

const authorized_channels = ["general","chiejo","off-topic"] //personnal info
client.login('your-discord-token');

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
          if ((toaqcz && ((!untonecz?data[i].toaq:data[i].dtoaq).indexOf(toa)+1)) || (encz && (data[i].den.indexOf(toa)+1)) || (typecz && (data[i].ten.indexOf(toa)+1))) {
            sendtoaq(msg,i); found_match++; break;
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
          if ((!untonecz?data[i].toaq:data[i].dtoaq)==toa) {
            sendtoaq(msg,i); found_match++; break;
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
      [deskx(spofuroda(cmd[0]),"return the matchs for word/phrase for the fields: toaq (option `o`), english type (option `y`), or english description (option `e`). The letteral `+` is required to indicate options. To search in multiple fields at one time, options _must_ be stringed, .e.g as it: `.m +oy nao`.")
      ,deskx(spofuroda(cmd[1]),"return a description of the first toaq word/phrase that _exactly_ matches. Only in english currently.")
      ,"By default, both .m and .s don't care about the diacritics when performing a search. But the option `t` inverses this behavior."
      ,deskx(spofuroda(cmd[2]),"return a prettified parse of a toaq text.")
      ,deskx(spofuroda(cmd[3]),"return the description of the bot " + client.user.username + " and its options.")
      ,deskx(spofuroda(cmd[4]),"return the channels where " + client.user.username + " is active.")
      ,deskx(spofuroda(cmd[5]),"return the gloss of the text. Like `.p` and unlike `.s` and `.m`, it supports both the so-called \"tone marks\" and diacritics. Possible options: `m` aligns each word of the gloss and each word of the input in a monospace font.")
      ,"This bot also works in Private Messages."
      ].map(function(x){msg.channel.send(x);});
      return;
    }

    if (recmd[4].test(toatoa)) {
      msg.channel.send(client.user.username + " is currently active in the channels: " + "#" + authorized_channels.join(", #") + "; and in PM.");
      return;
    }

    if (recmd[5].test(toatoa)) {
      var tao = toatoa.replace(receskptel,"").replace(/\s+/," ").slice(cmd[5].length); var opt = tao.substring(0,tao.indexOf(" "));
      if (opt.indexOf("+")+1) {
        var monocz = opt.indexOf("m")+1;
        var toa = tao.slice(tao.indexOf(" ")+1);
      } else {
        var toa = tao;
      }
      if (toa) {
        toa=camxes_preproc.preprocessing(toa).split(' ').filter(function(x){return !(x==='')}); gw=glosser(toa); toa=toa.map(camxes_preproc.toaq_tone_marks_to_diacritics);
        if (monocz) {
          d=normaspa(toa,gw.map(spofuroda))
          msg.channel.send("```"+d[0].join(" ")+"\n"+d[1].join(" ")+"```");
        } else {
          msg.channel.send(gw.join(" "));
        }
      } else {
        msg.channel.send(gochiaitao.shea)
      }
      return;
    }
}});

function normaspa(a,b) {
  var res = [[],[]];
  var lm = (a.length>b.length?b:a)
  for (i in lm) {
    d=a[i].length-b[i].length
    res[0].push(d>0?a[i]:a[i]+" ".repeat(Math.abs(d)));
    res[1].push(d>0?b[i]+" ".repeat(d):b[i]);
  }
  return res
}

const eskptel = "[*A-Za-z0-9\\(\\)]*:? ?"
const receskptel = new RegExp(eskptel)
const coha_cmd = "^" + eskptel
const cmd = ["\\.m","\\.s","\\.p","\\.help","\\.channels","\\.g"]
const recmd = [new RegExp(coha_cmd+cmd[0]+" "),new RegExp(coha_cmd+cmd[1]+" "),new RegExp(coha_cmd+cmd[2]+" "),new RegExp(coha_cmd+cmd[3]+"$"),new RegExp(coha_cmd+cmd[4]+"$"),new RegExp(coha_cmd+cmd[5]+" ")]
const gochiaitao = {"shea":"[_fỏa ji/ shẻa tỏatōa. go kuì bû dải tủa jí_]","sia":"[_tỉduāshaō go tu dó_]","buo":"go bủo ka","bu":"[_dủabū_]"}

ttf = {"?":function(d){return "do/is."+d}
      ,"\/":function(d){return "that.which."+d}
      ,"~":function(d){return d+"-ly"}
      ,"\^":function(d){return "which."+d}
      ,"V":function(d){return "that."+d}
      ,"\\":function(d){return "on."+d}
      ,"-":function(d){return d+"-esque"}
      ,"∅":function(d){return "\\*"+d+"\\*"}}

tone_marks = Object.keys(ttf)

function sendtoaq(msg,i) {msg.channel.send(data[i].dtoaq + ", _" + data[i].ten + "_: " + rivbiroda(data[i].den));}
function rivbiroda(str) { return str.split('').map(function(x) { if (["_","*","\\"].includes(x)) {return "\\"+x } else {return x}}).join('') } // escape markdown tokens, since toaq's dict' use some of them
function spofuroda(str) { a=(typeof str === 'string'); if(a) {str=str.split('')} b=str.filter(function(x) { return !((["_","\\"]).includes(x)) }); if (a) {b=b.join('')}; return b }
function deskx(it,as) {return "`"+it+"`"+": "+as}
function undiak(toa) { return toa.replace(/[áàâāãǎả]/g,"a").replace(/[éèêēẽěẻ]/g,"e").replace(/[íìîīĩǐỉ]/g,"i").replace(/[óòôōõǒỏ]/g,"o").replace(/[úùûūũǔủ]/g,"u");}
function camxit(str) {
	try {	res = camxes.parse(camxes_preproc.preprocessing(str)); } catch (e) { return JSON.stringify(e); }
	return camxes_postproc.postprocessing(JSON.stringify(res, undefined, 2), 1)
}

function glosser(taotao) {
  res = [];
  for (t in taotao) {
    t=taotao[t]; var dahitonw = "∅"; for (i in t) { if (tone_marks.includes(t[i])) {dahitonw=t[i]; break;} }
    var notow = t.replace(new RegExp("[-/\\\\~^?V]","g"),"").toLowerCase();
    var found_match=0; var ceres;
    for (i in data) { if (data[i].toaq==notow) { ceres=i; found_match++; break; } }
    var dc=data[ceres]; res.push((ttf[dahitonw])(((dc.gen||(!found_match))?dc.gen:"[?]")))
  }
  return res
}
// input: ".g shảo shaỏ shao? sháo shaó shao/ shào shaò shao\ shâo shaô shao^ shǎo shaǒ shaoV shão shaõ shao~ shao shāo shaō shao- shao?hui- shảohūi shao?hūi shảohui- shāohui?"
// expected output: "do.λshaoλ do.λshaoλ do.λshaoλ that.which.λshaoλ that.which.λshaoλ that.which.λshaoλ on.λshaoλ on.λshaoλ on.λshaoλ which.λshaoλ which.λshaoλ which.λshaoλ that.λshaoλ that.λshaoλ that.λshaoλ λshaoλ-ly λshaoλ-ly λshaoλ-ly **λshaoλ** λshaoλ-esque λshaoλ-esque λshaoλ-esque do.λshaohuiλ do.λshaohuiλ do.λshaohuiλ do.λshaohuiλ λshaohuiλ-esque

function pretty_parse(str) {
  return camxes_postproc.prettify(str
    .replace(/\[([A-Za-z0-9_\(\)'])+ /g, "[")
    .replace(/\[ +/g, "[").replace(/ +\]/g, "]")
    .replace(/([A-Z] )\[/g, "$1["))
    .replace(/ +/gm, " ");
}
