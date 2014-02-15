/**
 * Created by Cyril on 13-11-3.
 */
"use strict";
var handleError = function(){
    return function(err,next){
        if(err){
            console.log(err);
            next();
            return;
        }
    };
};
var db = require('../models/database.js');

var Post = db.Post,
    User = db.User;
exports.index = function(q,s,next){
    var skip, limit, ne;
    limit = 10;
    skip = ((q.query.page||1)-1)*limit;
    Post.find().count(null,function(err, count){
        if(err){
            console.log(err);
            next(err);
            return;
        }
        Post.find().skip(skip).limit(limit).populate('user').sort('_id').exec(function(err,posts){
            if(err){
                console.log();
                next(err);
                return;
            }
            s.render('index',{
                posts: posts,
                count: count,
                limit: limit,
                page: q.query.page||1,
                title: "Home"
            });
        });
    });
};

exports.tag = function(q,s,next){
    var limit = 10,skip= ((q.query.page||1)-1)*limit;
    var query = {'tags.tag': q.params.tag};
    Post.find(query).count(null,function(err,count){
        Post.find(query,function(err,posts){
            if(err){
                console.log(err);
                next(err);
                return;
            }
            s.render('index',{
                title: 'Tags: '+ q.params.tag + ' - Page: '+ (q.query.page||1),
                posts: posts,
                total: count,
                page: q.query.page || 1
            });
        });
    });

};

exports.category= function(q,s,next){
    var query = {'category': q.params.category};
    var limit = 10, skip = ((q.query.page||1)-1)*limit;
    Post.find(query).count(function(err, count){
        handleError();
        Post.find(query).sort('_id').limit(limit).exec(function(err,posts){
            handleError();
            s.render('index',{
                title: 'Category: '+ q.params.category,
                posts: posts,
                total: count,
                page: q.query.page || 1
            });
        });
    });
};

exports.getNew=function (q, s,next) {
    Post.distinct('category',function(err,categories){
        handleError();
        s.render('edit', {
            title: "New Post",
            post: null,
            categories: categories
        });
    });
};


exports.postNew=function (q, s, next) {
    if(!q.body.post.title){
        q.flash('error',"Oh-oh, Something Went Wrong, Check if your post title Exist.")
        s.redirect("/post/new");
        return;
    }
    var postObj = q.body.post;
    postObj.user = q.session.user._id;
    var newPost = new Post(q.body.post);
    newPost.save(function(err,post){
        handleError();
        s.render('post',{
            post: post,
            title: post.title
        });
    });
};


exports.show=function(q,s){
    Post.find({slug: q.params.slug}).sort('_id').exec(function(err,posts){
        handleError();
        var post = posts[0];
        if(!post){
            s.redirect(404,'404');
            return;
        }
        s.render('post',{
            post: post,
            title: post.title
        });
    });
};

exports.getEdit=function(q,s){
    Post.find({slug: q.params.slug}).sort('_id').exec(function(err,posts){
        handleError();
        var post = posts[0];
        if(!post){
            s.redirect(404,'404');
            return;
        }
        s.render('edit',{
            post: post,
            title: 'Edit Post: '+ post.title
        });
    });
};

exports.postEdit=function(q,s,next){
    if(!q.body.post.title){
        q.flash('error',"Oh-oh, Something Went Wrong, Check if your post title Exist.")
        s.redirect("/post/new");
        return;
    }
    var postObj = q.body.post;
    postObj.user = q.session.user._id;
    Post.findByIdAndUpdate(q.body.post._id,postObj,function(err,post){
        handleError();
        s.render('post',{
            title: post.title,
            post: post,
            success: q.flash('success',"Successfully Updated!")
        });
    });
};

exports.getDelete=function(q,s,next){
    Post.findByIdAndRemove(q.body.post._id,function(err){
            handleError();
            q.flash("success", "The blog "+q.params.title+" was deleted successfully");
            return s.redirect("/");
        }
    );
};