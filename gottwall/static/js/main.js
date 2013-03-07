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


var BaseBar = Class.extend({
  init: function(gottwall, chart, id, metric_name, filter_name, filter_value){
    this.id = id || GUID();
    this.gottwall = gottwall;
    this.chart = chart;
    this.metric_name = metric_name;
    this.filter_name = filter_name;
    this.filter_value = filter_value;

    // DOM object node
    this.node = null;
  },
  add_bindings: function(){
    console.log("Add bindings to BaseBar");
  },
  render: function(){
    var template = swig.compile($("#selectors-bar-template").text());
    this.node = $(template({"id": this.id}));
    return this.node;
  },
  to_dict: function(){
    return {
      "metric_name": this.metric_name,
      "filter_name": this.filter_name,
      "filter_value": this.filter_value,
      "id": this.id}
  },
  render_selectors: function(){
    this.render_metrics(this.gottwall.metrics[this.gottwall.current_project]);
  },
  render_metrics: function(metrics){
    $.log("Render metrics selectors");

    var self = this;
    var template = swig.compile($("#metrics-selector-template").text());

    if(!this.node ){
      this.render();
    }
    this.node.find('.metrics-selector .dropdown-menu').html(
      $(template({
	"metrics": _.map(metrics, function(value, key){
	  return key;})
      })));

    self.setup_current_metric();

    this.node.on('click', '.metrics-selector .dropdown-menu li a',  function(){
      var metric = $(this);
      self.metric_name = metric.data('name');

      self.filter_name = null;
      self.filter_value = null;
      self.render_filters(this.metric_name, metrics[self.metric_name]);
      metric.parent().parent().parent().removeClass('open');
      metric.parent().parent().parent().find('.current').text(self.metric_name);
      self.setup_current_filter();
      self.chart.render_chart_graph();
      self.gottwall.save_to_storage();
      return false;
    });
  },
});

var TableBar = BaseBar.extend({
  init: function(gottwall, chart, id, metric_name, filter_name){
    this._super(gottwall, chart, id, metric_name, filter_name);

    //this.bar = this.chart.node.find("#bar-"+this.id);

    this.metric = null;    //this.render_selectors();
  },
  render: function(){
    var template = swig.compile($("#selectors-table-bar-template").text());
    this.node = $(template({"id": this.id}));
    return this.node;
  },
  setup_current_metric: function(){
    console.log("Setup current metric for table");
    var self = this;
    var metric_value = "Показатель";

    if(self.metric_name) {
      metric_current = self.metric_name;
    }
    self.render_filters(self.metric_name,
			this.gottwall.metrics[this.gottwall.current_project][self.metric_name]);

    this.node.find('.metrics-selector .current').text(metric_current);

    self.setup_current_filter();
  },
  setup_current_filter: function(){
    console.log("Setup current filter");
    var self = this;

    var filter_current = "Фильтр";
    if(self.filter_name){
      filter_current = self.filter_name;
    }

    this.node.find('.filters-selector .current').text(filter_current);
  },
  render_filters: function(metric_name, filters){
    console.log("Render table filters");
    var self = this;
    var template = swig.compile($("#table-filters-selector-template").text());

    if(!this.node){
      this.render();
    }

    this.node.find('.filters-selector .dropdown-menu').html(
      $(template({
    	"filters": _.map(filters, function(value, key){
    	  return key;
    	})})));

    this.node.on('click', '.filters-selector li a', function(){
      console.log("Table selector clicked");
      var button = $(this);
      self.filter_name = button.attr('data-name');
      self.node.find('.filters-selector .current').text(self.filter_name);
      self.node.find('.filters-selector').removeClass('open');
      console.log(self);
      self.chart.render_chart_graph();
      self.gottwall.save_to_storage();
      console.log(self);
      return false;
    });
  }
});

