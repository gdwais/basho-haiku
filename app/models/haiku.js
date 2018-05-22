//app/models/haiku.js

var mongoose = require('mongoose');

var haikuSchema = new mongoose.Schema({

    Title: String,
    FirstLine: String,
    SecondLine: String,
    ThirdLine: String,
    Author: String,
    Updated: { type: Date, default: Date.now },
    Created: { type: Date, default: Date.now }

});

var Haiku = mongoose.model('Haiku', haikuSchema);

module.exports = mongoose.model('Haiku', haikuSchema);