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

function GUID ()
{
  var S4 = function ()
  {
    return Math.floor(
      Math.random() * 0x10000 /* 65536 */
    ).toString(16);
  };

  return (
    S4() + S4() + "-" +
      S4() + "-" +
      S4() + "-" +
      S4() + "-" +
      S4() + S4() + S4()
  );
};

var selectors_bar_template = swig.compile(
  '<div class="navbar navbar_filters" id="bar-{{ id }}">'+
    '<div class="navbar-inner">'+
      '<div class="container">'+
        '<a class="btn btn-navbar" data-toggle="collapse" data-target=".navbar-responsive-collapse"></a>'+
          '<ul class="nav pull-right">'+
              '<li class="divider-vertical"></li>'+
              '<li><a href="#" class="delete-bar">×</a></li>'+
          '</ul>'+
          '<ul class="nav" style="float:none;margin-right:46px;">'+
           '<li class="dropdown metrics-selector">'+
            '<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="current">Параметр</span><!--<b class="caret"></b>--></a>'+
            '<ul class="dropdown-menu"></ul>'+
           '</li>'+
           '<li class="dropdown filters-selector">'+
            '<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="current">Фильтр</span></a>'+
            '<ul class="dropdown-menu"></ul>'+
          '</li></ul>'+
    '</div><!-- /.nav-collapse -->'+
    '</div>'+
  '</div><!-- /navbar-inner -->'+'</div>');

var filters_selector_template = swig.compile('{% for filter in filters %}'+
  '<li class="dropdown-submenu"><a tabindex="-1" href="#" class="filter-name" data-name="{{ filter[0] }}">{{ filter[0] }}</a>'+
  '<ul class="dropdown-menu">'+
  '{% set values = filter[1] %}'+
  '{% for value in values %}<li><a tabindex="-1" href="#" class="filter-value" data-name="{{ value }}" data-filter-name="{{ filter[0] }}">{{ value }}</a></li>{% endfor %}'+
					     '</ul></li>{% endfor %}');
var metrics_selector_template = swig.compile(
    '{% for metric in metrics %}<li><a href="#" data-name="{{ metric }}">{{ metric }}</a>{% endfor %}');

var chart_template = swig.compile('<div class="hero-unit chart-area container-fluid {{ project_name }}" id="chart-{{ id }}"><div class="row-fluid">'
    +'<div class="span8"><svg></svg></div>'
    +'<div class="span4">'
        +'<div class="chart-controls"><button class="add-bar"><i class="icon-plus"></i>добавить фильтр</button><button class="close remove-chart">×</button></div>'
        +'<div class="selectors"></div>'
    +'</div>'
    +'</div></div>');


var Bar = Class.extend({
  chart_template: chart_template,
  filter_template: '',
  filter_value_template: '',
  metrics_selector_template: metrics_selector_template,
  filters_selector_template: filters_selector_template,
  selectors_bar_template: selectors_bar_template,

  init: function(gottwall, chart, id, metric_name, filter_name, filter_value){
    this.id = id || GUID();
    this.gottwall = gottwall;
    this.chart = chart;
    this.metric_name = metric_name;
    this.filter_name = filter_name;
    this.filter_value = filter_value;

    this.chart.node.find('.selectors').append(this.render());
    this.bar = this.chart.node.find('#bar-'+this.id);

    this.add_bindings();

    this.metric = null;
    this.render_selectors();
  },
  to_dict: function(){
    return {
      "metric_name": this.metric_name,
      "filter_name": this.filter_name,
      "filter_value": this.filter_value,
      "id": this.id
    }
  },
  get_metric: function(){
    if(this.metric_name){
      var metric = new Metric(this.gottwall, this.metric_name,
			      this.filter_name, this.filter_value);
      return metric;
    }
    return null;
  },
  add_bindings: function(){
      var self = this;
    this.bar.find('.delete-bar').bind('click', function(){
      self.remove();
    });
  },
  remove: function(){
    this.chart.remove_bar(this);
    this.chart.render_chart_graph();
  },
  render: function(){
    return this.selectors_bar_template({"id": this.id});
  },
  render_selectors: function(){
    this.render_metrics(this.gottwall.metrics[this.gottwall.current_project]);
  },
  setup_current_filter: function(){
    var self = this;

    var filter_current = "Фильтр";
    if(self.filter_name && self.filter_value){
      filter_current = self.filter_name+":"+self.filter_value;
    }

    this.bar.find('.filters-selector .current').text(filter_current);

  },
  setup_current_metric: function(){
    console.log("Setup current metric");
    var self = this;
    var metric_current = "Показатель";

    if(self.metric_name){
      metric_current = self.metric_name;
    }

    this.bar.find('.metrics-selector .current').text(metric_current);
    self.render_filters(self.metric_name, this.gottwall.metrics[this.gottwall.current_project][self.metric_name]);
    self.setup_current_filter();
  },
  render_filters: function(metric_name, filters){
    console.log("Render filters");
    var self = this;

    this.bar.find('.filters-selector .dropdown-menu').html($(self.filters_selector_template({
      "filters": _.map(filters, function(value, key){
	return [key, value];
      })
    })));


    this.bar.find('.filters-selector .dropdown-menu .dropdown-submenu li a.filter-value')
      .bind('click', function(){
	var filter_value = $(this);
	self.filter_value = filter_value.data('name');
	self.filter_name = filter_value.data('filter-name');
	filter_value.parent().parent().parent().parent().parent().find('.current')
	  .text(self.filter_name+":"+self.filter_value);
	filter_value.parent().parent().parent().parent().parent().removeClass('open');
	//self.graph.render_chart_graph();
	self.gottwall.save_to_storage();
	return false;
    });
  },
  render_metrics: function(metrics){
    $.log("Render metrics selectors");

    var self = this;
    this.bar.find('.metrics-selector .dropdown-menu').html($(self.metrics_selector_template({
      "metrics": _.map(metrics, function(value, key){
	return key;
      })
    })));

    self.setup_current_metric();

    this.bar.find('.metrics-selector .dropdown-menu li a').bind('click', function(){
      var metric = $(this);
      self.metric_name = metric.data('name');

      self.filter_name = null;
      self.filter_value = null;
      self.render_filters(this.metric_name, metrics[self.metric_name]);
      metric.parent().parent().parent().removeClass('open');
      metric.parent().parent().parent().find('.current').text(self.metric_name);
      self.setup_current_filter();
      //self.graph.render_chart_graph();
      self.gottwall.save_to_storage();
      return false;
    });
  },
});

