/**
 * Created by Cyril on 13-11-3.
 */

var Post = require('../models/post.js');

exports.index=function (q, s) {
    Post.get(null,1,function(err,posts,totle){
        if(err){
            posts=[];
        }
        s.render("index", {
            title: "Home",
            user: q.session.user,
            error: q.flash("error").toString(),
            success: q.flash('success').toString(),
            posts:  posts,
            totle: totle,
            page: 1
        })
    })
};
exports.pages=function(q,s){
    Post.get(null, q.params.page,function(err,posts,totle){
        if(err){
            posts=[];
        }
        s.render("index",{
            title: "Page "+ q.params.page,
            user: q.session.user,
            error: q.flash("error").toString(),
            success: q.flash("success").toString(),
            posts: posts,
            totle: totle,
            page: q.params.page
        })
    })
};
exports.tag=function(q,s){
    var postObj={
        "tags.tag": q.params.tag
    }
    Post.get(postObj, 1,function(err,posts,totle){
        if(err){
            posts=[];
        }
        s.render("index",{
            title: "Tags "+ q.params.tag +" - Page 1",
            user: q.session.user,
            error: q.flash("error").toString(),
            success: q.flash("success").toString(),
            posts: posts,
            totle: totle,
            page: 1
        })
    })
};
exports.tagPages=function(q,s){
    var postObj={
        "tags.tag": q.params.tag
    }
    Post.get(postObj, q.params.page,function(err,posts,totle){
        if(err){
            posts=[];
        }
        s.render("index",{
            title: "Tags "+ q.params.tag+" - Page "+ q.params.page,
            user: q.session.user,
            error: q.flash("error").toString(),
            success: q.flash("success").toString(),
            posts: posts,
            totle: totle,
            page: q.params.page
        })
    })
};
exports.category=function(q,s){
    var postObj={
        "category": q.params.category
    }
    Post.get(postObj, 1,function(err,posts,totle){
        if(err){
            posts=[];
        }
        s.render("index",{
            title: "Category: "+ q.params.category +" - Page 1",
            user: q.session.user,
            error: q.flash("error").toString(),
            success: q.flash("success").toString(),
            posts: posts,
            totle: totle,
            page: 1
        })
    })
};
exports.categoryPage=function(q,s){
    var postObj={
        "category": q.params.category
    }
    Post.get(postObj, q.params.page,function(err,posts,totle){
        if(err){
            posts=[];
        }
        s.render("index",{
            title: "Category "+ q.params.category +" - Page "+ q.params.page,
            user: q.session.user,
            error: q.flash("error").toString(),
            success: q.flash("success").toString(),
            posts: posts,
            totle: totle,
            page: q.params.page
        })
    })
};
exports.getNew=function (q, s) {
    s.render('post', {
        title: "New Post",
        user: q.session.user,
        post: null,
        error: q.flash("error").toString(),
        success: q.flash('success').toString()
    })
};
exports.postNew=function (q, s) {
    if(!q.body.post.title||!q.body.post.content){
        q.flash('error',"Oh-oh, Something Went Wrong, Check if your Content Exist.")
        return s.redirect("/post/new")
    }
    var currentUser = q.session.user,
        postObj= q.body.post;
    postObj.name= currentUser.name;
    postObj.avatar=currentUser.avatar;
    var  tagsObj=[];
    postObj.tags.split('|').forEach(function(tag){
        tagsObj.push({tag:tag.trim()})
    });
    postObj.tags=tagsObj;
    var post = new Post(postObj);
    post.save(function(err,post){
        if(err){
            q.flash('error',err);
            return s.redirect('/')
        }
        q.flash('success',"Posted Successfully!");
        s.redirect('/')
    })
};
exports.show=function(q,s){
    Post.get({
        "time.day": q.params.day,
        "title": q.params.title
    },null,function(err,post){
        if(err){
            q.flash('error',err);
            return s.redirect('/')
        }
        post=post[0];
        if(!post){
            return s.send("404-Not Found")
        }
        s.render('page',{
            title: post.title,
            post: post,
            user: q.session.user,
            success: q.flash('success').toString(),
            error: q.flash('error').toString()
        })
    })
};
exports.getEdit=function(q,s){
    Post.get({
        "time.day": q.params.day,
        "title": q.params.title
    },null,function(err,post){
        if(err){
            q.flash('error',err);
            return s.redirect('/')
        }
        post=post[0];
        if(!post){
            q.flash("error","404 - Page not found.");
            return s.redirect("/")
        }
        s.render('post',{
            title: "Edit Post",
            post:post,
            user: q.session.user,
            success: q.flash('success').toString(),
            error: q.flash('error').toString()
        })
    })
};
exports.postEdit=function(q,s){
    var postObj= q.body.post;
    var  tagsObj=[];
    q.body.post.tags.split('|').forEach(function(tag){
        tagsObj.push({tag:tag.trim()})
    });
    postObj.tags=tagsObj;
    Post.update({
        "time.day": q.params.day,
        "title": q.params.title
    },postObj,function(err,post){
        if(err){
            q.flash('error',err);
            return s.redirect('/')
        }
        q.flash('success',"Successfully Updated!")
        s.redirect('/post/'+ q.params.day+"/"+ postObj.title)
    })
};
exports.getDelete=function(q,s){
    Post.remove(
        {
            "time.day": q.params.day,
            "title": q.params.title
        },function(err){
            if(err){
                q.flash("error",err);
                return s.redirct("/")
            }
            q.flash("success", "The blog "+q.params.title+" was deleted successfully");
            return s.redirect("/")
        }
    )
};