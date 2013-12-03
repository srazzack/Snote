var SlideShowView = Backbone.View.extend({
 
  el: '#slideshow',

  initialize: function() {
        if(this.$el.requestFullScreen) {
            this.$el.requestFullScreen();
        } 
        else if(this.$el.mozRequestFullScreen) {
            console.log(moz);
            this.$el.mozRequestFullScreen();
        } 
        else if(this.$el.webkitRequestFullScreen) {
            console.log("webkit");
            this.$el.webkitRequestFullScreen();
        }
        else{
          console.log("something is wrong with use of the Fullscreen API");
        }
  }, 

  events: {
  },
 
  slideTemplate: _.template(),
 
  controlTemplate: _.template(
  ),
 

 
  render: function() {
  },
 
  transition: function() {
  },
 
 
  play: function() {
  },
 
  pause: function() {
  }

});