
define( ["jquery", "underscore", "swig", "js/widgets/base", "js/metrics/metric", "rickshaw"], function($, _, swig, Widget, Metric, Rickshaw){

  var Chart = Widget.extend({

    init: function(gottwall, id, renderer, name){
      this._super(gottwall, id, name);

      this.bars = [];
      this.dom_id = '#chart-'+this.id;
      this.node = $(this.dom_id);
      this.type = "chart";
      this.selectors_node = null;
      this.graph = null;
      this.renderer = renderer || "line";
    },
    setup_node: function(){
      this.node = $(this.dom_id);
    },
    to_dict: function(){
      return {"id": this.id,
	      "metrics": _.map(this.bars, function(bar){
		return bar.to_dict();
	      }),
	      "name": this.name,
	      "type": this.type,
	      "renderer": this.renderer}
    },
    add_bindings: function(){
      this._super();
      var self = this;

      self.node.on('click', '.renderers-selector .dropdown-menu a', function(){
	var item = $(this);
	self.renderer = item.attr('data-type');
	self.render_chart_graph();
	self.gottwall.save_to_storage();
	item.parent().parent().parent().find('.current').text(self.renderer);
	item.parent().parent().parent().removeClass('open');

	return false;
      });
    },

    render_chart_graph: function(){
      var self = this;
      var metrics = this.get_metrics();
      if(_.isEmpty(metrics)){
	// Empty metrics list
	return false;
      }
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

	  var responses = _.compact(responses);
	  for(var i in metrics){
	    metrics[i].data = responses[i][0];
	  }
	  self.hide_loader();
	  return self.render_metrics(metrics);;
	});
    },
    format_tick: function(d){
      var self = this;
      return self.gottwall.current_date_formatter(new Date(d));
    },
    cleanup_chart_area: function(){
      // Remove previous linen and controls
      var self = this;

      $("#y_axis-"+self.id).html("");
      $("#x_axis-"+self.id).html("");
      $("#linen-"+self.id).html("");
    },
    tick_formatter: function(x){
      // Convert tick data from 201201 format to pretty string
     // var d = self.gottwall.parse_serialized_date(x);
      // if(!d){
      //   return null;
      // }
      return self.gottwall.pretty_date_format(x);
    },
    get_ticks: function(graph){
      // Calculate number of ticks
      return 3;
    },
    get_tick_offset: function(){

    },
    render_metrics: function(metrics){
      // Rendering chart by metrics hash
      var self = this;
      var selector = '#chart-' + self.id + " ";
      var selector_prefix = "#chart-" + self.id;

      self.cleanup_chart_area();

      var graph = new Rickshaw.Graph( {
	padding: {
	  top: 0.25,
	  bottom: 0.5
	},
	height: 300,
	renderer: self.renderer,
	interpolation: "linear", // monotone,linear
	element: document.querySelector('#linen-'+self.id),
	series: _.map(metrics, function(metric){
     	  return metric.get_chart_data();})
      });


      var x_axis = new Rickshaw.Graph.Axis.X({
	height: 70,
	graph: graph,
	orientation: 'top',
	ticks: self.get_ticks(graph),
	//pixelsPerTick: 100,
	tickFormat: self.tick_formatter,
	//format: Rickshaw.Fixtures.Number.formatKMBT
	// format: function(y){
	//   return y;
	// }
      });

      var y_axis = new Rickshaw.Graph.Axis.Y({
	graph: graph,
	orientation: 'left',
	//element: document.querySelector('#' + section.identifier + ' .y-axis'),
	element: document.getElementById("y_axis-"+self.id),
	tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
      });

      var hoverDetail = new Rickshaw.Graph.HoverDetail({
    	graph: graph,
	formatter: function(series, x, y) {
	  var date = '<span class="date">' + self.tick_formatter(x) + '</span>';
	  var swatch = '<span class="detail_swatch" style="background-color: ' + series.color + '"></span>';
	  var content = swatch + series.name + " → " + parseInt(y) + '<br>' + date;
	  return content;
	}
      });

      graph.render();
      self.graph = graph;
    },
    get_metrics: function(){
      // Get activated metrics
      return _.compact(_.map(this.bars, function(bar){
	return bar.get_metric();
      }));
    },
    add_bar: function(bar){
      this.bars.push(bar);
    },

    remove_bar: function(bar){

      for(var i in this.bars){
	if(_.isEqual(this.bars[i].node, bar.node)){
	  this.bars.splice(i, 1)
	}
      }
      bar.node.remove();
    },
    render_widget: function(){

      var template = swig.compile($("#chart-template").text());

      var widget = $(template({
	"id": this.id,
	"project_name": this.gottwall.current_project,
	"type": this.type,
	"renderer": this.renderer,
	"name": this.name}));
      var selectors_node = widget.find('.selectors');
      this.selectors_node = selectors_node;

      for(var i in this.bars){
	this.render_bar(this.bars[i]);
	// selectors_node.append(this.());
	// this.bars[i].render_selectors();
      }
      return widget;
    }});

  return Chart;
});