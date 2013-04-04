
define( ["jquery", "underscore", "swig", "js/widgets/base", "js/metrics/metric", "rickshaw"], function($, _, swig, Widget, Metric, Rickshaw){

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
  cleanup_chart_area: function(){
    // Remove previous linen and controls
    var self = this;

    $("#y_axis-"+self.id).html("");
    $("#x_axis-"+self.id).html("");
    $("#linen-"+self.id).html("");
  },
  render_metrics: function(metrics){
    // Rendering chart by metrics hash
    console.log("Chart rendering...");
    var self = this;
    var selector = '#chart-' + self.id + " ";
    var selector_prefix = "#chart-" + self.id;

    self.cleanup_chart_area();

    var palette = new Rickshaw.Color.Palette();

    var graph = new Rickshaw.Graph( {
      renderer: 'line',
      interpolation: "linear", // monotone,linear
      // offset: "wiggle", // положение базовой линии
      element: document.querySelector('#linen-'+self.id),
      series: _.map(metrics, function(metric){
    	var m = metric.get_chart_data();
    	m['color'] = palette.color();
     	return m;})
    });


    var x_axis = new Rickshaw.Graph.Axis.X({
      graph: graph,
      orientation: 'bottom',
      pixelsPerTick: 100,
      format: Rickshaw.Fixtures.Number.formatKMBT
      // format: function(y){
      //   return y;
      // }
    });

    var y_axis = new Rickshaw.Graph.Axis.Y( {
      graph: graph,
      tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
    });

    var hoverDetail = new Rickshaw.Graph.HoverDetail( {
    	graph: graph,
    } );

    // var legend = new Rickshaw.Graph.Legend( {
    // 	graph: graph,
    // 	//element: document.getElementById('legend')

    // } );

    // var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
    //   graph: graph,
    //   legend: legend
    // });

    graph.render();

    console.log(graph);

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

	   return Chart;
});