var Chart = Class.extend({

  chart_template: chart_template,
  filter_template: '',
  filter_value_template: '',
  metric_selector_template: metrics_selector_template,
  filters_selector_template: filters_selector_template,
  selectors_bar_template: selectors_bar_template,

  init: function(gottwall, id, period){
    this.id = id;
    this.gottwall = gottwall;
    this.period = period || 'month';
    this.bars = [];
    this.gottwall.charts_container.append($(this.render()));
    this.node = $('#chart-'+this.id);

    this.add_bindings();

  },

  to_dict: function(){
    return {"id": this.id,
	    "metrics": _.map(this.bars, function(bar){
	      return bar.to_dict();
	    })}
  },
  add_bindings: function(){
    var self = this;

    this.node.find('.chart-controls .add-bar').bind('click', function(){
      var button = $(this);
      self.add_bar(new Bar(self.gottwall, self, GUID()));
    });

    this.node.find('.chart-controls .remove-chart').bind('click', function(){
      var button = $(this);
      $.log("Remove chart");
      self.remove();
    });
  },
  remove: function(){
    this.gottwall.remove_chart(this);
  },
  node_key: function(){
    return "chart-"+this.id;
  },
  render_chart_graph: function(){
    console.log("Load stats for chart ..."+this.id);
    var self = this;
    var metrics = this.get_metrics();

    $.when.apply($, _.map(metrics, function(metric){

      return metric.get_resource_loader(self.gottwall.current_period);
    })).done(
      function(){
	if(!_.isArray(arguments[1])){
	  var responses = [arguments];
	}
	else{
	  var responses = arguments;
	}

	var metrics_with_data = _.map(_.compact(responses), function(r){
	  return new Metric(self.gottwall,  r[0]["name"], r[0]["filter_name"], r[0]["filter_value"], r[0]);
	});
	return self.render_metrics(metrics_with_data);
      });
  },
  render_metrics: function(metrics){
    // Rendering chart by metrics hash
    console.log("Chart rendering...");
    var self = this;

    nv.addGraph(function(){
      var chart = nv.models.lineChart();

      chart.xAxis.tickFormat(function(d) {
	return self.gottwall.current_date_formatter(new Date(d));
	//        return d3.time.format(self.current_date_format)(new Date(d))
      });

      d3.select('#chart-' + self.id + " svg").datum(
	_.map(metrics, function(metric){
	  return metric.get_chart_data()})).transition().duration(500).call(chart);
      nv.utils.windowResize(chart.update);

      return chart;
    });
  },
  get_metrics: function(){
    // Get activated metrics
    return _.compact(_.map(this.bars, function(bar){
      return bar.get_metric();
    }));
  },
  add_bar: function(bar){
    console.log("Add new bar");
    this.bars.push(bar);
  },
  remove_bar: function(bar){
    console.log("Remove bar " + bar);

    for(var i in this.bars){
      if(_.isEqual(this.bars[i].bar, bar.bar)){
	console.log("Remove bar "+i);
	this.bars.splice(i, 1)
      }
    }
    bar.bar.remove();
  },
  render: function(){
    console.log("Render chart area");
    return $(this.chart_template({"id": this.id, "project_name": this.gottwall.current_project}));
  }
});


