var SlidesCollection = Backbone.Collection.extend({

	model:Slide,

	deleteSlide: function (slide) {
		console.log(_.functions(this.model));
		this.remove(slide);
		console.log("In slides collection: function deleteSlide");
		slide.destroy({success: function(model, response){
			console.log(model, response, "<-- this was the response, and this code ran");
			}
		});
		console.log(slide.cid);

	},

	moveSlide:function(slide, newIndex) {
		console.log("moving", slide, newIndex);
		this.remove(slide);
		this.add(slide, {at:newIndex});
	},

	moveUp: function(model) { 
  		var index = this.indexOf(model);
  		if (index > 0) {
    		this.remove(model);
    		this.add(model, {at: index-1});
  		}
	},

	moveDown: function(model) {
		var index = this.indexOf(model);
		if (index < this.models.length) {
			this.remove(model);
			this.add(model, {at: index+1});
		}
	}
});