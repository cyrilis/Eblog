
/*
 * Routes File
 * List all routes here
 */
var crypto = require('crypto'),
    User = require('../models/user.js');
module.exports = function (app) {
    app.get("/", function (q, s) {
        s.render("index", {
            title: "Home",
            user: q.session.user,
            error: q.flash("error").toString(),
            success: q.flash('success').toString()
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
            q.flash('error',"Login Success");
            return s.redirect('/')
        })


    });
    app.get('/post/new', checkLogin)
    app.get('/post/new', function (q, s) {
        s.render('post', {
            title: "New Post",
            user: q.session.user,
            error: q.flash("error").toString(),
            success: q.flash('success').toString()
        })
    });
    app.post('/post', checkLogin)
    app.post('/post', function (q, s) {
        s.send('Yooo!')
    });
    app.get('/logout', function (q, s) {
        q.session.user=null;
        q.flash("success","Logout Success");
        s.redirect('/')
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