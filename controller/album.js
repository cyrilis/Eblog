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
    newAlbum.user = q.session.user._id;
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
    var id = q.body.album._id;
    var newAlbum = q.body.album;
    newAlbum.updated = new Date();
    delete newAlbum._id;
    Album.findByIdAndUpdate(id,newAlbum,function(err,album){
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
    if(!q.body.album.title||!q.body.album._id){
        console.log('No Album title');
        q.flash('error','Error, Please input title for new album');
        s.redirect('back');
        return;
    }
    var id = q.body.album._id;
    Album.findByIdAndRemove(id,function(err){
        if(err){
            console.log(err);
            q.flash('error',err.message);
            s.redirect('back');
            return;
        }
        q.flash('success','Album deleted successfully!');
        s.redirect('/albums');
    });
};

var fs = require('fs');
exports.newPhoto = function(q,s, next){
    var targetPath;
    var extension;
    if(q.files.file.size===0){
        fs.unlinkSync(q.files.file.path);
        console.log("[Delete]-Successfully removed an empty file!");
    }else{
        extension = '.'+ q.files.file.path.split('.').pop().toLowerCase();
        targetPath='/images/upload/'+(function(){return +new Date();})()+extension;
        fs.renameSync(q.files.file.path,"./public"+targetPath);
        console.log("[Rename]-Successfully renamed a file!");
    }
    if(targetPath){
        console.log('New file uploaded.',targetPath);
        var newPhoto = new Photo({
            title: q.body.photo.title,
            location: targetPath,
            desc: q.body.photo.desc,
            album: q.body.photo.album,
            time: new Date()
        });
        newPhoto.save(function(err,photo){
            if(err){
                console.log(err);
                s.json({
                    error: true,
                    message: 'Database Error:'+ err.message
                });
                return;
            }
            s.json({
                error: false,
                message: 'New Photo Added',
                id: photo._id
            });
        });
    }else{
        console.log('No Photo, aborted...');
        s.json({
            error: true,
            message: 'No Photo File found, Please try again.'
        });
    }
};

exports.deletePhoto = function(){

};