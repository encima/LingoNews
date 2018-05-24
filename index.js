const translate = require('google-translate-api');
const {
  extract
} = require('article-parser');
const striptags = require('striptags');
let url = 'http://www.nachrichtenleicht.de/tom-wolfe-gestorben.2045.de.html?dram:article_id=418124';
let from = 'de';
let to = 'en';

if (process.argv.length > 2) {
	url = process.argv[2];
	from
}


extract(url).then((article) => {
  const formatted = striptags(article.content);
	console.log(formatted);
  translate(formatted, {from: from, to: to}).then(res => {
      console.log(res.text);
      //=> Ik spreek Nederlands!
      console.log(res.from.text.autoCorrected);
      //=> true
      console.log(res.from.text.value);
      //=> I [speak] Dutch!
      console.log(res.from.text.didYouMean);
      //=> false
  }).catch(err => {
      console.error(err);
  });
}).catch((err) => {
  console.log(err);
});

const deutsch = `Vielen Dank. Deutsch ist seht schwerig, eh? :P 
Ich habe nur dir formale gelernt, mit einigen Ausnahmen. Mit dem Hund, ich bin viele Stunden draussen jetzt. Was machen sie normalerweise nach der Arbeit? \
Ich habe Munchen geliebt, so klingt Hamburg fantastisch! Florenz ist cool auch aber ich war noch nie in Barcelona. Jedenfalls noch nicht! \
Die Gotthard tunnel war schrecklich. Stopp und Start (?) fur viele Stunden. 
Wie war's mit Dienstag nachste Woche? Nach der Arbeit. Mit Sara und Astrid oder nicht, es stört mich nicht.a
Gehst du an jeder Schule zum Unterricht fur eine Probezeit?`;

