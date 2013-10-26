/**
 * Created by never on 13-10-26.
 */
var database = require('./db');
function Post(post){
    this.title = post.title;
    this.content = post.content;
    this.name = post.name;
}

module.exports= Post;

Post.prototype.save = function(callback){
    var date = new Date();
    var time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear()+"年"+(date.getMonth()+1)+"月",
        day: date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日",
        minute: date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日"+date.getHours()+"时"+date.getMinutes()+"分"
    }
    var post={
        name: this.name,
        time: time,
        title: this.title,
        content: this.content
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
}

Post.get = function(postObj,callback){
    database.open(function(err, db){
        if(err){
           return callback(err)
        }
        db.collection("post",function(err,collection){
            if(err){
                database.close();
                return callback(err)
            }
            collection.find(postObj).sort({time:-1}).toArray(function(err,posts){
                database.close();
                if(err){
                    return callback(err)
                }
                callback(null, posts)
            })
        })
    })
}