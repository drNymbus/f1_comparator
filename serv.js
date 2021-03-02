var http = require('http');
var fs = require('fs');
var url = require('url');

var port = 8000

function sendError(response) {
    response.writeHead(404, {'Content-Type' : 'text/html'});
    return response.end("404 Not Found");
}

function sendFile(path, response, type) {
    var fileStream = fs.readFile(path, function (err, data) {
        if (err) sendError(response);

        response.writeHead(200, {"Content-type": "text/" + type});
        response.write(data);
        response.end();
    });
    console.log(type + " FILE : " + path);
}

function sendFileStream(path, response, type) {
    var fileStream = fs.createReadStream(path, function (err, data) {
        if (err) sendError(response);
        response.writeHead(200, {"Content-type": "text/plain"});
    });

    fileStream.pipe(response);
}

function computeRequest(request) {
    console.log("COMPUTE : " + request);
}

http.createServer(function (req, res) {
    console.log('\n', req.url);

    if(req.url === "/"){ // index page | home page
        sendFile("public/html/index.html", res, "html")

    } else if(req.url.match("\.css$")) { // handle css request
        var cssPath = __dirname + '/public' + req.url;
        sendFile(cssPath, res, "css")

    } else if(req.url.match("\.js$")) { // handle js request
        var jsPath = __dirname + '/public/js' + req.url;
        sendFile(jsPath, res, "js");

    } else if(req.url.match("\.json$")) { // handle json request
        var jsonPath = __dirname + '/public/assets/json' + req.url;
        sendFile(jsonPath, res, "json");

    } else if(req.url.match("\.svg")) {
        var svgPath = __dirname + '/public/assets' + req.url;
        sendFile(svgPath, res, "svg");

    } else { // Try to load html file, error 404 if not able to.
        var q = url.parse(req.url, true);

        var r = q.pathname.split('/')
        if (r.length == 2) {
            var filename = __dirname + "/public/html" + q.pathname + ".html";
            sendFile(filename, res, "html");    

        } else if (r.length == 3) {
            console.log(q);
            filename = '/' + q.pathname.split('/')[1] // load html file first
            console.log("filename : " + filename);
            sendFile(filename, res, "html");    

            // compute the request sent (as a dictionary thanks to q)
            computeRequest(q);
        } else {
            sendError(res);
        }
    }

}).listen(port);
console.log("Listening on " + port + " . . . ")
