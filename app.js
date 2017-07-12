//Starting point of the Node API

var express = require('express');
var app = express();
var apiController = require('./controllers/apiController');
var port = process.env.PORT || 3000;
apiController(app);
app.listen(port);
