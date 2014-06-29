/**
 * Created by Cyril on 14-3-8.
 */

"use strict";
var Log =  require('../models/database').Log;
var Site = require("../models/database").Site;
var Email = require('../models/database').Email;
var setting = require('../settings');
var mail = require('../controller/utils').mail;
exports.updateAbout = function(q,s, next){
    if(!q.body.site||!q.body.site.about){
        q.flash('error',"Sorry, About content can't be blank!");
        s.redirect('back');
        return;
    }
    Site.count(function(err,count){
        if(count > 1){
            q.flash('error',"Server is Error....");
            s.redirect('back');
            return;
        }
        if(count <1){
            var site = new Site({
                logo: "Cyrilis.com",
                name: "Eblog",
                desc: "github/cyrilis/Eblog",
                about: q.body.site.about
            });
            site.save(function(err,site){
                if(err){
                    next(err);
                    return;
                }
                s.locals({
                    site: site
                });
                q.flash('success',"Site Updated Successfully!");
                s.redirect('back');
            });
        }
        Site.findOne(function(err,site){
            if(err){
                next(err);
                return;
            }
            site.about = q.body.site.about;
            q.flash("success","Site Updated Successfully!");
            s.locals({
                site: site
            });
            s.redirect('back');
            site.save();
        });
    });
};

exports.getAbout = function(q,s,next){
    s.render("about");
};
exports.updateSite= function(q,s,next){
    if(q.body.site){
        Site.findOneAndUpdate(null, q.body.site, function(err,site){
            if(err){
                next(err);
                return;
            }
            q.flash('success',"Site information updated Successfully!");
            s.locals({
                site: site
            });
            s.redirect('back');
            return;
        });
    }
    next();
};


exports.visiteLogs = function(q,s,next){
    var limit = 100;
    var skip = ((q.query.page||1)-1)*limit;
    Log.find().limit(limit).skip(skip).sort("-date").exec(function(err,logs){
        if(err){
            console.log(err);
            next(err);
            return;
        }
        s.render('settings/logs',{
            logs: logs,
            limit: limit,
            page: q.query.page||1
        });
    });
};

exports.receiveEmail = function(q,s,next){
    var emailInfo = q.body;
    emailInfo.date = new Date();
    var email = new Email(emailInfo);
    email.save(function(err,email){
        if (err){
            console.log(err);
            return false;
        }
        console.log(email.Subject);
        mail(email.sender, setting.mailTo, email.subject + "[To: "+(email.To||email.recipient)+"]", email['body-html'], email['body-text']);
        s.send('Got it!');
    });
};