/**
 * Created by never on 13-10-26.
 */
module.exports = {
    cookieSecret: 'cookieSecretGoesHere',
    db: 'EPost',
    host: 'localhost',
    dburl: 'mongodb://localhost/EPost', // Yes, we use Mongodb
    mailgun:{
        user: "SmtpUsername@example.com", // go to https://mailgun.com/cp
        pass: "SmtpPassword"
    },
    mailto: "EmailAddressToAcceptNotification@again.cc",
    mailfrom: "example@gmail.com" // Fill with email address to send notification eg. "robot@example.com"
};