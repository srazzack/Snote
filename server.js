var http = require('http'), fs  = require('fs'), 
     sys = require('sys'), path = require('path'), 
     mime = require('mime'),_ = require('underscore'),
     cache = {}, cacheLimit = '', cacheConfig = {size: 15}; 

var users = [{ id:24, name:'omar', address:''}, { id:424, name:'shafi', address:''}, { id:300, name:'iman', address:''}];
var slides = [{title: "Learning D3.js", header: "What are Data Driven Documents?", content: "D3.js (or just D3 for Data-Driven Documents) is a JavaScript library that uses digital data to drive the creation and control of dynamic and interactive graphical forms which run in web browsers. It is a tool for data visualization in W3C-compliant computing, making use of the widely implemented Scalable Vector Graphics (SVG), JavaScript, HTML5, and Cascading Style Sheets (CSS3) standards. " },
              {title: "A simple alternative: Raphael.js", header: "Simplicity at its best", content: "Raphaël is a small JavaScript library that should simplify your work with vector graphics on the web. If you want to create your own specific chart or image crop and rotate widget, for example, you can achieve it simply and easily with this library." },
              {title: "What about MVC frameworks such as Backbone.js", header: "Why should one use an MVC for web applications?", content: "Backbone.js gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface." },
              {title: "Google's framework: Angular.js", header: "Why Angular.js", content: "HTML is great for declaring static documents, but it falters when we try to use it for declaring dynamic views in web-applications. AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop." }, 
              {title: "Twitter Bootstrap", header: "Why use Bootstrap?", content: "At its core, Bootstrap is just CSS, but it's built with Less, a flexible pre-processor that offers much more power and flexibility than regular CSS. With Less, we gain a range of features like nested declarations, variables, mixins, operations, and color functions. " }];

function setCacheLimit(){
  cacheLimit = cacheConfig.size;
  return cacheLimit;
}

function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

function sendFile(response, filePath, fileContents) {
  response.writeHead(
    200, 
    {"content-type": mime.lookup(path.basename(filePath))}
  );
  response.end(fileContents);
}

function sendUser(response, user) {
  response.writeHead(
    200, 
    {'Content-Type': 'application/json'}
  );
  response.write(JSON.stringify(user));
  response.end();
}

function serveStatic(response, cache, absPath) {
  console.log(_.keys(cache).length);
  var file = absPath;

  fs.watchFile(file, function(curr, prev) {
    if (curr.mtime.getTime() > prev.mtime.getTime() && cache[file]) {
      sys.puts("The following file was modified: ", file);
      delete cache[absPath];
    } 
  });

  if (cache[absPath]) {
    sendFile(response, absPath, cache[absPath]);
  } 
  else {
    fs.exists(absPath, function(exists) {
      if (exists) {
        fs.readFile(absPath, function(err, data) {
          if (err) {
            send404(response);
          } 
          else if(_.keys(cache).length < setCacheLimit()){
            cache[absPath] = data;
            sendFile(response, absPath, data);
          }
          else {
            sendFile(response, absPath, data);
          }
        });
      } 
      else {
        send404(response);
      }
    });
  }
}

var server = http.createServer(function(request, response) {
  console.log("this request: ", request.url);
  var absPath = false, usersPattern = /^\/user\/?$/, 
      userPattern = /^\/user\/[0-9]\/?/, 
      slidePattern = /^\/slide\/?$/,
      imagePattern = /\.jpg$/;

  if (request.url == '/') {
    absPath = './public/index.html';
    serveStatic(response, cache, absPath);
  }
  else if (slidePattern.test(request.url)){
    console.log(slides);
    sendUser(response, slides);
  }
  else if (usersPattern.test(request.url)){
    console.log(users);
    sendUser(response, users);
  }
  else if (userPattern.test(request.url)){
        var userId = request.url.match(/(\d+)/)[0];
        console.log(userId);
        var user = _.findWhere(users, {id:parseInt(userId)});
        console.log(user);
      if(user){
        sendUser(response, user);
      }
      else {
        send404(response);
      }
  }
  else {
    absPath = './public' + request.url;
    serveStatic(response, cache, absPath);
  }
});

server.listen(3000, function() {
  console.log("Server listening on port 3000.");
});