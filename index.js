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
  }).catch(err => {
      console.error(err);
  });
}).catch((err) => {
  console.log(err);
});


