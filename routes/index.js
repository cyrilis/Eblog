/**
 * Created by Cyril on 13-10-26.
 * Routes File
 * List all routes here
 */

"use strict";

var user = require('../controller/user.js'),
    post = require('../controller/post.js'),
    file = require('../controller/file.js');
var album= require('../controller/album.js');

module.exports = function (app) {
    app.all("*", post.all);
    app.get("/", post.index);
    app.get("/pages/:page", post.index);
    app.get("/tags/:tag",post.tag);
    app.get("/categories/:category",post.category);
    app.get("/u/:name", user.show);
//    User actions
    app.get('/reg', checkNotLogin);
    app.get("/reg", user.getNew);
    app.post("/reg", checkNotLogin);
    app.post('/reg', user.postNew);
    app.get('/login', checkNotLogin);
    app.get('/login', user.getLogin);
    app.post("/login", checkNotLogin);
    app.post('/login', user.postLogin);
    app.get('/settings/*',checkLogin);
    app.get('/settings/site',user.getSetting);
    app.get('/settings/profile',user.getProfiles);
    app.get('/settings/posts',post.settingPages);
//    Post Actions
    app.get('/posts/new', checkLogin);
    app.get('/posts/new', post.getNew);
    app.post('/posts', checkLogin);
    app.post('/posts', post.postNew);
    app.get('/posts/:slug', post.show);
//    app.get('/albums',album.show);
    app.post('/logout', user.logout);
    app.get('/posts/:slug/edit', checkLogin);
    app.get('/posts/:slug/edit', post.getEdit);
    app.put('/posts', checkLogin);
    app.put('/posts', post.postEdit);
    app.delete('/posts/:slug', checkLogin);
    app.delete('/posts/:slug', post.postDelete);
    app.post('/upload', checkLogin);
    app.post('/upload', file.upload);

//    Albums routers
    app.get('/albums',album.getAlbum);
    app.get('/albums/new',album.getNew);
    app.post('/albums',album.postNew);
    app.get('/albums/:title',album.getOneAlbum);
    function checkLogin(q,s,next){
        if (!q.session.user){
            q.flash("error","Login First!");
            s.redirect('/login');
        }
        next();
    }
    function checkNotLogin(q,s,next){
        if (q.session.user){
            q.flash("error","You've logged in");
            s.redirect('back');
        }
        next();
    }
};