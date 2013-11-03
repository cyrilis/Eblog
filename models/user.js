/**
 * Created by never on 13-10-26.
 */
var database = require('./db'),
    crypto = require('crypto');
function User(user){
    this.name= user.name;
    this.password = user.password;
    this.email= user.email;
}

module.exports = User;

User.prototype.save = function(callback){
        avatar = "/images/default_avatar.jpg";
    var user = {
        name: this.name,
        password: this.password,
        email: this.email,
        avatar: avatar,
        bio: ""
    };

    database.open(function(err, db){
        if (err){
            return callback(err)
        }
        db.collection("users",function(err,collection){
            if(err) {
                database.close();
                return callback(err)
            }
            collection.insert(user,{safe: true},function(err,user){
                if(err){
                    return callback(err)
                }
                database.close();
                callback(null, user[0])
            })
        })
    })
}

//user.get({id: id, name: name})
User.get = function(userObj, callback){
    database.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection("users",function(err,collection){
            if(err){
                database.close();
                return callback(err)
            }

            collection.findOne(userObj,function(err,user){
                if(err){
                    database.close();
                    return callback(err)
                }
                database.close();
                return callback(null,user)
            })
        })
    })
}