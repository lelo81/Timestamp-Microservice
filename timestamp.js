var http = require('http');
var url = require('url');
require('datejs');

var server = http.createServer(function (req, res) {
    if (req.method != 'GET')
        return res.end('send me a GET\n');
        
    var path = url.parse(req.url,true).pathname;
    path = path.substr(1,path.length);

    var jsonString = {
        unix: null,
        natural: null
    };
    

    if (path.indexOf('%20') != -1) {
        var strDate = path.replace(/%20/g,' ');
        var date = Date.parse(strDate);
        console.log(date);
        
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

server.listen(process.env.PORT);
console.log("App listening on IP:" + process.env.IP + " and PORT:" + process.env.PORT);