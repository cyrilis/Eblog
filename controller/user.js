/**
 * Created by Cyril on 13-11-3.
 */
"use strict";
var crypto = require('crypto'),
    db = require('../models/database'),
    User = db.User,
    Post = db.Post;
var handleError = function(){
    return function(err,next){
        if(err){
            console.log(err);
            next();
            return;
        }
    };
};
exports.show=function(q,s,next){
    var limit = 10,skip = ((q.query.page||1)-1)*limit;
    User.findOne({name: q.params.name}).populate('posts',{limit: limit, skip: skip}).exec(function(err,user){
        handleError();
        if(!user){
            s.redirect(404,'404');
            return;
        }
        Post.find({user:user._id}).count(function(err,count){
            Post.find({user: user._id}).populate('user').exec(function(err,posts){
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
    s.render("reg", {
        title: 'Register',
        user: q.session.user,
        error: q.flash("error").toString(),
        success: q.flash('success').toString()
    });
};
exports.postNew=function (q, s) {
    var user = q.body.user;
    if(!(user.name&&user.password&&user.password_confirmation&&user.email)){
        q.flash('error',"Please fill all the field in the form!");
        s.redirect('back');
        return
    }
//    console.dir(user);
    if(user.password!=user.password_confirmation){
        q.flash("error","Password Not Match");
        s.redirect("back");
        return
    }
    var md5 = crypto.createHash("md5");
    user.password=md5.update(user.password).digest('hex');
    var newUser=new User(user);
    User.find().exec(function(err,users){
        if(err){
            console.log(err);
            return;
        }
        console.log(users);
    });
    newUser.save(function(err,user){
        if(err){
            console.log(err);
            q.flash('error',err.err.toString());
            s.redirect('back');
            return;
        }
        q.session.user = user;
        console.log('Register Successfully!');
        q.flash('success','Congratulations, Registered Successfully!');
        s.redirect('/');
    });
};

exports.getLogin=function (q, s) {
    s.render("login", {
        title: 'Login'
    })
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
    User.findOne({name: userObj.name},function(err,user){
        if(user){
            if(user.password === userObj.password){
                q.session.user = user;
                s.redirct('/');
                return;
            }
            console.log(1);
            q.flash('error','Error, Please Check your password.');
            s.redirct('back');
        }else{
            console.log(2);
            q.flash('error',"Error, User doesn't Exist");
            s.redirect('back');
        }
    })
};
exports.logout=function (q, s) {
    q.session.user=null;
    q.flash("success","Logout Success");
    s.redirect('/')
};