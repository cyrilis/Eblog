/**
 * Created by never on 13-10-26.
 */
var db = require('./database').DB;
DB= new db();
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
    };
    DB.connect("post",function(err,collection){
        collection.insert(post, {safe:true},function(err, post){
            return callback(null, post[0])
        })
    })
};
Post.get = function(postObj,page,callback){
    DB.connect("post",function(err,collection){
        var filter= page? {skip:(page-1)*5,limit:5} :{};
        collection.count(postObj,function(err,total){
            collection.find(postObj,filter).sort({time:-1}).toArray(function(err,posts){
                if(err){
                    callback(err);
                    return;
                }
                callback(null, posts,total)
            })
        })
    })
};
Post.update= function(postObjAttr,postObj,callback){
    DB.connect('post',function(err,collection){
        if(err){callback(err);return;}
        collection.update(postObjAttr,{$set:postObj},function(err,post){
            if(err){callback(err)}
            callback(null, post)
        })
    })
};
Post.tags = function(callback){
    DB.connect("post",function(err,collection){
        if(err){callback(err);return;}
        collection.distinct("tags.tag",function(err,tags){
            if(err){return callback(err)}
            callback(null,tags)
        })
    })
};
Post.categories = function(callback){
    DB.connect("post",function(err,collection){
        if(err){callback(err);return;}
        collection.distinct("category",function(err,categories){
            if(err){return callback(err)}
            callback(null,categories)
        })
    })
};
Post.remove= function(postObj,callback){
    DB.connect('post',function(err,collection){
        if(err){
            callback(err);
            return;
        }
        collection.remove(postObj,function(err){
            if(err){
                callback(err);
                return;
            }
            return callback(null)
        })
    })
};
