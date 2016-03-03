var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {
    if (req.method != 'GET')
        return res.end('send me a GET\n');
        
    var path = url.parse(req.url,true).pathname;
    console.log(path);
    
    var jsonString = {
        unix: null,
        natural: null
    };
    

    if (path.indexOf('%20') == -1) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        jsonString.unix = "bla";
        jsonString.natural = "bla";
        res.end(JSON.stringify(jsonString));
    }
    else {
        console.log("Entrei no else");
        res.writeHead(200, { 'Content-Type': 'application/json' });
        jsonString.unix = "ble";
        jsonString.natural = "ble";
        res.end(JSON.stringify(jsonString));
    }

});

server.listen(8080);
console.log("App listening on port 8080!")