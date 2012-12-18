/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  this.Class = function(){};

  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
})();

(function($) {
  $.log = function (obj, params) {
    if ((typeof(console) != 'undefined') && (typeof(console.log) == 'function'))
    {
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


var Storage = Class.extend({
  metrics_template: '{% for x in items %}<li><a href="#metric/{{ x }}" data-name="{{ x }}">{{ x }}</a></li>{% endfor %}',
  values_template: '{% for value in items %}<li><a href="#filters/{{ metric_name }}/{{ filter_name }}/{{ value }}" data-name="{{ value }}">{{ value }}</a></li>{% endfor %}',
  filters_template: '{% for f in items %}<li><a href="#filters/{{ metric_name }}/{{ f }}" data-name="{{ f }}">{{ f }}</a></li>{% endfor %}',

  init: function(debug){
    this.debug_flag = debug || false;
    this.metrics = {};
    this.current_project = "test_project";
    this.chart_container = $('#chart');
    this.filters_container = $('#filters-selector #filters-list');
    this.metrics_container = $('#metrics-selector #metrics-list');
    this.values_container = $('#values-selector #values-list');
  },

  add_metric: function(project, name, filter_name, filter_value){
    //Add metrics to global storage
    if(!_.has(this.metrics, project)){
      this.metrics[project] = {};
    };

    if(!_.has(this.metrics[project], name)){
      this.metrics[project][name] = {};
    }
  },
  delete_metric: function(project, name){
    // Remove metric from global storage
  },
  save: function(){},
  load: function(){},
  get_metrics: function(project){},
  get_activated_metrics: function(){
    // Get activated metrics for project
  },
  render_selectors: function(){
    // Render metrics selectors
    this.reload_metrics(this.current_project);
  },
  render_filters: function(metric_name, filters){
    // Render filters for metric_name
    var self = this;
    var filters_template = swig.compile(this.filters_template);
    this.debug(filters);
    this.filters_container.html(filters_template({metric_name: metric_name,
					 items: _.keys(filters)}));
    this.filters_container.find('li a').bind('click', function() {
      var filter = $(this);
      self.debug(filter);
      if(filter.parent().hasClass('active')){
	// Deactivate all
	filter.parent().parent().children().removeClass('active');
	self.values_container.children().remove();
      }
      else{
	// Activate filter
	filter.parent().parent().children().removeClass('active');
	filter.parent().toggleClass('active');
	self.debug("Render filters"+filter.data('name'));
	self.render_filter_values(metric_name, filter.data('name'), filters[filter.data('name')]);
      };
    })
  },
  render_filter_values: function(metric_name, filter_name, values){
    // Render values for filter_name
    var values_template = swig.compile(this.values_template);
    this.values_container.html(values_template({metric_name: metric_name,
				       filter_name: filter_name,
				       items: values}));
  },
  render_metrics: function(metrics){
    // Render metrics selector
    this.debug("Render selectors");
    var self = this;
    var items = swig.compile(this.metrics_template);
    this.metrics_container.html(items({"items": _.keys(metrics)}));
    this.metrics_container.find('li a').bind('click', function() {
      var metric = $(this);

      if(metric.parent().hasClass('active')){
	// Deactivate all
	metric.parent().parent().children().removeClass('active');
	self.filters_container.children().remove();
	self.values_container.children().remove();
	}
	else{
	  // Activate metric
	  metric.parent().parent().children().removeClass('active');
	  metric.parent().toggleClass('active');
	  console.log(metrics);
	  console.log("Fuck");
	  console.log(metrics[metric.data('name')]);
	  self.render_filters(metric.data('name'), metrics[metric.data('name')]);
	};
    })},
  get_metrics_url: function(project_name){
    // Metrics structure url
    return project_name + "/api/metrics";
  },
  reload_metrics: function(project_name){
    // Reload metrics from server
    var api_url = this.get_metrics_url(project_name);
    var self = this;
    this.debug("Loading: "+ api_url);

    $.ajax({
      type: "GET",
      url: api_url,
      dataType: 'json',
      success: function(data){
	// Render metrics list
	self.render_metrics(data);
      },
      error: function(error){
	$.log(error);
      }
    });
  },
  render_chart: function(){
    this.debug("Chart rendering");
    // $.when.apply($, activated_metrics).done(function(){
    //   var responses = arguments;
    //   var metrics = {};

    //   var metrics = _.map(responses, function(response){
    // 	metrics[response[0]['name']] = response[0];
    // 	return response[0];
    //   });})
  },
  debug: function(value){
    if(this.debug_flag){
      $.log(value);
    }
  }
});


var Metric = Class.extend({
  init: function(project, name){
    this.project = project;
    this.name = name;
    this.filter_name = null;
    this.filter_value = null;
    this.data = null; //loaded metric data
  },
  load: function(){},
  show: function(){},
  increase: function(x, y){},
  stats_url: function(period, date_from, date_to){
      return this.project + "/api/stats?period="+period+"&name="+this.name;
  },
  resource_loader: function(period){
    return $.ajax({
      type: "GET",
      url: this.start_url(this.project, this.name, period),
      dataType: 'json'});
  }
});


(function($, nv, swig, _){

  $(function() {
    var global_metrics = {};
    var activate_metrics = {};
    var chart = null;

    var storage = new Storage(true);

    storage.render_selectors();
    storage.render_chart();

    // nv.addGraph(function(){
    //   var chart = nv.models.lineWithFocusChart();

    //   chart.xAxis.tickFormat(d3.format(',f'));

    //   chart.yAxis.tickFormat(d3.format(',.2f'));

    //   chart.y2Axis.tickFormat(d3.format(',.2f'));

    //   d3.select('#chart svg').datum(testData()).transition().duration(500).call(chart);
    //   d3.select('#chart svg').datum(testData2()).transition().duration(500).call(chart);

    //   nv.utils.windowResize(chart.update);

    //   return chart;
    // });

    // function testData(){
    // 	return [{"key": "Filter name", values: [{x:1, y: 20}, {x:2, y: 30}]}];
    // };
    // });

    // function testData() {
    // 	return nv.stream_layers(3,128,.1).map(function(data, i) {
    // 	  return {
    // 	    key: 'Stream' + i,
    // 	    values: data
    // 	  };
    // 	});
    // }

    //} //redner chart
  });


})(jQuery, nv, swig, _);