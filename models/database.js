/**
 * Created by Cyril on 13-11-3.
 */
"use strict";
var settings = require('../settings'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

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
    category: String
});
var CategorySchema = new Schema({
    id: ObjectId,
    name: {type: String, required:true},
    posts: [{
        type: ObjectId, ref: 'Post'
    }]
});
var connection = mongoose.createConnection(settings.dburl),
    User = connection.model('User',UserSchema),
    Post = connection.model('Post',PostSchema),
    Category = connection.model('Category',CategorySchema);

module.exports = {
    'User': User,
    'Post': Post
};