var Bar = BaseBar.extend({

  init: function(gottwall, chart, id, metric_name, filter_name, filter_value){
    this._super(gottwall, chart, id, metric_name, filter_name, filter_value);

    //this.bar = this.chart.node.find("#bar-"+this.id);

    this.metric = null;
    //this.render_selectors();
  },
  setup: function(){
    //this.node = this.chart.node.find("#bar-"+this.id);
    this.add_bindings();
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
    this.node.on('click', '.delete-bar', function(){
      self.remove();
      return false;
    });
  },
  remove: function(){
    this.chart.remove_bar(this);
    this.chart.render_chart_graph();
  },
  setup_current_filter: function(){
    var self = this;

    var filter_current = "Фильтр";
    if(self.filter_name && self.filter_value){
      filter_current = self.filter_name+":"+self.filter_value;
    }

    this.node.find('.filters-selector .current').text(filter_current);
  },
  setup_current_metric: function(){
    console.log("Setup current metric");
    var self = this;
    var metric_current = "Показатель";

    if(self.metric_name) {
      metric_current = self.metric_name;
    }

    this.node.find('.metrics-selector .current').text(metric_current);
    self.render_filters(self.metric_name,
			this.gottwall.metrics[this.gottwall.current_project][self.metric_name]);
    self.setup_current_filter();
  },
  render_filters: function(metric_name, filters){
    console.log("Render filters");
    var self = this;
    var template = swig.compile($("#filters-selector-template").text());

    if(!this.node){
      this.render();
    }
    this.node.find('.filters-selector .dropdown-menu').html($(template({
      "filters": _.map(filters, function(value, key){
	return [key, value];
      })
    })));

    $(this.node.find('.filters-selector li select')).select2({
      placeholder: "Select a State",
      allowClear: true
    });

    this.node.on("change", ".filters-selector select", function(e){
      var selected = $(this);
      self.filter_value = selected.val();
      self.filter_name = selected.attr("placeholder");

      self.node.find('.filters-selector .current').text(self.filter_name+":"+self.filter_value);
      self.node.find('.filters-selector').removeClass('open');
      self.chart.render_chart_graph();
      self.gottwall.save_to_storage();
      return false;
    });
  },
});

var Widget = Class.extend({
  init: function(gottwall, id){
    console.log("Initialize widget");
    this.id = id;
    this.type = "widget";
    this.gottwall = gottwall;
    this.selectors_node = null;

  },
  show_loader: function(){
    console.log("Show loader");
    this.node.find('svg').hide();
    this.node.find('.loader').show();
  },
  hide_loader: function(){
    console.log("Hide loader");
    this.node.find('svg').show();
    this.node.find('.loader').hide();
  },
  get_class_by_type: function(type){
    if(type=="table"){
      return Table;
    } else if (type=="chart"){
      return Chart;
    }
    return null;
  },
  render_bar: function(bar){
    // Render bar on Chart area
    console.log("Render widget bar");
    if(!this.renders_selector){
      console.log("Render chart area before");
    }
    this.selectors_node.append(bar.render());
    bar.render_selectors();
    bar.add_bindings();
  },
  setup: function(){},
  add_bindings: function(){
    console.log("Add bar bindings");
  },
  remove: function(){
    this.gottwall.remove_chart(this);
  },
  node_key: function(){
    return "chart-"+this.id;
  },
});


