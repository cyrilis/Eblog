require('colors')
nodemailer = require("nodemailer")
Q = require "q"
setting = require '../../settings'
schedule = require 'node-schedule'
request = require 'superagent'
Twit = require('twit')
AWS = require('aws-sdk')
AWS.config.loadFromPath('./config.json')
AWS.config.apiVersion = {
  s3: '2006-03-01'
}
S3 = new AWS.S3()
twitter = new Twit
  consumer_key        : setting.twitter.consumerKey
  consumer_secret     : setting.twitter.consumerSecret
  access_token        : setting.twitter.accessToken
  access_token_secret : setting.twitter.accessTokenSecret
mailer = nodemailer.createTransport 'SMTP',
    service: 'Mailgun',
    auth   :
      user  : setting.mailgun.user,
      pass  : setting.mailgun.pass

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

  addSchedule: (jobfunc, option)->
    if option.loop
      loopTime = new schedule.RecurrenceRule()
      loopTime.hour = option.hour
      loopJob = schedule.scheduleJob loopTime, jobfunc
      @jobs.push
        job: loopJob,
        loop: loopTime
      console.log 'Added To LoopJobs'

  web: (options)->
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
      else deferred.resolve(res)
    def.on 'error', (error)->
      deferred.reject(error)
    deferred.promise
  twitter: (options)->
    defer = Q.defer()
    twitter[options.method] options.action, options.data, (err,result)->
      if err then defer.reject(err)
      else defer.resolve(result)
    defer.promise

  storage: (options)->
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
        else s3Defer.resolve(data)
    s3Defer.promise


