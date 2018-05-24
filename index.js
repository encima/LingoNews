const translate = require('google-translate-api');
const {
  extract
} = require('article-parser');
const striptags = require('striptags');
const ArgumentParser = require('argparse').ArgumentParser;
const parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'LingoNews - Translate text in the command line'
});

let url = 'http://www.nachrichtenleicht.de/tom-wolfe-gestorben.2045.de.html?dram:article_id=418124';
let from = 'de';
let to = 'en';

parser.addArgument(
    [ '-u', '--url' ],
    {
			action: 'store',
    	help: 'URL to extract the body from'
    }
);
parser.addArgument(
    [ '-f', '--from' ],
    {
			action: 'store',
      help: 'Language code to translate from (i.e. EN)'
     }
);
parser.addArgument(
  ['-t', '--to'],
  {
		action: 'store',
    help: 'Language code to translate to (i.e. DE)'
  }
);
const args = parser.parseArgs();

extract(args.url || url).then((article) => {
  const formatted = striptags(article.content);
	console.log(formatted);
  translate(formatted, {from: args.from || from, to: args.to || to}).then(res => {
      console.log(res.text);
  }).catch(err => {
      console.error(err);
  });
}).catch((err) => {
  console.log(err);
});


