/**
 * Created by Cyril on 14-3-4.
 */

"use strict";

var setting = require('../settings');
var db = require('../models/database'),
    Log = db.Log,
    ua = require('ua-parser');
var ip = require('geoip-lite');
var nodemailer = require("nodemailer");
exports.log = function(q){
    var userAgent = ua.parse(q.headers['user-agent']);
    var city = ip.lookup(q.header('x-forwarded-for') || q.connection.remoteAddress);
    var log = new Log({
        date: new Date(),
        user: q.session.user? q.session.user._id : undefined,
        method: q.method,
        url: q.protocol + "://" + q.get('host') + q.url||"Unknown",
        data: JSON.stringify(q.body)||"",
        ip: q.header('x-forwarded-for') || q.connection.remoteAddress,
        country: city? city.country: "_",
        city: city? city.city: "_",
        browser: userAgent.family||"_",
        version: userAgent.major||"_",
        os: userAgent.os.family||"_",
        ua: q.headers['user-agent']
});
    log.save();
};


var mailer = nodemailer.createTransport('SMTP', {
    service: 'Mailgun',
    auth: {
        user: setting.mailgun.user,
        pass: setting.mailgun.pass
    }
//  service: 'SendGrid',
//  auth: {
//       user: setting.sendgrid.user,
//       pass: setting.sendgrid.pass
//  }
});
exports.mail = function(from, to , subject, html, text){
    var mailOptions = {
        to: to,
        from: from,
        subject: "[EBlog Notification] "+subject,
        text: text,
        html: html
    };
    mailer.sendMail(mailOptions,function(err){
        console.log(err);
    });
};
