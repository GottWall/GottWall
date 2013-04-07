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
    add_bindings: function(){},
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

    },
  });
  return BaseBar;
});