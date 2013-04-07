

define(["js/class", "js/widgets/chart", "js/widgets/table", "js/bars/bar", "js/bars/table", "jquery", "underscore", "d3", "js/utils/guid", "domReady!"],
       function(Class, Chart, Table, Bar, TableBar, $, underscore, d3, GUID) {

  var GottWall = Class.extend({

  // Local storage keys
  current_project_key: "current_project",
  current_period_key: "current_period",
  charts_key: "charts",
  from_date_key: "from-date",
  to_date_key: "to-date",
  size_mode_key: "size_mode",

  date_formatters: {
    "day": d3.time.format("%Y-%m-%d"),
    "year": d3.time.format("%Y"),
    "month": d3.time.format("%Y-%m"),
    "hour": d3.time.format("%Y-%m-%dT%H"),
    "minute": d3.time.format("%Y-%m-%dT%H:%M"),
    "week": d3.time.format("%Y-%W")
    },
  date_formats: {
    "day": "%Y-%m-%d",
    "year": "%Y",
    "month": "%Y-%m",
    "hour": "%Y-%m-%dT%H",
    "minute": "%Y-%m-%dT%H:%M",
    "week": "%Y%W"
  },
  date_display_formats: {
    "day": "%Y-%m-%d",
    "year": "%Y",
    "month": "%Y-%m",
    "hour": "%Y-%m-%dT%H",
    "minute": "%Y-%m-%dT%H:%M",
    "week": "%Y-%W"
  },
    date_display_formatters: {
      "day": d3.time.format("%Y-%m-%d, %A"),
      "year": d3.time.format("%Y"),
      "month": d3.time.format("%Y-%m, %B"),
      "hour": d3.time.format("%Y-%m-%dT%H"),
      "minute": d3.time.format("%Y-%m-%dT%H:%M"),
      "week": d3.time.format("%Y-%W")
    },
    init: function(debug, prefix){
    this.debug_flag = debug || false;
    this.metrics = {};
    this.charts = {};
      this.prefix = prefix;

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
    get_embedded_create_url: function(){
      return "/api/v1/" + this.current_project + "/embedded/";
    },

    make_embedded: function(data, success){
      var api_url = this.get_embedded_create_url();

      var self = this;

      $.ajax({
	type: "POST",
	url: api_url,
	data: data,
	dataType: 'json',
	success: success,
	error: function(){
	  $.log(error);
	}
      });
    },
  get_metrics_url: function(){
    // Metrics structure url
    return "/api/v1/" + this.current_project + "/metrics";
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
    parse_serialized_date: function(d){
      // Parse serialized date and return Date object
      return this.date_formatters[this.get_current_period()].parse(String(d));
    },
    timestamp_to_date: function(timestamp){
      return new Date(timestamp);
    },
    pretty_date_format: function(d){
      // Convert Date object to pretty string with period context
      try {
	return this.date_display_formatters[this.get_current_period()](this.timestamp_to_date(d));
      }
      catch (e){
	return "";
      }

    },
  set_period: function(period){
    // Setup period and datetime format
    this.current_period = period;

    if(_.has(this.date_formats, period)){

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
  date_to_integer: function(d){
    return this.parse_serialized_date(d).getTime();
  },
  get_current_period: function(){
    // Get current period state
    return this.current_period;
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
    validate_dates_range: function(from_date, to_date){
      var from_date_obj = this.date_formatters["day"].parse(from_date);
      var to_date_obj = this.date_formatters["day"].parse(to_date);

      if (from_date_obj > to_date_obj){
	$("#invalid-dates-modal").modal();
	return false;
      }
      return true;
    },
  bind_dates_selectors: function(){
    var self = this;
    this.from_date_selector.bind('click', function(e){
      var input = $(this);

      if(input.val() != self.from_date){
	if(!self.validate_dates_range(self.get_from_date(), self.get_to_date())){
	  return false;
	}
	self.from_date = input.val();
      }
    });

    this.to_date_selector.bind('click', function(e){
      var input = $(this);

      if(input.val() != self.to_date){
	if(!self.validate_dates_range(self.get_from_date(), self.get_to_date())){
	  return false;
	}
	self.to_date = input.val();
      }
    });
    this.from_date_selector.on('change', function(){
      if(!self.validate_dates_range(self.get_from_date(), self.get_to_date())){
	return false;
      }
      self.redraw_charts();
    });
    this.to_date_selector.on('change', function(){
      if(!self.validate_dates_range(self.get_from_date(), self.get_to_date())){
	return false;
      }
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

    chart.setup_node();
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
      window.location.hash = chart.dom_id;
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
    bind_modal_hide: function(){
      $('#share-modal').on('hidden', function () {
	$('#modal-body').html("");
      });
    },
  add_bindings: function(){
    this.bind_period_selectors();
    this.bind_project_selector();
    this.bind_redraw_button();
    this.bind_dates_selectors();
    this.bind_resize_button();
    this.bind_add();
    this.bind_modal_hide();
  },
  save_to_storage: function(){
    // Save controls states to localStorage

    var self = this;
    if(this.charts){

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
    var self = this;

    var projects = JSON.parse(localStorage.getItem(this.charts_key)) || {};
    var project = self.current_project;

    if(!project){
      console.log("Skip restore charts");
    }

    this.charts[project] = {};
    for(var chart_id in projects[self.current_project]){

      var type = projects[project][chart_id]['type'];
      if (type == "chart" || type === undefined){
	var chart = new Chart(self, chart_id,
			      projects[project][chart_id]['renderer'],
			      projects[project][chart_id]['name']);

	for(var bar_id in projects[project][chart_id]['metrics']){
	  var bar_params = projects[project][chart_id]['metrics'][bar_id];
	  chart.add_bar(new Bar(self, chart, bar_params['id'], chart.palette.color(),
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


  return GottWall;
});

