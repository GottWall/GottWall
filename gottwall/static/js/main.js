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


var GottWall = Class.extend({


  // Local storage keys
  activated_metrics_key: "activated_metrics",
  current_project_key: "current_project",
  current_period_key: "current_period",

  metrics_template: '{% for x in items %}<li {% if x[1] %}class="activated"{% endif %}><a href="#metric/{{ x[0] }}" data-name="{{ x[0] }}">{{ x[0] }}</a></li>{% endfor %}',
  values_template: '{% for value in items %}<li {% if value[1] %}class="activated"{% endif %}><a href="#filters/{{ metric_name }}/{{ filter_name }}/{{ value[0] }}" data-name="{{ value[0] }}">{{ value[0] }}</a></li>{% endfor %}',
  filters_template: '{% for f in items %}<li><a href="#filters/{{ metric_name }}/{{ f }}" data-name="{{ f }}">{{ f }}</a></li>{% endfor %}',

  date_formats: {
    "day": "%Y-%m-%d",
    "year": "%Y",
    "month": "%Y-%m",
    "hour": "%Y-%m-%dT%H",
    "minute": "%Y-%m-%dT%H:%M",
    "week": "%Y-%W"
  },

  init: function(debug){
    this.debug_flag = debug || false;
    this.metrics = {};
    this.activated_metrics = {};

    this.current_project = null;
    this.chart_container = $('#chart');
    this.filters_container = $('#filters-selector #filters-list');
    this.metrics_container = $('#metrics-selector #metrics-list');
    this.values_container = $('#values-selector #values-list');
    this.period_selector = $('.chart-control .periods .selector');
    this.project_selector = $("#project-selector");
    this.current_period = null;
    this.current_date_format = null;
    this.current_date_formatter = null;

    this.setup_defaults();
    this.add_bindings();
  },

  setup_defaults: function(){
    // Setup defaul values for project, period and date selectors

    // Load data from localStorage
    this.load();

    if(this.current_project){
      this.project_selector.find('a[data-name='+this.current_project+']').parent().addClass('active');
      this.project_selector.parent().find('.js-current-project').text(this.current_project);
    }

    if(!this.current_period){
      this.set_period("month");
    }

    this.period_selector.find('button[data-type='+this.current_period+']').addClass('active');
  },
  set_period: function(period){
    // Setup period and datetime format
    this.current_period = period;
    console.log("Set period"+period);
    console.log(_.has(this.date_formats, period));
    if(_.has(this.date_formats, period)){
      console.log("Setup current date formatter");
      this.current_date_format = this.date_formats[period];
      this.current_date_formatter = d3.time.format(this.date_formats[period]);
    }
    return period
  },
  get_date_format: function(){
    if(!this.current_date_format){
      if(_.has(this.date_formats, this.current_period)){
	this.current_date_format = this.date_formats[this.current_period];
      }
    }
    return this.current_date_format;
  },
  date_to_timestamp: function(d){
    // Convert date string to date object
    var date_format = this.get_date_format();

    if(date_format){
      return this.current_date_formatter.parse(d);
    }
  },
  get_current_period: function(){
    // Get current period state
    if(!null){
      return null;
    }
    else{
      return this.current_period;
    }
  },
  bind_period_selectors: function(){
    var self = this;

    this.period_selector.children().bind('click', function(){
      var button = $(this);
      self.current_period = button.data('type');

      if(button.hasClass('active')){
	// Deactivate all
	button.parent().children().removeClass('active');
      }
      else{
	// Activate filter
	button.parent().children().removeClass('active');
	button.addClass('active');
	self.set_period(self.current_period);
      };
      // Save data to storage
      self.save();
    });
  },
  bind_project_selector: function(){
    var self = this;
    this.project_selector.find("li a").bind('click', function(){
      var item = $(this);
      self.current_project = item.data('name');
      $('.js-project-dropdown .js-current-project').text(self.current_project);
      item.parent().parent().children().removeClass('active');
      item.parent().addClass('active');
      self.render_selectors();

      // Save data to localStorage
      self.save();
    });
  },
  bind_redraw_button: function(){
    var self = this;
    $('#redraw-button').bind('click', function(){
      self.load_stats();
    });
    // Save data to storage
    this.save();
  },
  add_bindings: function(){
    this.bind_period_selectors();
    this.bind_project_selector();
    this.bind_redraw_button();
  },

  save: function(){
    if(_.keys(this.activated_metrics).length>0){
      localStorage.setItem(this.activated_metrics_key, JSON.stringify(this.activated_metrics));
    }

    if(this.current_project){
      localStorage.setItem(this.current_project_key, this.current_project);
    }
    if(this.current_period){
      localStorage.setItem(this.current_period_key, this.current_period);
    }

  },
  load: function(){
    // Load data from localStorage
    this.debug('Loading data from storage...');

    this.current_project = this.current_project || localStorage.getItem(this.current_project_key);
    this.current_period = this.set_period(this.current_period || localStorage.getItem(this.current_period_key));

    if(!this.activated_metrics){
      this.activated_metrics = {};
    }
    if(_.keys(this.activated_metrics).length<=0){
      this.activated_metrics = JSON.parse(localStorage.getItem(this.activated_metrics_key)) || {};
    }
  },
  get_metrics_list: function(){
    // Get metrics as plain list
    var self = this;
    var metrics = [];

    _.each(this.activated_metrics[this.current_project], function(filters, metric){
      var self2 = this;
      _.each(filters, function(values, filter){
	if(filter=='null'){
	  filter = null;
	}
	for(var value in values){
	  metrics.push([metric, filter, values[value]]);
	}
      });
    });
    return metrics;
  },
  get_activated_metrics: function(){
    // Get activated metrics for project
    var self = this;
    var metrics_list = this.get_metrics_list();

    return _.map(metrics_list, function(item){
      return new Metric(self, self.current_project, item[0], item[1], item[2]);
    });
  },
  is_activated_metric: function(name, filter, value){
    var self = this;
    var metrics = this.activated_metrics;
    var project = this.current_project;

    filter = filter || null;
    value = value || null;

    if(!_.has(metrics, project)){
      return false
    }

    if(!_.has(metrics[project], name)){
      return false;
    }

    if(!_.has(metrics[project][name], filter)){
      return false;
    }

    if(metrics[project][name][filter].indexOf(value) <0){
      return false;
    }
    return true;
  },
  activate_metric: function(name, filter, value){
    // Activate metric for current project with `name`, `filter` and `value`
    var metric = new Metric(this, this.current_project, name, filter, value);
    filter = filter || null;
    value = value || null;

    if(!_.has(this.activated_metrics, this.current_project)){
      this.activated_metrics[this.current_project] = {};
    }
    if(!_.has(this.activated_metrics[this.current_project], name)){
      this.activated_metrics[this.current_project][name] = {}
    }
    if(!_.has(this.activated_metrics[this.current_project][name], filter)){
      this.activated_metrics[this.current_project][name][filter] = [];
    }

    if(this.activated_metrics[this.current_project][name][filter].indexOf(value)<0){
      this.activated_metrics[this.current_project][name][filter].push(value);
    }
  },
  deactivate_metric: function(name, filter, value){
    if(value){
      var index = this.activated_metrics[this.current_project][name][filter].indexOf(value);

      if(index >= 0){
	this.activated_metrics[this.current_project][name][filter].splice(index, 1);
      }
    }
    else if (filter){
      // Delete filter
      delete this.activated_metrics[this.current_project][name][filter];
    }
    else{
      // Delete metrics
      delete this.activated_metrics[this.current_project][name];
    }
  },

  render_selectors: function(){
    // Render metrics selectors
    if(this.current_project){
      this.reload_metrics(this.current_project);
    }
  },
  render_filters: function(metric_name, filters){
    // Render filters for metric_name
    var self = this;
    var filters_template = swig.compile(this.filters_template);

    this.filters_container.html(filters_template({metric_name: metric_name,
					 items: _.keys(filters)}));
    this.filters_container.find('li a').bind('click', function() {
      var filter = $(this);

      if(filter.parent().hasClass('active')){
	// Deactivate all
	filter.parent().parent().children().removeClass('active');
	self.values_container.children().remove();
      }
      else{
	// Activate filter
	filter.parent().parent().children().removeClass('active');
	filter.parent().toggleClass('active');
	self.render_filter_values(metric_name, filter.data('name'), filters[filter.data('name')]);
      };
    })
  },
  render_filter_values: function(metric_name, filter_name, values){
    // Render values for filter_name
    var self = this;
    var values_template = swig.compile(this.values_template);
    this.values_container.html(values_template(
      {metric_name: metric_name,
       filter_name: filter_name,

       // Check activation
       items: _.map(values, function(value){
	 return [value, self.is_activated_metric(metric_name, filter_name, value)];
       })}));

    this.values_container.find('li a').bind(
      {'click': function(){
	var value = $(this);

	if(value.parent().hasClass('activated')){
	  value.parent().removeClass('activated');
	  self.deactivate_metric(metric_name, filter_name, value.data('name'));
	}
	else{
	  value.parent().addClass('activated');
	  self.activate_metric(metric_name, filter_name, value.data('name'));
	}
	self.save();
      }
      });
  },
  render_metrics: function(metrics){
    // Render metrics selector
    this.debug("Render selectors");
    var self = this;
    var items = swig.compile(this.metrics_template);
    this.metrics_container.html(items({"items": _.map(metrics, function(value, key){
      return [key, self.is_activated_metric(key)];
    })}));

    // bind metrics items
    this.metrics_container.find('li a').bind(
      {'click': function() {
	var metric = $(this);

	if(metric.parent().hasClass('active')){
	// Deactivate all, remove filters, values
	  metric.parent().parent().children().removeClass('active');
	  self.filters_container.children().remove();
	  self.values_container.children().remove();
	}
	else{
	  // Activate metric and show filters
	  metric.parent().parent().children().removeClass('active');
	  metric.parent().toggleClass('active');
	  self.render_filters(metric.data('name'), metrics[metric.data('name')]);
	};
      },
       'dblclick': function(){
	 var metric = $(this);
	 if(metric.parent().hasClass('activated')){
	   self.deactivate_metric(metric.data('name'));
	   metric.parent().removeClass('activated');
	 }
	 else{
	   self.activate_metric(metric.data('name'));
	   metric.parent().addClass('activated');
	 }
	 self.save();
       }})},
  get_metrics_url: function(project_name){
    // Metrics structure url
    return project_name + "/api/metrics";
  },
  reload_metrics: function(project_name){
    // Reload metrics from server
    var api_url = this.get_metrics_url(project_name);
    var self = this;

    this.debug("Loading metrics structure: "+ api_url);

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
  load_stats: function(){
    this.debug("Load stats...");

    var metrics = this.get_activated_metrics();
    var self = this;

    $.when.apply($, _.map(metrics, function(metric){
      console.debug(metric);
      return metric.get_resource_loader(self.current_period);
    })).done(
      function(){
	var responses = arguments;
	var metrics = _.map(responses, function(r){
	  return new Metric(self, r[0]["project"], r[0]["name"], r[0]["filter_name"], r[0]["filter_value"], r[0]);
	});
	return self.render_chart(metrics);
      });
  },
  render_chart: function(metrics){
    this.debug("Chart rendering...");
    var self = this;

    nv.addGraph(function(){
      var chart = nv.models.lineChart();

      chart.xAxis.tickFormat(function(d) {
        return d3.time.format(self.current_date_format)(new Date(d))
      });

      d3.select('#chart svg').datum(
	_.map(metrics, function(metric){
	  return metric.get_chart_data()})).call(chart);
      nv.utils.windowResize(chart.update);

      return chart;
    });
  },
  debug: function(value){
    if(this.debug_flag){
      $.log(value);
    }
  }
});


var Metric = Class.extend({

  init: function(gottwall, project, name, filter, value, data){
    this.gottwall = gottwall;
    this.project = project;
    this.name = name;
    if(filter == 'null'){
      this.filter_name = null;
    }
    else{
      this.filter_name = filter;
    }
    this.filter_value = value;
    this.data = data; //loaded metric data
  },
  load: function(){},
  show: function(){},
  stats_url: function(date_from, date_to){
    var url = this.project + "/api/stats?period="+this.gottwall.current_period+"&name="+this.name;
    if(this.filter_name && this.filter_value){
      url = url + "&filter_name="+this.filter_name+"&filter_value="+this.filter_value;
    }
    return url;
  },
  get_resource_loader: function(){
    return $.ajax({
      type: "GET",
      url: this.stats_url(),
      dataType: 'json'});
  },
  is_equal: function(){
    return {
      project: this.project,
      name: this.name,
      filter_name: this.filter_name,
      filter_value: this.filter_value
    }
  },
  get_range: function(){
    var self =  this;
    if(this.data){
      return _.map(this.data['range'], function(item){
	return {"x": self.gottwall.date_to_timestamp(item[0]), "y": parseInt(item[1])};
      });
    }
    return [];
  },
  get_chart_data: function(){
    return {"values": this.get_range(),
	    "key": this.name+":"+this.filter_name+":"+this.filter_value}
  }
});


(function($, nv, swig, _){

  var self = this;
  $(function() {
    var global_metrics = {};
    var activate_metrics = {};
    var chart = null;

    self.gottwall = new GottWall(true);

    self.gottwall.render_selectors();
    self.gottwall.load_stats();
  });


})(jQuery, nv, swig, _);