var express = require('express');
var serveStatic = require('serve-static');
var history = require('connect-history-api-fallback');

var app = express();
app.use(
	serveStatic(__dirname + "/dist"),
	history({index: '/'})
	);

var port = process.env.PORT || 5000;
app.listen(port);
