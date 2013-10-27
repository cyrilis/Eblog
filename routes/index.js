
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
        Post.get(null, function(err,posts){
            if(err){
                posts=[];
            }
            s.render("index", {
                title: "Home",
                user: q.session.user,
                error: q.flash("error").toString(),
                success: q.flash('success').toString(),
                posts:  posts
            })
        })

    });
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
    app.get('/post/:day/:title/edit',checkLogin);
    app.get('/post/:day/:title/edit',function(q,s){
        Post.get({
            "time.day": q.params.day,
            "title": q.params.title
        },function(err,post){
            if(err){
                q.flash('error',err);
                return s.redirect('/')
            }
            post=post[0];
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
            console.dir(post);
            console.log(JSON.stringify(postObj));
            q.flash('success',"Successfully Updated!")
            s.redirect('/post/'+ q.params.day+"/"+ postObj.title)
        })
    });
    app.get('/post/:day/:title',function(q,s){
        Post.get({
            "time.day": q.params.day,
            "title": q.params.title
        },function(err,post){
            if(err){
                q.flash('error',err);
                return s.redirect('/')
            }
            post=post[0];
            console.log(post);
            s.render('page',{
                title: post.title,
                post: post,
                user: q.session.user,
                success: q.flash('success').toString(),
                error: q.flash('error').toString()
            })
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
    app.get('/logout', function (q, s) {
        q.session.user=null;
        q.flash("success","Logout Success");
        s.redirect('/')
    });
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
    })
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