var GottWall = Class.extend({

  // Local storage keys
  current_project_key: "current_project",
  current_period_key: "current_period",
  charts_key: "charts",
  from_date_key: "from-date",
  to_date_key: "to-date",

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
    this.charts = {};

    this.current_project = null;
    this.chart_container = $('#chart');
    this.charts_container = $('#charts');
    console.log("charts container");
    console.log(this.charts_container);

    this.filters_container = $('#filters-selector #filters-list');
    this.metrics_container = $('#metrics-selector #metrics-list');
    this.values_container = $('#values-selector #values-list');
    this.period_selector = $('.chart-control .periods .selector');
    this.project_selector = $("#project-selector");

    this.current_period = null;
    this.current_date_format = null;
    this.current_date_formatter = null;

    this.from_date = null;
    this.to_date = null;

    this.from_date_selector = $("#"+this.from_date_key);
    this.to_date_selector = $("#"+this.to_date_key);
    this.chart_add = $("#chart-add");

    this.setup_defaults();
    this.add_bindings();
  },
  get_from_date: function(){
    if(this.from_date_selector){
      return this.from_date_selector.val() || null;
    }
    return null;
  },
  get_to_date: function(){
    if(this.to_date_selector){
      return this.to_date_selector.val() || null;
    }
    return null;
  },

  get_metrics_url: function(){
    // Metrics structure url
    return this.current_project + "/api/metrics";
  },
  metrics_resource_loader: function(){
    var self = this;
    return $.ajax({
      type: "GET",
      url: self.get_metrics_url(),
      dataType: 'json',
    });
  },
  load_metrics: function(){
    // Reload metrics from server
    var api_url = this.get_metrics_url();

    var self = this;

    this.debug("Loading metrics structure to: "+ api_url);

    $.ajax({
      type: "GET",
      url: api_url,
      dataType: 'json',
      success: function(data){
	// Render metrics list
	self.metrics = data;
      },
      error: function(error){
	$.log(error);
      }
    });
  },
  setup_defaults: function(){
    // Setup defaul values for project, period and date selectors

    // Load data from localStorage
    this.restore_from_storage();

    if(this.current_project){
      this.project_selector.find('a[data-name='+this.current_project+']').parent().addClass('active');
      this.project_selector.parent().find('.js-current-project').text(this.current_project);
    }

    if(!this.current_period){
      this.set_period("month");
    }

    this.period_selector.find('button[data-type='+this.current_period+']').addClass('active');

    var d = new Date();
    this.to_date = d3.time.format("%Y-%m-%d")(d);
    this.from_date = d3.time.format("%Y-%m-%d")(new Date(d.getFullYear(), d.getMonth()-1, d.getDate()));

    this.from_date_selector.val(this.from_date);
    this.to_date_selector.val(this.to_date);

  },
  set_dates: function(){
  },
  set_period: function(period){
    // Setup period and datetime format
    this.current_period = period;

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
      self.save_to_storage();
    });
  },
  change_project: function(){
    var self = this;
    console.log("Changed to project: " + self.current_project);

    self.charts_container.children().remove();

    $.when(this.metrics_resource_loader()).done(
      function(r){
	self.metrics[self.current_project] = r;
	self.restore_charts();
	self.redraw_charts();
	self.save_to_storage();
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

      self.change_project();

      // Save data to localStorage
      //self.save_to_storage();
    });
  },
  redraw_charts: function(){
    var self = this;
    console.log("Redraw charts for project " + this.current_project);

    _.each(this.charts[this.current_project], function(chart, key){
      chart.render_chart_graph();
    });
  },
  bind_redraw_button: function(){
    var self = this;
    $('#redraw-button').bind('click', function(){
      self.redraw_charts();
      // Save data to storage
      self.save_to_storage();
    });
  },
  bind_dates_selectors: function(){
    var self = this;
    this.from_date_selector.bind('click', function(e){
      var input = $(this);

      if(input.val() != self.from_date){
	self.from_date = input.val();
      }
    });

    this.to_date_selector.bind('click', function(e){
      var input = $(this);

      if(input.val() != self.to_date){
	self.to_date = input.val();
      }
    });
  },
  get_unique_id: function(){
    return GUID();
  },
  remove_chart: function(chart){
    // Remove chart
    this.log("Remove chart " + chart.id);
    chart.node.remove();
    delete this.charts[this.current_project][chart.id];
  },
  add_chart: function(){
    var id = this.get_unique_id();
    this.log("Add new chart area " + id);
    var chart = new Chart(this, id);

    if(!_.has(this.charts, this.current_project)){
      this.charts[this.current_project] = {};
    }
    this.charts[this.current_project][chart.id] = chart;
  },
  bind_add: function(){
    var self = this;
    this.chart_add.bind('click', function(){
      self.add_chart();
    });
  },
  add_bindings: function(){
    this.bind_period_selectors();
    this.bind_project_selector();
    this.bind_redraw_button();
    this.bind_dates_selectors();
    this.bind_add();
  },

  save_to_storage: function(){
    // Save controls states to localStorage

    var self = this;
    if(this.charts){
      console.log("Save charts");
      var charts = {};

      for(var project in self.charts){
	charts[project] = {};

	for(var chart in self.charts[project]){
	  charts[project][self.charts[project][chart].id] = self.charts[project][chart].to_dict();
	}
      }

      localStorage.setItem(this.charts_key, JSON.stringify(charts));
    }
    if(this.current_project){
      localStorage.setItem(this.current_project_key, this.current_project);
    }
    if(this.current_period){
      localStorage.setItem(this.current_period_key, this.current_period);
    }
  },
  restore_charts: function(){
    console.log("Restore charts");
    var self = this;

    var projects = JSON.parse(localStorage.getItem(this.charts_key)) || {};

    console.log("Restore project " + self.current_project);
    var project = self.current_project;

    if(!project){
      console.log("Skip restore charts");
    }
    this.charts[project] = {};
    for(var chart_id in projects[self.current_project]){
      console.log("Restore chart " + chart_id);
      this.charts[project][chart_id] = chart = new Chart(self, chart_id);

      for(var bar_id in projects[project][chart_id]['metrics']){

	  chart.add_bar(new Bar(self, chart, projects[project][chart_id]['metrics'][bar_id]['id'],
	  			projects[project][chart_id]['metrics'][bar_id]['metric_name'],
	  			projects[project][chart_id]['metrics'][bar_id]['filter_name'],
	  			projects[project][chart_id]['metrics'][bar_id]['filter_value']));
	}
    }

    self.redraw_charts();
  },
  restore_from_storage: function(){
    // Load data from localStorage
    var self = this;
    this.debug('Loading settings from storage ...');

    this.current_project = this.current_project || localStorage.getItem(this.current_project_key);
    this.current_period = this.set_period(this.current_period || localStorage.getItem(this.current_period_key));

    $.when(this.metrics_resource_loader()).done(
      function(r){
	self.metrics[self.current_project] = r;
	self.restore_charts();
      });

  },

  debug: function(value){
    if(this.debug_flag){
      $.log(value);
    }
  },
  log: function(value){
    $.log(value);
  }
});


