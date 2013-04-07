define(["jquery", "underscore", "swig", "js/widgets/base", "js/bars/table", "js/metrics/set"], function($, _, swig, Widget, TableBar, MetricSet){

var Table = Widget.extend({
  init: function(gottwall, id){
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
    this.node.find('div.table-area').hide();
    this.node.find('.loader').show();
  },
  hide_loader: function(){
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
    this.bar = bar;
  },
  get_metrics: function(){
    var self = this;
    return new MetricSet(self.gottwall, self.bar.metric_name, self.bar.filter_name);
  },
  render_chart_graph: function(){
    var self = this;

    var metric = this.get_metrics();

    if(!metric.filter_name){
      self.hide_loader();
      return false;
    }
    self.show_loader();

    $.when.apply($, [metric.get_resource_loader(self.gottwall.current_period)]).done(
      function(){
	var response = arguments;
	self.hide_loader();
	return self.render_metrics_table(response[0]);
      });
  },
  render_metrics_table: function(metrics){
    var self = this;
    var template = swig.compile($("#table-template").text());
    var date_range = metrics.date_range;
    var table = $(template({'rows': _.map(metrics['data'], function(value, key){
      return [key, value['range']];
    }),
			    'caption': self.bar.metric_name,
			    'column_names': _.map(date_range, function(e){
			      return self.gottwall.pretty_date_format(self.gottwall.parse_serialized_date(e));
			    }),
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

  return Table;
});
