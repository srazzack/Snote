var restify = require("restify");
var application_root = __dirname,
    express = require("express"),
    path = require("path"),
var app = express.createServer();
var mongoose = require('mongoose'), 
	Schema = mongoose.Schema, 
	ObjectId = Schema.ObjectId;
//Wire up the database
mongoose.connect("mongodb://localhost/PowerNote_database");

// Config
app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  
  //setup the public directory to use static files
  app.use(express.static(path.join(application_root, "public")));

  //string concat is expensive: "app.use(express.static(__dirname + '/public'));" 
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

var Presentation = new Schema({
  _id : {type: Number},
  title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    style: {
        type: String,
        unique: true
    },
  slides : [Slide],
  modified: {
    type: Date,
    default: Date.now
  }
});

var Slide = new Schema({
  _id : {type: Number},
  title: {
        type: String,
        required: true
    },
    header: {
        type: String,
        required: false
    },
    content: {
        type: String
    },
    modified: {
    type: Date,
    default: Date.now
  }
});

var PresentationModel = mongoose.model("Presentation", Presentation);
var SlideModel = mongoose.model("Slide", Slide);

app.get("/presentation", function (req, res) {
  res.send("PowerNote API is running");
});

// Launch server

app.listen(4242);