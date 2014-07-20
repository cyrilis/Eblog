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

var Mixed = Schema.Types.Mixed;

var UserSchema = new Schema({
    id: ObjectId,
    name: {type:String, default: ""},
    email: {type:String, required: true, trim: true,unique: true},
    password: {type:String, required: true},
    avatar: {type: String, default:"/images/default_avatar.jpg"},
    bio: {type: String, default: '这个人很懒，什么也没写。'},
    posts: [{
        type:ObjectId, ref: 'Post'
    }],
    url: {type: String, default:""}
});

var PostSchema = new Schema({
    id: ObjectId,
    time: {type: Date},
    title: {type: String, required: true, default: ''},
    content: String,
    markdown: String,
    tags: [{
        type: String
    }],
    user: {type: ObjectId, ref: 'User'},
    category: String,
    slug: {type: String, unique: true},
    isMarkdown : {type:Boolean, default: false}
});

var postDate = PostSchema.virtual('date');
postDate.get(function(){
//    2014-02-16 18:02:30
    return moment(this.time).lang('zh-cn').format('LL');
});


var AlbumSchema = new Schema({
    id: ObjectId,
    time: {type:Date},
    user: {type:ObjectId, ref: 'User'},
    title: {type:String,required: true},
    photos: {type: ObjectId, ref: 'Photo'},
    desc: {type: String},
    updated: Date
});
var albumCover = AlbumSchema.virtual('cover');
albumCover.get(function(){
        return this.photos&&this.photos.length? this.photos[0].location: '/images/default_cover.png';
});

var PhotoSchema = new Schema({
    id: ObjectId,
    time: Date,
    title: {type:String, unique:true},
    location: String,
    desc: String,
    album: {type: ObjectId, ref: 'Album'}
});

var LogSchema = new Schema({
    id: ObjectId,
    date: Date,
    user: {type: ObjectId, ref: "User"},
    method: String,
    url: String,
    data: String,
    ip: String,
    country: String,
    city: String,
    browser: String,
    version: String,
    os: String,
    ua: String
});

var EmailSchema = new Schema({
    type: String,
    id: ObjectId,
    time: Date,
    recipient: String,
    sender: String,
    subject: String,
    from: String,
    received: String,
    Date: String,
    From: String,
    To: String,
    timestamp: String,
    token: String,
    signature: String,
    "X-Envelope-From": String,
    'Dkim-Signature': String,
    'Mime-Version': String,
    'X-Received': String,
    "Message-Id": String,
    'Subject': String,
    'Content-Type': String,
    'X-Mailgun-Incoming': String,
    'message-headers': String,
    'body-plan': String,
    'body-html': String,
    'stripped-html': String,
    'stripped-text': String,
    'stripped-signature': String,
    'In-Reply-To': String
});

var DiarySchema = new Schema({
    time: Date,
    content: String,
    form: String
});

DiarySchema.statics.random = function(callback) {
    this.count(function(err, count) {
        if (err) {
            return callback(err);
        }
        var rand = Math.floor(Math.random() * count);
        this.findOne().skip(rand).exec(callback);
    }.bind(this));
};

var RobotSchema = new Schema({
    type: String,
    time: Date,
    form: String,
    status: String,
    content: Mixed
});

var logDate = LogSchema.virtual('time');
logDate.get(function(){
    return moment(this.date).lang('zh-cn').format("YYYY/MM/DD/H:mm:ss");
});

var SiteSchema = new Schema({
    id: ObjectId,
    name: String,
    about: String,
    logo: String,
    desc: String
});

var connection = mongoose.createConnection(settings.dburl),
    User = connection.model('User',UserSchema),
    Post = connection.model('Post',PostSchema),
    Album = connection.model('Album',AlbumSchema),
    Photo = connection.model('Photo',PhotoSchema),
    Log   = connection.model("Log", LogSchema),
    Site  = connection.model("Site", SiteSchema),
    Email  = connection.model("Email", EmailSchema),
    Robot = connection.model("Robot", RobotSchema),
    Diary = connection.model("Diary", DiarySchema);

module.exports = {
    'User': User,
    'Post': Post,
    'Album': Album,
    'Photo': Photo,
    'Log' : Log,
    'Site': Site,
    'Email': Email,
    'Robot': Robot,
    'Diary': Diary
};
