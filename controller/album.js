/**
 * Created by Cyril on 13-11-8.
 */

var Album = require('../models/album.js');

exports.show=function (q, s) {
    var page= q.params.page||1;
    Album.get(null,page,function(err,albums,total){
        if(err){
            ablbums=[];
            total=0;
        }
        s.render("index", {
            title: "Albums",
            user: q.session.user,
            error: q.flash("error").toString(),
            success: q.flash('success').toString(),
            albums:  albums,
            total: total,
            page: page
        })
    })
};

exports.getNew=function (q, s) {
    s.render('album', {
        title: "New Album",
        user: q.session.user,
        album: null,
        error: q.flash("error").toString(),
        success: q.flash('success').toString()
    })
};
exports.create=function (q, s) {
    if(!q.body.albums.title){
        q.flash('error',"Oh-oh, Something Went Wrong, Check if your Title Exist.");
        s.redirect("/album/new");
        return
    }
    var currentUser = q.session.user,
        albumObj= q.body.album;
    albumObj.name= currentUser.name;
    albumObj.avatar=currentUser.avatar;
    var  tagsObj=[];
    albumObj.tags.split('|').forEach(function(tag){
        tagsObj.push({tag:tag.trim()})
    });
    albumObj.tags=tagsObj;
    var album = new Album(albumObj);
    album.save(function(err,album){
        if(err){
            q.flash('error',err);
            s.redirect('/');
            return
        }
        q.flash('success',"Albumed Successfully!");
        s.redirect('/')
    })
};
exports.albumEdit=function(q,s){
    var albumObj= q.body.album;
    var  tagsObj=[];
    q.body.album.tags.split('|').forEach(function(tag){
        tagsObj.push({tag:tag.trim()})
    });
    albumObj.tags=tagsObj;
    Album.update({
        "time.day": q.params.day,
        "title": q.params.title
    },albumObj,function(err,album){
        if(err){
            q.flash('error',err);
            s.redirect('/');
            return
        }
        q.flash('success',"Successfully Updated!");
        s.redirect('/album/'+ q.params.day+"/"+ albumObj.title)
    })
};
exports.getDelete=function(q,s){
    Album.remove(
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