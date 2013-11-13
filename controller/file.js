/**
 * Created by never on 13-11-3.
 */

var fs = require('fs');
exports.upload=function(q,s){
    if(q.files.file.size==0){
        fs.unlinkSync(q.files.file.path);
        console.log("[Delete]-Successfully removed an empty file!")
    }else{
        var target_path='/images/upload/'+(function(){return +new Date})()+".jpg";
        fs.renameSync(q.files.file.path,"./public"+target_path);
        console.log("[Rename]-Successfully renamed a file!")
    }
    s.json({url:target_path})
};