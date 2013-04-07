define(["jquery", "underscore", "js/metrics/base"], function($, _, MetricBase){

  var Metric = MetricBase.extend({
    load: function(){},
    show: function(){},
    stats_url: function(){
      var url =  "/api/v1/" + this.project + "/stats?period="+this.gottwall.current_period+"&name="+this.name;
      if(this.filter_name && this.filter_value){
	url = url + "&filter_name="+this.filter_name+"&filter_value="+this.filter_value;
      }

      var from_date = this.gottwall.get_from_date();
      if(from_date){
	url = url + "&from_date=" + from_date;
      }
      var to_date = this.gottwall.get_to_date();
      if(to_date){
	url = url + "&to_date=" + to_date;
      }
      return url;
    },
    is_equal: function(){
      return {
	project: this.project,
	name: this.name,
	filter_name: this.filter_name,
	filter_value: this.filter_value
      }
    },
    get_range: function(){
      var self =  this;

      if(this.data){
	return _.sortBy(_.map(this.data['range'],
			      function(item){
				return {"x": self.gottwall.date_to_integer(item[0]),
					"y": parseInt(item[1])};
			      }), function(sub_item){return sub_item['x']});
      }
      return [];
    },
    get_chart_data: function(){
      key = this.name
      if(this.filter_name){
	key = key + " | "+this.filter_name
      }
      if(this.filter_value){
	key = key + ":"+this.filter_value
      }
      var data = {"data": this.get_range(),
		  "name": key,
		  "color": this.color}

      return data
    }
  });

  return Metric;
});
