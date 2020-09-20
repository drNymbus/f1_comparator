var http = require('http');
var fs = require('fs');
var url = require('url');

function sendError(response) {
    response.writeHead(404, {'Content-Type' : 'text/html'});
    return response.end("404 Not Found");
}

http.createServer(function (req, res) {
    console.log(req.url);

    if(req.url === "/"){ // index page | home page
        // console.log("INDEX HTML FILE");

        fs.readFile("public/html/index.html", "UTF-8", function(err, html){
            if (err) sendError(res);

            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
        });

    } else if(req.url.match("\.css$")) { // handle css request
        // console.log("CSS FILE : " + req.url);

        var cssPath = __dirname + '/public' + req.url;
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);

    } else if(req.url.match("\.ttf$")) {
        var ttfPath = __dirname + '/public' + req.url;
        var fileStream = fs.createReadStream(ttfPath);
        res.writeHead(200, { "Content-Type": "text/css" });
        fileStream.pipe(res);

    } else if(req.url.match("\.js$")) { // handle js request
        // console.log("JS FILE : " + req.url);

        var cssPath = __dirname + '/public/js' + req.url;
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);

    } else if(req.url.match("\.json$")) { // handle js request
        // console.log("JS FILE : " + req.url);

        var jsonPath = __dirname + '/public/assets' + req.url;
        var fileStream = fs.createReadStream(jsonPath, function (err, data) {
            if (err) sendError(res);

            var jsonData = JSON.parse(data);
            res.writeHead(200);
            res.write(JSON.stringify(jsonData, null));
            res.end();
        });

        fileStream.pipe(res);

    } else { // Try to load html file, error 404 if not able to.
        var q = url.parse(req.url, true);
        var filename = "/public/html" + q.pathname + ".html";

        fs.readFile(__dirname + filename, function(err, data) {
            if (err) sendError(res);

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }

}).listen(8000);
