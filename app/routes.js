//app/routes.js
var HaikuModel = require('./models/haiku');

module.exports = function(app) {

    app.get('/api/haikus', function(req, res) {
        HaikuModel.find(function(err, response) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.json(response);
            }
        });
    });

    app.get('/api/haiku/:title', function(req, res) {
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

    app.get('/api/haiku/random', function(req, res) {
        HaikuModel.count().exec(function (err, count) {
            var random = Math.floor(Math.random() * count);
            HaikuModel.findOne().skip(random).exec(
              function (err, result) {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    res.json(response);
                }
              });
          });
    });
    app.post('/api/haiku', function(req, res) {
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

    app.put('/api/haiku', function(req, res) {
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

    app.delete('/api/haiku/:title', function(req, res) {
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

    app.get('/whatisthis', function(req, res) {
        res.sendfile('./views/index.html');
    });
};