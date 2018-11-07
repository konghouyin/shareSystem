// JavaScript source code
var fs = require('fs');
var express = require('express');
var static = require('express-static');

var server = express();

server.use("*/pic", function (req, res, next) {
    var name = req._parsedUrl.pathname.split("/pic");
    fs.readFile("./src/pic" + name[1], function (err, data) {
        if (err) {
            console.log(err);
            res.write("404");
        } else {
            res.write(data);
        }
        res.end();
    });
});

server.use("*/src", function (req, res, next) {
    var name = req._parsedUrl.pathname.split("/src");
    fs.readFile("./src"+name[1], function (err, data) {
        if (err) {
            console.log(err);
            res.write("404");
        } else {
            res.write(data);
        }
        res.end();
    });
});



server.use("*", function (req, res, next) {
    var letter = req.headers["user-agent"];
    var last2 = /Macintosh/g
    var last = /Windows/g;
    var last3 =/Linux x86_64/g;
    console.log(req.headers);

    if (letter.match(last) != null || letter.match(last2) != null|| letter.match(last3) != null) {
        fs.readFile("./PC.html", function (err, data) {
            if (err) {
                console.log(err);
                res.write("404");
            } else {
                res.setHeader("Content-type", "text/html");
                res.write(data);
            }
            res.end();
        });
    } else {
        next();
    }
})

server.use("*", function (req, res, next) {
    console.log(req._parsedUrl.pathname);
    if (req._parsedUrl.pathname != "/mobile.html/" && req._parsedUrl.pathname != "/help.html/" && req._parsedUrl.pathname != "/mobile.html" && req._parsedUrl.pathname != "/help.html" && req._parsedUrl.pathname != "/message.html" && req._parsedUrl.pathname != "/message.html/") {
        fs.readFile("./404.html", function (err, data) {
            if (err) {
                console.log(err);
                res.write("404");
            } else {
                res.setHeader("Content-type", "text/html");
                res.write(data);
            }
            res.end();
        });
    } else {
        next();
    }
})


server.use("*", function (req, res, next) {
    fs.readFile("." + req._parsedUrl.pathname, function (err, data) {
        if (err) {
            console.log(err);
            res.write("404");
        } else {
            res.setHeader("Content-type", "text/html");
            res.write(data);
        }
        res.end();
    });

})




server.listen(8080);