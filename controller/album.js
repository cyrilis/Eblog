/**
 * Created by Cyril on 13-11-8.
 */
"use strict";

var db = require('../models/database');
var User = db.User, Album = db.Album, Photo = db.Photo;

exports.getNew = function(q,s,next){
    s.render('newAlbum',{title: 'New Album'});
};

exports.PostNew = function(q,s,next){
    if(!q.body.album.title){
        console.log('No Album title');
        q.flash('error','Error, Please input title for new album');
        s.redirect('back');
        return;
    }
    var newAlbum = new Album(q.body.album);
    newAlbum.time = new Date();
    newAlbum.updated = new Date();
    newAlbum.save(function(err,album){
        if(err){
            console.log(err);
            q.flash('error',err.message);
            s.redirect('back');
            return;
        }
        q.flash('success','Album created successfully!');
        s.redirect('/albums/'+ album.title);
    });
};

exports.putAlbum = function(q,s,next){
    if(!q.body.album.title||!q.body.album._id){
        console.log('No Album title');
        q.flash('error','Error, Please input title for new album');
        s.redirect('back');
        return;
    }
    var newAlbum = q.body.album;
    newAlbum.updated = new Date();
    delete newAlbum._id;
    Album.findByIdAndUpdate(newAlbum,function(err,album){
        if(err){
            console.log(err);
            q.flash('error',err.message);
            s.redirect('back');
            return;
        }
        q.flash('success','Album updated successfully!');
        s.redirect('back');
    });
};

exports.deleteAlbum = function(q,s,next){

};