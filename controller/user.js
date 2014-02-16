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

exports.pages=function(q,s){
    var postObj={name: q.params.name};
    var userObj={name: q.params.name};
    User.get(userObj,function(err,user){
        if(err||!user){
            q.flash("error","User Doesn't Exist");
            s.redirect("/");
            return
        }
        Post.get(postObj, q.params.page ,function(err,posts,total){
            if(err){
                q.flash("error",err);
                return s.redirect("/")
            }
            user.posts=posts;
            return s.render('user',{
                title: user.name,
                user: q.session.user,
                error: q.flash("error").toString(),
                success: q.flash("success").toString(),
                author: user,
                posts: user.posts,
                total: total,
                page: q.params.page
            })
        })
    })
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
    console.dir(user);
    if(user.password!=user.password_confirmation){
        q.flash("error","Password Not Match");
        s.redirect("/reg");
        return
    }
    var md5 = crypto.createHash("md5");
    user.password=md5.update(user.password).digest('hex');
    var newUser=new User(user);
    User.get({name: user.name},function(err,user){
        if(user){
            q.flash("error","User Exist Already");
            s.redirect('/reg');
            return
        }
        newUser.save(function(err,user){
            if(err){
                q.flash("error",err);
                 s.redirect('/reg');
                return
            }
            q.session.user=user;
            q.flash('success',"Register Success");
            s.redirect('/')
        })
    })
};
exports.getLogin=function (q, s) {
    s.render("login", {
        title: 'Login',
        user: q.session.user,
        error: q.flash("error").toString(),
        success: q.flash('success').toString()
    })
};
exports.postLogin=function (q, s) {
    var userObj = q.body.user;
    var md5 = crypto.createHash("md5");
    userObj.password=md5.update(userObj.password).digest('hex');
    User.get({email: userObj.email},function(err,user){
        if(!user){
            q.flash('error',"User Doesn't Exist");
            return s.redirect('/login')
        }
        if(user.password!=userObj.password){
            q.flash('error',"User Password Error");
            return s.redirect('/login')
        }
        q.session.user = user;
        q.flash('success',"Login Success");
        return s.redirect('/')
    })
};
exports.logout=function (q, s) {
    q.session.user=null;
    q.flash("success","Logout Success");
    s.redirect('/')
};