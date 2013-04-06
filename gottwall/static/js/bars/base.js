define(["jquery", "underscore", "swig", "js/class", "js/utils/guid"], function($, _, swig, Class, GUID){

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
  return BaseBar;
});