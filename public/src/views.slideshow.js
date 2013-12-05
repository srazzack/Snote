var SlideShowView = Backbone.View.extend({
  el: "#app",
  currentSlide: 0,
  templates: {
      slideShow: _.template($("#slideShowTemplate").html())
  },

  initialize: function() {
      console.log("here we are in the slideshowview");
      $(document).bind("keyup", _.bind(this.keypressHandler, this));
  }, 

  render: function() {
      var model = this.collection.at(this.currentSlide);
      console.log(model.get("title"));
      this.$el.find("#activeSlide").html(this.templates["slideShow"]({model:model}));
  },

  events: {
      "click #prevSlide":"showPrevious",
      "click #nextSlide":"showNext",
      "click #playSlideShow":"play"
  },

  keypressHandler: function(e) {
        console.log(e.keyCode);
        if(e.keyCode === 39) {
            console.log("The current slide is set to: ",this.currentSlide);
            this.showNext();
        }
        else if(e.keyCode === 37) {
            this.showPrevious();
            console.log("The current slide is set to: ",this.currentSlide);
        }
  },

  getSlide: function(){
      return this.collection.get($(e.currentTarget).attr("data-id"));
  },

  showPrevious: function(){
      if(this.currentSlide > 0 && this.currentSlide <= this.collection.length-1){
        //this.render();
        this.currentSlide--;
        this.render();
        console.log("The current slide is set to: ",this.currentSlide);
      }
  },
  
  showNext: function(){
      console.log('showNext', this);
      if(this.currentSlide < this.collection.length-1){
          //this.render();
          this.currentSlide++;
          this.render();
          console.log("The current slide is set to: ",this.currentSlide);
          
      }
      else if(this.currentSlide == this.collection.length-1){
          //this.render();
          //this.currentSlide = 0;
          //this.render();
          console.log("the currentSlide is set to: ", this.currentSlide);
          clearInterval(this.intervalId);
      }
  },
 
  play: function() {
      this.state = "play";
      console.log('play', this);
      var self = this;

      this.intervalId = setInterval(function() {
          console.log('inside callback', self);
          self.showNext();
      }, 1200);

  },

  pause: function() {
      this.state = "paused";
  }
});