var Metric = Class.extend({

  init: function(gottwall, name, filter, value, data){
    this.gottwall = gottwall;
    this.project = gottwall.current_project;
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
  stats_url: function(){
    var url = this.project + "/api/stats?period="+this.gottwall.current_period+"&name="+this.name;
    if(this.filter_name && this.filter_value){
      url = url + "&filter_name="+this.filter_name+"&filter_value="+this.filter_value;
    }

    var from_date = this.gottwall.get_from_date();
    if(from_date){
      url = url + "&from_date=" + from_date
    }
    var to_date = this.gottwall.get_to_date();
    if(to_date){
      url = url + "&to_date=" + to_date;
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
      return _.sortBy(_.map(this.data['range'],
			    function(item){
			      return {"x": self.gottwall.date_to_timestamp(item[0]), "y": parseInt(item[1])};
			    }), function(sub_item){return sub_item['x']});
    }
    return [];
  },
  get_chart_data: function(){
    console.log("get chart data");
    key = this.name
    if(this.filter_name){
      key = key + ":"+this.filter_name
    }
    if(this.filter_value){
      key = key + ":"+this.filter_value
    }
    var data = {"values": this.get_range(),
		"key": key}
    return data
  }
});


(function($, nv, swig, _){

  var self = this;
  $(function() {
    var global_metrics = {};
    var activate_metrics = {};
    var chart = null;

    $('.input_date').datepicker();


    self.gottwall = new GottWall(true);
  });


})(jQuery, nv, swig, _);