var npmPath = require('path');
var express = require('express');
var app = express();
var url = require('url');
require('datejs');
    var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/clementine_150.png'));

app.get('/', function(req, res) {   
    res.sendFile(npmPath.join(__dirname, '/index.html'));
});

app.get('/:param1', function(req, res) {    
    if (req.method != 'GET')
        return res.end('send me a GET\n');
        
    var path = req.params.param1;

    var jsonString = {
        unix: null,
        natural: null
    };


    if (path.indexOf(' ') != -1) {

        var date = Date.parse(path);

        if (date != null) {
            jsonString.unix = date.getTime()/1000;
            jsonString.natural = date.toString("MMMM") + " " + date.getDate() + ", " + date.getFullYear();
        }

    }
    else if (path != '') {
        var unixTime = +path*1000;

        var date = new Date();
        date.setTime(unixTime);

        if (date != 'Invalid Date') {
            jsonString.unix = +path;
            jsonString.natural = date.toString("MMMM") + " " + date.getDate() + ", " + date.getFullYear();
        }
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(jsonString));
        
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

