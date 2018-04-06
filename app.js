//basho-haiku app

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var mongoose = require('mongoose');

// configuration ==================================
var config = require('./config/default');
console.log('connecting to mongodb at ' + config.DB_URL);
mongoose.connect(config.DB_URL);

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/views'));

//routes ==========================================
require('./app/routes')(app);

//start app =======================================
app.listen(process.env.PORT || 5750);
console.log('basho-haiku api running on port ' + config.PORT);
exports = module.exports = app;