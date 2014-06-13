/**
 * Created by Cyril on 13-11-3.
 */
"use strict";
var db = require('../models/database.js');
var Post = db.Post,
    User = db.User,
    log  = require('../controller/utils').log,
    mail = require('../controller/utils').mail,
    Site = db.Site,
    uslug = require('uslug'),
    Showdown = require('showdown'),
    config = require('../settings');
var figure = require('./figure_for_showdown');
var converter = new Showdown.converter({ extensions: [figure] });
exports.all = function(q,s,next){
    log(q);
    Site.findOne(function(err,site){
        s.locals({
            session: q.session,
            flash: q.flash,
            user: q.session.user||null,
            title: 'Eblog',
            mode: null,
            site: site,
            util:{
                isProduction: function(){
                    return false
                }
            }
        });
        next();
    });

};

exports.index = function(q,s,next){
    var skip, limit;
    limit = 10;
    skip = ((q.params.page||1)-1)*limit;
    Post.find().count(null,function(err, count){
        if(err){
            console.log(err);
            next(err);
            return;
        }
        Post.find().skip(skip).limit(limit).sort('-_id').populate('user').exec(function(err,posts){
            if(err){
                console.log(err);
                next(err);
                return;
            }
            posts.forEach(function(post,index){
                if(post.isMarkdwon && post.markdown){
                    post.content = converter.makeHtml(post.markdown);
                    console.log(post);
                }
            });
            s.render('index',{
                posts: posts,
                count: count,
                limit: limit,
                page: q.params.page||1,
                title: "Home"
            });
        });
    });
};





exports.tag = function(q,s,next){
    var limit = 10,skip= ((q.query.page||1)-1)*limit;
    var query = {'tags': q.params.tag};
    Post.find(query).count(null,function(err,count){
        Post.find(query).populate('user').sort('-_id').exec(function(err,posts){
            if(err){
                console.log(err);
                next(err);
                return;
            }
            posts.forEach(function(post,index){
                if(post.isMarkdwon){
                    post.content = converter.makeHtml(post.markdown);
                }
            });
            s.render('index',{
                title: 'Tags: '+ q.params.tag + ' - Page: '+ (q.query.page||1),
                posts: posts,
                count: count,
                limit: limit,
                page: q.query.page || 1
            });
        });
    });
};

exports.category= function(q,s,next){
    var query = {'category': q.params.category};
    var limit = 10, skip = ((q.query.page||1)-1)*limit;
    Post.find(query).count(function(err, count){
        if(err){
            console.log(err);
            q.flash('error',err.message);
            s.redirect('back');
            return;
        }
        Post.find(query).sort('-_id').populate('user').limit(limit).exec(function(err,posts){
            if(err){
                console.log(err);
                q.flash('error',err.message);
                s.redirect('back');
                return;
            }
            posts.forEach(function(post,index){
                if(post.isMarkdwon){
                    post.content = converter.makeHtml(post.markdown);
                }
            });
            s.render('index',{
                title: 'Category: '+ q.params.category,
                posts: posts,
                count: count,
                limit: limit,
                page: q.query.page || 1
            });
        });
    });
};

exports.getNew=function (q, s,next) {
    Post.distinct('category',function(err,categories){
        if(err){
            console.log(err);
            q.flash('error',err.message);
            s.redirect('back');
            return;
        }
        s.render('edit', {
            title: "New Post",
            post: null,
            categories: categories,
            mode: 'new'
        });
    });
};

exports.markdownNew = function(q,s,next){
    Post.distinct('category',function(err,categories){
        if(err){
            console.log(err);
            q.flash('error',err.message);
            s.redirect('back');
            return;
        }
        s.render('markdown',{
            title: "New Post",
            post: null,
            categories: categories,
            mode: 'markdown'
        });
    });
};

