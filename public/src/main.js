// Filename: main.js
require.config({
  paths: {
    jquery: 'lib/jquery1.9.1',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    inline: 'lib/jquery.inline'
  }

});

require([

  // Loading the app module and passing it to the definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});