var ActiveSlideView = Backbone.View.extend({
    el: "#slideContainer",
    template: _.template( $("#slideTemplate").html() ),


    render: function () {
        var that = this;
        this.$el.find("#activeSlide").html(this.template(this.model.toJSON()));

        this.$el.find("#slideTitle").inline({
            callback: function (text) {
                that.model.set({title:text});
                that.model.save();
            }
        });

        this.$el.find("#slideHeader").inline({
            callback: function (text) {
                that.model.set({header:text});
                that.model.save();
            }
        });

        this.$el.find("#slideContent").inline({
            callback: function (text) {
                that.model.set({content:text});
                that.model.save();
            }
        });
        return this;    
    },

    events: {
        "click #saveSlide": "saveSlide",
        "dblclick #activeSlide": "startSlideShow"

    },

    saveSlide: function(e) {
        console.log(this.model.save());
        this.model.save();
    },

    startSlideShow: function() {
        var slideShow = new SlideShowView({collection: sc});
        slideShow.render();
    },

    slideStyling: function() {
        $("#fs").change(function() {

        $('.changeMe').css("font-family", $(this).val());

        });

        $("#size").change(function() {
        $('.changeMe').css("font-size", $(this).val() + "px");
        });
    }

});
