

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
      "id": this.id};
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
    var metric_current = "Показатель";

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
  get_metric: function(){
    if(this.metric_name){
      var metric = new MetricSet(this.gottwall, this.metric_name,
				 this.filter_name, null);
      return metric;
    }
    return null;
  },
  render_filters: function(metric_name, filters){
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
      var button = $(this);
      self.filter_name = button.attr('data-name');
      self.node.find('.filters-selector .current').text(self.filter_name);
      self.node.find('.filters-selector').removeClass('open');
      self.chart.render_chart_graph();
      self.gottwall.save_to_storage();
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
    if(!this.renders_selector){
      console.log("Render chart area before");
    }
    this.selectors_node.append(bar.render());
    bar.render_selectors();
    bar.add_bindings();
  },
  setup: function(){},
  add_bindings: function(){
    var self = this;
    this.node.on('click', '.chart-controls .add-bar', function(){
      var button = $(this);
      var bar = new Bar(self.gottwall, self, GUID())
      self.add_bar(bar);
      self.render_bar(bar);
    });

    this.node.on(
      'click', '.widget-bar .remove-chart', function(){
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
  show_loader: function(){
    console.log("Show loader");
    this.node.find('div.table-area').hide();
    this.node.find('.loader').show();
  },
  hide_loader: function(){
    console.log("Hide loader");
    this.node.find('div.table-area').show();
    this.node.find('.loader').hide();
  },
  setup_node: function(){
    this.node = $('#table-'+this.id);
  },
  render_widget: function(){
    var template = swig.compile($('#table-widget-template').text());
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
  get_metrics: function(){
    var self = this;
    return new MetricSet(self.gottwall, self.bar.metric_name, self.bar.filter_name);
  },
  render_chart_graph: function(){
    var self = this;
    console.log("Render table");
    var metric = this.get_metrics();
    self.show_loader();

    $.when.apply($, [metric.get_resource_loader(self.gottwall.current_period)]).done(
      function(){
	console.log("Metrics loaded");
	var response = arguments;
	self.hide_loader();
	return self.render_metrics_table(response[0]);
      });
  },
  render_metrics_table: function(metrics){
    console.log("Render metrics table");
    var self = this;
    var template = swig.compile($("#table-template").text());
    var date_range = metrics.date_range;
    var table = $(template({'rows': _.map(metrics['data'], function(value, key){
      return [key, value['range']];
    }),
			    'caption': self.bar.metric_name,
			    'column_names': date_range,
			    'group_column_name': self.bar.filter_name}));

    table.tablesorter({
      theme : "bootstrap", // this will
      headerTemplate : '{content} {icon}',
    });
    this.node.find('div.table-area').html(table);
  },
  setup: function(){
    var self = this;
    if(!this.bar){
      this.bar = new TableBar(self.gottwall, self, null, null);
    }}});

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
   setup_node: function(){
     this.node = $('#chart-'+this.id);
   },
   to_dict: function(){
     return {"id": this.id,
	     "metrics": _.map(this.bars, function(bar){
	       return bar.to_dict();
	     }),
	     "type": this.type}
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


      var data = [ { x: 1910, y: 92228531 }, { x: 1920, y: 106021568 }, { x: 1930, y: 123202660 }, { x: 1940, y: 132165129 }, { x: 1950, y: 151325798 }, { x: 1960, y: 179323175 }, { x: 1970, y: 203211926 }, { x: 1980, y: 226545805 }, { x: 1990, y: 248709873 }, { x: 2000, y: 281421906 }, { x: 2010, y: 308745538 } ];

      var graph = new Rickshaw.Graph( {
	element: document.querySelector('#chart-' + self.id + " .svg-wrapper"),
        series: _.map(metrics, function(metric){
     	  return metric.get_chart_data()})
} );


// var x_axis = new Rickshaw.Graph.Axis.Time( { graph: graph } );

// var y_axis = new Rickshaw.Graph.Axis.Y( {
//         graph: graph,
//         orientation: 'left',
//         tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
//         element: document.getElementById('y_axis'),
// } );



graph.render();



    // nv.addGraph(function(){
    //   var chart = nv.models.lineChart();
    //   //chart.margin({top: 10, bottom: 40, left: 60, right: 30});

    //   chart.xAxis.tickFormat(function(d) {
    // 	return d3.time.format(self.gottwall.date_display_formats[self.gottwall.current_period])(new Date(d));
    // 	//return self.format_tick(d);
    // 	//        return d3.time.format(self.current_date_format)(new Date(d))
    //   }).showMaxMin(false);
    //   chart.yAxis.tickFormat(function(d){
    // 	return d3.format(',')(d);
    //   });
    //   chart.tooltipContent(function(key, x,  y, e, graph) {
    // 	console.log(x);
    //     return '<h3>' + key + '</h3>' +
    //            '<p>' +  x + ' → ' + y + '</p>'
    //   });

    //   //chart.xAxis.rotateLabels(-45);

    //   d3.select('#chart-' + self.id + " svg").datum(
    // 	_.map(metrics, function(metric){
    // 	  return metric.get_chart_data()})).transition(1).duration(50).call(chart);
    //   nv.utils.windowResize(chart.update);

    //   return chart;
    // });
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

var MetricBase = Class.extend({
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
  get_resource_loader: function(){
    return $.ajax({
      type: "GET",
      url: this.stats_url(),
      dataType: 'json'});
  },
});

var MetricSet = MetricBase.extend({
  stats_url: function(){
    var url = this.project + "/api/stats_dataset?period="+this.gottwall.current_period+"&name="+this.name;
    if(this.filter_name){
      url = url + "&filter_name="+this.filter_name;
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
  }});

var Metric = MetricBase.extend({

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
    var data = {"data": this.get_range(),
		"name": key}
    console.log(data);
    return data
  }
});
