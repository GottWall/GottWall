// Main index file

require.config({
  waitSeconds: 15,
  "baseUrl": "/static/js/",
  "paths": {
    "jquery": 'jquery-',
    "underscore": 'underscore',
  },
  "shim": {
    "jquery": {
      "exports": '$'
    },
    'jquery.bootstrap': {
      deps: ['jquery'],
      exports: 'jquery'
    }
  }
});


require(["jquery"],
	function($) {
	  console.log("Hello world");
	});