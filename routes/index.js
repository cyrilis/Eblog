
/*
 * Routes File
 * List all routes here
 */

module.exports = function (app) {
    app.get("/", function (q, s) {
        s.render("index", {title: "express"})
    });
    app.get("/reg", function (q, s) {
        s.render("reg", {title: 'Register'});
    });
    app.post('/reg', function (q, s) {

    });
    app.get('/login', function (q, s) {
        s.render("login", {title: 'Login'})
    });
    app.post('/login', function (q, s) {
        s.send("Login Post Page")
    });
    app.get('/post', function (q, s) {
        s.render('post', {title: "New Post"})
    });
    app.post('/post', function (q, s) {

    });
    app.get('/logout', function (q, s) {

    })
};