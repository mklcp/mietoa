# mietoa
Some utilities for the [toaq](http://toaq.org) language, featuring:
+ an interactive dictionary:
  + involving the files:
    + `dic.html`
    + `toaq_undiak_dict.js`
  + launch with:
    + open `dic.html` in a ⦅modern⦆ browser
+ a discord bot, able to search, match, and parse ⦅see the output of the `.h mietoa` command when invoked from discord⦆
  + involving the files:
    + all but not `dic.html`
  + launch with:
    + `node bot.js`, in a terminal with nodejs. Just fill up `bot.js` with the bot's parameters ⦅names of the authorized channels; and the bot's discord token⦆. Before any launchs, install the dependencies ⦅currently, only `discord.js`⦆ by hand, or with `npm install`

### generate the dictionary in a json format
```bash
wget toaq.org/dictionary/; perl -i -p -e 's/\<\!DOCTYPE(.*)\n//g;' -e 's?<tr><td>(.*)</td><td><em>(.*)</td></tr><tr><td>(.*)</td></tr>?\{toaq:$1,t_en:$2,d_en:$3?g;' -e 's/\"/\\"/g;' -e 's/\{toaq:(.*),t_en:(.*),d_en:(.*)/\{"toaq":"$1","t_en":"$2","d_en":"$3"/g;' index.html;
cat index.html | grep '{"toaq"' > undex.html; cat index.html | grep -oP '{"toaq":.*,"t_en"' | sed -E 's/[áàâāãǎả]/a/g;s/[éèêēẽěẻ]/e/g;s/[íìîīĩǐỉ]/i/g;s/[óòôōõǒỏ]/o/g;s/[úùûūũǔủ]/u/g;s/\{\"toaq\"\:/\"toaq_undia\":/g;s/",".*/"\},/g;' > undia;
paste -d ',' undex.html undia > toaq_dict.js; rm undia; rm undex.html; rm index.html; perl -i -p -e 'print "data = [\n" if $. == 1' toaq_dict.js; echo "]" >> toaq_dict.js; perl -i -p -e 's/\r\",\"/\",\"/g;' toaq_dict.js
```
⦅Not necessary to use either the dict' or the bot, but useful.⦆
