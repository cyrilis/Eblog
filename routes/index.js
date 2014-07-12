/**
 * Created by Cyril on 13-10-26.
 * Routes File
 * List all routes here
 */
/* jshint -W100 */
"use strict";

var user = require('../controller/user.js'),
    post = require('../controller/post.js'),
    file = require('../controller/file.js');
var album= require('../controller/album.js');
var site = require('../controller/site.js');

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

    app.get('/settings/profile',user.getProfiles);
    app.get('/settings/posts',post.settingPages);
    app.get('/settings/about',user.getEditAbout);
    app.put('/users',checkLogin);
    app.put('/users',user.changeProfile);
    app.put('/password',checkLogin);
    app.put('/password',user.changePassword);

//    Site Actions
    app.get('/settings/site',user.getSetting);
    app.put('/about',checkLogin);
    app.put('/about',site.updateAbout);
    app.get('/about',site.getAbout);
    app.put('/site',site.updateSite);
    app.get('/settings/logs',site.visiteLogs);

//    Post Actions
    app.get('/posts/new', checkLogin);
    app.get('/posts/new', post.getNew);
    app.get('/posts/markdown',checkLogin);
    app.get('/posts/markdown',post.markdownNew);
    app.post('/posts', checkLogin);
    app.post('/posts', post.postNew);
    app.get('/posts/:slug', post.show);
//    app.get('/albums',album.show);
    app.post('/logout', user.logout);
    app.get('/posts/:slug/edit', checkLogin);
    app.get('/posts/:slug/edit', post.getEdit);
    app.get('/posts/:slug/markdown', checkLogin);
    app.get('/posts/:slug/markdown', post.getMarkdown);
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

//  Redirect Old Posts
    app.get('/20120512.html',redi('/posts/豆瓣阅读的作品商店上线'));
    app.get('/20120915.html',redi('/posts/创意网页文字排版教程'));
    app.get('/20121117.html‎',redi('/posts/微信机器人微天气上线'));
    app.get('/20121119.html',redi('/posts/网页设计中的-icon-字体'));
    app.get('/20130109.html‎',redi('/posts/调戏小黄鸡'));
    app.get('/20130224.html‎',redi('/posts/lab-itunes-的-coverflow-样式'));
    app.get('/20130502.html‎',redi('/posts/markdown-windows上的-markdown-工具推荐'));
    app.get('/20130602.html',redi('/posts/三体书评'));
    app.get('/20130625.html',redi('/posts/实验室利用node-webkit打造豆瓣电台桌面客户端'));
    app.get('/20131015.html',redi('/posts/基于-nodejs-的博客程序-ghost'));
    app.get('/About.html',redi('/about'));

// handel Email from MailGun
    app.post('/receive-email', site.receiveEmail);

// Image Uploader
    app.get('/image-uploader', function(q,s){s.send("");});

    function redi(newUrl){
        return function(q,s){
            s.redirect(301, newUrl);
        };
    }
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