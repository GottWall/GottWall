define(["jquery", "underscore", "js/bars/base"], function($, _, BaseBar){

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
      var self = this;
      var metric_current = "Param";

      if(self.metric_name) {
	metric_current = self.metric_name;
      }
      self.render_filters(self.metric_name,
			  this.gottwall.metrics[this.gottwall.current_project][self.metric_name]);

      this.node.find('.metrics-selector .current').text(metric_current);

      self.setup_current_filter();
    },
    setup_current_filter: function(){
      var self = this;

      var filter_current = "Filter";
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
	template({
    	  "filters": _.map(filters, function(value, key){
    	    return key;
    	  })}));

      this.node.on('click', '.filters-selector li a', function(){
	var button = $(this);
	self.filter_name = button.attr('data-name');
	self.node.find('.filters-selector .current').text(self.filter_name);
	self.node.find('.filters-selector').removeClass('open');
	self.chart.render_chart_graph();
	self.gottwall.save_to_storage();
	return false;
      });
    },
    render_metrics: function(metrics){
      var self = this;

      this._super(metrics);

      this.node.on('click', '.metrics-selector .dropdown-menu li a',  function(){


	var metric = $(this);
	self.metric_name = metric.data('name');

	self.filter_name = null;
	self.filter_value = null;
	self.render_filters(this.metric_name, metrics[self.metric_name]);
	metric.parent().parent().parent().removeClass('open');
	metric.parent().parent().parent().find('.current').text(self.metric_name);
	self.setup_current_filter();
	//self.chart.render_chart_graph();
	//self.gottwall.save_to_storage();
	return false;
      });
    }
  });

  return TableBar;
});