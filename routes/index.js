
/*
 * Routes File
 * List all routes here
 */
var crypto = require('crypto'),
    fs = require('fs'),
    User = require('../models/user.js');
    Post = require('../models/post.js');
module.exports = function (app) {
    app.get("/", function (q, s) {
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

    });
    app.get("/pages/:page",function(q,s){
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
    });
    app.get("/u/:name",function(q,s){
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
    });
    app.get("/u/:name/pages/:page",function(q,s){
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
    })
    app.get('/reg', checkNotLogin);
    app.get("/reg", function (q, s) {
        s.render("reg", {
            title: 'Register',
            user: q.session.user,
            error: q.flash("error").toString(),
            success: q.flash('success').toString()
        });
    });
    app.post('/reg', function (q, s) {
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
    });
    app.get('/login', checkNotLogin);
    app.get('/login', function (q, s) {
        s.render("login", {
            title: 'Login',
            user: q.session.user,
            error: q.flash("error").toString(),
            success: q.flash('success').toString()
        })
    });
    app.post('/login', function (q, s) {
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
    });
    app.get('/post/new', checkLogin);
    app.get('/post/new', function (q, s) {
        s.render('post', {
            title: "New Post",
            user: q.session.user,
            post: null,
            error: q.flash("error").toString(),
            success: q.flash('success').toString()
        })
    });
    app.post('/post', checkLogin);
    app.post('/post', function (q, s) {
        if(!q.body.post.title||!q.body.post.content){
            q.flash('error',"Oh-oh, Something Went Wrong, Check if your Content Exist.")
            return s.redirect("/post/new")
        }
        var currentUser = q.session.user,
            postObj= q.body.post;
        postObj.name= currentUser.name;
        var post = new Post(postObj);
        post.save(function(err,post){
            if(err){
                q.flash('error',err);
                return s.redirect('/')
            }
            q.flash('success',"Posted Successfully!");
            s.redirect('/')
        })
    });
    app.get('/post/:day/:title',function(q,s){
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
    });
    app.get('/logout', function (q, s) {
        q.session.user=null;
        q.flash("success","Logout Success");
        s.redirect('/')
    });
    app.get('/post/:day/:title/edit',checkLogin);
    app.get('/post/:day/:title/edit',function(q,s){
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
    });
    app.post('/post/:day/:title/edit',checkLogin);
    app.post('/post/:day/:title/edit',function(q,s){
        var postObj= q.body.post;
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
    });
    app.get('/post/:day/:title/delete',checkLogin);
    app.get('/post/:day/:title/delete',function(q,s){
        var postObj = q.body.post;
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
    })
    app.post('/upload',checkLogin);
    app.post('/upload',function(q,s){
        if(q.files.file.size==0){
            fs.unlinkSync(q.files.file.path);
            console.log("[Delete]-Successfully removed an empty file!")
        }else{
            var target_path='/images/upload/'+(function(){return +new Date})()+".jpg";
            fs.renameSync(q.files.file.path,"./public"+target_path);
            console.log("[Rename]-Successfully renamed a file!")
        }
        s.json({url:target_path})
    });
    function checkLogin(q,s,next){
        if (!q.session.user){
            q.flash("error","Login First!");
            return s.redirect('/login')
        }
        next();
    };
    function checkNotLogin(q,s,next){
        if (q.session.user){
            q.flash("error","You've logged in");
            s.redirect('back')
        }
        next();
    }
};