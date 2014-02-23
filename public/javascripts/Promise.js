/**
 * Created by never on 14-2-24.
 */
"use strict";
function Promise(cb){
    this.then = new this.prototype();
    this.then = function(cb){
          cb();
    };
    return this;
}