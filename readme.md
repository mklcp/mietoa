# mietoa
Some utilities for the [toaq](http://toaq.org) language, featuring:
+ an interactive dictionary:
  + involving the files:
    + `dic.html`
    + `dic.css`
    + `toaq_dict.js`
  + launch with:
    + open `dic.html` in a ⦅modern⦆ browser
  + how to use:
  	+ type a word in a search field. Options can be toggled both via clicking or by adding `&toaq`, `&den`, `&ten` or `&gen` in any order at the end of the url
+ a discord bot, able to search, match, and parse
  + involving the files:
    + all but `dic.html`, `dic.css` and `readme.md`
  + launch with:
    + `node bot.js`, in a terminal with nodejs. Just fill up `bot.js` with the bot's parameters ⦅names of the authorized channels; and the bot's discord token⦆. Before any launchs, install the dependencies ⦅currently, only `discord.js`⦆ by hand, or with `npm install`
  + how to use:
  	+ type `.help` in a room where the bot is present

To use the dictionary offline, download this repository and launch it.

##### generate the dictionary in a json format
###### [toaq.org/dictionary](toaq.org/dictionary)
```bash
wget toaq.org/dictionary/; perl -i -p -e 's/\<\!DOCTYPE(.*)\n//g;' -e 's?<tr><td>(.*)</td><td><em>(.*)</td></tr><tr><td>(.*)</td></tr>?\{dtoaq:$1,ten:$2,den:$3?g;' -e 's/\"/\\"/g;' -e 's/\{dtoaq:(.*),ten:(.*),den:(.*)/\{"dtoaq":"$1","ten":"$2","den":"$3"/g;' index.html;
cat index.html | grep '{"dtoaq"' > undex.html; cat index.html | grep -oP '{"dtoaq":.*,"ten"' | sed -E 's/[áàâāãǎả]/a/g;s/[éèêēẽěẻ]/e/g;s/[íìîīĩǐỉ]/i/g;s/[óòôōõǒỏ]/o/g;s/[úùûūũǔủ]/u/g;s/\{\"dtoaq\"\:/\"toaq\":/g;s/",".*/"\},/g;' > undia;
paste -d ',' undex.html undia > toaq_dict.js; rm undia; rm undex.html; rm index.html; perl -i -p -e 'print "data = [\n" if $. == 1' toaq_dict.js; echo "]" >> toaq_dict.js; perl -i -p -e 's/\r\",\"/\",\"/g;' toaq_dict.js
```

###### [toaq.org/dict.html](toaq.org/dict.html)
```bash
wget http://toaq.org/dict.html; perl -i -p -e 's?</style>?</style>\n?g;s?<tr?\n<tr?g;s/<meta.*>\n//g;s/<style.*<\/style>\n//g;s/.*<thead>.*\n//;s?.*<\/thead>.*\n??g;s?.*freezebar\-cell.*\n??g;s/<tr.+?>/<tr>/g;s/<td.+?>/<td>/g;s/<th.+?>/<th>/g;s/<div.+?>/<div>/g;;s/<th>.*<\/th>//g;s/<div>(.*)<\/div>/$1/g;s/<\/?div>//g;s?<tr><td>(.*)</td><td>(.*)</td><td>(.*)</td><td>(.*)</td></tr>?{dtoaq:$1,ten:$2,gen:$3,den:$4?g;s/\"/\\"/g;s?</tbody>??g;s?</table>??g;s/<a.*<\/a>//g;s?{dtoaq:(.*),ten:(.*),gen:(.*),den:(.*)?{"dtoaq":"$1","ten":"$2","gen":"$3","den":"$4"?g;' dict.html
cat dict.html | grep '{"dtoaq"' > undex.html; cat undex.html | grep -oP '{"dtoaq":.*,"ten"' | sed -E 's/[áàâāãǎả]/a/g;s/[éèêēẽěẻ]/e/g;s/[íìîīĩǐỉ]/i/g;s/[óòôōõǒỏ]/o/g;s/[úùûūũǔủ]/u/g;s/\{\"dtoaq\"\:/\"toaq\":/g;s/",".*/"\},/g;' > undia;
paste -d ',' undex.html undia > toaq_dict.js; rm undia; rm undex.html; rm dict.html; perl -i -p -e 'print "data = [\n" if $. == 1' toaq_dict.js; echo "]" >> toaq_dict.js; perl -i -p -e 's/\r\",\"/\",\"/g;s/{"dtoaq":"toaq","ten":"type","gen":"gloss","den":"definition","toaq":"toaq"},\n//g;' toaq_dict.js
```
⦅Not necessary to use either the dict' or the bot, but useful.⦆
