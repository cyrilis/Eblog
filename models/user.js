/**
 * Created by never on 13-10-26.
 */
var Db = require('./database').DB,
    db;
db= new Db();
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

    db.connect("users",function(err,collection){
        if(err) {
            callback(err);
            return;
        }
        collection.insert(user,{safe: true},function(err,user){
            if(err){
                callback(err);
                return;
            }
            callback(null, user[0])
        })
    })
};

//user.get({id: id, name: name})
User.get = function(userObj, callback){
    db.connect("users",function(err,collection){
        if(err){
            callback(err);
            return;
        }
        collection.findOne(userObj,function(err,user){
            if(err){
                callback(err);
                return;
            }
            return callback(null,user)
        })
    })
};
