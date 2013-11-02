/*
 * Routes File
 * List all routes here
 */
var user = require('../controller/user.js'),
    post = require('../controller/post.js'),
    file = require('../controller/file.js');

module.exports = function (app) {
    app.get("/", post.index);
    app.get("/pages/:page", post.pages);
    app.get("/tags/:tag",post.tag);
    app.get("/tags/:tag/pages/:page",post.tagPages);
    app.get("/categories/:category",post.category);
    app.get("/categories/:category/pages/:page",post.categoryPage);
    app.get("/u/:name", user.show);
    app.get("/u/:name/pages/:page", user.pages);
    app.get('/reg', checkNotLogin);
    app.get("/reg", user.getNew);
    app.post("/reg", checkNotLogin);
    app.post('/reg', user.postNew);
    app.get('/login', checkNotLogin);
    app.get('/login', user.getLogin);
    app.post("/login", checkNotLogin);
    app.post('/login', user.postLogin);
    app.get('/post/new', checkLogin);
    app.get('/post/new', post.getNew);
    app.post('/post', checkLogin);
    app.post('/post', post.postNew);
    app.get('/post/:day/:title', post.show);
    app.get('/logout', user.logout);
    app.get('/post/:day/:title/edit', checkLogin);
    app.get('/post/:day/:title/edit', post.getEdit);
    app.post('/post/:day/:title/edit', checkLogin);
    app.post('/post/:day/:title/edit', post.postEdit);
    app.get('/post/:day/:title/delete', checkLogin);
    app.get('/post/:day/:title/delete', post.getDelete);
    app.post('/upload', checkLogin);
    app.post('/upload', file.upload);
    function checkLogin(q,s,next){
        if (!q.session.user){
            q.flash("error","Login First!");
            s.redirect('/login')
        }
        next();
    }
    function checkNotLogin(q,s,next){
        if (q.session.user){
            q.flash("error","You've logged in");
            s.redirect('back')
        }
        next();
    }
};