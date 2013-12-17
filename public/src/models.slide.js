var Slide = Backbone.Model.extend({

	urlRoot: '/slide',
	defaults: {
		id: _.uniqueId(),
		title: "",
		header: "Slide Header",
		content: "Paragraph"
	},

	initalize: function(){

		this.validate();
		//this.id = _.uniqueId();
		console.log(this.id);
		
		this.on("change:title", function(model){
			console.log('title changed to: ' + model.get("title"));
		});
		this.on("change:header", function(model){
			console.log("A header has been added, updated or deleted");
		});
		this.on("destroy", function(){
			console.log("in the slide model");
			console.log("destroying", arguments);
		}); 
	},
	validate: function (){
		if(this.get("title").length < 3) {
        	throw new Error("slide must have a title");
        }
	},

	setTitle: function (title) {
		this.set("title", title);
	},

	setHeader: function (header) {
		this.set("header", header);
	},

	addContent: function (content) {
		this.set("content", content);
	}
});