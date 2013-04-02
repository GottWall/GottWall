
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
  render_metrics: function(metrics){
    // Rendering chart by metrics hash
    console.log("Chart rendering...");
    var self = this;

    var palette = new Rickshaw.Color.Palette();


    var data = [ { x: 1910, y: 92228531 }, { x: 1920, y: 106021568 }, { x: 1930, y: 123202660 }, { x: 1940, y: 132165129 }, { x: 1950, y: 151325798 }, { x: 1960, y: 179323175 }, { x: 1970, y: 203211926 }, { x: 1980, y: 226545805 }, { x: 1990, y: 248709873 }, { x: 2000, y: 281421906 }, { x: 2010, y: 308745538 } ];

    var graph = new Rickshaw.Graph( {
      renderer: 'line',

      element: document.querySelector('#chart-' + self.id + " .svg-wrapper"),
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
        orientation: 'left',
        tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
} );

var hoverDetail = new Rickshaw.Graph.HoverDetail( {
	graph: graph,
} );

var legend = new Rickshaw.Graph.Legend( {
	graph: graph,
	element: document.getElementById('legend')

} );

var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
	graph: graph,
	legend: legend
} );

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

	   return Chart;
});