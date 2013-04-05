define(["jquery", "js/class"], function($, Class){

  var MetricBase = Class.extend({
    init: function(gottwall, name, color, filter, value, data){
      this.gottwall = gottwall;
      this.project = gottwall.current_project;
      this.name = name;
      this.color = color;
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
    }
  });

  return MetricBase;
});
