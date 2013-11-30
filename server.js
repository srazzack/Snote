var http = require('http'), fs  = require('fs'), 
     sys = require('sys'), path = require('path'), 
     mime = require('mime'),_ = require('underscore'),
     cache = {}, cacheLimit = '', cacheConfig = { size: 10 }; 

var users = [{ id:24, name:'omar', address:''}, { id:424, name:'shafi', address:''}, { id:300, name:'iman', address:''}];
var slides = [{title: "this is the first slide", header: "this is the first header", content: "this is finally the content" },
              {title: "this is the second slide", header: "this is the second header", content: "this is second the content" },
              {title: "this is the third slide", header: "this is the third header", content: "this is third the content" },
              {title: "this is the fourth slide", header: "this is the fourth header", content: "this fourth the content" }, 
              {title: "this is the fourth slide", header: "this is the fourth header", content: "this fifth content" }];

function setCacheLimit(cacheConfig){
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
  var files = _.values(cache);

  fs.watchFile(file, function(curr, prev) {
    fs.stat(file, function(err, stats) {
      if (curr.mtime.getTime() > prev.mtime.getTime() && cache[file]) {
        sys.puts("The following file was modified: ", file);
        delete cache[absPath];
        } 
      });
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
          else if(_.keys(cache).length < cacheLimit){
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
      slidePattern = /^\/slide\/?$/;

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



