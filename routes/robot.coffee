Robot = require '../controller/robot'
setting = require "../settings"
path = require 'path'
Diary = require('../models/database.js').Diary
Q = require 'q'
console.log Robot
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
          subject: "[Daily Mail] How is your day going?"
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
      result = result || {time: new Date(), content: "There is nothing here."}
      sendEmail(result).then (data)->
        diaryDefer.resolve(data)
      , (err)->
        diaryDefer.reject(err)

    diaryDefer.promise

  # add schedule
  console.log "Adding to Schedule......"
  newJob = robot.schedule(
    job: dailyMail
    minute: 1
  )
  newJob.runOnDate(new Date())

start()

exports.start = start