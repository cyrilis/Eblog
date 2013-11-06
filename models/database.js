/**
 * Created by Cyril on 13-11-3.
 */

var settings = require('../settings'),
    mongodb = require('mongodb'),
    Connection;
Connection= mongodb.Connection;
exports.DB = DB = function(){
    this.server = new mongodb.Server(
        settings.host,
        Connection.DEFAULT_PORT,
        {auto_reconnect: true});
    this.db_connector = new mongodb.Db(settings.db, this.server);
    var _this = this;
    this.db = undefined;
    this.queue = [];
    this.db_connector.open(function(err, db) {
        if( err ) {
            console.log(err);
            return;
        }
        _this.db = db;
        for (var i = 0; i < _this.queue.length; i++) {
            var collection = new mongodb.Collection(
                _this.db, _this.queue[i].collection);
            _this.queue[i].callback(collection);
        }
        _this.queue = [];
    });
};
DB.prototype.connect = function(collectionName, callback) {
    if (this.db != undefined) {
        var collection = new mongodb.Collection(this.db, collectionName);
        callback(null,collection);
        return;
    }
    this.queue.push({ "collection" : collectionName, "callback" : callback});
};