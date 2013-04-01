define(["jquery", "underscore", "js/bars/base", "js/metrics/metric","select2"], function($, _, BaseBar, Metric){
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

  return Bar;
});