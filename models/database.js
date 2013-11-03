/**
 * Created by never on 13-11-3.
 */

var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {auto_reconnect: true}));

var Eblog=function(host, port, dbname) {
    this.host = host;
    this.port = port;
    this.dbname = dbname;

    this.server = new mongodb.Server(
        'localhost',
        9000,
        {auto_reconnect: true});
    this.db_connector = new mongodb.Db(this.dbname, this.server);

    var self = this;

    this.db = undefined;
    this.queue = [];

    this.db_connector.open(function(err, db) {
        if( err ) {
            console.log(err);
            return;
        }
        self.db = db;
        for (var i = 0; i < self.queue.length; i++) {
            var collection = new mongodb.Collection(
                self.db, self.queue[i].cn);
            self.queue[i].cb(collection);
        }
        self.queue = [];

    });
};
exports.Eblog=Eblog;
Eblog.prototype.query = function(collectionName, callback) {
    if (this.db != undefined) {
        var collection = new mongodb.Collection(this.db, collectionName);
        callback(collection);
        return;
    }
    this.queue.push({ "cn" : collectionName, "cb" : callback});
}

/**
 * Created by never on 13-10-26.
 */
var database = require('./db');
function Post(post){
    this.title = post.title;
    this.content = post.content;
    this.name = post.name;
    this.tags = post.tags;
    this.category=post.category;
    this.avatar=post.avatar;
}
module.exports= Post;
Post.prototype.save = function(callback){
    var date = new Date();
    var time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear()+"-"+(date.getMonth()+1),
        day: date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
        minute: date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()
    }
    var post={
        avatar: this.avatar,
        name: this.name,
        time: time,
        title: this.title,
        content: this.content,
        tags: this.tags,
        category: this.category
    }
    database.open(function(err, db){
        if (err){
            return callback(err)
        }
        db.collection("post",function(err,collection){
            if(err){
                database.close();
                return callback(err)
            }
            collection.insert(post, {safe:true},function(err, post){
                database.close();
                if(err){
                    return callback(err)
                }
                return callback(null, post[0])
            })
        })
    })
};
Post.get = function(postObj,page,callback){
    database.open(function(err, db){
        if(err){
            return callback(err)
        }
        db.collection("post",function(err,collection){
            if(err){
                database.close();
                return callback(err)
            }
            var filter= page? {skip:(page-1)*5,limit:5} :{};
            collection.count(postObj,function(err,totle){
                if(err){
                    return callback(err);
                }
                collection.find(postObj,filter).sort({time:-1}).toArray(function(err,posts){
                    database.close();
                    if(err){
                        return callback(err)
                    }
                    callback(null, posts,totle)
                })
            })
        })
    })
};
Post.update= function(postObjAttr,postObj,callback){
    database.open(function(err,db){
        if(err){return callback(err)}
        db.collection('post',function(err,collection){
            if(err){database.close();return callback(err)}
            collection.update(postObjAttr,{$set:postObj},function(err,post){
                database.close();
                if(err){callback(err)};
                callback(null, post)
            })
        })
    })
};
Post.tags = function(callback){
    database.open(function(err,db){
        if(err){return callback(err)}
        db.collection("post",function(err,collection){
            if(err){database.close();return callback(err)}
            collection.distinct("tags.tag",function(err,tags){
                database.close();
                if(err){return callback(err)}
                callback(null,tags)
            })
        })
    })
};
Post.categories = function(callback){
    database.open(function(err,db){
        if(err){return callback(err)}
        db.collection("post",function(err,collection){
            if(err){database.close();return callback(err)}
            collection.distinct("category",function(err,categories){
                database.close();
                if(err){return callback(err)}
                callback(null,categories)
            })
        })
    })
};
Post.remove= function(postObj,callback){
    database.open(function(err,db){
        if(err){return callback(err)}
        db.collection('post',function(err,collection){
            if(err){
                database.close();
                return callback(err)
            }
            collection.remove(postObj,function(err,result){
                database.close();
                if(err){
                    return callback(err)
                }
                return callback(null)
            })
        })
    })
};