exports.postNew=function (q, s, next) {
    if(!q.body.post.title){
        q.flash('error',"Oh-oh, Something Went Wrong, Check if your post title Exist.");
        s.redirect("back");
        return;
    }
    var postObj = q.body.post;
    postObj.time = new Date();
    postObj.user = q.session.user._id;
    postObj.tags = q.body.post.tags.split('|').map(function(e){return e.trim();}).filter(function(n){return n;});
    if(postObj.isMarkdown=== "true"){
        delete postObj.content;
        postObj.isMarkdwon = true;
    }
    var newPost = new Post(postObj);
    console.log(newPost);
    console.log(q.body.post);
    newPost.save(function(err,post){
        //console.log(post);
        if(err){
            console.log(err);
            q.flash('error',err.message);
            s.redirect('back');
            return;
        }
        q.flash('success',"New Post Created!");
        s.redirect('/');
        mail(config.mailfrom,config.mailto,"Just Posted 《"+post.title+"》 a new Blog!","<h1>"+post.title+"</h1>"+post.content,null);
    });
};

exports.show=function(q,s){
    Post.find({slug: q.params.slug}).populate('user').sort('_id').exec(function(err,posts){
        if(err){
            console.log(err);
            q.flash('error',err.message);
            s.redirect('back');
            return;
        }
        //console.log(q.params.slug);
        var post = posts[0];
        if(!post){
            s.redirect(404,'404');
            return;
        }
        if(post.isMarkdwon && post.markdown){
            post.content = converter.makeHtml(post.markdown);
        }
        s.render('post',{
            post: post,
            title: post.title
        });
    });
};

exports.getEdit=function(q,s){
    Post.findOne({slug: q.params.slug}).sort('_id').exec(function(err,post){
        if(err){
            console.log(err);
            q.flash('error',err.message);
            s.redirect('back');
            return;
        }
        if(!post){
            s.redirect(404,'404');
            return;
        }
        s.render(post.isMarkdwon? "markdown":"edit",{
            post: post,
            title: 'Edit Post: '+ post.title,
            mode: post.isMarkdwon? "markdown":"edit"
        });
    });
};

exports.getMarkdown = function(q,s){
    Post.findOne({slug: q.params.slug}).sort('_id').exec(function(err,post){
        if(err){
           console.log(err);
           q.flash('error',err.message);
           s.redirect('back');
           return;
        }
        if(!post){
           s.redirect(404,'404');
           return;
        }
        s.render('markdown', {
            post: post,
            title: 'Edit Post: '+ post.title,
            mode: 'markdown'
        });
    });
};

exports.postEdit=function(q,s,next){
    if(!q.body.post.title){
        q.flash('error',"Oh-oh, Something Went Wrong, Check if your post title Exist.");
        s.redirect("back");
        return;
    }
    var postObj = q.body.post;
    postObj.user = q.session.user._id;
    var _id = postObj._id;
    delete postObj._id;
    if(postObj.updateSlug){
        postObj.slug = uslug(postObj.title);
    }
    //console.log(postObj);
    postObj.tags = postObj.tags.split('|').map(function(e){return e.trim();}).filter(function(n){return n;});
    Post.findByIdAndUpdate(_id,postObj,function(err,post){
        if(err){
            console.log(err);
            q.flash('error',err.message);
            s.redirect('back');
            return;
        }
        if(post.isMarkdwon){
            post.content = converter.makeHtml(post.markdown);
        }
        q.flash('success',"Post Updated Successfully!");
        s.redirect('back');
        mail(config.mailfrom,config.mailto,"The Post 《"+post.title+"》 Got Updated!","<h1>"+post.title+"</h1>"+post.content,null);
    });
};

exports.postDelete=function(q,s,next){
    Post.findOne({slug: q.params.slug},function(err,post){
            if(err){
                console.log(err);
                q.flash('error',err.message);
                s.redirect('back');
                return;
            }
            post.remove();
            mail(config.mailfrom,config.mailto,"One Post Got Deleted!","<h1>"+post.title+"</h1>"+post.content,null);
            q.flash("success", "The post was deleted successfully!");
            s.redirect("/");
        }
    );
};

exports.settingPages = function(q,s,next){
    var skip, limit;
    limit = 10;
    skip = ((q.params.page||1)-1)*limit;
    Post.find().count(null,function(err, count){
        if(err){
            console.log(err);
            next(err);
            return;
        }
        Post.find().skip(skip).limit(limit).sort('-_id').populate('user').exec(function(err,posts){
            if(err){
                console.log(err);
                next(err);
                return;
            }
            s.render('settings/posts',{
                posts: posts,
                count: count,
                limit: limit,
                page: q.query.page||1,
                title: "Home"
            });
        });
    });
};