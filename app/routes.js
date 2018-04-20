//app/routes.js
var HaikuModel = require('./models/haiku');
var syllable = require('syllable');  //for counting syllables

module.exports = function(app) {

    app.get('/api/v1/haikus', function(req, res) {
        HaikuModel.find(function(err, response) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                
                var haikus = [];
                response.forEach(function(h) {
                    var haiku = h._doc;
                    haiku.syllableCount = syllable(h.FirstLine) + syllable(h.SecondLine) + syllable(h.ThirdLine); 
                    haikus.push(haiku);
                });
                res.json(response);
            }
        });
    });

    app.get('/api/v1/haiku/:title', function(req, res) {
        var title = req.params.title;
        HaikuModel.find({ Title: title }, function(err, response) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.json(response);
            }
        });
    });

    app.get('/api/v1/random_haiku', function(req, res) {
        HaikuModel.count().exec(function (err, count) {
            var random = Math.floor(Math.random() * count) + 1;
            HaikuModel.findOne().skip(random).exec(function (err, response) {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    res.json(response);
                }
              });
          });
    });

    app.post('/api/v1/haiku', function(req, res) {
        var data = req.body;
        data.CreatedDate = new Date();
        HaikuModel.create(data, function(err, response) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.json(response);
            }
        });
    });

    app.put('/api/v1/haiku', function(req, res) {
        var data = req.body;
        data.UpdatedDate = new Date();
        HaikuModel.update(data, function(err, response) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.json(response);
            }
        });
    });

    app.delete('/api/v1/haiku/:title', function(req, res) {
        var title = req.params.title;
        HaikuModel.deleteOne({ Title: title }, function(err, response) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.json(response);
            }
        });
    });

    app.get('/', function(req, res) {
        res.sendfile('./views/index.html');
    });
};