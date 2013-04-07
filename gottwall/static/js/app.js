// Main index file


require.config({
  waitSeconds: 15,
  "baseUrl": static_path,
  "paths": {
    "app": "./app",
    "jquery": 'js/jquery',
    "domReady": 'js/domReady',
    "underscore": 'js/underscore-min',
    "swig": 'js/swig.pack.min',
    "bootstrap": "vendor/bootstrap/js/bootstrap",
    "d3": "js/d3.v2",
    "rickshaw": "vendor/rickshaw",
    "bootstrap-datepicker": "js/bootstrap-datepicker",
    //"bootstrap-datepicker.ru": "js/locales/bootstrap-datepicker.ru",
    "jquery.tablesorter": "js/jquery.tablesorter",
    "jquery.tablesorter.widgets": "js/jquery.tablesorter.widgets",
    "select2": "vendor/select2/select2.min"
  },
  "shim": {
    "jquery": {
      "exports": '$'
    },
    "underscore":{
      "exports": '_'
    },
    'bootstrap': ['jquery'],
    "d3": {
      "exports": 'd3'
    },
    "jquery.bootstrap": {
      "deps": ['jquery'],
      "exports": 'jquery'
    },
    "swig": {
      "deps": ['underscore'],
      "exports": 'swig'
    },
    "select2": {
      "exports" : 'jquery',
      "exports": "jquery"
     },
    "rickshaw": {
      "deps": ["d3"],
      "exports": "Rickshaw"
    },
    "bootstrap-datepicker": {
      "deps": ["jquery"],
      "exports": "jQuery.fn.datepicker"
    },
    // "bootstrap-datepicker.ru": {
    //   "deps": ["jquery", "bootstrap-datepicker", "bootstrap"],
    //   "exports": "jQuery.fn.datepicker.defaults"
    // },
    "jquery.tablesorter": {
      "deps": ["jquery"],
      "exports": "jQuery.tablesorter"
    },
    "jquery.tablesorter.widgets": {
      "deps": ["jquery", "jquery.tablesorter"],
      "exports": "jQuery.tablesorter.widgets"
    }
  },

});

require(["jquery", "js/gottwall",  "bootstrap", "js/inits/tablesorter", "js/inits/datepicker", "domReady"], function($, GottWall) {
  (function($) {
    $.log = function (obj, params) {
      if ((typeof(console) != 'undefined') && (typeof(console.log) == 'function')) {
	console.log(obj, (params)?params:'');
      };
      return this;
    };
       $.fn.debug = function () {
      return this.each(function(){
	$.log(this);
      });
    };
  })(jQuery);


  console.log("Application entry point");


  var self = this;
  $(function() {
    var global_metrics = {};
    var activate_metrics = {};
    var chart = null;

    console.log();

    self.gottwall = new GottWall(true, prefix);
  });
});