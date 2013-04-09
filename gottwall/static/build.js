({
  "name": "app",
  "baseUrl": "./",
  "optimize": "none",
  "out": "./js/app.build.js",
  "paths": {
    "app": "./js/app",
    "jquery": './js/jquery',
    "domReady": 'js/domReady',
    "underscore": 'js/underscore-min',
    "swig": 'js/swig.pack.min',
    "bootstrap": "vendor/bootstrap/js/bootstrap",
    "d3": "js/d3.v2",
    "rickshaw": "vendor/rickshaw",
    "bootstrap-datepicker": "js/bootstrap-datepicker",
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
     },
    "rickshaw": {
      "deps": ["d3"],
      "exports": "Rickshaw"
    },
    "bootstrap-datepicker": {
      "deps": ["jquery"],
      "exports": "jQuery.fn.datepicker"
    },
    "jquery.tablesorter": {
      "deps": ["jquery"],
      "exports": "jQuery.tablesorter"
    },
    "jquery.tablesorter.widgets": {
      "deps": ["jquery", "jquery.tablesorter"],
      "exports": "jQuery.tablesorter.widgets"
    }
  }
})