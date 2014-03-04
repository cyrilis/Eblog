/**
 * Created by Cyril on 13-11-3.
 */
"use strict";
var crypto = require('crypto'),
    db = require('../models/database'),
    User = db.User,
    Post = db.Post,
    mail = require('../controller/utils').mail;

exports.show=function(q,s,next){
    var limit = 10,skip = ((q.query.page||1)-1)*limit;
    User.findOne({name: q.params.name}).populate('posts',{limit: limit, skip: skip,sort: '-_id'}).exec(function(err,user){
        if(err){
            console.log(err);
            q.flash('err',err.message);
            next(err);
        }
        if(!user){
            s.redirect(404,'404');
            return;
        }
        Post.find({user:user._id}).count(function(err,count){
            Post.find({user: user._id}).populate('user').sort('-_id').exec(function(err,posts){
                console.log(posts[0]);
                s.render('user',{
                    title: user.name,
                    author: user,
                    posts: posts,
                    count: count,
                    limit: limit,
                    page: q.query.page||1
                });
            });
        });
    });
};


exports.getNew=function (q, s) {
    s.render("reg", {title: 'Register'});
};
exports.postNew=function (q, s,next) {
    var user = q.body.user;
    if(!(user.name&&user.password&&user.password_confirmation&&user.email)){
        q.flash('error',"Please fill all the field in the form!");
        s.redirect('back');
        return;
    }
//    console.dir(user);
    if(user.password!==user.password_confirmation){
        q.flash("error","Password Not Match");
        s.redirect("back");
        return;
    }
    var md5 = crypto.createHash("md5");
    user.password=md5.update(user.password).digest('hex');
    var newUser=new User(user);
    User.findOne({email:newUser.email}).exec(function(err,user){
        if(err){
            console.log(err);
            next(err);
            return;
        }
        if(user){
            q.flash('error','Your Email has Been Used, Try Login?');
            s.redirect('back');
        }else{
            newUser.save(function(err,user){
                if(err){
                    console.log(err);
                    q.flash('error',err.message);
                    s.redirect('back');
                    return;
                }
                q.session.user = user;
                console.log('Register Successfully!');
                q.flash('success','Congratulations, Registered Successfully!');
                s.redirect('/');
                mail("root@cyrilis.com","houshoushuai@gmail.com","Welcome New User ! "+ user.name,"<h1>Welcome ,"+user.name+"! </h1><h3>"+user.email+"</h3>",null);
            });
        }
    });

};

exports.getLogin=function (q, s) {
    s.render("login", {
        title: 'Login'
    });
};
exports.postLogin=function (q, s) {
    var userObj = q.body.user;
    if(!(userObj.email&&userObj.password)){
        q.flash('error','Please fill all the field in the form.');
        s.redirect('back');
        return;
    }
    var md5 = crypto.createHash("md5");
    userObj.password=md5.update(userObj.password).digest('hex');
    User.findOne({email: userObj.email},function(err,user){
        if(user){
            if(user.password === userObj.password){
                q.session.user = user;
                q.flash('success',"Welcome back, "+user.name+'!');
                s.redirect('/');
                return;
            }
            console.log(1);
            q.flash('error','Error, Please Check your password.');
            s.redirct('back');
        }else{
            console.log(user);
            q.flash('error',"Error, User doesn't Exist");
            s.redirect('back');
        }
    });
};
exports.logout=function (q, s) {
    q.session.user=null;
    q.flash("success","Logout Success");
    s.redirect('/');
};

exports.changeProfile = function(q,s,next){
    var updateUser = {};
    updateUser.password = null;
    if(q.body.user.password&& q.body.user.password_confirmation&& (q.body.user.password === q.body.user.password_confirmation)){
        var md5 = crypto.createHash("md5");
        updateUser.password=md5.update(q.body.user.password).digest('hex');
    }
    updateUser.name = q.body.user.name||null;
    updateUser.bio = q.body.user.bio || null;
    User.findById(q.session.user._id, function(err, user){
        if(err){
            next(err);
            return;
        }
        if(user){
            if(q.body.user.origin_password === user.password){
                user.password = updateUser.password;
            }
            user.name = updateUser.name;
            user.bio = updateUser.bio;
        }else{
            next(new Error("No user Found!"));
            return;
        }
        user.save(function(err, user){
            if(err){
                next(err);
                return;
            }
            q.session.user = user;
            q.flash("success","Profile updated successfully!");
            s.redirect('back');
        });
    });
};

exports.getSetting = function(q, s, next){
    s.render("settings");
};
