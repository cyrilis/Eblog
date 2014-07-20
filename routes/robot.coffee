Robot = require '../controller/robot'
setting = require "../settings"
path = require 'path'
Diary = require('../models/database.js').Diary
Q = require 'q'
moment = require('moment')
moment.lang('zh-cn')
ejs = require 'ejs'
mailTemplate = path.resolve __dirname, "../views/templates/mail.html"
robot = new Robot
  name: "Wall-E"

start = ->
  ###
  Daily Mail
  ###
  dailyMail = ()->
    dailyMailDefer = Q.defer()

    diaryDefer = Q.defer()

    sendEmail = (content)->
      ejs.renderFile mailTemplate, content, (err, data)->
        if err
          dailyMailDefer.reject(err)
          return false
        console.log("Sending Daily Mail.....")
        robot.mail(
          from: setting.mailfrom
          to: setting.mailto
          subject: "[Daily Mail] How is your day going? [#{moment().format('ll')}]"
          html: data
        ).then (data)->
          console.log "Daily Mail Sent."
          dailyMailDefer.resolve(data)
        , (error)->
          dailyMailDefer.reject(error)

      dailyMailDefer.promise

    Diary.random (err, result)->
      if err
        diaryDefer.reject(err)
        return false
      result = result || {content: "There is nothing here."}
      result.now = moment(new Date()).format('ll')
      result.time = if result.time then ("#{moment(new Date(result.time)).fromNow()}  [#{moment(new Date(result.time)).format("LLLL")}]") else "[No Memory]"
      sendEmail(result).then (data)->
        diaryDefer.resolve(data)
      , (err)->
        diaryDefer.reject(err)

    diaryDefer.promise

  # add schedule
  console.log "Adding to Schedule......"
  newJob = robot.schedule(
    job: dailyMail
    hour: 0
    minute: 0
  )
  newJob.runOnDate(new Date())

exports.start = start