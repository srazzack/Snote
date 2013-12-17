var SlidesCollection = Backbone.Collection.extend({

	model:Slide,

	urlRoot: '/slide',

	deleteSlide: function (slide) {
		console.log(_.functions(this.model));
		this.remove(slide);
		console.log("In slides collection: function deleteSlide");
		slide.destroy({success: function(model, response){
			console.log(model, response);
			}
		});
	},

	saveSlide: function (slide) {
		slide.save();
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