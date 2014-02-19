/**
 * Created by never on 13-11-3.
 */
"use strict";

var fs = require('fs');
exports.upload=function(q,s){
    var editor_id = q.query.editorid;
    var target_path;
    console.log(q.header.host);
    if(q.files.file.size===0){
        fs.unlinkSync(q.files.file.path);
        console.log("[Delete]-Successfully removed an empty file!");
    }else{
        target_path='/images/upload/'+(function(){return +new Date();})()+".jpg";
        fs.renameSync(q.files.file.path,"./public"+target_path);
        console.log("[Rename]-Successfully renamed a file!");
    }
    s.send("<script>parent.UM.getEditor('"+editor_id+"').getWidgetCallback('image')('" + target_path+"','SUCCESS')</script>");
};