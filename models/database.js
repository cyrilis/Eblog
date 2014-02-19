/**
 * Created by Cyril on 13-11-3.
 */
"use strict";
var settings = require('../settings'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    uslug = require('uslug'),
    moment = require('moment');

var UserSchema = new Schema({
    id: ObjectId,
    name: {type:String, default: ""},
    email: {type:String, required: true, trim: true,unique: true},
    password: {type:String, required: true},
    avatar: {type: String, default:"/images/default_avatar.jpg"},
    bio: {type: String, default: '这个人很懒，什么也没写。'},
    posts: [{
        type:ObjectId, ref: 'Post'
    }]
});

var PostSchema = new Schema({
    id: ObjectId,
    time: {type: Date},
    title: {type: String, required: true, default: ''},
    content: String,
    tags: [{
        type: String
    }],
    user: {type: ObjectId, ref: 'User'},
    category: String,
    slug: {type: String, unique: true}
});
PostSchema.pre('save',function (next) {
    this.slug = uslug(this.title);
    next();
});
var postDate = PostSchema.virtual('date');
postDate.get(function(){
//    2014-02-16 18:02:30
    return moment(this.time).lang('zh-cn').format('LL');
});

var AlbumSchema = new Schema({
    id: ObjectId,
    time: {type:Date},
    title: {type:String,required: true},
    photos: {type: ObjectId, ref: 'Photo'},
    desc: {type: String},
    updated: Date
});

var PhotoSchema = new Schema({
    id: ObjectId,
    time: Date,
    title: {type:String, unique:true},
    location: String,
    desc: String,
    album: {type: ObjectId, ref: 'Album'}
});

var connection = mongoose.createConnection(settings.dburl),
    User = connection.model('User',UserSchema),
    Post = connection.model('Post',PostSchema),
    Album = connection.model('Album',AlbumSchema),
    Photo = connection.model('Photo',PhotoSchema);

module.exports = {
    'User': User,
    'Post': Post,
    'Album': Album,
    'Photo': Photo
};
