// JavaScript source code


var express = require('express');
var static = require('express-static');

var server = express();

server.use(express.static('./www'));



server.listen(8080);