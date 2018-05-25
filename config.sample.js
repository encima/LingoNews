const config = {}
config.smtpSettings = {
    service: 'MYEMAIL',
    auth: {
        user: 'lingo@news.com',
        pass: 'so_secure_128'
    }
}
config.feeds = {
    en: [
        'http://www.economist.com/sections/science-technology/rss.xml'
    ],
    de: [
        'http://www.nachrichtenleicht.de/nachrichten.2005.de.rss'
    ]
}
module.exports = config
