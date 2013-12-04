var SlideShowView = Backbone.View.extend({
  el: "#app",
  currentSlide: 0,
  templates: {
      slideShow: _.template($("#slideShowTemplate").html())
  },

  initialize: function() {
      console.log("here we are in the slideshowview");
  }, 

  render: function() {
      var model = this.collection.at(this.currentSlide);
      console.log(model.get("title"));
      this.$el.find("#slideShow").html(this.templates["slideShow"](model));

      console.log(this.$el.find("#slideShow").webkitRequestFullScreen);
      if(this.$el.find("#slideShow").requestFullScreen) {
          this.$el.find("#slideShow").requestFullScreen();
      } 
      else if(this.$el.find("#slideShow").mozRequestFullScreen) {
          console.log(moz);
          this.$el.find("#slideShow").mozRequestFullScreen();
      } 
      else if(this.$el.find("#slideShow").webkitRequestFullScreen) {
          console.log("webkit");
          this.$el.find("#slideShow").webkitRequestFullScreen();
      }
      else{
          console.log("something is wrong with your use of the Fullscreen API, astaghfirullah");
      }
  },

  events: {
      "click #prevSlide":"showPrevious",
      "click #nextSlide":"showNext",
      "click #playSlideShow":"play"
  },

  getSlide: function(e){
      return this.collection.get($(e.currentTarget).attr("data-id"));
  },

  showPrevious: function(e){

  },
  
  showNext: function(e){

  },
 
  play: function(e) {
  },
 
  pause: function(e) {
  }

});