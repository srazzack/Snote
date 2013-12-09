var express = require('express');
var path    = require('path');
var port 	= 3000;
var app  	= express();
var _    	= require('underscore');
var Slide	= require('slide');

app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    //define the root directory for static files
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.logger());
    app.use(express.errorHandler({
    	dumpExceptions: true,
    	showStack	  : true
    }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

app.get('/', function(request, response){ 
	response.redirect('/index.html');
});
app.get('/slide', function(request, response){
	response.send(Slide.get());
});


app.get('/slide/:title', function(request, response){
	console.log("this request: ", request.url);
    try {
            response.send(Slide.get(request.params.title));
    }
    catch(e) {
            response.status(404).send(e.toString());
    }
});

app.post('/slide', function(request, response){
    try {
            console.log(request.body);
            response.send(Slide.add({title:request.body.title, header:request.body.header, content:request.body.content }));
    }
    catch(e) {
            response.status(404).send(e.toString());
    }
});

app.delete('/slide/:id', function(request, response){
    try {
            Slide.delete(request.params.id);
            response.send(204);
    }
    catch(e) {
            response.status(404).send(e.toString());
    }
});

app.listen(port, function() {
	console.log("Express server listening on port: ", port);
});