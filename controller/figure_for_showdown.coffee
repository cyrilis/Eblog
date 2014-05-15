figure = ->
    [
        type: 'lang'
        filter: (text)->
            imageMarkdownRegex = /^(?:\{<(.*?)>\})?!(?:\[([^\n\]]*)\])(?:\(([^\n\]]*)\))?$/gim
            uriRegex = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i
            pathRegex = /^(\/)?([^\/\0]+(\/)?)+$/i
            return text.replace imageMarkdownRegex, (match, key, alt, src)->
                if src and (src.match(uriRegex) or src.match(pathRegex))
                    result = '<img class="image" src="' + src + '"/>'

                output =  """
                    <figure id="image_upload_#{key}" class="figure">
                    #{result}
                    <figcaption>#{alt}</figcaption>
                    </figure>
                        """
                output
    ]

module.exports = figure