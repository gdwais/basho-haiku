//app/models/haiku.js
var mongoose = require('mongoose');
var haikuSchema = new mongoose.Schema({
    Title: String,
    FirstLine: String,
    SecondLine: String,
    ThirdLine: String,
    Author: String,
    DateUpdated: Date,
    DateCreated: Date
});

module.exports = mongoose.model('Haiku', haikuSchema);