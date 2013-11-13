/**
 * Created by Cyril on 13-11-9.
 */

var Db = require('./database').DB,
    db;
db= new Db();
function Album(album){
    this.name= album.name;
    this.cover=album.cover;
    this.description=album.description;
    this.published= album.published
}

module.exports = Album;

Album.prototype.save = function(callback){
    this.cover=this.cover||"/images/upload/cover.png";
    var time= new Date;
    var album = {
        name: this.name,
        cover: this.cover,
        description: this.description,
        time: time,
        published: this.published
    };
    db.connect("albums",function(err,collection){
        if(err) {
            callback(err);
            return;
        }
        collection.insert(album,{safe: true},function(err,album){
            if(err){
                callback(err);
                return;
            }
            console.dir("Album Saved",album);
            callback(null, album)
        })
    })
};
//user.get({id: id, name: name})
Album.getOne = function(albumObj, callback){
    db.connect("albums",function(err,collection){
        if(err){
            callback(err);
            return;
        }
        collection.findOne(albumObj,function(err,album){
            if(err){
                callback(err);
                return;
            }
            callback(null,album);
        })
    })
};
Album.get = function(albumObj, page, callback){
    db.connect('albums',function(err,collection){
        if(err){
            callback(err);
            return
        }
        var filter= page? {skip:(page-1)*10,limit:10} :{};
        collection.find(albumObj,filter).sort({time:-1}).toArray(function(err,album){
            if(err){
                callback(err);
                return
            }
            callback(null,album)
        })
    })
};
Album.remove = function (albumObj,callback){
    db.connect('albums',function(err,collection){
        if(err){
            callback(err);
            return
        }
        collection.remove(albumObj,function(err){
            if(err){
                callback(err);
                return
            }
            callback(null);
        })
    })
};