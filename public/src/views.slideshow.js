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
      console.log(this.collection.at(this.currentSlide));
      this.$el.find("#slideShow").html(this.templates["slideShow"](this.collection.at(this.currentSlide)));

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
          console.log("something is wrong with use of the Fullscreen API");
      }
  },

  events: {
      "#prevSlide":"showPrevious",
      "#nextSlide":"showNext",
      "#playSlideShow":"play"
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