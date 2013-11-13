/**
 * Created by Cyril on 13-11-9.
 */

var Db = require('./database').DB,
    db;
db= new Db();
function Photo(photo){
    this.url= photo.url;
    this.description=photo.description;
    this.tags= photo.tags;
    this.album= photo.album
}
module.exports = Photo;
Photo.prototype.save = function(callback){
    var time= new Date;
    var photo = {
        url: this.url,
        tags: this.tags,
        description: this.description,
        album: this.album,
        time: time
    };
    db.connect("photos",function(err,collection){
        if(err) {
            callback(err);
            return;
        }
        collection.insert(photo,{safe: true},function(err,photo){
            if(err){
                callback(err);
                return;
            }
            console.dir("Photo Saved",photo);
            callback(null, photo)
        })
    })
};
//Photo.get({id: id, name: name})
Photo.getOne = function(photoObj, callback){
    db.connect("photos",function(err,collection){
        if(err){
            callback(err);
            return;
        }
        collection.findOne(photoObj,function(err,photo){
            if(err){
                callback(err);
                return;
            }
            callback(null,photo);
        })
    })
};
Photo.get = function(photoObj, page, callback){
    db.connect('photos',function(err,collection){
        if(err){
            callback(err);
            return
        }
        var filter= page? {skip:(page-1)*10,limit:10} :{};
        collection.find(photoObj,filter).sort({time:-1}).toArray(function(err,photo){
            if(err){
                callback(err);
                return
            }
            callback(null,photo)
        })
    })
};
Photo.remove = function (photoObj,callback){
    db.connect('photos',function(err,collection){
        if(err){
            callback(err);
            return
        }
        collection.remove(photoObj,function(err){
            if(err){
                callback(err);
                return
            }
            callback(null);
        })
    })
};