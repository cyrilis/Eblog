/**
 * Created by Cyril Hou(houshoushuai@gmail.com) on 14-2-24.
 */
"use strict";
function Promise(){
    console.log(arguments);
    var args = Array.prototype.slice.call(arguments);
    console.log(args);
    if( typeof args[0] === "function"){
        console.log('Function!');
    }else{
        console.log(typeof args[0]);
    }
}