var Table = Widget.extend({
  init: function(gottwall, id){
    console.log("Initialize table widget");
    this._super(gottwall, id, null);
    this.type = "table";
    this.bar = null;
    this.metric_name = null;
    this.metric_value = null;
  },
  to_dict: function(){
    return {"id": this.id,
	    "metrics": this.bar.to_dict(),
	    "type": this.type}
   },
  render_widget: function(){
    console.log("Render Table Widget");
    var template = swig.compile($('#table-template').text());
    var widget = $(template({
      "id": this.id,
      "type": this.type,
      "project_name": this.gottwall.current_project
    }));

    var selectors_node = widget.find('.selectors');
    this.selectors_node = selectors_node;
    this.selectors_node.append(this.render_bar(this.bar));
    return widget;
  },
  render_bar: function(bar){
    // Render table bar on Chart area
    var bar_widget = bar.render();
    bar.render_selectors();
    bar.add_bindings();
    return bar_widget;
  },
  setup_bar: function(bar){
    this.bar = bar
  },
  render_chart_graph: function(){
    console.log("Render table");
  },
  setup: function(){
    var self = this;
    if(!this.bar){
      this.bar = new TableBar(self.gottwall, self, null, null);
    }
  },

});

 var Chart = Widget.extend({

   init: function(gottwall, id, period){
     console.log("Initialize chart widget: "+id);
     this._super(gottwall, id);

     this.period = period || 'month';
     this.bars = [];
     this.node = $('#chart-'+this.id);
     this.type = "chart";
     this.selectors_node = null;
   },

   to_dict: function(){
     return {"id": this.id,
	     "metrics": _.map(this.bars, function(bar){
	       return bar.to_dict();
	     }),
	     "type": this.type}
   },
   add_bindings: function(){
     var self = this;
     console.log(this.node);
     this.node.on('click', '.chart-controls .add-bar', function(){
       var button = $(this);
       var bar = new Bar(self.gottwall, self, GUID())
       self.add_bar(bar);
       self.render_bar(bar);
     });

     this.node.on(
       'click', '.chart-controls .remove-chart', function(){
	 var button = $(this);
	 $.log("Remove chart");
	 self.remove();
       });
   },
   render_chart_graph: function(){
     console.log("Load stats for chart ..."+this.id);
     var self = this;
     var metrics = this.get_metrics();
     self.show_loader();

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
	   return new Metric(self.gottwall,  r[0]["name"],
			     r[0]["filter_name"], r[0]["filter_value"], r[0]);
	});
	self.hide_loader();
	return self.render_metrics(metrics_with_data);
      });
  },
  format_tick: function(d){
    var self = this;
    return self.gottwall.current_date_formatter(new Date(d));
  },
  render_metrics: function(metrics){
    // Rendering chart by metrics hash
    console.log("Chart rendering...");
    var self = this;

    nv.addGraph(function(){
      var chart = nv.models.lineChart();
      //chart.margin({top: 10, bottom: 40, left: 60, right: 30});

      chart.xAxis.tickFormat(function(d) {
	return self.format_tick(d);
	//        return d3.time.format(self.current_date_format)(new Date(d))
      });
      chart.tooltipContent(function(key, x,  y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  x + ' → ' + y + '</p>'
      });

      //chart.xAxis.rotateLabels(-45);

      d3.select('#chart-' + self.id + " svg").datum(
	_.map(metrics, function(metric){
	  return metric.get_chart_data()})).transition().duration(50).call(chart);
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
      if(_.isEqual(this.bars[i].node, bar.node)){
	console.log("Remove bar "+i);
	this.bars.splice(i, 1)
      }
    }
    bar.node.remove();
  },
  render_widget: function(){
    console.log("Render chart widget");

    var template = swig.compile($("#chart-template").text());

    var widget = $(template({
      "id": this.id,
      "project_name": this.gottwall.current_project,
      "type": this.type}));
    var selectors_node = widget.find('.selectors');
    this.selectors_node = selectors_node;

    for(var i in this.bars){
      this.render_bar(this.bars[i]);
      // selectors_node.append(this.());
      // this.bars[i].render_selectors();
    }
    return widget;
  }});


