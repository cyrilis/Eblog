// Generated by CoffeeScript 1.7.1
(function() {
  var AWS, Q, Robot, RobotEvent, S3, Twit, client, github, mailer, nodemailer, request, rssParser, schedule, setting, twitter;

  setting = require('../../settings');

  require('colors');

  RobotEvent = require('../../models/database').Robot;

  nodemailer = require("nodemailer");

  mailer = nodemailer.createTransport('SMTP', {
    service: 'Mailgun',
    auth: {
      user: setting.mailgun.user,
      pass: setting.mailgun.pass
    }
  });

  Q = require("q");

  schedule = require('node-schedule');

  request = require('superagent');

  Twit = require('twit');

  twitter = new Twit({
    consumer_key: setting.twitter.consumerKey,
    consumer_secret: setting.twitter.consumerSecret,
    access_token: setting.twitter.accessToken,
    access_token_secret: setting.twitter.accessTokenSecret
  });

  github = require('octonode');

  client = github.client(setting.github);

  rssParser = require("rssparser");

  AWS = require('aws-sdk');

  AWS.config.loadFromPath('./config.json');

  AWS.config.apiVersion = {
    s3: '2006-03-01'
  };

  S3 = new AWS.S3();

  Robot = (function() {
    function Robot(config) {
      var jobs, result;
      this.name = config.name || "Robot A";
      this.gender = config.gender || "Boy";
      this.birthday = new Date();
      this.age = config.gender || new Date() - this.birthday;
      this.bio = "Robot Can Sleep, too.";
      this.jobs = [];
      console.log("System initializing.......");
      console.log("New Robot Generated with name: " + this.name);
      console.log("" + this.name + " is starting......");
      console.log("Please Wait....");
      console.log("Checking for healthy......");
      result = this.checkHealth();
      if (result.error) {
        console.log("" + result.error);
        return false;
      }
      console.log("Health Check pass.".green);
      console.log("Robot " + this.name + " is online now.");
      jobs = this.checkJobs();
      if (jobs.length) {
        console.log("We got last jobs. ");
      }
    }

    Robot.prototype.mail = function(options) {
      var mailDiffer;
      console.log(options);
      console.log(this);
      options.subject = ("[" + this.name + "]") + options.subject;
      mailDiffer = Q.nfcall(mailer.sendMail, options);
      mailDiffer.then(function() {
        return console.log(arguments);
      }, function() {
        return console.log(arguments);
      });
      return mailDiffer;
    };

    Robot.prototype.checkHealth = function() {
      return {};
    };

    Robot.prototype.checkJobs = function() {
      return this.jobs;
    };

    Robot.prototype.handler = function(err) {
      var failEvent;
      console.log(new Error(err));
      failEvent = new RobotEvent({
        time: new Date(),
        type: "Error",
        status: "Failed",
        content: {
          err: err
        }
      });
      return failEvent.save();
    };

    Robot.prototype.jobs = function(option) {
      var loopJob, loopTime;
      if (option.loop) {
        loopTime = new schedule.RecurrenceRule();
        loopTime.hour = option.hour;
        loopJob = schedule.scheduleJob(loopTime, option.job);
        this.jobs.push({
          job: loopJob,
          loop: loopTime
        });
        return console.log('Added To LoopJobs');
      }
    };

    Robot.prototype.web = function(options) {
      var def, deferred, method;
      console.log('[Fetching Web]'.green.inverse, options.url);
      def = null;
      method = options.method.toLowerCase();
      if (method === 'get' || method === 'put' || method === 'del' || method === 'post' || method === 'head') {
        def = request[method](options.url);
      }
      if (options.data) {
        def = def.send(data);
      }
      if (options.header) {
        def = def.set(options.header);
      }
      deferred = Q.defer();
      def.end(function(res) {
        if (res.error) {
          return deferred.reject(res);
        } else {
          deferred.resolve(res);
          return new RobotEvent({
            time: new Date(),
            type: "web",
            status: "Success",
            content: {
              res: res
            }
          }).save();
        }
      });
      def.on('error', function(error) {
        return deferred.reject(error);
      });
      return deferred.promise;
    };

    Robot.prototype.twitter = function(options) {
      var defer;
      console.log('[Twitter]'.green.inverse, options.action, options.method);
      defer = Q.defer();
      twitter[options.method](options.action, options.data, function(err, result) {
        if (err) {
          return defer.reject(err);
        } else {
          defer.resolve(result);
          return new RobotEvent({
            time: new Date(),
            type: "twitter",
            status: "Success",
            content: {
              result: result
            }
          }).save();
        }
      });
      return defer.promise;
    };

    Robot.prototype.storage = function(options) {
      var option, s3Defer;
      console.log('[Storage]'.green.inverse, options.path, options.name);
      option = {
        Bucket: setting.S3Bucket,
        key: option.name || path.resolve(options.path).split('/').pop(),
        ACL: options["private"] && options["private"] !== 'public' ? "private" : "public-read"
      };
      s3Defer = Q.defer();
      fs.readFile(options.path, (function(_this) {
        return function(err, file) {
          if (err(_this.handler(err))) {

          } else {
            (function(file) {});
          }
          option.Body = file;
          return S3.putObject(option, function(err, data) {
            if (err) {
              return s3Defer.reject(err);
            } else {
              s3Defer.resolve(data);
              return new RobotEvent({
                time: new Date(),
                type: "Storage",
                status: "Success",
                content: {
                  data: data
                }
              }).save();
            }
          });
        };
      })(this));
      return s3Defer.promise;
    };

    Robot.prototype.rss = function(options) {
      var rssDefer;
      console.log('[RSS]'.green.inverse, options.url);
      rssDefer = Q.defer();
      parser.parseURL(options.url, options, function(err, result) {
        if (err) {
          return rssDefer.reject(err);
        } else {
          rssDefer.resolve(result);
          return new RobotEvent({
            time: new Date(),
            type: "RSS",
            status: "Success",
            content: {
              result: result
            }
          }).save();
        }
      });
      return rssDefer.promise;
    };

    Robot.prototype.github = client;

    return Robot;

  })();

}).call(this);

//# sourceMappingURL=index.map
