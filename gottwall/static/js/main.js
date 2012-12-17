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


(function($, nv, swig){

  $(function() {
    var global_metrics = {};

    // Handler for .ready() called.
    var chart_container = $('#chart');
    var filters_container = $('#filters-selector #filters-list');
    var metrics_container = $('#metrics-selector #metrics-list');
    var values_container = $('#values-selector #values-list');


    function render_filters_values(metric_name, filter_name){
      console.log("filter_name "+ filter_name);

      var values = swig.compile('{% for value in items %}<li><a href="#filters/{{ metric_name }}/{{ filter_name }}/{{ value }}" data-name="{{ value }}">{{ value }}</a></li>{% endfor %}');

      values_container.html(values({metric_name: metric_name,
				    filter_name: filter_name,
				    items: global_metrics[metric_name][filter_name]}));

    };

    function render_filters(metric_name){
      var filters = swig.compile('{% for f in items %}<li><a href="#filters/{{ metric_name }}/{{ f }}" data-name="{{ f }}">{{ f }}</a></li>{% endfor %}');
      console.log(filters);
      filters_container.html(filters({metric_name: metric_name,
				      items: _.keys(global_metrics[metric_name])}));

      filters_container.find('li a').bind('click', function() {
	var filter = $(this);
	console.log(filter);
	if(filter.parent().hasClass('active')){
	  // Deactivate all
	  filter.parent().parent().children().removeClass('active');
	  values_container.children().remove();
	}
	else{
	  // Activate filter
	  filter.parent().parent().children().removeClass('active');
	  filter.parent().toggleClass('active');
	  console.log("Render filters"+filter.data('name'));
	  render_filters_values(metric_name, filter.data('name'));
	};
      })};


    function render_selectors(metrics){
      // Load swig templates
      var items = swig.compile('{% for x in items %}<li><a href="#metric/{{ x }}" data-name="{{ x }}">{{ x }}</a></li>{% endfor %}');
      metrics_container.html(items({"items": _.keys(metrics)}));
      metrics_container.find('li a').bind('click', function() {
	var metric = $(this);

	if(metric.parent().hasClass('active')){
	  // Deactivate all
	  metric.parent().parent().children().removeClass('active');
	  filters_container.children().remove();
	  values_container.children().remove();
	}
	else{
	  // Activate metric
	  metric.parent().parent().children().removeClass('active');
	  metric.parent().toggleClass('active');

	  render_filters(metric.data('name'));
	};
      })};

    function process_metrics(project_name, metrics){
      global_metrics = metrics;
      render_selectors(metrics);
    };

    // helper to load metrics structure
    function load_metrics(project_name){
      var api_url = project_name+"/api/metrics";
      $.log("Loading: "+api_url);

      $.ajax({
	type: "GET",
	url: api_url,
	dataType: 'json',
	success: function(data){
	  process_metrics(project_name, data);
	},
	error: function(error){
	  $.log(error);
	}
      });
    };

    load_metrics("test_project");

    function render_chart(){
      // Load metrics for render
    }

    render_chart();
  });


})(jQuery, nv, swig, _);