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
            return;
        }
        if(!user){
            s.redirect(404,'404');
            return;
        }
        Post.find({user:user._id}).count(function(err,count){
            Post.find({user: user._id}).populate('user').sort('-_id').exec(function(err,posts){
//                console.log(posts[0]);
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
            s.redirect('back');
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
    updateUser.name = q.body.user.name||null;
    updateUser.bio = q.body.user.bio || null;
    updateUser.url = q.body.user.url || null;
    User.findByIdAndUpdate(q.session.user._id, updateUser ,function(err, user){
        if(err){
            next(err);
            return;
        }
        if(user){
            q.session.user = user;
            q.flash("success","Profile updated successfully!");
            s.redirect('back');
        }else{
            next(new Error("No user Found!"));
        }
    });
};
exports.changePassword = function(q,s,next){
    if(q.body.user.origin_password){
        if(q.body.user.password && (q.body.user.password === q.body.user.password_confirmation)){
            User.findById(q.session.user._id,function(err, user){
                if(!user){
                    next(new Error("User doesn't Exist!"));
                    return;
                }
                var md5 = crypto.createHash("md5");
                var originPassword = q.body.user.origin_password;
                var hashedPassword = md5.update(originPassword).digest('hex');
                console.log(hashedPassword);
                if(user.password===hashedPassword){
                    var md6 = crypto.createHash("md5");
                    var newPassword = q.body.user.password;
                    newPassword = crypto.createHash("md5").update(newPassword).digest('hex');
                    console.log(user.password);
                    user.update({password: newPassword},function(err,user){
                        if(err){
                            next(err);
                            return;
                        }
                        q.session.user = user;
                        q.flash("success","User Password Updated Successfully!");
                        s.redirect("back");
                    });
                }else{
                    q.flash("error","User Origin Password doesn't match!");
                    s.redirect('back');
                }
            });
        }else{
            q.flash("error","New Password and Password confirmation doesn't match or doesn't exist!");
            s.redirect("back");
        }
    }else{
        q.flash("error","Original Password Should Be filed!.");
        s.redirect("back");
    }
};
exports.getSetting = function(q, s, next){
    s.render("settings/site");
};
exports.getProfiles = function(q, s, next){
    s.render("settings/profile");
};
exports.getEditAbout= function(q,s,next){
    s.render("settings/about",{
        mode: "edit"
    });
};
exports.updateAbout = function(q,s,next){
    console.log(q.body.user);
    if(q.body.user.about){
        User.findByIdAndUpdate(q.session.user._id,{about: q.body.user.about},function(err, user){
            if(err){
                next(err);
                return;
            }
            q.session.user = user;
            q.flash("success","User About Page updated successfully!");
            s.redirect('back');
        });
    }else{
        q.flash("error","No Content, Please Try again!");
        s.redirect('back');
    }
};
exports.getAbout = function(q,s,next){
    s.render("about");
};
