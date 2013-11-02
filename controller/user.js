/**
 * Created by Cyril on 13-11-3.
 */

var crypto = require('crypto'),
    fs = require('fs'),
    User = require('../models/user.js'),
    Post = require('../models/post.js');

exports.show=function(q,s){
    postObj={name: q.params.name};
    userObj={name: q.params.name};
    User.get(userObj,function(err,user){
        if(err||!user){
            q.flash("error","User Doesn't Exist");
            return s.redirect("/");
        }
        Post.get(postObj,1,function(err,posts,totle){
            if(err){
                q.flash("error",err);
                return s.redirect("/")
            }
            user.posts=posts;
            s.render('user',{
                title: user.name,
                user: q.session.user,
                error: q.flash("error").toString(),
                success: q.flash("success").toString(),
                author: user,
                posts: user.posts,
                totle: totle,
                page: 1
            })
        })
    })
};

exports.pages=function(q,s){
    postObj={name: q.params.name};
    userObj={name: q.params.name};
    User.get(userObj,function(err,user){
        if(err||!user){
            q.flash("error","User Doesn't Exist");
            return s.redirect("/");
        }
        Post.get(postObj, q.params.page ,function(err,posts,totle){
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
                totle: totle,
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
        return s.redirect("/reg");
    }
    var md5 = crypto.createHash("md5");
    user.password=md5.update(user.password).digest('hex');
    var newUser=new User(user);
    User.get({name: user.name},function(err,user){
        if(user){
            q.flash("error","User Exist Already");
            return s.redirect('/reg')
        }
        newUser.save(function(err,user){
            if(err){
                q.flash("error",err);
                return s.redirect('/reg')
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