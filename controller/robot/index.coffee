setting     = require '../../settings'
# better console
require('colors')

# Database

RobotEvent = require('../../models/database').Robot

# Email
nodemailer  = require "nodemailer"
mailer = nodemailer.createTransport 'SMTP',
  service: 'Mailgun',
  auth   :
    user  : setting.mailgun.user,
    pass  : setting.mailgun.pass

# Defer Lib
Q           = require "q"

# CronJob Lib
schedule    = require 'node-schedule'

# request Lib
request     = require 'superagent'

# Twitter Api Lib
Twit        = require 'twit'
twitter = new Twit
  consumer_key        : setting.twitter.consumerKey
  consumer_secret     : setting.twitter.consumerSecret
  access_token        : setting.twitter.accessToken
  access_token_secret : setting.twitter.accessTokenSecret

# GitHub Api Lib
github = require('octonode')
client = github.client(setting.github)

# RSS xml parser
rssParser   = require "rssparser"

# AWS SDK
AWS = require 'aws-sdk'
AWS.config.loadFromPath('./config.json')
AWS.config.apiVersion = {
  s3: '2006-03-01'
}
S3 = new AWS.S3()

class Robot
  constructor: (config)->
    @name = config.name || "Robot A"
    @gender = config.gender || "Boy"
    @birthday = new Date()
    @age = config.gender || new Date() - @birthday
    @bio = "Robot Can Sleep, too."
    @jobs = []
    console.log "System initializing......."
    console.log "New Robot Generated with name: #{@name}"
    console.log "#{@name} is starting......"
    console.log "Please Wait...."
    console.log "Checking for healthy......"
    result = @checkHealth()
    if result.error
      console.log "#{result.error}"
      return false
    console.log "Health Check pass.".green
    console.log "Robot #{@name} is online now."
    jobs = @checkJobs()
    if jobs.length
      console.log "We got last jobs. "

  mail: (options)->
    console.log options
    console.log @
    options.subject = "[#{@name}]" + options.subject
    mailDiffer = Q.nfcall(mailer.sendMail, options)
    mailDiffer.then ->
      console.log arguments
    , ->
      console.log arguments
    mailDiffer

  checkHealth: ->
    {}
  checkJobs: ->
    return @jobs

  handler: (err)->
    console.log new Error(err)
    failEvent = new RobotEvent
      time: new Date()
      type: "Error"
      status: "Failed"
      content: {err}
    failEvent.save()


  jobs: (option)->  #{job, loop,[hour, day, minute, seconds, week, month, year]}
    if option.loop
      loopTime = new schedule.RecurrenceRule()
      loopTime.hour = option.hour
      loopJob = schedule.scheduleJob loopTime, option.job
      @jobs.push
        job: loopJob,
        loop: loopTime
      console.log 'Added To LoopJobs'

  web: (options)-> #{url [,method, header, data]}
    console.log '[Fetching Web]'.green.inverse, options.url
    def = null
    method = options.method.toLowerCase()
    if method in ['get','put', 'del', 'post', 'head']
      def = request[method](options.url)
    if options.data
      def = def.send data
    if options.header
      def = def.set options.header
    deferred = Q.defer()
    def.end (res)->
      if res.error then deferred.reject(res)
      else
        deferred.resolve(res)
        new RobotEvent({
          time: new Date()
          type: "web"
          status: "Success"
          content: {res}
        }).save()
    def.on 'error', (error)->
      deferred.reject(error)
    deferred.promise
  twitter: (options)-> #{action, method, data}
    console.log '[Twitter]'.green.inverse, options.action, options.method
    defer = Q.defer()
    twitter[options.method] options.action, options.data, (err,result)->
      if err then defer.reject(err)
      else
        defer.resolve(result)
        new RobotEvent({
          time: new Date()
          type: "twitter"
          status: "Success"
          content: {result}
        }).save()
    defer.promise

  storage: (options)-> #{path [, private(true, otherStringBut"public"), name]}
    console.log '[Storage]'.green.inverse, options.path, options.name
    option = {
      Bucket: setting.S3Bucket
      key: option.name || path.resolve(options.path).split('/').pop()
      ACL: if options.private and options.private isnt 'public' then "private" else "public-read"
      }
    s3Defer = Q.defer()
    fs.readFile options.path, (err, file)=>
      if err @handler(err)
      else (file)->
      option.Body = file
      S3.putObject option, (err, data)->
        if err then s3Defer.reject(err)
        else
          s3Defer.resolve(data)
          new RobotEvent({
            time: new Date()
            type: "Storage"
            status: "Success"
            content: {data}
          }).save()
    s3Defer.promise

  rss: (options)-> # {url, [requestOptions]}
    console.log '[RSS]'.green.inverse, options.url
    rssDefer = Q.defer()
    parser.parseURL options.url, options, (err, result)->
      if err then rssDefer.reject(err)
      else
        rssDefer.resolve(result)
        new RobotEvent({
          time: new Date()
          type: "RSS"
          status: "Success"
          content: {result}
        }).save()
    rssDefer.promise

  github: client




