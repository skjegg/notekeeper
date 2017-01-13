'use strict';

process.env.DEBUG = 'actions-on-google:*';

let ActionsSdkAssistant = require('actions-on-google').ActionsSdkAssistant;
let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
let path = require('path');
let expressWinston = require('express-winston');
let winston = require('winston');
let mongoose = require('mongoose');
let models = require('./models')(mongoose)



let defaultConfig = {
  connection_string: 'mongodb://localhost/familychores',
  cwd: path.dirname(require.main.filename),
  routes: {
    directory: '/routes/'
  },
  models: {
    directory: '/models/'
  },
  app: {
    port: 8080,
    name: 'family-chores',
    logging: { // TODO: Implement a logger
      name: 'logger',
      level: 'info'
    }
  }
};
// implement a config file later, and do the merge here. 
let config = defaultConfig;

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ json: false, colorize: true })
  ],
  meta: true
})

// Set up Express
let app = express();
app.set('port', (process.env.PORT || config.app.port));
app.use(bodyParser.json({ type: 'application/json' }));

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({ json: true, colorize: true })
  ],
  meta: true
}));

mongoose.connect(config.connection_string);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  logger.info('mongo is ready');
/*  let modelPath = config.cwd + config.models.directory;
  fs.readdirSync(modelPath).forEach(function (file) {

    let model = modelPath + file;

    if (path.extname(model) === '.js') {
      logger.info('loading model:' + model);
      models.push({file: require(model)(app, config, logger, mongoose)});
    }
  });
  logger.info('models' +JSON.stringify(models));
*/
});



// Load Routes
let routePath = config.cwd + config.routes.directory;
fs.readdirSync(routePath).forEach(function (file) {

  let route = routePath + file;

  if (path.extname(route) === '.js') {
    logger.info('loading route:' + route);
    require(route)(app, config, logger, models);
  }
});
/*

app.post('/', function (request, response) {
  console.log('handle post');
  const assistant = new ActionsSdkAssistant({ request: request, response: response });

  function mainIntent(assistant) {
    console.log('mainIntent');
    let inputPrompt = assistant.buildInputPrompt(true, '<speak>Hi! <break time="1"/> ' +
      'I can read out an ordinal like ' +
      '<say-as interpret-as="ordinal">123</say-as>. Say a number.</speak>',
      ['I didn\'t hear a number', 'If you\'re still there, what\'s the number?', 'What is the number?']);
    assistant.ask(inputPrompt);
  }

  function rawInput(assistant) {
    console.log('rawInput');
    if (assistant.getRawInput() === 'bye') {
      assistant.tell('Goodbye!');
    } else {
      let inputPrompt = assistant.buildInputPrompt(true, '<speak>You said, <say-as interpret-as="ordinal">' +
        assistant.getRawInput() + '</say-as></speak>',
        ['I didn\'t hear a number', 'If you\'re still there, what\'s the number?', 'What is the number?']);
      assistant.ask(inputPrompt);
    }
  }

  let actionMap = new Map();
  actionMap.set(assistant.StandardIntents.MAIN, mainIntent);
  actionMap.set(assistant.StandardIntents.TEXT, rawInput);

  assistant.handleRequest(actionMap);
});
*/
// Basic error handling
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({
    message: err.message,
    details: err.errors
  });
});
// Start the server
let server = app.listen(app.get('port'), function () {
  logger.info('App listening on port %s', server.address().port);
  logger.info('Press Ctrl+C to quit.');
});
// [END app]