var GottWall = Class.extend({

  // Local storage keys
  current_project_key: "current_project",
  current_period_key: "current_period",
  charts_key: "charts",
  from_date_key: "from-date",
  to_date_key: "to-date",
  size_mode_key: "size_mode",

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
    this.full_size_area = false;

    this.setup_defaults();
    this.add_bindings();
    moment.lang("ru");
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


    this.set_date_range();

  },

  switch_full_size_mode: function(mode_on){
    var self = this;
    console.log("Switch full size mode");
    var button = $('#resize-area-switcher');
    if(mode_on){
      button.addClass('active');
      self.full_size_area = true;
      self.charts_container.addClass('full-mode');
    }
    else {
      button.removeClass('active');
      self.full_size_area = false;
      self.charts_container.removeClass('full-mode');
    }
  },
  set_dates: function(){},
  set_to_date: function(d){
    this.to_date = d3.time.format("%Y-%m-%d")(d);
    this.to_date_selector.val(this.to_date);
  },
  set_from_date: function(d){
    this.from_date = d3.time.format("%Y-%m-%d")(d);
    this.from_date_selector.val(this.from_date);
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
      }else{
	// Activate filter
	button.parent().children().removeClass('active');
	button.addClass('active');
	self.set_period(self.current_period);
      };
      self.set_date_range();
      // Save data to storage
      self.save_to_storage();
      self.redraw_charts();
    });
  },
  set_date_range: function(){
    var self = this;
    if(self.current_period == 'hour'){
      console.log("Selected hour");
      var to_d = new Date();
      var from_d = new Date();
      from_d.setDate(to_d.getDate()-3);

      self.set_to_date(to_d);
      self.set_from_date(from_d);
    }
    else{
      var d = new Date();
      this.set_to_date(d);
      this.set_from_date(new Date(d.getFullYear(), d.getMonth()-1, d.getDate()));
    }
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
    this.from_date_selector.on('change', function(){
      self.redraw_charts();
    });
    this.to_date_selector.on('change', function(){
      self.redraw_charts();
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
    this.save_to_storage();
  },
  get_widget_class_by_type: function(type){
    if(type=="table"){
      return Table;
    } else if (type=="chart"){
      return Chart;
    }
    return null;
  },
  get_new_chart: function(type, id){
    var widget_class = this.get_widget_class_by_type(type);
    return new widget_class(this, id || this.get_unique_id(), null);
  },
  add_chart: function(chart){
    // Add chart to gottwall charts list and
    // render chart area in DOM
    if(!_.has(this.charts, this.current_project)){
      this.charts[this.current_project] = {};
    }
    this.charts[this.current_project][chart.id] = chart;

    // Render chart and append to DOM
    chart.setup();
    this.charts_container.append($(chart.render_widget()));
    chart.node = $('#chart-'+chart.id);
    // Setup node
    chart.add_bindings();
    return false;
  },
  bind_add: function(){
    var self = this;
    this.chart_add.find(".dropdown-menu a").on('click', function(){
      var chart = self.get_new_chart($(this).attr('data-type'))
      self.add_chart(chart);
      $(this).parent().parent().parent().removeClass('open');
      return false;
    });
  },
  bind_resize_button: function(){
    var self = this;
    $('#resize-area-switcher').on('click', function(){
      self.switch_full_size_mode(!$(this).hasClass('active'));
      self.save_to_storage();
      self.redraw_charts();
      return false;
    });
  },
  add_bindings: function(){
    this.bind_period_selectors();
    this.bind_project_selector();
    this.bind_redraw_button();
    this.bind_dates_selectors();
    this.bind_resize_button();
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

    localStorage.setItem(this.size_mode_key, this.full_size_area);

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
      var type = projects[project][chart_id]['type'];
      if (type == "chart" || type === undefined){
	var chart = new Chart(self, chart_id);

	for(var bar_id in projects[project][chart_id]['metrics']){
	  var bar_params = projects[project][chart_id]['metrics'][bar_id];
	  chart.add_bar(new Bar(self, chart, bar_params['id'],
	  			bar_params['metric_name'], bar_params['filter_name'], bar_params['filter_value']));
	}
      }
      else if (type == "table"){
	this.charts[project][chart_id] = chart = new Table(self, chart_id);
	var bar_params = projects[project][chart_id]['metrics'];
	this.charts[project][chart_id].setup_bar(new TableBar(self, chart, bar_params,
							      bar_params['metric_name'], bar_params['filter_name']));
      }
      this.add_chart(chart);
    }

    self.redraw_charts();
  },
  restore_from_storage: function(){
    // Load data from localStorage
    var self = this;
    this.debug('Loading settings from storage ...');

    this.current_project = this.current_project || localStorage.getItem(this.current_project_key) || $(this.project_selector.find('li a')[0]).attr('data-name');
    this.current_period = this.set_period(this.current_period || localStorage.getItem(this.current_period_key));
    this.full_size_area = (localStorage.getItem(this.size_mode_key) || false) == "true";
    self.switch_full_size_mode(this.full_size_area);

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

var Project = Class.extend({
  init: function(){
    // Initialize project
  },
  // Project changer
  save_project: function(){
    // Save project to localStorage
  },
  restore_project: function(){
    // Restore project from localStorage
  }});

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
      url = url + "&from_date=" + from_date;
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


})(jQuery, nv, swig, _, moment);