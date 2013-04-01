define("metrics/set", ["jquery", "metrics/base"], function($, MetricBase){

  var MetricSet = MetricBase.extend({
    stats_url: function(){
      var url = this.project + "/api/stats_dataset?period="+this.gottwall.current_period+"&name="+this.name;
      if(this.filter_name){
	url = url + "&filter_name="+this.filter_name;
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
    }});

  return MetricSet;


});
