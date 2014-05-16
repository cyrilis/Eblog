fs = require 'fs'
im = require 'imagemagick'
exports.image = (q,s,next)->
    if(q.file.image.size == 0)
        fs.unlink q.file.image.path
        console.warn "Successfully removed Empty File."
        s.json
            result: 400
            message: "Bad request, file size is 0"
        return
    else
        tempPath = q.file.image.path
        timestamp = (new Date()).getTime()
        extension = tempPath.split('.').pop().toLowerCase()
        targetPath = path.resolve(__dirname , "public/images/upload/" + timestamp + extension)
        fs.rename tempPath, targetPath+"."+extension, (err, stdout, stderr)->
            if(err)
                console.error "Error While Renaming file.", err
                s.json
                    result: 500
                    message: "Error while renaming file"
            else
                im.readMetadata targetPath, (err,metaData)->
                    if(err)
                        arguments
                        console.log("error while readmetadata.")
                        s.json
                            result: 500
                            message: "Error while Read file Metadata."
                    else
                        console.log(metaData)
