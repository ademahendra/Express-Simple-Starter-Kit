var express = require('express'),
    app = express(),
    port = process.env.APP_PORT || 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./src/routes/');
app.use(routes)
app.listen(port);

console.log('Learning RESTful API server started on: ' + port);