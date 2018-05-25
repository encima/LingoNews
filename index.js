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
const nodemailer = require('nodemailer')
const config = require('./config')
const rssparser = require('rssparser')

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
parser.addArgument(
  ['-r', '--rss'],
  {
		action: 'storeTrue',
    help: 'Read RSS feeds from config file and choose one at random'
  }
);
parser.addArgument(
  ['-e', '--email'],
  {
		action: 'store',
    help: 'Email to send to (i.e. test@test.com)'
  }
);

const args = parser.parseArgs();
const defaultUrl = 'http://www.nachrichtenleicht.de/tom-wolfe-gestorben.2045.de.html?dram:article_id=418124';
const from = args.from || 'de';
const to = args.to || 'en';
console.log(from)
const sendEmail = (rec, sub, text) => {
  let transporter = nodemailer.createTransport(config.smtpSettings);
  let mailOptions = {
    from: 'chris@gwillia.ms',
    to: rec,
    subject: sub,
    text: text
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent');
  });
}

const chooseSource = (args, from, cb) => {
  if (args.rss && config.feeds) {
    const source = config.feeds[from][Math.floor(Math.random() * config.feeds[from].length)];
    console.log(source);
    rssparser.parseURL(source, {}, function(err, out){
      if (err) {
        console.log(err);
        cb(undefined);
      }
      const items = out.items;
      cb(items[Math.floor(Math.random() * items.length)].url);
    });
  } else {
    cb(args.url || defaultUrl);
  }
}

const email = args.email || 'encima@gmail.com';
const url = chooseSource(args, from, (url) => {
  console.log(`Chosen: ${url}`);
  extract(url).then((article) => {
    const formatted = striptags(article.content);
    translate(formatted, {to: args.to || to}).then(res => {
        sendEmail(email, `[${from.toUpperCase()}] Translate this - ${url}`, formatted);
        sendEmail(email, `[${to.toUpperCase()}] Translate this - ${url}`, res.text);
    }).catch(err => {
        console.error(err);
    });
  }).catch((err) => {
    console.log(err);
  });  
});





